import React from "react";

const Option = (props) => (
    <div>
        <div className="option">
        <p className="option__text">{props.count}. {props.option}</p>
        <button className="button button--link" onClick={() => 
            props.deleteOption(props.option)
        }>Remove</button>
        </div>
    </div>
);

export default Option;
