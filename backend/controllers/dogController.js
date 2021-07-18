const express = require('express');
const {validateDog} = require('../validator/dogValidator')
const { getDog, getDogById, getDogs, createDog, deleteDog, updateDog } = require('../services/dogService');
const app = express();
app.use(express.json());

/*
* All dog controller methods that call the dog service methods.
*/

const get = async function (req, res) {
    try {
        // get the page num and page size
        const {page, limit} = getPageAndSize(req);
        // get dog list call to mongo
        const docs = await getDogs(page, limit);
        // return an object with necessary
        res.status(200).send({
            listings: docs.data,
            currentPage: docs.currentPage,
            pages: docs.pages
        });
    }
    catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
};

const getById = async function (req, res) {
    try {
        // get by id call to mongo
        let data = await getDogById(req.params.id);
        if (data.length === 0) {
            return res.status(404).send({code:404, message: "Dog record not found."});
        }
        res.status(200).send({data: data});
    }
    catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
};

const searchDog = async function (req, res) {
    try {
        // search call to mongo
        let data = await getDog(req.params.id);
        if (data.length === 0) {
            return res.status(404).send({code:404, message: "Dog record not found!!!"});
        }
        res.status(200).send({data: data});
    }
    catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
};

const post = async function (req, res) {
    try {
        // validate the dog object
        const { error } = validateDog(req.body);
        if (error) {
            return res.status(400).send(error.details);
        }
        // create call to mongo
        const created = await createDog(req.body);
        res.status(201).send(created.ops[0]);
    }
    catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
};

const dogDelete = async function (req, res) {
    try {
        // check to see if re exists
        const data = await getDogById(req.params.id);
        if (data.length === 0) {
            return res.status(404).send({ status: 404, message: 'Data does not exist.' });
        }
        // delete call to mongo
        await deleteDog(req.params.id);
        res.status(200).send({
            status: 200,
            message: `Dog id: ${data[0]._id}, Name: ${data[0].name} deleted successfully!`});
    }
    catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
};

const dogUpdate = async (req, res) => {
    try {
        // check to see if record exists
        const data = await getDogById(req.params.id);
        if (data.length === 0) {
            return res.status(404).send({ status: 404, message: 'Data does not exist.' });
        }
        // validate the dog object
        const { error } = validateDog(req.body);
        if (error) {
            return res.status(400).send(error.details);
        }
        // update mongo
        const updatedDog = await updateDog(req.params.id, req.body);
        res.status(200).send(updatedDog.value);
    }
    catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
}

module.exports = {
    get,
    getById,
    post,
    dogUpdate,
    dogDelete,
    searchDog
}

function getPageAndSize(req) {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.size);
    return {page, limit}
}
