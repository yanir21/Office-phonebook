import gql from 'graphql-tag';
export const insertContact = gql`
	mutation(
		$first_name: String!
		$last_name: String!
		$company: String
		$email: String
		$memo: String
		$phones: [phones_insert_input!]!
	) {
		insert_contacts(
			objects: {
				first_name: $first_name
				last_name: $last_name
				company: $company
				email: $email
				memo: $memo
				phones: { data: $phones }
			}
			on_conflict: {
				constraint: contacts_first_name_last_name_key
				update_columns: [email, company, memo, created_at]
			}
		) {
			affected_rows
		}
	}
`;
