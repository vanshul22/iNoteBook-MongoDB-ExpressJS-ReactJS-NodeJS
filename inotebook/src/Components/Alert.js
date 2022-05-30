import React from 'react';

function Alert(props) {
  // to Capitalize first word of Alerts (success -> Success).
  const capatilize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    // Given a height to this div element so that our alert will fit inside div always.
    <div style={{ height: "3em" }}>
      <div className={`alert alert-${props.typ} alert-dismissible fade show`} role="alert">
        <strong>{capatilize(props.typ)}</strong> : {props.msg}
      </div>
    </div>
  );
};

export default Alert;