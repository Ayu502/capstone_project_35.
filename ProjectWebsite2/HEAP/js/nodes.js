var addStore = {"stroke":"black", "strokeWidth":"4px"};
var addGray = {"stroke":"none", "strokeWidth":0,"fill":"blue"};
var addBlue = {"fill": "green","stroke":"none", "strokeWidth":0};
var regFill = "gray"; 
var regFillText = "black"; 

let treeContainer; 
let arrayContainer; 
let hashMapContainer; 
let start; 

const xSpacing = 400; 
const ySpacing = 100; 
const radius = 25; 

function Node(value, index) {
  this.value = value; 
  this.index = index; 
  this.depth = 0; 
  this.radius = radius; 
  this.cx =0; 
  this.cy = 0; 
  this.left = null; 
  this.right = null; 
  this.parent = null;
  this.fill = regFill; 
}

function Tree() {
  this.nodes = []; 
  this.data = []; 
  this.text = []; 
  this.root = null;

  this.addNode = function(node) {
    this.data.push(node); 
    this.text = treeContainer.selectAll("text.circle")
      .data(this.data)
      .enter()
      .append("text")
      .attr("class", "circle")
      .attr("x", d => d.cx - (d.value.toString().length * 4))
      .attr("y", d => d.cy + 5)
      .text(d => d.value);
    this.nodes = treeContainer.selectAll("circle")
      .data(this.data)
      .enter()
      .append("circle");
  }

  this.createBinaryTree = function(arr) {
    if (arr.length === 0) return;
    treeContainer = createContainer("heap-visual", arr); 
    start = treeContainer.attr("width") / 2; 

    let i = 0;
    const queue = [];
    this.root = new Node(arr[i++]);
    this.root.cx = start;
    this.root.cy = radius;
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
        this.addNode(node); 
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
          this.addNode(node); 
        }
      }
    }

    this.nodes = treeContainer.selectAll("circle").raise();
    this.text = treeContainer.selectAll("text.circle").raise();
    this.nodes.call(circleAttr);
  }

  this.updateNode = function(node, newProperties) {
    if (node) {
      Object.assign(node, newProperties); 
      this.nodes = treeContainer.selectAll("circle")
        .data(this.data)
        .attr("fill", d => d.fill) 
        .attr("cx", d => d.cx)
        .attr("cy", d => d.cy)
        .attr("r", d => d.radius)
        .attr("stroke",d=>d.stroke)
        .attr("stroke-width", d=>d.strokeWidth);
    }
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
    .text(d => d.value); 

  arrayContainer.selectAll("text.index")
    .data(arrayData)
    .enter()
    .append("text")
    .attr("class", "index")
    .attr("x", d => d.x + 15)
    .attr("y", d => d.y - 15)
    .text((d, i) => `[ ${i} ]`);

  function updateArrayElement(index, newText) {
    if (index >= 0 && index < arr.length) {
      arr[index] = newText; 

      arrayContainer.selectAll("text.rect")
        .filter((d, i) => i === index)
        .text(newText);

      arrayContainer.selectAll('rect')
        .filter((d,i)=> i===index)
        .attr('fill','green');
    }
  }

  return updateArrayElement;
}

function circleAttr(selection) {
  selection
    .attr("cx", function(c) { return c.cx; })
    .attr("cy", function(c) { return c.cy; })
    .attr("r", function(c) { return c.radius; })
    .attr("fill", function(c) { return c.fill; });
}

function textAttr(selection, fill, fontFamily, fontSize) {
  selection
    .attr("fill", fill)
    .attr("font-family", fontFamily)
    .attr("font-size", fontSize);
}

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

function calcDimensions(arr) {
  let depth = Math.ceil(Math.log2((arr.length - 1) + 2)) - 1;
  return { width: Math.pow(2, depth), height: ySpacing + ySpacing * depth, depth: depth };
}

function createContainer(id, arr, width, height) {
  let box = calcDimensions(arr); 
  let depth = Math.ceil(Math.log2((arr.length - 1) + 2)) - 1 || 1;
  let container = d3.select(`div#${id}`)
    .append('svg')
    .attr('width', width || box.width * 600 * (.8 / depth) * 1.5)
    .attr('height', height || box.height);
  return container;
}
