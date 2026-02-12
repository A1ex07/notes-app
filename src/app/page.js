'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import NoteForm from '@/components/NoteForm'
import NoteCard from '@/components/NoteCard'

export default function Home() {
  const [notes, setNotes] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [editingNote, setEditingNote] = useState(null)

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes')
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }
  }, [])

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (notes.length > 0 || localStorage.getItem('notes')) {
      localStorage.setItem('notes', JSON.stringify(notes))
    }
  }, [notes])

  // Add new note
  const addNote = (noteData) => {
    const newNote = {
      id: Date.now(),
      ...noteData,
      pinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setNotes([newNote, ...notes])
  }

  // Update existing note
  const updateNote = (updatedNote) => {
    setNotes(notes.map(note => 
      note.id === updatedNote.id ? updatedNote : note
    ))
    setEditingNote(null)
  }

  // Delete note
  const deleteNote = (id) => {
    if (confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(note => note.id !== id))
    }
  }

  // Edit note
  const editNote = (note) => {
    setEditingNote(note)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Toggle pin
  const togglePin = (id) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, pinned: !note.pinned } : note
    ))
  }

  // Cancel edit
  const cancelEdit = () => {
    setEditingNote(null)
  }

  // Filter notes based on search
  const filteredNotes = notes.filter(note => {
    const searchLower = searchQuery.toLowerCase()
    return (
      note.title?.toLowerCase().includes(searchLower) ||
      note.content?.toLowerCase().includes(searchLower)
    )
  })

  // Sort: pinned first, then by updated date
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return new Date(b.updatedAt) - new Date(a.updatedAt)
  })

  return (
    <div className="min-h-screen">
      <Header />
      
      <SearchBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      
      <NoteForm 
        addNote={addNote}
        editingNote={editingNote}
        updateNote={updateNote}
        cancelEdit={cancelEdit}
      />

      {/* Notes Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {sortedNotes.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">📝</span>
            <p className="text-xl text-gray-500 dark:text-gray-400">
              {searchQuery ? 'No notes found' : 'No notes yet. Create your first note!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sortedNotes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                deleteNote={deleteNote}
                editNote={editNote}
                togglePin={togglePin}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}