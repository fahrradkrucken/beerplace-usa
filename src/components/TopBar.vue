<template>
    <div class="top-bar">
        <div class="top-bar__link" title="Sidebar Toggle"
             @click="sidebarToggleEmit">
            <i class="material-icons">menu</i>
        </div>
        <div class="top-bar__brand">BeerPlace USA</div>
        <nav class="top-bar__links">
            <a class="top-bar__link" href="#/search" title="Find Breweries">
                <i class="material-icons">search</i>
            </a>
            <a class="top-bar__link" href="#/info" title="About this project">
                <i class="material-icons">help</i>
            </a>
            <a class="top-bar__link" href="https://www.openbrewerydb.org/" target="_blank"
               title="OpenBrewery DB website">
                <i class="material-icons">link</i>
            </a>
        </nav>
    </div>
</template>

<script>
    import EventsList from "../app/data/events_list";

    import SearchForm from "./controls/SearchForm";

    export default {
        name: "TopBar",
        components: {
            SearchForm
        },
        methods: {
            sidebarToggleEmit() {
                this.$emit(EventsList.SidebarToggle);
            }
        }
    }
</script>

<style lang="scss">

    @import "../assets/vars";

    .top-bar {
        @include is-flex;
        position: relative;
        z-index: 3000;

        top: 0;
        left: 0;
        height: 60px;
        background: $color-primary;

        box-shadow: 0 0 6px 0 #000000;

        &__links {
            margin-left: auto;
            @include is-flex;
        }

        &__logo,
        &__link {
            @include is-flex-center-all;
            width: 60px;
            cursor: pointer;
            color: $color-font-light;
            text-decoration: none;
        }

        &__brand {
            @include is-flex-center-all;
            font-size: $font-size-title;
            color: $color-font-light;
            font-weight: 600;
            padding-left: 15px;

            @include media-sm-down {
                font-size: $font-size-txt;
            }
        }
    }
</style>