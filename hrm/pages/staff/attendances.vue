<template>
    <div>
        <v-container>
            <Titlebar title="Attendance"/>
            <StaffAttendanceVue/>
        </v-container>
    </div>
</template>
<script>
import StaffAttendanceVue from "../../components/default/StaffAttendance.vue";
import Titlebar from "../../components/default/Titlebar.vue";
export default {
    name:'StudentList',
    components:{StaffAttendanceVue,Titlebar},
    data() {
        return {
            
        }
    },
}
</script>