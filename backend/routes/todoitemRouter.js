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
    }
})

router.post("/update/:id", async (req, res) => {
    try {
        const todoitem = await TODOITEM.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!todoitem) {
            return res.status(404).send();
        }
        res.status(200).send(todoitem);
    }
    catch (error) {
        res.status(500).send(error);
    }
})


module.exports = router