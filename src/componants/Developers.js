import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfiles } from "../redux/modules/profiles";
import { getProfileImage } from "../utils";
import defaultImg from "../assets/default.png";

function Developers({ user, getProfiles, profiles: { profiles, loading } }) {
    useEffect(() => {
      getProfiles();
    }, [getProfiles]);
  
    return (
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="home">
            <div className="row">
              {profiles
                .filter((profile) => profile.user && profile.user._id !== user._id)
                .map((profile) => {
                  if (profile.user) {
                    return (
                      <div className="column" key={profile.user._id}>
                        <Link to={`/profile/${profile.user._id}`}>
                          <Developer profile={profile} />
                        </Link>
                      </div>
                    );
                  }
                  return null;
                })}
            </div>
          </div>
        )}
      </div>
    );
  }
  
  function Developer({ profile }) {
    const [errored, setErrored] = useState(false);
    const [img, setImg] = useState(
      profile.user ? getProfileImage(profile.user._id) : defaultImg
    );
  
    function onError() {
      if (!errored) {
        setErrored(true);
        setImg(defaultImg);
      }
    }
  
    return (
      <div className="card">
        <img src={img} alt="Profile" onError={onError} />
        <div className="card-container">
          {profile.user && <p>{profile.user.name}</p>}
          <p className="title">{profile.status}</p>
        </div>
      </div>
    );
  }
  

const mapStateToProps = (state) => ({
  user: state.users.user,
  profiles: state.profiles,
});

export default connect(mapStateToProps, { getProfiles })(Developers);
