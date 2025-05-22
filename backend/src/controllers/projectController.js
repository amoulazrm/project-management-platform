const Project = require('../models/Project');

// Create a new project
exports.createProject = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('User:', req.user);

    if (!req.body) {
      return res.status(400).json({
        success: false,
        error: 'Request body is required'
      });
    }

    const { name, description, status, startDate, endDate } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Project name is required'
      });
    }

    const project = new Project({
      name,
      description,
      status: status || 'Planning',
      startDate: startDate || new Date(),
      endDate,
      owner: req.user._id
    });

    console.log('Creating project:', project);

    const savedProject = await project.save();
    console.log('Project saved:', savedProject);

    res.status(201).json({
      success: true,
      data: savedProject
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    // Get projects where user is either owner or member
    const projects = await Project.find({
      $or: [
        { owner: req.user._id },
        { members: req.user._id }
      ]
    })
    .populate('owner', 'email')
    .populate('members', 'email');

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get single project
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      $or: [
        { owner: req.user._id },
        { members: req.user._id }
      ]
    })
    .populate('owner', 'email')
    .populate('members', 'email');

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    // Only allow owner to update project
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true, runValidators: true }
    ).populate('owner', 'email')
     .populate('members', 'email');

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found or you do not have permission to update it'
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    // Only allow owner to delete project
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found or you do not have permission to delete it'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}; 