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
					<v-row v-for="(phone, index) in phones" :key="index">
						<v-col cols="6">
							<v-text-field
								type="tel"
								prepend-icon="mdi-phone"
								@input="updatePhone($event, index)"
								v-mask="mask"
								placeholder="000-0000000"
							/>
						</v-col>
						<v-col cols="3">
							<v-text-field
								cols="3"
								@input="updatePhoneDesc($event, index)"
								placeholder="תן שם למספר(אופציונלי)"
							/>
						</v-col>
						<v-col cols="1" class="phoneActionButton">
							<v-tooltip bottom>
								<template v-slot:activator="{ on }">
									<v-btn
										icon
										color="red"
										v-on="on"
										v-show="isLastPhone(index) && !isFirst(index)"
										@click="deletePhone(index)"
									>
										<v-icon>mdi-minus</v-icon>
									</v-btn>
								</template>
								<span>מחק מספר</span>
							</v-tooltip>
						</v-col>
						<v-col cols="1" class="phoneActionButton">
							<v-tooltip bottom>
								<template v-slot:activator="{ on }">
									<v-btn
										icon
										v-on="on"
										color="green"
										v-show="isLastPhone(index)"
										@click="addPhone"
									>
										<v-icon>mdi-plus</v-icon>
									</v-btn>
								</template>
								<span>הוסף מספר</span>
							</v-tooltip>
						</v-col>
					</v-row>

					<v-col cols="12">
						<v-text-field prepend-icon="mdi-text" placeholder="הערות" v-model="memo" />
					</v-col>
				</v-row>
			</v-container>
			<v-card-actions>
				<v-spacer />
				<v-btn text color="primary" @click="show = false">ביטול</v-btn>
				<v-btn text @click="saveContact">שמור</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
<script>
import { mask } from 'vue-the-mask';
import { insertContact } from '@/queries/AddContact.js';
import { getAllContacts } from '@/queries/getAllContacts.js';
export default {
	data() {
		return {
			fullName: '',
			email: '',
			company: '',
			memo: '',
			phones: [{}],
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
			this.$apollo.mutate({
				refetchQueries: [{ query: getAllContacts }],
				mutation: insertContact,
				variables: {
					first_name: name.firstName,
					last_name: name.lastName,
					company: this.company,
					email: this.email,
					memo: this.memo,
					phones: this.phones.filter(phone => phone.number.length)
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
			this.phones[index]['number'] = number.replace('-', '');
		},
		updatePhoneDesc(name, index) {
			this.phones[index]['name'] = name;
		},
		addPhone() {
			this.phones.push({});
		},
		deletePhone(index) {
			this.phones.splice(index, 1);
		},
		isLastPhone(index) {
			return index === this.phones.length - 1;
		},
		isFirst(index) {
			return index === 0;
		}
	}
};
</script>
<style>
.phoneActionButton {
	margin-top: 1.8%;
}
</style>
