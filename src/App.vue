<template>
  <v-app>
<navbar></navbar>
<router-view></router-view>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'App',
  components:{
    'navbar':Navbar,
  },


  data: () => ({
    //
  }),
};
</script>
