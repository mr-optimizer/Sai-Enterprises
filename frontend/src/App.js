import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store from "./store";
import axios from "axios";

import "./style.css";
import "./App.css";

// Payments
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Home impors
import Home from "./components/Home";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/footer";

// Cart imports
import Cart from "./components/cart/Cart";
import Shiping from "./components/cart/Shiping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";

// Order inports
import ListOrders from "./components/orders/ListOrders";
import OrderDetails from "./components/orders/OrderDetails";

// Product import
import ProtectedRoute from "./components/route/ProtectedRoute";
import ProductDetails from "./components/product/ProductDetails";

// Auth or User import
import Login from "./components/user/login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";

// Admin import
import Dashboard from "./components/admin/Dashboard";
import ProductsList from "./components/admin/ProductsList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrdersList from "./components/admin/OrdersList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";
import ProductReviews from "./components/admin/ProductReviews";

import { loadUser } from "./actions/userActions";

function App() {
  const { user, loding } = useSelector((state) => state.auth);
  const [stripeApiKey, setStripeApiKey] = useState("");
  useEffect(() => {
    //even after reload user user deta not go, not logout
    store.dispatch(loadUser());

    async function getStripeApiKey() {
      const { data } = await axios.get("/api/v1/stripeapi");
      setStripeApiKey(data.stripeApiKey);
    }
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="main__container">
          <Route path="/" component={Home} exact></Route>
          <Route path="/cart" component={Cart} exact></Route>
          <ProtectedRoute path="/shipping" component={Shiping} />
          <ProtectedRoute
            path="/orders/confirm"
            component={ConfirmOrder}
            exact
          />
          <ProtectedRoute path="/success" component={OrderSuccess} />
          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path="/payment" component={Payment} />
            </Elements>
          )}

          <Route path="/search/:keyword" component={Home} />
          <Route path="/product/:id" component={ProductDetails} exact />

          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <ProtectedRoute path="/me" component={Profile} exact />
          <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
          <ProtectedRoute
            path="/password/update"
            component={UpdatePassword}
            exact
          />
          <Route path="/password/forgot" component={ForgotPassword} exact />
          <Route path="/password/reset/:token" component={NewPassword} exact />

          <ProtectedRoute path="/order/:id" component={OrderDetails} exact />
          <ProtectedRoute path="/orders/me" component={ListOrders} exact />
        </div>
        <ProtectedRoute
          path="/dashboard"
          isAdmin={true}
          component={Dashboard}
          exact
        />
        <ProtectedRoute
          path="/admin/products"
          isAdmin={true}
          component={ProductsList}
          exact
        />
        <ProtectedRoute
          path="/admin/product"
          isAdmin={true}
          component={NewProduct}
          exact
        />
        <ProtectedRoute
          path="/admin/product/:id"
          isAdmin={true}
          component={UpdateProduct}
          exact
        />
        <ProtectedRoute
          path="/admin/orders"
          isAdmin={true}
          component={OrdersList}
          exact
        />
        <ProtectedRoute
          path="/admin/order/:id"
          isAdmin={true}
          component={ProcessOrder}
          exact
        />
        <ProtectedRoute
          path="/admin/user/:id"
          isAdmin={true}
          component={UpdateUser}
          exact
        />
        <ProtectedRoute
          path="/admin/reviews"
          isAdmin={true}
          component={ProductReviews}
          exact
        />
        <ProtectedRoute
          path="/admin/users"
          isAdmin={true}
          component={UsersList}
          exact
        />
        {!loding && (!user || (user && user.role !== "admin")) && <Footer />}
      </div>
    </Router>
  );
}

export default App;
