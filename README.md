# Great Family Chapel

A modern, responsive website for Great Family Chapel built with **React**, **Vite**, **Tailwind CSS**, and **Lucide React** icons. The site features event management with admin controls, dark mode support, donation capabilities, and a beautiful user interface.

## 🎯 Features

- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Dark Mode Support** - Theme toggle for user preference
- **Event Management** - Admin dashboard to create, view, and manage church events
- **Time Range Support** - Events now support start and end time ranges
- **Donation Page** - Dedicated page for congregation donations
- **Hero Section** - Eye-catching landing section
- **About Us** - Church information and mission
- **Services** - Showcase of church services
- **Contact Form** - Get in touch with the church
- **Responsive Navigation** - Mobile-friendly navbar with theme toggle
- **Local Storage** - Persists events and theme preferences

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Greatfamilychap-

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:5173` (or the port Vite assigns).

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── About_Us.jsx          # Church about section
│   ├── contact_Us.jsx        # Contact form
│   ├── Events.jsx            # Event management with admin dashboard
│   ├── Footer.jsx            # Footer section
│   ├── Hero.jsx              # Hero landing section
│   ├── Navbar.jsx            # Navigation bar with theme toggle
│   ├── Services.jsx          # Church services showcase
│   └── ThemeToggleBtn.jsx    # Theme toggle button
├── assets/
│   └── assets.js             # Asset references
├── App.jsx                   # Main app component
├── Donate.jsx                # Donation page
├── index.css                 # Global styles
└── main.jsx                  # App entry point
```

## 🔑 Key Components

### Events Component (`src/components/Events.jsx`)
- **Public View**: Filter events by category (Worship, Youth, Prayer, Outreach, Study, Special Events)
- **Admin Dashboard**: 
  - Admin login via keyboard shortcut (Ctrl+Shift+A)
  - Default password: `admin123` (change in code)
  - Add new events with title, date range, **time range**, location, category, description, attendees, and image
  - Delete events
  - Manage existing events in a data table
- **Features**:
  - Events with **start and end time ranges** (e.g., 9:00 AM - 11:00 AM)
  - Date range filtering for multi-day events
  - Image upload support
  - Local storage persistence

### Theme Management
- Dark/light mode toggle
- Stored in localStorage for persistence
- Available throughout all components

### Donation Page
- Dedicated donation interface
- Theme support

## 🛠️ Tech Stack

- **React 19.2.0** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **Lucide React 0.562.0** - Icon library
- **ESLint** - Code linting

## 📝 Configuration

### Admin Password
To change the admin password for event management:

Edit `src/components/Events.jsx` and find the line:
```javascript
const ADMIN_PASSWORD = 'admin123'; // Change this to your desired admin password
```

Replace `'admin123'` with your desired password.

## 💾 Data Persistence

- **Events**: Stored in browser's localStorage under key `gfc_events`
- **Theme**: Stored in browser's localStorage under key `theme`

## 🎨 Styling

The project uses **Tailwind CSS** with a utility-first approach. Key color utilities include:
- `bg-primary` - Primary brand color
- `text-accent` - Accent text color
- Dark mode support with `dark:` prefix

## 🔐 Admin Access

1. Press `Ctrl+Shift+A` to trigger admin login prompt
2. Enter the admin password (default: `admin123`)
3. Access the Event Management Dashboard
4. Add, view, or delete events
5. Click "Logout" to exit admin mode

## 🌐 Navigation

- **Home** - Hero and featured content
- **About** - Church information
- **Services** - What the church offers
- **Events** - Upcoming events with filtering
- **Contact** - Get in touch
- **Donate** - Make a donation

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

The `dist/` folder contains the production-ready files ready to deploy to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

## 📋 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint to check code quality |
| `npm run preview` | Preview production build locally |

## 🐛 Troubleshooting

### Events Not Saving
- Check browser localStorage is enabled
- Open DevTools Console (F12) and check for errors
- Clear localStorage if corrupted: `localStorage.clear()`

### Dark Mode Not Working
- Ensure the theme value is properly saved in localStorage
- Check that `dark:` classes are applied correctly in Tailwind config

### Admin Password Not Working
- Verify password in `Events.jsx` matches what you entered
- Try Ctrl+Shift+A again
- Check browser console for JavaScript errors

## 🤝 Contributing

When making changes:
1. Follow the existing code structure
2. Use ESLint: `npm run lint`
3. Test responsive design on multiple screen sizes
4. Ensure dark mode works for new components

## 📄 License

[Add your license here]

## 📧 Contact

For questions or support, contact the church through the contact form on the website.

---

**Last Updated**: February 2026  
**Version**: 0.0.0
