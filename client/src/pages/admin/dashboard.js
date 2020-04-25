import React, { useState, useContext } from "react";
import Book from "../../images/book.png";
import Teacher from "../../images/teacher.png";
import Question from "../../images/faq.png";
import TakeExam from "../../images/exam.png";
import Exam from "../../images/grade.png";
import "./dashboard.css";
import { Modal, Button, TextInput, Textarea } from "react-materialize";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../config/auth";

const Dashboard = () => {
  const { userEmail, token } = useContext(AuthContext);
  const history = useHistory();

  const [examName, setExamName] = useState("");
  const [examDuration, setExamDuration] = useState("");
  const [examDesc, setExamDesc] = useState("");

  const handleAddExam = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}admin/add/exam`,
      {
        method: "POST",
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          email: userEmail,
          examName,
          examDuration,
          examDesc,
        }),
      }
    );

    const responseData = await response.json();
    if (responseData.success === "1") {
      history.push("/take-exam");
    } else {
      alert("Error Occured");
    }
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col s12 m6">
          <div className="icons-menu-wrapper">
            <NavLink to="add-edit-dept">
              <div className="item-wrapper">
                <img src={Teacher} alt="class" height="100" width="100" />
                <h6>Add Class/Subject</h6>
              </div>
            </NavLink>
            <NavLink to="take-exam">
              <div className="item-wrapper">
                <img src={Book} alt="subject" height="100" width="100" />
                <h6>Take Exam</h6>
              </div>
            </NavLink>
            <NavLink to="add">
              <div className="item-wrapper">
                <img src={Question} alt="question" height="100" width="100" />
                <h6>Add Question</h6>
              </div>
            </NavLink>
            <Modal
              actions={[
                <Button
                  flat
                  modal="close"
                  node="button"
                  waves="green"
                  onClick={handleAddExam}
                >
                  Add Exam
                </Button>,
              ]}
              bottomSheet={false}
              fixedFooter={false}
              header="Add Exam"
              id="modal-0"
              options={{
                dismissible: true,
                endingTop: "10%",
                inDuration: 250,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                opacity: 0.5,
                outDuration: 250,
                preventScrolling: true,
                startingTop: "4%",
              }}
              trigger={
                <div node="button">
                  <div className="item-wrapper">
                    <img src={Exam} alt="exam" height="100" width="100" />
                    <h6>Add Exam</h6>
                  </div>
                </div>
              }
            >
              <p>
                <TextInput
                  type="text"
                  label="Exam Name"
                  onChange={(event) => setExamName(event.target.value)}
                />
                <TextInput
                  type="number"
                  min="1"
                  label="Exam Duration"
                  placeholder="E.g: 120 (In Minutes)"
                  onChange={(event) => setExamDuration(event.target.value)}
                />
                <Textarea
                  label="Exam Description"
                  onChange={(event) => setExamDesc(event.target.value)}
                />
              </p>
            </Modal>

            <NavLink to="config-exam">
              <div className="item-wrapper">
                <img src={TakeExam} alt="Instruct" height="100" width="100" />
                <h6>Configure Exams</h6>
              </div>
            </NavLink>
            <NavLink to="result">
              <div className="item-wrapper">
                <img
                  src={require("../../images/results.png")}
                  alt="Instruct"
                  height="100"
                  width="100"
                />
                <h6>Results</h6>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
