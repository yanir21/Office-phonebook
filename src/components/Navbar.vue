<template>
	<div>
		<v-app-bar :clipped-right="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer" />
			<v-toolbar-title style="width: 300px" class="ml-0 pl-4">
				<span class="hidden-sm-and-down">ספר טלפונים משרדי</span>
			</v-toolbar-title>
		</v-app-bar>
		<v-navigation-drawer
			:right="true"
			v-model="drawer"
			:clipped="$vuetify.breakpoint.lgAndUp"
			app
		>
			<v-list dense>
				<template v-for="item in items">
					<v-row v-if="item.heading" :key="item.heading" align="center">
						<v-col cols="6">
							<v-subheader v-if="item.heading">
								{{ item.heading }}
							</v-subheader>
						</v-col>
						<v-col cols="6" class="text-center">
							<a href="#!" class="body-2 black--text">EDIT</a>
						</v-col>
					</v-row>
					<v-list-group
						v-else-if="item.children"
						:key="item.text"
						v-model="item.model"
						:prepend-icon="item.model ? item.icon : item['icon-alt']"
						append-icon=""
					>
						<template v-slot:activator>
							<v-list-item-content>
								<v-list-item-title>
									{{ item.text }}
								</v-list-item-title>
							</v-list-item-content>
						</template>
						<v-list-item v-for="(child, i) in item.children" :key="i" link>
							<v-list-item-action v-if="child.icon">
								<v-icon>{{ child.icon }}</v-icon>
							</v-list-item-action>
							<v-list-item-content>
								<v-list-item-title>
									{{ child.text }}
								</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list-group>
					<v-list-item v-else :key="item.text" link>
						<v-list-item-action>
							<v-icon>{{ item.icon }}</v-icon>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>
								{{ item.text }}
							</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</template>
			</v-list>
		</v-navigation-drawer>
	</div>
</template>

<script>
export default {
	data() {
		return {
			drawer: false,
			items: [{ icon: 'mdi-contacts', text: 'כל אנשי הקשר' }]
		};
	}
};
</script>
