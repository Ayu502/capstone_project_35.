let input;
let tree;
let heap;

function reset() {
  d3.selectAll('svg').remove();
}

function createHeap() {
  reset();
  let inputText = document.getElementById("array-input");
  if (inputText.value !== '') {
      input = inputText.value.trim().split(/\s+|\,+/g).map((num) => parseInt(num));
      createHeapVisualization();
  }
}

function createHeapVisualization() {
  tree = new Tree();
  tree.createBinaryTree(input);
}

function heapify() {
  if (input && input.length > 0) {
    for (let i = Math.floor(input.length / 2) - 1; i >= 0; i--) {
      heapifyNode(input, input.length, i);
    }
    reset();
    createHeapVisualization();
  }
}

function heapifyNode(arr, n, i) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;

  if (largest != i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapifyNode(arr, n, largest);
  }
}

function heapSort() {
  if (input && input.length > 0) {
    let n = input.length;
    heapify();
    for (let i = n - 1; i >= 0; i--) {
      [input[0], input[i]] = [input[i], input[0]];
      heapifyNode(input, i, 0);
    }
    reset();
    createHeapVisualization();
  }
}

