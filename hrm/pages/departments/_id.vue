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
                                    class="text-uppercase"
                                    v-model="name"
                                    :rules="required"
                                    label="Name"
                                    outlined
                                    required
                                    dense
                                 ></v-text-field>
                            </v-col>
                            
                            <v-col cols="12" md="6">
                                <v-combobox
                                v-model="hod"
                                :items="teachersOptions"
                                label="HOD"
                                dense
                                outlined 
                                :rules="required" 
                                ></v-combobox>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-combobox
                                v-model="teachers"
                                :items="teachersOptions"
                                label="Teachers"
                                dense
                                outlined 
                                multiple 
                                ></v-combobox>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-combobox
                                v-model="subjects"
                                :items="subjectsOptions"
                                label="Subject"
                                dense
                                outlined 
                                multiple 
                                :rules="required"
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
            subjects:[],
            name:"",
            teachers:[],
            hod:'',
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
       
    },
}
</script>