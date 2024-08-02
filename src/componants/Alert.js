import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useAlert } from "react-alert";

const Alert = ({ alert }) => {
  const showAlert = useAlert();
  useEffect(() => {
    if (alert.show) {
      showAlert.show(alert.msg, { type: alert.type });
    }
  });

  return <></> //return empty JSX element
};
const mapStateToProps = (state) =>{
    return {
        alert : state.alerts // = initial value in alerts module
    }
}
//const connectToStore = connect(mapStateToProps);
//const connectedComponant = connectToStore(Alert);
//export default connectedComponant;

//short way for the 3 above

export default connect(mapStateToProps)(Alert);

