import React from "react";
import '../../styles/input.css'

interface InputProps{
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const Input: React.FC<InputProps> = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
}) => {
    return (
        <div className="input-group">
            <label htmlFor={name}>{label}</label>
            <input id={name} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} />
        </div>
    );
};

export default Input;