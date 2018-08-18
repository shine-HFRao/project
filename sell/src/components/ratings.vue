<template>
    <div class="ratings" ref="ratingsWrapper">
        <div>   
            <div>
            <div class="ratings-top">
                <div class="ratings-gather">
                    <div class="all-score">{{sellerMsg.score}}</div>
                    <div class="name-score">综合评分</div>
                    <div class="compare-score">高于周边商家{{sellerMsg.rankRate}}%</div>
                </div>
                <div class="ratings-score">
                    <div class="service-score">
                        <span>
                            服务态度
                        </span>
                        <Star class="star-span" :score="sellerMsg.serviceScore"></Star>
                        <span class="service-score-text">{{sellerMsg.serviceScore}}</span>
                    </div>
                    <div class="goods-score">
                        <span>
                            商家评分
                        </span>
                        <Star class="star-span" :score="sellerMsg.foodScore"></Star>
                        <span class="food-score-text">{{sellerMsg.foodScore}}</span>
                    </div>
                    <div class="deliveryTime">
                        <span>
                            送达时间
                        </span>
                        <span class="deliveryTime-text">{{sellerMsg.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
        </div>
        <Split></Split>
        <RatingsType :commentsTypes="commentsTypes" :ratingsMsg="ratingsMsg"></RatingsType>
    </div>
        </div>
        
</template>
<script>
import Bscroll from 'better-scroll'
import Vue from 'vue'
import Star from './star'
import Split from './Split'
import RatingsType from './ratingsType'  
import axios from 'axios'
export default {
    name:'ratings',
    props:{
        sellerMsg: {
            type: Object
        }
        
    },
    components:{
        Star,
        Split,
        RatingsType
    },
    data(){
        return {
            msg:'ratings',
            commentsTypes:['全部', '满意', '不满意'],
            ratingsMsg:[]
        }
    },
    created(){
        axios.get("/good/ratings").then(res => {
          this.classMap = ['subtraction', 'discount_3', 'meal', 'invoice', 'guarantee']
          if (res.data.code === 0) {
            //   console.log(this.ratingsMsg)
            this.ratingsMsg = res.data.data;
            // console.log(this.ratingsMsg)
            Vue.nextTick(()=> {
                this.ratingsScroll = new Bscroll(this.$refs.ratingsWrapper,{
                    probeType: 3,
                    click: true
                })
            })
          }
        });
    }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
.ratings
        position absolute
        top 184px
        bottom 0
        width 100%
        overflow hidden
        .ratings-top
            display flex
            padding 18px 0
            .ratings-gather
                text-align center
                width 137px
                font-weight normal
                border-right: 1px solid rgba(7,17,27,0.1);
                .all-score
                    font-size 24px
                    line-height 28px
                    color rgb(255, 153, 0)
                    // font-weight 500
                .name-score
                    margin-top 6px
                    font-size 12px
                    line-height 12px
                    color #000
                    
                .compare-score
                    margin 8px 0 6px 0
                    font-size 10px
                    line-height 10px
                    color #93999f
        .ratings-score
            flex 1
            margin-left 24px
            font-size 12px
            line-height 18px
            color #000
            font-weight normal
            span
                display inline-block
                
            .service-score, .goods-score
                .star-span
                    margin 0 12px
                    vertical-align middle
                    display inline-block
                    .star-item
                        width 15px
                        height 15px
                        background-size 15px 15px
                        margin-right 6px
                    .star-item:last-child
                        margin-right 0px
            .service-score
                .service-score-text
                    color #f90
            .goods-score
                margin-top 8px
                .food-score-text
                    color #f90
            .deliveryTime
                margin-top 8px
                color #000
                .deliveryTime-text
                    margin-left 12px
                    color #93999f


</style>
