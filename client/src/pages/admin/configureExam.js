import React, { useEffect, useState, useContext } from "react";
import "./configureExam.css";
import LoadingScreen from "../../components/Loading";
import { AuthContext } from "../../config/auth";
import { Select, RadioGroup, Button, Icon } from "react-materialize";

const ConfigureExam = () => {
  const { token, userEmail } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [examList, setExamList] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [examId, setExamId] = useState(null);

  useEffect(() => {
    const fetchExamList = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}admin/get/get-examlist-by-admin`,
          {
            method: "POST",
            headers: {
              Accept: "Aplication/json",
              Authorization: "Bearer " + token,
              "Content-Type": "Application/json",
            },
            body: JSON.stringify({
              email: userEmail,
            }),
          }
        );
        const responseData = await response.json();
        console.log(responseData);
        setExamList(responseData.data);
      } catch (error) {
        console.log(error);
        alert("Server Error");
      }
      setIsLoading(false);
    };
    fetchExamList();
  }, [token, userEmail]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}admin/update/examinfo`,
        {
          method: "POST",
          headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
          },
          body: JSON.stringify({
            examid: examId,
            isLive,
            showResult,
          }),
        }
      );
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <div className="configure-wrapper">
      <div className="configure-section-1">
        <Select
          label="Exam"
          onChange={(event) => {
            setSelectedExam(event.target.value);
            var newData;
            examList.map((data) => {
              if (parseInt(data.id) === parseInt(event.target.value)) {
                newData = data;
              }
              return 0;
            });
            setExamId(newData.id);
            setIsLive(newData.isLive);
            setShowResult(newData.showResult);
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
            Choose your Exam
          </option>
          {examList.length > 0 ? (
            examList.map((data) => {
              return (
                <option key={data.id} value={data.id}>
                  {data.exam_name}
                </option>
              );
            })
          ) : (
            <option disabled>Loading</option>
          )}
        </Select>
        {examId ? (
          <div>
            <br />
            <br />
            <br />
            <RadioGroup
              label="Show/Hide Exam"
              name="size"
              onChange={(event) => {
                if (event.target.value === "1") {
                  setShowResult(0);
                }
                if (event.target.value === "0") {
                  setShowResult(1);
                }
                setIsLive(event.target.value);
              }}
              options={[
                {
                  label: "Show Exam",
                  value: "1",
                },
                {
                  label: "Hide Exam",
                  value: "0",
                },
              ]}
              value={isLive}
              withGap
            />
            <br />
            <br />
            <br />
            <Button
              node="button"
              type="submit"
              waves="light"
              onClick={handleSubmit}
            >
              Submit
              <Icon right>send</Icon>
            </Button>
          </div>
        ) : (
          <h4>Select Exam To View More</h4>
        )}
      </div>
    </div>
  );
};

export default ConfigureExam;
