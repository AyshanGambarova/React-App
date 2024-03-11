import {Button, Input} from 'antd';
import {forwardRef, useRef} from "react";

const MyInput = forwardRef((props, ref) => {
    return <input type="text" ref={ref} {...props}/>
})

export function UseRefHook() {
    const inputRef = useRef()
    const myInputRef = useRef()
    const focusInput = () => {
        inputRef.current.focus()
    }

    const focusMyInputComponent = () => {
        myInputRef.current.focus()
    }

    return (
        <>
            <div className="mt-5">useRef() - forwardRef()</div>
            <Input placeholder="Basic usage" ref={inputRef}/>
            <Button onClick={focusInput} type="primary">Focus on</Button>
            <hr/>
            <MyInput title="test" ref={myInputRef}/>
            <Button onClick={focusMyInputComponent} type="primary">Focus on input component</Button>
        </>
    )

}