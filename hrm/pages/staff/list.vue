<template>
    <div>
        <v-container>
            <Titlebar title="Staff Table"/>
            <StaffTable/>
        </v-container>
    </div>
</template>
<script>
    import StaffTable from "../../components/default/StaffTable.vue"
    import Titlebar from "../../components/default/Titlebar.vue";
export default {
    name:'StudentList',
    components:{StaffTable,Titlebar},
    data() {
        return {
            
        }
    },
}
</script>