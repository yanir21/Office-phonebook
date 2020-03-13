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
					<v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
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
import { getAllContacts } from '@/queries/getAllContacts.js';
export default {
	apollo: {
		list: getAllContacts
	},
	data() {
		return {
			list: [],
			search: ''
		};
	},
	computed: {
		fullNameList() {
			return this.list.map(contact => {
				return {
					name: contact.first_name + ' ' + (contact.last_name ? contact.last_name : '')
				};
			});
		},
		filteredContacts() {
			return this.fullNameList.filter(contact => contact.name.includes(this.search));
		}
	},
	methods: {
		seperateName() {
			// let fullName = this.fullName;
		}
	}
};
</script>
<style>
#searchBar {
	width: 40%;
}
</style>
