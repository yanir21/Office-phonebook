import gql from 'graphql-tag';
export const updateContact = gql`
	mutation(
		$id: Int!
		$first_name: String!
		$last_name: String
		$company: String
		$email: String
		$memo: String
		$phones: [phones_insert_input!]!
	) {
		update_contacts(
			where: { id: { _eq: $id } }
			_set: {
				first_name: $first_name
				last_name: $last_name
				company: $company
				email: $email
				memo: $memo
			}
		) {
			affected_rows
		}
		delete_phones(where: { contact_id: { _eq: $id } }) {
			affected_rows
		}
		insert_phones(objects: $phones) {
			affected_rows
		}
	}
`;
