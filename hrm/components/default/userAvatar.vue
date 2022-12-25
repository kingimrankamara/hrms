<template>
    <div class="pt-4 pl-2" v-if="user">
       <v-row class="align-center pb-3">
        <v-col cols="3">
            <v-avatar
            color="primary"
            size="46"
            
            >
            <img :src="baseUrl+'/'+user.pp" :alt='user.FirstName +" "+user.middleName '/>
        </v-avatar>
        </v-col>
        <v-col cols="9" class="cap primary--text">
            <span>{{user.FirstName}}</span> <span v-if="user.middleName">{{user.middleName}}</span>
            <span>{{user.middleName}}</span>
        </v-col>
        
       </v-row>
       <v-divider></v-divider>
    </div>
</template>
<script>
export default {
    computed: {
        baseUrl(){
            return this.$store.getters['management/baseUrl']
        },
        user(){
          return this.$store.getters['account/getUser'];
        },
    },
}
</script>