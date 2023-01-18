<template>
    <div>
      <Loading/>
      <SnackBarVue/>
        <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      flat
    >
   <div v-if="user">
    <userAvatarVue />
      <AdminNavList v-if="user.role=='Admin'" />
      <staffNavListVue v-else/>
   </div>
      <v-list v-if="false">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact 
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      flat
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" light/>
    </v-app-bar>
    </div>
</template>

<script>
  import userAvatarVue from './default/userAvatar.vue';
  import AdminNavList from './default/AdminNavList.vue';
  import staffNavListVue from './default/staffNavList.vue';
  import Loading from'./Loading.vue'
  import SnackBarVue from './SnackBar.vue';
    export default {
      name: 'DefaultLayout',
      components:{userAvatarVue,AdminNavList,staffNavListVue,Loading,SnackBarVue},
      data () {
        return {
          clipped: false,
          drawer: false,
          fixed: false,
          items: [
            {
              icon: 'mdi-apps',
              title: 'Welcome',
              to: '/'
            },
            {
              icon: 'mdi-chart-bubble',
              title: 'Inspire',
              to: '/inspire'
            }
          ],
          miniVariant: false,
          right: true,
          rightDrawer: false,
          title: 'Vuetify.js'
        }
      },

      computed: {
        user(){
            return this.$store.getters['account/getUser']
        },
	    },
      mounted() {
       
            let authToken = window.localStorage.getItem("authToken");
            let token =JSON.parse(authToken)
            if(token){
              //let data =JSON.parse(authToken)
              if(token.token){
                this.$store.dispatch('account/verifyToken',token);
              }else this.$router.push('/login') 
            }else this.$router.push('/login')      
      },
      
      watch: {
        user(val){
          if(val == null || val == undefined){
           this.$router.push('/login') 
          }
          
        }
	    },
    }
    </script>
    