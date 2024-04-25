import { Handle, Position } from 'reactflow';
import { FcCallback } from "react-icons/fc";
import { BiMessageRoundedDetail } from "react-icons/bi";
import './TextUpdaterNode.css';


const TextUpdaterNode = ({ data, isConnectable, id }) => {

  const addActiveClass = (event) => {

    // This function is called when the node is clicked
    // give cuurentTarget the value of the event.currentTarget
    const element = event.currentTarget;

    // add the class 'active' to the element after 0ms
    // this is done to add the class after the removeActiveClass function is called in App.js
    setTimeout(() => {
      element.classList.add('active');
    }, 0);
  };


  return (
    <div id={id} className='text-updater-node' onClick={addActiveClass}>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      <div className='text-updater-node-header'>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <BiMessageRoundedDetail className='message-icon' />
          <span className='text-updater-node-header-text'>Send Message</span>
        </div>
        <FcCallback style={{ fontSize: 'x-large' }} />
      </div>
      <div className='text-updater-node-text'>
        {data}
      </div>
      <Handle type="source" position={Position.Right} id="b" isConnectable={isConnectable} />
    </div>
  );
};

export default TextUpdaterNode;
