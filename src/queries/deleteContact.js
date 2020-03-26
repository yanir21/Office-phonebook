import gql from 'graphql-tag';
export const deleteContact = gql`
	mutation($id: Int!) {
		delete_contacts(where: { id: { _eq: $id } }) {
			affected_rows
		}
	}
`;
