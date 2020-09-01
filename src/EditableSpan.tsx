import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    value: string
    changeValue: (value: string) => void
}


function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.value)
    const activatedEditMode = () => {
        setEditMode(true)
    }
    const deactivatedEditMode = () => {
        setEditMode(false)
        if (title.trim()) props.changeValue(title.trim())
    }
    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return editMode ?
        <TextField value={title} onBlur={deactivatedEditMode} autoFocus={true} onChange={onChangeTitle}/> :
        <span onDoubleClick={activatedEditMode}>{props.value}</span>
}

export default EditableSpan