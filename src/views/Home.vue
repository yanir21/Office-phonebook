<template>
	<div>
		<v-content>
			<v-container fluid>
				<contacts-list></contacts-list>
			</v-container>
		</v-content>

		<v-btn bottom color="pink" dark fab fixed right @click="dialog = !dialog">
			<v-icon>mdi-plus</v-icon>
		</v-btn>
		<new-contact :dialog="dialog" @closed="dialog = false"></new-contact>
	</div>
</template>

<script>
import NewContact from '@/components/NewContact.vue';
import ContactsList from '@/components/ContactsList.vue';
export default {
	props: {
		source: String
	},
	components: {
		'new-contact': NewContact,
		'contacts-list': ContactsList
	},
	data: () => ({
		dialog: false
	})
};
</script>
