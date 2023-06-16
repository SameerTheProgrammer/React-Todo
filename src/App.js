import React, { useEffect, useState } from "react";
import "./components/app.css";
import LowerPart from "./components/LowerPart";
// import Filter from "./components/Filter";
import UpperPart from "./components/UpperPart";


function App() {
  const [isEdit,setIsEdit]=useState(false)
  const [inputText, setInputText] = useState("");
  const [editItem, setEditItem] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filterTodos, setFilterTodos] = useState([]);



  const filterTodosHandler = () => {
    switch (status) {
      case 'completed':
        setFilterTodos(todos.filter((ele) => ele.isCompleted == true))
        break;
      case 'pending':
        setFilterTodos(todos.filter((ele) => ele.isCompleted == false))
        break;

      default:
        setFilterTodos(todos)
        break;
    }
  }

  const saveLocalTodos = () => {
      localStorage.setItem("todo-list", JSON.stringify(todos))
  }
  const getLocalTodos = () => {
    if (localStorage.getItem("todo-list") === null) {
      localStorage.setItem("todo-list", JSON.stringify([]))
    }
    else {
      let localTodos= JSON.parse(localStorage.getItem("todo-list"))
      setTodos(localTodos)
    }
  }
  useEffect(()=>{
    getLocalTodos()
  },[])
  useEffect(() => {
    filterTodosHandler()
    saveLocalTodos()
  }, [todos, status])

  return (
    <>
      <div className="todo">
        <div className="content">
          <UpperPart
            todos={todos}
            setTodos={setTodos}
            setInputText={setInputText}
            inputText={inputText}
            status={status}
            setStatus={setStatus}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            editItem={editItem}
            setEditItem={setEditItem}
          />
          <LowerPart
            todos={todos}
            setTodos={setTodos}
            filterTodos={filterTodos}
            setInputText={setInputText}
            inputText={inputText}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            editItem={editItem}
            setEditItem={setEditItem}
          />

        </div>
      </div>
    </>
  )
}

export default App;
