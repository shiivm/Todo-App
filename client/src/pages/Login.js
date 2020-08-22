import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { useHistory, useLocation } from 'react-router-dom';

import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";

import { loginUser } from "../action/authActions";

const Login = (props) => {
  const [userInfo, setuserInfoState] = useState({
    email: "",
    password: "",
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
    const { email, password } = userInfo;

    // eslint-disable-next-line
    const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (_.isEmpty(email) || !emailRegexp.test(email)) {
      errors.push("email");
    }

    if (_.isEmpty(password)) {
      errors.push("password");
    }

    setValidationErr(errors);
    if (errors.length > 0) return false;

    const data = { email, password };
    props.loginUser(data);
  };
  return (
    <Container>
      <h1 className="text-center">Login</h1>
      <Form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <fieldset className="login">
          {errorMsg && (
            <Alert variant="danger" onClose={onCloseHandler} dismissible>
              {errorMsg}
            </Alert>
          )}
          <Form.Group controlId="emailId" as={Row}>
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="email"
                placeholder="Enter email"
                className={hasError("email") ? "is-invalid" : ""}
                name="email"
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
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="password"
                placeholder="Password"
                className={hasError("password") ? "is-invalid" : ""}
                name="password"
                value={userInfo.password}
                onChange={changeHandler}
                required
              />
              <span
                className={hasError("password") ? "inline-errormsg" : "hidden"}
              >
                {" "}
                Invalid password{" "}
              </span>
            </Col>
          </Form.Group>
          <Form.Row className="align-items-center">
            <Col xs="auto">
              <Button variant="primary" type="submit">
                Login
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
    loginUser: (data) => dispatch(loginUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
