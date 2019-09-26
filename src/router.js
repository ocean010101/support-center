import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import FAQ from './components/FAQ.vue'
import Login from './components/Login.vue'
import TicketsLayout from './components/TicketsLayout.vue'
import state from './state'
import Tickets from './components/Tickets.vue'
import NewTicket from './components/NewTicket.vue'
import Ticket from './components/Ticket.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/faq', name: 'faq', component: FAQ },
  { path: '/login', name: 'login', component: Login, meta: { guest: true } },
  {
    path: '/tickets', name: 'tickets', component: TicketsLayout,
    meta: { private: true }, children: [
      { path: '', name: 'tickets', component: Tickets },
      { path: 'new', name: 'new-ticket', component: NewTicket },
      { path: ':id', name: 'ticket', component: Ticket, props: true },
    ]
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  console.log('to', to.name)
  // if (to.meta.private && !state.user) {
  if (to.matched.some(r => r.meta.private) && !state.user) {
    next({
      name: 'login',
      params: {
        wantedRoute: to.fullPath,
      },
    })
    return
  }
  // if (to.meta.guest && state.user) {
  if (to.matched.some(r => r.meta.guest) && state.user) {
    next({ name: 'home' })
    return
  }
  next()
})
export default router