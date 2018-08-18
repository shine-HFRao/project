<template>
    <div class="cartList-wrapper" v-show="true">
        <div class="mask"></div>
        <div class="cartList">
            <div class="cartList-catalog">
                <span class="cart-text" @click="changeState">购物车</span>
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
</template>
<script>
import CartControll from './cartControll'
import Bscroll from 'better-scroll'
import Vue from 'vue'
export default {
    props: {
        selectedFoods:{
            type: Array
        }
    },
    data(){
        return {
            flag:false
        }
    },
    
    methods:{
        clearAll(){ 
            this.selectedFoods.forEach(food => {
                food.count = 0
            })
        },
        changeState(){
            if(this.flag){
                this.flag = false
            }else{
                this.flag = true
            }
            return this.flag
        }
    },
    created(){
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
.cartList-wrapper
    .mask
        position fixed
        width 100%
        top 0
        bottom 48px
        background-color rgba(7, 17, 27, 0.6)
        z-index 2 
    .cartList
        z-index 2
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


