import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteAccount } from "../redux/modules/profiles";

const Settings = ({ deleteAccount }) => {
  return (
    <div className="home">
      <div className="post-card center">
        <div style={{ marginBottom: 15 }}>
          <p>Update your profile information.</p>
        </div>
        <div style={{ marginBottom: 15 }}>
          <Link to="/edit-profile" className="btn btn-primary">
            Edit Profile
          </Link>
        </div>
        </div>
        <div className="post-card center">
            <div>
                <p>
                    This will completely delete your account and all of your data from TawaSol.
                </p>
            </div>
        <div>
          <button onClick={()=> deleteAccount()} className="btn btn-danger">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};



export default connect(null, {deleteAccount})(Settings);
