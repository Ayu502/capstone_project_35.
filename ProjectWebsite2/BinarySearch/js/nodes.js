var addStore = {"stroke":"black", "strokeWidth":"4px"};
var addGray = {"stroke":"none", "strokeWidth":0,"fill":"blue"};
var addBlue = {"fill": "green","stroke":"none", "strokeWidth":0};
var regFill = "#3232F5"; // Regular fill color for circles and rectangles
var regFillText = "black"; // Regular fill color for text

let treeContainer; // SVG container for the tree
let arrayContainer; // SVG container for the array
let markContainer;
let start; // Starting position for the root node

const xSpacing = 400; // Horizontal spacing between nodes
const ySpacing = 100; // Vertical spacing between nodes
const radius = 25; // Radius of the nodes

function CreateArray(container, arr, x, y, width, height) {
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

  d3.select("#array-visual").attr("align", "center").attr("justify","center");

  
    arrayContainer.selectAll("text.rect")
      .data(arrayData)
      .enter()
      .append("text")
      .attr("class", "rect")
      .attr("x", d => d.x + (d.width / 2) - (d.value.toString().length * 4))
      .attr("y", d => d.y + 30)
      .call(textAttr, regFillText, "sans-serif", "1em")
      .text(d => d.value); // Display initial values
  

    arrayContainer.selectAll("text.index")
      .data(arrayData)
      .enter()
      .append("text")
      .attr("class", "index")
      .text((d, i) => `[ ${i} ]`)
      .attr("x", d => d.x + 15)
      .attr("y", d => d.y + height + 20)
      .call(textAttr, regFillText, "sans-serif", "15px")

  function updateArrayElement(container, index, clr) {
    if (index >= 0 && index < arr.length) {
      container.selectAll('rect')
        .filter((d, i) => i === index)
        .attr('fill', clr);
    }
  }

  return updateArrayElement;
}



function CreateMarkArray(arr, x, y, width, height) {
  var arrayData = arr.map((value, i) => {
    if (i > 0) {
      x += 50;
    }
    return {
      x: x,
      y: y,
      width: width,
      height: height,
      color: "transparent",
      value: value
    };
  });

  var elementsArr = markContainer.selectAll("rect")
    .data(arrayData)
    .enter()
    .append("rect")
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .attr("width", d => d.width)
    .attr("height", d => d.height)
    .attr("fill", d => d.color);

  d3.select("#mark-visaul").attr("align", "center");

  markContainer.selectAll("text.rect")
    .data(arrayData)
    .enter()
    .append("text")
    .attr("class", "rect")
    .attr("x", d => d.x + (d.width / 2) - (d.value.toString().length * 4))
    .attr("y", d => d.y + 30)
    .attr("fill", "black") // Ensure the text color is visible
    .attr("font-family", "sans-serif")
    .attr("font-size", "1em")
    .text(d => d.value); // Display initial values

  function updateMarkElement(container, index, addText) {
    if (index >= 0 && index < arr.length) {
      var rectData = arrayData[index];
      var textSelection = container.selectAll('text')
        .filter((d, i) => i === index);

      if (addText && textSelection.empty()) {
        // Add text if it doesn't already exist
        container.append("text")
          .attr("class", "rect")
          .attr("x", rectData.x + (rectData.width / 2) - (rectData.value.toString().length * 4))
          .attr("y", rectData.y + 30)
          .attr("fill", "black")
          .attr("font-family", "sans-serif")
          .attr("font-size", "1em")
          .text(rectData.value);
      } else if (!addText && !textSelection.empty()) {
        // Remove text if it exists
        textSelection.remove();
      }
    }
  }

  return updateMarkElement;
}



function binarySearch(arr, si, ei, key) {
  if (si > ei) {
    for(let i=0;i<arr.length;i++){
      updateArrayElement(arrayContainer,i,'red');
    }
  };

  let mid = Math.floor((si + ei) / 2);
  marks[si] = "si";
  marks[ei] = "ei";
  marks[mid] = "mid";
  resetMark();
  markContainer = createContainer("mark-visual",input, input.length * 60 , 100);
  var newUpdate = CreateMarkArray(marks, input.length * 30 - (input.length/2)*50 ,100,50,50);

  setTimeout(() => {
    if (arr[mid] === key) {
      updateArrayElement(arrayContainer, mid, 'green');
      for(let i=si;i<=ei;i++){
        if(i!== mid) updateArrayElement(arrayContainer,i,'gray');
      }
      return;
    }
    if (arr[mid] < key) {
      marks[si]="";
      marks[mid]="";
      for(let i=si;i<=mid;i++){
        updateArrayElement(arrayContainer,i,'gray');
      }
      binarySearch(arr, mid + 1, ei, key);
    } 
    
    else {
      marks[ei]="";
      marks[mid] = "";
      for(let i=mid;i<=ei;i++){
        updateArrayElement(arrayContainer,i,'gray');
      }
      binarySearch(arr, si, mid - 1, key);
    }

  }, 3000);

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
    .attr('height', 150);

  return container;
}
