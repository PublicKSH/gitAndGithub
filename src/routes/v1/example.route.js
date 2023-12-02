const express = require('express');
const validate = require('../../middlewares/validate');
const {exampleValidation} = require('../../validations');
const {exampleController} = require('../../controllers');

const router = express.Router();

router
    .route('/')
    .get(validate(exampleValidation.getExample), exampleController.getExample)

module.exports = router;
