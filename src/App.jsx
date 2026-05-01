/* import -> loading from React's core "hooks" for data and side effects. */
import { useState, useEffect } from 'react'

/**
 * --- SUB-COMPONENT: BACKGROUND BLOBS ---
 * Brought "Moving Live Wallpaper" function here to keep the main function clean and organized.
 */
const BackgroundBlobs = ({ darkMode }) => (
  <div className="fixed inset-0 z-0 pointer-events-none">
    {/* Blob 1: Top Left - Bigger (w-[800px]) and Brighter (opacity-60) */}
    <div className={`absolute -top-[15%] -left-[15%] w-[800px] h-[800px] rounded-full blur-[100px] animate-drift ${
      darkMode ? 'bg-blue-500/30' : 'bg-blue-400/50'
    }`} />

    {/* Blob 2: Bottom Right - Bigger (w-[900px]) and Brighter (opacity-50) */}
    <div className={`absolute -bottom-[15%] -right-[15%] w-[900px] h-[900px] rounded-full blur-[100px] animate-drift-slow ${
      darkMode ? 'bg-purple-500/30' : 'bg-purple-400/50'
    }`} />
  </div>
)

/**
 * --- SUB-COMPONENT: USER CARD ---
 * This handles the display for each individual user in the grid.
 */
const UserCard = ({ user, darkMode }) => {
  // Even IDs are online, Odd IDs are offline.
  const isOnline = user.id % 2 === 0;

  return (
    <div 
      key={user.id}
      className={`p-8 rounded-3xl border transition-all duration-300 group relative overflow-hidden shadow-sm hover:-translate-y-2 
      hover:shadow-2xl 
      ${darkMode 
        ? 'bg-slate-900 border-slate-800 hover:border-blue-500/50 hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)]' 
        : 'bg-white border-slate-100 hover:shadow-gray-400/50' 
      }`}
    >
      {/* User Status Badge - bg-emerald-500 animate-pulse for active users */}
      <div className="flex items-center gap-2 mb-6">
        <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></span>
        <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          {isOnline ? 'User Active' : 'Offline'}
        </span>
      </div>

      {/* User Avatar - using charAt(0) to get the first letter of the name */}
      <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl flex items-center justify-center text-xl font-black mb-6 shadow-lg group-hover:rotate-6 transition-transform">
        {user.name.charAt(0)}
      </div>

      {/* Name and Email Identity */}
      <h2 className={`text-2xl font-bold mb-1 group-hover:text-blue-500 transition-colors ${darkMode ? 'text-white' : 'text-slate-800'}`}>
        {user.name}
      </h2>
      <p className={`font-medium mb-6 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
        {user.email.toLowerCase()}
      </p>
      
      {/* Footer Info: Company (🏢) and City (📍) */}
      <div className={`pt-6 border-t space-y-3 ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
        <div className="flex items-center group/item">
          <span className="text-lg mr-3 opacity-70 group-hover/item:scale-125 transition-transform">🏢</span>
          <span className={`text-sm font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{user.company.name}</span>
        </div>
        <div className="flex items-center group/item">
          <span className="text-lg mr-3 opacity-70 group-hover/item:scale-125 transition-transform">📍</span>
          <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{user.address.city}</span>
        </div>
      </div>
    </div>
  )
}

// --- MAIN APPLICATION ---
function App() {
  // Data States - React variables with "memory"
  const [users, setUsers] = useState([]);      // Saves the API data
  const [search, setSearch] = useState("");    // Tracks what the user types
  const [darkMode, setDarkMode] = useState(false); // Change theme from light to dark

  /* fetch: fetching data from remote server */
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsers(data)) // Save to 'users' state for use later
  }, [])

  /* live-update: realtime filtering based on search input */
  const filtered = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className={`relative min-h-screen overflow-hidden transition-colors duration-500 py-16 px-6 font-sans ${
      darkMode ? 'bg-slate-950 text-white' : 'bg-gray-50 text-slate-900'
    }`}> 

      {/* The Animated Background Layer */}
      <BackgroundBlobs darkMode={darkMode} />

      {/* Content Layer - relative z-10 ensures it stays above the blobs */}
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Theme Toggle Button */}
        <div className="flex justify-end mb-8">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-xl transition-all duration-300 border flex items-center gap-2 font-bold ${
              darkMode 
                ? 'bg-slate-800 border-slate-700 text-yellow-400 hover:bg-slate-700' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-gray-50 shadow-sm'
            }`}
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
        
        {/* Header Section */}
        <header className="text-center mb-16 space-y-4">
          <h1 className={`text-5xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            User<span className="text-blue-500">Directory</span>
          </h1>
          <p className={`text-lg max-w-lg mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            A user-friendly interface for managing user directory
          </p>
        </header>
        
        {/* Search Bar Section with Glowing Effect */}
        <section className="search-area">
          <div className="max-w-xl mx-auto mb-16 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
            <input 
              type="text"
              placeholder="Search by name..."
              className={`relative w-full p-5 rounded-2xl border outline-none transition-all shadow-xl ${
                darkMode 
                  ? 'bg-slate-900 border-slate-700 text-white focus:ring-blue-400 placeholder:text-slate-600' 
                  : 'bg-white border-slate-200 text-slate-700 focus:ring-blue-500'
              }`}
              onChange={(e) => setSearch(e.target.value)} 
            />
          </div>
        </section>

        {/* User List Grid - Map through the filtered list and render cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(user => (
            <UserCard key={user.id} user={user} darkMode={darkMode} />
          ))}
        </section>

        {/* Empty State / No Results Found Message */}
        {filtered.length === 0 && (
          <div className="text-center py-32">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>No results found</h3>
            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Try searching for a different user.</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default App