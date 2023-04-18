<template>
    <div id="timezones">
        <h1>Timezones list
            <button class="btn" id="save-timezones" @click="saveTimezonesToStorage">Save</button>
        </h1>
        <hr>

        <ul class="list-group">
            <li class="list-group-item" v-for="(timezone, index) in timezones" :key="index">
                <timezone-item :timezone="timezone" @eventRemoveTimezone="removeTimezoneByIndex(index)"></timezone-item>
            </li>
        </ul>

        <hr>
        <button id="add-timezone" class='btn' @click="addTimezone">+ Add new timezone</button>
    </div>
</template>
<script>
import TimezoneModel from "../models/TimezoneModel.js";

import TimezoneItem from "./TimezoneItem.vue";

export default {
    components: {
        TimezoneItem,
    },

    data() {
        return {
            timezones: [],
        }
    },

    methods: {
        addTimezone() {
            const template = this.getTemplate();
            this.timezones.push(template);
        },
        getTemplate() {
            return new TimezoneModel({
                name: "New timezone",
                sign: "+",
                hours: "02",
                minutes: "00",
            });
        },
        saveTimezonesToStorage() {
            try {
                console.log(this.readyToSaveTimezones);
                chrome.storage.sync.set({
                    timezones: JSON.stringify(this.readyToSaveTimezones),
                }, () => { });
            } catch (error) {
                console.log(error);
            }

        },
        loadTimezonesFromStorage() {
            chrome.storage.sync.get({
                timezones: "[]",
            }, (items) => {
                console.log('loaded from storage', items);
                const timezones = JSON.parse(items.timezones);

                this.timezones = timezones.map(tz => new TimezoneModel({
                    name: tz.name,
                    sign: tz.sign,
                    hours: tz.hours,
                    minutes: tz.minutes,
                }))

                console.log('parsed timezones', this.timezones);
            });
        },
        removeTimezoneByIndex(index) {
            this.timezones.splice(index, 1);
        }
    },

    created() {
        console.log('created');
        this.loadTimezonesFromStorage();
    },

    mounted() {
        console.log('mounted');
    },

    computed: {
        readyToSaveTimezones() {
            return this.timezones.filter(tz => tz.isReadyToSave());
        }
    },

    // watch: {
    //     timezones: {
    //         handler(val, oldVal) {
    //             console.log('changed timezone', val);
    //         },
    //         deep: true
    //     },
    // }
}
</script>