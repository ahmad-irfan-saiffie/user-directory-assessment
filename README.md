# UserDirectory 🚀

A high-performance, modern user management interface built with **React** and **Tailwind CSS v4**. This project showcases real-time data fetching, advanced search logic, and a premium "Liquid Wallpaper" animated UI.

## 🌟 Key Features

*   **Real-time Data Fetching**: Integrates with the JSONPlaceholder API to simulate a live production environment.
*   **Intelligent Search**: A case-insensitive search filter that updates the UI instantly as the user types.
*   **Liquid Animated UI**: Custom-built background "blobs" using CSS `@keyframes` and Tailwind `@utility` directives for a high-end feel.
*   **Dynamic Theme Engine**: A smooth transition system between **Light Mode** and **Dark Mode** that adjusts all text, borders, and animations.
*   **Responsive Grid**: A mobile-first design that adapts from a single column to a 3-column layout on larger screens.

## 🛠️ Tech Stack

*   **Framework**: [React.js](https://react.dev/) (Utilizing `useState` for memory and `useEffect` for API side-effects).
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Using the latest `@import` engine).
*   **Icons & Emojis**: System-native iconography for a lightweight, fast-loading experience.
*   **Data Source**: JSONPlaceholder (REST API).

## 📖 My Learning Journey (Annotations)

As a **Junior Software Developer**, I believe technical integrity is my biggest asset. During the development of this project, I kept detailed notes on the logic:

*   **Component Pattern**: I refactored the code into **Sub-Components** (`UserCard`, `BackgroundBlobs`) to learn how to pass data via `props`.
*   **The "Logic Click"**: I implemented a status indicator where users with `Even IDs` are marked "Active" and `Odd IDs` are "Offline" to practice conditional rendering.
*   **CSS Animations**: I mastered the link between React and Tailwind v4 by using `@utility` to register custom animations like `animate-drift`.

## 🚀 Getting Started

To run this project locally, follow these steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/ahmad-irfan-saiffie/user-directory-assessment.git
2. **Install Dependencies**
   ```bash
   npm install
3. **Run the App**
   ```bash
   npm run dev
