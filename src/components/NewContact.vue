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
							v-model="company"
						/>
					</v-col>

					<v-col cols="12">
						<v-text-field prepend-icon="mdi-mail" placeholder="מייל" v-model="email" />
					</v-col>
					<v-col cols="8" v-for="(phone, index) in phones" :key="index">
						<v-text-field
							type="tel"
							prepend-icon="mdi-phone"
							:append-icon="iconToAppend(index)"
							@click:append="deletePhone(index)"
							@input="updatePhone($event, index)"
							v-mask="mask"
							placeholder="000-0000000"
						/>
					</v-col>

					<v-col id="addPhoneButton">
						<v-btn icon color="green" @click="addPhone">
							<v-icon>mdi-plus</v-icon>
						</v-btn>
					</v-col>
					<v-col cols="12">
						<v-text-field prepend-icon="mdi-text" placeholder="הערות" v-model="memo" />
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
import { mask } from 'vue-the-mask';
import { insertContact } from '@/queries/AddContact.js';
export default {
	data() {
		return {
			fullName: '',
			email: '',
			company: '',
			memo: '',
			phones: [''],
			mask: '###-#######'
		};
	},
	directives: {
		mask
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
			console.log(
				this.phones.map(phone => {
					return { number: phone };
				})
			);
			this.$apollo.mutate({
				mutation: insertContact,
				variables: {
					first_name: name.firstName,
					last_name: name.lastName,
					company: this.company,
					email: this.email,
					memo: this.memo,
					phones: this.phones.map(phone => {
						return { number: phone };
					})
				}
			});
			this.show = false;
		},
		getFullNameSeperated() {
			const fullNameArray = this.fullName.split(' ');
			let [firstName, ...lastName] = fullNameArray;
			lastName = lastName.join(' ');
			return { firstName, lastName };
		},
		updatePhone(number, index) {
			this.phones[index] = number.replace('-', '');
		},
		addPhone() {
			this.phones.push('');
		},
		deletePhone(index) {
			console.log(index);
			this.phones.splice(index, 1);
		},
		iconToAppend(index) {
			return index > 0 && index === this.phones.length - 1 ? 'mdi-minus' : '';
		}
	}
};
</script>
<style>
#addPhoneButton {
	margin-top: 1.8%;
}
</style>
