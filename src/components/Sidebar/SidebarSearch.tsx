import { useSearchNotes } from '@/hooks/notes/useSearchNotes'
import { clsxm } from '@/util/clsxm'
import { HiOutlineSearch } from 'react-icons/hi'

export const SidebarSearch = () => {
  const { active, query, onChange, onBlur, onClickSearchButton } = useSearchNotes()

  if (!active) {
    return (
      <button onClick={onClickSearchButton} className='ml-auto'>
        <HiOutlineSearch />
      </button>
    )
  }

  return (
    <>
      <input
        autoFocus
        value={query}
        onChange={onChange}
        onBlur={onBlur}
        className={clsxm(
          'h-[38px] w-full',
          'outline-none bg-transparent',
          'border-b border-accent-4'
        )}
        placeholder='Search notes...'
      />
      <HiOutlineSearch />
    </>
  )
}
