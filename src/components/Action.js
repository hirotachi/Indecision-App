import React from "react";


const Action = (props) => (
    <div>
        <button
            onClick={props.pickOption}
            disabled={props.hasOptions}
            className="big-button"
        >
            What should i do?</button>                
        </div>
);

export default Action;