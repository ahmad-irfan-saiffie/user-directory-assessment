/* import -> loading from React's core "hooks" for data and side effects. */

import { useState, useEffect } from 'react'

function App() {
  // Data States - works like variable initialization
  // but with "memory" that remember values even after re-renders of the page.
  const [users, setUsers] = useState([]);      // will save and use from the API data.
  const [search, setSearch] = useState("");    // will save and use what the user types.
  const [darkMode, setDarkMode] = useState(false); // A simple true/false switch for the visual theme.


  /* fetch: fetching data from remote server */
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users') //place to fetch data from
      .then(res => res.json()) //translate the data to JSON format (javascript understands)
      .then(data => setUsers(data)) //save fetched data variable 'users' for use later
  }, [])


  /* live-update: to create realtime live-update list based on what the user searches */
  const filtered = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase())
    //find user name -> if typed in lowercase, it will still find matching name
  )

  return (
    /* <main>: For browsers and screen readers that this is the 
       primary content for the page.  */

    <main className={`min-h-screen transition-colors duration-500 py-16 px-6 font-sans ${
      darkMode ? 'bg-slate-950 text-white' : 'bg-gray-50 text-slate-900'
    }`}> 
    {/* 
        - min-h-screen: Make sure whole background fits whole screen
        - py-16: vertical padding for space
        - px-6: horizontal padding for space left and right
        - font-sans: using sans-serif font for a modern and clean look  
        - bg-gray-50: Soft light theme for easier to read
        - text-slate-900: dark text color for better contrast and readability
        - bg-slate-950: dark background for dark mode for better contrast and readability
        - text-white: light text color for dark mode for better contrast and readability
        - transition-colors duration-500: smooth transition when switching between light and dark mode for better user experience
    */}

      <div className="max-w-6xl mx-auto">
      {/* 
        - max-w-6xl: for easier to read, limit the content to 6xl (96rem) so it doesn't go too wide on large screens
        - mx-auto: center the content horizontally by setting left and right margins to auto 
      */}

        {/*}- flex justify-end: Pushes the button to the right side of the stage */}
        <div className="flex justify-end mb-8">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-xl transition-all duration-300 border flex items-center gap-2 font-bold ${
              darkMode 
                ? 'bg-slate-800 border-slate-700 text-yellow-400 hover:bg-slate-700' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-gray-50 shadow-sm'
            }`}
          >
            {/* UPDATED: Clear labels to see the button better */}
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
        
        <header className="text-center mb-16 space-y-4">
        {/*  
            <header>: for the header of the page
            - text-center: center the text in the header
        */}

          <h1 className={`text-5xl font-black tracking-tight transition-colors ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
          {/* 
            - tracking-tight: reduce letter spacing for more compact look
          */}
            User<span className="text-blue-500">Directory</span>
            {/*
              - <span>: to style only the "Directory" part of the title
              - text-blue-500: make "Directory" in blue color to add visual interest and highlight the purpose of the app
            */}
          </h1>
          <p className={`text-lg max-w-lg mx-auto transition-colors ${
            darkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
          {/*
            - text-lg: larger font size for the description
            - max-w-lg: limit the width of the description for better readability
            - mx-auto: center the description horizontally
            - text-slate-500: lighter text color for less emphasis than the title, but still readable
          */}
            A user-friendly interface for managing user directory
          </p>
        </header>
        

        {/* Section for the search bar */}
        <section className="search-area">
        {/*
          - <section>: to separate the search bar as a separate object on the page
          - search-area: custom class for future potential of additional styling
        */}

          <div className="max-w-xl mx-auto mb-16 relative group">
          {/*
            - max-w-xl: limit the width of the search bar
            - mx-auto: center the search bar horizontally
            - relative: to position the glow effect in this container
            - group: activating hover effects on when hovering at the search area
          */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
            {/* 
              - absolute: fixed into place this div under the same parent (the search area)
              - inset-1: make it a bit larger than input space to give that glowing outside effect
            */}
            <input 
            type="text" //textbox for user to type in
            placeholder="Search by name..." //default text to guide user on what to type
            className={`relative w-full p-5 rounded-2xl border outline-none transition-all shadow-xl ${
              darkMode 
                ? 'bg-slate-900 border-slate-700 text-white focus:ring-blue-400 placeholder:text-slate-600' 
                : 'bg-white border-slate-200 text-slate-700 focus:ring-blue-500'
            }`}
            /*
              - relative: to place this input above the glow effect
              - w-full: make the input take the full width of the container
              - outline-none: remove default focus outline for a cleaner look
              - transition-all: smooth transition for all properties when they change (like focus effects)
              - focus:ring-blue-500: add a blue ring around the input when it's focused for better accessibility and visual feedback
            */ 
            // Link the typed value back to "search" state.
            onChange={(e) => setSearch(e.target.value)} //find exactly what user types 
            //save it to "search" variable to filter in the list
            />
            </div>
        </section>


        {/* List container: List to present all user in respective card container  */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/*
          - <section>: to separate the user list as separate section 
          - grid: use CSS grid layout for the user cards
          - grid-cols-1: 1 column on small screens for better readability
          - md:grid-cols-2: 2 columns on medium screens for better use of space
          - lg:grid-cols-3: 3 columns on large screens for optimal use of space and presentation
          - gap-8: space between the grid items (user cards) for better visual separation
        */}

          {/* Take every user in the filtered list and present them. */}
          {filtered.map(user => {
            // Even IDs are online, Odd IDs are offline.
            const isOnline = user.id % 2 === 0;

            return (
            /* changed <article> to <div> for easier styling */
            <div 
              key={user.id}
              className={`p-8 rounded-3xl border transition-all duration-300 group relative overflow-hidden shadow-sm hover:-translate-y-2 
              hover:shadow-2xl 
              ${darkMode 
                ? 'bg-slate-900 border-slate-800 hover:border-blue-500/50 hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)]' 
                : 'bg-white border-slate-100 hover:shadow-gray-400/50' 
              }`}
            >
              {/*
                - key={user.id}: unique key for each user card for React's rendering optimization
                - transition-all duration-300: smooth transition for all properties when they change (like hover effects)
                - group: to enable hover effects on child elements when hovering over the card
                - relative: to position any child elements absolutely within the card if needed
                - overflow-hidden: to ensure any child elements that might expand on hover don't overflow outside the card
                - shadow-sm: subtle shadow for depth and separation from the background
                - hover:-translate-y-2: lift the card slightly on hover for an interactive feel
                - hover:shadow-2xl hover:shadow-gray-400/50: add a larger, softer shadow on hover for emphasis and a more dynamic look
                - darkMode styles: adjust background, border, and shadow colors for better aesthetics in dark mode
              */}
              
              {/* User Status - Online/Offline */}
              <div className="flex items-center gap-2 mb-6">
                <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></span>
                  {/* - w-2.5 h-2.5: small size for the status indicator
                  - rounded-full: make it a circle
                  - bg-emerald-500 animate-pulse: green color with pulsing animation for online users to draw attention
                  - bg-slate-300: gray color for offline users to indicate inactivity */}
                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                    darkMode ? 'text-slate-500' : 'text-slate-400'
                  }`}>
                  {isOnline ? 'User Active' : 'Offline'}
                </span>
              </div>

              {/* filtering the user id */}

              {/* Represents the User Avatar
                  also easier to find for the first letter of the name */}
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl flex items-center justify-center text-xl font-black mb-6 shadow-lg group-hover:rotate-6 transition-transform">
                {/*
                  - w-14 h-14: fixed size for the avatar for consistency
                  - bg-gradient-to-br from-blue-600 to-blue-700: gradient background for a vibrant and modern look
                  - flex items-center justify-center: center the text (initial) both vertically and horizontally within the avatar
                  - shadow-lg: add a shadow for depth and emphasis on the avatar
                  - group-hover:rotate-6: add a slight rotation on hover for an interactive and playful effect
                  - transition-transform: smooth transition for the rotation effect when hovering over the card
                */}
                {user.name.charAt(0)}
              </div>

              {/* The main identity information for the person. */}
              <h2 className={`text-2xl font-bold mb-1 group-hover:text-blue-500 transition-colors ${
                  darkMode ? 'text-white' : 'text-slate-800'
                }`}>
                {/*
                  - group-hover:text-blue-500: change text color to blue on hover for interactivity
                  - transition-colors: smooth transition for the color change when hovering over the card
                */}
                {user.name}
              </h2>
              <p className={`font-medium mb-6 ${
                  darkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                {user.email.toLowerCase()}
              </p>
              
              {/* <footer>: extra info provided including the company name and city address  */}
              {/* <footer> changed to <div> for easier styling */}
              <div className={`pt-6 border-t space-y-3 ${
                  darkMode ? 'border-slate-800' : 'border-slate-100'
                }`}>
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
})}
        </section>


        {/* If the searched name is empty or not found, show this message. */}
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