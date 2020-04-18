const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

// Model
const Item = require('../../models/Item')
const User = require('../../models/User')

// Get all items
router.get('/', (req, res) => {
   Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items)) 
})

// Add one item
router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    const newItem = new Item({ 
      name: req.body.name, 
      user: req.user.id
    })

    // newItem.save().then(item => res.json(item))
    const item  = await newItem.save()

    res.json(item)
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    })
  }

})

router.delete('/:id', auth, async (req, res) => {

  try {
    const item = await Item.findById(req.params.id)

    if (!item) {
      return res.status(404).json({ msg: 'Items not found' })
    }

    // check item's user is the same as logged in user
    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'not your item to delete'})
    }

    await item.remove()

    res.json({ msg: 'Item successfully removed' })
  } catch (err) {
    console.err(err.message)
    res.status(500).json({ err: 'Server Error' })
  }
})

// Get one item by item id
router.get('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)

    if (!item) {
      return res.status(404).json({ msg: 'Items not found' })
    }

    res.json(item)
  } catch (err) {
    console.err(err.message)

    res.status(500).json({ err: 'Server Error' })
  }
})


// Get all items by user id
router.get('/:id/all', auth, async (req, res) => {
  try {
    const item = await Item.find({ user: req.params.id})

    if (!item) {
      return res.status(404).json({ msg: 'Items not found' })
    }

    res.json(item)
  } catch (err) {
    console.err(err.message)

    res.status(500).json({ err: 'Server Error' })
  }
})

module.exports = router