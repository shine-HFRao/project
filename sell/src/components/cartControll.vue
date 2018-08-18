<template>
    <div class="cart-controll" >
        <transition name="move">
            <span class="decrease icon-remove_circle_outline" @click="decrease" v-show="food.count > 0"></span>
        </transition>
        <span class="count"  v-show="food.count > 0">{{food.count}}</span>
        <span class="increase icon-add_circle" @click="increase"></span>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
    data(){
        return {
            // food:{count:0,price:4}
        }
    },
    props:{
        food:{
            type: Object
        }
    },
    methods:{
        increase(event){
            console.log(this.food) 
            if(!this.food.count){
                Vue.set(this.food,'count')  
                this.food.count = 1;
                
            }else{
                this.food.count ++
            }
        },
        decrease(event){

                if(this.food.count === 0){
                    return
                }
                this.food.count --
            
        }
    }
}
</script>
<style lang="stylus" ref="stylesheet/stylus">
.cart-controll
    .move-enter
        transform translate3d(48px, 0, 0) rotateZ(180deg)
        opacity 0
    .move-leave-to
        transform translate3d(24px, 0, 0) rotateZ(180deg)
        opacity 0
    .move-enter-active, .move-leave-active
        transition: all 0.4s linear
        
    font-size 0
    span
        display inline-block
        width 24px
        height 24px
        vertical-align middle
    .decrease, .increase
        font-size 24px
        color #00a0dc
    .count 
        line-height 24px
        font-size 10px
        text-align center
        
        
        
</style>

