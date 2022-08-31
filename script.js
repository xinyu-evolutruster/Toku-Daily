var input = prompt("What would you like to do?");

const todos = ["collect chicken eggs", "clean litter box"];
while (input !== "quit" && input !== "Q") {
    console.log(`input is ${input}`);
    if (input === "list") {
        console.log("***************");
        for (var i = 0; i < todos.length; i++) {
            console.log(`${i}: ${todos[i]}`);
        }
        console.log("***************");
    }
    else if (input === "new") {
        const newTodo = prompt("OK, what is the new todo?");
        todos.push(newTodo);
        console.log(`${newTodo} is added to the list`);
    }
    else if (input === "delete") {
        const index = parseInt(prompt("Ok, enter an index to delete"));
        if (!Number.isNaN(index)) {
            todos.splice(index, 1);
            console.log(`todo ${index} is deleted`);
        }
        else {
            console.log("unknown index");
        }
    }
    input = prompt("what would you like to do?")
}

console.log("OK QUIT THE APP");