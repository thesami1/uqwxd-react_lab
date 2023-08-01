import React, { useState } from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [editingText, setEditingText] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);


  // Add the handlesubmit code here
  const handleSubmit = (e) =>{
    e.preventDefault();

    const newTodo = {
        id: new Date().getTime(),
        text: todo.trim(),
        completed:false,
    }
    if(newTodo.text.length > 0){
        const shallowCopy = [...todos];
        const concatenated = shallowCopy.concat(newTodo);
        setTodos(concatenated);
        setTodo("");
    }else{
        alert("Enter a valid task");
        setTodo("");
    }

  }
  
  // Add the deleteToDo code here
  const deleteToDo = (id) => {
    let updatedTodo = [...todos].filter(
        (todo) => todo.id !== id);
    setTodos(updatedTodo);
  }
  
  // Add the toggleComplete code here
  const toggleComplete = (id) => {
      let updatedTodos = [...todos].map((todo) =>{
        if(todo.id === id){
            todo.completed = !todo.completed;
        }
        return todo;
      })
      setTodos(updatedTodos);
  }
  
  // Add the submitEdits code here
  const submitEdits = (id) => {
      let updatedTodos = [...todos].map((todo) =>{
          if(todo.id === id){
            todo.text = editingText;
          }
          return todo;
      })
      setTodos(updatedTodos);
      setTodoEditing(null);
  }
  
    return(
        <div className ="App">
            <h1>Todo List</h1>
            <form onSubmit={handleSubmit}>
                <input type ="text" 
                    onChange={(e)=> setTodo(e.target.value)} 
                    placeholder="Add a new task"
                    value={todo} 
                />
                <button type ="submit">Add Todo</button>
            </form>
            {todos.map((todo)=> 
                <div className="todo" key={todo.id}>
                    <div>{todo.text}
                        <input type="checkbox" id="completed" checked={todo.completed}
                            onChange={() => toggleComplete(todo.id)}
                        />

                        {
                            todo.id === todoEditing ?(
                                <input
                                type="text"
                                onChange={(e) => setEditingText(e.target.value)}
                                />
                            ) : (
                                <div>{todo.text}</div>
                            )
                        }
                        </div>
                        <div className="todo-actions">
                            {todo.id === todoEditing?(

                                <button onClick={()=> submitEdits(todo.id)}>Submit Edits</button>
                            )
                                
                            :(
                                <button onClick={() => setTodoEditing(todo.id)}>Edit</button>

                            )}
                            <button onClick={()=> deleteToDo(todo.id)}>Delete</button>
                        </div>


                </div>)}
        </div>
    );
};
export default App;
