import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import ProductsDisplay from "./pages/ProductsDisplay/ProductsDisplay.jsx";
import Products from "./pages/Products/Products.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import AuthPage from "./pages/Auth/AuthPage";
import Profile from "./pages/Profile/ProfilePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <ProductsDisplay />,
      },
      {
        path: "product/:id",
        element: <Products />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "login",
        element: <AuthPage mode="login" />,
      },
      {
        path: "register",
        element: <AuthPage mode="register" />,
      },
      {
        path: "/perfil",
        element: <Profile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
