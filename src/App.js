import { useCallback, useState, useRef, useMemo } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import './App.css';
import Header from './Components/Header/Header';
import EditMessage from './Components/EditMessage/EditMessage';
import DragAndDropNode from './Components/DragAndDropNode/DragAndDropNode';
import TextUpdaterNode from './Components/TextUpdaterNode/TextUpdaterNode';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { initialNodes, initialEdges } from './utils/defaultData';


const App = () => {

  // Initialize nodes and edges with the initial values
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  // Initialize the state variable to show/hide the edit message
  // used to show/hide the edit message
  const [showEditMessage, setShowEditMessage] = useState(false);

  // used to store the active node
  const [activeNode, setActiveNode] = useState();

  // used to store the latest id
  // currently set to 2 as we have 2 nodes in the initialNodes
  // used to generate new id for the new node
  const [latestId, setLatestId] = useState(2);

  // used to get the reference of the textarea
  const textareaRef = useRef(null);

  const nodeTypes = useMemo(() => {
    return { textUpdater: TextUpdaterNode };
  }, []);

  // Define the event handlers
  const onNodesChange = useCallback((changes) => {
    // set the active node id to activeNode state variable
    setActiveNode(changes[0].id)
    // find the node data by id and set the value of the textarea
    // update current node data in the textarea
    findNodeDataById(changes[0].id)
    setNodes((nds) => applyNodeChanges(changes, nds))
  }, [nodes]);


  const onEdgesChange = useCallback((changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds))
  }, [edges]);


  const onConnect = useCallback((connection) => {
    setEdges((eds) => addEdge(connection, eds))
  }, [edges]);


  // handleDrop function to add a new node on drop
  const handleDrop = (event) => {
    // Get the x and y coordinates of the drop event
    const x = event.pageX;
    const y = event.pageY;

    // Generate a new id for the new node
    // and update the latestId state variable
    const newId = latestId + 1;
    setLatestId(newId);

    // Create a new node object
    const newNode = {
      id: newId.toString(),
      type: 'textUpdater',
      position: { x, y },
      data: 'Edit me',
    };

    // Add the new node to the nodes array
    setNodes([...nodes, newNode]);

    // Show a success message
    // using external library to show the message
    enqueueSnackbar('Node added successfully', { variant: 'success' });
  };


  // this will be called when the user clicks on a node
  // to show the edit message panel in right side
  // Intialize the textarea with the current node data
  const onNodeClick = () => {
    setShowEditMessage(true);
    if (textareaRef.current) {
      textareaRef.current.value = '';
    }

    // remove the active class from the previous node
    // used to show the active node with a border
    removeActiveClass();
  }

  // Function to handle the change in the textarea
  // and update the node data to the new value
  const handleTextareaChange = (event) => {
    const updatedNodes = nodes.map(node => {
      if (node.id === activeNode) {
        return { ...node, data: event.target.value };
      }
      return node;
    });

    // update state with the new data
    setNodes(updatedNodes);
  };


  // Function to find the node data by id
  // and set the value of the textarea by using node data
  // to existing node data in the textarea
  function findNodeDataById(id) {
    const node = nodes.find(node => node.id === id);
    if (textareaRef.current)
      textareaRef.current.value = node.data;
  }

  // Function to check if all the nodes are connected
  // and show the success message if all the nodes are connected
  // else show the error message
  // trigger on 'Save changes' button click
  const isAllNodesAreConnected = () => {
    // Create a set to store the unique nodes connected
    const uniqueNodesConnected = new Set();
    edges.forEach(edge => {
      uniqueNodesConnected.add(edge.source);
      uniqueNodesConnected.add(edge.target);
    });

    const nodesLength = nodes.length;

    // Check if the unique nodes connected are equal to the total nodes
    // If yes, show the success message
    // else show the error message
    if (uniqueNodesConnected.size === nodesLength) {
      enqueueSnackbar('Changes saved successfully', { variant: 'success' })
    } else {
      enqueueSnackbar('Cannot save Flow', { variant: 'error' });
      enqueueSnackbar('Please connect the nodes', { variant: 'error' });;
    }
  }

  // fucntion to remove the active class from the node
  const removeActiveClass = () => {
    var element = document.querySelector('.active');
    if (element) {
      element.classList.remove('active');
    }
  }

  // function to handle the back button click
  // and remove the active class from the node
  const backButtonClick = () => {
    setShowEditMessage(false);
    removeActiveClass();
  }

  return (
    <div onDrop={handleDrop} onDragOver={(event) => event.preventDefault()}>
      <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }} />
      <Header onSaveChanges={isAllNodesAreConnected} />
      <div className='main-container'>
        <div className='reactflow-container' onClick={removeActiveClass}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onNodeClick={onNodeClick}
          />
        </div>
        <div className='edit-container'>
          {showEditMessage ? (
            <EditMessage
              onBackClick={backButtonClick}
              onTextareaChange={handleTextareaChange}
              textareaRef={textareaRef}
            />
          ) : (
            <DragAndDropNode />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;