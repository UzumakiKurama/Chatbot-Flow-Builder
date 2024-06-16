import React, { useCallback, useState} from 'react';
import ReactFlow, { 
  Controls, 
  ReactFlowProvider, 
  addEdge, 
  useEdgesState, 
  useNodesState
} from 'reactflow';
import NodesPanel from './components/NodesPanel/NodesPanel';
import MessageNode from '../src/components/Nodes/MessageNode/MessageNode';
import SettingsPanel from './components/SettingsPanel/SettingsPanel';
import Header from './components/Header/Header';

import 'reactflow/dist/style.css';
import './App.css';

let id = 0;
const getId = () => `newNode_${id++}`;

const nodeTypes = {message : MessageNode};

function App() {
  
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  let [selectedNode, setSelectedNode] = useState(null);
  
  // To get the position of the drag and dropped node 
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const nodeType = event.dataTransfer.getData('application/chatbot-flow');

    // Checking if the dropped node is valid or not 
    if(typeof nodeType === undefined || !nodeType) return;

    // Creating and adding the new node
    const position = reactFlowInstance.screenToFlowPosition({
      x : event.clientX,
      y : event.clientY
    });

    const newNode = {
      id : getId(),
      type : nodeType,
      position,
      data : { nodeText : 'What node is this ?'}
    }; 

    setNodes((state) => state.concat(newNode));
  }, [reactFlowInstance]);

  const onConnect = useCallback((params) => setEdges((state) => addEdge(params, state)), [])

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // For changing the text of node 
  const onChange =  useCallback((text)=> {
    let updatedNodes = nodes.filter(item => item.id === selectedNode.id);
    updatedNodes[0].data = {nodeText : text};

    nodes.forEach(node => {
      if(node.id !== selectedNode.id) updatedNodes.push(node);
    });

    setNodes(updatedNodes);
  },[nodes, selectedNode, setNodes]);

  // To show Nodes Panel when clicked anywhere on the react flow board except the nodes
  const onReactFlowClickHandler  = useCallback((event) => {
    if(event.target.classList[0] === "react-flow__pane"){
      setSelectedNode(null);
    }
  },[]);

  return (
    <div className='main'>
      <ReactFlowProvider>
        <div className='main_container'>
          <Header edges={edges} nodes={nodes}/>
          <div className='main-content'>
            <main className='main-reactflow' onClick={onReactFlowClickHandler}>
                <ReactFlow 
                  nodes={nodes} 
                  edges={edges} 
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onInit={setReactFlowInstance}
                  onDrop={onDrop}
                  onConnect={onConnect}
                  onDragOver={onDragOver}
                  nodeTypes={nodeTypes}
                  onNodeClick={(_, node) => setSelectedNode(node)}
                  fitView
                >
                    <Controls />
                  </ ReactFlow>
            </main>
            <aside className='aside-sidePanel'>
              {
                selectedNode ? <SettingsPanel selectedNode={selectedNode} onChange={onChange} /> : <NodesPanel />
              }
            </aside>
          </div>
        </div>
      </ReactFlowProvider>
    </div>
  )
}

export default App
