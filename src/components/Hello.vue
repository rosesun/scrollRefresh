<template>
    <div class="scroll-box">
        <div class="scroll"
        @touchStart="touchStart($event)"
        @touchMove="touchMove($event)"
        @touchend="touchEnd($event)">
              <section class="inner">
                  <header class="pull-refresh">
                      <slot name="pull-refresh">
                          <span class="down-tip">下拉更新</span>
                          <span class="up-tip">松开刷新数据</span>
                          <span class="refresh-tip" v-show="downLoading">加载中……</span>
                      </slot>
                  </header>
                  <slot name="list">

                  </slot>
                  <footer class="load-more">
                      <slot name="load-more">
                          <span >上拉加载更多</span>
                          <span class="refresh-tip" v-show="upLoading">加载中……</span>
                      </slot>
                  </footer>
                  <div class="nullData" v-show="noData">暂无更多数据</div>
              </section>
          </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    props:{
        next: {
            type: Function,
            required: true
        },
        up: {
            type: Function,
            required: true
        }
    },
  data() {
      return{
          upLoading:false,
          downLoading:false,
          noData:false,
          clientHeight:0,//当前屏幕的高度
          scrollTop:0,//滚出页面顶部距离
          innerHeight:0,//页面高度
      }

},
methods:{
    //开始滚动
    touchStart(e){
        console.log('开始滚动')

    },
    //滚动途中，判断是到达底部还是顶部，在适当的距离显示出刷新的提示
    touchMove(e){
        console.log(e.targetTouch[0]);
        console.log(123)

    },
    touchEnd(e){
        var $vm = this;
        // this.clientHeight = this.$el.clientHeight;
        // this.scrollTop = this.$el.scrollTop;
        // this.innerHeight = this.$el.scrollHeight;
        this.clientHeight = window.innerHeight;
        this.scrollTop = document.body.scrollTop;
        this.innerHeight = document.body.scrollHeight;
        console.log(document.body.scrollHeight);//可滚动的页面的高度
        console.log(window.innerHeight);//屏幕的高度
        console.log(document.body.scrollTop);//滚出屏幕的高度

        // console.log(this.$el.scrollTop);//当前元素滚出页面的高度
        // console.log(this.$el.clientHeight);//当前元素的高度
        // console.log(this.$el.scrollHeight);//可滚动元素的高度

        if( this.scrollTop + this.clientHeight + 5 >= this.innerHeight){
            console.log('到达底部');
            this.getList();

        }else{
            console.log('未到达底部')
        }
        if (this.scrollTop == 0){
            console.log('到达顶部');
            this.downLoading = true;
            this.refresh();
        }

    },
    getList(){
        let $vm = this;
        if ( $vm.noData ){
            return;
        }
        $vm.upLoading = true;
        $vm.next().then((res) => {
            if ( res.data.success ){
                if (res.data.dataList.length <= 0){
                    $vm.noData = true;
                }
                $vm.upLoading = false;
            } else {
                console.log('加载数据失败')
            }
        }).catch( (res) => {
            $vm.upLoading = false;

        });
    },
    refresh(){
        this.up().then((res) => {
            if( res.data.success ){
                this.downLoading = false;
            } else {
                console.log('更新失败');
            }
        }).catch( (res) => {
            this.downLoading = false;
            console.log(res)
        })
    },

}
}
</script>


<style>
html,body{
    height:100%;
}
.scroll-box{
    height:100%;
    overflow: scroll;
}
.scroll{
    height:100%;
}
.refresh-tip{
    display:inline-block;
    text-align: center;
    line-height: 80px;
    height:80px;
    width:100%;
}
.pull-refresh{
    height:50px;
}

</style>
