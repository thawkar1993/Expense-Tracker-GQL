import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';

const userResolver = {
    Mutation: {
        signUp: async (_, {input}, context) => {
            try{
                const { username, name, password, gender } = input;

                if(!username || !name || !password || !gender){
                    throw new Error("All fields are required");
                }
                const existingUser = await User.findOne({ username });
                if(existingUser){
                    throw new Error("User Already exists");
                }

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                //https://avatar.iran.liara.run/
                const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
                const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

                const newUser = new User({
                    username,
                    name,
                    password: hashedPassword,
                    gender,
                    profilePicture: gender === "male" ? boyProfilePic: girlProfilePic,
                });

                await newUser.save();
                await context.login(newUser);
                return newUser;

            }catch(err){
                console.error("Error in SignUp: ", err);
                throw new Error(err.message || "Internal server error");
            }
        },

        login: async (_, {input}, context) => {
            try{
                const { username, password} = input;
                if(!username || !password) throw new Error("All fields are required");
                const { user } = await context.authenticate("graphql-local", { username, password })

                await context.login(user);
                return user;
            }catch(err){
                console.error("Error in Login: ", err);
                throw new Error(err.message || "Internal server error");
            }
        },

        logout: async (_, __, context) => {
            const { req, res } = context;
            try{
                await context.logout();
                req.session.destroy((err) => {
                    if(err) throw err;
                })
                res.clearCookie("connect.sid");
                return { message: "Logged out successfully"}

            }catch(err){
                console.error("Error in Logout: ", err);
                throw new Error(err.message || "Internal server error");
            }
        }
    },

    Query: {
        /* For understanding:
        users: (_,__, context) => { //Inside Query we get 4 different arguments - parent, args, context, info
            return users //curently using mockData
        }
        */

        authUser: async (_, __, context) => {
            try{
                const user = await context.getUser();
                return user;

            }catch(err){
                console.error("Error in authUser: ", err);
                throw new Error(err.message || "Internal server error");
            }
        },
        
        user: async (_, {userId}) => {
            try{
                const user = await User.findById(userId);
                return user;

            }catch(err){
                console.error("Error in user query: ", err);
                throw new Error(err.message || "Internal server error");
            }
        },

        //TODO => Add User/Transaction Relation-later
    },
}

export default userResolver;