export default class TimezoneModel {
    constructor({ name, hours, minutes, sign }) {
        this.name = name;
        this.hours = hours;
        this.minutes = minutes;
        this.sign = sign;
    }

    isReadyToSave() {
        return (
            this.name != "" &&
            this.name != null &&
            this.hours != "" &&
            this.hours != null &&
            this.minutes != "" &&
            this.minutes != null &&
            this.sign != "" &&
            this.sign != null &&
            (this.sign == "-" || this.sign == "+") &&
            this.getHours() >= 0 &&
            this.getMinutes() >= 0
        );
    }

    isSubstractTime() {
        return this.sign == "-";
    }

    getHours() {
        return parseInt(this.hours);
    }

    getMinutes() {
        return parseInt(this.minutes);
    }

    getName() {
        return this.name;
    }
}
