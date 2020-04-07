<template>
	<v-card>
		<v-icon style="margin-right: 0.5em;">mdi-badge-account-horizontal</v-icon>
		<div class="text-center">
			<v-card-text raised class="font-weight-bold">
				<v-row>
					<v-col style="height: 8em;"
						><v-avatar size="7em">
							<img
								src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
								alt="John"
							/> </v-avatar></v-col
				></v-row>
				<v-row>
					<v-col style="height: 1.5em;"
						><h1>{{ fullName }}</h1></v-col
					>
				</v-row>
				<v-row>
					<v-col>
						<h3>{{ contact.company }}</h3></v-col
					>
				</v-row>
				<v-row>
					<v-col cols="2">
						<v-icon>mdi-email</v-icon>
					</v-col>
					<v-col cols="5">
						{{ contact.email }}
					</v-col>
				</v-row>
				<v-row v-for="(phone, index) in contact.phones" :key="index">
					<v-col cols="2">
						<v-icon>mdi-phone</v-icon>
					</v-col>
					<v-col cols="5">
						{{ formatedPhone(phone.number) }}
					</v-col>
					<v-col cols="5">
						{{ phone.name }}
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-textarea
							disabled
							filled
							label="תזכיר"
							:value="contact.memo"
						></v-textarea>
					</v-col>
				</v-row>
			</v-card-text>
			<v-divider></v-divider>
			<v-card-actions>
				<v-btn color="error" text @click="deleteContact(contact.id)">
					מחק
				</v-btn>
				<v-btn color="primary" text @click="$emit('editMode')">
					ערוך
				</v-btn>
				<v-spacer></v-spacer>
				<v-btn color="primary" text @click="$emit('closeModal')">
					סגור
				</v-btn>
			</v-card-actions>
		</div>
	</v-card>
</template>

<script>
import Swal from 'sweetalert2';
import { getAllContacts } from '../queries/getAllContacts';
import { deleteContact } from '../queries/deleteContact';
export default {
	props: {
		contact: {
			required: true
		}
	},
	computed: {
		fullName() {
			return this.contact.first_name + ' ' + this.contact.last_name;
		}
	},
	methods: {
		formatedPhone(phone) {
			return phone.length === 10 ? phone.slice(0, 3) + '-' + phone.slice(3) : phone;
		},
		deleteContact(id) {
			Swal.fire({
				title: '?רגע רגע... אתה בטוח',
				text: 'איש הקשר יימחק לצמיתות',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				cancelButtonText: 'עזוב התחרטתי',
				confirmButtonText: 'יאללה תמחק'
			}).then(async result => {
				if (result.value) {
					await this.$apollo.mutate({
						refetchQueries: [{ query: getAllContacts }],
						mutation: deleteContact,
						variables: {
							id: id
						}
					});
					Swal.fire('!יש', 'איש הקשר נמחק בהצלחה', 'success');
					this.$emit('closeModal');
				}
			});
		}
	}
};
</script>
