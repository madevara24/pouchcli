# Pouch CLI
This is a console application where you can add and see task. Have an offline first functionality using pouchdb.

### Installation
To install clone this repository and run `npm install` to install the dependencies
Go to `store\store.js` and change the config for the DB, the default is for local pouchDB server.
```js
const pouchUrl = "127.0.0.1:5984"; // Your pouchDB URL
const username = "admin"; // Your pouchDB username
const password = "admin"; // Your pouchDB password
const dbName = "tasks"; // Your pouchDB database name
```

You can start the cli by running `node .`

### Functionality
1. **Add Task**. To add task use the `add` command followed by a pipe character, and then your task content, another pipe character, and your tags (support multiple tags seperated by comma) 
```
What do you wanna do?
add|task content|tags,tags,tags
```

2. **Show Tasks**. To show the tasks use the `show` command
```
What do you wanna do?
show
```
3. **Finish Tasks**. To finish a task use the `finish` command followed by a pipe character and then your task Id
```
What do you wanna do?
finish|2021-09-11T16:28:42.800Z
```
4. **Syncing with DB**. To sync with your DB use the `sync` command
```
What do you wanna do?
sync
```
