import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'//@的意思？？？？？？？？？？？？？？？？？？？？？？？？

import Ratings from '@/components/ratings'
import Seller from '@/components/seller'
import Goods from '@/components/goods'

Vue.use(Router)

var router =  new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      // name: 'Goods',
      redirect(){
        return '/goods'
      }
      // component: Goods
    },
    {
      path: '/ratings',
      name: 'Ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'Seller',
      component: Seller
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
  ]
})
// router.push('./goods')
export default router
