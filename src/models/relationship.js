
export default async function ({ sequelize}) {
    const User = sequelize.models.User
    const Todo = sequelize.models.Todo

    User.hasMany(Todo, {
        foreignKey: 'user_id'
    });
    Todo.belongsTo(User, {
        foreignKey: 'user_id'
    }); 
}