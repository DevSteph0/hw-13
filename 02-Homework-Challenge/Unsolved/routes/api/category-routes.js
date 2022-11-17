const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const Category = await Product.findAll();
    res.status(200).json(Category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const Category = await Product.findByPk(req.params.id);
    if (!Category) {
      res.status(404).json({ message: 'No items found with this id!' });
      return;
    }
    res.status(200).json(Category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const Category = await Product.create(req.body);
    res.status(200).json(Category);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async  (req, res) => {
  // update a category by its `id` value
  try {
    const Categories = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!Categories[0]) {
      res.status(404).json({ message: 'item updated!' });
      return;
    }
    res.status(200).json(Categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const Categories = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (Categories) {
      res.status(404).json({ message: 'item has been deleted!' });
      return;
    }
    res.status(200).json(Categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
