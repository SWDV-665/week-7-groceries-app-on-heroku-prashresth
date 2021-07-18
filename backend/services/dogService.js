const {getDb} = require('./mongo/mongoService')
const ObjectID = require('mongodb').ObjectID;

/*
* All dog service methods that call mongo db to retrieve data.
*/

async function getDogs(page_num, page_size) {
    const clientAndDb = await getDb('final');
    try {
        // Calculate number of documents to skip
        let skips = page_size * (page_num - 1)
        const collection = clientAndDb.db.collection('dogs');
        const count = await collection.countDocuments();
        const data = await collection.find({}).skip(skips).limit(page_size).toArray();
        return {data: data, currentPage: page_num, pages: Math.ceil(count / page_size)};
    } catch (e) {
        console.log(e);
        return e;
    }
    finally {
        // close conn
        await clientAndDb.client.close();
    }
}

async function getDogById(id) {
    const clientAndDb = await getDb("final");
    try {
        const collection = clientAndDb.db.collection('dogs');
        // mongo requires an ObjectID (see line 2 above)
        return await collection.find({"_id": ObjectID(id)}).toArray(); // this is for mongo created ids
    } catch (e) {
        console.log(e);
        throw e;
    }
    finally {
        // close conn
        await clientAndDb.client.close();
    }
}

async function getDog(name) {
    const clientAndDb = await getDb("final");
    try {
        const collection = clientAndDb.db.collection('dogs');
        // use regex for case insensitivity
        let regex = new RegExp(["^", name, "$"].join(""), "i");
        return await collection.find({"name": regex}).toArray();
    } catch (e) {
        console.log(e);
        throw e;
    }
    finally {
        // close conn
        await clientAndDb.client.close();
    }
}

async function createDog(dog) {
    const clientAndDb = await getDb("final");
    try {
        const collection = clientAndDb.db.collection('dogs');
        // inset call to mongo collection
        return await collection.insertOne(dog);
    } catch (e) {
        console.log(e);
        throw e;
    }
    finally {
        // close conn
        await clientAndDb.client.close();
    }
}

async function updateDog(id, dog) {
    const clientAndDb = await getDb("final");
    try {
        const collection = clientAndDb.db.collection('dogs');
        // updating the whole document.
        return await collection.findOneAndReplace(
            {"_id": ObjectID(id)},
            dog,
            {returnOriginal: false});
    } catch (e) {
        console.log(e);
        throw e;
    }
    finally {
        // close conn
        await clientAndDb.client.close();
    }
}

async function deleteDog(id) {
    const clientAndDb = await getDb("final");
    try {
        const collection = clientAndDb.db.collection('dogs');
        // delete record by id
        return await collection.deleteOne({"_id": ObjectID(id)});
    } catch (e) {
        console.log(e);
        throw e;
    }
    finally {
        // close conn
        await clientAndDb.client.close();
    }
}

module.exports = {
    getDog,
    getDogById,
    getDogs,
    createDog,
    updateDog,
    deleteDog
};