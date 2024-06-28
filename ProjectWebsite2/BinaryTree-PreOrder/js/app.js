let input;
let tree;

function reset() {
  d3.selectAll('svg').remove();
}

function treeAndArray() {
  reset();
  let inputText = document.getElementById("array-input")
  
  if (inputText.value !== '') {
      input = inputText.value.trim().split(/\s+|\,+/g).map((num) => parseInt(num));
      createBinaryTreeAndArr();
  }
}



function createBinaryTreeAndArr() {
  tree = new Tree();
  tree.createBinaryTree(input);
}



// Example usage to update index 2 with new text
var updateArrayElement;
let idx = 0;

function startTraversal(){
  tree = null;
  treeAndArray();
  idx = 0;
  arrayContainer = createContainer("array-visual", input, input.length * 60, 100);
  updateArrayElement = CreateArray(input, 2, 30, 50, 50);

  tree.preOrder(tree.root, () => {
    console.log("All operations completed");
    // Any code to run after all operations are completed
  });


}



//default values
input = [10, 20, 60, 30, 70, 40, 50];
let inputTest = document.getElementById("array-input");
inputTest.value = input;
createBinaryTreeAndArr(input);