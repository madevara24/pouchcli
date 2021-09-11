const PouchDB = require('pouchdb');
const pouchUrl = "127.0.0.1:5984";
const username = "admin";
const password = "admin";
const dbName = "tasks";
const remoteCouch = 'http://' + username + ':' + password + '@' + pouchUrl + '//' + dbName;

const open = () => {
    const db = new PouchDB(dbName);

    return db;
}

const close = (db) => {
    return db.close();
}

const findDocs = async (params, limit=4175) => {
  const db = open();
  try {
    const res = await db.find({
      ...params,
      limit,
    });
    return res.docs;
  } catch (err) {
    throw err;
  } finally {
    await db.close();
  }
}

const addDocs = async(params) => {
    const db = open();
    try {
        var result = await db.put(params);
        return result;
    } catch (err) {
        console.log("Error: ", err);
        throw err;
    } finally {
        await db.close();
    }
}

const showAllDocs = async() => {
    const db = open();
    try {
        var results = await db.allDocs({include_docs: true, descending: true})
        return results.rows;
    } catch (err) {
        console.log("Error: ", err);
        throw err;
    } finally {
        await db.close();
    }
}

const findDocsById = async(id) => {
    const db = open();
    try {
        var results =  await db.get(id);
        return results;
    } catch (err) {
        console.log("Error: ", err);
        throw err;
    } finally {
        await db.close();
    }
}

const deleteDocsById = async(id) => {
    const db = open();
    try {
        var doc = await db.get(id);
        var result = await db.remove(doc);
        return result;
    } catch (err) {
        console.log("Error: ", err);
        throw err;
    } finally {
        await db.close();
    }
}

const syncDocs = async() =>{
    const db = open();
    try {
        var opts = {live: false};
        var to = await db.replicate.to(remoteCouch, opts);
        var from = await db.replicate.from(remoteCouch, opts);
        return [to, from];
    } catch (err) {
        console.log("Error: ", err);
        throw err;
    } finally {
        await db.close();
    }
}

module.exports = {
  open,
  close,
  findDocs,
  addDocs,
  showAllDocs,
  findDocsById,
  deleteDocsById,
  syncDocs
};