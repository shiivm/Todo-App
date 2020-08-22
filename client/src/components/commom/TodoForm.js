import React, { useState, useEffect } from "react";
import _ from "lodash";

import "react-datepicker/dist/react-datepicker.css";
import { Form, Button, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";

const ToDoForm = (props) => {
  const [todoItem, setTodoItemState] = useState({ ...props.todoItem, dateTime : new Date() } || {});
  const [todoId, setTodoIdState] = useState(null);
  const [validationErr, setValidationErr] = useState([]);

  useEffect(() => {
    setTodoItemState({
      ...props.todoItem,
      dateTime:
        props.todoItem && props.todoItem.dateTime
          ? new Date(props.todoItem.dateTime)
          : new Date(),
    });
    if (
      typeof props.todoItem != "undefined" &&
      typeof props.todoItem._id != "undefined"
    )
      setTodoIdState(props.todoItem._id);
  }, [props.todoItem]);

  const changeHandler = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setTodoItemState({
      ...todoItem,
      [fieldName]: fieldValue,
    });
  };

  const handleDateTimeChange = (dateTime) => {
    setTodoItemState({
      ...todoItem,
      dateTime: dateTime,
    });
  };

  const hasError = (key) => {
    return validationErr.indexOf(key) !== -1;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = [];
    const { title, description, dateTime } = todoItem;
    if (_.isEmpty(title)) {
      errors.push("title");
    }

    if (_.isEmpty(description)) {
      errors.push("description");
    }

    if (!_.isDate(dateTime)) {
      errors.push("dateTime");
    }

    setValidationErr(errors);
    if (errors.length > 0) return false;

    const data = todoItem;
    props.onSubmit(data, todoId);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <fieldset>
        <Form.Group controlId="title" as={Row}>
          <Form.Label column sm="3">
            Title*
          </Form.Label>
          <Col sm="9">
            <Form.Control
              as="input"
              name="title"
              className={hasError("title") ? "is-invalid" : ""}
              placeholder="Title"
              value={todoItem && todoItem.title ? todoItem.title : ""}
              onChange={changeHandler}
            />
            <span className={hasError("title") ? "inline-errormsg" : "hidden"}>
              {" "}
              Enter Title{" "}
            </span>
          </Col>
        </Form.Group>
        <Form.Group controlId="description" as={Row}>
          <Form.Label column sm="3">
            Description*
          </Form.Label>
          <Col sm="9">
            <Form.Control
              as="textarea"
              name="description"
              className={hasError("description") ? "is-invalid" : ""}
              placeholder="Description"
              value={
                todoItem && todoItem.description ? todoItem.description : ""
              }
              rows="3"
              onChange={changeHandler}
            />
            <span className={hasError("description") ? "inline-errormsg" : "hidden"}>
              {" "}
              Enter Description{" "}
            </span>
          </Col>
        </Form.Group>
        <Form.Group controlId="dateTime" as={Row}>
          <Form.Label column sm="3">
            Date and Time*
          </Form.Label>
          <Col sm="9">
            <DatePicker
              selected={
                todoItem && todoItem.dateTime ? new Date(todoItem.dateTime) : new Date()
              }
              name="dateTime"
              onChange={handleDateTimeChange}
              className={
                hasError("dateTime")
                  ? "form-control is-invalid"
                  : "form-control"
              }
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              timeCaption="Time"
              minDate={new Date()}
              dateFormat="dd-MM-yyyy h:mm aa"
            />
            <span className={hasError("dateTime") ? "inline-errormsg" : "hidden"}>
              {" "}
              Invalid DateTime{" "}
            </span>
          </Col>
        </Form.Group>
        <Form.Row className="align-items-center">
          <Col xs="auto">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Form.Row>
      </fieldset>
    </Form>
  );
};

export default ToDoForm;
