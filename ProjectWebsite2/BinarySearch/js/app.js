let input;
let marks;
let key;

function reset() {
  d3.selectAll('svg').remove();
}

function resetMark() {
  d3.select('#mark-visual').selectAll('*').remove();
}

function array() {
  reset();
  let inputText = document.getElementById("array-input")
  
  if (inputText.value !== '') {
      input = inputText.value.trim().split(/\s+|\,+/g).map((num) => parseInt(num));
      input.sort((a,b)=>a-b);
      marks = input.map((val,i)=>{
        if(i==0) return "si";
        else if(i=== Math.floor(input.length/2)) return "mid";
        else if(i=== input.length-1) return "ei";
        else return "";
      });
      
      createArr();
  }
}

var updateArrayElement;
var updateMarkElement;
let idx = 0;


function createArr() {
  arrayContainer = createContainer("array-visual", input, input.length * 60, 100);
  markContainer = createContainer("mark-visual",input, input.length * 60 , 100);
  // arrayContainer = createContainer("mark", input, input.length * 60, 100);
  updateArrayElement = CreateArray(arrayContainer,input, input.length * 30 - (input.length/2)*50, 0, 50, 50);
  updateMarkElement = CreateMarkArray(marks,input.length * 30 - (input.length/2)*50,100,50,50);
}


// Example usage to update index 2 with new text

function startTraversal(){
  array();
  let keyInput = document.getElementById("key-inputfeild");
  key = parseInt(keyInput.value);
  binarySearch(input,0,input.length-1,key);

}



//default values
input = [10, 20, 60, 30, 70, 40, 50];
marks = input.map((val,i)=>{
  if(i===0) return "si";
  else if(i=== Math.floor(input.length/2)) return "mid";
  else if(i=== input.length-1) return "ei";
  else return "";
});
key = input[0];
let inputTest = document.getElementById("array-input");
inputTest.value = input;

let keyTest = document.getElementById("key-inputfeild");
keyTest.value = input[0];
