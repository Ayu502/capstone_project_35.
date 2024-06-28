let input;

function reset() {
    d3.selectAll('svg').remove();
    console.log("Reset visualization");
}

function createHashMap() {
    reset();
    let inputText = document.getElementById("array-input");
    if (inputText.value !== '') {
        input = inputText.value.trim().split(/\s+|\,+/g).map((num) => parseInt(num));
        if (input.some(isNaN)) {
            alert("Please enter a valid array of numbers.");
            return;
        }
        console.log("Input array:", input);
        createHashMapVisualization(input);
    } else {
        alert("Please enter an array to visualize.");
    }
}
