import gql from 'graphql-tag';
export const getContact = gql`
	query($first_name: String, $last_name: String) {
		contacts(
			where: { first_name: { _eq: $first_name }, _and: { last_name: { _eq: $last_name } } }
		) {
			created_at
			id
		}
	}
`;
