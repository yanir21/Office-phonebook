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
					<v-col cols="5">
						<v-text-field v-model="fullName"></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="5">
						<v-text-field v-model="contactCopy.company"></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="2">
						<v-icon>mdi-email</v-icon>
					</v-col>
					<v-col cols="5">
						<v-text-field v-model="contactCopy.email"></v-text-field>
					</v-col>
				</v-row>
				<v-row v-for="(phone, index) in contactCopy.phones" :key="index">
					<v-col cols="6">
						<v-text-field
							type="tel"
							prepend-icon="mdi-phone"
							@input="updatePhone($event, index)"
							:value="getPhone(index).number"
							placeholder="000-0000000"
							v-mask="mask"
						/>
					</v-col>
					<v-col cols="4">
						<v-text-field
							@input="updatePhoneDesc($event, index)"
							placeholder="תן שם למספר(אופציונלי)"
							:value="getPhone(index).name"
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
				<v-row>
					<v-col>
						<v-textarea filled label="תזכיר" v-model="contactCopy.memo"></v-textarea>
					</v-col>
				</v-row>
			</v-card-text>
			<v-divider></v-divider>
			<v-card-actions>
				<v-btn color="error" text @click="cancelEditing">
					בטל
				</v-btn>
				<v-spacer></v-spacer>
				<v-btn color="primary" text @click="updateContact">
					עדכן
				</v-btn>
			</v-card-actions>
		</div>
	</v-card>
</template>

<script>
import { mask } from 'vue-the-mask';
import Swal from 'sweetalert2';
import { getAllContacts } from '../queries/getAllContacts';
import { updateContact } from '../queries/updateContact';
export default {
	props: {
		contact: {
			required: true
		}
	},
	directives: {
		mask
	},
	created() {
		this.contactCopy = JSON.parse(JSON.stringify(this.contact));
	},
	data() {
		return {
			contactCopy: null,
			mask: '###-#######'
		};
	},
	watch: {
		contact() {
			this.contactCopy = this.contact;
		}
	},
	computed: {
		fullName: {
			get() {
				return this.contactCopy.first_name + ' ' + this.contact.last_name;
			},
			set(input) {
				let [firstName, ...lastName] = input.split(' ');
				lastName = lastName.join(' ');
				this.contactCopy.first_name = firstName;
				this.contactCopy.last_name = lastName;
			}
		}
	},
	methods: {
		updatePhone(number, index) {
			this.contactCopy.phones[index]['number'] = number.replace('-', '');
		},
		updatePhoneDesc(name, index) {
			this.contactCopy.phones[index]['name'] = name;
		},
		addPhone() {
			this.contactCopy.phones.push({});
		},
		deletePhone(index) {
			this.contactCopy.phones.splice(index, 1);
		},
		isLastPhone(index) {
			return index === this.contactCopy.phones.length - 1;
		},
		isFirst(index) {
			return index === 0;
		},
		getPhone(index) {
			const phone = this.contactCopy.phones[index];
			return phone ? phone : '';
		},
		cancelEditing() {
			Swal.fire({
				title: '?רגע רגע... אתה בטוח',
				text: 'כל השינויים שביצעת יימחקו',
				icon: 'info',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				cancelButtonText: 'המשך לערוך',
				confirmButtonText: '...בטל בטל'
			}).then(async result => {
				if (result.value) {
					this.$emit('cancelEditing');
				}
			});
		},
		async updateContact() {
			const id = this.contact.id;
			const contact = this.contactCopy;
			const phones = this.contactCopy.phones
				.filter(phone => phone.number)
				.map(phone => {
					return {
						number: phone.number,
						name: phone.name,
						contact_id: id
					};
				});
			try {
				await this.$apollo.mutate({
					refetchQueries: [{ query: getAllContacts }],
					mutation: updateContact,
					variables: {
						id: id,
						first_name: contact.first_name,
						last_name: contact.last_name,
						company: contact.company,
						email: contact.email,
						memo: contact.memo,
						phones: phones
					}
				});
			} catch (err) {
				console.log(err);
				Swal.fire('!אופס', '....הייתה בעיה בהתחברות לשרת', 'error');
			}
			this.$emit('finishedEditing');
		}
	}
};
</script>
<style>
.phoneActionButton {
	margin-top: 1.8%;
}
</style>
