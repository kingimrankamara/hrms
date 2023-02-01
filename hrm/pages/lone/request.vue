<template>
    <div>
        <v-container>
            <v-row>
                <v-col md="8" class='offset-md-2' v-if="canTakeLeave">
                   <v-form ref="form" v-model="valid">
                    <v-row> 

                            <v-col cols="12" >
                                <v-text-field
                                    v-model="amount"
                                    :rules="required"
                                    type="number"
                                    label="Amount"
                                    outlined
                                    required
                                    dense
                                />
                            </v-col>   
                            
                            <v-col cols="12" >
                                <v-textarea
                                    class="text-uppercase"
                                    v-model="message"
                                    :rules="required"
                                    label="Purpose"
                                    outlined
                                    required
                                    dense
                                 ></v-textarea>
                            </v-col>
                           
                    </v-row>
                    <v-btn color="primary" @click="request">
                        Send Request <v-icon>mdi-kite</v-icon>
                    </v-btn>
                   </v-form>
                </v-col>
                <v-col md="8" class='offset-md-2'  v-else>
                    <div v-if="user" class="pa-5 mt-5">
                        Hi {{ user.lastName }}, you need to have worked with us for at list three month before you can be eligible for a lone
                    </div>
                </v-col>
            </v-row>

            <v-snackbar
                v-model="snackbar"
                >
                {{ text }}

            <template v-slot:action="{ attrs }">
                <v-btn
                color="success"
                text
                v-bind="attrs"
                @click="snackbar = false"
                >
                Close
                </v-btn>
            </template>
            </v-snackbar>
        </v-container>
    </div>
</template>
<script>

export default {
    data() {
        return {
            snackbar:false,
            text: `SUCCESS: Lone request submited`,
            amount:null,
            valid:false,
            message:'',
            required: [
            v => !!v || 'This field is required',
            ],
        }
    },
    computed: {
        redirect(){
            return this.$store.getters['settings/getRedirect']
        },
        user(){
            return this.$store.getters['account/getUser']
        },
        canTakeLeave(){
            if(this.user){
                let dateStarted = new Date(this.user.dateStarted);
                const currentDate = new Date();
                const difference = currentDate.getTime() - dateStarted.getTime();
                const threeMonths = 90 * 24 * 60 * 60 * 1000;

                if(difference >= threeMonths){
                    return true
                }else return false
            }
        }
    },
    methods: {
        request(){
            this.$refs.form.validate()
           

            if(this.valid){
            let data={
                requestedBy:{_id:this.user._id},
                amount:this.amount,
                message:this.message
            }
            this.$store.dispatch('management/requestLone',data);
        }
        },
       
    },
    watch: {
        redirect(val){
            if(val){
                this.$store.dispatch("settings/setRedirect",false)
                this.$refs.form.reset()
                this.snackbar=true
            }
        }
    },
}
</script>