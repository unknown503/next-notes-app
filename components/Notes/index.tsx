import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { getNotes } from '../../lib/dbOperations'
import { toast } from 'react-toastify';
import { Note } from './Note'
import { Spinner } from '../Spinner';
import { noteType } from '../../types/notes';
import { useNoteStore } from '../../store/useNotes';

export const Notes = () => {
    const [loading, setLoading] = useState(true);
    const { addNotes, notes } = useNoteStore()

    const setNotesArray = useCallback((notes: noteType[]) => {
        addNotes(notes)
        setLoading(false)
    }, [addNotes])

    const serverNotes = useMemo(async () => await getNotes(), [])

    useEffect(() => {
        serverNotes.then(setNotesArray).catch(toast.error)
    }, [serverNotes, setNotesArray])


    return (
        <>
            {
                loading ?
                    <div className="px-20">
                        <Spinner />
                    </div >
                    :
                    <div>
                        {

                            notes && notes.length === 0
                                ?
                                <div className='px-20 prose text-3xl'>
                                    No notes
                                </div>
                                :
                                <div className="text-center lg:text-left overflow-y-scroll h-[96vh] min-w-8">
                                    <div className='mx-8 py-6'>
                                        {
                                            notes && notes.map(note => <Note key={note.id} id={note.id} noteContent={note.content} file={note.file} />)
                                        }
                                    </div>
                                </div >
                        }
                    </div>
            }
        </>
    )
}
