<template>
	<v-card max-width="900" class="mx-auto">
		<v-flex class="d-flex pa-3">
			<v-text-field v-model="search" label="חפש בן אדם ספציפי..."></v-text-field>
		</v-flex>
		<v-list>
			<v-list-item
				v-for="item in filteredContacts"
				:key="item.title"
				@click="$emit('contact-clicked')"
			>
				<v-list-item-avatar>
					<v-img :src="item.avatar"></v-img>
				</v-list-item-avatar>

				<v-list-item-content>
					<v-list-item-title
						><h3>{{ item.name }}</h3></v-list-item-title
					>
					{{ item.number }}
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-card>
</template>
<script>
import gql from 'graphql-tag';
export default {
	apollo: {
		list: gql`
			{
				list:contacts {
					first_name
					last_name
					phones {
						number
					}
				}
			}
		`
	},
	data() {
		return {
			list: [
				{
					name: 'נדב',
					avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
					number: '031564892'
				},
				{
					name: 'חצב',
					avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
					number: '031564892'
				}
			],
			search: ''
		};
	},
	computed: {
		filteredContacts() {
			return this.list.filter(contact => contact.first_name.includes(this.search));
		}
	}
};
</script>
<style>
#searchBar {
	width: 40%;
}
</style>
