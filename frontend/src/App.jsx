import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import About from "./pages/About.jsx";
import EditProduct from "./admin/EditProduct.jsx";
import ProductList from "./admin/Productslist.jsx";
import AddProduct from "./admin/AddProduct.jsx";
import Navbar from "./components/Navbar.jsx";
import Cart from "./pages/Cart.jsx";
import CheckoutAddress from "./pages/CheckoutAddress.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderSuccess from "./pages/orderSuccess.jsx";
// const router = createBrowserRouter([
//   {

//   [
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/about",
//     element: <About />,
//   },
//   {
//     // path: "/contact",
//     // element: <Contact />,
//   },
//   {
//     path: "/signup",
//     element: <Signup />,
//   },
//   {
//     path: "/product/:id",
//     element: <Products />,
//   },
//   { path: "/admin/products", element: <ProductList /> },
//   { path: "admin/products/add", element: <AddProduct /> },
//   { path: "admin/products/update/:id", element: <EditProduct /> },
// ]]);

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: "/cart", element: <Cart /> },

      { path: "/admin", element: <ProductList /> },
      { path: "/admin/products/add", element: <AddProduct /> },
      { path: "/admin/products/edit/:id", element: <EditProduct /> },
      { path: "/checkout-address", element: <CheckoutAddress /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/order-success/:id", element: <OrderSuccess /> },
    ],
  },
]);

export default function APP() {
  return <RouterProvider router={router} />;
}
