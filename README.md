# MANPASAND SHOES

MANPASAND SHOES is a premium, modern e-commerce web application built for an exceptional online shoe shopping experience.

## Features

- **Modern UI/UX**: Clean, responsive layout with smooth transitions and interactions.
- **Product Catalog**: Dynamic shoe listing with gender-based categorization (Men/Women).
- **Shopping Cart**: Real-time cart updates, local storage persistence, and cart sidebar.
- **Wishlist**: Save favorite shoes for later with dedicated wishlist management.
- **Checkout Flow**: Seamless checkout process including manual UPI payments via QR code.
- **Authentication**: Simple user registration and login flow (local storage based for demo).
- **Mobile Responsive**: Fully responsive design optimized for all screen sizes.

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion (motion/react)
- **Notifications**: React Hot Toast

## Running the Project Locally

### Prerequisites

You need to have Node.js installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate into the project directory:
   ```bash
   cd manpasand-shoes
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` (or the port specified in your console).

## Build for Production

To create a production build, run:

```bash
npm run build
```

This will generate a `dist` directory with your optimized static assets.

## Folder Structure

```
src/
├── components/      # Reusable UI components (Navbar, CartSidebar, CheckoutModal, etc.)
├── data/            # Mock data for products
├── lib/             # Utility functions
├── App.tsx          # Main application component
├── main.tsx         # Application entry point
├── index.css        # Global styles and Tailwind imports
└── types.ts         # TypeScript definitions
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
