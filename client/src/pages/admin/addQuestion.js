import React, { useState, useEffect, useContext } from "react";
import "./addQuestion.css";
import { Select, RadioGroup, TextInput, Textarea } from "react-materialize";
import { AuthContext } from "../../config/auth";
import LoadingScreen from "../../components/Loading";

const AddQuestion = () => {
  const { token, userEmail } = useContext(AuthContext);

  const [classData, setClassData] = useState([]);
  const [classValue, setClassValue] = useState("");
  const [subjectData, setSubjectData] = useState([]);
  const [subjectValue, setSubjectValue] = useState("");
  const [chapterData, setChapterData] = useState([]);
  const [chapterValue, setChapterValue] = useState("");
  const [language, setLanguage] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [isQuestionImage, setIsQuestionImage] = useState("0");
  const [isSolutionImage, setIsSolutionImage] = useState("0");
  const [questionFile, setQuestionFile] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [isOptionimage, setIsOptionimage] = useState("0");
  const [solutionFile, setSolutionFile] = useState("");
  const [solutionText, setSolutionText] = useState("");
  const [optionAText, setOptionAText] = useState("");
  const [optionBText, setOptionBText] = useState("");
  const [optionCText, setOptionCText] = useState("");
  const [optionDText, setOptionDText] = useState("");
  const [optionAFile, setOptionAFile] = useState("");
  const [optionBFile, setOptionBFile] = useState("");
  const [optionCFile, setOptionCFile] = useState("");
  const [optionDFile, setOptionDFile] = useState("");
  const [correctAns, setCorrectAns] = useState("");
  const [QuestionMarks, setQuestionMarks] = useState("");
  const [questionPreview, setQuestionPreview] = useState("");
  const [solutionPreview, setSolutionPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    setClassValue(event.target.value);
    try {
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

  const handleQuestionPicker = (event) => {
    if (event.target.value === "0") {
      setQuestionFile(null);
    } else {
      setQuestionText(null);
    }
    setIsQuestionImage(event.target.value);
  };

  const handleQuestionFile = (event) => {
    const file = event.target.files[0];
    setQuestionFile(event.target.files[0]);
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function () {
      setQuestionPreview(reader.result);
    };
  };

  const handleQuestionText = (event) => {
    setQuestionText(event.target.value);
  };

  const handleSolutionFile = (event) => {
    const file = event.target.files[0];
    setSolutionFile(event.target.files[0]);
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function () {
      setSolutionPreview(reader.result);
    };
  };
  const handleSolutionText = (event) => {
    setSolutionText(event.target.value);
  };

  const handleOptionImage = async (event) => {
    const name = event.target.name;
    const file = event.target.files[0];

    if (name === "optionA") {
      console.log("Set A");
      setOptionAFile(file);
    } else if (name === "optionB") {
      console.log("Set B");
      setOptionBFile(file);
    } else if (name === "optionC") {
      console.log("Set C");
      setOptionCFile(file);
    } else if (name === "optionD") {
      console.log("Set D");
      setOptionDFile(file);
    } else {
      console.log("No such");
    }
  };

  const handleAnswerChange = (event) => {
    setCorrectAns(event.target.value);
    console.log(event.target.value);
  };

  const addQuestionRequest = async () => {
    setIsLoading(true);
    const data = new FormData();
    data.append("email", userEmail);
    data.append("classid", classValue);
    data.append("subjectid", subjectValue);
    data.append("chapterid", chapterValue);
    data.append("language", language);
    data.append("difficulty", difficulty);
    data.append("isQuestionImage", isQuestionImage);
    data.append("questionFile", questionFile);
    data.append("questionText", questionText);
    data.append("isOptionImage", isOptionimage);
    data.append("optionAFile", optionAFile);
    data.append("optionBFile", optionBFile);
    data.append("optionCFile", optionCFile);
    data.append("optionDFile", optionDFile);
    data.append("optionAText", optionAText);
    data.append("optionBText", optionBText);
    data.append("optionCText", optionCText);
    data.append("optionDText", optionDText);
    data.append("isSolutionImage", isSolutionImage);
    data.append("solutionFile", solutionFile);
    data.append("solutionText", solutionText);
    data.append("correctAnswer", correctAns);
    data.append("weightage", QuestionMarks);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}admin/add/question`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: data,
        }
      );

      const responseData = await response.json();
      if (responseData.success === "0") {
        alert(responseData.message);
      } else {
      }
    } catch (error) {
      alert("Error Occured !!!");
    }
    setIsLoading(false);
  };

  const handleAddQuestion = () => {
    if (classValue) {
      if (subjectValue) {
        if (chapterValue) {
          if (language) {
            if (difficulty) {
              if (questionFile || questionText) {
                if (
                  (optionAFile && optionBFile && optionCFile && optionDFile) ||
                  (optionAText && optionBText && optionCText && optionDText)
                ) {
                  if (correctAns) {
                    if (QuestionMarks) {
                      addQuestionRequest();
                    } else {
                      alert("Enter Weightage of Question");
                    }
                  } else {
                    alert("Select Correct Answer");
                  }
                } else {
                  alert("Enter All Options");
                }
              } else {
                alert("Select Question Image or Question Text");
              }
            } else {
              alert("Select Question Difficulty");
            }
          } else {
            alert("Select Language");
          }
        } else {
          alert("Select Chapter");
        }
      } else {
        alert("Select Subject");
      }
    } else {
      alert("Select Class");
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
      <div className="row addQuestion_wrapper">
        <div className="col m6 s12 center">
          <h4>Add Question</h4>
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
              value={classValue}
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
              value={subjectValue}
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
              value={chapterValue}
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
              value={language}
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
              value={difficulty}
            >
              <option selected disabled value="">
                Select Question Difficulty
              </option>
              <option value="0">Easy</option>
              <option value="1">Moderate</option>
              <option value="2">Hard</option>
            </Select>
          </div>

          <div className="add_question_picker">
            <RadioGroup
              label="Pick Question Image"
              name="Question"
              onChange={handleQuestionPicker}
              options={[
                {
                  label: "Is Question Image",
                  value: "1",
                },
                {
                  label: "Is Question Text",
                  value: "0",
                },
              ]}
              value={isQuestionImage}
              withGap
            />
            <br />
            {isQuestionImage === "1" ? (
              <TextInput
                label="Question Image"
                onChange={handleQuestionFile}
                type="file"
                accept="image/*"
              />
            ) : (
              <Textarea
                label="Enter Question"
                onChange={handleQuestionText}
                placeholder="Enter Question"
                data-length={1000}
                validate={true}
              />
            )}
            {questionPreview ? (
              <img
                src={questionPreview}
                height={200}
                width={200}
                alt="QuestionImg"
              />
            ) : null}
          </div>

          <div className="option_wrapper">
            <label>
              <input
                type="radio"
                name="isOptionImage"
                value="1"
                checked={isOptionimage === "1"}
                onChange={(event) => {
                  setOptionAText(null);
                  setOptionBText(null);
                  setOptionCText(null);
                  setOptionDText(null);
                  setIsOptionimage("1");
                }}
                className="with-gap"
              />
              <span>Are Options Image</span>
            </label>
            <label>
              <input
                type="radio"
                name="isOptionImage"
                value="0"
                checked={isOptionimage === "0"}
                onChange={(event) => {
                  setOptionAFile(null);
                  setOptionBFile(null);
                  setOptionCFile(null);
                  setOptionDFile(null);
                  setIsOptionimage("0");
                }}
                className="with-gap"
              />
              <span>Are Options Text</span>
            </label>
            <br />

            {isOptionimage === "1" ? (
              <div>
                <TextInput
                  label="Select Option A"
                  type="file"
                  name="optionA"
                  accept="image/*"
                  onChange={handleOptionImage}
                />
                <TextInput
                  label="Select Option B"
                  type="file"
                  name="optionB"
                  accept="image/*"
                  onChange={handleOptionImage}
                />
                <TextInput
                  label="Select Option C"
                  type="file"
                  name="optionC"
                  accept="image/*"
                  onChange={handleOptionImage}
                />
                <TextInput
                  label="Select Option D"
                  type="file"
                  name="optionD"
                  accept="image/*"
                  onChange={handleOptionImage}
                />
              </div>
            ) : (
              <div>
                <TextInput
                  label="Option A"
                  type="text"
                  onChange={(event) => setOptionAText(event.target.value)}
                />
                <TextInput
                  label="Option B"
                  type="text"
                  onChange={(event) => setOptionBText(event.target.value)}
                />
                <TextInput
                  label="Option C"
                  type="text"
                  onChange={(event) => setOptionCText(event.target.value)}
                />
                <TextInput
                  label="Option D"
                  type="text"
                  onChange={(event) => setOptionDText(event.target.value)}
                />
              </div>
            )}
          </div>

          <div className="correct_wrapper">
            <Select
              label="Correct Option"
              onChange={handleAnswerChange}
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
                Select Correct Answer
              </option>
              <option value="1">A</option>
              <option value="2">B</option>
              <option value="3">C</option>
              <option value="4">D</option>
            </Select>
          </div>

          <div className="add_solution_picker">
            <label>
              <input
                type="radio"
                name="sol"
                value="1"
                checked={isSolutionImage === "1"}
                onChange={(event) => {
                  setSolutionText(null);
                  setIsSolutionImage("1");
                }}
                className="with-gap"
              />
              <span>Is Solution Image</span>
            </label>
            <label>
              <input
                type="radio"
                name="sol"
                value="0"
                checked={isSolutionImage === "0"}
                onChange={(event) => {
                  setSolutionFile(null);
                  setIsSolutionImage("0");
                }}
                className="with-gap"
              />
              <span>Is Solution Text</span>
            </label>
            <br />
            {isSolutionImage === "1" ? (
              <TextInput
                label="Solution Image"
                onChange={handleSolutionFile}
                type="file"
                accept="image/*"
              />
            ) : (
              <Textarea
                label="Enter Solution"
                onChange={handleSolutionText}
                placeholder="Enter Solution"
                data-length={1000}
                validate={true}
              />
            )}
            {solutionPreview ? (
              <img
                src={solutionPreview}
                height={200}
                width={200}
                alt="SolutionImg"
              />
            ) : null}
          </div>
          <div>
            <TextInput
              type="number"
              min="1"
              max="10"
              required
              label="Weightage"
              placeholder="Enter Question Marks"
              onChange={(event) => setQuestionMarks(event.target.value)}
            />
          </div>
          <button
            className="btn blue waves-effect waves-light"
            onClick={handleAddQuestion}
          >
            Add Question
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddQuestion;
