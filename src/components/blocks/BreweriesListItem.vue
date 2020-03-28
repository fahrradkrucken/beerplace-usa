<template>
    <article :class="{'b-list__item': true, 'active': brewery.is_active}">
        <table>
            <thead>
            <tr>
                <td>
                    <div v-if="brewery.latitude && brewery.longitude" title="Show on map"
                         @click="locateBrewery">
                        <i :class="{'b-list__item-action material-icons': true}">location_on</i>
                    </div>
                    <div @click="expandToggle">
                        <i v-show="!expand" class="b-list__item-action material-icons">expand_more</i>
                        <i v-show="expand" class="b-list__item-action material-icons">expand_less</i>
                    </div>
                </td>
                <td>
                    {{brewery.brewery_type | ucfirst}}
                    <div class="b-list__item-title">{{brewery.name}}</div>
                </td>
            </tr>
            </thead>
            <tbody v-show="expand">
            <tr v-if="brewery.phone">
                <td>
                    <a :href="'tel:' + brewery.phone" title="Call the Brewery"
                       class="b-list__item-action material-icons">call</a>
                </td>
                <td>{{brewery.phone}}</td>
            </tr>
            <tr v-if="brewery.website_url">
                <td>
                    <a :href="brewery.website_url" title="Brewery Website" target="_blank"
                       class="b-list__item-action material-icons">link</a>
                </td>
                <td>{{brewery.website_url}}</td>
            </tr>
            <tr v-if="brewery.address">
                <td>
                    <a :href="brewery.google_map_link" target="_blank" title="Try to find on GoogleMaps"
                       class="b-list__item-action material-icons">map</a>
                </td>
                <td>{{brewery.address}}</td>
            </tr>
            </tbody>
        </table>
    </article>
</template>

<script>
    export default {
        name: "BreweriesListItem",
        props: {
            breweryObject: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                brewery: this.breweryObject,
                expand: false,
            };
        },
        methods: {
            expandToggle() {
                this.expand = !this.expand;
            },
            locateBrewery() {
                this.$eventBus.$emit('locate-brewery', this.brewery);
            }
        },
        filters: {
            ucfirst(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            },
        }
    }
</script>

<style lang="scss">
    @import "../../assets/vars";

    .b-list__item {
        display: block;
        position: relative;
        width: 100%;
        height: auto;

        padding: 10px;
        margin: 0 0 15px 0;

        border-radius: 8px;
        background: #fff;

        transition: .25s;

        &.active,
        &:hover {
            background: $color-secondary-light;
        }

        table {
            border: none !important;
            width: 100%;
            margin: 0;

            tr td:first-child {
                width: 36px !important;
            }

            td {
                padding: 2px;
                vertical-align: middle;
                margin: 0;
                font-size: $font-size-label;
                color: $color-font-dark;
                overflow: hidden;
            }
        }

        .material-icons {
            font-size: $font-size-icons-sm;
        }

        &-title {
            font-size: $font-size-txt;
            font-weight: bold;
        }

        &-action {
            text-decoration: none;
            cursor: pointer;
            color: $color-font-dark;
            transition: .25s;

            &:hover {
                color: $color-primary;
            }
        }
    }
</style>