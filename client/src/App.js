import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'
import Home from './pages/Home.js'
const App = () => {
  
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:9000/graphql"
  })


  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  )
}

export default App
