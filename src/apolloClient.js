import { HttpLink, InMemoryCache, ApolloClient, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";


const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.REACT_APP_API_SUB,
  }),
);

console.log(process.env.API_SUB)

const httpLink = new HttpLink({
  uri:  process.env.REACT_APP_API,
});

const authLink =  setContext((_, { headers }) => {
    const token = localStorage.getItem('token');

    return {
        headers:{
            ...headers,
            authorization: token ? `${token}`: ''
        }
    }
})

const splitLink = split(({query})=>{
    const definition = getMainDefinition(query)
    return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
    )
}, wsLink, authLink.concat(httpLink))

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
})

export default client;