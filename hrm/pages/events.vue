<template>
    <v-container>
        <div class="mt-5 mb-5 pl-2">
            <h2>Calendar</h2>
        </div>
        <Ecalender/>
    </v-container>
</template>
<script>
import Ecalender from"../components/default/Events.vue"
export default {
    components:{Ecalender}
}
</script>