<template>
    <section class="page page-info">
        <div class="page-info__box">
            <h4 class="txt-center">BeerPlace USA</h4>
            <h5>What?</h5>
            <p>
                It's just a fan project, based on <a href="https://vuejs.org/" target="_blank">VueJS</a>,
                <a href="https://leafletjs.com/" target="_blank">Leaflet</a> and
                <a href="https://www.openbrewerydb.org/" target="_blank">Open Brewery Database API</a>.
                The last one allows us to use open data to find breweries in USA. Open Brewery DB is a free API for
                public information on breweries, cideries, brewpubs, and bottleshops. Currently it is focused to the
                United States, but future plans are to import world-wide data.
            </p>
            <h5>Why?</h5>
            <p>
                Well, because we can!
            </p>
            <h6>
                And that's what creators of Open Brewery Database says about that:
            </h6>
            <p>
                "I like craft breweries. I particularly like those which allow my dog, are open during the day, and have
                WiFi so I can work remote with my best buddy. While there are other websites and resources available,
                none had an easy-to-use, publically-accessible API. The goal of this project is to keep an up-to-date,
                curated, and publically available database of breweries for the betterment of the beer community and joy
                of web developers like myself. <br>
                Cheers!"
            </p>
            <h5>How?</h5>
            <p>You can see how it was made on <a href="" target="_blank">GitHub</a>.</p>
        </div>
    </section>
</template>

<script>
    export default {
        name: "Info"
    }
</script>

<style lang="scss">
    @import "../assets/vars";

    .page-info {
        overflow-y: auto;

        &__box {
            padding: 30px 15px;
            width: 100%;
            max-width: 700px;
            margin: 0 auto;
        }
    }
</style>