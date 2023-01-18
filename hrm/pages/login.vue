<template>
    <div>
        <v-container>
            
                <v-row>
                <v-col cols="12" sm="10" class="offset-sm-1">
                    <v-card>
                        <v-card-text>
                    <v-row>
                        <v-col cols="12" sm="6" class="primary light">
                           <div class="center">
                            <h1 class="mb-5">{{title}}</h1>
                            
                            
                           </div>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-form>
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="staffId"
                                    
                                    label="Staf ID"
                                    outlined
                                    dense
                                ></v-text-field>
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="password"
                                    
                                    label="Password"
                                    outlined
                                    dense
                                ></v-text-field>

                                <v-btn color="primary" dense @click="login">
                                    Login <v-icon>mdi-account</v-icon>
                                </v-btn>
                            </v-form>
                        </v-col>
                    </v-row>
                        </v-card-text>
                </v-card>
                </v-col>
                </v-row>
       
        </v-container>
    </div>
</template>
<script>
export default {
    data() {
        return {
            staffId:null,
            password:null,
            title:"Login",
            loginType:'Staff Login'
        }
    },
    computed: {
        user(){
            return this.$store.getters['account/getUser']
        }
	},
    methods: {
        
        login(){
           let  data={
            staffId:this.staffId,
            password:this.password
            }
            this.$store.dispatch("account/staffLogin",data);
        }
    },
    watch: {
		user(val){
			if(val){
				this.$router.push('/') 
			}
			
		}
	  },
}
</script>