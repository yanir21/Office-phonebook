<template>
	<v-card max-width="900" class="mx-auto">
		<v-flex class="d-flex pa-3">
			<v-text-field v-model="search" label="חפש בן אדם ספציפי..."></v-text-field>
		</v-flex>
		<v-list id="contactList" max-height="570">
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
			<contact-details-modal
				:contact="chosenContact"
				@closeModal="dialog = false"
			></contact-details-modal>
		</v-dialog>
	</v-card>
</template>
<script>
import { getAllContacts } from '@/queries/getAllContacts.js';
import ContactRow from '@/components/ContactRow.vue';
import ContactDetailsModal from '@/components/ContactDetailsModal.vue';
export default {
	apollo: {
		list: getAllContacts
	},
	components: {
		'contact-row': ContactRow,
		'contact-details-modal': ContactDetailsModal
	},
	data() {
		return {
			list: [],
			search: '',
			dialog: false,
			chosenContact: {}
		};
	},
	computed: {
		filteredContacts() {
			const fields = [];
			const search = this.search;
			if (this.list[0]) {
				fields.push(...Object.keys(this.list[0]));
				return this.list.filter(contact =>
					fields.some(field => String(contact[field]).includes(search))
				);
			}
			return [];
		}
	},
	methods: {
		showContact(contact) {
			this.dialog = true;
			this.chosenContact = contact;
		}
	}
};
</script>
<style>
#searchBar {
	width: 40%;
}
#contactList {
	/* overflow: hidden; */
	overflow-y: scroll;
}
</style>
