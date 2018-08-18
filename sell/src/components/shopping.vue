<template>
    <div class="shopping-wrapper">
        <div class="shopping icon-shopping_cart" :class="{foodsIn: foodsCount > 0}" @click="changeState">
            <div class="shopping-count" v-show="foodsCount">{{foodsCount}}</div>
        </div>
        <div class="shopping-msg">
            <span class="bill" :class="{priceIn: foodsCount > 0}">￥{{allBill}}</span><span class="Distribution-fee">另需配送费￥{{deliveryPrice}}元</span><span class="base-bill"  :class="{foodsIn: allBill >= 20}">{{billResult}}</span>
        </div>
      <!-- <CartList :selectedFoods="selectedFoods"></CartList>    v-show="true" -->
       <!-- v-show="selectedFoods.length" -->
        <div class="cartList-wrapper" v-show="flag">
            <div class="mask" @click="changeState"></div>
            <div class="cartList">
                <div class="cartList-catalog">
                    <span class="cart-text">购物车</span>
                    <span class="cart-clear" @click="clearAll">清空</span>
                </div>
                <div class="cartList-text" ref="listWrapper">
                    <ul>
                        <li v-for="(food,index) in selectedFoods" :key="index" class="cartList-single">
                            <span class="single-name">{{food.name}}</span>
                            <div class="single-right">
                                <span class="single-price">￥{{food.price * food.count}}</span>
                                <span class="single-controll">
                                    <CartControll :food="food"></CartControll>
                                </span>
                            </div>  
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CartList from './cartList'
import CartControll from './cartControll'
import  Bscroll from 'better-scroll'
import Vue from 'vue'
export default {
    data(){
        return {
            flag: false
        }
    },
    components:{
        CartList,
        CartControll
    },
    props: {
        minPrice: {
            type: Number
        },
        deliveryPrice:{
            type: Number
        },
        selectedFoods:{
            type: Array,
            default:[]
        }
    },
    computed:{
        foodsCount(){
            // console.log(this.selectedFoods)
            let count = 0
            if(this.selectedFoods.length === 0){
                return count
            }
            this.selectedFoods.forEach(food => {
                count += food.count      
            });
            return count
        },
        allBill(){
            let bill = 0
            if(this.selectedFoods.length === 0){
                return bill
            }
            this.selectedFoods.forEach(food => {
                bill += food.price * food.count 
            });
            return bill
        },
        billResult(){
            if(this.allBill === 0){
                return `￥${this.minPrice}起送`
            }else if(this.allBill > 0 && this.allBill < this.minPrice){
                return `还差${this.minPrice - this.allBill}元起送`
            }else{
                return `去结算`
            }
        }

    },
    methods:{
        clearAll(){ 
            this.selectedFoods.forEach(food => {
                food.count = 0
                this.flag = false
            })
        },
        changeState(){
            if(this.selectedFoods.length > 0){
                if(this.flag){
                    this.flag = false
                }else{
                    this.flag = true
                }
                return this.flag
            }
            this.flag = false
            return this.flag
        }
    },
    watch:{
        selectedFoods(){
            if(this.selectedFoods < 1){
                this.flag = false
            }
        }
    },
    created(){
        // console.log(this.goodsMsg)//组件之间的数据访问不到
        
        Vue.nextTick(()=> {
            this.listScroll = new Bscroll(this.$refs.listWrapper,{
                probeType: 3,
                click: true
            })
        })
    }
    
}
</script>
<style lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl'
.shopping-wrapper
    z-index 20
    position absolute
    width 100%
    left 0
    bottom 0px
    color rgba(255, 255, 255, 0.4)
    // height 48px
    
    .shopping
      z-index 4
      &.foodsIn
        color #fff
        background-color #00a0dc
      position absolute
      width 44px
      height 44px
      left 12px
      bottom 8px
      font-size 24px
      line-height 44px
      color rgba(255, 255, 255, 0.4)
      text-align center
      border 6px solid #141d27 
      border-radius 50% 
      background-color #2b333b
      .shopping-count
        position absolute
        right -6px
        top -6px
        width 15px
        background-color red
        color #fff
        border-radius 10px
        padding 0 6px
        text-align center
        font-size 9px
        font-weight 700
        line-height 16px
        box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
    .shopping-msg
      z-index 3
      position relative  
      display flex
      background-color #141d27 
      span 
        display inline-block
        
      .bill
        &.priceIn
          color #fff
        text-align right 
        flex 1
        margin 12px 0px
        padding-right 12px
        font-size 16px
        line-height 24px
        font-weight 700
        border-right 1px solid rgba(255, 255, 255, 0.1)
      .Distribution-fee
        flex 1
        padding 12px
        font-size 14px
        line-height 24px
      .base-bill
        &.foodsIn
          background-color green
          color #fff
        width 105px
        padding 12px 8px
        font-size 16px
        line-height 24px
        font-weight 700
        text-align center
        background-color #2b333b
    .cartList-wrapper
        .mask
            position fixed
            width 100%
            top 0
            bottom 48px
            background-color rgba(7, 17, 27, 0.6)
            z-index 2 
        .cartList
            z-index 3
            position absolute 
            bottom 48px
            width 100%
            .cartList-catalog
                height 40px
                line-height 40px
                padding 0 18px
                border-bottom 1px solid rgb(147, 153, 159)
                // border-top 1px solid rgb(147, 153, 159)
                background-color #f3f5f7
                .cart-text
                    font-size 14px
                    font-weight 500
                    color rgb(7, 17, 27)
                .cart-clear
                    font-size 12px      
                    font-weight 700
                    color rgb(0, 160, 220)
                    float right
            .cartList-text
                max-height 230px
                overflow hidden
                background-color #fff
                .cartList-single
                    margin 0 18px
                    height 48px
                    line-height 48px
                    border-bottom 1px solid rgba(7, 17, 27, 0.1)
                    span 
                        display inline-block
                        
                    .single-name
                        font-weight 500
                        font-size 14px
                        color rgb(7, 17, 27)
                    .single-right
                        font-weight 700
                        float right
                        .single-price
                            font-size 14px
                            color red
                        .single-controll
                            margin-left 12px 
                            width 72px
                            height 24px
                            color rgb(147, 153, 159)
                            vertical-align top
</style>


