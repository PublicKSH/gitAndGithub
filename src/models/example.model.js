module.exports = ((sequelize, DataTypes) => {
    const schema = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    };
    
    const modelOptions = {
        
        // hard delete mode
        // timestamps: false,
        // createdAt: false,
        // updatedAt: false,
        // paranoid : true,
        
        tableName: "example",
        indexes: []
    };
    return sequelize.define('Example', schema, modelOptions);
});
