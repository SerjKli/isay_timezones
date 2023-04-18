<template>
    <div class="timezone-item">
        <div class="timezone-name">
            <label><small>Name</small></label>
            <br>
            <input type="text" v-model="timezone.name">
        </div>

        <div class="timezone-sign">
            <label>&nbsp;</label><br>
            <select v-model="timezone.sign">
                <option value="+">+</option>
                <option value="-">-</option>
            </select>
        </div>

        <div class="timezone-hours">
            <label>
                <small>Hours</small>
            </label>
            <br>
            <input type="text" v-model="timezone.hours">
        </div>

        <div class="timezone-hours">
            <label>
                <small>Mins</small>
                <span class="remove-timezone" title="Delete timezone" @click="removeTimezone"> ✕ </span>
            </label>
            <br>
            <input type="text" v-model="timezone.minutes">
        </div>
    </div>
</template>
<script>
import TimezoneModel from "../models/TimezoneModel";
export default {

    props: {
        timezone: {
            type: TimezoneModel,
            required: true,
        },

    },

    methods: {
        removeTimezone() {
            this.$emit("eventRemoveTimezone");
        }
    }

}
</script>