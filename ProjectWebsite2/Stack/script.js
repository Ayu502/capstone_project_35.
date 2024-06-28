// script.js
let stack = [];

function push() {
    const valueInput = document.getElementById('value-input');
    const value = valueInput.value;
    if (value !== '') {
        stack.push(value);
        valueInput.value = '';
        renderStack();
    } else {
        alert('Please enter a value.');
    }
}

function pop() {
    if (stack.length > 0) {
        stack.pop();
        renderStack();
    } else {
        alert('Stack is empty.');
    }
}

function renderStack() {
    const stackContainer = document.getElementById('stack');
    stackContainer.innerHTML = '<div id="top">TOP</div>';
    
    for (let i = stack.length - 1; i >= 0; i--) {
        const stackElement = document.createElement('div');
        stackElement.className = 'stack-element';
        stackElement.textContent = stack[i];
        stackContainer.appendChild(stackElement);
    }
}
