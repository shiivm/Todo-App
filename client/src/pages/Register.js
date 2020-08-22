import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { useHistory, useLocation } from 'react-router-dom';

import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";

import { registerUser } from "../action/authActions";

const Register = (props) => {
  const [userInfo, setuserInfoState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [validationErr, setValidationErr] = useState([]);

  const history = useHistory();
  const location = useLocation();
  
  const { from } = location.state || { from: { pathname: "/" } };

  useEffect(() => {
    if (props.error && !_.isEmpty(props.error) && (props.status !== 401)) {
      setErrorMsg(props.error);
    }
  }, [props.error,props.status]);
  
  useEffect(() => {
    if (props.isAuthenticated) {
      history.replace(from);
    }
  }, [props.isAuthenticated, from,history]);


  const changeHandler = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setuserInfoState({
      ...userInfo,
      [fieldName]: fieldValue,
    });
  };

  const onCloseHandler = () => {
    setErrorMsg("");
  };

  const hasError = (key) => {
    return validationErr.indexOf(key) !== -1;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = [];
    const { name, email, password, confirmPassword } = userInfo;
    if (_.isEmpty(name)) {
      errors.push("name");
    }
    // eslint-disable-next-line
    const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (_.isEmpty(email) || !emailRegexp.test(email)) {
      errors.push("email");
    }

    if (_.isEmpty(password)) {
      errors.push("password");
    }
    if (_.isEmpty(confirmPassword)) {
      errors.push("confirmPassword");
    }
    if (password !== confirmPassword) {
      errors.push("confirmPassword");
    }
    setValidationErr(errors);
    if (errors.length > 0) return false;

    const data = { name, email, password };
    props.registerUser(data);
  };
  return (
    <Container>
      <h1 className="text-center">Register</h1>
      <Form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <fieldset>
          {errorMsg && (
            <Alert variant="danger" onClose={onCloseHandler} dismissible>
              {errorMsg}
            </Alert>
          )}
          <Form.Group controlId="name" as={Row}>
            <Form.Label column sm="3">
              Name*
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                name="name"
                className={hasError("name") ? "is-invalid" : ""}
                placeholder="Enter Your Name"
                value={userInfo.name}
                onChange={changeHandler}
                required
              />
              <span className={hasError("name") ? "inline-errormsg" : "hidden"}>
                {" "}
                Enter your name{" "}
              </span>
            </Col>
          </Form.Group>
          <Form.Group controlId="emailId" as={Row}>
            <Form.Label column sm="3">
              Email*
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="email"
                name="email"
                className={hasError("email") ? "is-invalid" : ""}
                placeholder="Enter email"
                value={userInfo.email}
                onChange={changeHandler}
                required
              />
              <span
                className={hasError("email") ? "inline-errormsg" : "hidden"}
              >
                {" "}
                Enter your email{" "}
              </span>
            </Col>
          </Form.Group>

          <Form.Group controlId="password" as={Row}>
            <Form.Label column sm="3">
              Password*
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="password"
                name="password"
                className={hasError("password") ? "is-invalid" : ""}
                placeholder="Password"
                value={userInfo.password}
                onChange={changeHandler}
                required
              />
              <Form.Text id="passwordHelpBlock" muted>
                Your password must be 8-30 characters long, should be
                combination of lower characters, upper characters, numbers and
                special characters.
              </Form.Text>
              <span
                className={hasError("password") ? "inline-errormsg" : "hidden"}
              >
                {" "}
                Enter a valid password{" "}
              </span>
            </Col>
          </Form.Group>
          <Form.Group controlId="confirmPassword" as={Row}>
            <Form.Label column sm="3">
              Confirm Password*
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="password"
                name="confirmPassword"
                className={hasError("confirmPassword") ? "is-invalid" : ""}
                placeholder="Confirm Password"
                value={userInfo.confirmPassword}
                onChange={changeHandler}
                required
              />
              <span
                className={
                  hasError("confirmPassword") ? "inline-errormsg" : "hidden"
                }
              >
                {" "}
                Confirm your password{" "}
              </span>
            </Col>
          </Form.Group>
          <Form.Row className="align-items-center">
            <Col xs="auto">
              <Button variant="primary" type="submit">
                Register
              </Button>
            </Col>
          </Form.Row>
        </fieldset>
      </Form>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    error: state.error.error,
    status: state.error.status,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (data) => dispatch(registerUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
