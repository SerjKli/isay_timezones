import TimezoneModel from "./models/TimezoneModel";
import moment from "moment/moment";

setTimeout(addTimeZones, 2000);

function addTimeZones() {
    loadTimeZonesFromStoreage();
}

function loadTimeZonesFromStoreage() {
    chrome.storage.sync.get(
        {
            timezones: "[]",
        },
        (items) => {
            const timezones = JSON.parse(items.timezones).map(
                (tz) =>
                    new TimezoneModel({
                        name: tz.name,
                        sign: tz.sign,
                        hours: tz.hours,
                        minutes: tz.minutes,
                    })
            );

            renderTimeZones(timezones);
        }
    );
}

function renderTimeZones(timezones) {
    const tds = getTdsWithTime();

    // renderSpecificTime(tds[0], timezones);

    tds.forEach((td) => {
        renderSpecificTime(td, timezones);
    });
}

function getTdsWithTime() {
    return document.querySelectorAll(
        "table.reuqirement-calendar .tr-times td:first-child"
    );
}

function renderSpecificTime(td, timezones) {
    const tdTime = td.innerHTML.trim();

    timezones.forEach((tz) => {
        const tdDate = moment(tdTime, "hh:mm");

        const newDateTime = tdDate;

        if (tz.isSubstractTime()) {
            newDateTime.subtract(tz.getHours(), "hours");
            newDateTime.subtract(tz.getMinutes(), "minutes");
        } else {
            newDateTime.add(tz.getHours(), "hours");
            newDateTime.add(tz.getMinutes(), "minutes");
        }

        const timezoneElememt = timezoneElementHtml(tz, newDateTime);

        td.appendChild(timezoneElememt);

        td.style.border = "1px solid #ccc";
    });
}

function timezoneElementHtml(tz, date) {
    const container = document.createElement("div");

    container.classList.add("timezone-item");

    // Create timezone's name element
    const timezoneName = document.createElement("div");
    timezoneName.innerHTML = tz.getName();

    // Create timezone's time element
    const timezoneTime = document.createElement("div");
    timezoneTime.innerHTML = date.format("HH:mm");

    container.appendChild(timezoneName);
    container.appendChild(timezoneTime);

    container.style.display = "flex";
    container.style.fontSize = "8pt";
    container.style.justifyContent = "space-between";
    container.style.alignItems = "center";

    return container;
}
