import { ChangeEvent } from 'react'
import create from 'zustand'

type FileType = /* File | null  */ChangeEvent<HTMLInputElement> | null 

interface FormStateType {
    fileValue: FileType,
    fileNoteValue: string,
    setFileValue: (value: FileType) => void,
    setFileNoteValue: (value: string) => void,
    clearValues: () => void
}

export const useFormStore = create<FormStateType>((set) => ({
    fileValue: null,
    fileNoteValue: "",
    setFileValue: (value: FileType) => {
        set(() => ({ fileValue: value }))
    },
    setFileNoteValue: (value: string) => {
        set(() => ({ fileNoteValue: value }))
    },
    clearValues: () => {
        set(() => ({
            fileValue: null,
            fileNoteValue: ""
        }))
    },
}))