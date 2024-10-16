const express = require('express');
const {
    createTemplate,
    getTemplates,
    getTemplate,
    updateTemplate,
    deleteTemplate,
    } = require('../controllers/templateController');

const requireAuth=require('../middleware/requireAuth')

const router=express.Router();

//require auth for all workouts routes
router.use(requireAuth)

router.get('/', getTemplates)
router.get('/:id', getTemplate)
router.post('/', createTemplate)
router.patch('/:id', updateTemplate)
router.delete('/:id', deleteTemplate)


module.exports=router