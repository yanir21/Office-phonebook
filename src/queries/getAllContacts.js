import gql from 'graphql-tag';
export const getAllContacts = gql`
	{
		list: contacts(order_by: { first_name: asc }) {
			first_name
			last_name
			phones {
				number
			}
		}
	}
`;
