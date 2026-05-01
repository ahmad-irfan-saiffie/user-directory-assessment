/* import -> loading from React's core "hooks" for data and side effects. */

import { useState, useEffect } from 'react'

function App() {
  // Data States - works like variable initialization
  // but with "memory" that remember values even after re-renders of the page.
  const [users, setUsers] = useState([]);      // will save and use from the API data.
  const [search, setSearch] = useState("");    // will save and use what the user types.
  const [darkMode, setDarkMode] = useState(false); // Memory for the theme toggle.


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

    <main className="min-h-screen py-16 px-6 font-sans bg-gray-50 text-slate-900"> 
    {/* 
        - min-h-screen: Make sure whole background fits whole screen
        - py-16: vertical padding for space
        - px-6: horizontal padding for space left and right
        - font-sans: using sans-serif font for a modern and clean look  
        - bg-gray-50: Soft light theme for easier to read
        - text-slate-900: dark text color for better contrast and readability
    */}

      <div className="max-w-6xl mx-auto">
      {/* 
        - max-w-6xl: for easier to read, limit the content to 6xl (96rem) so it doesn't go too wide on large screens
        - mx-auto: center the content horizontally by setting left and right margins to auto 
      */}
        
        <header className="text-center mb-16 space-y-4">
        {/*  
            <header>: for the header of the page
            - text-center: center the text in the header
            - mb-16: margin bottom for space between header and content (below the header)
            - space-y-4: vertical spacing between elements in the header (title and description)  
        */}

          <h1 className="text-5xl font-black tracking-tight text-slate-900">
          {/* 
            - text-5xl: large font size for the title
            - font-black: extra bold for focus on title
            - tracking-tight: reduce letter spacing for more compact look
            - text-slate-900: dark text color for better contrast and readability
          */}
            User<span className="text-blue-500">Directory</span>
            {/*
              - <span>: to style only the "Directory" part of the title
              - text-blue-500: make "Directory" in blue color to add visual interest and highlight the purpose of the app
            */}
          </h1>
          <p className="text-lg max-w-lg mx-auto text-slate-500">
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
            - mb-16: margin bottom for space between the search bar and the list below
            - relative: to position the glow effect in this container
            - group: activating hover effects on when hovering at the search area
          */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
            {/* 
              - absolute: fixed into place this div under the same parent (the search area)
              - -inset-1: make it a bit larger than input space to give that glowing outside effect
              - bg-gradient-to-r from-blue-600 to-cyan-500: create a horizontal gradient from blue to cyan for the glow
              - rounded-2xl: make the corners of the glow rounded to match the input
              - blur: apply a blur effect to create a soft glow
              - opacity-20: make the glow faint by default
              - group-hover:opacity-50: increase the opacity of the glow when hovering over the search area for an interactive effect
              - transition duration-500: smooth transition for the glow effect when it changes opacity
            */}
            <input 
            type="text" //textbox for user to type in
            placeholder="Search by name..." //default text to guide user on what to type
            className="relative w-full p-5 rounded-2xl border border-slate-200 outline-none transition-all shadow-xl bg-white text-slate-700 focus:ring-blue-500"
            /*
              - relative: to place this input above the glow effect
              - w-full: make the input take the full width of the container
              - p-5: padding for space inside the input
              - rounded-2xl: rounded corners for a modern look
              - border border-slate-200: light border for definition without being too harsh
              - outline-none: remove default focus outline for a cleaner look
              - transition-all: smooth transition for all properties when they change (like focus effects)
              - shadow-xl: add a large shadow for depth and emphasis on the search bar
              - bg-white: white background for contrast against the glow and to keep it clean
              - text-slate-700: dark text color for readability while still softer than pure black
              - focus:ring-blue-500: add a blue ring around the input when it's focused for better accessibility and visual feedback
            */ 
            // Link the typed value back to "search" state.
            onChange={(e) => setSearch(e.target.value)} //find exactly what user types 
            //save it to "search" variable to filter in the list
            />
            </div>
        </section>


        {/* List container: List to present all user in respective card container  */}
        <section>
          {/* Take every user in the filtered list and present them. */}
          {filtered.map(user => (
            
            /* <article>: to present piece of content in self-contained container (like profile card) */
            <article key={user.id}> 
              {/* filtering the user id */}

              {/* Represents the User Avatar
                  also easier to find for the first letter of the name */}
              <div>{user.name.charAt(0)}</div>

              {/* The main identity information for the person. */}
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              
              {/* <footer>: extra info provided including the company name and city address  */}
              <footer>
                <div>
                  <span>🏢</span>
                  <span>{user.company.name}</span>
                </div>
                <div>
                  <span>📍</span>
                  <span>{user.address.city}</span>
                </div>
              </footer>

            </article>
          ))}
        </section>
      </div>
    </main>
  )
}

export default App