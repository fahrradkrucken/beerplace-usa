<template>
    <div id="app" :class="{'app': true, 'sidebar-open': sidebarState}">
        <top-bar @sidebar-toggle="toggleSidebarState"></top-bar>
        <router-view/>
    </div>
</template>

<script>
    import TopBar from "./components/TopBar";
    import SearchForm from "./components/controls/SearchForm";

    export default {
        components: {
            TopBar,
            SearchForm
        },
        data() {
            return {
                sidebarState: true,
            };
        },
        methods: {
            toggleSidebarState() {
                this.sidebarState = !this.sidebarState;
            },
        }
    }
</script>

<style lang="scss">
    #app {
        display: block;
        position: relative;
        overflow: hidden;
    }
</style>
