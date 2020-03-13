<template>
	<v-card max-width="900" class="mx-auto">
		<v-flex class="d-flex pa-3">
			<v-text-field v-model="search" label="חפש בן אדם ספציפי..."></v-text-field>
		</v-flex>
		<v-list>
			<contact-row
				v-for="contact in filteredContacts"
				:key="contact.title"
				@click="$emit('contact-clicked')"
				:contact="contact"
			></contact-row>
		</v-list>
	</v-card>
</template>
<script>
import { getAllContacts } from '@/queries/getAllContacts.js';
import ContactRow from '@/components/ContactRow.vue';
export default {
	apollo: {
		list: getAllContacts
	},
	components: {
		'contact-row': ContactRow
	},
	data() {
		return {
			list: [],
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
