import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react"
import { useFormStore } from "../../store/useForm"

interface PropTypes {
    onEnterPress: (e: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => void
}

export const FileForm = ({ onEnterPress }: PropTypes) => {
    const { setFileValue, setFileNoteValue, fileNoteValue } = useFormStore()
    const fileRef = useRef<HTMLInputElement>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => setFileValue(e)

    const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
        const inputText: string = e.target.value
        setFileNoteValue(inputText)
    }

    useEffect(() => {
        if (fileNoteValue === "" && fileRef.current !== null) fileRef.current.value = ""
    }, [fileNoteValue])


    return (
        <div className="mb-3">
            <input type="text" placeholder="Note" className="input input-bordered w-full max-w-xs mb-5 prose" onChange={handleInput} onKeyDown={(e) => onEnterPress(e)} value={fileNoteValue} />
            <input type="file"
                onChange={onChangeHandler}
                ref={fileRef}
                className="
            prose
            text-sm 
            file:mr-5 file:py-2 file:px-6
            file:rounded-full file:border-0
            file:text-sm file:font-medium
            file:bg-primary file:text-white
            hover:file:cursor-pointer hover:file:bg-primary-focus"/>
        </div>
    )
}
