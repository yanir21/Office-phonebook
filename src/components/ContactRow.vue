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
			<v-flex xs3>{{ mail }}</v-flex>
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
