'use client'

import { useState } from 'react'

const COLORS = [
  { name: 'white', bg: 'bg-white dark:bg-gray-800', border: 'border-gray-200 dark:border-gray-700' },
  { name: 'red', bg: 'bg-red-100 dark:bg-red-900/30', border: 'border-red-200 dark:border-red-800' },
  { name: 'yellow', bg: 'bg-yellow-100 dark:bg-yellow-900/30', border: 'border-yellow-200 dark:border-yellow-800' },
  { name: 'green', bg: 'bg-green-100 dark:bg-green-900/30', border: 'border-green-200 dark:border-green-800' },
  { name: 'blue', bg: 'bg-blue-100 dark:bg-blue-900/30', border: 'border-blue-200 dark:border-blue-800' },
  { name: 'purple', bg: 'bg-purple-100 dark:bg-purple-900/30', border: 'border-purple-200 dark:border-purple-800' },
]

export default function NoteForm({ addNote, editingNote, updateNote, cancelEdit }) {
  const [title, setTitle] = useState(editingNote?.title || '')
  const [content, setContent] = useState(editingNote?.content || '')
  const [color, setColor] = useState(editingNote?.color || COLORS[0])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!title.trim() && !content.trim()) return

    if (editingNote) {
      updateNote({
        ...editingNote,
        title: title.trim(),
        content: content.trim(),
        color,
        updatedAt: new Date().toISOString(),
      })
    } else {
      addNote({
        title: title.trim(),
        content: content.trim(),
        color,
      })
    }

    // Reset form
    setTitle('')
    setContent('')
    setColor(COLORS[0])
  }

  const handleCancel = () => {
    setTitle('')
    setContent('')
    setColor(COLORS[0])
    if (cancelEdit) cancelEdit()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
      <form onSubmit={handleSubmit} className={`rounded-lg border-2 ${color.border} ${color.bg} p-4 shadow-lg transition-all`}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-0 py-2 bg-transparent text-xl font-semibold text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
        />
        
        <textarea
          placeholder="Take a note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="4"
          className="w-full px-0 py-2 bg-transparent text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none resize-none"
        />

        {/* Color Picker */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
          <div className="flex gap-2">
            {COLORS.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-full ${c.bg} ${c.border} border-2 hover:scale-110 transition-transform ${
                  color.name === c.name ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-800' : ''
                }`}
                aria-label={`Select ${c.name} color`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {editingNote && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
            >
              {editingNote ? 'Update' : 'Add Note'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}