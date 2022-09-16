import { noteType } from "../types/notes"
import { supabase } from "./initSupabase"

export const dbName: string = "notes"

interface ErrorType {
    error: boolean,
    message: string
}

export const getNotes = async (): Promise<any> => {
    let { data: notes, error } = await supabase
        .from<noteType>(dbName)
        .select('*')
        .order('created_at', { ascending: false })
    if (error) throw error.message
    return notes
}

export const insertNote = async (Note: string): Promise<any> => {
    const { data: note, error } = await supabase
        .from(dbName)
        .insert([{ content: Note }]).single()
    if (error) return { error: true, message: error.message, note }
    return { error: false, note }
}

export const deleteNote = async (id: number): Promise<ErrorType> => {
    const { error } = await supabase.from(dbName).delete().eq('id', id)
    if (error) return { error: true, message: error.message }
    return { error: false, message: "" }
}
