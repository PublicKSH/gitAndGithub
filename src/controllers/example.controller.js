const catchAsync = require('../utils/catchAsync');
const {exampleService} = require("../services");

const getExample = catchAsync(async (req, res) => {
    const data = {...req.query, ...req.params, ...req.body};
    const result = await exampleService.getExample();
    res.send(result);
})

module.exports = {
    getExample
}
