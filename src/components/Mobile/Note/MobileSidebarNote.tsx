import { AtomFilteredNotes } from '@/hooks/notes'
import { useAtomValue } from 'jotai'
import { useParams } from 'react-router-dom'
import { MobileNoteItem } from './MobileNoteItem'

export const MobileSidebarNote = () => {
  const n = useAtomValue(AtomFilteredNotes)
  const { folderId } = useParams()

  const notes = n.filter((n) => n.folder_id === folderId && !n.isArchived && !n.isTrashed)

  return (
    <div>
      <div className='w-full mb-2 px-4'>
        <p className='text-sm font-semibold'>Notes</p>
      </div>

      {notes.length === 0 && (
        <div className='flex items-center justify-center w-full h-10'>
          <p className='text-xs font-medium'>Empty right now, open a note!</p>
        </div>
      )}

      {notes.length > 0 && (
        <div className='max-h-36 overflow-y-auto custom-sb'>
          <div className='flex flex-col space-y-[5px]'>
            {notes.map((note) => (
              <MobileNoteItem key={note.note_id} noteId={note.note_id} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
