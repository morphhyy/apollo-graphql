import { gql } from 'apollo-server-express'

export const typeDefs = gql `
    type Query {
        users: [User]
        user(id: ID!): User!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        password: String!
    }

    input userInput {
        name: String!
        email: String!
        password: String!
    }

    input loginInput {
        email: String!
        password: String!
    }
    
    type Mutation {
        
        createUser(input: userInput): String!

        login(input: loginInput) : String!

        deleteUser(id: ID!): String!
    }
`

