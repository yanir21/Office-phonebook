<template>
	<v-card max-width="900" class="mx-auto rounded-card">
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
		<v-dialog v-model="showContactInfo" width="500">
			<contact-details-modal
				:contact="chosenContact"
				@closeModal="showContactInfo = false"
				@editMode="enterEditMode"
			></contact-details-modal>
		</v-dialog>
		<v-dialog v-model="showContactEdit" width="700">
			<edit-contact-modal
				:contact="chosenContact"
				@closeModal="showContactEdit = false"
				@cancelEditing="cancelEdit"
				@finishedEditing="finishEdit"
			></edit-contact-modal>
		</v-dialog>
	</v-card>
</template>
<script>
import Swal from 'sweetalert2';
import { getAllContacts } from '@/queries/getAllContacts.js';
import ContactRow from '@/components/ContactRow.vue';
import ContactDetailsModal from '@/components/ContactDetailsModal.vue';
import EditContactModal from '@/components/EditContactModal.vue';
export default {
	apollo: {
		list: getAllContacts
	},
	components: {
		'contact-row': ContactRow,
		'contact-details-modal': ContactDetailsModal,
		'edit-contact-modal': EditContactModal
	},
	data() {
		return {
			list: [],
			search: '',
			showContactInfo: false,
			showContactEdit: false,
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
			this.showContactInfo = true;
			this.chosenContact = contact;
		},
		enterEditMode() {
			this.showContactInfo = false;
			this.showContactEdit = true;
		},
		cancelEdit() {
			this.showContactEdit = false;
			this.showContactInfo = true;
		},
		finishEdit() {
			this.showContactEdit = false;
			Swal.fire('!יש', 'איש הקשר נמחק בהצלחה', 'success');
		}
	}
};
</script>
<style>
#searchBar {
	width: 40%;
}
#contactList {
	overflow-y: scroll;
}
</style>
