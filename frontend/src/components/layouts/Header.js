import React, { Fragment } from "react";
import { Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../actions/userActions";

import Search from "./Search";
const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { user, loding } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Logged out successfully");
  };
  return (
    <Fragment>
      <nav className="heading">
        <div className="logo">
          <Link to="/" className="home__link">
            <div className="logo__container">
              <img
                className="logo__container__logo"
                alt="logo"
                src="https://res.cloudinary.com/saienterprises/image/upload/v1640793940/avatars/biswajyotim_Fan_ooewd0.svg"
              />

              <span className="logo__container__name">Sai Enterprises</span>
            </div>
          </Link>
        </div>

        <div className="search">
          <Route render={({ history }) => <Search history={history} />} />
        </div>

        <div className="cart">
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <span id="cart" className="ml-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="black" width="36" height="36" viewBox="0 0 24 24"><path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm9.805-16.5l-3.432 12h-2.102l2.541-9h-5.993c.115.482.181.983.181 1.5 0 3.59-2.91 6.5-6.5 6.5-.407 0-.805-.042-1.191-.114l1.306 3.114h13.239l3.474-12h1.929l.743-2h-4.195zm-6.305 15c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm-9-15c-2.486 0-4.5 2.015-4.5 4.5s2.014 4.5 4.5 4.5c2.484 0 4.5-2.015 4.5-4.5s-2.016-4.5-4.5-4.5zm-.469 6.484l-1.687-1.636.695-.697.992.94 2.115-2.169.697.696-2.812 2.866z"/></svg>
            </span>
            <span className="" id="cart_count">
              {cartItems.length}
            </span>
          </Link>
          {user ? (
            <div className="dropdown ">
              <Link
                to="#!"
                className="user__dropdown dropdown-toggle  mr-4"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt="ME"
                    className="rounded-circle"
                  />
                </figure>
                <span>{user.name} &nbsp;</span>
              </Link>

              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {user && user.role !== "admin" ? (
                  <Link to="/orders/me" className="dropdown-item">
                    Orders
                  </Link>
                ) : (
                  <Link to="/dashboard" className="dropdown-item">
                    Dashboard
                  </Link>
                )}
                <Link to="/me" className="dropdown-item">
                  Profile
                </Link>
                <Link
                  to="/"
                  className="dropdown-item text-danger"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            !loding && (
              <Link to="/login" className="btn ml-4" id="login_btn">
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
