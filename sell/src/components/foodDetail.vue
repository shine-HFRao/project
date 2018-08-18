<template>
    <transition name="move">
        <div class="food-detail" v-show="showFlag" ref="foodDetailWrapper">
            <div class="food-content">
                <div class="img-header">
                    <img :src="selectedFood.image" alt="">
                    <div class="back" @click="turnBack">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{selectedFood.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月销售{{selectedFood.sellCount}}份</span>
                        <span class="rating">好评率{{selectedFood.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="now">￥{{selectedFood.price}}</span>
                        <span class="old" v-show="selectedFood.oldPrice">￥{{selectedFood.oldPrice}}</span>
                    </div>
                    <CartControll :food="selectedFood"></CartControll>
                    <AddCart :food="selectedFood"></AddCart>
                    <!-- <transition name="disppear">
                        <div class="add-cart" @click="addFirst" v-show="!selectedFood.count">加入购物车</div>  
                    </transition> -->
                </div>

                <Split></Split>
                <div class="info">
                    <h1 class="title">商品信息</h1>
                    <p class="text">{{selectedFood.info}}</p>
                </div>
                <Split></Split>
                <RatingsType :commentsTypes="commentsTypes" :ratingsMsg="selectedFood.ratings"></RatingsType>
            </div>
        </div>
    </transition>
</template>
<script>
import AddCart from './addCart'
import Split from './Split'
import CartControll from './cartControll'
import Bscroll from 'better-scroll'
import RatingsType from './ratingsType' 
export default {
    components: {
        Split,
        CartControll,
        RatingsType,
        AddCart
    },
    data(){
        return {
            showFlag: false,
            showCart: true,
            commentsTypes:['全部', '推荐', '吐槽'],
            ratingsMsg: []
        }
    },
    props:{
        selectedFood:{
            type: Object
        }
        
    },
    methods: {
        turnBack(){
            this.showFlag = false
        },
        show(){
            this.showFlag = true
        },
        addFirst(){
            console.log(this.selectedFood.count)
            this.selectedFood.count = 1
        }
    },
    created(){
        
        this.$nextTick(() => {
                if (!this.scroll) {//清楚再一次进入food时保留上次滑动的距离
                        this.scroll = new Bscroll(this.$refs.foodDetailWrapper, {
                            probeType: 3,
                            click: true
                        });
                        
                } else {
                    this.scroll.refresh();
                }
            })
    }
}
</script>
<style lang="stylus" ref="stylesheet/stylus">
&.move-enter-active, &.move-leave-active
    transition: all 0.3s 
&.move-enter, &.move-leave-to
    transform: translateX(100%)   
.food-detail
    // transform: translate3d(0, 0, 0)
    background: #fff
    font-weight normal
    z-index 10
    position absolute
    overflow hidden
    width 100%
    top 0px
    left 0px
    bottom: 48px;
    .food-content
        .img-header
            width 100%
            img
                width 100%
                height 100%
            .back
                position: absolute
                top: 10px
                left: 0
                .icon-arrow_lift
                    display: block
                    padding: 10px
                    font-size: 20px
                    color: #fff
        .content
            position relative
            padding: 18px
            .title
                line-height: 14px
                margin-bottom: 8px
                font-size: 14px
                font-weight: 700
                color: #07111b
            .detail
                margin-bottom: 18px;
                line-height: 10px;
                height: 10px;
                font-size: 0;
                span
                    font-size: 10px;
                    color: #93999f;
                    &.sell-count
                        margin-right: 12px;
            .price
                font-weight: 700;
                line-height: 24px;
                .now
                    margin-right: 8px;
                    font-size: 14px;
                    color: #f01414;
                .old
                    text-decoration: line-through;
                    font-size: 10px;
                    color: #93999f; 
            .cart-controll
                color red
                position: absolute;
                right: 18px;
                bottom: 18px;
            // .disppear-enter-active, .disppear-leave-active
            //     transition all 1s      
            // .disppear-enter-to, .disppear-leave
            //     width 0px
            .add-cart
                position: absolute;
                right: 18px;
                bottom: 18px;
                z-index: 10;
                height: 24px;
                line-height: 24px;
                padding: 0 12px;
                box-sizing: border-box;
                border-radius: 12px;
                font-size: 10px;
                color: #fff;
                background: #00a0dc;
    .info
        padding: 18px;
        .title  
            line-height: 14px;
            margin-bottom: 6px;
            font-size: 14px;
            color: #07111b;
        .text
            line-height: 24px;
            padding: 0 8px;
            font-size: 12px;
            color: #4d555d;
                


                


</style>


