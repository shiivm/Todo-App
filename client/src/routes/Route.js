import React from 'react'

import TodosList from "../pages/TodoList";
import CreateTodo from "../pages/CreateTodo";
import EditTodo from "../pages/EditTodo";
import Login from "../pages/Login";
import Register from "../pages/Register";

const ROUTES = [
  {
    path: "/login",
    key: "login",
    component: Login,
    exact: true,
    isProtected : false 
  },
  {
    path: "/register",
    key: "register",
    component: Register,
    exact: true,
    isProtected : false
  },
  {
    path: "/",
    key: "home",
    component: TodosList,
    exact: true,
    isProtected : true 
  },
  {
    path: "/create",
    key: "createTodo",
    component: CreateTodo,
    exact: true,
    isProtected : true 
  },
  {
    path: "/edit/:id([a-zA-Z0-9]+)",
    key: "editTodo",
    component: EditTodo,
    exact: true,
    isProtected : true 
  },
  {
    key: "notFound",
    component: () => <h1>404 Not Found!!</h1>,
    exact: true,
    isProtected : false
  },
];

export default ROUTES;