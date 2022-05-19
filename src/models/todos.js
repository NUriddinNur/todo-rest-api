import { Model, DataTypes} from 'sequelize'


export default async function ({ sequelize }) {
    class Todo extends Model {}

    Todo.init({

        todo_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        todo_body: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    }, {
        tableName: 'todos',
        modelName: 'Todo',
        updatedAt: 'todo_updated_at',
        createdAt: 'todo_created_at',
        underscored: true,
        sequelize
    })
}