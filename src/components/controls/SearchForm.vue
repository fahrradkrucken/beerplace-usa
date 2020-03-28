<template>
    <form class="form-search"
          @submit="onFormSubmit">

        <div class="form-search__title">
            Find Breweries
        </div>
        <div class="form-search__subtitle">
            Search breweries, bars and brew pubs in your state.
        </div>

        <div class="form-search__field">
            <label for="brewery-type" class="form-search__field-label">
                Type
            </label>
            <select class="form-search__select" name="type" id="brewery-type"
                    v-model="form.type.value">
                <template v-for="type in form.type.options">
                    <option :key="type.id"
                            :value="type.id">
                        {{type.name}}
                    </option>
                </template>
            </select>
        </div>

        <div class="form-search__field">
            <label for="brewery-type" class="form-search__field-label">
                State
            </label>
            <select class="form-search__select" name="state"
                    v-model="form.state.value">
                <template v-for="(stateObj, index) in form.state.options">
                    <option :key="index"
                            :value="stateObj.state | formatStateName">
                        {{stateObj.state}}
                    </option>
                </template>
            </select>
        </div>

        <div class="form-search__field">
            <button class="form-search__btn" type="submit">
                Search
            </button>
        </div>

    </form>
</template>

<script>
    import ListUsStates from '../../app/data/us_states';
    import ListBreweryTypes from '../../app/data/brewery_types';

    let typeInitialValue = ListBreweryTypes[Math.floor(Math.random() * ListBreweryTypes.length)].id;
    let stateInitialValue = ListUsStates[Math.floor(Math.random() * ListUsStates.length)]
        .state.toLowerCase().replace(' ', '_');

    export default {
        name: "SearchForm",
        data() {
            return {
                form: {
                    type: {
                        value: typeInitialValue,
                        options: ListBreweryTypes,
                    },
                    state: {
                        value: stateInitialValue,
                        options: ListUsStates
                    }
                }
            };
        },
        methods: {
            onFormSubmit(event) {
                event.preventDefault();
                this.$router.push('/type/' + this.form.type.value + '/state/' + this.form.state.value);
            }
        },
        filters: {
            formatStateName(stateName) {
                return stateName.toLowerCase().replace(' ', '_');
            }
        }
    }
</script>

<style lang="scss">
    @import "../../assets/vars";

    .form-search {
        @include is-flex;
        width: 100%;
        max-width: 300px;
        padding: 24px 32px;
        border-radius: 4px;
        background: $color-primary-light;

        &__title {
            width: 100%;
            min-height: 38px;

            font-size: $font-size-title;
            color: $color-font-light;
            font-weight: bold;
            text-align: center;
            text-transform: uppercase;
        }
        &__subtitle {
            width: 100%;
            min-height: 38px;
            padding-bottom: 10px;

            font-size: $font-size-txt;
            color: $color-font-light;
            text-align: center;
        }

        &__field {
            @include is-flex;
            width: 100%;
            padding-top: 8px;
            padding-bottom: 8px;

            &-label {
                display: inline-block;
                position: relative;
                width: 70px;
                height: 38px;
                margin: 0;
                padding: 8px;

                background: #fff;
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
                outline: none;
                border: none;

                color: $color-font-dark;
                font-size: $font-size-button;
                font-weight: bold;
                background: $color-gray;

                + .form-search__select {
                    width: calc(100% - 70px);
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                }
            }
        }

        &__select {
            display: inline-block;
            position: relative;
            width: 100%;
            height: 38px;
            margin: 0;
            padding: 8px;

            background: #fff;
            border-radius: 4px;

            outline: none;
            border: none;

            color: $color-font-dark;
            font-size: $font-size-button;

            transition: .25s;
        }

        &__btn {
            display: inline-block;
            width: 100%;
            margin: 0;
            padding: 8px 16px;
            border-radius: 4px;

            font-size: $font-size-button;
            text-transform: uppercase;
            color: $color-font-dark;
            font-weight: bold;
            text-align: center;

            background: $color-secondary;
            outline: none;
            border: none;

            cursor: pointer;
            transition: .25s;

            &:focus,
            &:hover,
            &:active {
                background: darken($color-secondary, 4);
            }
        }
    }
</style>