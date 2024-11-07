class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    insertAtHead(value) {
        const newNode = new Node(value);
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.size++;
        this.visualize();
    }

    insertAtTail(value) {
        const newNode = new Node(value);
        if (this.tail === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++;
        this.visualize();
    }

    insertAtIndex(value, index) {
        if (index < 0 || index > this.size) {
            alert("Invalid index!");
            return;
        }
        if (index === 0) {
            this.insertAtHead(value);
            return;
        }
        if (index === this.size) {
            this.insertAtTail(value);
            return;
        }

        const newNode = new Node(value);
        let current = this.head;
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }
        // Insert between current and current.next
        newNode.next = current.next;
        newNode.prev = current;
        current.next.prev = newNode;
        current.next = newNode;

        this.size++;
        this.visualize();
    }

    removeFromHead() {
        if (!this.head) return null;

        const removedNode = this.head;
        this.head = this.head.next;
        if (this.head) {
            this.head.prev = null;
        } else {
            this.tail = null;
        }
        this.size--;
        this.visualize();
        return removedNode.value;
    }

    removeFromTail() {
        if (!this.tail) return null;

        const removedNode = this.tail;
        this.tail = this.tail.prev;
        if (this.tail) {
            this.tail.next = null;
        } else {
            this.head = null;
        }
        this.size--;
        this.visualize();
        return removedNode.value;
    }

    removeFromIndex(index) {
        if (index < 0 || index >= this.size) {
            alert("Invalid index!");
            return;
        }
        if (index === 0) {
            return this.removeFromHead();
        }
        if (index === this.size - 1) {
            return this.removeFromTail();
        }

        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        current.prev.next = current.next;
        current.next.prev = current.prev;
        this.size--;
        this.visualize();
        return current.value;
    }

    visualize() {
        const container = document.getElementById("list-container");
        container.innerHTML = ""; // Clear existing visualization

        let currentNode = this.head;

        while (currentNode) {
            // Create node element
            const nodeElement = document.createElement("div");
            nodeElement.className = "node p-2 bg-blue-300 text-center rounded-md";
            nodeElement.innerText = currentNode.value;

            // Append node to container
            container.appendChild(nodeElement);

            // Create forward arrow if there's a next node
            if (currentNode.next) {
                const arrowElement = document.createElement("div");
                arrowElement.className = "arrow px-1 text-blue-600 font-bold";
                arrowElement.innerText = "→";
                container.appendChild(arrowElement);
            }

            // Move to the next node in the list
            currentNode = currentNode.next;
        }
    }
}

// Initialize the list
const list = new LinkedList();

function insertNode() {
    const value = document.getElementById("nodeValue").value;
    const position = document.getElementById("insertPosition").value;
    const index = document.getElementById("indexValue").value;

    if (value === "") {
        alert("Please enter a value.");
        return;
    }

    if (position === "start") {
        list.insertAtHead(value);
    } else if (position === "end") {
        list.insertAtTail(value);
    } else if (position === "index") {
        if (index === "") {
            alert("Please enter an index.");
            return;
        }
        list.insertAtIndex(value, parseInt(index));
    }

    document.getElementById("nodeValue").value = ""; // Clear input
    document.getElementById("indexValue").value = ""; // Clear index input
}

function deleteNode() {
    const position = document.getElementById("deletePosition").value;
    const index = document.getElementById("deleteIndex").value;

    if (position === "start") {
        list.removeFromHead();
    } else if (position === "end") {
        list.removeFromTail();
    } else if (position === "index") {
        if (index === "") {
            alert("Please enter an index.");
            return;
        }
        list.removeFromIndex(parseInt(index));
    }
}
