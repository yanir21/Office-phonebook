<template>
	<v-dialog v-model="show" width="800px">
		<v-card>
			<v-card-title>
				איש קשר חדש
			</v-card-title>
			<v-container>
				<v-row class="mx-2">
					<v-col class="align-center justify-space-between" cols="12">
						<v-row align="center" class="mr-0">
							<v-avatar size="40px" class="mx-3">
								<img
									src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
									alt=""
								/>
							</v-avatar>
							<v-text-field placeholder="שם מלא" v-model="fullName" />
						</v-row>
					</v-col>
					<v-col cols="6">
						<v-text-field
							prepend-icon="mdi-account-card-details-outline"
							placeholder="חברה"
						/>
					</v-col>

					<v-col cols="12">
						<v-text-field prepend-icon="mdi-mail" placeholder="מייל" />
					</v-col>
					<v-col cols="12">
						<v-text-field
							type="tel"
							prepend-icon="mdi-phone"
							placeholder="(000) 000 - 0000"
						/>
					</v-col>
					<v-col cols="12">
						<v-text-field prepend-icon="mdi-text" placeholder="הערות" />
					</v-col>
				</v-row>
			</v-container>
			<v-card-actions>
				<v-spacer />
				<v-btn text color="primary" @click="show = false">Cancel</v-btn>
				<v-btn text @click="saveContact">Save</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
<script>
import { insertContact } from '@/queries/AddContact.js';
export default {
	data() {
		return {
			fullName: '',
			email: '',
			company: '',
			memo: ''
		};
	},
	props: {
		dialog: {
			required: true
		}
	},
	computed: {
		show: {
			get() {
				return this.dialog;
			},
			set() {
				this.closeModal();
			}
		}
	},
	methods: {
		closeModal() {
			this.$emit('closed');
		},
		saveContact() {
			const name = this.getFullNameSeperated();
			this.$apollo.mutate({
				mutation: insertContact,
				variables: {
					first_name: name.firstName,
					last_name: name.lastName,
					company: this.company,
					email: this.email,
					memo: this.memo
				}
			});
			this.show = false;
		},
		getFullNameSeperated() {
			const fullNameArray = this.fullName.split(' ');
			let [firstName, ...lastName] = fullNameArray;
			lastName = lastName.join(' ');
			return { firstName, lastName };
		}
	}
};
</script>
