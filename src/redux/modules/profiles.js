import { showAlertMessage } from "./alerts";
import { api } from "../../utils";

export const GET_PROFILE = "profile/GET_PROFILE";
export const GET_PROFILES = "profile/GET_PROFILES";
export const UPDATE_PROFILE = "profile/UPDATE_PROFILE";
export const PROFILE_ERROR = "profile/PROFILE_ERROR";
export const UPLOAD_PROFILE_IMAGE = "profile/UPLOAD_PROFILE_IMAGE";
export const CLEAR_PROFILE = "profile/CLEAR_PROFILE";
const initialState = {
  profile: null,
  profiles:[],
  loading: true,
  error: {},
  image: null,
};

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await api.get("/profiles/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response ? error.response.statusText : "Server Error",
        status: error.response ? error.response.status : 500,
      },
    });
  }
};

//create or update profile

export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const res = await api.post("/profiles", formData);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(showAlertMessage("Profile Created", "success"));
    
      history.push("/home");
    
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) =>
          dispatch(showAlertMessage(error.msg, "error"))
        );
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    } else {
      dispatch(
        showAlertMessage("Something went wrong, please try again later", "error")
      );
    }
  }
};

export const uploadProfileImage = (data) => async (dispatch) => {
  try {
    const res = await api.post('profiles/upload', data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};


// Action to get all profiles
export const getProfiles = () => async (dispatch) => {
  // Clear any existing profile data
  dispatch({ type: CLEAR_PROFILE });

  try {
    // Make the API call to get profiles
    const res = await api.get("/profiles");

    // Dispatch the profiles data to the reducer
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    // Handle any errors that occur during the API call
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response ? err.response.statusText : "Server Error",
        status: err.response ? err.response.status : 500,
      },
    });
  }
};


export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`/profiles/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response ? error.response.statusText : "Server Error",
        status: error.response ? error.response.status : 500,
      },
    });
  }
};

export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const res = await api.put("/profiles/experience", formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(showAlertMessage("Experience added", "success"));

    if (history) {
      history.push("/home");
    }
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) =>
          dispatch(showAlertMessage(error.msg, "error"))
        );
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    } else {
      dispatch(
        showAlertMessage("An error occurred. Please try again later.", "error")
      );
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: "Server Error",
          status: 500,
        },
      });
    }
  }
};

export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const res = await api.put("/profiles/education", formData);

    console.log("Education added successfully:", res.data);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(showAlertMessage("Education added", "success"));
    if (history) {
      history.push("/home");
    }
  } catch (err) {
    console.error("Error adding education:", err);
    if (err.response && err.response.data && err.response.data.errors) {
      const errors = err.response.data.errors;
      errors.forEach((error) => dispatch(showAlertMessage(error.msg, "error")));
    } else {
      dispatch(
        showAlertMessage("An error occurred. Please try again later.", "error")
      );
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response ? err.response.statusText : "Server Error",
        status: err.response ? err.response.status : 500,
      },
    });
  }
};
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profiles/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(showAlertMessage("Experience removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profiles/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(showAlertMessage("Education removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      await api.delete("/profiles");
      dispatch({ type: CLEAR_PROFILE });
      dispatch(
        showAlertMessage("Your account has been permanently deleted", "success")
      );
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
      case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
      case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    case UPLOAD_PROFILE_IMAGE:
      return {
        ...state,
        image: payload,
      };
    default:
      return state;
  }
}
