const {Example, sequelize} = require('../models/index')

const getExample = async () => {
    try {
        return {example: 'happy'}
    } catch (e) {
        return {}
    }
}

module.exports = {
    getExample
}
