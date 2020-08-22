const io = require('../utils/socket');
const Item = require("../models/itemsModel");

exports.fetchItems = async (req, res) => {
  try {
    let queryConds;
    const curDate = new Date();
    if(req.userInfo.role === 'admin')
      queryConds = {dateTime : {$gt: curDate}};
    else
      queryConds = {dateTime : {$gt: curDate},userId : req.userInfo._id};

    const items = await Item.find(queryConds,{created_date:false}).populate('userId',{email:true}).sort({ dateTime: 1 });
    if (!items || (items && items.length == 0)) throw Error("No items");

    res.status(200).json(items);
  } catch (e) {
    res.status(400).json({ errorMsg: e.message });
  }
};
exports.fetchItemById = async (req, res) => {
  try {
    const item = await Item.findOne({_id : req.params.id,userId : req.userInfo._id},{created_date:false});
    if (!item) throw Error("No item");

    res.status(200).json(item);
  } catch (e) {
    res.status(400).json({ errorMsg: e.message });
  }
};

exports.createItem = async (req, res) => {

  if (!req.body.title) {
    res.status(400).send({ errorMsg: "Title can not be empty!" });
    return;
  }
  if (!req.body.description) {
    res.status(400).send({ errorMsg: "Description can not be empty!" });
    return;
  }
  if (!req.body.dateTime) {
    res.status(400).send({ errorMsg: "DateTime can not be empty!" });
    return;
  }
  const newItem = new Item({
    title: req.body.title,
    description: req.body.description,
    dateTime: req.body.dateTime,
    userId : req.userInfo._id,
  });
  try {
    const item = await newItem.save();
    if (!item) throw Error("Something went wrong saving the item");
    if(req.userInfo.role != 'admin'){
      io.getIO().emit('todo', {action : "create", item : { ...item._doc, userId : {_id: req.userInfo._id, email:req.userInfo.email} }});
    }
    res.status(200).json({item : item, message : "Todo created successfully"});
  } catch (e) {
    res.status(400).json({ errorMsg: e.message });
  }
};

exports.updateItem = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      errorMsg: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  try {
    const data = {
      title: req.body.title,
      description: req.body.description,
      dateTime: req.body.dateTime,
    };
    const item = await Item.findOneAndUpdate({_id : id,userId : req.userInfo._id}, data, { useFindAndModify: false,new: true });
    
    if (!item) throw Error(`Cannot update Todo with id=${id}. Maybe Todo was not found!`);
    if(req.userInfo.role != 'admin'){
      io.getIO().emit('todo', {action : "update", item : { ...item._doc, userId : {_id: req.userInfo._id, email:req.userInfo.email} }});
    }
    res.status(200).json({item: item, message: "Todo updated successfully." });
  } catch (e) {
    res.status(400).json({ errorMsg: e.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Item.findOneAndDelete({_id : id,userId:req.userInfo._id},{useFindAndModify: false});

    if (!item) throw Error(`Cannot delete Todo with id=${id}. Maybe Todo was not found!`);
    if(req.userInfo.role != 'admin'){
      io.getIO().emit('todo', {action : "delete", id : id});
    }

    res.status(200).json({ message: "Todo was deleted successfully!",id:id });
  } catch (e) {
    res.status(400).json({ errorMsg: e.message });
  }
};
