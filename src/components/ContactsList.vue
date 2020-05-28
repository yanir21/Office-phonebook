<template>
	<v-card max-width="900" class="mx-auto rounded-card">
		<v-flex class="d-flex pa-3">
			<v-text-field
				clearable
				v-model="search"
				@input="isTyping = true"
				label="חפש בן אדם ספציפי..."
			></v-text-field>
			<v-progress-circular
				v-if="isLoading"
				indeterminate
				color="primary"
			></v-progress-circular>
		</v-flex>
		<v-list id="contactList" max-height="570">
			<v-list-item-group color="primary">
				<contact-row
					v-for="contact in filteredContacts"
					:key="contact.title"
					@erased="loadFilteredContacts"
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
import { debounce } from 'debounce';

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
			filteredContacts: [],
			showContactInfo: false,
			showContactEdit: false,
			isTyping: false,
			isLoading: true,
			chosenContact: {}
		};
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
			this.loadFilteredContacts();
			Swal.fire('!יש', 'איש הקשר עודכן בהצלחה', 'success');
		},
		loadFilteredContacts(searchQuery) {
			if (this.list[0]) {
				this.isLoading = true;
				if (searchQuery) {
					const list = this.list.filter(contact =>
						this.doesContactIncludesSearch(contact, searchQuery)
					);
					this.filteredContacts = list;
				} else {
					this.filteredContacts = this.list;
				}
				this.isLoading = false;
				return;
			}
			this.filteredContacts.length = 0;
		},
		doesContactIncludesSearch(contact, search) {
			const dataStr =
				contact.first_name +
				' ' +
				contact.last_name +
				' ' +
				contact.company +
				' ' +
				contact.memo;
			return dataStr.includes(search);
		}
	},
	watch: {
		search: debounce(function() {
			this.isTyping = false;
		}, 800),
		isTyping: function(value) {
			if (!value) {
				this.loadFilteredContacts(this.search);
			}
		},
		list: function() {
			this.loadFilteredContacts('');
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
