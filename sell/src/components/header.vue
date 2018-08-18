<template>
    <div class="Vheader">
        <div class="wrapper">
            <div class="content-wrapper">
                <div class="logo">
                    <img :src="sellerMsg.avatar" alt="">
                </div>
                <div class="content">
                    <div class="title">
                        <span class="t-icon bg-image"></span>
                        <span class="name">{{sellerMsg.name}}</span>
                    </div>
                    <div class="dispatch">{{sellerMsg.description}}/{{sellerMsg.deliveryTime}}分钟送达</div>
                    <div class="discount" v-if="sellerMsg.supports">
                        <span class="dis-icon" :class="classMap[sellerMsg.supports[0].type]"></span>
                        <span class="dis-mes" >{{sellerMsg.supports[0].description}}</span>
                    </div>
                </div>
            </div>
            <div class="num-wrapper" v-if="sellerMsg.supports" @click="flag = true">
                <span class="num-msg">{{sellerMsg.supports.length}}个</span>
                <span class="icon-keyboard_arrow_right num-icon"></span>
            </div>
            <div class="bulletin-wrapper"  @click="flag = true">
                <span class="bulletin-icon-one"></span>
                <!-- dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd -->
                <span class="bulletin-msg">{{sellerMsg.bulletin}}}</span>
                <span class="icon-keyboard_arrow_right bulletin-icon-two"></span>
            </div>
            <div class="background">
                <img :src="sellerMsg.avatar" alt="">
            </div>
        </div>
        <transition>
            <div class="mask-all" v-show="flag">
                <div class="mask-header">
                    <div class="mask-header-name">{{sellerMsg.name}}</div>
                    <div class="mask-header-star">
                        <Star :score="sellerMsg.score"></Star>
                    </div>
                </div>
                <div class="special-msg">
                    <div class="special-msg-topic">
                        <span class="special-msg-line"></span>
                        <span class="special-msg-name">优惠信息</span>
                        <span class="special-msg-line"></span>
                    </div>
                    
                    <div class="special-msg-content">
                        <div class="single-content" v-for="(item, index) in sellerMsg.supports" :key="index">
                            <span :class="classMap[item.type]"></span>
                            {{item.description}}
                        </div>
                    </div>
                </div>
                <div class="bulletin-msg">
                    <div class="bulletin-msg-topic">
                        <span class="bulletin-msg-line"></span>
                        <span class="bulletin-msg-name">商家公告</span>
                        <span class="bulletin-msg-line"></span>
                    </div>
                    <div class="bulletin-msg-content">
                        {{sellerMsg.bulletin}}
                    </div>
                </div>
                <div class="mask-close">
                    <span class="icon-close" @click="flag = false"></span>
                </div>
            </div>
        </transition>
        
        
    </div>
</template>

<script>
import Star from './star'
export default {
    props:{
        sellerMsg:{
            type:Object
        }
    },
    name:'Vheader',
    data(){
        return {
            msg:'Vheader',
            flag: false
            // classMap:['subtraction', 'discount', 'meal', 'invoice', 'guarantee']
        }
    },
    computed:{
        
    },
    methods:{
        
    },
    components:{
        Star
    },
    created(){
        this.classMap = ['subtraction', 'discount_1', 'meal', 'invoice', 'guarantee']
    }
}
</script>

<style  lang='stylus' ref="stylesheet/stylus">
@import '../assets/stylus/index.styl'
.Vheader
    overflow: hidden;
    .wrapper
        position relative
        background-color rgba(7, 17, 27, 0.5)
        .content-wrapper
            
            padding 24px 0px 18px 24px
            .logo
                float left
                img
                    set-img(64px)
                    border-radius 4px
            .content
                padding 4px 0px 4px 96px 
                .title
                    .t-icon
                        display inline-block
                        width 30px
                        height 18px
                        background-size 100% 100%
                        bg-image('brand')
                        vertical-align top
                    .name 
                        font-size 16px
                        line-height 18px
                        color rgb(255, 255, 255)
                        font-weight bold
                .dispatch 
                    font-size 14px
                    line-height 14px
                    color rgb(255, 255, 255)
                    font-weight 200
                    margin-top 8px
                .discount
                    color rgb(255, 255, 255)
                    margin-top 10px
                    font-size 10px
                    font-weight 200
                    line-height 12px
                    .dis-icon
                        display inline-block
                        vertical-align middle
                        width 16px
                        height 16px
                        background-size 100% 100%
                        &.subtraction
                            bg-image('decrease_1')
                        &.discount_1
                            bg-image('discount_1')
                        &.meal
                            bg-image('special_1')
                        &.invoice
                            bg-image('invoice_1')
                        &.guarantee
                            bg-image('guarantee_1')
                    .dis-mes
                        display inline-block
                        vertical-align middle
        .num-wrapper
            display inline-block
            position absolute 
            padding 7px 8px
            right 24px
            bottom 44px
            height 14px
            background-color rgba(0, 0, 0, 0.2)
            color rgb(255, 255, 255)
            font-size 10px
            font-weight 200
            line-height 14px
            border-radius 12px
            span
                display inline-block
                vertical-align middle
            .num-icon
                margin-left 2px
        .bulletin-wrapper
            position relative
            height 28px
            padding 0 12px
            font-size 0px
            line-height 28px
            font-weight 200
            
            
            background-color rgba(7, 17, 27, 0.2)
            color rgb(255, 255, 255)
            span
                vertical-align middle
                display inline-block
            .bulletin-icon-one
                width 22px
                height 12px
                background-size 100% 100%
                bg-image('bulletin')
            .bulletin-msg
                margin-left 4px
                margin-right 4px
                width 386px
                font-size 10px
                white-space nowrap
                overflow hidden
                text-overflow ellipsis
            .bulletin-icon-two
                color #ffffff
                font-size 12px
                
                
        .background
            position absolute
            top 0px
            left 0px
            width 100%
            height 100%
            filter blur(10px)
            z-index -1
            img 
                width 100%
    .v-enter
        opacity 0
    .v-leave-to
        opacity 0
    .v-enter-active, .v-leave-active
        transition all 0.2s linear

    .mask-all
        position absolute
        top 0
        bottom 0
        width 100%
        background-color rgba(7, 17, 27, 0.8)
        blur:30px
        z-index 30
        .mask-header
            padding-top 64px
            text-align center
            .mask-header-name
                font-size 16px
                font-weight 700
                color #ffffff
                line-height 16px
            .mask-header-star
                margin-top 28px
                
        .special-msg
            margin 28px 36px
            .special-msg-topic
                display flex
                text-align center 
                align-items center
                .special-msg-name
                    font-size 14px
                    font-weight 700
                    color #ffffff
                    line-height 14px
                .special-msg-line
                    flex 1
                    vertical-align middle
                    border-bottom 1px solid rgba(255,255,255,0.2)
            .special-msg-content
                margin-top 12px
                margin-left 12px
                .single-content
                    margin-top 12px
                    font-size 12px
                    font-weight 200
                    color #ffffff
                    line-height 12px
                    span 
                        vertical-align top
                        margin-right 6px
                        display inline-block
                        width 16px
                        height 16px
                        background-size 16px 16px
                        &.subtraction
                            bg-image('decrease_1')
                        &.discount_1
                            bg-image('discount_1')
                        &.meal
                            bg-image('special_1')
                        &.invoice
                            bg-image('invoice_1')
                        &.guarantee
                            bg-image('guarantee_1')
        .bulletin-msg
            margin 28px 36px
            .bulletin-msg-topic
                display flex
                text-align center 
                align-items center
                span 
                    display inline-block
                .bulletin-msg-name
                    font-size 14px
                    font-weight 700
                    color #ffffff
                    line-height 14px
                .bulletin-msg-line
                    flex 1
                    vertical-align middle
                    border-bottom 1px solid rgba(255,255,255,0.2)
            .bulletin-msg-content
                margin 12px 12px 0 12px
                font-size 14px
                font-weight 200
                color #ffffff
                line-height 24px
        .mask-close
            position absolute
            bottom 32px
            
            left 36px
            right 36px
            text-align center
            .icon-close
                font-size 32px
                color rgba(255, 255, 255, 0.5)






                        
                        
                        
                        
                        
                    




</style>

