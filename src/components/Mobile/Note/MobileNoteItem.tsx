import { useActiveNote } from '@/hooks/note/useActiveNote'
import { useNote } from '@/hooks/note'
import { clsxm } from '@/util/clsxm'
import { HiOutlineDocumentText } from 'react-icons/hi'
import { useNavigate, useParams } from 'react-router-dom'
import { useMobileMenu } from '@/hooks/useMobileMenu'

type TProps = {
  noteId: string
}

export const MobileNoteItem = (props: TProps) => {
  const { updateNoteId, noteId } = useActiveNote()
  const [, , , closeMenu] = useMobileMenu()
  const note = useNote(props.noteId)
  const param = useParams()
  const nTo = useNavigate()

  const getName = (name: string) => {
    if (name.length > 30) return name.slice(0, 27) + '...'
    return name
  }

  const handleClick = (noteId: string) => () => {
    updateNoteId(noteId)
    closeMenu()
    if (!param.folderId) nTo(`/folder/${note?.folder_id}`)
  }

  if (!note) return null

  return (
    <button
      onClick={handleClick(note.note_id)}
      className={clsxm(
        'group flex items-center',
        'w-full h-10',
        'px-4 transition',
        'hover:bg-accent-2',
        noteId === props.noteId && 'bg-primary text-white'
      )}
    >
      <HiOutlineDocumentText className='w-5 h-5 mr-[15px]' />
      <span className='font-semibold truncate'>{getName(note.title)}</span>
    </button>
  )
}
