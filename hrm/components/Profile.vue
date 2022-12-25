<template>
    <div>
        <v-container v-if="user">
            <v-form>
                <v-row>
                    <v-col cols="12">
                        <v-card class="pa-2 light" flat>
                            <v-row>
                                <v-col cols="12" sm="6" md="3">
                                    <v-img
                                        :src="baseUrl+'/'+user.pp"
                                        aspect-ratio="0.9"
                                        >
                                       
                                       
                                    </v-img>
                                </v-col>
                                 <v-col cols="12" sm="6" md="8">
                                    <v-row>
                                        <v-col cols="9" >
                                            <h1 class="primary--text">{{user.firstName}} <span v-if="user.middleName">{{user.middleName}}</span> 
                                            <span>{{user.lastName}}</span>
                                            </h1>
                                        </v-col>
                                        <v-col cols="4" md="3">
                                            <v-btn color="info" @click="logout" outlined class="mt-1">Logout</v-btn> <v-icon>mdi-signout</v-icon>
                                        </v-col>

                                        <v-col cols="4" >
                                            <span class="primary--text">DOB:</span>{{user.dob}}
                                        </v-col>
                                       
                                        <v-col cols="6" md="4">
                                            <span class="success--text">Gender: </span>{{user.gender}}
                                        </v-col>
                                        <v-col cols="6" md="4">
                                            <span class="success--text"><v-icon color="success">mdi-phone</v-icon> : </span>{{user.phone}}
                                        </v-col>
                                        <v-col cols="8" >
                                            <span class="success--text"><v-icon color="success">mdi-mail</v-icon> : </span>{{user.email}}
                                        </v-col>
                                        <v-col cols="4" > 
                                            <span class="success--text">Grade: </span>{{user.grade}}
                                        </v-col>
                                        <v-col cols="12" md="6" > 
                                            <span class="success--text">Role: </span>{{user.jobTitle}}
                                        </v-col>
                                        <v-col cols="12"  md="6"> 
                                            <span class="success--text">Department: </span>{{user.department.name}}
                                        </v-col>
                                        
                                       
                                        
                                       
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>

                </v-row>
            </v-form>
        </v-container>
    </div>
</template>
<script>
    import DatePicker from "./default/DatePicker.vue"
export default {
    components:{DatePicker},
    data() {
        return {
           

        }
    },

    computed: {
        baseUrl(){
            return this.$store.getters['management/baseUrl']
        },
        user(){
          return this.$store.getters['account/getUser'];
        },
    },
    methods:{
        logout(){
            this.$store.dispatch("account/logout");
        }
    }
}
</script>