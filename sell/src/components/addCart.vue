<template>
    <!-- <transition name="disppear"> -->
        <div class="add-cart" @click="addFirst" v-show="showCart">加入购物车</div>  
    <!-- </transition> -->
</template>
<script>
export default {
    props:{
        food:{
            type: Object
        }
    },
    data(){
        return {
            showCart: true
        }
    },
    methods:{
        addFirst(){
            
            this.food.count = 1
            this.showCart = false
            console.log(this.food.count)
        }
    }
}
</script>
<style lang="stylus" ref="stylesheet/stylus">

</style>


