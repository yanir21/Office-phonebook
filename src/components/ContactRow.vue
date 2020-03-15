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
			<v-flex> {{ number }} {{ extraNumbers }} </v-flex> {{ company }}
		</v-list-item-content>
	</v-list-item>
</template>

<script>
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
			return this.contact.numbers[0] ? `${this.contact.numbers[0].number}` : '';
		},
		extraNumbers() {
			const length = this.contact.numbers.length;
			return this.contact.numbers[0] && length > 1
				? length > 2
					? ` + ${this.contact.numbers.length - 1} נוספים`
					: ` + ${this.contact.numbers.length - 1} נוסף`
				: '';
		},
		company() {
			return this.contact.company ? ` ${this.contact.company}` : '';
		}
	}
};
</script>
