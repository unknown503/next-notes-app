import { ChangeEvent, KeyboardEvent, useEffect, useMemo, useRef } from "react"
import { useFormStore } from "../../store/useForm"
import { useDropzone } from 'react-dropzone';

interface PropTypes {
    onEnterPress: (e: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => void
}

export const FileForm = ({ onEnterPress }: PropTypes) => {
    const { acceptedFiles, getRootProps, getInputProps, isFocused, isDragAccept } = useDropzone({ maxFiles: 1 });
    const { setFileValue, setFileNoteValue, fileNoteValue } = useFormStore()
    const fileRef = useRef<HTMLInputElement>(null)

    /* useEffect(() => {
        if (acceptedFiles.length > 0) {
            const file: File = acceptedFiles[0]
            // console.log(file)
            setFileValue(file)
        }

    }, [acceptedFiles]) */


    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => setFileValue(e)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const files = e.target?.files
        if (files?.length === 0 || files === null) return
        setFileValue(e)
        // console.log(e.target?.files)
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
        const inputText: string = e.target.value
        setFileNoteValue(inputText)
    }

    useEffect(() => {
        if (fileNoteValue === "" && fileRef.current !== null) fileRef.current.value = ""
    }, [fileNoteValue])

    const defaultStyles: string = "border-2 prose border-dashed border-base-content p-4 text-center rounded "

    const style = useMemo(() => ({
        ...(isFocused ? { borderColor: '#2196f3' } : {}),
        ...(isDragAccept ? { borderColor: '#00e676' } : {}),
    }), [isFocused, isDragAccept])

    const filesText = useMemo(() => {
        if (acceptedFiles.length > 0) return `(${acceptedFiles.length}) File dropped`
        if (isDragAccept) return "Drop it here"
        return "File here"
    }, [acceptedFiles, isDragAccept])


    return (
        <div className="mb-3">
            <input type="text" placeholder="Note" className="input input-bordered w-full max-w-xs mb-6 prose" onChange={handleInput} onKeyDown={(e) => onEnterPress(e)} value={fileNoteValue} />
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

            {/* <div {...getRootProps({ style, className: defaultStyles })}>
                <input {...getInputProps({ multiple: false })} onChange={onChangeHandler} />
                <p className="mt-0">{filesText}</p>
            </div> */}
        </div>
    )
}
