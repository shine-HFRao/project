<template>
  <div class="goodWrapper">
    <div class="goods-msg">
      <div class="goods">
          <div class="menu-wrapper" ref="menuWrapper">
            <div>
              <div ref="menuList" v-for="(ele, index) in goodsMsg" class="menu" :key="index" :class="{currentMenu: currentIndex === index}" @click="selectIndex(index, $event)">
                <div class="menu-msg">
                  <span v-show="ele.type > 0" :class="classMap[ele.type]" class="dis-icon"></span>
                  {{ele.name}}
                </div>
              </div>
            </div>
          </div>
          <!-- 将class为foods-wrapper的dom放到$ref对象上 -->
          <div class="foods-wrapper" ref="foodsWrapper">
            <div>
            <div class="foods-type" v-for="(type, index1) in goodsMsg"  :key="index1">
              <div class="type-name">{{type.name}}</div>
              <ul>
                 
                <li v-for="(food, index2) in type.foods" :key="index2" class="foods-msg" :class="{'has-border': index2 !== type.foods.length - 1}">
                  <div  @click="selectFood(food, $event)" class="foods-img">
                    <img :src="food.icon" alt="">
                  </div>
                  <div  @click="selectFood(food, $event)" class="foods-summary">
                    <div class="food-name">{{food.name}}</div>
                    <div v-show="food.description" class="food-des">{{food.description}}</div>
                    <div class="food-des">
                      <span>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>  
                    </div>
                    <div class="food-price">
                      <span class="price">￥{{food.price}}</span><span v-show="food.oldPrice" class="old-price">￥{{food.oldPrice}}</span>
                    </div>
                  </div>
                  <span class="cartControll-wrapper">
                    <CartControll :food="food"></CartControll>
                  </span>
                </li>
              </ul>
            </div>
            </div>
          </div>
      </div>
      
      <shopping :selectedFoods="selectedFoods" :deliveryPrice="sellerMsg.deliveryPrice" :minPrice="sellerMsg.minPrice"></shopping>
    </div>
    <FoodDetail :selectedFood="selectedFood" ref="foodDetailWrapper"></FoodDetail>
  </div>
  
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import Bscroll from 'better-scroll' //引入滑动组件
import Shopping from './shopping'
import CartControll from './cartControll'
import FoodDetail from './foodDetail'
export default {
  name: "goods",
  props:{
    sellerMsg: {
      type: Object
    }
  },
  data() {
    return {
      goodsMsg: [],
      heightList: [],
      scrollY: 0,
      shopData: {},
      selectedFood:{}
      // iconMap:['','decrease_4', 'special_4']
    }
  },
  components:{
    Shopping,
    CartControll,
    FoodDetail
  },
  computed: {
    currentIndex(){
      let len = this.heightList.length
      for(let i = 0; i < len; i ++){
        let height1 = this.heightList[i]
        let height2 = this.heightList[i + 1]
        if(this.scrollY >= height1 && this.scrollY < height2){
          this._followScroll (i)
          return i
        }
      } 
      if(this.scrollY < 0){
        return 0
      }
      if(this.scrollY >= this.heightList[len - 1]){
        return len - 1
      }
    },
    selectedFoods(){
      let foodList = []
      this.goodsMsg.forEach(good => {
        good.foods.forEach(food => {
          if(food.count){
            foodList.push(food)
          } 
        })
      })
      return foodList
    }
  },
  methods:{
    selectIndex($index, $event){
      let self = this
      this.foodsScroll.off('scroll', self.scrollChange)
      if(!$event._constructed){
        return 
      }
      let foodsList = this.$refs.foodsWrapper.getElementsByClassName('foods-type')
      if(this.scrollY !== this.heightList[$index]){
        this.scrollY = this.heightList[$index]
        
      }
      this.foodsScroll.scrollToElement(foodsList[$index], 300)
      // this.foodsScroll.on('scroll', (pos) => {
      //   this.scrollChange(pos)
      // })
      setTimeout(() => {
        
        this.foodsScroll.on('scroll', self.scrollChange)
      },400)
      
    },
    _initScroll(){
      this.menuScroll = new Bscroll(this.$refs.menuWrapper,{
        probeType: 3,
        click: true
      })  
      this.foodsScroll = new Bscroll(this.$refs.foodsWrapper,{
        probeType: 3,
        click: true
      })
      let self = this
      this.foodsScroll.on('scroll', self.scrollChange)
    },
    _caculateHeight(){
      let foodsList = this.$refs.foodsWrapper.getElementsByClassName('foods-type')
      let height = 0
      let len = foodsList.length
      this.heightList.push(height)
      for(let i = 0; i < len; i ++){
        height += foodsList[i].clientHeight
        this.heightList.push(height)
      }
    },
    scrollChange(pos){
       this.scrollY = Math.abs(Math.round(pos.y))
    },
    _followScroll (index) {
        let menuList = this.$refs.menuList;
        let el = menuList[index];
        this.menuScroll.scrollToElement(el, 300, 0, true);
    },
    selectFood(food, e){
      if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.foodDetailWrapper.show();
    }
  },
  created() {
    if(!this.goodsMsg.length){
        axios.get("/good/goods").then(res => {
          this.classMap = ['subtraction', 'discount_3', 'meal', 'invoice', 'guarantee']
          if (res.data.code === 0) {
            this.goodsMsg = res.data.data;
            Vue.nextTick(()=> {
              this._initScroll() //dom绑定一个scroll
              this._caculateHeight()//计算foods高度
            })
          }
        });
    }
    
  }
};
</script>

<style lang="stylus" ref="stylesheet/stylus">
// 下面这个每个单独的文件使用到时都要单独引入
@import '../assets/stylus/index.styl' 
.goods-msg
  position absolute
  top 184px
  bottom 0
  width 100%
  .goods 
      z-index 1
      display: flex;
      position:absolute;
      bottom 48px
      top:0px 
      width: 100%;
      overflow hidden
      .menu-wrapper 
          flex: 0 0 80px;
          background-color: #f3f5f7;
          width 80px
          
          .menu
            padding 0 12px
            font-size 12px
            line-height 14px;
            font-weight 200
            // color rgb(240, 20, 20)
            position relative
            &.currentMenu
              margin-top -1px
              z-index 10
              .menu-msg
                border-none()
              font-weight 700
              background-color #fff

            .menu-msg
              width 56px
              height 54px
              display table-cell  
              vertical-align middle
              border-1px(rgba(7, 17, 27, 0.1))
              .dis-icon
                display inline-block
                width 16px
                height 16px
                background-size 100% 100%
                vertical-align top
                &.subtraction
                  bg-image('decrease_3')
                &.discount_3
                  bg-image('discount_3')
                &.meal
                  bg-image('special_3')
                &.invoice
                  bg-image('invoice_3')
                &.guarantee
                  bg-image('guarantee_3')
        
      .foods-wrapper 
          flex: 1;
          height auto 
          background-color: #fff;
          .foods-type
            .type-name
              background-color #f3f5f7
              border-left 4px solid #d9dde1
              padding-left 14px
              height 26px
              font-size 12px
              line-height 26px
              color rgb(147, 153, 159)
            ul
              .foods-msg
                &.has-border
                  border-1px(rgba(7, 17, 27, 0.1))
                  padding-bottom 18px
                position relative
                margin 18px 
                .foods-img
                  float left
                  img 
                    width 57px
                    height 57px
                .foods-summary
                  margin-left 67px
                  margin-top 2px
                  .food-name
                    font-size 14px
                    color rgb(7, 17, 27)
                    line-height 14px
                  .food-des
                    span 
                      margin-right 12px
                    font-size 10px
                    line-height 16px
                    color rgb(147, 153, 159)
                    margin-top 8px
                  .food-price
                    line-height 30px
                    .price
                      font-size 16px
                      font-weight 700
                      margin-right 8px
                      color rgb(240, 20, 20)
                      
                    .old-price
                      vertical-align top  
                      font-size 10px
                      font-weight 700
                      color rgb(147, 153, 159)
                      text-decoration:line-through
                .cartControll-wrapper
                  position absolute
                  right 18px
                  bottom 18px

      


            

              

                


    

</style>

