import gql from 'graphql-tag';
export const insertContact = gql`
	mutation(
		$first_name: String!
		$last_name: String!
		$company: String
		$email: String
		$memo: String
	) {
		insert_contacts(
			objects: {
				first_name: $first_name
				last_name: $last_name
				company: $company
				email: $email
				memo: $memo
			}
		) {
			affected_rows
		}
	}
`;
