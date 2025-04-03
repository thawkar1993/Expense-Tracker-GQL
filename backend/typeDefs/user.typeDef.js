const userTypeDef = `#graphql
    type User {
        _id: ID! # ! means this value is required and cannot be null.
        username: String!
        name: String!
        password: String!
        profilePicture: String
        gender: String! 
    }

    #special type - this will tell our schemas what type of queries we could have for users 
    type Query { 
        #users: [User!] #fetch all users - in response array of users.
        authUser: User # user after authenticate  if not then null, so not required
        user(userId:ID!): User #fetch user based on id
    }

    type Mutation {
        signUp(input: SignUpInput!): User
        login(input: LoginInput!): User
        logout: LogoutResponse
    }

    #create inputs for above type
    input SignUpInput {
        username: String!
        name: String!
        password: String!
        gender: String!
    }

    input LoginInput {
        username: String!
        password: String!
    }

    type LogoutResponse {
        message: String!
    }
`

export default userTypeDef;