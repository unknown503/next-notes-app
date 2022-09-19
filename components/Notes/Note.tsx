import { toast } from 'react-toastify';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { deleteNote, downloadFile } from '../../lib/dbOperations';
import { useNoteStore } from '../../store/useNotes';

interface NoteInfo {
    id: number,
    noteContent: string | undefined
    file: string | undefined | null
}

export const Note = ({ id, noteContent, file }: NoteInfo) => {
    const { deleteNoteState } = useNoteStore()
    const fileName = file?.split("/")[1].split("_")[0]

    const onClickButton = (text: string): any => toast.info(text);

    const isUrl = (string: string): boolean => {
        const pattern: RegExp = new RegExp('^(https?:\\/\\/)?' +
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
            '((\\d{1,3}\\.){3}\\d{1,3}))' +
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
            '(\\?[;&a-z\\d%_.~+=-]*)?' +
            '(\\#[-a-z\\d_]*)?$', 'i');
        return !!pattern.test(string);
    }

    const DownloadFile = async (): Promise<void> => {
        if (!file) return
        const { error } = await downloadFile(file)
        if (!error) onClickButton("File downloaded!");
        if (error) toast.error(error.message)
    }

    const deleteNoteButton = async (): Promise<void> => {
        deleteNoteState(id)
        const { error, message } = await deleteNote(id, file)
        if (error) toast.error(`Error deleting: ${message}`)
        if (!error) toast.success("Note was deleted!")
    }
    const TextClassName: string = "p-4 break-all prose max-w-none"

    return (
        <>
            <div className="flex flex-row justify-between">
                {
                    isUrl(noteContent || "") ?
                        <a href={noteContent} target='_blank' className={`${TextClassName} link`}>{noteContent}</a>
                        :
                        <p className={TextClassName} dangerouslySetInnerHTML={{ __html: noteContent || "" }}></p>
                }
                <div className="flex flex-row justify-center ">
                    {
                        file &&
                        <button className="min-w-6 pl-2" onClick={DownloadFile}>
                            <div className="tooltip" data-tip={`Download ${fileName}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                            </div>
                        </button>
                    }
                    <button className="min-w-6 pl-2" onClick={() => onClickButton("Text was copied!")}>
                        <div className="tooltip" data-tip="Copy note!">
                            <CopyToClipboard text={noteContent?.replaceAll("<br>", "\n") || ""}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-blue-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                                </svg>
                            </CopyToClipboard>
                        </div>
                    </button>
                    <button className="min-w-6 pl-2 pr-2" onClick={deleteNoteButton}>
                        <div className="tooltip" data-tip="Delete note!">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
            <div className="divider"></div>
        </>
    )
}
