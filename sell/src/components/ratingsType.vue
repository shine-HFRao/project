<template>
    <div class="ratingstype-wrapper">
        <div class="rating-type">
            <span class="selector good" :class="{active: currentType === 2}" @click="selectType(2)">{{commentsTypes[0]}}{{ratingsMsg ? ratingsMsg.length : 0}}</span>
            <span class="selector good" :class="{active: currentType === 0}" @click="selectType(0)">{{commentsTypes[1]}}{{ratingsMsg ? goodNumber : 0}}</span>
            <span class="selector bad" :class="{active: currentType === 1}" @click="selectType(1)">{{commentsTypes[2]}}{{ratingsMsg ? badNumber : 0}}</span>
        </div>
        <div class="only-ratings">
            <span class="icon-check_circle" :class="{onlycontent: onlyContent}" @click="selectContent"></span>
            <span @click="selectContent">只看由内容的评价</span>
        </div>
        <div class="ratings-content" v-if="ratingsMsg && ratingsMsg.length && ratingsMsg[0].recommend">
            <ul>
                <li class="single-content" v-for="(item, index) in ratingsMsg" :key="index" v-show="allowShow(item)">
                    <div class="avatar">
                        <img :src="item.avatar" alt="">
                    </div>
                    <div class="content">
                        <div class="name-date">
                            {{item.username}}
                            <span class="ratetime">{{item.rateTime | formatDate}}</span>
                        </div>
                        <Star :score="item.score"></Star>
                        <div class="comment">{{item.text}}</div>
                        <div class="recommend">
                            <span class="icon-thumb_up"></span>
                            <span class="good-food" v-for="(food, index) in item.recommend" :key="index">{{food}}</span>
                        </div> 
                    </div>
                </li>
            </ul>
        </div>
        <div class="ratings-content2" v-else-if="ratingsMsg">
            <ul>
                <li class="single-content" v-for="(item, index) in ratingsMsg" :key="index" v-show="allowShow(item)">
                    <div class="user">
                        <span class="name">{{item.username}}</span>
                        <img :src="item.avatar" alt="" class="avatar">
                    </div>
                    <div class ="time">
                        {{item.rateTime | formatDate}}   
                    </div>
                    <p class="text">
                        <span class="icon-thumb_up"></span>
                        {{item.text}}
                    </p>
                </li>
            </ul>
        </div>
        <div class="ratings-content3" v-else>
            无评价内容
        </div>
    </div>
    
</template>
<script>
import Star from './star'
import {formatDate} from '../js/date';
export default {
    data(){
        return {
            currentType:2,
            onlyContent: false
        }
    },
    components:{
        Star
    },
    props:{
        commentsTypes:{
            type:Array
        },
        ratingsMsg:{
            type:Array,
            // default:[]
        }
    },
    computed:{
        goodNumber(){
            let all = 0;
            this.ratingsMsg.forEach(function (ele, index){
                if(ele.rateType === 0){
                    all ++
                }
            })  
            return all
        },
        badNumber(){
            return this.ratingsMsg.length - this.goodNumber 
        }
    },
    methods:{
        selectType(type){
            this.currentType = type
            
        },
        selectContent(){
            this.onlyContent = !this.onlyContent
        },
        allowShow(item){ 
            //data中数据改变后，如果methods中的一个函数包含data中的这个数据，函数会响应改变
            if(this.currentType == 2){
                if(!this.onlyContent){
                    
                    return true
                }
                if(this.onlyContent == (item.text.length > 0)){
                    return true
                }
            }
            if(this.currentType == item.rateType){
                if(!this.onlyContent){
                    
                    return true
                }
                if(this.onlyContent == (item.text.length > 0)){
                    
                    return true
                }
            }
            return false
        }
    },
    filters:{
        formatDate(time){
            
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    },
    created(){
        // console.log(this.ratingsMsg)
    }
}
</script>
<style lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl' 
.ratingstype-wrapper
    
    .rating-type
        font-weight normal
        font-size: 0;
        padding: 18px 0;
        margin: 0 18px;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        .selector
            border-radius 2px
            font-size 12px
            color #4d555d
            line-height 16px
            margin-right 8px
            padding 8px 12px
        .good
            background-color: rgba(0,160,220,0.2)
            &.active
                background: #00a0dc;
                color #fff
        .bad
            background: rgba(77,85,93,0.2)
            &.active
                background: #4d555d;
                color #fff
        
    .only-ratings
        border-bottom: 1px solid rgba(7,17,27,0.1);
        color: #93999f;
        padding 12px 18px   
        line-height 24px
        font-size 12px   
        .onlycontent
            color green
        .icon-check_circle  
            vertical-align top
    .ratings-content
        padding 0 18px
        .single-content
            color #000
            font-weight normal
            padding 18px 0
            display flex
            border-bottom: 1px solid rgba(7,17,27,0.1);
            .avatar
                width 28px
                height 28px
                margin-right 12px
                img 
                    width 28px
                    height 28px
                    border-radius 50%
            .content
                flex 1
                .name-date
                    font-size 10px
                    line-height 12px
                    text-align left    
                    .ratetime
                        float right
                        color #93999f
                .star-wrapper
                    margin-top 4px
                    font-size 0px
                    .star-item
                        width 10px
                        height 10px
                        background-size 10px 10px
                        margin-right 3px
                    .star-item:last-child
                        margin-right 6px
                .comment
                    margin-top 6px
                    font-size 12px
                    line-height 18px
                .recommend
                    margin-top 8px
                    font-size 0px
                    color #93999f
                    span    
                        display inline-block
                    .icon-thumb_up
                        font-size 12px
                        line-height 16px
                        color #00a0dc
                    .good-food
                        padding 0 6px
                        margin-left 8px
                        margin-bottom 4px
                        font-size 9px
                        color #93999f
                        line-height 16px
                        border 1px solid rgba(7, 17, 27, 0.1)
                        border-radius 2px
    
    .ratings-content2
        padding: 0 18px;
        .single-content
            padding: 16px 0;
            border-1px(rgba(7,17,27,0.1))
            .user
                position: absolute;
                right: 0;
                top: 16px;
                line-height: 12px;
                font-size: 0;
                .name
                    display: inline-block;
                    margin-right: 6px;
                    vertical-align: top;
                    font-size: 10px;
                    color: #93999f;
                .avatar
                    width 12px
                    height 12px
                    border-radius: 50%;
            .time
                margin-bottom: 6px;
                line-height: 12px;
                font-size: 10px;
                color: #93999f;
            .text
                line-height: 16px;
                font-size: 12px;
                color: #07111b;
                .icon-thumb_up
                    margin-right: 4px;
                    line-height: 16px;
                    font-size: 12px;
                    color: #00a0dc;

            


</style>