<template>
    <div>
        <v-container>
            <v-form ref="form" v-model="valid">
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
                        :rules="required"
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
                                    v-model="firstName"
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
                                    v-model="middleName"
                                    label="Middle Name"
                                    outlined
                                    dense
                                 ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="lastName"
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
                                v-model="gender"
                                :items="genderOption"
                                :rules="required"
                                label="Gender"
                                dense
                                outlined  
                                ></v-combobox>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="email"
                                    :rules="emailRules"
                                    label="Email"
                                    outlined
                                    dense
                                 ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="phone"
                                    :rules="required"
                                    label="Phone"
                                    outlined
                                    dense
                                 ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="8" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="address"
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
                                    v-model="department"
                                    :items="departmentOptions"
                                    label="Departments"
                                    :rules="required"
                                    dense
                                    outlined  
                                ></v-combobox>
                            </v-col>

                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="experience"
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
                                    v-model="bloodGroup"
                                    :rules="required"
                                    label="Blood Group"
                                    outlined
                                    dense
                                 ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="jobTitle"
                                    :rules="required"
                                    label="Job Title"
                                    outlined
                                    dense
                                 ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="grade"
                                    :rules="required"
                                    label="Employee Grade"
                                    outlined
                                    dense
                                    type="number"
                                 ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="3" sm="6">
                                <v-combobox
                                    v-model="employmentType"
                                    :items="emTypeOptions"
                                    :rules="required"
                                    label="Employment Type"
                                    dense
                                    outlined  
                                ></v-combobox>
                            </v-col>

                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="salary"
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
                                    v-model="allowance"
                                    :rules="required"
                                    label="Allowance"
                                    outlined
                                    dense
                                    type="number"
                                 ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>

                    <v-col cols="12">
                        <h2>Primary Emergency Contact</h2>
                        <v-row class="mt-3">
                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="e1name"
                                    :rules="required"
                                    label="Name"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="e1phone"
                                    :rules="required"
                                    label="Phone"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="e1email"
                                    :rules="emailRules"
                                    label="Email"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="e1occupation"
                                    label="Occupation"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="e1relationship"
                                    :rules="required"
                                    label="Relationship"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="9" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="e1address"
                                    :rules="required"
                                    label="Address "
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>

                    <v-col cols="12">
                        <h2>Second Emergency Contact</h2>
                        <v-row class="mt-3">
                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="e2name"
                                    label="Name"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="e2phone"
                                    
                                    label="Phone"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="e2email"
                                    label="Email"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="e2occupation"
                                    label="Occupation"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="e2relationship"
                                    label="Relationship"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="9" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="e2address"
                                    label="Address "
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="9" sm="6">
                                <v-btn color="primary" @click="save">
                                    Save <v-icon class="ml-2">mdi-kite</v-icon>
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
    import DatePicker from "./default/DatePicker.vue"
export default {
    components:{DatePicker},
    data() {
        return {
            valid:false,
            firstName:"",
            lastName:"",
            middleName:"",
            dob:null,
            employmentType:null,
            address:"",
            profile:null,
            image:null,
            phone:"",
            address:"",
            jobTitle:"",
            pp:'',
            gender:'',
            genderOption:['Male', 'Female'],
            email:'',
            preview:'/placeholder.jpg',

            allowance:0,
            salary:0,
            gradeoptions: [
			{ value: "Male", text: "Male" },
			{ value: "Female", text: "Female" },
			{ value: "Others", text: "Others" },
			],
            departmentOption: [
			{ value: "Engineering", text: "Engineering" },
			{ value: "hr", text: "Human Resource" },
			{ value: "Security", text: "Security" },
            { value: "Accounting", text: "Accounting" },
			],
            emTypeOptions: [
			"Permanent","Temporal", "Contract", "Substitute"
			],

            experience:0,
            bloodGroup:"",
            dateStarted:null,
            grade:null,
            admNumb:"",
            gradeStarted:"",
            department:null,

            e1name:"",
            e1occupation:"",
            e1relationship:"",
            e1phone:"",
            e1email:"",
            e1address:"",

            e2name:"",
            e2occupation:"",
            e2relationship:"",
            e2phone:"",
            e2email:"",
            e2address:"",

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

        redirect(){
            return this.$store.getters['settings/getRedirect']
        },
        user(){
            return this.$store.getters['account/getUser']
        }
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
            if(this.image != null){
                this.preview= URL.createObjectURL(this.image)
                this.createImage(this.image);
            }
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
    save(){
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
        if(this.valid & this.dob !=null & this.image != null){

            let data={
				firstName:this.firstName,
				lastName: this.lastName,
				middleName:this.middleName,
				dateStarted: this.dateStarted,
				dob:this.dob,
				phone:this.phone,
                email:this.email,

                gender:this.gender,
                bloodGroup:this.bloodGroup,

                salary:this.salary,
                allowance:this.allowance,
                employmentType:this.employmentType,
                role:"Staff",
                jobTitle:this.jobTitle,
                address:this.address,
				department: {
					_id: this.department.value
				},
                experience:this.experience,
				admNumb:this.admNumb,
				grade:this.grade,
				emergencyContact: {
					e1: {
						name: this.e1name,
						phone: this.e1phone,
						email:this.e1email,
						occupation:this.e1occupation,
						relationship: this.e1relationship,
						address:this.e1address
					},

					e2: {
						name: this.e2name,
						phone: this.e2phone,
						email:this.e2email,
						occupation:this.e2occupation,
						relationship: this.e2relationship,
						address: this.e2address
					}
				}
			}

            this.$store.dispatch('management/addStaff',{data,pp:formData})
        }
    }

    },

    watch: {
        redirect(val){
            if(val){
                this.$store.dispatch("settings/setRedirect",false)
                this.$refs.form.reset();
                this.image=null;
                this.dob=null;
                this.dateStarted=null;
                this.preview='/placeholder.jpg';
            }
        }
    },

}
</script>