var addStore = {"stroke":"black", "strokeWidth":"4px"};
var addGray = {"stroke":"none", "strokeWidth":0,"fill":"blue"};
var addBlue = {"fill": "green","stroke":"none", "strokeWidth":0};
var regFill = "gray"; // Regular fill color for circles and rectangles
var regFillText = "black"; // Regular fill color for text

let treeContainer; // SVG container for the tree
let arrayContainer; // SVG container for the array (not used in this snippet)
let start; // Starting position for the root node

const xSpacing = 400; // Horizontal spacing between nodes
const ySpacing = 100; // Vertical spacing between nodes
const radius = 25; // Radius of the nodes

// Node constructor function
function Node(value, index) {
  this.value = value; // Node value
  this.index = index; // Node index
  this.depth = 0; // Depth of the node in the tree
  this.radius = radius; // Node radius
  this.cx =0; // X-coordinate of the node
  this.cy = 0; // Y-coordinate of the node
  this.left = null; // Left child (not used in this snippet)
  this.right = null; // Right child (not used in this snippet)
  this.parent = null;
  this.fill = regFill; // Fill color for the node
  
}




//======================xxxxxxxxxxxxxxxxxxxxxxxxx======================================
function Tree() {
  this.nodes = []; // Array to store node elements
  this.data = []; // Array to store node data
  this.text = []; // Array to store text elements
  this.root = null;

  // Method to add a node to the tree
  this.addNode = function(node) {
    this.data.push(node); // Add node to data array

    // Add text element for the node value
    this.text = treeContainer.selectAll("text.circle")
      .data(this.data)
      .enter()
      .append("text")
      .attr("class", "circle")
      .attr("x", d => d.cx - (d.value.toString().length * 4))
      .attr("y", d => d.cy + 5)
      .text(d => d.value);
    

    // Add circle element for the node
    this.nodes = treeContainer.selectAll("circle")
      .data(this.data)
      .enter()
      .append("circle");
  }

  // Method to create a binary tree from an array
  this.createBinaryTree = function(arr) {
    if (arr.length === 0) return;
    treeContainer = createContainer("binary-tree", arr); // Create SVG container
    start = treeContainer.attr("width") / 2; // Set start position for root node

    let i = 0;
    const queue = [];
    this.root = new Node(arr[i++]);
    this.root.cx = start;
    this.root.cy = radius + 20;
    this.addNode(this.root)
    queue.push(this.root);

    while (i < arr.length) {
      let currentNode = queue.shift();
      let value = arr[i++];

      if (value !== -1) {
        let node = new Node(value);
        node.depth = currentNode.depth + 1;
        node.cx = currentNode.cx - (xSpacing+10) / (node.depth);
        node.cy = currentNode.cy + ySpacing;
        treeContainer.append("line").call(createLineAttr, "black", currentNode.cx, currentNode.cy, node.cx, node.cy);
        currentNode.left = node;
        node.parent = currentNode;
        queue.push(node);
        this.addNode(node); // Add node to the tree
      }

      if (i < arr.length) {
        value = arr[i++];
        if (value !== -1) {
          let node = new Node(value);
          node.depth = currentNode.depth + 1;
          node.cx = currentNode.cx + (xSpacing+10 )/ (node.depth) ;
          node.cy = currentNode.cy + ySpacing;
          currentNode.right = node;
          node.parent = currentNode;
          treeContainer.append("line").call(createLineAttr, "black", currentNode.cx, currentNode.cy, node.cx, node.cy);
          queue.push(node);
          this.addNode(node); // Add node to the tree
        }
      }
    }

    this.nodes = treeContainer.selectAll("circle").raise();
    this.text = treeContainer.selectAll("text.circle").raise();
    this.nodes.call(circleAttr);
  }

  
  this.preOrder = function(node, callback) {
    if (!node) {
      if (callback) callback(); // Invoke callback when reaching leaf nodes
      return;
    }
  
    // Update node with addStore
    this.updateNode(node, addStore);
  
    setTimeout(() => {
      // Update node with addGray after a delay
      this.updateNode(node, addGray);
      
      // Traverse left subtree
      this.preOrder(node.left, () => {
        setTimeout(() => {
          // Update node with addStore after left subtree traversal
          this.updateNode(node, addStore);
          setTimeout(() => {
            // Update node with addBlue after addStore
            this.updateNode(node, addBlue);
            updateArrayElement(idx,node.value);
            idx++;
            // Traverse right subtree
            this.preOrder(node.right, callback);
          }, 3000);
        }, 3000);
      });
    }, 3000);
  };

//=============================POST ORDER=================================>
  this.postOrder = function(node, callback) {
    if (!node) {
        if (callback) callback(); // Invoke callback when reaching leaf nodes
        return;
    }

    this.updateNode(node,addStore);

    // Traverse left subtree
    setTimeout(() => {
      this.updateNode(node,addGray);
      this.postOrder(node.left, () => {
          setTimeout(() => {
              // Traverse right subtree
              this.postOrder(node.right, () => {
                  setTimeout(() => {
                      // Update node with addStore after both subtrees are traversed
                      this.updateNode(node, addStore);
                      setTimeout(() => {
                          // Update node with addGray
                          this.updateNode(node, addGray);
                          setTimeout(() => {
                              // Update node with addBlue and finalize processing
                              this.updateNode(node, addBlue);
                              updateArrayElement(idx, node.value);
                              idx++;
                              if (callback) callback();
                          }, 3000);
                      }, 3000);
                  }, 3000);
              });
          }, 3000);
      });
    }, 3000);
  };

//====================================POST ORDER END=======================================


  
  

  this.updateNode = function(node, newProperties) {
    if (node) {
      Object.assign(node, newProperties); // Update the node with new properties
      this.nodes = treeContainer.selectAll("circle")
        .data(this.data)
        .attr("fill", d => d.fill) // Update fill color or any other properties
        .attr("cx", d => d.cx)
        .attr("cy", d => d.cy)
        .attr("r", d => d.radius)
        .attr("stroke",d=>d.stroke)
        .attr("stroke-width", d=>d.strokeWidth);
    }
  }
  
  // Method to get the size of the tree
  this.size = function() {
    return d3.selectAll("circle").nodes().length;
  }

}

function CreateArray(arr, x, y, width, height) {
  var arrayData = arr.map((value, i) => {
    if (i > 0) {
      x += 50;
    }
    return {
      x: x,
      y: y,
      width: width,
      height: height,
      color: regFill,
      value: value
    };
  });

  var elementsArr = arrayContainer.selectAll("rect")
    .data(arrayData)
    .enter()
    .append("rect")
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .attr("width", d => d.width)
    .attr("height", d => d.height)
    .attr("fill", d => d.color)
    .attr("stroke", "black");

  d3.select("#array-visual").attr("align", "center");

  arrayContainer.selectAll("text.rect")
    .data(arrayData)
    .enter()
    .append("text")
    .attr("class", "rect")
    .attr("x", d => d.x + (d.width / 2) - (d.value.toString().length * 4))
    .attr("y", d => d.y + 30)
    .call(textAttr, regFillText, "sans-serif", "1em")
    .text(); // Display initial values

  arrayContainer.selectAll("text.index")
    .data(arrayData)
    .enter()
    .append("text")
    .attr("class", "index")
    .attr("x", d => d.x + 15)
    .attr("y", d => d.y - 15)
    .text((d, i) => `[ ${i} ]`);

  // Function to update array element at specified index
  function updateArrayElement(index, newText) {
    if (index >= 0 && index < arr.length) {
      arr[index] = newText; // Update the array element

      // Select the corresponding text element and update its text content
      arrayContainer.selectAll("rect")
        .filter((d,i)=> i===index)
        .attr("fill","green");

      arrayContainer.selectAll("text.rect")
        .filter((d, i) => i === index)
        .text(newText);
    }
  }

  return updateArrayElement;
}





// Function to set attributes for circle elements
function circleAttr(selection) {
  selection
    .attr("cx", function(c) { return c.cx; })
    .attr("cy", function(c) { return c.cy; })
    .attr("r", function(c) { return c.radius; })
    .attr("fill", function(c) { return c.fill; });
}

// Function to set attributes for text elements
function textAttr(selection, fill, fontFamily, fontSize) {
  selection
    .attr("fill", fill)
    .attr("font-family", fontFamily)
    .attr("font-size", fontSize);
}

// Function to set attributes for line elements and animate them
function createLineAttr(selection, stroke, x1, y1, x2, y2) {
  selection
    .style("stroke", stroke)
    .attr("x1", x1)
    .attr("y1", 0)
    .attr("x2", x2)
    .attr("y2", 0)
    .transition()
    .duration(100)
    .attr("y1", y1)
    .attr("y2", y2);
}

// Function to calculate dimensions for the tree container
function calcDimensions(arr) {
  let depth = Math.ceil(Math.log2((arr.length - 1) + 2)) - 1;
  return { width: Math.pow(2, depth), height: ySpacing + ySpacing * depth, depth: depth };
}

// Function to create SVG container
function createContainer(id, arr, width, height) {
  let box = calcDimensions(arr); // Calculate dimensions based on array length

  let depth = Math.ceil(Math.log2((arr.length - 1) + 2)) - 1 || 1;

  let container = d3.select(`div#${id}`)
    .append('svg')
    .attr('width', width || box.width * 600 * (.8 / depth) * 1.5)
    .attr('height', height || (box.height+200));

  return container;
}

// Function to calculate parent index of a node
function parent(i) {
  return Math.floor((i - 1) / 2);
}

// Function to calculate left child index of a node
function leftChild(i) {
  return 2 * i + 1;
}

// Function to calculate right child index of a node
function rightChild(i) {
  return 2 * i + 2;
}