import React from "react";
import { Row, Col, Preloader } from "react-materialize";
import "./loading.css";

const Loading = () => {
  return (
    <div className='loader-wrapper'>
      <Row>
        <Col s={4}>
          <Preloader active color='blue' flashing />
        </Col>
      </Row>
    </div>
  );
};

export default Loading;
