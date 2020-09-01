import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(null)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.charCode === 13) {
            onAddTaskClick()
        }
    }
    const onAddTaskClick = () => {
        if (title.trim()) {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    return (
        <div>
            <TextField value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       variant={"outlined"}
                       error={!!error}
                       helperText={error}
                       label={'Title '}
            />
            <IconButton
                color={"primary"}
                onClick={onAddTaskClick}>
                <AddBox/>
            </IconButton>
        </div>
    )
}

export default AddItemForm