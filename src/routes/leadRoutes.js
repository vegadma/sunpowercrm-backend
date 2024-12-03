const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getAllLeads, createLead } = require('../controllers/leadController');
const router = express.Router();

router.get('/', authMiddleware, getAllLeads);
router.post('/', authMiddleware, createLead);

module.exports = router;

