<template>
    <div class="map-box">
        <l-map
                :zoom="mapData.zoom"
                :center="mapData.center"
                :options="mapData.mapOptions"
                class="map-box__map"
        >
            <l-tile-layer :url="mapData.url" :attribution="mapData.attribution"/>

            <template v-if="mapBreweries.length">
                <template v-for="(brewery, index) in mapBreweries">
                    <l-marker
                            :key="brewery.id"
                            :lat-lng="[brewery.latitude, brewery.longitude]"
                            :icon="!brewery.is_active ? mapIconDefault : mapIconActive"
                            @click="markerActiveToggle(index)">
                        <l-popup :options="{ permanent: true, interactive: true }">
                            <brewery-popup :brewery-object="brewery"></brewery-popup>
                        </l-popup>
                    </l-marker>
                </template>
            </template>
        </l-map>
    </div>
</template>

<script>
    import L from 'leaflet';
    import {latLng} from "leaflet";
    import {Icon} from 'leaflet';

    import {LMap, LTileLayer, LMarker, LPopup} from 'vue2-leaflet';
    import BreweryPopup from "./BreweryPopup";

    export default {
        name: "MapBox",
        components: {
            LMap,
            LTileLayer,
            LMarker,
            LPopup,
            BreweryPopup
        },
        props: {
            mapZoom: {
                type: Number,
                required: false,
                default: 7,
            },
            coordLatitude: {
                type: Number,
                required: true,
            },
            coordLongitude: {
                type: Number,
                required: true,
            },
            markersArray: {
                type: Array,
                required: false,
            },
            markerSelected: {
                type: Number,
                required: false
            }
        },
        data() {
            let breweriesObjects = this.markersArray ?
                this.markersArray.filter((item) => item.latitude && item.longitude) :
                [];

            return {
                mapData: {
                    zoom: this.mapZoom,
                    center: latLng(this.coordLatitude, this.coordLongitude),
                    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                    mapOptions: {
                        zoomSnap: 0.5
                    },
                    showMap: true
                },
                mapBreweries: breweriesObjects,
                mapIconDefault: new Icon({
                    iconUrl: require('../../assets/marker-icon.png'),
                    iconSize: [25, 41],
                    iconAnchor: [25, 41],
                    popupAnchor: [-12, -41],
                }),
                mapIconActive: new Icon({
                    iconUrl: require('../../assets/marker-icon-active.png'),
                    iconSize: [25, 41],
                    iconAnchor: [25, 41],
                    popupAnchor: [-12, -41],
                })
            };
        },
        methods: {
            markerActiveToggle(brewery_idx, applyZoom) {
                for (let i = 0; i < this.mapBreweries.length; i++) {
                    this.mapBreweries[i].is_active = (i === brewery_idx);
                }
                if (applyZoom) {
                    this.mapData.zoom = 13;
                    setTimeout(() => {
                        this.mapData.center = latLng(
                            this.mapBreweries[brewery_idx].latitude,
                            this.mapBreweries[brewery_idx].longitude
                        );
                    }, 500);
                }
                this.$forceUpdate();
            },
            locateBrewery(breweryObj) {
                let brewery_idx = -1;
                for (let i = 0; i < this.mapBreweries.length; i++) {
                    if (this.mapBreweries[i].id === breweryObj.id) {
                        brewery_idx = i;
                        break;
                    }
                }
                if (brewery_idx !== -1) this.markerActiveToggle(brewery_idx, true);
            }
        },
        created() {
            this.$eventBus.$on('locate-brewery', this.locateBrewery);
        }
    }
</script>

<style lang="scss">
    @import "../../assets/vars";

    .map-box {
        display: block;
        position: relative;
        height: 100%;
        width: 100%;
        padding-left: 0;
        transition: .5s;

        &__map {
            width: 100%;
            height: 100%;
        }

        &__popup-title {
            font-size: $font-size-label;
            font-weight: bold;
        }

        .leaflet-popup-content-wrapper {
            border-radius: 8px;
        }
    }
</style>