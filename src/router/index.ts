import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue")
  },
  {
    path: "/faq",
    name: "FAQ",
    component: () => import(/* webpackChunkName: "home" */ "../views/Faq.vue")
  },
  {
    path: "/client",
    name: "Client",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/Client.vue")
  },
  {
    path: "/rankings",
    name: "Rankings",
    component: () =>
      import(/* webpackChunkName: "rankings" */ "../views/Rankings.vue")
  },
  {
    path: "/player/:name/:tag",
    name: "Player",
    props: true,
    component: () =>
      import(/* webpackChunkName: "rankings" */ "../views/Player.vue")
  },
  {
    path: "/matches",
    name: "Matches",
    component: () =>
      import(/* webpackChunkName: "rankings" */ "../views/Matches.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
