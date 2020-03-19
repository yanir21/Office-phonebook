<template>
	<v-card max-width="900" class="mx-auto">
		<v-flex class="d-flex pa-3">
			<v-text-field v-model="search" label="חפש בן אדם ספציפי..."></v-text-field>
		</v-flex>
		<v-list>
			<v-list-item-group color="primary">
				<contact-row
					v-for="contact in filteredContacts"
					:key="contact.title"
					@dblclick.native="showContact(contact)"
					:contact="contact"
				></contact-row>
			</v-list-item-group>
		</v-list>
		<v-dialog v-model="dialog" width="500">
			<v-card>
				<v-card-title class="headline grey lighten-2" primary-title>
					עוד קצת על אדיר ויצמן
				</v-card-title>

				<v-card-text>שם: </v-card-text>

				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" text @click="dialog = false">
						הבנתי...
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
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
			search: '',
			dialog: false
		};
	},
	computed: {
		filteredContacts() {
			return this.list.filter(contact => contact.first_name.includes(this.search));
		}
	},
	methods: {
		showContact() {
			this.dialog = true;
		}
	}
};
</script>
<style>
#searchBar {
	width: 40%;
}
</style>
