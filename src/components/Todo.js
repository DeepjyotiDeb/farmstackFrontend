import axios from "../components/api/axiosCustom"

export default function TodoItem(props){
  
    const deleteTodo = (title) => {
        axios.delete(`todo/${title}`).then((res) => {
          console.log(res.data);
        });
    }

    return (
      <div>
        {/* {console.log("state", props.todo.title)} */}
        <p>
          <span style={{ fontWeight: "bold, underline" }}>
            {props.todo.title}:
          </span>
          {props.todo.description}
          <button
            onClick={() => {
              deleteTodo(props.todo.title);
              props.deleteHandler.onDelete(props.todo.title);
              console.log("deleted todo", props.todo.title)
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