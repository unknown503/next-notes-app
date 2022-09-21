import { ChangeEvent, KeyboardEvent, useState } from "react"
import { DefaultToast } from "../DefaultToast"
import { toast } from 'react-toastify';
import { Header } from "../Header"
import { insertNote, uploadFile } from "../../lib/dbOperations";
import { useNoteStore } from "../../store/useNotes";
import { FileForm } from "./FileForm";
import { useFormStore } from "../../store/useForm";

export const Form = () => {
    const [Note, setNote] = useState<string>("")
    const [DisableButton, setDisableButton] = useState<boolean>(false)
    const [FileTab, setFileTab] = useState<boolean>(true)

    const { insertNoteState } = useNoteStore()
    const { fileValue: fileState, fileNoteValue: noteState, clearValues } = useFormStore()

    const EditedNote = (note: string): string => note.replaceAll("\n", "<br>")

    const addSingleNote = async (): Promise<void> => {
        if (Note.length > 0) {
            setDisableButton(true)
            const { note, error, message } = await insertNote(EditedNote(Note), null)
            if (error) toast.error(message)
            if (!error) {
                insertNoteState(note)
                toast.success("Note was created!")
                setDisableButton(false)
            }
            setNote("")
        } else {
            toast.error("Content is empty!")
        }
    }

    const UploadFileNote = async (): Promise<void> => {
        // if (fileState === null || noteState === "") {
        console.log(fileState)
            if (fileState === null || fileState.target.files === null || noteState === "") {
            toast.error("Content is empty!")
            return
        }
        // console.log({ "archevo":fileState })
        const file = fileState.target.files[0]

        const { data, error } = await uploadFile(file)
        // const { data, error } = await uploadFile(fileState)
        if (error) toast.error(error.message)
        if (!error) {
            const { note, error, message } = await insertNote(EditedNote(noteState), data.Key)
            insertNoteState(note)
            if (error) toast.error(message)
            toast.success("File was uploaded!")
            setDisableButton(false)
            clearValues()
        }

    }

    const handleTextarea = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setNote(e.target.value)
    }

    const onEnterPress = (e: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        const { code } = e
        const enters = ["Enter", "NumpadEnter"]

        if (enters.includes(code) && !DisableButton) {
            e.preventDefault()
            SubmitForm()
        }
    }

    const SubmitForm = (): void => {
        if (!FileTab) addSingleNote()
        if (FileTab) UploadFileNote()
    }

    return (
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mb-8 lg:mt-0">
            <div className="card-body">
                <Header />
                <div className="tabs mb-4">
                    <a className={`tab tab-lifted ${!FileTab ? "tab-active" : ""}`} onClick={() => setFileTab(state => !state)}>Note</a>
                    <a className={`tab tab-lifted ${FileTab ? "tab-active" : ""}`} onClick={() => setFileTab(state => !state)}>File</a>
                </div>
                {
                    FileTab ?
                        <FileForm onEnterPress={onEnterPress} />
                        :
                        <div className="form-control">
                            <textarea className="textarea textarea-bordered min-h-16 h-40 max-h-60 prose"
                                placeholder="Text" onChange={handleTextarea} value={Note} onKeyDown={(e) => onEnterPress(e)} />
                        </div>
                }
                <div className="form-control mt-4">
                    <button className={`btn btn-primary ${DisableButton ? "loading" : ""}`} onClick={() => SubmitForm()} disabled={DisableButton}>
                        Add Note</button>
                </div>
            </div>
            <DefaultToast />
        </div >
    )
}
