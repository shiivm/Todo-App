import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import _ from 'lodash';
import { useHistory, useLocation } from 'react-router-dom';

import { Container, Row, Col } from 'react-bootstrap';

import { getItemById, updateItem } from "../action/itemActions";
import TodoForm from '../components/commom/TodoForm'

const EditTodo = (props) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [todoItem, settodoItem] = useState({ ...props.todoItem } || {});
  const todoId = _.get(props,'match.params.id',null);
  const history = useHistory();
  const location = useLocation();
  
  const { from } = location.state || { from: { pathname: "/" } };
  
  useEffect(() => {
    if(props.isUpdated) history.replace(from);
  },[props.isUpdated,from,history]);

  useEffect(() => {
    if (props.error ) {
      setErrorMsg(props.error);
    }
  }, [props.error]);
  
  useEffect(() => {
    props.getItemById(todoId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    settodoItem(props.todoItem);
  }, [props.todoItem]);
  
  if(props.error)
    props.history.push("/notFound");
  
  const handleOnSubmit = (data) => {
    data.dateTime = new Date(data.dateTime).toISOString();
    props.updateItem(data,todoId);
  }
  
  return (
    <Container>
      <h1 className="text-center">Edit Todo</h1>
      {errorMsg && (
        <Row>
          <Col className="text-center">{errorMsg}</Col>
        </Row>
      )}
      <TodoForm onSubmit = { handleOnSubmit } todoItem = { todoItem } />
    </Container>
  );
};
const mapStateToProps = (state) => {
    return {
        todoItem: state.item.todoItem,
        error: state.error.itemError,
        isUpdated : state.item.isUpdated,
        status : state.error.status,
        isAuthenticated : state.auth.isAuthenticated,
      };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getItemById: (todoId) => dispatch(getItemById(todoId)),
    updateItem: (data,todoId) => dispatch(updateItem(data,todoId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditTodo);
