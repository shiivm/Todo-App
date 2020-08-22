import React from "react";
import { NavLink } from "react-router-dom";

import { Card, Button, Row, Col } from "react-bootstrap";

const TodoCard = (props) => {
  const deleteTodo = (id) => {
    props.deleteTodo(id);
  };
  return (
    <Row className="todo-card">
      <Col>
        <Card>
          <Card.Header>{new Date(props.item.dateTime).toString()}</Card.Header>
          <Card.Body>
            <Card.Title>{props.item.title}</Card.Title>
            <Card.Text>{props.item.description}</Card.Text>
            {props.userRole !== "admin" && <Button
              size="sm"
              as={NavLink}
              to={`/edit/${props.item._id}`}
              variant="primary"
            >
              Edit
            </Button>}{" "}
            {props.userRole !== "admin" && <Button
              size="sm"
              variant="danger"
              onClick={() => deleteTodo(props.item._id)}
            >
              Delete
            </Button>}
          </Card.Body>
          {props.userRole === "admin" && (
            <Card.Footer>
              <small className="text-muted blockquote-footer text-right">{props.item.userId.email}</small>
            </Card.Footer>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default TodoCard;
