import { clsxm } from '@/util/clsxm'
import { NoteCard, OnClickCard } from '@/components/Note/NoteCard'
import { NoteListWrapper } from '@/components/NoteList/NoteListWrapper'
import { useActiveNote } from '@/hooks/note'
import { useFavNotes } from '@/hooks/favorite'
import { useAtomValue } from 'jotai'
import { AtomQueryNotes } from '@/hooks/notes'

export const FavoritesNote = () => {
  const queryNotes = useAtomValue(AtomQueryNotes)
  const { noteId, updateNoteId } = useActiveNote()
  const { favNotes } = useFavNotes()

  const getActiveNote = (id: string) => noteId === id

  const onClickNoteCard: OnClickCard = (note) => {
    return () => updateNoteId(note.note_id)
  }

  return (
    <NoteListWrapper>
      <div className='sticky top-0 flex items-center h-24 bg-accent-2'>
        <h2 className='font-semibold text-[22px]'>Favorites</h2>
      </div>

      {favNotes.length === 0 && queryNotes === '' && (
        <div className={clsxm('flex items-center justify-center', 'w-full h-72', 'text-center')}>
          <p>Add some of your notes as your favorite notes, then it will be visible here.</p>
        </div>
      )}

      {favNotes.length === 0 && queryNotes !== '' && (
        <div className={clsxm('flex items-center justify-center', 'w-full h-72', 'text-center')}>
          <p>Can&apos;t find your notes, try a different keyword?</p>
        </div>
      )}

      {favNotes.length > 0 &&
        favNotes.map((n) => (
          <NoteCard
            onClick={onClickNoteCard}
            className={clsxm(getActiveNote(n.note_id) && 'bg-accent-4')}
            key={n.note_id}
            {...n}
          />
        ))}
    </NoteListWrapper>
  )
}
