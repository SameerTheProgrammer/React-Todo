import { Check } from '@material-ui/icons';
import React, { useState } from 'react';


const LowerPart = ({
    todos,
    setTodos,
    filterTodos,
    setInputText,
    setIsEdit,
    setEditItem
}) => {

    const deleteTaskHandler = (id) => {
        setTodos(todos.filter(ele => ele.id !== id))
    }
    const editTaskHandler = (id) => {

        const edited_text = todos.find((ele) => {
            return ele.id === id;
        })
        setInputText(edited_text.taskText);
        setEditItem(id);
        setIsEdit(true);

    }

    const completeTaskHandler = (id) => {
        setTodos(todos.map((ele) => {
            if (ele.id == id) {
                return {
                    ...ele,
                    isCompleted: !ele.isCompleted
                }
            };
            return ele;
        }));
    }


    return (
        <>
            <ul className="list overflow">
                {
                    filterTodos.map((val, index) => {
                        const { taskText, id, isCompleted } = val;

                        return (
                            <li className="items" key={index}>
                                <label htmlFor={index}>
                                    <input type="checkbox" checked={isCompleted === true ? true : false}
                                        id={index}
                                        onClick={() => {
                                            completeTaskHandler(id)
                                        }}

                                    />
                                    <p className={`p ${isCompleted == true ? "completed" : ""}`} >{taskText}</p>
                                </label>
                                <div className="setting" id={index} >
                                    <i className="uil uil-ellipsis-h"></i>
                                    <ul className="setting-menu" >
                                        <li onClick={() => editTaskHandler(id)}><i className="uil uil-pen" ></i>Edit</li>
                                        <li onClick={() => deleteTaskHandler(id)}><i className="uil uil-trash"></i>Delete</li>
                                    </ul>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default LowerPart
