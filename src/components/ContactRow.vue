<template>
	<v-list-item :link="true">
		<v-list-item-avatar class="">
			<v-img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"></v-img>
		</v-list-item-avatar>
		<v-list-item-content>
			<v-list-item-title
				><h3>
					{{ fullName }}
				</h3></v-list-item-title
			>
			<v-flex xs5>
				<span class="phone">{{ number }}</span>
				<span class="extraPhones"> {{ extraphones }}</span>
			</v-flex>
			<v-flex xs4>{{ company }}</v-flex>
			<v-flex xs1>{{ mail }}</v-flex>
			<v-flex xs1><v-icon @click="deleteContact">mdi-trash-can-outline</v-icon></v-flex>
		</v-list-item-content>
	</v-list-item>
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
			return (
				this.contact.first_name +
				(this.contact.last_name ? ' ' + this.contact.last_name : '')
			);
		},
		number() {
			return this.contact.phones[0] ? `${this.contact.phones[0].number}` : '';
		},
		extraphones() {
			const length = this.contact.phones.length;
			return this.contact.phones[0] && length > 1
				? length > 2
					? `(+${this.contact.phones.length - 1} נוספים)`
					: `(+${this.contact.phones.length - 1} נוסף)`
				: '';
		},
		company() {
			return this.contact.company ? ` ${this.contact.company}` : '';
		},
		mail() {
			return this.contact.email ? this.contact.email : '';
		}
	},
	methods: {
		deleteContact() {
			const id = this.contact.id;
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
<style>
.phone {
	margin-left: 3%;
}
.extraPhones {
	color: gray;
	font-size: small;
}
</style>
