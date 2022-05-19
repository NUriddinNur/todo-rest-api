export default async function ({ sequelize }) {
    // mock user data
    const x = await sequelize.models.User.bulkCreate([
        { username: 'ali', user_contact: '998941025678', user_gender: 'male', user_age: 25 },
        { username: 'halil', user_contact: '998974569123', user_gender: 'male', user_age: 15 },
        { username: 'nosir', user_contact: '998956312479', user_gender: 'male', user_age: 35 },
        { username: 'nigora', user_contact: '998930020202', user_gender: 'female', user_age: 20 }
    ])

}