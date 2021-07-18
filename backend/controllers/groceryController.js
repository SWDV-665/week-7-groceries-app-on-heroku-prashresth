const express = require('express');
const { getAll, getById, createItem, updateItem, deleteItem } = require('../services/groceryService');
const {validateGroceryItem} = require('../validator/groceryItemValidator');
const app = express();
app.use(express.json());

const get = async function (req, res) {
    try {
        const docs = await getAll();
        // return an object with necessary
        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).send({
            data: docs.data
        });
    }
    catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
};

const getItemById = async function (req, res) {
    try {
        // get by id call to mongo
        let data = await getById(req.params.id);
        if (data.length === 0) {
            return res.status(404).send({code:404, message: "Dog record not found."});
        }
        res.status(200).send({data: data});
    }
    catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
};

const post = async function (req, res) {
    try {
        const { error } = validateGroceryItem(req.body);
        if (error) {
            return res.status(400).send(error.details);
        }
        // create call to mongo
        console.log(req.body)
        const created = await createItem(req.body);
        res.status(201).send(created.ops[0]);
    }
    catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
};

const itemDelete = async function (req, res) {
    try {
        // check to see if re exists
        const data = await getById(req.params.id);
        if (data.length === 0) {
            return res.status(404).send({ status: 404, message: 'Data does not exist.' });
        }
        // delete call to mongo
        await deleteItem(req.params.id);
        res.status(200).send({
            status: 200,
            message: `Item: ${data[0].name} deleted successfully!`});
    }
    catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
};

const itemUpdate = async (req, res) => {
    try {
        // check to see if record exists
        const data = await getById(req.params.id);
        if (data.length === 0) {
            return res.status(404).send({ status: 404, message: 'Data does not exist.' });
        }
        const { error } = validateGroceryItem(req.body);
        if (error) {
            return res.status(400).send(error.details);
        }
        // update mongo
        const updatedItem = await updateItem(req.params.id, req.body);
        res.status(200).send(updatedItem.value);
    }
    catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
}

module.exports = {
    get,
    getItemById,
    post,
    itemDelete,
    itemUpdate
}
