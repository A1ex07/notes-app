'use client'

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
          🔍
        </span>
      </div>
    </div>
  )
}