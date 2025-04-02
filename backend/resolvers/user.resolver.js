import { users } from '../dummyData/data.js'

const userResolver = {
    Query: {
        users: () => { //Inside Query we get 4 different arguments - parent, args, context, info
            return users //curently using mockData
        },
        user: (_, {userId}) => {
            return users.find((user) => user._id === userId);
        },
    },
    Mutation: {}
}

export default userResolver;