import { useContext } from "react";
import { GlobalTodoContext } from "../App";
import TodoItem from "./Todo";

export default function TodoView() {
    const state = useContext(GlobalTodoContext)
    return (
        <div>
            {console.log("prop items", state)}
            <ul>
                {state.map((todo, id) => <TodoItem key ={id} todo={todo}></TodoItem>)}
            </ul>
        </div>
    )
}