import React, { useState } from 'react'


const UpperPart = ({ 
    
        setInputText, 
        setTodos, 
        todos, 
        inputText,
        setStatus,
        isEdit,
        setIsEdit,
        editItem,
        setEditItem
    }) => {

    const months = ["January", "Febuary", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];

    const inputTextHandler = (event) => {
        setInputText(event.target.value);
    }

    const addTaskHandler = (event) => {
        event.preventDefault();
        
        let currentDate = new Date();
        let month = months[currentDate.getMonth()];
        let day = currentDate.getDate();
        let year = currentDate.getFullYear();

        if (!inputText) {
            alert("enter the value")
        }
        else if(inputText && isEdit){
            setTodos(todos.map((item)=>{
                if (item.id === editItem) {
                    return{...item,taskText:inputText}
                }
                return item
            }))
        }
        else (
            setTodos([
                ...todos,
                { 
                    id: new Date().getTime().toString(),
                    taskText:inputText, 
                    isCompleted: false, 
                    date: `${month} ${day}, ${year}` 
                }
            ])
            
        )
        setInputText("")
        setIsEdit(false)
    }
    const clearAll = ()=>{
        setTodos([])
    }

    const statusTaskHandler = (event) => {
        setStatus(event.target.id);
        // event.target.className="active";
        // console.log(event.target.className);
    }
    const[toggleActiveClass,setToggleActiveClass] = useState(1)
    const toggleActive=(index)=>{
        setToggleActiveClass(index)
    }

    return (
        <>
            <form className="form-inline">
                <input type="search" id="searchtextbox" placeholder="Search" aria-label="Search" />
                <i className="fa fa-search" aria-hidden="true"></i>

            </form>
            <div className="input-container">
                <img src="bars-icon.svg" alt="Bar" />
                <input type="text" placeholder="Write Your New Task" value={inputText} onChange={inputTextHandler} />
                <button onClick={addTaskHandler} type="submit"><i className={`${isEdit?"uil uil-pen":"fa-solid fa-plus"}`}></i></button>

            </div>
            <div className="sort">
                <div className="filters">
                    <span id="all" className={toggleActiveClass===1?"active":""} 
                        onClick={(event)=> {
                            statusTaskHandler(event) 
                            toggleActive(1)
                        }}>
                        All
                    </span>
                    <span id="pending" className={toggleActiveClass===2?"active":""} 
                        onClick={(event)=> {
                            statusTaskHandler(event) 
                            toggleActive(2)
                        }}>
                        Pending
                    </span>
                    <span id="completed" className={toggleActiveClass===3?"active":""} 
                        onClick={(event)=> {
                            statusTaskHandler(event) 
                            toggleActive(3)
                        }}>
                        Completed
                    </span>
                </div>
                <button onClick={clearAll} className="clr-btn btn">Clear All</button>
            </div>
        </>
    )
}

export default UpperPart