<template>
    <v-container>
        <div class="mt-5 mb-5 pl-2">
            <h2>Events</h2>
        </div>
        <Events/>
    </v-container>
</template>
<script>
import Ecalender from"../components/default/Events.vue"
import Events from"../components/Events.vue"
export default {
    components:{Ecalender,Events}
}
</script>