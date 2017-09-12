<template>
    <div class="scroll"
    @touchstart="touchStart($event)"
    @touchmove="touchMove($event)"
    @touchend="touchEnd($event)">
          <section class="inner">
              <header class="pull-refresh">
                  <slot name="pull-refresh">
                      <span class="down-tip">下拉更新</span>
                      <span class="up-tip">松开刷新数据</span>
                      <span class="refresh-tip">加载中……</span>
                  </slot>
              </header>
              <slot>
              </slot>
              <footer class="load-more">
                  <slot name="load-more">
                      <span >上啦加载更多</span>
                      <span>加载中……</span>
                  </slot>
              </footer>
              <div class="nullData" >暂无更多数据</div>
          </section>
      </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      clientHeight:0,//网页高度
      scrollTop:0,//滚出页面顶部距离
      innerHeight:0,//浏览器高度
    }
},
methods:{
    touchStart(e){
        alert(1)
        console.log(this.$el.scrollTop);

    },
    touchMove(e){
        console.log(this.$el.scrollTop);

    },
    touchEnd(e){
        console.log(123);
    }

}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
