import React from 'react';
import { IoArrowBack } from "react-icons/io5";

const EditMessage = ({ onBackClick, message, onTextareaChange, textareaRef }) => {
    return (
        <>
            <div className='edit-message-header'>
                <button className='back-button' onClick={onBackClick}>
                    <IoArrowBack />
                </button>
                <div style={{ marginLeft: '25%' }}>Message</div>
            </div>
            <div className='edit-message'>
                <div>Text</div>
                <textarea ref={textareaRef} className='edit-message-textarea'
                    placeholder='Enter your message here' onChange={onTextareaChange} value={message}>
                </textarea>
            </div>
        </>
    );
};

export default EditMessage;
