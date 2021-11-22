const router = require("express").Router();
const TODOITEM = require("../models/todoitemModel");


router.get("/getAll", async (req, res) => {
    try {
        const todoitems = await TODOITEM.find({});
        res.status(200).send(todoitems);
    }
    catch (error) {
        res.status(500).send(error);
    }
})

router.post("/delete/:id", async (req, res) => {
    try {
        const todoitems = await TODOITEM.findByIdAndDelete(req.params.id);
        if(!todoitems) {
            return res.status(404).send();
        }
        res.send(todoitems);
    }
    catch (error) {
        res.status(500).send(error);
    }
})

router.post("/add", async (req, res) => {
    const todoitem = new TODOITEM(req.body);
    try {
        await todoitem.save();
        res.status(200).send(todoitem);
    }
    catch (error) {
        res.status(500).send(error);
        res.json(req.body);
    }
})

module.exports = router