<template>
    <section class="page page-breweries">

        <template v-if="query.isLoading">
            <div class="page-breweries__loading">
                <div class="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </template>
        <template v-else>

            <template v-if="resultList.length">
                <div class="page-breweries__sidebar">
                    <div class="page-breweries__sidebar-title">
                        <div>
                            Type: {{query.paramsData.breweryType.name}}
                        </div>
                        <div>
                            State: {{query.paramsData.breweryLocationState.state}}
                        </div>
                    </div>
                    <div id="page-breweries__sidebar-box" class="page-breweries__sidebar-box">
                        <breweries-list
                                :breweries-array="resultList"
                        ></breweries-list>
                    </div>
                </div>
                <div class="page-breweries__map">
                    <map-box
                            :markers-array="resultList"

                            :map-zoom="mapControls.zoom"
                            :coord-latitude="mapControls.latitude"
                            :coord-longitude="mapControls.longitude"
                            :marker-selected="mapControls.markerSelectedId"
                    ></map-box>
                </div>
            </template>

            <template v-else>
                <div class="page-breweries__not-found">
                    <h4>{{resultErrorMsg}}</h4>
                </div>
            </template>

        </template>

    </section>
</template>

<script>
    import axios from 'axios';
    import API from "../app/api-obdb";
    import ListUSStates from '../app/data/us_states';
    import ListBreweryTypes from '../app/data/brewery_types';
    import EventsList from '../app/data/events_list';

    import BreweriesList from "../components/blocks/BreweriesList";
    import MapBox from "../components/blocks/MapBox";

    export default {
        name: "Breweries",
        components: {
            BreweriesList,
            MapBox
        },
        props: {
            breweryType: String,
            breweryLocationState: String,
        },
        data() {
            let BreweryTypeObj = ListBreweryTypes.find((item) => item.id === this.breweryType);
            let BreweryStateObj = ListUSStates.find((item) =>
                item.state.toLowerCase().replace(' ', '_') === this.breweryLocationState);
            return {
                query: {
                    isLoading: true,
                    params: {
                        breweryType: this.breweryType,
                        breweryLocationState: this.breweryLocationState,
                    },
                    paramsData: {
                        breweryType: BreweryTypeObj,
                        breweryLocationState: BreweryStateObj,
                    },
                },
                resultList: [], // @TODO: Add Error Message
                resultErrorMsg: "Breweries not found by given query :(",
                mapControls: {
                    zoom: 7,
                    latitude: BreweryStateObj.latitude,
                    longitude: BreweryStateObj.longitude,
                    markerSelectedId: null
                }
            };
        },
        methods: {
            formatBreweriesList(breweriesListInitial) {
                if (!breweriesListInitial.length) {
                    this.resultErrorMsg = "Breweries not found by given query :(";
                    return [];
                }
                return breweriesListInitial.map(function (breweryObject, idx) {
                    breweryObject.has_coordinates = breweryObject.latitude && breweryObject.longitude;
                    breweryObject.is_active = false;
                    breweryObject.address = (breweryObject.street ? (breweryObject.street + ", ") : "") +
                        (breweryObject.postal_code ? (breweryObject.postal_code + " ") : "") +
                        (breweryObject.city ? (breweryObject.city + ", ") : "") +
                        breweryObject.state;
                    breweryObject.google_map_link = "https://maps.google.com/?q=" +
                        breweryObject.address.replace(" ", "+");
                    return breweryObject;
                });
            },
            locateBreweryInList(breweryObj) {
                let sidebarHtmlEl = document.getElementById('page-breweries__sidebar-box');
                let breweryHtmlEl = document.getElementById('brewery-info-' + breweryObj.id);

                if (typeof breweryHtmlEl !== "undefined" && breweryHtmlEl) {
                    sidebarHtmlEl.scrollTo({
                        top: breweryHtmlEl.offsetTop - 10,
                        left: 0,
                        behavior: 'smooth'
                    });
                }
            }
        },
        created() {
            this.$eventBus.$on(EventsList.LocateBreweryInList, this.locateBreweryInList);

            let queryString = API.createQuery({
                per_page: 50,
                by_type: (this.query.params.breweryType !== 'all') ? this.query.params.breweryType : null,
                by_state: this.query.params.breweryLocationState,
            });

            axios.get(queryString)
                .then((response) => {
                    if (typeof response.data !== "undefined" && response.data.length) {
                        this.resultList = this.formatBreweriesList(response.data);
                    }
                })
                .catch((error) => {
                    this.resultErrorMsg = "Something went wrong with OBDB API call :(";
                    this.resultList = [];
                    console.log(error);
                })
                .finally(() => {
                    this.query.isLoading = false;
                });
        },
    }
</script>

<style lang="scss">
    @import "../assets/vars";

    .page-breweries {
        &__loading,
        &__not-found {
            display: block;
            position: absolute;
            width: 100%;
            padding: 15px;
            top: 50%;
            transform: translateY(-50%);
            text-align: center;
        }

        &__loading {
            .lds-ring {
                display: inline-block;
                position: relative;
                width: 80px;
                height: 80px;
            }

            .lds-ring div {
                box-sizing: border-box;
                display: block;
                position: absolute;
                width: 64px;
                height: 64px;
                margin: 8px;
                border: 8px solid $color-primary;
                border-radius: 50%;
                animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
                border-color: $color-primary transparent transparent transparent;
            }

            .lds-ring div:nth-child(1) {
                animation-delay: -0.45s;
            }

            .lds-ring div:nth-child(2) {
                animation-delay: -0.3s;
            }

            .lds-ring div:nth-child(3) {
                animation-delay: -0.15s;
            }

            @keyframes lds-ring {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        }

        &__sidebar {
            display: block;
            position: fixed;
            z-index: 500;

            left: -300px;
            top: 60px;
            width: 300px;
            height: calc(100vh - 60px);

            background: $color-gray;

            transition: .5s;

            &-title {
                display: block;
                width: 100%;
                height: 60px;
                padding: 10px 15px;

                background: $color-primary-light;

                font-size: $font-size-txt;
                color: $color-font-light;
                font-weight: bold;
            }

            &-box {
                display: block;
                position: relative;
                overflow-y: auto;
                overflow-x: hidden;

                width: 100%;
                height: calc(100% - 60px);
                padding: 15px;
            }
        }

        &__map {
            @include is-flex;
            width: 100%;
            height: calc(100vh - 60px);

            padding-left: 0;

            transition: .5s;
        }
    }

    .sidebar-open .page-breweries__sidebar {
        left: 0;
    }
    .sidebar-open .page-breweries__map {
        padding-left: 300px;
    }
</style>