import React , { Fragment }from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";

const Profile = () => {
  const { user, loding } = useSelector((state) => state.auth);

  return (
    <Fragment>
      <MetaData title={"My Profile"} />
      {loding ? (
        <Loader />
      ) : (
        <Fragment >
          <h2 className="my_profile_heading">My Profile</h2>
          <div className="row  mt-5 user-info user_profile">
            <div className="col-12 col-md-3 ">
              <figure className="avatar avatar-profile ">
                <img
                  className="rounded-circle img-fluid mt-4"
                  src={user.avatar.url}
                  alt={user.name}
                />
              </figure>
              <Link
                to="/me/update"
                id="edit_profile"
                className="btn btn-primary btn-block mt-5 edit_profile_btn"
              >
                Edit Profile
              </Link>
              <Link
                to="/password/update"
                className="btn  change_pwd_btn  mt-1"
              >
                Change Password
              </Link>
            </div>

            <div className=" col-12 col-md-5 profile_details">
              <h4>Full Name <span>{user.name}</span></h4>
              

              <h4>Email Address <span>{user.email}</span></h4>
              
              <h4>Joined On <span>{String(user.createdAt).substring(0, 10)}</span></h4>
              

              {user.role !== "admin" && (
                <Link to="/orders/me" className="btn btn-danger btn-block mt-4">
                  My Orders
                </Link>
              )}

             
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
