import React, { useEffect, useState } from "react";
import "./addEditDept.css";
import { Select } from "react-materialize";
import LoadingScreen from "../../components/Loading";

const AddEditDept = () => {
  const [subjectName, setSubjectName] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedClassChapter, setSelectedClassChapter] = useState(null);
  const [classData, setClassData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [subjectDataChapter, setSubjectDataChapter] = useState([]);
  const [chapterName, setChapterName] = useState(null);
  const [ChapterData, setChapterData] = useState([]);

  const getClassList = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}admin/get/class`
      );
      const responseData = await response.json();
      setClassData(responseData.data);
    } catch (error) {
      console.log(error);
      alert("Error Occured");
    }
  };

  const handleAddSubject = async () => {
    setIsLoading(true);
    if (selectedClass) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}admin/add/subject`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              classId: selectedClass,
              subjectname: subjectName,
            }),
          }
        );
        const responseData = await response.json();
        console.log(responseData);
      } catch (error) {
        console.log(error);
        alert("Error Occured. Please Try Again Later");
      }
    } else {
      alert("Select Class to Add Subject");
    }
    setSubjectName(null);
    setIsLoading(false);
  };

  const refreshSubjectList = async (e) => {
    setSelectedClass(e.target.value);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}admin/get/subject/${e.target.value}`
      );
      const responseData = await response.json();
      console.log(responseData.data);
      setSubjectData(responseData.data);
    } catch (error) {
      console.log(error);
      alert("Error Occured");
    }
  };
  const refreshSubjectList1 = async (e) => {
    setSelectedClassChapter(e.target.value);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}admin/get/subject/${e.target.value}`
      );
      const responseData = await response.json();
      console.log(responseData.data);
      setSubjectDataChapter(responseData.data);
    } catch (error) {
      console.log(error);
      alert("Error Occured");
    }
  };

  const handleAddChapter = async () => {
    setIsLoading(true);
    console.log(chapterName);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}admin/add/chapter`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            classid: selectedClassChapter,
            subjectid: selectedSubject,
            chaptername: chapterName,
          }),
        }
      );

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.log(error);
      alert("Error Occured. Try Again Later");
    }
    setIsLoading(false);
  };

  const chapterSubjectChange = async (e) => {
    setSelectedSubject(e.target.value);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}admin/get/chapter/${selectedClassChapter}/${e.target.value}`
      );
      const responseData = await response.json();
      setChapterData(responseData.data);
    } catch (error) {
      console.log(error);
      alert("Error Occured");
    }
  };

  useEffect(() => {
    getClassList();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <React.Fragment>
      <div className="row dept_row_wrapper">
        <div className="col s12 m4 add_subject">
          <h5>Add Subject</h5>
          <div className="subject_input_wrapper">
            <Select
              onChange={refreshSubjectList}
              options={{
                classes: "select_wrapper",
                dropdownOptions: {
                  alignment: "left",
                  autoTrigger: true,
                  closeOnClick: true,
                  constrainWidth: true,
                  container: null,
                  coverTrigger: true,
                  hover: false,
                  inDuration: 150,
                  onCloseEnd: null,
                  onCloseStart: null,
                  onOpenEnd: null,
                  onOpenStart: null,
                  outDuration: 250,
                },
              }}
            >
              <option selected disabled value="">
                Choose your Class
              </option>

              {classData.length > 0 ? (
                classData.map((data) => {
                  return <option value={data.id}>{data.classname}</option>;
                })
              ) : (
                <option>Loading</option>
              )}
            </Select>
            <input
              type="text"
              placeholder="Enter Subject"
              onChange={(event) => setSubjectName(event.target.value)}
            />
            <button className="btn pink left" onClick={handleAddSubject}>
              Add Subject
            </button>
          </div>
          <div>
            {subjectData.length > 0 ? (
              subjectData.map((data) => {
                return <p value={data.id}>{data.subjectname}</p>;
              })
            ) : (
              <p>No Subjects To Show</p>
            )}
          </div>
        </div>

        <div className="col sm12 m4 add_chapter">
          <h5>Add Chapter</h5>
          <div className="subject_input_wrapper">
            <Select
              onChange={refreshSubjectList1}
              options={{
                classes: "select_wrapper",
                dropdownOptions: {
                  alignment: "left",
                  autoTrigger: true,
                  closeOnClick: true,
                  constrainWidth: true,
                  container: null,
                  coverTrigger: true,
                  hover: false,
                  inDuration: 150,
                  onCloseEnd: null,
                  onCloseStart: null,
                  onOpenEnd: null,
                  onOpenStart: null,
                  outDuration: 250,
                },
              }}
            >
              <option selected disabled value="">
                Choose your Class
              </option>
              {classData.length > 0 ? (
                classData.map((data) => {
                  return <option value={data.id}>{data.classname}</option>;
                })
              ) : (
                <option>Loading</option>
              )}
            </Select>

            <Select
              onChange={chapterSubjectChange}
              options={{
                classes: "select_wrapper",
                dropdownOptions: {
                  alignment: "left",
                  autoTrigger: true,
                  closeOnClick: true,
                  constrainWidth: true,
                  container: null,
                  coverTrigger: true,
                  hover: false,
                  inDuration: 150,
                  onCloseEnd: null,
                  onCloseStart: null,
                  onOpenEnd: null,
                  onOpenStart: null,
                  outDuration: 250,
                },
              }}
            >
              <option selected disabled value="">
                Choose your Subject
              </option>
              {subjectDataChapter.length > 0 ? (
                subjectDataChapter.map((data) => {
                  return <option value={data.id}>{data.subjectname}</option>;
                })
              ) : (
                <option disabled>Select Class to load subject</option>
              )}
            </Select>
            <input
              type="text"
              placeholder="Enter Chapter Name"
              onChange={(event) => setChapterName(event.target.value)}
            />
            <button className="btn pink left" onClick={handleAddChapter}>
              Add Chapter Name
            </button>
          </div>

          <div>
            {ChapterData.length > 0 ? (
              ChapterData.map((data) => {
                return <p value={data.id}>{data.chaptername}</p>;
              })
            ) : (
              <p>No Chapter To Show</p>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddEditDept;
