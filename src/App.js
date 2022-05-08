import "bootstrap/dist/css/bootstrap.min.css";
import { createContext, useEffect, useState } from "react";
import "./App.css";
import axios from "../src/components/api/axiosCustom";
import TodoView from "./components/TodoView";

export const GlobalTodoContext = createContext();

function App() {
  const [state, setState] = useState({
    todoList: [], ///values recvd in todo list
    title: "", //local values for setting
    desc: "",
  });
  useEffect(() => {
    axios.get("todo").then((res) => {
      setState({
        todoList: [...res.data],
      });
      console.log("res in each", res.data);
    });
  },[]);
  const addTodoHandler = () => {
    axios
      .post("todo", {
        title: state.title,
        description: state.desc,
      })
      .then((res) => {
        // console.log("response data",res.data, "state list:",...state.todoList);
        setState(prevState => ({
          ...prevState,
          todoList: [...prevState.todoList, res.data]
        }))
      });
  };

  const handleInput = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
 
  const stateButton = () => {
    console.log("state",state.todoList);
  }
  return (
    <div
      className="App list-group-item justify-content-center align-items-center mx-auto"
      style={{ width: "400px", backgroundColor: "white", marginTop: "15px" }}
    >
      <h1
        className="card text-white bg-primary mb-1"
        stylename="max-width: 20rem;"
      >
        Task manager
      </h1>
      <h6 className="card text-white bg-primary mb-3">
        FastAPI - React - MongoDB
      </h6>
      <div className="card-body">
        <h5 className="card text-white bg-dark mb-3">Add Task</h5>
        <span className="card-text">
          <input
            name="title"
            className="mb-2 form-control titleIn"
            placeholder="Title"
            onChange={handleInput}
          />
          <input
            name="desc"
            className="mb-2 form-control desIn"
            placeholder="Description"
            onChange={handleInput}
          />
          {
            <button
              className="btn btn-outline-primary mx-2 mb-3"
              style={{ borderRadius: "50px", fontWeight: "bold" }}
              onClick={addTodoHandler}
              disabled={!state.title}
            >
              Add Task
            </button>
          }
        </span>
        <h5 className="card text-white bg-dark mb-3">Your Tasks</h5>
        <GlobalTodoContext.Provider value = {state.todoList}>
          <div>
            <TodoView todo={state.todoList}></TodoView>
          </div>
        </GlobalTodoContext.Provider>
      </div>
      <h6 className="card text-dark bg-warning py-1 mb-0">
        Copyright 2022, all rights reserved &copy;
      </h6>
      {!state && (
        <button
          className="btn mx-1 mb-3"
          onClick={stateButton}
          style={{ borderRadius: "50px" }}
        >
          show state
        </button>
      )}
      {/* {console.log("state:", state)} */}
    </div>
  );
}

export default App;
