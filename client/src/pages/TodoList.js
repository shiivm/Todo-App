import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import openSocket from 'socket.io-client';

import { Container, Row, Col } from "react-bootstrap";

import TodoCard from "../components/TodoList/TodoCard";
import { getItems, deleteTodo } from "../action/itemActions";

const TodoList = (props) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [todoItems, setTodoItems] =  useState([]);
  const [userRole, setUserRole] =  useState(props.userRole);

  useEffect(() => {
    props.getItems();
    if(userRole === 'admin'){
      const socket = openSocket();
      socket.on('todo', data => {
        if(data.action === 'create'){
          onAddPost(data.item);
        }
        if(data.action === 'update'){
          onUpdatePost(data.item)
        }
        if(data.action === 'delete'){
          onDeleteTodo(data.id)
        }
      });
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAddPost = item => {
    setTodoItems(prevState => {
      const updatedPosts = [...prevState, item];
      updatedPosts.sort((a,b) => {
        if(a.dateTime > b.dateTime) return 1;
        if(a.dateTime < b.dateTime) return -1;
        return 0;
      })
      return updatedPosts;
    });
  };

  const onUpdatePost = item => {
    setTodoItems(prevState => {
      const updatedPosts = [...prevState];
      const updatedPostIndex = updatedPosts.findIndex(p => p._id === item._id);
      if (updatedPostIndex > -1) {
        updatedPosts[updatedPostIndex] = item;
      }
      return updatedPosts;
    });
  };

  const onDeleteTodo = id => {
    setTodoItems(prevState => {
      let updatedPosts = [...prevState];
      updatedPosts = updatedPosts.filter(
        (item) => item._id !== id
      );
      return updatedPosts;
    })
  }

  useEffect(() => {
    setTodoItems(props.todoItems);
    if(props.todoItems.length === 0){
      setErrorMsg("No items");
    } else {
      setErrorMsg("");
    }
  }, [props.todoItems]);

  useEffect(() => {
    setUserRole(props.userRole);
  },[props.userRole])
  
  useEffect(() => {
    if (props.error ) {
      setErrorMsg(props.error);
    }
  }, [props.error]);

  const deleteTodo = (id) => {
    props.deleteTodo(id);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col>
          <h1 className="text-center">Todo List</h1>
        </Col>
      </Row>
      {errorMsg && (
        <Row>
          <Col className="text-center">{errorMsg}</Col>
        </Row>
      )}
      {todoItems  && todoItems.length > 0 && (todoItems || []).map((item) => {
        return <TodoCard item={item} key={item._id} userRole= {userRole} deleteTodo={deleteTodo} />;
      })}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    todoItems: state.item.todoItems,
    error: state.error.itemError,
    status : state.error.status,
    isAuthenticated : state.auth.isAuthenticated,
    userRole : state.auth.userInfo.role
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getItems: () => dispatch(getItems()),
    deleteTodo: (id) => dispatch(deleteTodo(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
