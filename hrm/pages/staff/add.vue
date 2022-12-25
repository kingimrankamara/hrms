<template>
    <div>
        <v-container>
            <Titlebar title="Add Staff"/>
            <Admission/>
        </v-container>
    </div>
</template>
<script>
    import Admission from "../../components/AddStaff.vue"
    import Titlebar from "../../components/default/Titlebar.vue";
export default {
    name:'StudentList',
    components:{Titlebar,Admission},
    data() {
        return {
            
        }
    },
}
</script>