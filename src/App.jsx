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
        <section>
          <input 
            type="text" //textbox for user to type in
            placeholder="Search by name..." //default text to guide user on what to type
            // Link the typed value back to "search" state.
            onChange={(e) => setSearch(e.target.value)} //find exactly what user types 
            //save it to "search" variable to filteri in the list
          />
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