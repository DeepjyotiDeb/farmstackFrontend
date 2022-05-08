import axios from "../components/api/axiosCustom"
import React, { useContext } from "react"
import { GlobalTodoContext } from "../App";

export default function TodoItem(props){
  const state = useContext(GlobalTodoContext)
    const deleteTodo = (title) => {
        axios.delete(`todo/${title}`).then((res) => {
          // console.log(res.data, state);
          updateDeleteList(res.data);
        });
    }
    const updateDeleteList = (data) => {
      const refId = state.findIndex(ele => ele.title === data[2]);
      console.log("ref id is :", refId);
      state.splice(refId, 1);
      console.log("state after splicing", state)
    }
    return (
      <div>
        {/* {console.log("state", state)} */}
        <p>
          <span style={{ fontWeight: "bold, underline" }}>
            {props.todo.title}:
          </span>
          {props.todo.description}
          <button
            onClick={() => {
                deleteTodo(props.todo.title);
                
            }}
            className="btn btn-outline-danger my-2 mx-2"
            style={{ borderRadius: "50px" }}
          >
            x
          </button>
        </p>
        <hr></hr>
      </div>
    );
}