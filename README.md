# Ecommerce React App

A modern React ecommerce application built with Vite, featuring user authentication, product search, and product display functionality.

## Features

- **Login Page**: User authentication with email and password
- **Product Search**: Search for products by name or description
- **Product Display**: View all searched products in a beautiful grid layout
- **Protected Routes**: Secure navigation that requires authentication
- **Modern UI**: Clean, responsive design with gradient backgrounds and smooth animations

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

### Preview

Preview the production build:

```bash
npm run preview
```

## Usage

1. **Login**: Start at the login page. Enter any email and password to authenticate (this is a demo - no real authentication is implemented).

2. **Search**: After logging in, you'll be redirected to the search page. Enter a product name or keyword to search.

3. **View Products**: Click "Search" to see all matching products displayed in a grid layout. You can also view all products by navigating to the products page without a search query.

4. **Navigation**: Use the "Back to Search" button to return to the search page, or "Logout" to sign out.

## Project Structure

```
src/
├── pages/
│   ├── Login.jsx          # Login page component
│   ├── Login.css          # Login page styles
│   ├── Search.jsx         # Product search page component
│   ├── Search.css         # Search page styles
│   ├── Products.jsx       # Product display page component
│   └── Products.css       # Products page styles
├── App.jsx                # Main app component with routing
├── App.css                # App-level styles
├── main.jsx               # Entry point
└── index.css              # Global styles
```

## Technologies Used

- React 19
- React Router DOM 7
- Vite 7
- CSS3 (with modern features like gradients and animations)

## Notes

- Authentication is simulated using localStorage. In a production app, you would implement proper authentication with a backend API.
- Product data is currently mocked. In a real application, this would be fetched from an API.
- The app includes 10 sample products for demonstration purposes.
