<template>
    <div class="brewery-popup">
        <div class="brewery-popup__title">{{brewery.name}}</div>
        <div class="brewery-popup__links">
            <template v-if="brewery.phone">
                <a :href="'tel:' + brewery.phone" class="brewery-popup__link material-icons">call</a>
            </template>
            <template v-if="brewery.website_url">
                <a :href="brewery.website_url" target="_blank" class="brewery-popup__link material-icons">link</a>
            </template>
            <template v-if="brewery.address">
                <a :href="brewery.google_map_link" target="_blank" class="brewery-popup__link material-icons">map</a>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BreweryPopup",
        props: {
            breweryObject: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                brewery: this.breweryObject
            };
        }
    }
</script>

<style lang="scss">
    @import "../../assets/vars";

    .brewery-popup {
        display: block;
        width: 100%;
        text-align: center;

        &__title {
            font-size: $font-size-label;
            font-weight: bold;
        }
        &__links {
            width: 100%;
        }
        &__link {
            cursor: pointer;
            text-decoration: none;
            color: $color-font-dark!important;
            font-size: $font-size-icons-sm;
            margin: 5px;

            transition: .25s;

            &:hover {
                color: $color-primary!important;
            }
        }
    }
</style>