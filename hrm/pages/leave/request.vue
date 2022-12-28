<template>
    <div>
        <v-container>
            <v-row>
                <v-col md="8" class='offset-md-2'>
                   <v-form ref="form" v-model="valid">
                    <v-row> 
                            <v-col cols="12" >
                                <v-combobox
                                v-model="leaveType"
                                :items="leaveTypeOptions"
                                label="Leave Type"
                                dense
                                outlined 
                                ></v-combobox>
                            </v-col>

                            
                            <v-col cols="12" sm="6">
                                 <DatePicker :dateTitle="startDateLabel"  @update:option="getEndDate"/>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <DatePicker :dateTitle="endDateLabel"  @update:option="getstartDate"/>
                            </v-col>
                            <v-col cols="12" >
                                <v-textarea
                                    class="text-uppercase"
                                    v-model="description"
                                    :rules="required"
                                    label="Description"
                                    outlined
                                    required
                                    dense
                                 ></v-textarea>
                            </v-col>
                           
                    </v-row>
                    <v-btn color="primary" @click="save">
                        Send Request <v-icon>mdi-kite</v-icon>
                    </v-btn>
                   </v-form>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
    import DatePicker from "../../components/default/DatePicker.vue"

export default {
    components:{DatePicker},
    data() {
        return {
            endDate:'End Date',
            valid:false,
            startDateLabel:"Start Date",
            endDateLabel:"End Date",
            startDate:null,
            leaveType:"",
            description:'',
            leaveTypeOptions: [
			"Personal Leave","Sick Leave","Emergency Leave", "Maternal Leave"
			],

           

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
        }
    },
    methods: {
        save(){
            this.$refs.form.validate()
            let sd=false
            let ed=false;
            if(this.startDate == null){
                this.startDateLabel="Leave Starting date is required"
            }else if(this.endDate == null){
                this.endDateLabel="Leave ending date is required"
            }
            else{
                sd=true
                ed=true;  
            }

            if(this.valid & sd & ed){
            let data={
                leaveType:this.leaveType,
                requestedBy:this.user._id,
                startDate:this.startDate,
                endDate:this.endDate,
                description:this.description
            }
            this.$store.dispatch('management/requestLeave',data);
        }
        },
        getEndDate(value){
            this.endDate =value
        },
        getstartDate(value){
            this.startDate =value
        },
    },
    watch: {
        redirect(val){
            if(val){
                this.$store.dispatch("settings/setRedirect",false)
                this.$refs.form.reset()
            }
        }
    },
}
</script>