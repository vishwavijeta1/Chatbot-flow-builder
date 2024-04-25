import React from 'react';
import { FcSms } from "react-icons/fc";

const DragAndDropNode = () => {
    return (
        <div className='drag-drop-container'>
            <h2>Drag and drop the nodes</h2>
            <div className='drag-drop'>
                <div className='drag-drop-item' draggable >
                    <FcSms style={{ fontSize: 'xx-large' }} />
                    <p>Message</p>
                </div>
            </div>
        </div>
    );
};

export default DragAndDropNode;
