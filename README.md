# Amazon Clone

A modern Amazon-inspired e-commerce web application built with **React (Vite)**, **Firebase** (database & authentication), and **Chapa** for payment integration.

[View on GitHub](https://github.com/mihret7/amazon-clone-Chap-Integrated-)

---

## Features

- 🔥 **React (Vite)** frontend for a fast and responsive user experience
- 🔐 **Firebase Authentication**: Secure login & registration
- 🛒 **Product Listing**: Browse products, detailed product pages
- 🛍️ **Shopping Cart**: Add, remove, and update items in your cart
- 💳 **Checkout & Chapa Payments**: Seamless and secure payment integration
- ☁️ **Firebase Database**: Real-time product, user, and order management

---

## Demo

[live demo](https://amazon-clone-by-mihret-chapa.netlify.app)

---

## Getting Started

### Prerequisites

- Node.js & npm installed
- Firebase project (with Authentication & Firestore enabled)
- Chapa for payment processing

### Local Setup

1. **Clone this repo:**
    ```bash
    git clone https://github.com/mihret7/amazon-clone-Chap-Integrated-.git
    cd amazon-clone
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Configure Environment Variables:**
    - Copy `.env.sample` to `.env` and fill in your Firebase and chapa credentials.

4. **Run the application:**
    ```bash
    npm run dev
    ```

5. Visit `http://localhost:5173` in your browser.

---

## Project Structure

```
src/
  components/      # Reusable UI components
  pages/           # Application pages (Home, Product, Cart, Checkout, etc.)
  firebase.js      # Firebase configuration and initialization
  App.jsx          # Main App component
  main.jsx         # Entry point
```

---

## Technologies Used

- **Frontend:** React, Vite, CSS/Styled Components
- **Backend & Auth:** Firebase (Firestore, Authentication)
- **Payments:** Chapa

---



## Author

- [mihret7](https://github.com/mihret7)
