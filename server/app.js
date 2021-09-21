import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './graphql/typeDefs.js'
import { resolvers } from './graphql/resolvers.js'


dotenv.config()

const startServer = async () => {
    const app = express()

    const server = new ApolloServer({ typeDefs, resolvers })
    await server.start()
    server.applyMiddleware({ app })

    try {
        await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    } catch (error) {
        console.log(error.message)
    }

    app.listen(9000, () => {
        console.log(`Listening on http://localhost:9000`)
    })
}

startServer()





