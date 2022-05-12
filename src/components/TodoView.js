import TodoItem from "./Todo";

export default function TodoView(props) {
    return (
        <div>
            <ul>
                {props.todo.map((todo, id) => <TodoItem key ={id} todo={todo} deleteHandler={props}></TodoItem>)}
            </ul>
        </div>
    )
}