<template>
    <div>
        <v-container v-if="company">
            <v-row>
                <v-col md="8" class='offset-md-2'>
                    <div>
                        <v-img
                            :src="baseUrl+'/'+company.logo"
                            max-height="1300"
                            max-width="800"
                            >
                        </v-img>
                    </div>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <h3>{{company.name}} <sub>{{company.foundedDate}}</sub></h3>
                            <h6>{{company.motto}}</h6>
                            <div class="mt-2">
                                {{company.description}}
                            </div>
                        </v-col>

                        <v-col cols="12" sm="6">
                            <div v-if="company.md">
                                {{company.md.firstname}}
                            </div>
                        </v-col>
                    </v-row>

                </v-col>
            </v-row>
            
        </v-container>
    </div>
</template>
<script>
export default {
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