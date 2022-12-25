<template>
    <div v-if="selected">
    <v-container >
        <div class="page" >
            <div class="institution">
                <div class="logo">
                    <img
                    src='/pp.png'
                    class="responsive-img"
                    />
                </div>
                <div class="name mt-3" v-if="company">
                    {{company.name}}
                </div>
            </div>
            <br>
            <div class="center doc-title">Staff Information</div>

            <v-row class="mt-20">
                <v-col cols="3">
                    <ul class="u-list">
                        <li>Staff ID</li>
                        <li>ID</li>
                        <li>Name</li>
                        <li>Father's Name</li>
                        <li>Mothers's Name</li>
                        <li>Place of Birth</li>
                        <li>DOB</li>
                        <li>Gender</li>
                        <li>Role</li>
                        <li>Employment Date</li>
                        <li>Departmetn</li>
                    </ul>
                </v-col>

                <v-col cols="5">
                    <ul class="u-list">
                        <li>: {{selected.staffId}}</li>
                        <li>: {{id}}</li>
                        <li>: {{selected.firstName}} <span v-if="selected.middleName">{{selected.middleName}}</span> {{selected.lastName}}</li>
                        <li>: {{selected.fathersName}}</li>
                        <li>: {{selected.mothersName}}</li>
                        <li>: Freetown</li>
                        <li>: {{selected.dob}}</li>
                        <li>: {{selected.gender}}</li>
                        <li>: {{selected.jobTitle}}</li>
                        <li>: {{selected.dateStarted}}</li>
                        <li>: {{selected.department.name}}</li>
                    </ul>
                </v-col>
                <v-col cols="3" class="h-200">
                    <img
                    class="responsive-img"
                    :src="baseUrl+'/'+selected.pp"
                    />
                </v-col>
            </v-row>
           <div class="info-text pa-5">
            <p>
                The one whose identity is written above is a staff at <span v-if="company">{{company.name}}</span>
            </p>
            <p class="mt-5">
                This document is valid for a period of 3 months
            </p>
           </div>
           <div class="stamp-area"></div>
        <footerVue/>
        
        </div>
    </v-container>
</div>
</template>
<script>
import Schoollogo from "../schoollogo.vue"
import footerVue from './footer.vue';
export default {
    components:{footerVue,Schoollogo},
    props:['selected'],
    computed: {
        company(){
            return this.$store.getters['management/getCompany'];
        },
        baseUrl(){
            return this.$store.getters['management/baseUrl'];
        }
    },
   
}
</script>