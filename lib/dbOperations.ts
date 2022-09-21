import { noteType } from "../types/notes"
import { supabase } from "./initSupabase"

const shouldFetch: boolean = (process.env.NEXT_PUBLIC_FETCHING === "true") ? true : false
export const dbName: string = shouldFetch ? "notes" : "fetching disabled"
const bucket: string = shouldFetch ? "next-buckets" : "fetching disabled"

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

export const insertNote = async (Note: string, file: File | null): Promise<any> => {
    const { data: note, error } = await supabase
        .from(dbName)
        .insert([{ content: Note, file }]).single()
    if (error) return { error: true, message: error.message, note }
    return { error: false, note }
}

export const deleteNote = async (id: number, fileName?: string | null): Promise<ErrorType> => {
    if (fileName !== undefined && fileName !== null) {
        const { error } = await supabase.storage.from(bucket).remove([fileName])
        if (error) console.log(error)
    }
    const { error } = await supabase.from(dbName).delete().eq('id', id)
    if (error) return { error: true, message: error.message }
    return { error: false, message: "" }
}

export const uploadFile = async (file: File): Promise<any> => {
    const fileName: string = getFileName(file)

    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(`public/${fileName}_${Date.now()}`, file)

    if (data) data.Key = data.Key.replace(`${bucket}/`, "")
    return { data, error }
}

export const downloadFile = async (name: string) => {
    const { data, error } = await supabase.storage
        .from(bucket)
        .download(name)

    if (data) {
        const fileName: string = name.split("/")[1]
        const file = new File([data], fileName, { type: data.type })
        downloadFromUrl(file, fileName)
    }
    return { error }
}

const downloadFromUrl = (file: File, name: string) => {
    const url: string = window.URL.createObjectURL(file)
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
}

const getFileName = (file: File): string => {
    const split = file.name.split('.')
    split.pop()
    return split.join(".")
}