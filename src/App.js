import "bootstrap/dist/css/bootstrap.min.css";
import {  useEffect, useState } from "react";
import "./App.css";
import axios from "../src/components/api/axiosCustom";
import TodoView from "./components/TodoView";


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
      // console.log("res in each", res.data);
    });
  },[]);
  const addTodoHandler = (e) => {
    console.log(e)
    axios
      .post("todo", {
        title: state.title,
        description: state.desc,
      })
      .then((res) => {
        // console.log("response data",res.data, "state list:",...state.todoList);
        e.target.value = ""
        setState(prevState => ({
          ...prevState,
          todoList: [...prevState.todoList, res.data],
          [e.target.name]: e.target.value
        }));
      });
  };

  const handleInput = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
 
  const stateButton = () => {
    console.log("before",state);
    setState((prevState)=>({
      ...prevState,
      title: "",
      desc:""
    }))
  }
  const stateButton2 = () => {
    console.log("state2", state)
  }
  const deleteHandler = (someValue) => {
    console.log("id", someValue);
    const refId = state.todoList.findIndex(ele => ele.title === someValue);
    // state.todoList.splice(refId, 1);
    state.todoList.splice(refId,1)
    console.log("spliced array", state.todoList)
    console.log(refId);
    setState(prevState => ({
      ...prevState,
      todoList: state.todoList,
      title:'',
      desc: '',
    }))
    console.log("newstate",state.todoList);
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
          <div>
            <TodoView todo={state.todoList} onDelete={deleteHandler}></TodoView>
          </div>
      </div>
      <h6 className="card text-dark bg-warning py-1 mb-0">
        Copyright 2022, all rights reserved &copy;
      </h6>
      {state && (
        <button
          className="btn mx-1 mb-3"
          onClick={stateButton}
          style={{ borderRadius: "50px" }}
        >
          show state
        </button>
      )}
      <button
          className="btn mx-1 mb-3"
          onClick={stateButton2}
          style={{ borderRadius: "50px" }}
        >
          show state2
        </button>
      {/* {console.log("state:", state.todoList)} */}
    </div>
  );
}

export default App;
