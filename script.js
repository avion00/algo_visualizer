// const svg = d3.select("#drawing-area");

// let nodes = [];             
// let edges = [];           
// let addEdgeMode = false;
// let selectedNodes = [];     
// let dist = [];  
  

// //added
// const nodeRadius = 20; // Radius of the node circle
// const minDistance = 2 * nodeRadius + 10; // Minimum distance between nodes (10 is an additional buffer)

// // let history = [];   

// let heuristicMap = {};      
// let clickCount = 0;         


// // creates a new node in a D3.js SVG visualization
// function createNode(x, y) {

//     // saveState();     // Saves the current state of nodes, edges, and other relevant information into a history stack. This allows for undo operations or state restoration.

//     //added
//     // Check if the click is within an existing node or too close to existing nodes
//     if (isTooCloseToExistingNodes(x, y)) return; // Do nothing if click is on an existing node or too close to an existing node

//     const node = { id: clickCount++, x, y };
//     nodes.push(node); 


//     svg.append("circle")
//         .attr("class", "node")
//         .attr("cx", x)
//         .attr("cy", y)
//         //added
//         .attr("r", nodeRadius) // radius
//         //.attr("r", 15) 
//         .attr("fill", "yellow") 
//         .attr("id", `node-${node.id}`)
//         .on("click", (event) => {
//             event.stopPropagation();
//             handleNodeClick(node);
//     });


//     svg.append("text")
//         .attr("x", x)
//         .attr("y", y)
//         .attr("dy", ".35em") 
//         .attr("text-anchor", "middle") 
//         .attr("fill", "black") 
//         .attr("font-size", "12px") 
//         .text(node.id); 

    
//     document.querySelector(".reset-btn").disabled = false;
//     //added
//     document.querySelector(".click-instruction").style.display = "none";
    
// }

// //added
// // Function to check if click is within any existing node
// function isTooCloseToExistingNodes(x, y) {
//     return nodes.some(node => {
//         const dx = x - node.x;
//         const dy = y - node.y;
//         const distance = Math.sqrt(dx * dx + dy * dy);
//         return distance < minDistance; // Check if within minimum distance
//     });
// }


// svg.on("click", function (event) {
//     if (addEdgeMode) return;
//     const [x, y] = d3.pointer(event);
//     createNode(x, y);
// });


// function addEdges() {
//     if (clickCount < 2) {
//         alert("Create at least two nodes to add an edge.");
//         return;
//     }
//     addEdgeMode = true;
//     document.getElementById("add-edge-enable").disabled = true;
//     document.getElementById("submit-btn").disabled = true;
//     initDist();
// }




// function resetDrawingArea() {

    
//     // Save the current state before clearing
//     // saveState(); 

//     nodes = [];
//     edges = [];
//     svg.selectAll("*").remove();
    

//     //added
//     // Reset the node click count to start from 0 again
//     clickCount = 0;

//     // Disable buttons related to visualization and heuristic
//     document.getElementById("visualize-algorithm-btn").disabled = true;

//     document.getElementById("submit-btn").disabled = true;
//     document.querySelector(".reset-btn").disabled = true;

//     // Clear heuristic input field
//     document.getElementById("h-value").value = ""; 

//     // Clear source and destination node fields
//     document.getElementById("source-node").value = "";
//     document.getElementById("destination-node").value = "";

//     // Enable buttons for adding edges and undo
//     document.getElementById("add-edge-enable").disabled = false;
   

//     document.querySelector('.path').textContent = ""; // Clears the path div
    

//     addEdgeMode = false;  // Ensure it's not in edge-adding mode
//     selectedNodes = [];   // Reset any selected nodes

//     initDist();
// }



// document.getElementById("add-edge-enable").addEventListener("click", addEdges);
// // document.getElementById("undo-btn").addEventListener("click", undo);


// function drawEdge(node1, node2, distance) {

//     svg.append("line")
//         .attr("x1", node1.x)
//         .attr("y1", node1.y)
//         .attr("x2", node2.x)
//         .attr("y2", node2.y)
//         .attr("stroke", "black")
//         .attr("stroke-width", 2);

 
//     const midX = (node1.x + node2.x) / 2;
//     const midY = (node1.y + node2.y) / 2;

   
   
//     svg.append("text")
//         .attr("x", midX)
//         .attr("y", midY)
//         .attr("dy", "-0.4em") 
//         .attr("text-anchor", "middle") 
//         .attr("fill", "black") 
//         .attr("font-size", "12px") 
//         .text(distance); 

    
//     edges.push({ source: node1.id, target: node2.id, distance });
//     dist[node1.id][node2.id] = distance; 
//     dist[node2.id][node1.id] = distance; 
// }


// function initDist() {
//     dist = Array.from({ length: clickCount }, () => Array(clickCount).fill(Infinity));
// }



// let sourceNode = null;
// let destinationNode = null;


// function setSourceAndDestination() {
//     const sourceId = parseInt(document.getElementById("source-node").value);
//     const destinationId = parseInt(document.getElementById("destination-node").value);
 
//     if (isNaN(sourceId) || isNaN(destinationId)) {
//         alert("Please enter valid node IDs.");
//         return;
//     }

//     if (sourceId < 0 || sourceId >= nodes.length || destinationId < 0 || destinationId >= nodes.length) {
//         alert("Node IDs must be within the range of created nodes.");
//         return;
//     }

//     sourceNode = nodes.find(node => node.id === sourceId);
//     destinationNode = nodes.find(node => node.id === destinationId);

//     if (!sourceNode || !destinationNode) {
//         alert("Source or Destination node not found.");
//         return;
//     }


//     d3.select(`#node-${sourceNode.id}`).attr("fill", "green"); 
//     d3.select(`#node-${destinationNode.id}`).attr("fill", "red"); 

//     alert(`Source set to Node ${sourceNode.id} and Destination set to Node ${destinationNode.id}.`);
  
//     document.getElementById("visualize-algorithm-btn").disabled = false;
// }

// function handleNodeClick(node) {
   
//     if(!addEdgeMode){
        
//         selectedNodeForHeuristic = node;

//         document.getElementById("h-value").value = heuristicMap[node.id] || "";

//         document.getElementById("submit-btn").disabled = false;
//         // document.getElementById("h-value").value = heuristicMap[node.id] || ""; 

//         document.getElementById("h-value").focus(); // Focus on the heuristic input field
        
//         //added
//         // Validate the input field and enable the Save button if valid
//         validateHeuristicInput();

//         return;

//     }
    
//     d3.select(`#node-${node.id}`).attr("fill", "coral");
//     selectedNodes.push(node);

   
//     if (selectedNodes.length === 2) {
//         const distance = prompt("Enter the distance between nodes:", "1");
//         if (distance !== null && !isNaN(distance) && distance > 0) {
//             drawEdge(selectedNodes[0], selectedNodes[1], parseFloat(distance));
//         } 
//         else {
//                 alert("Please enter a valid positive number for the distance.");
//         }
//         selectedNodes = []; 
//         d3.selectAll(".node").attr("fill", "yellow"); 
    
//     }
//     return;
// }

// // Add event listener for the "Enter" key in the heuristic input field
// document.getElementById("h-value").addEventListener("keydown", function(event) {
//     if (event.key === "Enter") {
//         saveHeuristic();
//     }
// });

// // Validate the heuristic input and enable/disable the Save button
// function validateHeuristicInput() {
//     const heuristicInput = document.getElementById("h-value").value.trim();
//     const saveButton = document.getElementById("submit-btn");

//     if (heuristicInput !== "" && !isNaN(heuristicInput) && parseFloat(heuristicInput) >= 0) {
//         saveButton.disabled = false;  // Enable if valid
//     } else {
//         saveButton.disabled = true;   // Keep disabled if invalid
//     }
// }



// function saveHeuristic() {


//     if (!selectedNodeForHeuristic) {
//        alert("No node selected for heuristic input.");
//        return;
//    }
   
//    const heuristicValue = parseFloat(document.getElementById("h-value").value);
//    if (isNaN(heuristicValue)) {
//        alert("Please enter a valid heuristic value.");
//        return;
//    }
  
//    heuristicMap[selectedNodeForHeuristic.id] = heuristicValue;
   
//    displayHeuristicValue(selectedNodeForHeuristic);

 
//    document.getElementById("h-value").value = "";
//    document.getElementById("submit-btn").disabled = true;
//    selectedNodeForHeuristic = null; 
// }



// function displayHeuristicValue(node) {
   
//     svg.select(`#heuristic-${node.id}`).remove();

    
//     svg.append("text")
//         .attr("id", `heuristic-${node.id}`)
//         .attr("x", node.x)
//         .attr("y", node.y + 35) 
//         .attr("text-anchor", "middle")
//         .attr("fill", "green")
//         .attr("font-size", "12px")
//         .text(`H: ${heuristicMap[node.id]}`);
// }


// function astar(sourceId , destinationId){

//     let openset=[sourceId];
//     let closedset=[];
//     let g={};
//     let f={};
//     let parents={};
//     g[sourceId]=0;
//     parents[sourceId]=sourceId;

//     g[sourceId]=0;
//     parents[sourceId]=sourceId;
//     f[sourceId] = heuristicMap[sourceId] || 0; 


//     function visualizeStep() {
//         if (openset.length === 0) {
//             alert("No path found to the destination node.");
//             return;
//         }
    
//         let currentnode=openset.reduce((a, b) => (f[a] < f[b] ? a : b));

//         if (currentnode === destinationId) {
//             reconstructPath(parents, currentnode);
//             return;
//         }

//         openset = openset.filter(node => node !== currentnode);
//         closedset.push(currentnode);

//         updateVisualization(openset, closedset, currentnode);

    
//         let neighbors = edges.filter(edge => edge.source === currentnode || edge.target === currentnode).map(edge => (edge.source === currentnode ? edge.target : edge.source));
          

//         neighbors.forEach(neighbor => {
            
//             if (closedset.includes(neighbor)) return;

            
//             let tentativeG = g[currentnode] + dist[currentnode][neighbor]; 

            
//             if (!openset.includes(neighbor)) {
//                 openset.push(neighbor);
//             } else if (tentativeG >= g[neighbor]) {
                
//                 return;
//             }
            
//             parents[neighbor] = currentnode;
//             g[neighbor] = tentativeG;
//             f[neighbor] = g[neighbor] + (heuristicMap[neighbor] || 0); 
//         });
//         setTimeout(visualizeStep, 3000); 
    
//     }

//     visualizeStep();
    
// }
    
// function updateVisualization(openset, closedset, currentnode) {
//     // Clear previous visualizations
//     d3.selectAll("circle").attr("fill", "black");
//     d3.selectAll("line").attr("stroke", "gray");

//     // Highlight open set nodes
//     openset.forEach(nodeId => {
//         d3.select(`#node-${nodeId}`).attr("fill", "green");
//     });

//     // Highlight closed set nodes
//     closedset.forEach(nodeId => {
//         d3.select(`#node-${nodeId}`).attr("fill", "red");
//     });

//     // Highlight current node
//     d3.select(`#node-${currentnode}`).attr("fill", "blue");
//    // updatepathDiv(openset, closedset,currentnode);//added

   
// }

// function reconstructPath(parents, currentnode) {
//     let path = [currentnode];
//     while (parents[currentnode] !== currentnode) {
//         currentnode = parents[currentnode];
//         path.push(currentnode);
//     }
//     path.reverse(); 

    
//     // Color the path nodes
//     path.forEach(nodeId => {
//         d3.select(`#node-${nodeId}`).attr("fill", "blue"); // Change color to blue
//     });

//     path.forEach((node, index) => {
//         if (index < path.length - 1) {
//             let nextNode = path[index + 1];

            
//             svg.selectAll("line")
//                 .filter(function () {
//                     let x1 = +d3.select(this).attr("x1"),
//                         y1 = +d3.select(this).attr("y1"),
//                         x2 = +d3.select(this).attr("x2"),
//                         y2 = +d3.select(this).attr("y2");

                    
//                     return (x1 === nodes[node].x && y1 === nodes[node].y && x2 === nodes[nextNode].x && y2 === nodes[nextNode].y) ||
//                         (x1 === nodes[nextNode].x && y1 === nodes[nextNode].y && x2 === nodes[node].x && y2 === nodes[node].y);
//                 })
//                 .attr("stroke", "blue") .attr("stroke-width", 3); 
//         }
//     });

//     document.querySelector('.path').textContent = `Path found: ${path.join(" -> ")}`;
// }


// function enableVisualizeButton() {
//     document.getElementById("visualize-algorithm-btn").disabled = false;
// }

// // function shortestpathfinding() {
   
// //     // Check if heuristics are missing
// //     for (let node of nodes) {
// //        if (heuristicMap[node.id] === undefined) {
// //            alert(`Heuristic value missing for Node ${node.id}. Please set all heuristic values.`);
// //            return;
// //        }
// //    }
// //    astar(sourceNode.id, destinationNode.id);
// //   // document.getElementById("visualize-algorithm-btn").disabled = false; // Just in case

// // }
// function promptMissingHeuristics() {
//    nodes.forEach(node => {
//        if (heuristicMap[node.id] === undefined) {
//            const heuristicValue = prompt(`Enter heuristic value for Node ${node.id}:`);
//            if (!isNaN(heuristicValue)) {
//                heuristicMap[node.id] = parseFloat(heuristicValue);
//            } else {
//                alert("Invalid heuristic value. Please enter a number.");
//            }
//        }
//    });
// }

// function checkHeuristicValues() {
   
//     return nodes.every(node => heuristicMap.hasOwnProperty(node.id));
// }


// document.getElementById("visualize-algorithm-btn").addEventListener("click", function () {
//     if (!sourceNode || !destinationNode) {
//         alert("Please set source and destination nodes first.");
//         return;
//     }
    
//     if (!checkHeuristicValues()) {
//         alert("Please add heuristic values to all nodes.");
//         return;
//     }
//     astar(sourceNode.id, destinationNode.id);
// });





// Select the SVG drawing area
const svg = d3.select("#drawing-area");
let nodes = [];
let edges = [];
let addEdgeMode = false;
let selectedNodes = [];
let dist = [];
let heuristicMap = {};
let clickCount = 0;

//node mathi node overlap nagaros bhanera
const nodeRadius = 20; // Radius of the node circle
const minDistance = 2 * nodeRadius + 10; // Minimum distance between nodes (10 is an additional buffer)

// Function to create a node at (x, y) coordinates
function createNode(x, y) {
    // Check if the click is within an existing node or too close to existing nodes
    if (isTooCloseToExistingNodes(x, y)) return; // Do nothing if click is on an existing node or too close to an existing node
    const node = { id: clickCount++, x, y };
    nodes.push(node);
    svg.append("circle")
    .attr("class", "node")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", 15) // Increased radius for better visibility of text
    .attr("fill", "yellow") 
    .attr("id", `node-${node.id}`)
    .on("click", (event) => {
        event.stopPropagation();
        handleNodeClick(node);
    });

    // Add text to display the node ID or number inside the circle
    svg.append("text")
    .attr("x", x)
    .attr("y", y)
    .attr("dy", ".35em") // Vertical alignment adjustment
    .attr("text-anchor", "middle") // Center the text horizontally
    .attr("fill", "black") // Text color
    .attr("font-size", "12px") // Adjust font size as needed
    .text(node.id); // Display the node ID or any number

    // Enable the reset button
    document.querySelector(".reset-btn").disabled = false;
    //visualization area ma click garda "click-instruction" ko gayab hunxa
    // document.querySelector(".click-instruction").style.display = "none";
    
}


// Function to check if click is within any existing node
function isTooCloseToExistingNodes(x, y) {
    return nodes.some(node => {
        const dx = x - node.x;
        const dy = y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < minDistance; // Check if within minimum distance
    });
}


// Add event listener for clicking on the SVG area
svg.on("click", function (event) {
    if (addEdgeMode) return;
    const [x, y] = d3.pointer(event);
    createNode(x, y);
});


// Function to enable edge creation mode
function addEdges() {
    if (clickCount < 2) {
        alert("Create at least two nodes to add an edge.");
        return;
    }
    addEdgeMode = true;
    document.getElementById("add-edge-enable").disabled = true;
    document.getElementById("submit-btn").disabled = true;//disabled heuristic save during edge creation
    initDist();
}


//reset drawing area
function resetDrawingArea() {
    nodes = [];
    edges = [];
    svg.selectAll("*").remove();

    // Disable buttons related to visualization and heuristic
    // document.getElementById("visualize-algorithm-btn").disabled = true;
    document.getElementById("add-edge-enable").disabled = false;
    document.querySelector(".reset-btn").disabled = true;
    document.getElementById("submit-btn").disabled = true;
    document.getElementById("h-value").value = ""; // Clear heuristic input
    clickCount = 0;
    document.querySelector(".path").textContent = ""; // Clear the path display text
    // Clear source and destination node fields
    document.getElementById("source-node").value = "";
    document.getElementById("destination-node").value = "";
    addEdgeMode = false;  // Ensure it's not in edge-adding mode
    selectedNodes = [];   // Reset any selected nodes

    initDist();
     
    
}


// Function to handle clicking on a node
function handleNodeClick(node) {
   // if (!addEdgeMode) return; // Do nothing if not in edge creation mode
      if(!addEdgeMode){
        // Enable heuristic input and save button
        selectedNodeForHeuristic = node;
        document.getElementById("submit-btn").disabled = false;
        document.getElementById("h-value").value = heuristicMap[node.id] || ""; // Pre-fill with existing value if any
        document.getElementById("h-value").focus();
        return;
      }
    // Highlight the selected node
    d3.select(`#node-${node.id}`).attr("fill", "coral");
    selectedNodes.push(node);

   // If two nodes are selected, prompt for distance and draw an edge
   if (selectedNodes.length === 2) {

   // drawEdge(selectedNodes[0], selectedNodes[1], defaultDistance);
  
    const distance = prompt("Enter the distance between nodes:", "1");
    if (distance !== null && !isNaN(distance) && distance > 0) {
        drawEdge(selectedNodes[0], selectedNodes[1], parseFloat(distance));
    } else {
        alert("Please enter a valid positive number for the distance.");
    } 

    selectedNodes = []; // Reset the selected nodes array
    d3.selectAll(".node").attr("fill", "yellow"); // Reset node colors
    
}
return;
}

// Add event listener for the "Enter" key in the heuristic input field
document.getElementById("h-value").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        saveHeuristic();
    }
});


// Function to draw an edge between two nodes and display distance
function drawEdge(node1, node2, distance) {
    // Draw the edge line
    svg.append("line")
        .attr("x1", node1.x)
        .attr("y1", node1.y)
        .attr("x2", node2.x)
        .attr("y2", node2.y)
        .attr("stroke", "black")
        .attr("stroke-width", 2);
        
    // Calculate the midpoint of the edge
    const midX = (node1.x + node2.x) / 2;
    const midY = (node1.y + node2.y) / 2;

    // Add text to display the distance at the midpoint of the edge
    svg.append("text")
        .attr("x", midX)
        .attr("y", midY)
        .attr("dy", "-0.4em") // Adjust vertical alignment if needed
        .attr("text-anchor", "middle") // Center the text horizontally
        .attr("fill", "black") // Text color
        .attr("font-size", "12px") // Font size
        .text(distance); // Display the distance value

    // Add edge to the edges array and update the distance matrix
    edges.push({ source: node1.id, target: node2.id, distance });
    dist[node1.id][node2.id] = distance; // Update the distance in the matrix
    dist[node2.id][node1.id] = distance; // For undirected graph, mirror the distance
}

// Initialize distance matrix
function initDist() {
    dist = Array.from({ length: clickCount }, () => Array(clickCount).fill(Infinity));

    //aafu dekhi aafai ko distance zero dekhauxa
    for (let i = 0; i < clickCount; i++){
        dist[i][i] = 0;
    }
}


let sourceNode = null;
let destinationNode = null;

// Function to set the source and destination nodes based on user input
function setSourceAndDestination() {
    const sourceId = parseInt(document.getElementById("source-node").value);
    const destinationId = parseInt(document.getElementById("destination-node").value);
    // Validate source and destination IDs
    if (isNaN(sourceId) || isNaN(destinationId)) {
        alert("Please enter valid node IDs.");
        return;
    }
    if (sourceId < 0 || sourceId >= nodes.length || destinationId < 0 || destinationId >= nodes.length) {
        alert("Node IDs must be within the range of created nodes.");
        return;
    }
    // Set source and destination nodes
    sourceNode = nodes.find(node => node.id === sourceId);
    destinationNode = nodes.find(node => node.id === destinationId);

    if (!sourceNode || !destinationNode) {
        alert("Source or Destination node not found.");
        return;
    }

    // Highlight source and destination nodes
    d3.select(`#node-${sourceNode.id}`).attr("fill", "green"); // Source in green
    d3.select(`#node-${destinationNode.id}`).attr("fill", "red"); // Destination in red

    alert(`Source set to Node ${sourceNode.id} and Destination set to Node ${destinationNode.id}.`);
    //enableVisualizeButton();//added
    document.getElementById("visualize-algorithm-btn").disabled = false;

}

//save heuristic function
function saveHeuristic() {

     // Check if a node has been selected for heuristic input
     if (!selectedNodeForHeuristic) {
        alert("No node selected for heuristic input.");
        return;
    }
    
    const heuristicValue = parseFloat(document.getElementById("h-value").value);
    if (isNaN(heuristicValue)) {
        alert("Please enter a valid heuristic value.");
        return;
    }
    // Save heuristic value for the selected node
    heuristicMap[selectedNodeForHeuristic.id] = heuristicValue;
    displayHeuristicValue(selectedNodeForHeuristic);

    // Clear input and disable the save button
    document.getElementById("h-value").value = "";
    document.getElementById("submit-btn").disabled = true;
    selectedNodeForHeuristic = null; // Reset selected node
}

// Function to display heuristic value near the node
function displayHeuristicValue(node) {
    // Remove existing heuristic text if present
    svg.select(`#heuristic-${node.id}`).remove();

    // Display the heuristic value below the node
    svg.append("text")
        .attr("id", `heuristic-${node.id}`)
        .attr("x", node.x)
        .attr("y", node.y + 25) // Position below the node
        .attr("text-anchor", "middle")
        .attr("fill", "green")
        .attr("font-size", "12px")
        .text(`H: ${heuristicMap[node.id]}`);
}

//implementation of A* algorithm
function astar(sourceId , destinationId){

    let openset=[sourceId];
    let closedset=[];
    let g={};
    let f={};
    let parents={};


    //bharkhar add gareko
    //Initialize the g, f, and parents
    nodes.forEach(node => {
        g[node.id] = Infinity;
        f[node.id] = Infinity;
        parents[node.id] = null;
    });
    //ya samma

    g[sourceId]=0;
    parents[sourceId]=sourceId;
    f[sourceId] = heuristicMap[sourceId] || 0; // f = g + h (initial h is heuristic)
     
    function visualizeStep() {
        if (openset.length === 0) {
            alert("No path found to the destination node.");
            return;
        }

   // while(openset.length>0){
        let currentnode=openset.reduce((a, b) => (f[a] < f[b] ? a : b));


        if (currentnode === destinationId) {
            reconstructPath(parents, currentnode);
            return;
        }

        // Remove the current node from openSet and add it to closedSet
        openset = openset.filter(node => node !== currentnode);
        closedset.push(currentnode);
        
        // Update visualization for the current step
        updateVisualization(openset, closedset, currentnode);
         // Get neighbors of the current node
         let neighbors = edges
         .filter(edge => edge.source === currentnode || edge.target === currentnode)
         .map(edge => (edge.source === currentnode ? edge.target : edge.source));
          

         neighbors.forEach(neighbor => {
            // Skip processing if the neighbor is already in closedSet
            if (closedset.includes(neighbor)) return;

            // Calculate tentative g(n): cost from start to this neighbor through currentNode
            let tentativeG = g[currentnode] + dist[currentnode][neighbor]; // dist contains edge weights


            // If the neighbor is not in openSet, add it
            if (!openset.includes(neighbor)) {
                openset.push(neighbor);
            } 
            
            // This path is the best so far, update it
            parents[neighbor] = currentnode;
            g[neighbor] = tentativeG;
            newF = g[neighbor] + (heuristicMap[neighbor] || 0); // f(n) = g(n) + h(n)


            //bharkhar haleko
            //update g and f values for the neighbor if the new f value is lower
            if (newF < ( f[neighbor] || Infinity)) {
                parents [neighbor] = currentnode;
                g[neighbor] = tentativeG;
                f[neighbor] = newF;
            }
            //ya samma
            
            // Reset path color after evaluation
            // setTimeout(() => resetPathColor(currentnode, neighbor), 1000);
            
        });
         // Delay for the next step
         setTimeout(visualizeStep, 5000); // Adjust delay as needed
    }

    visualizeStep();
}

function updateVisualization(openset, closedset, currentnode) {
    // Clear previous visualizations
    d3.selectAll("circle").attr("fill", "pink");
    d3.selectAll("line").attr("stroke", "gray");

    // Highlight open set nodes
    openset.forEach(nodeId => {
        d3.select(`#node-${nodeId}`).attr("fill", "green");
    });

    // Highlight closed set nodes
    closedset.forEach(nodeId => {
        d3.select(`#node-${nodeId}`).attr("fill", "red");
    });

    // Highlight current node
    d3.select(`#node-${currentnode}`).attr("fill", "blue");
   // updatepathDiv(openset, closedset,currentnode);//added

   //bharkhar add gareko
   displayStepInResults(closedset, currentnode);

}
   

// Function to reconstruct and visualize the path
function reconstructPath(parents, currentnode) {
    let path = [currentnode];
    while (parents[currentnode] !== currentnode) {
        currentnode = parents[currentnode];
        path.push(currentnode);
    }
    path.reverse(); // Reverse to get path from source to destination


    // Color the path nodes
    path.forEach(nodeId => {
        d3.select(`#node-${nodeId}`).attr("fill", "blue"); // Change color to blue
    });

    // Visualize the path by highlighting the edges
    path.forEach((node, index) => {
        if (index < path.length - 1) {
            let nextNode = path[index + 1];
            // Highlight the path between nodes by coloring edges
            svg.selectAll("line")
                .filter(function () {
                    let x1 = +d3.select(this).attr("x1"),
                        y1 = +d3.select(this).attr("y1"),
                        x2 = +d3.select(this).attr("x2"),
                        y2 = +d3.select(this).attr("y2");

                    // Check if the line matches the path nodes
                    return (x1 === nodes[node].x && y1 === nodes[node].y && x2 === nodes[nextNode].x && y2 === nodes[nextNode].y) ||
                        (x1 === nodes[nextNode].x && y1 === nodes[nextNode].y && x2 === nodes[node].x && y2 === nodes[node].y);
                })
                .attr("stroke", "blue") // Color the path edges
                .attr("stroke-width", 3); // Increase line thickness
        }
    });


      // Display the path in the div with class 'path'
      document.querySelector('.path').textContent = `Path found: ${path.join(" -> ")}`;
}


// function enableVisualizeButton() {
//     document.getElementById("visualize-algorithm-btn").disabled = false;
// }


function shortestpathfinding() {

     // Check if both source and destination nodes are set
     if (!sourceNode || !destinationNode) {
        alert("Please set both source and destination nodes.");
        return;
    }
   
     // Check if heuristics are missing
     for (let node of nodes) {
        if (heuristicMap[node.id] === undefined) {
            alert(`Heuristic value missing for Node ${node.id}. Please set all heuristic values.`);
            return;
        }
    }

    // If all heuristics are present, run the A* algorithm
    astar(sourceNode.id, destinationNode.id);
   
}

function promptMissingHeuristics() {
    nodes.forEach(node => {
        if (heuristicMap[node.id] === undefined) {
            const heuristicValue = prompt(`Enter heuristic value for Node ${node.id}:`);
            if (!isNaN(heuristicValue)) {
                heuristicMap[node.id] = parseFloat(heuristicValue);
            } else {
                alert("Invalid heuristic value. Please enter a number.");
            }
        }
    });
}


// function checkHeuristicValues() {
//     return nodes.every(node => heuristicMap.hasOwnProperty(node.id));
// }


// document.getElementById("visualize-algorithm-btn").addEventListener("click", function () {
//     if (!sourceNode || !destinationNode) {
//         alert("Please set source and destination nodes first.");
//         return;
//     }
    
//     if (!checkHeuristicValues()) {
//         alert("Please add heuristic values to all nodes.");
//         return;
//     }
//     astar(sourceNode.id, destinationNode.id);
// });



let actualPath = []; // Store the actual direct path taken
let previousNode = null; // Track the previous node for comparison

function displayStepInResults(closedset, currentnode, backtrack = false) {
    const resultDiv = document.querySelector('.path'); // Ensure there's a div with class 'path' in your HTML


    // If backtracking, remove the last node from the path
    if (backtrack) {
        actualPath.pop(); // Backtrack: Remove last node from path
    } else {
        // Check if the current node is connected directly to the previous node
        if (previousNode === null || isDirectConnection(previousNode, currentnode)) {
            actualPath.push(currentnode); // Add current node to the path only if direct connection
        } else {
            // Backtrack: Remove previous node and continue with the current one
            actualPath.pop();
            actualPath.push(currentnode);
        }
    }

    // Set the previous node to the current one for the next iteration
    previousNode = currentnode;

    // Create a string to show the actual path taken
    let pathString = actualPath.join(" -> ");

    // Create a detailed string showing which node is connected to where
    let connections = '';
    actualPath.forEach(node => {
        const directconnection = edges
            .filter(edge => edge.source === node || edge.target === node)
            .map(edge => (edge.source === node ? edge.target : edge.source));

        connections += `Node ${node} is connected to: ${directconnection.join(", ")}<br/>`;
    });

    // Append the results to the results area
    resultDiv.innerHTML += `<p>Current Path: ${pathString}</p><p>${connections}</p><hr/>`;
}

// Helper function to check if two nodes are directly connected
function isDirectConnection(node1, node2) {
    return edges.some(edge => 
        (edge.source === node1 && edge.target === node2) || 
        (edge.source === node2 && edge.target === node1)
    );
}


