import Vue from 'vue';
import VueApollo from 'vue-apollo';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const httpEndpoint =
	process.env.VUE_APP_GRAPHQL_HTTP || 'http://web-phone-book.herokuapp.com/v1/graphql';

const wsEndpoint = process.env.VUE_APP_GRAPHQL_WS || 'ws://web-phone-book.herokuapp.com/v1/graphql';

const httpLink = createHttpLink({
	headers: {
		'content-type': 'application/json',
		'x-hasura-admin-secret': `btamir123456`
	},
	uri: httpEndpoint
});

const wsLink = new WebSocketLink({
	uri: wsEndpoint,
	options: {
		reconnect: true,
		connectionParams: {
			headers: {
				'content-type': 'application/json',
				'x-hasura-admin-secret': `hbhryn33`
			}
		}
	}
});

const link = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
	},
	wsLink,
	httpLink
);
const client = new ApolloClient({
	link,
	connectToDevTools: true,
	cache: new InMemoryCache({ freezeResults: false })
});

export const apolloProvider = new VueApollo({
	defaultClient: client,
	defaultOptions: {
		$query: {
			//fetchPolicy: "cache-and-network"
		}
	},
	errorHandler(error) {
		console.log(error);
		console.log(
			'%cError',
			'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
			error.message
		);
		this.$router.push({
			name: '/serverErrorPage',
			params: {
				errorMessage: encodeURIComponent(error.message)
			}
		});
	}
});

Vue.use(VueApollo);

export default apolloProvider;
