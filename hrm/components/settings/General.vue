<template>
    <div>
        <v-container>
            <h1>General Settings</h1>
            <v-form>
                <v-row>
                    <v-col cols="4" sm="4" md="2">
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
                <small class="text-primary">LOGO/BADGE</small>
                    </v-col>
                    <v-col cols="12" sm="8" md="10">
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="name"
                                    :rules="required"
                                    label="School Name"
                                    outlined
                                    required
                                    dense
                                 ></v-text-field>
                            </v-col>
                            
                            <v-col cols="12" md="4">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="email"
                                    :rules="required"
                                    label="Email"
                                    outlined
                                    required
                                    dense
                                 ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="phone"
                                    :rules="required"
                                    label="Phone Number"
                                    outlined
                                    required
                                    dense
                                 ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <DatePicker dateTitle="Date Founded"  @update:option="getDob"/>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-form>
        </v-container>
    </div>
</template>
<script>
export default {
    data() {
        return {
            valid:false,
            name:'',
            logo:null,
            phone:'',
            email:"",
            preview:'/placeholder.jpg',
            image:null,
            ///clock-in n out
            required: [
            v => !!v || 'This field is required',
            ],
            emailRules: [
                //v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
        }
    },

    methods: {
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
          this.logo = fileReader.result
        })
        fileReader.readAsDataURL(file)
        }
    },
    },
}
</script>