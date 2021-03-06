import {Weathers, maxGen} from "./utilities";

export default class Field {

    constructor(field = {}) {
        this.gen = Number(field.gen) || maxGen;
        this.multiBattle = Boolean(field.multiBattle);
        this.invertedBattle = Boolean(field.invertedBattle);

        this.weather = Number(field.weather) || Weathers.CLEAR;
        this.airLock = Boolean(field.airLock);

        this.waterSport = Boolean(field.waterSport);
        this.mudSport = Boolean(field.mudSport);

        this.magicRoom = Boolean(field.magicRoom);
        this.wonderRoom = Boolean(field.wonderRoom);
        this.gravity = Boolean(field.gravity); // a gravity field if you will

        this.grassyTerrain = Boolean(field.grassyTerrain);
        this.mistyTerrain = Boolean(field.mistyTerrain);
        this.electricTerrain = Boolean(field.electricTerrain);
        this.psychicTerrain = Boolean(field.psychicTerrain);

        this.fairyAura = Boolean(field.fairyAura);
        this.darkAura = Boolean(field.darkAura);
        this.auraBreak = Boolean(field.auraBreak);

        this.ionDeluge = Boolean(field.ionDeluge);
    }

    effectiveWeather() {
        return this.airLock ? Weathers.CLEAR : this.weather;
    }

    isClearWeather() {
        return this.effectiveWeather() === Weathers.CLEAR;
    }

    rain() {
        return [
            Weathers.RAIN,
            Weathers.HEAVY_RAIN
        ].includes(this.effectiveWeather());
    }

    sun() {
        return [
            Weathers.SUN,
            Weathers.HARSH_SUN
        ].includes(this.effectiveWeather());
    }

    sand() {
        return this.effectiveWeather() === Weathers.SAND;
    }

    hail() {
        return this.effectiveWeather() === Weathers.HAIL;
    }

    heavyRain() {
        return this.effectiveWeather() === Weathers.HEAVY_RAIN;
    }

    harshSun() {
        return this.effectiveWeather() === Weathers.HARSH_SUN;
    }

    strongWinds() {
        return this.effectiveWeather() === Weathers.STRONG_WINDS;
    }

}
