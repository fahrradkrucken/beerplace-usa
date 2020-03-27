<template>
    <section class="page page-search">
        <div class="page-search__bg"></div>
        <div class="page-search__box">
            <search-form></search-form>
        </div>
    </section>
</template>

<script>
    import SearchForm from "../components/controls/SearchForm";

    export default {
        name: "Search",
        components: {
            SearchForm
        }
    }
</script>

<style lang="scss">
    @import "@/assets/_vars.scss";

    .page-search {
        @include is-flex-center-all;

        &__box {
            position: relative;
            z-index: 100;
        }

        &__bg {
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: transparent url("../assets/pub.jpg") no-repeat center;
            background-size: cover;

            &::before {
                content: '';
                display: block;
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background: rgba($color-primary-dark, .5);
            }
        }
    }
</style>