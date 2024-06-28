let queue = [];

function enqueue() {
    const valueInput = document.getElementById('value-input');
    const value = valueInput.value;
    if (value !== '') {
        queue.push(value);
        valueInput.value = '';
        renderQueue('enqueue');
    } else {
        alert('Please enter a value.');
    }
}

function dequeue() {
    if (queue.length > 0) {
        renderQueue('dequeue');
        setTimeout(() => {
            queue.shift();
            renderQueue();
        }, 300); // Delay to allow animation to complete
    } else {
        alert('Queue is empty.');
    }
}

function renderQueue(action) {
    const queueContainer = document.getElementById('queue');
    queueContainer.innerHTML = '';

    queue.forEach((element, index) => {
        const queueElement = document.createElement('div');
        queueElement.className = 'queue-element';
        queueElement.textContent = element;

        if (action === 'enqueue' && index === queue.length - 1) {
            queueElement.classList.add('queue-element-enter');
        } else if (action === 'dequeue' && index === 0) {
            queueElement.classList.add('queue-element-exit');
        } else {
            queueElement.style.opacity = '1';
        }

        queueContainer.appendChild(queueElement);
    });

    // Update the queue size display
    const queueSizeDisplay = document.getElementById('queue-size');
    queueSizeDisplay.textContent = `Queue Size: ${queue.length}`;
}
