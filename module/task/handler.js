const store =  require("../../store/store")

const addTask = async (params) => {
    if (!params[1]||params[1]==="") {
        console.log("Error: Task content cannot be empty!\n");
        return;
    }
    if (!params[2]||params[2]==="") {
        console.log("Error: Task must contain at least one tag!\n");
        return;
    }

    var tags = params.slice(2).map((e) => e.trim()).filter(Boolean);

    var task = {
        _id: new Date().toISOString(),
        created_date: new Date().toISOString(),
        content: params[1].trim(),
        finished: false,
        tags: tags
    };

    var res = await store.addDocs(task);
    
    console.log("Success add task", res);
}

const showTasks = async() => {
    console.log("Please wait while we retrieve the rows\n");
    var rows = await store.showAllDocs();
    if (rows.length == 0) {
        console.log("Database is empty, no rows can be shown\n");
        
    }else{
        console.log("All rows have been retreived\n");
        rows.forEach(e => {
            console.log("Task: ", e.doc.content);
            console.log("ID: ", e.doc._id);
            console.log("Finished: ", e.doc.finished);
            console.log("Created at: ", e.doc.created_date);
            console.log("Tags: ", e.doc.tags.toString());
            console.log("\n");
        });
    }
}

const finishTask = async (params) => {
    var id = params[1];

    var doc = await store.findDocsById(id);
    doc.finished = true;
    var res = await store.addDocs(doc);

    console.log("Success finish", res)
}

const deleteTask = async (params) => {
    var id = params[1];

    var res = await store.deleteDocsById(id)
    console.log("Success delete", res)
}

const syncTask = async () =>{
    var res = await store.syncDocs();
    console.log("Success sync", res);
}

module.exports = {
    addTask, showTasks, finishTask, deleteTask, syncTask
}