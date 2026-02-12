import React from "react";
import '../../styles/select.css'

interface Option{
    label:string;
    value:string;
}

interface SelectProps{
    label:string;
    name:string;
    value:string;
    options: Option[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({
    label,
    name,
    value,
    options,
    onChange,
}) => {
    return (
        <div className="select-group">
            <label htmlFor={name}>{label}</label>
            <select id={name} name={name} value={value} onChange={onChange}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}
export default Select;