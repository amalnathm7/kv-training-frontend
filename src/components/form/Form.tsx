import React from "react";
import "./Form.css";

type FormPropsType = {
};

const Form: React.FC<FormPropsType> = (props) => {
    return <div className="form-container">
        {props.children}
    </div>;
};

export default Form;
