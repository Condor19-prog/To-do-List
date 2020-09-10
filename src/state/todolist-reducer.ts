import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    id: string
}


export const todoListReducer = (state: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [
                ...state, {
                    id: v1(),
                    title: action.title,
                    filter: "all"
                }]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
                return [...state]
            }
            return state
        }

        default:
            throw new Error('I dont understand this action type')
    }
}

export const RemoveTodoListAC = (todoListID: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todoListID}
}
export const AddTodoListAC = (newTodoListTitle: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: newTodoListTitle}
}
export const NewTodoListTitleAC = (newTodolistTitle: string, todolistId2: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: newTodolistTitle, id: todolistId2}
}
export const FilterTodoListAC = (newFilter: FilterValuesType, todolistId2: string): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter: newFilter, id: todolistId2}
}