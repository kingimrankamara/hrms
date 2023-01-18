<template>
    <div>
        <v-snackbar
                v-model="snackAlert.value"
                timeout="0"
                elevation-4
                >
                {{ snackAlert.text }}

            <template v-slot:action="{ attrs }">
                <v-btn
                color="snackAlert.color"
                text
                v-bind="attrs"
                @click="setSnack"
                >
                Close
                </v-btn>
            </template>
            </v-snackbar>
    </div>
</template>
<script>
export default {
    data() {
        return {
            snack:false
        }
    },
    computed: {
        snackAlert(){
            return this.$store.getters['management/snackAlert']
        }
    },
    methods: {
        setSnack(){
            this.$store.dispatch('management/setSnackAlert',{
                text:'',
                color:"red",
                value:false})
        }
    },
}
</script>