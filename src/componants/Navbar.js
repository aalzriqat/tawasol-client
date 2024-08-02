import { Fragment } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/modules/users";

const Navbar = ({ users: { isAuthenticated }, logout }) => {
  return (
    <nav className="navbar bg-navbar">
      <h1>
        <Link className="logo-navbar" to="/">
          TawaSol
        </Link>
      </h1>
      <Fragment>
        {isAuthenticated ? (
          <Link className="btn" onClick={logout} to="/">
            Logout
          </Link>
        ) : (
          <Fragment>
            <Link className="btn" to="/login">
              Login
            </Link>
          </Fragment>
        )}
      </Fragment>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps, { logout })(Navbar);
