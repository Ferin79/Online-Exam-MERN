import React, { useState, useEffect, useContext } from "react";
import "./takeExam.css";
import { Select } from "react-materialize";
import { AuthContext } from "../../config/auth";
import { TextInput, Button, Card, Icon } from "react-materialize";
import LoadingScreen from "../../components/Loading";

const TakeExam = () => {
  const { token, userEmail } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [classData, setClassData] = useState([]);
  const [classValue, setClassValue] = useState("");
  const [subjectData, setSubjectData] = useState([]);
  const [subjectValue, setSubjectValue] = useState("");
  const [chapterData, setChapterData] = useState([]);
  const [chapterValue, setChapterValue] = useState("");
  const [language, setLanguage] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [examData, setExamData] = useState([]);
  const [questionCount, setQuestionCount] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [disableBtn, setDisableBtn] = useState([]);
  const [questionData, setQuestionData] = useState([
    {
      id: "1",
      isQuestionImage: "0",
      questionText: "What is Formula for Velocity?",
      isSolutionImage: "0",
      solutionText: "velocity is distance divide time",
      isAdded: "0",
    },
    {
      id: "2",
      isQuestionImage: "0",
      questionText: "What is Formula for Velocity?",
      isSolutionImage: "0",
      solutionText: "velocity is distance divide time",
      isAdded: "0",
    },
    {
      id: "3",
      isQuestionImage: "0",
      questionText: "What is Formula for Velocity?",
      isSolutionImage: "0",
      solutionText: "velocity is distance divide time",
      isAdded: "0",
    },
    {
      id: "4",
      isQuestionImage: "0",
      questionText: "What is Formula for Velocity?",
      isSolutionImage: "0",
      solutionText: "velocity is distance divide time",
      isAdded: "0",
    },
    {
      id: "5",
      isQuestionImage: "0",
      questionText: "What is Formula for Velocity?",
      isSolutionImage: "0",
      solutionText: "velocity is distance divide time",
      isAdded: "0",
    },
    {
      id: "6",
      isQuestionImage: "0",
      questionText: "What is Formula for Velocity?",
      isSolutionImage: "0",
      solutionText: "velocity is distance divide time",
      isAdded: "0",
    },
    {
      id: "7",
      isQuestionImage: "0",
      questionText: "What is Formula for Velocity?",
      isSolutionImage: "0",
      solutionText: "velocity is distance divide time",
      isAdded: "0",
    },
    {
      id: "8",
      isQuestionImage: "0",
      questionText: "What is Formula for Velocity?",
      isSolutionImage: "0",
      solutionText: "velocity is distance divide time",
      isAdded: "0",
    },
    {
      id: "9",
      isQuestionImage: "0",
      questionText: "What is Formula for Velocity?",
      isSolutionImage: "0",
      solutionText: "velocity is distance divide time",
      isAdded: "0",
    },
    {
      id: "10",
      isQuestionImage: "0",
      questionText: "What is Formula for Velocity?",
      isSolutionImage: "0",
      solutionText: "velocity is distance divide time",
      isAdded: "0",
    },
  ]);

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

  const handleClassChange = async (event) => {
    try {
      setClassValue(event.target.value);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}admin/get/subject/${event.target.value}`
      );
      const responseData = await response.json();
      setSubjectData(responseData.data);
    } catch (error) {
      console.log(error);
      alert("Error Occured");
    }
  };

  const handleSubjectChange = async (event) => {
    setSubjectValue(event.target.value);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}admin/get/chapter/${classValue}/${event.target.value}`
      );
      const responseData = await response.json();
      setChapterData(responseData.data);
    } catch (error) {
      console.log(error);
      alert("Error Occured");
    }
  };

  const handleChapterChange = (event) => {
    setChapterValue(event.target.value);
  };

  const handleLanguageChnage = (event) => {
    setLanguage(event.target.value);
  };
  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleExamChange = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}admin/get/examlist`
      );
      const responseData = await response.json();
      setExamData(responseData.data);
    } catch (error) {
      console.log(error);
      alert("Error Occured");
    }
  };
  const handleFetchQuestion = async () => {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}admin/get/fetch-question`,
      {
        method: "POST",
        headers: {
          Accept: "Application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          email: userEmail,
          classid: classValue,
          subjectid: subjectValue,
          chapterid: chapterValue,
          language,
          difficulty,
          count: questionCount,
          examid: selectedExam,
        }),
      }
    );
    const responseData = await response.json();
    if (responseData.success === "1") {
      setQuestionData(responseData.data);
    } else {
      alert("Error Occured");
    }
    setIsLoading(false);
  };

  const handleAddExam = async (id) => {
    setIsLoading(true);
    if (selectedExam) {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}admin/add/exam-question`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            examid: selectedExam,
            questionid: id,
          }),
        }
      );
      const responseData = await response.json();
      if (responseData.success === "1") {
        var oldData = disableBtn;
        oldData = [id, ...oldData];
        setDisableBtn(oldData);
      } else {
        alert("Add Question To Exam Error");
      }
    } else {
      alert("Please Select Exam");
    }
    setIsLoading(false);
  };
  const handleRemoveExam = async (id) => {
    setIsLoading("true");
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}admin/remove/exam-question`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          examid: selectedExam,
          questionid: id,
        }),
      }
    );
    const responseData = await response.json();
    if (responseData.success === "1") {
      const newData = disableBtn.filter((data) => data !== id);
      setDisableBtn(newData);
    } else {
      alert("Error Occured");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleExamChange();
    getClassList();
  }, []);
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <React.Fragment>
      <h4 className="center">Add Questions to Exams</h4>
      <div className="addQuestion_wrapper_take_exam">
        <div className="selector_wrapper">
          <div className="select_exam_wrapper">
            <Select
              label="Exam"
              onChange={(event) => {
                setDisableBtn([]);
                setSelectedExam(event.target.value);
              }}
              options={{
                classes: "",
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
              value={selectedExam}
            >
              <option selected disabled value="">
                Choose Exam
              </option>
              {examData.length > 0 ? (
                examData.map((data) => {
                  return <option value={data.id}>{data.exam_name}</option>;
                })
              ) : (
                <option disabled>No Data To Show</option>
              )}
            </Select>
          </div>
          <div className="select_class_wrapper">
            <Select
              label="Class"
              onChange={handleClassChange}
              options={{
                classes: "",
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
                <option disabled>No Data To Show</option>
              )}
            </Select>
          </div>
          <div className="select_subject_wrapper">
            <Select
              label="Subject"
              onChange={handleSubjectChange}
              options={{
                classes: "",
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
              {subjectData.length > 0 ? (
                subjectData.map((data) => {
                  return <option value={data.id}>{data.subjectname}</option>;
                })
              ) : (
                <option disabled>No Data To Show</option>
              )}
            </Select>
          </div>

          <div className="select_chapter_wrapper">
            <Select
              label="Chapter"
              onChange={handleChapterChange}
              options={{
                classes: "",
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
                Choose your Chapter
              </option>
              {chapterData.length > 0 ? (
                chapterData.map((data) => {
                  return <option value={data.id}>{data.chaptername}</option>;
                })
              ) : (
                <option disabled>No Data To Show</option>
              )}
            </Select>
          </div>
          <div className="select_language_wrapper">
            <Select
              label="Language"
              onChange={handleLanguageChnage}
              options={{
                classes: "",
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
                Select Language
              </option>
              <option value="eng">English</option>
              <option value="guj">Gujarati</option>
              <option value="hin">Hindi</option>
            </Select>
          </div>
          <div className="select_difficulty_wrapper">
            <Select
              label="Difficulty"
              onChange={handleDifficultyChange}
              options={{
                classes: "",
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
                Select Question Difficulty
              </option>
              <option value="0">Easy</option>
              <option value="1">Moderate</option>
              <option value="2">Hard</option>
            </Select>
          </div>
          <div className="select_question_count">
            <TextInput
              type="number"
              min="1"
              label="Question Count"
              onChange={(event) => setQuestionCount(event.target.value)}
            />
          </div>
          <Button onClick={handleFetchQuestion}>Fetch Questions</Button>
        </div>
        <div className="display_wrapper">
          {questionData.length > 0
            ? questionData.map((data) => {
                return (
                  <Card
                    actions={[
                      <Button
                        disabled={disableBtn.indexOf(data.id) !== -1}
                        onClick={() => handleAddExam(data.id)}
                        className="amber lighten-2"
                      >
                        Add To Exam
                      </Button>,
                      <Button
                        disabled={disableBtn.indexOf(data.id) === -1}
                        onClick={() => handleRemoveExam(data.id)}
                        className="amber lighten-2"
                      >
                        Remove
                      </Button>,
                    ]}
                    className="teal"
                    closeIcon={<Icon>close</Icon>}
                    revealIcon={<Icon>more_vert</Icon>}
                    textClassName="white-text"
                  >
                    <p>Question:</p>
                    {data.isQuestionImage === "1" ? (
                      <img
                        alt="question"
                        src={data.questionFile}
                        height="150"
                        width="150"
                      />
                    ) : (
                      <h6>{data.questionText}</h6>
                    )}
                    <p>Solution:</p>
                    {data.isSolutionImage === "1" ? (
                      <img
                        alt="question"
                        src={data.solutionFile}
                        height="150"
                        width="150"
                      />
                    ) : (
                      <h6>{data.solutionText}</h6>
                    )}
                  </Card>
                );
              })
            : null}
        </div>
      </div>
    </React.Fragment>
  );
};

export default TakeExam;
