'use client'

import { useState, useEffect } from 'react'

export default function Header() {
  const [isDark, setIsDark] = useState(false)

  // Load dark mode preference
  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode') === 'true'
    setIsDark(darkMode)
    if (darkMode) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !isDark
    setIsDark(newMode)
    localStorage.setItem('darkMode', newMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">📝</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Notes
            </h1>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <span className="text-2xl">☀️</span>
            ) : (
              <span className="text-2xl">🌙</span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}