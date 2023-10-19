const express = require('express');
const Inventory = express.Router();

const {post_inventory, get_Inventory_data, update_inventory, delete_Inventory_data} = require('../Controllers/tbl_gym_inventory')

Inventory.post('/api/inventory/post_inventory', post_inventory)
Inventory.get('/api/inventory/get_inventory_data', get_Inventory_data)
Inventory.put('/api/inventory/update_inventory/:id', update_inventory)
Inventory.delete('/api/inventory/delete_inventory_data/:id', delete_Inventory_data)
module.exports={ Inventory};