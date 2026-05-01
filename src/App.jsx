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
    /* 
       <main>: For browsers and screen readers that this is the 
       primary content for the page.
    */
    <main> 

      {/* 
          <header>: for the header of the page
      */}
      <header>
        <h1>Team Directory</h1>
        <p>A user-friendly interface for managing user directory</p>
      </header>
      
      {/* 
          Section for the search bar
      */}
      <section>
        <input 
          type="text" //textbox for user to type in
          placeholder="Search by name..." //default text to guide user on what to type
          // Link the typed value back to "search" state.
          onChange={(e) => setSearch(e.target.value)} //find exactly what user types 
          //save it to "search" variable to filteri in the list
        />
      </section>

    </main>
  )
}

export default App