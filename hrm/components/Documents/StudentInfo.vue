<template>
    <div v-if="selected">
    <v-container>
        <div class="page" >
            <div class="institution">
                <div class="logo">
                    <img
                    src='https://picsum.photos/250'
                    class="responsive-img"
                    />
                </div>
                <div class="name mt-3">
                    Goldent Software Sierra Leone Limited
                </div>
            </div>
            <br>
            <div class="center doc-title">Student Information</div>

            <v-row class="mt-20">
                <v-col cols="3">
                    <ul class="u-list">
                        <li>Student ID</li>
                        <li>ID</li>
                        <li>Name</li>
                        <li>Father's Name</li>
                        <li>Mothers's Name</li>
                        <li>Place of Birth</li>
                        <li>DOB</li>
                        <li>Gender</li>
                        <li>Program</li>
                        <li>Started Date</li>
                        <li>Departmetn</li>
                    </ul>
                </v-col>

                <v-col cols="5">
                    <ul class="u-list">
                        <li>: {{selected.studentId}}</li>
                        <li>: {{id}}</li>
                        <li>: {{selected.firstName +' '+ selected.lastName}}</li>
                        <li>: Victor Sankoh Kabia</li>
                        <li>: Mabinty Sesay</li>
                        <li>: Freetown</li>
                        <li>: 30/05/2002</li>
                        <li>: Male</li>
                        <li>: Senior Secondary School</li>
                        <li>: 02-10-2015</li>
                        <li>: Pure Science</li>
                    </ul>
                </v-col>
                <v-col cols="3" class="h-200">
                    <img
                    class="responsive-img"
                    src="https://picsum.photos/200"
                    />
                </v-col>
            </v-row>
           <div class="info-text pa-5">
            <p>
                The one whose identity is written above is a student at ____company name
            </p>
            <p class="mt-5">
                This document is valid for 2022-2023 academic year ____company name
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
    data() {
        return {
            
        }
    },
    methods: {
        
    },
}
</script>