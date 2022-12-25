<template>
    <div>
        <v-container>
            <v-form>
                <v-row>
                    <v-col cols="12" sm="6" md="3">
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
                    <v-col cols="12" sm="6" md="8">
                        <v-row>
                            <v-col cols="12" md="6">
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
                            <v-col cols="12" md="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="middleName"
                                    label="Middle Name"
                                    outlined
                                    dense
                                 ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
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
                            <v-col cols="12" md="6">
                                <DatePicker dateTitle="DOB"  @update:option="getDob"/>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-combobox
                                v-model="gender"
                                :items="genderOption"
                                label="Gender"
                                dense
                                outlined  
                                ></v-combobox>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="email"
                                    :rules="emailRules"
                                    label="Email"
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
                                    v-model="program"
                                    :items="programOptions"
                                    label="Programs"
                                    dense
                                    outlined  
                                ></v-combobox>
                            </v-col>

                            <v-col cols="12" md="3" sm="6">
                                <v-combobox
                                    v-model="grade"
                                    :items="gradeoptions"
                                    label="Grade/Form"
                                    dense
                                    outlined  
                                ></v-combobox>
                            </v-col>

                            <v-col cols="12" md="3" sm="6">
                                <v-combobox
                                    v-model="gradeStarted"
                                    :items="gradeoptions"
                                    label="Grade Started"
                                    dense
                                    outlined  
                                ></v-combobox>
                            </v-col>
                        </v-row>
                    </v-col>

                    <v-col cols="12">
                        <h2>Mother/First Guardian</h2>
                        <v-row class="mt-3">
                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="p1name"
                                    :rules="required"
                                    label="Name"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="p1phone"
                                    :rules="required"
                                    label="Phone"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="p1email"
                                    :rules="emailRules"
                                    label="Email"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="p1occupation"
                                    :rules="required"
                                    label="Occupation"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="p1relationship"
                                    :rules="required"
                                    label="Relationship"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="9" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="p1address"
                                    :rules="required"
                                    label="Address "
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>

                    <v-col cols="12">
                        <h2>Father/second Guardian</h2>
                        <v-row class="mt-3">
                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="p2name"
                                    label="Name"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="p2phone"
                                    
                                    label="Phone"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="p2email"
                                    :rules="emailRules"
                                    label="Email"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="p2occupation"
                                    
                                    label="Occupation"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="p2relationship"
                                    
                                    label="Relationship"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="9" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="p2address"
                                    
                                    label="Address "
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col>
                        <v-btn color="primary" large>
                            Save <v-icon>mdi-kite</v-icon>
                        </v-btn>
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
            firstName:"",
            lastName:"",
            middleName:"",
            dob:null,

            profile:null,
            image:null,
            pp:'',
            gender:'',
            genderOption:['Male', 'Female'],
            email:'',
            preview:'/placeholder.jpg',

            gradeoptions: [
			{ value: "Male", text: "Male" },
			{ value: "Female", text: "Female" },
			],
            programOptions: [
			{ value: "jss1", text: "JSS1" },
			{ value: "jss2", text: "JSS2" },
			{ value: "JSS3", text: "JSS3" },
			],

            dateStarted:null,
            grade:null,
            admNumb:"",
            gradeStarted:"",
            program:null,
            p1city: "Freetown",
            p1region:  "Wester Urban",
            p1address: "",
            p1country: "Sierra Leone",

            p2city: "Freetown",
            p2region: "Wester Urban",
            p2address: "",
            p2country: "Sierra Leone",


            p1name:"",
            p1occupation:"",
            p1relationship:"",
            p1phone:"",
            p1email:"",
            p1address:"",

            p2name:"",
            p2occupation:"",
            p2relationship:"",
            p2phone:"",
            p2email:"",
            p2address:"",

            required: [
            v => !!v || 'This field is required',
            ],
            emailRules: [
                //v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],

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
    addStudent(){
        this.$refs.verified
        if(valid){

            let data={
				firstName:this.firstName,
				lastName: this.lastName,
				middleName:this.middleName,
				dateStarted: this.dateStarted,
				dob:this.dob,
				phone:this.phone,
				grade: {
					_id: this.grade
				},
				admNumb:this.admNumb,
				gradeStarted: {
					_id:this.grade
				},
				programs:[
					{program:{_id:this.program}}
				],
				parent: {
					p1: {
						name: this.p1name,
						phone: this.p1phone,
						email:this.p1email,
						occupation:this.p1occupation,
						relationship: this.p1relationship,
						address: {
							city: this.p1city,
							region: this.p1region,
							address: this.p1address,
							country: this.p1country
						}
					},

					p2: {
						name: this.p2name,
						phone: this.p2phone,
						email:this.p2email,
						occupation:this.p2occupation,
						relationship: this.p2relationship,
						address: {
							city: this.p2city,
							region: this.p2region,
							address: this.p2address,
							country: this.p2country
						}
					}
				}
			}
        }
    }

    }
}
</script>