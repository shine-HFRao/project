<template>
  <div id="app">
    <v-header :sellerMsg="sellerMsg"></v-header>
    <div class="tab">
      <div class="tab-item"><router-link to="goods">商品</router-link></div>
      <div class="tab-item"><router-link to="ratings">评价</router-link></div>    
      <div class="tab-item"><router-link to="seller">商家</router-link></div>
    </div>
    <div class="content">
      <keep-alive>
        <router-view :sellerMsg="sellerMsg"></router-view>
      </keep-alive>
      
    </div>
  </div>
</template>

<script>
import Header from '@/components/header'
import axios from 'axios'
export default {
  name: 'App',
  data(){
    return {
      sellerMsg:{}
    }
  },
  components:{
    'v-header': Header
  },
   created(){
    axios.get('/good/seller').then(
      res => {
        if(res.data.code === 0){
          this.sellerMsg = res.data.data
        }
      }
    )
  }
}
</script>

<style lang='stylus' ref="stylesheet/stylus">
@import './assets/stylus/index.styl'
  #app 
    .tab
      background-color rgb(255, 255, 255)
      display flex
      height 40px
      line-height 40px
      width 100%
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item 
        flex 1
        font-size 14px
        text-align center
        a
          color: rgb(77, 85, 93)
          font-weight 500
          &.active
            color: rgb(240, 20, 20)
    .content
      // position absolute
      // top 184px
      // bottom 0
      // width 100%
      
  
            
    
        

</style>
