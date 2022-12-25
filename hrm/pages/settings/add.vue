<template>
    <div>
        <v-container>
            <v-row>
                <v-col md="8" class='offset-md-2'>
                   <v-form ref="form" v-model="valid">
                    <v-row>
                       <v-col md="6" cols="12">
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
                       <v-col md="6" cols="12">
                        <v-row>
                            <v-col cols="12">
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
                        <v-col cols="6">
                            <DatePicker dateTitle="Founded Date"  @update:option="getFD"/>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                class="text-uppercase"
                                v-model="motto"
                                label="Slogan/Motto"
                                outlined
                                required
                                dense
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <v-combobox
                                v-model="md"
                                :items="staff"
                                label="Managing Director"
                                dense
                                outlined 
                            ></v-combobox>
                        </v-col>

                        <v-col cols="12">
                            <v-textarea
                                class="text-uppercase"
                                v-model="description"
                                label="Description"
                                outlined
                                required
                                dense
                            ></v-textarea>
                        </v-col>
                        </v-row>
                       </v-col>
                    </v-row>
                    <v-btn color="primary" @click="save">
                        Save <v-icon>mdi-kite</v-icon>
                    </v-btn>
                   </v-form>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import DatePicker from'../../components/default/DatePicker.vue'
export default {
    components:{
        DatePicker
    },
    data() {
        return {
            valid:false,
            description:"",
            name:"",
            motto:"",
            teachers:[],
            md:'',
            foundedDate:null,
            image:null,
            preview:'/placeholder.jpg',
            required: [
            v => !!v || 'This field is required',
            ],
        }
    },
    computed: {
        staff(){
          let staff =this.$store.getters['management/getStaff']
          let data=[]
           if(staff.length>0){
            staff.forEach(st=>{
             data.push({ value: st._id, text:st.staffId + '/'+ st.firstName +" " +st.lastName},)
           })
           }
          
           return data
        },
    },

    methods: {
        getFD(value){
            this.foundedDate =value
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
          let formData=(convertToFormData({pp:this.image})) ;
          let data={
            md:{_id:this.md},
            name:this.name,
            description:this.description,
            motto:this.motto,
            foundedDate:this.foundedDate
          } 
        if(this.valid & this.foundedDate !=null & this.image != null){
            this.$store.dispatch('management/companySetup',{data,pp:formData})
        }
    }
    },
}
</script>