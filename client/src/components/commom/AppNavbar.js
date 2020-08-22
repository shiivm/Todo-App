import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { Navbar, Nav } from "react-bootstrap";

import { logout } from '../../action/authActions'

const AppNavbar = ({ isAuthenticated, logout }) => {
  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <Navbar.Brand as={NavLink} to="/">
        Todo Application
      </Navbar.Brand>
      {isAuthenticated && (
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} exact to="/">
            Todo List
          </Nav.Link>
          <Nav.Link as={NavLink} exact to="/create">
            Create Todo
          </Nav.Link>
        </Nav>
      )}
      {!isAuthenticated && (
        <Nav className="ml-auto">
          <Nav.Link as={NavLink} exact to="/register">
            Register
          </Nav.Link>
          <Nav.Link as={NavLink} exact to="/login">
            Login
          </Nav.Link>
        </Nav>
      )}
      {isAuthenticated && (
        <Nav className="ml-auto">
          <Nav.Link onClick={logout}>
            Logout
          </Nav.Link>
        </Nav>
      )}
    </Navbar>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout : () => dispatch(logout())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavbar);
