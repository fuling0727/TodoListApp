const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors());

const DATA_FILE = "todos.json";

function loadTodos() {
    try {
        const data = fs.readFileSync(DATA_FILE, "utf8");
        return JSON.parse(data);
    } catch (error) {
        return [];  // Return an empty array if the file doesn't exist
    }
}

function saveTodos(todos) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
}


let todos = loadTodos();

app.get("/", (req, res) => {
    res.send("Server is running!");
});


// Get all tasks
app.get("/todos", (req, res) => {
    res.json(todos);
});

// Add a new task
app.post("/todos", (req, res) => {
    const { text } = req.body;
    const newTodo = { id: Date.now(), text };
    todos.push(newTodo);
    saveTodos(todos);
    res.json(newTodo);
});

// Delete a task
app.delete("/todos/:id", (req, res) => {
    const { id } = req.params;
    todos = todos.filter(todo => todo.id != id);
    saveTodos(todos);  
    res.json({ message: "Deleted" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
