<template>
    <div class="star-wrapper">
        <span class="star-item" v-for="(ele, index) in starList" :key="index" :class="ele"></span>
    </div>
</template>

<script>
export default {
    props:{
        score:{
            type: Number
        }
    },
    computed:{
        starList(){
            let starList = []
            let starNumber = Math.floor(this.score)
            for(let i = 0; i < starNumber; i ++){
                starList.push('on')
            }
            if(this.score % 1 > 0.5){
                starList.push('half')
            }
            while(starList.length < 5){
                starList.push('off')
            }
            return starList
        }
    }

}
</script>
<style lang="stylus" ref="stylesheet/stylus">
@import '../assets/stylus/index.styl' 
.star-wrapper 
    .star-item 
        display inline-block
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
    .star-item:last-child
        margin-right 0px
    .on
        bg-image('star24_on')
    .half
        bg-image('star24_half')
    .off
        bg-image('star24_off')
</style>



