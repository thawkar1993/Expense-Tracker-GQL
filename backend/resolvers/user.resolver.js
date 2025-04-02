import { users } from '../dummyData/data.js'

const userResolver = {
    Query: {
        users: (_,__, context) => { //Inside Query we get 4 different arguments - parent, args, context, info
            return users //curently using mockData
        },
        user: (_, {userId}, {req, res}) => {
            return users.find((user) => user._id === userId);
        },
    },
    Mutation: {}
}

export default userResolver;