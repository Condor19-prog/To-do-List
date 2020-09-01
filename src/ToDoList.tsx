import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


type propsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (id: string, title: string, todoListID: string) => void
    filter: FilterValuesType
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
}

function TodoList(props: propsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.id, title)
    }

    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }

    return (

        <div>
            <h3><EditableSpan value={props.title} changeValue={changeTodoListTitle}/>
                <IconButton
                    onClick={() => {
                        props.removeTodoList(props.id)
                    }}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: 'none', paddingLeft: '0px'}}>
                {
                    props.tasks.map(task => {
                        const removeTask = () => {
                            props.removeTask(task.id, props.id)
                        }
                        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
                        }
                        const changeTaskTitle = (title: string) => {
                            props.changeTaskTitle(task.id, title, props.id)
                        }
                        return (
                            <li key={task.id} className={task.isDone ? 'isDone' : ''}>
                                <Checkbox
                                    color={"primary"}
                                    onChange={changeTaskStatus}
                                    checked={task.isDone}/>
                                <EditableSpan value={task.title} changeValue={changeTaskTitle}/>
                                <IconButton onClick={removeTask}><Delete/></IconButton>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <Button
                    color={props.filter === 'all' ? "secondary" : "primary"}
                    variant={props.filter === 'all' ? "contained" : "outlined"}
                    onClick={onAllClickHandler}>
                    All
                </Button>
                <Button
                    variant={props.filter === 'active' ? "contained" : "outlined"}
                    color={props.filter === 'active' ? "secondary" : "primary"}
                    onClick={onActiveClickHandler}>
                    Active
                </Button>
                <Button
                    color={props.filter === 'completed' ? "secondary" : "primary"}
                    variant={props.filter === 'completed' ? "contained" : "outlined"}
                    onClick={onCompletedClickHandler}>
                    Completed
                </Button>
            </div>
        </div>
    )
}

export default TodoList