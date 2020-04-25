import React, { useEffect, useState, useContext } from "react";
import "./result.css";
import { AuthContext } from "../../config/auth";
import LoadingScreen from "../../components/Loading";
import { Select, Table } from "react-materialize";

const ResultPage = () => {
  const { token, userEmail } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [examList, setExamList] = useState([]);
  const [resultData, setResultData] = useState([]);

  const handleFetchExam = async (event) => {
    const val = event.target.value;
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}admin/get/result`,
        {
          method: "POST",
          headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
          },
          body: JSON.stringify({
            examid: val,
          }),
        }
      );
      const responseData = await response.json();
      if (responseData.success === "1") {
        console.log(responseData.data);
        setResultData(responseData.data);
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchExamList = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}admin/get/get-examlist-by-admin-result`
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

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <div className="configure-wrapper">
      <div className="configure-section-1">
        <Select
          label="Exam"
          onChange={(event) => handleFetchExam(event)}
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
        {resultData.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Correct Answer</th>
                <th>Wrong Answer</th>
                <th>Not Attempted</th>
                <th>Marks Obtained</th>
                <th>Total Marks</th>
              </tr>
            </thead>
            <tbody>
              {resultData.map((data) => {
                return (
                  <tr>
                    <td>{data.email}</td>
                    <td>{data.correctAns}</td>
                    <td>{data.wrongAns}</td>
                    <td>{data.notAttemted}</td>
                    <td>{data.marks}</td>
                    <td>{data.totalMarks}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <h5>Select Exam</h5>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
