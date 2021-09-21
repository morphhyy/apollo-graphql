import { userModel } from '../models/User.js'

export const resolvers = {
    Query: {
        
        users: async () => {
            return await userModel.find()
        },

        user: async (_, {id}) => {
            return userModel.findById(id)
        },

    },

    Mutation : {
        
        createUser: async (_, args) => {
            const { name, email, password } = args.input
            const findEmail = await userModel.findOne({ email })
            if(findEmail) return "Email already registered"
            const user = new userModel({
                name, email, password
            })

            try {
                await user.save()
                return "User saved successfully"
            } catch (error) {
                return error.message
            }
        },

        deleteUser: async (_, {id}) => {
            try {
                await userModel.findByIdAndDelete(id)
                return "User deleted successfully"
            } catch (error) {
                return error.message
            }
        },

        login: async (_, args ) => {
            const { email, password } = args.input
            
            try {
                const user = await userModel.findOne({email})
                if(!user) return "Email not found!"
                if(user.password !== password) return "Password Incorrect!"
                return "Login Successfully!"   
            } catch (error) {
                return error.message
            }
        }
    }
}
