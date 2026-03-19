# Ecommerce React App

A simple and easy-to-use ecommerce app built with React. It lets users log in, search for products, add items to a shopping cart, and pay securely.

## Main App Components

Here is a brief look at the main parts of the app:

### Pages
- **Login**: The screen where users sign into the application.
- **Search**: A page allowing users to find specific items quickly.
- **Products**: Displays a full list of all available items.
- **ProductCheckout**: Shows details for a single product and lets the user go to checkout.
- **Cart**: Shows the items added to the cart and the total price before paying.

### Data & State
- **Cart Context**: Remembers what items are in the cart as the user moves between different pages.

### Backend Services
- **Stripe Server**: A checkout server that safely processes payments.
- **Product Catalog**: Handles the list of products.
- **Cart Service**: Saves the user's cart in the background.

## App URL: https://ecommerce.haile.click

## Notes
- Login is just a demo and does not require a real account.
- Payments use a test mode in Stripe, so no real money is charged.
- If it's the first time you login, there might be a situation where the database service needs to warm-up and activate (as I set up the auto-scaling for it), before it can server traffic. So if you don't see any products after login, please wait for a few minutes and try again, or open a new tab.
