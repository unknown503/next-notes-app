import create from 'zustand'
import { noteType } from '../types/notes'

interface NotesStateType {
    notes: noteType[] | [],
    addNotes: (notes: noteType[]) => void,
    insertNoteState: (note: noteType) => void,
    deleteNoteState: (id: number) => void
}

export const useNoteStore = create<NotesStateType>((set) => ({
    notes: [],
    addNotes: (notes: noteType[]) => {
        set({ notes })
    },
    insertNoteState: (note: noteType) => {
        set((state) => ({ notes: [note, ...state.notes] }))
    },
    deleteNoteState: (id: number) => {
        set((state) => ({ notes: state.notes.filter(note => note.id !== id) }))
    },
}))