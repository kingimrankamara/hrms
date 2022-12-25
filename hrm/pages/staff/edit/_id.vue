<template>
    <div>
        <v-container v-if="editedItem">
            <v-form ref="form" v-model="valid" >
                <v-row>
                    <v-col cols="12" sm="4" md="3">
                        <v-img
                    :src="preview"
                    aspect-ratio="0.9"
                    >
                    <v-file-input  
                        class="d-none"
                        v-model="image"
                        id="fileUpload" 
                        type="file" hidden 
                        @change="preview_image" 
                        accept='image/x-png,image/gif,image/jpeg'/>
                    <v-btn icon color="primary" @click="chooseFiles">
                        <v-icon>mdi-camera</v-icon>
                    </v-btn>
                </v-img>
                    </v-col>
                    <v-col cols="12" sm="8" md="8">
                        <v-row>
                            <v-col cols="12" md="4" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="editedItem.firstName"
                                    :rules="required"
                                    label="First Name"
                                    outlined
                                    required
                                    dense
                                 ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="editedItem.middleName"
                                    label="Middle Name"
                                    outlined
                                    dense
                                 ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="editedItem.lastName"
                                    :rules="required"
                                    label="Last Name"
                                    outlined
                                    required
                                    dense
                                 ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                                <DatePicker dateTitle="DOB"  @update:option="getDob"/>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-combobox
                                v-model="editedItem.gender"
                                :items="genderOption"
                                label="Gender"
                                dense
                                outlined  
                                ></v-combobox>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="editedItem.email"
                                    :rules="emailRules"
                                    label="Email"
                                    outlined
                                    dense
                                 ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="editedItem.phone"
                                    :rules="required"
                                    label="Phone"
                                    outlined
                                    dense
                                 ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="8" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="editedItem.address"
                                    :rules="required"
                                    label="Address"
                                    outlined
                                    dense
                                 ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>

                    <v-col cols="12">
                        <v-row>
                            <v-col cols="12" md="3" sm="6">
                               <DatePicker dateTitle="Date Started"  @update:option="getdate"/>
                            </v-col>

                            <v-col cols="12" md="3" sm="6">
                                <v-combobox
                                    v-model="editedItem.department"
                                    :items="departmentOptions"
                                    label="Departments"
                                    dense
                                    outlined  
                                ></v-combobox>
                            </v-col>

                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="editedItem.experience"
                                    :rules="required"
                                    label="Years Of Experience"
                                    outlined
                                    dense
                                    type="number"
                                 ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="editedItem.bloodGroup"
                                    :rules="required"
                                    label="Blood Group"
                                    outlined
                                    dense
                                 ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="editedItem.jobTitle"
                                    :rules="required"
                                    label="Job Title"
                                    outlined
                                    dense
                                 ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="editedItem.grade"
                                    :rules="required"
                                    label="Employee Grade"
                                    outlined
                                    dense
                                    type="number"
                                 ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="3" sm="6">
                                <v-combobox
                                    v-model="editedItem.employmentType"
                                    :items="emTypeOptions"
                                    label="Employment Type"
                                    dense
                                    outlined  
                                ></v-combobox>
                            </v-col>

                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="editedItem.salary"
                                    :rules="required"
                                    label="Salary"
                                    outlined
                                    dense
                                    type="number"
                                 ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="editedItem.allowance"
                                    :rules="required"
                                    label="Allowance"
                                    outlined
                                    dense
                                    type="number"
                                 ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" v-if="editedItem.emergencyContact">
                        <h2>Primary Emergency Contact</h2>
                        <v-row class="mt-3">
                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="editedItem.emergencyContact[0].e1.name"
                                    :rules="required"
                                    label="Name"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="editedItem.emergencyContact[0].e1.phone"
                                    :rules="required"
                                    label="Phone"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="editedItem.emergencyContact[0].e1.email"
                                    :rules="emailRules"
                                    label="Email"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="editedItem.emergencyContact[0].e1.occupation"
                                    :rules="required"
                                    label="Occupation"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="editedItem.emergencyContact[0].e1.relationship"
                                    :rules="required"
                                    label="Relationship"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="9" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="editedItem.emergencyContact[0].e1.address"
                                    :rules="required"
                                    label="Address "
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>

                    <v-col cols="12" v-if="editedItem.emergencyContact">
                        <h2>Second Emergency Contact</h2>
                        <v-row class="mt-3">
                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="editedItem.emergencyContact[0].e2.name"
                                    label="Name"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="editedItem.emergencyContact[0].e2.phone"
                                    
                                    label="Phone"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="editedItem.emergencyContact[0].e2.email"
                                    :rules="emailRules"
                                    label="Email"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="editedItem.emergencyContact[0].e2.occupation"
                                    label="Occupation"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="editedItem.emergencyContact[0].e2.relationship"
                                    label="Relationship"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="9" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="editedItem.emergencyContact[0].e2.address"
                                    label="Address "
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="9" sm="6">
                                <v-btn color="primary" @click="update">
                                    Update <v-icon class="ml-2">mdi-kite</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                   
                </v-row>
            </v-form>
        </v-container>
    </div>
</template>
<script>
    import DatePicker from "../../../components/default/DatePicker.vue"
export default {
    components:{DatePicker},
    data() {
        return {
            valid:false,
            genderOption:['Male', 'Female'],
            preview:'/placeholder.jpg',
            image:null,
            emTypeOptions: [
			"Permanent","Contract","Supporting Staff"
			],

         

            required: [
            v => !!v || 'This field is required',
            ],
            emailRules: [
                //v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],

        }
    },

    computed: {
        baseUrl(){
            return this.$store.getters['management/baseUrl']
        },
        editedItem(){
            let id =this.$route.params.id
            let staff = this.$store.getters['management/getStaffById'](id)
            let newStaff =Object.assign({}, staff)
            this.preview =this.baseUrl+'/'+newStaff.pp;
            return newStaff
        },
        staff(){
            return this.$store.getters['management/getStaffById'](this.id)
        },
        departmentOptions(){
           let data=[];
           let department= this.$store.getters['management/getDepartments'];
           if(department.length>0){
             department.forEach(d=>{
                data.push({ value:d._id, text:d.name},)
             })
           }
          return data;
        },
    },
    methods:{
        getdate(value){
            this.dateStarted =value
        },
        getDob(value){
            this.dob =value
        },
        chooseFiles: function() {
            document.getElementById("fileUpload").click()
        },
        preview_image() {  
            console.log("file")
            this.preview= URL.createObjectURL(this.image)
             //create img for upload
            this.createImage(this.image);
        },
        createImage(file) {  
        if (file !== undefined) {
            const fileName = file.name
            if (fileName.lastIndexOf('.') <= 0) {
            alert('please choose avalid file')
            }
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
            this.profile = fileReader.result
            })
            fileReader.readAsDataURL(file)
            }
        },
    update(){
        this.$refs.form.validate()

         //convert data
         function convertToFormData(data, formData, parentKey) {
            if(data === null || data === undefined) return null;
            formData = formData || new FormData();

            if (typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
              Object.keys(data).forEach(key => 
                convertToFormData(data[key], formData, (!parentKey ? key : (data[key] instanceof File ? parentKey : `${parentKey}[${key}]`)))
              );
            } else {
              formData.append(parentKey, data);
            }
            return formData;
          }
          let formData=(convertToFormData({pp:this.image}))  
        if(this.valid){
            
            this.$store.dispatch('management/updateStaff',{data:this.editedItem})
        }
    }

    }
}
</script>