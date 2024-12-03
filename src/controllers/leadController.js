const { Lead } = require('../models');

exports.getAllLeads = async (req, res) => {
    try {
        const leads = await Lead.findAll({ where: { assignedTo: req.user.id } });
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createLead = async (req, res) => {
    try {
        const lead = await Lead.create({ ...req.body, assignedTo: req.user.id });
        res.status(201).json(lead);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

