import { gql } from '@apollo/client'


export const QUERY_ALL_USERS = gql `
    query {
        users {
            id
            name
            password
            email
        }
    }
`

export const QUERY_USER = gql `
    query ($userId: ID!) {
        user(id: $userId) {
            name
            email
        }
    }
`

export const QUERY_CREATE_USER = gql `
    mutation ($createUserInput: userInput!) {
        createUser(input: $createUserInput)
    }
`

export const QUERY_DELETE_USER = gql `
    mutation ($userId: ID!) {
        deleteUser(id: $userId)
    }


`