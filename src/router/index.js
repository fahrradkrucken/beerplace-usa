import Vue from 'vue';

import VueRouter from 'vue-router';
import Search from "../views/Search";
import Breweries from "../views/Breweries";
import Info from "../views/Info";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/search',
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
  {
    path: '/info',
    name: 'Info',
    component: Info,
  },
  {
    path: '/type/:brewery_type/state/:brewery_location_state',
    name: 'Breweries',
    component: Breweries,
    props: (route) => ({
      breweryType: route.params.brewery_type,
      breweryLocationState: route.params.brewery_location_state
    })
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

export default router
