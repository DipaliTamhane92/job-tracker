import React from "react";
import "../../styles/model.css"

interface ModelProp {
    isOpen: boolean;
    title: string;
    children: React.ReactNode;
    onClose: () => void;
}

const Model = ({ isOpen, title, children, onClose}: ModelProp) => {
    if(!isOpen) return null;

    return(
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h3>{ title }</h3>
                    <button className="close-btn" onClick={ onClose }>
                        X
                    </button>
                </div>
                <div className="modal-body"> { children }</div>
            </div>
        </div>
    );
};

export default Model;