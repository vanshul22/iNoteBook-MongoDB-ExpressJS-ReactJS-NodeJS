import React from 'react';

export default function Alert(props) {
    // to Capitalize first word of Alerts (success -> Success).
    const capatilize = (word) => {
        if (word === "danger") {
            word = "error";
        };
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    };

    return (
        // Given a height to this div element so that our alert will fit inside div always.
        <div style={{ height: "3em" }}>
            {/* In JS ( props.alert ) this will evaluate first if its false then it will not run next commands */}
            {props.alert &&
                <div className={`alert alert-${props.alert.typ} alert-dismissible fade show`} role="alert">
                    <strong>{capatilize(props.alert.typ)}</strong> : {props.alert.msg}
                </div>}
        </div>
    );
};