import React, { useState, useEffect} from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from 'react-router-dom';

import { Container, Row, Col } from 'react-bootstrap';

import { addItem } from "../action/itemActions";
import TodoForm from '../components/commom/TodoForm'

const CreateTodo = (props) => {
  const [errorMsg, setErrorMsg] = useState("");
  const history = useHistory();
  const location = useLocation();
  
  const { from } = location.state || { from: { pathname: "/" } };
  useEffect(() => {
    if(props.isCreated) history.replace(from);
  },[props.isCreated,from,history]);
  
  useEffect(() => {
    if (!props.isAuthenticated) {
      props.history.push("/login");
    }
  }, [props.isAuthenticated,props.history]);
  
  useEffect(() => {
    if (props.error ) {
      setErrorMsg(props.error);
    }
  }, [props.error]);

  const handleOnSubmit = (data) => {
    data.dateTime = new Date(data.dateTime).toISOString();
    props.addItem(data);
  }
  
  return (
    <Container>
      <h1 className="text-center">Create Todo</h1>
      {errorMsg && (
        <Row>
          <Col className="text-center">{errorMsg}</Col>
        </Row>
      )}
      <TodoForm onSubmit = { handleOnSubmit } />
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    error: state.error.itemError,
    isCreated : state.item.isCreated,
    status : state.error.status,
    isAuthenticated : state.auth.isAuthenticated
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (data) => dispatch(addItem(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateTodo);
