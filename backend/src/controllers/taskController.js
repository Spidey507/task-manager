const Task = require('../models/Task');

// Read with optional search, sort, and sort direction
exports.getAllTasks = async (req, res) => {
  try {
    let query = {};
    let sort = {};

    // Búsqueda
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      query = { $or: [{ title: searchRegex }, { description: searchRegex }] };
    }

    // Ordenación y dirección de la ordenación
    if (req.query.sort) {
      const sortField = req.query.sort === 'date' ? 'dueDate' : 'title';
      const sortOrder = req.query.order && req.query.order === 'desc' ? 'desc' : 'asc';
      sort[sortField] = sortOrder;
    }

    const tasks = await Task.find(query).sort(sort);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller functions for CRUD operations

// Create
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const newTask = new Task({ title, description, dueDate });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read with optional search, sort, and sort direction
exports.getAllTasks = async (req, res) => {
  try {
    let query = {};
    let sort = {};

    // Búsqueda
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      query = { $or: [{ title: searchRegex }, { description: searchRegex }] };
    }

    // Ordenación y dirección de la ordenación
    if (req.query.sort) {
      const sortField = req.query.sort === 'date' ? 'dueDate' : 'title';
      const sortOrder = req.query.order && req.query.order === 'desc' ? 'desc' : 'asc';
      sort[sortField] = sortOrder;
    }

    const tasks = await Task.find(query).sort(sort);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get specific task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
