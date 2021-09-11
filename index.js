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
                await handler.addTask(inputs);
                break;
            case "show":
                await handler.showTasks();
                break;
            case "finish":
                await handler.finishTask(inputs);
                break;
            case "delete":
                await handler.deleteTask(inputs);
                break;
            case "sync":
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

