# Event Management Landing Page

A modern, responsive event management landing page built with **React** and **Vite**. This platform showcases upcoming workshops and events with an interactive user interface, featuring countdown timers, event registration, and partner showcases.

## About The Project

This landing page serves as the main hub for event management, allowing users to:
- Browse and explore upcoming workshops
- Register for events seamlessly
- Track event timelines with countdown timers
- Discover event partners and sponsors
- Connect with a built-in chatbot assistant

## Key Features

- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Interactive Components** - Dynamic workshop cards, countdown timers, and chatbot
- **Event Registration** - Seamless registration and confirmation pages
- **Partner Showcase** - Display event partners and sponsors
- **Modern Tech Stack** - React + Vite + Tailwind CSS + ESLint

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Navbar.jsx      # Navigation bar
│   ├── Hero.jsx        # Hero section
│   ├── Workshops.jsx   # Workshops listing
│   ├── WorkshopCard.jsx # Individual workshop card
│   ├── CountDown.jsx   # Event countdown timer
│   ├── About.jsx       # About section
│   ├── Partners.jsx    # Partners showcase
│   ├── Chatbot.jsx     # AI chatbot assistant
│   └── Footer.jsx      # Footer section
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── Register.jsx    # Event registration
│   └── Confirmation.jsx # Registration confirmation
├── apis.js             # API integration
├── App.jsx             # Main App component
└── main.jsx            # Entry point
```

## Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Code Quality:** ESLint
- **CSS Processing:** PostCSS

## Security Features

### reCAPTCHA Integration
This project includes **Google reCAPTCHA v3** integration for enhanced security:
- Prevents spam and bot submissions during email confirmation
- Located in the **Confirmation page** (`src/pages/Confirmation.jsx`)
- Validates user verification before processing registration confirmations
- Handles captcha errors gracefully with user-friendly error messages
- Automatically resets captcha on error or successful submission

**Note:** You'll need to configure your Google reCAPTCHA site key and secret key in your environment.

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Google reCAPTCHA API keys (for email confirmation)
