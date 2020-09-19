import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolist-reducer";

type ActionType = RemoveTasksActionType | AddTasksActionType | ChangeTaskActionType | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType

export type RemoveTasksActionType = {
    type: 'REMOVE-TASK'
    todoListID: string
    taskID: string
}
export type AddTasksActionType = {
    type: 'ADD-TASK'
    title: string
    todoListID: string
}
export type ChangeTaskActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    todoListID: string
    isDone: boolean
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string
    todoListID: string
    title: string
}


export const tasksReducer = (state: TaskStateType, action: ActionType) => {

    switch (action.type) {
        case 'REMOVE-TASK': {
            const copyState = {...state}
            const tasks = state[action.todoListID]
            const filteredTasks = tasks.filter(t => t.id !== action.taskID)
            copyState[action.todoListID] = filteredTasks
            return copyState
        }
        case 'ADD-TASK': {

            const copyState = {...state}
            const tasks = copyState[action.todoListID]
            const newTask = {id: v1(), title: action.title, isDone: false}
            const newTasks = [newTask, ...tasks]
            copyState[action.todoListID] = newTasks
            return copyState
        }
        case 'CHANGE-TASK-STATUS': {
            const copyState = {...state}
            const tasks = copyState[action.todoListID]
            const task = tasks.find(t => t.id === action.taskID)
            if(task){
                task.isDone = action.isDone
            }
            return copyState
        }
        case 'CHANGE-TASK-TITLE': {
            const copyState = {...state}
            const tasks = copyState[action.todoListID]
            const task = tasks.find(t => t.id === action.taskID)
            if(task){
                task.title = action.title
            }
            return copyState
        }
        case "ADD-TODOLIST": {
            const copyState = {...state}
            copyState[action.todolistId] = []
            return copyState
        }
        case "REMOVE-TODOLIST": {
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        }

        default:
            throw new Error('I dont understand this action type')
    }
}

export const removeTaskAC = (taskID: string, todoListID: string): RemoveTasksActionType => {
    return {type: 'REMOVE-TASK', taskID, todoListID}
}
export const addTaskAC = (title: string, todoListID: string): AddTasksActionType => {
    return {type: 'ADD-TASK', title, todoListID}
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): ChangeTaskActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskID, isDone, todoListID}
}
export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string ): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskID, title, todoListID}
}


