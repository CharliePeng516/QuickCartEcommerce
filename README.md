# QuickCart

QuickCart is a full-stack e-commerce application built with the Next.js framework. It provides a complete online shopping experience, from browsing products to placing orders. The project includes features for both customers and sellers.

## Features

- **User Authentication:** Secure user authentication using Clerk.
- **Product Management:** Sellers can add, view, and manage their products.
- **Shopping Cart:** Customers can add products to their cart and manage them.
- **Order Management:** Customers can view their order history, and sellers can manage incoming orders.
- **Address Management:** Users can save and manage multiple shipping addresses.
- **Responsive Design:** The application is designed to be fully responsive and accessible on all devices.

## Technologies Used

- **Frontend:**
  - [Next.js](https://nextjs.org/) - React framework for building server-side rendered and static web applications.
  - [React](https://reactjs.org/) - JavaScript library for building user interfaces.
  - [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
  - [Clerk](https://clerk.com/) - For user authentication.
- **Backend:**
  - [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) - For building the backend API.
  - [MongoDB](https://www.mongodb.com/) - NoSQL database for storing product, user, and order data.
  - [Mongoose](https://mongoosejs.com/) - Object Data Modeling (ODM) library for MongoDB and Node.js.
  - [Inngest](https://www.inngest.com/) - For handling background tasks and events.
  - [Cloudinary](https://cloudinary.com/) - For cloud-based image and video management.

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/QuickCart.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd QuickCart
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and add the following environment variables:

    ```
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

    MONGODB_URI=
    INNGEST_EVENT_KEY=
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## Usage

Once the application is running, you can:

- Sign up for a new account or sign in with an existing account.
- Browse the list of available products.
- View the details of a specific product.
- Add products to your shopping cart.
- Place an order and view your order history.
- Sellers can log in to their dashboard to manage their products and orders.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

---

<!-- ## Codebase Analysis and Areas for Improvement

After analyzing the codebase, here are some potential weaknesses and areas for improvement:

*   **Lack of a Testing Framework:** The project does not have a testing framework like Jest or React Testing Library configured. Adding a testing framework and writing unit and integration tests would significantly improve the code quality and prevent regressions.
*   **No Input Validation:** The API routes do not have any input validation. This could lead to security vulnerabilities and unexpected errors. Implementing a validation library like Zod or Joi would be beneficial.
*   **No State Management Library:** The project does not use a state management library like Redux or Zustand. While React Context is used, a dedicated state management library could be beneficial for managing complex state and improving performance.
*   **Missing Error Handling:** The frontend components could benefit from more robust error handling. For example, displaying user-friendly error messages when API requests fail.
*   **No CI/CD Pipeline:** The project does not have a CI/CD pipeline configured. Setting up a pipeline with a tool like GitHub Actions would automate the testing and deployment process. -->
