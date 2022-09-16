import React, { useEffect, useState } from 'react'
import { getNotes } from '../../lib/dbOperations'
import { toast } from 'react-toastify';
import { Note } from './Note'
import { Spinner } from '../Spinner';
import { noteType } from '../../types/notes';
import { useNoteStore } from '../../store/useNotes';

export const Notes = () => {
    let [loading, setLoading] = useState(true);
    const { addNotes, notes } = useNoteStore()

    const setNotesArray = (notes: noteType[]) => {
        addNotes(notes)
        setLoading(false)
    }

    useEffect(() => {
        getNotes().then(setNotesArray).catch(toast.error)
    }, [])


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
                                            notes && notes.map(note => <Note key={note.id} id={note.id} noteContent={note.content} />)
                                        }
                                    </div>
                                </div >
                        }
                    </div>
            }
        </>
    )
}
