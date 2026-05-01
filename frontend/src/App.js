import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateProductPage from "./pages/CreateProductPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import MyProductsPage from './pages/MyProductsPage';
import EditProductPage from './pages/EditProductPage';
import CategoryProductsPage from "./pages/CategoryProductsPage";
import SellerProfilePage from "./pages/SellerProfilePage";
import CartPage from "./pages/CartPage";
import BuyProductPage from "./pages/BuyProductPage";
import ConfirmOrder from "./pages/ConfirmOrder";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/my-products" element={<MyProductsPage />} />
        <Route path="/edit-product/:id" element={<EditProductPage />} />
        <Route path="/category/:categoryName" element={<CategoryProductsPage />} />
        <Route path="/buy-product/:id" element={<BuyProductPage />} />
        <Route
          path="/confirm-order"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />
       
        <Route
          path="/create-product"
          element={
            <ProtectedRoute>
              <CreateProductPage />
            </ProtectedRoute>
          }
        />
          <Route
            path="/cart"
           element={
      <ProtectedRoute>
        <CartPage />
      </ProtectedRoute>
         }
         />
        <Route
          path="/product/:id"
          element={<ProductDetailsPage />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/:id"
          element={
           <ProtectedRoute>
              <SellerProfilePage />
           </ProtectedRoute>
           }
        />
        
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;