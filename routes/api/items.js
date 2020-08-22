const express = require('express');
const router = express.Router();

//Item Controller
const ItemsController = require('../../controller/itemsController');

/**
 * @route GET api/items
 * @desc Get Item By Id 
 * @access Protected
 */
router.get('/:id',ItemsController.fetchItemById);

/**
 * @route GET api/items
 * @desc Get All Items 
 * @access Protected
 */
router.get('/',ItemsController.fetchItems);

/**
 * @route POST api/items
 * @desc Create An Items 
 * @access Protected
 */
router.post('/',ItemsController.createItem);

/**
 * @route PUT api/items
 * @desc update An Items 
 * @access Protected
 */
router.put('/:id',ItemsController.updateItem);

/**
 * @route DELETE api/items
 * @desc Delete an Item 
 * @access Protected
 */
router.delete('/:id',ItemsController.deleteItem);


module.exports = router;