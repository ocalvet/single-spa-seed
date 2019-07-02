const router = require('express').Router();
const Application = require('../models/application');
const _ = require('lodash');

router
  .get('/', async (req, res) => {
    try {
      const applications = await Application.find({
        company: req.user.company
      }).exec();
      res.json(applications);
    } catch (e) {
      res.status(400).json({ error: e });
    }
  })
  .post('/', async (req, res) => {
    try {
      const application = {
        ...req.body,
        company: req.user.company
      };
      const createdApp = await Application.create(application);
      res.json(createdApp);
    } catch (e) {
      res.status(400).json({ message: 'Error craeting app', e });
    }
  });

module.exports = router;
