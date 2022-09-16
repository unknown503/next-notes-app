import { ChangeEvent, KeyboardEvent, useState } from "react"
import { DefaultToast } from "./DefaultToast"
import { toast } from 'react-toastify';
import { Header } from "./Header"
import { insertNote } from "../lib/dbOperations";
import { useNoteStore } from "../store/useNotes";

export const Form = () => {
    const [Note, setNote] = useState("")
    const [DisableButton, setDisableButton] = useState(false)
    const { insertNoteState } = useNoteStore()

    const addSingleNote = async () => {
        if (Note.length > 0) {
            const edditedNote = Note.replaceAll("\n", "<br>")
            setDisableButton(true)
            const { note, error, message } = await insertNote(edditedNote)
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

    const handleTextarea = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setNote(e.target.value)
    }

    const onEnterPress = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
        const { code } = e
        const enters = ["Enter", "NumpadEnter"]

        if (enters.includes(code) && !DisableButton) {
            e.preventDefault()
            addSingleNote()
        }

    }

    return (
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mt-16 mb-8 lg:mt-0">
            <div className="card-body">
                <Header />
                <div className="form-control">
                    <textarea className="textarea textarea-bordered min-h-16 h-40 max-h-60 prose"
                        placeholder="Text" onChange={handleTextarea} value={Note} onKeyDown={(e) => onEnterPress(e)} />
                </div>
                <div className="form-control mt-4">
                    <button className={`btn btn-primary ${DisableButton ? "loading" : ""}`} onClick={() => addSingleNote()} disabled={DisableButton}>Add Note</button>
                </div>
            </div>
            <DefaultToast />
        </div >
    )
}
