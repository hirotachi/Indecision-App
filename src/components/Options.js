import React from "react";
import Option from "./Option";


const Options = (props) => (
    <div>
        <div className="widget-header">
        <h3 className="widget-header__title">Your Options</h3>
            <button
            className="button button--link"
            onClick={props.removeOptions}
            >Remove All
            </button>
        </div>
            {props.options.length === 0 &&
                <p className="widget__message"
                >Please add an option</p>}
            {props.options.length !== 0 &&
                <div>
                    {props.options.map((option,index) => 
                    <Option 
                        key={index}
                        option={option}
                        index={index}
                        count={index + 1}
                        deleteOption={props.deleteOption}
                    />)}
                </div>
            }
            
        
    </div>
);

export default Options;