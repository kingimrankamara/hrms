<template>
    <div>
        <Titlebar title="Edit Department"/>
        <v-container>
            <v-row>
                <v-col md="8" class='offset-md-2'>
                   <v-form>
                        <v-row>
                            <v-col cols="12" md="6">
                            <v-text-field
                                v-model="editedItem.name"
                                label="Subject name"
                            ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                            <v-text-field
                                v-model="editedItem.startedDate"
                                label="Started Date"
                            ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-textarea
                                    v-model="editedItem.description"
                                    label="Description"
                                ></v-textarea>
                            </v-col>                            
                            <v-col cols="12" md="6">
                                <v-combobox
                                v-model="editedItem.teachers"
                                :items="teachersOptions"
                                label="Teachers"
                                dense
                                outlined 
                                :rules="required" 
                                multiple
                                ></v-combobox>
                            </v-col>
                            
                           
                    </v-row>
                    <v-btn color="primary">
                        Save <v-icon>mdi-kite</v-icon>
                    </v-btn>
                   </v-form>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
     import Titlebar from "../../components/default/Titlebar.vue";
export default {
    components:{Titlebar},
    data() {
        return {
            //temp
            subjects:[],
            name:"",
            dateStarted:null,
            description:"",
            teachers:[],
            editedItem:{
                name:"",
                dateStarted:null,
                description:"",
                teachers:[],
            },
            teachersOptions: [
			{ value: "62e93e7c5d2aec1c44a7a64d", text: "Mr Kamara image" },
			{ value: "62e93e7c5d3aec1c44a7a64d", text: "Mr Kamara image2" },
			{ value: "62e93e7c5d2aecr1c44a7a64d", text: "Mr Kamara 3" },
			],

            subjectsOptions: [
			{ value: "62e93e7c5d2aec1c44a7a64d", text: "Mathematics" },
			{ value: "62e93e7c5d3aec1c44a7a64d", text: "Language Art" },
			{ value: "62e93e7c5d2aecr1c44a7a64d", text: "English 3" },
			],

            required: [
            v => !!v || 'This field is required',
            ],
        }
    },
    computed: {
        id(){
            return this.$route.params.id
        }
    },
}
</script>