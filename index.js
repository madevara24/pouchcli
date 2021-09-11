#!/usr/bin/env node
const readline = require('readline');;
const handler = require('./module/task/handler');

(() => {
    'use strict';

    console.log("Ethereal");
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    receiveCommand(rl);
    
})();

function receiveCommand(rl) {
    rl.question("What do you wanna do?\n", async (args) => {
        var inputs = args.split("|");
        switch (inputs[0].toLowerCase()) {
            case "add":
                console.log("add task");
                await handler.addTask(inputs);
                break;
            case "show":
                console.log("show task");
                await handler.showTasks();
                break;
            case "finish":
                console.log("finish task");
                await handler.finishTask(inputs);
                break;
            case "delete":
                console.log("delete task");
                await handler.deleteTask(inputs);
                break;
            case "sync":
                console.log("sync task");
                await handler.syncTask();
                break;
            case "close":
                rl.close();
                break;
            default:
                console.log("Wrong command\n");
                break;
        }

        receiveCommand(rl);
    })

    rl.on("close", () => {
        console.log("\nAdieu!");
        process.exit(0);
    });
}

