'use client'

export default function NoteCard({ note, deleteNote, editNote, togglePin }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className={`group relative rounded-lg border-2 ${note.color.border} ${note.color.bg} p-4 shadow-md hover:shadow-xl transition-all cursor-pointer`}>
      {/* Pin Button */}
      <button
        onClick={() => togglePin(note.id)}
        className={`absolute top-2 right-2 p-1 rounded-full transition-all ${
          note.pinned 
            ? 'text-yellow-500 opacity-100' 
            : 'text-gray-400 opacity-0 group-hover:opacity-100'
        }`}
        aria-label={note.pinned ? 'Unpin note' : 'Pin note'}
      >
        <span className="text-xl">{note.pinned ? '📌' : '📍'}</span>
      </button>

      {/* Note Content */}
      <div className="pr-8">
        {note.title && (
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {note.title}
          </h3>
        )}
        {note.content && (
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap line-clamp-6">
            {note.content}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-300 dark:border-gray-600">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {formatDate(note.updatedAt || note.createdAt)}
        </span>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => editNote(note)}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Edit note"
          >
            <span className="text-lg">✏️</span>
          </button>
          <button
            onClick={() => deleteNote(note.id)}
            className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
            aria-label="Delete note"
          >
            <span className="text-lg">🗑️</span>
          </button>
        </div>
      </div>
    </div>
  )
}