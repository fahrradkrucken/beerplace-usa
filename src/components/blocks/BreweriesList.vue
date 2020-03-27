<template>
    <section class="b-list">
        <template v-if="breweriesArray.length">
            <div class="b-list__items">
                <template v-for="(item, index) in breweries">
                    <breweries-list-item
                            :key="item.id"
                            :brewery-object="item"
                    ></breweries-list-item>
                </template>
            </div>
        </template>
    </section>
</template>

<script>
    import BreweriesListItem from "./BreweriesListItem";

    export default {
        name: "BreweriesList",
        components: {
            BreweriesListItem
        },
        props: {
            breweriesArray: {
                type: Array,
                required: true,
            }
        },
        data() {
            return {
                breweries: this.breweriesArray
            };
        },
    }
</script>

<style lang="scss">

</style>