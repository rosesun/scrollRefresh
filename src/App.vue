<template>
    <div class="scroll-box">
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
                      <ul>
                          <li v-for="item in dataRefresh">
                              {{ item.name }}
                          </li>
                          <li v-for="item in dataList">
                              {{ item.name }}
                          </li>
                      </ul>
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
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
      return{
          clientHeight:0,//当前屏幕的高度
          scrollTop:0,//滚出页面顶部距离
          innerHeight:0,//页面高度
          dataList:[],//下拉刷新数据
          dataRefresh:[]//上拉刷新数据
      }

},
methods:{
    touchStart(e){
        console.log(this.$el.scrollTop);

    },
    touchMove(e){
        console.log(this.$el.scrollTop);

    },
    touchEnd(e){
        this.clientHeight = this.$el.clientHeight;
        this.scrollTop = this.$el.scrollTop;
        this.innerHeight = this.$el.scrollHeight;
        console.log(123);
        console.log(this.$el.scrollTop + 'dd1');//滚出页面的高度
        console.log(this.$el.clientHeight + 'dd2');//当前屏幕的高度
        console.log(this.$el.scrollHeight + 'dd3');//当前页面的高度

        if( this.scrollTop + this.clientHeight + 5 >= this.innerHeight){
            console.log('到达底部');
            this.getList();
        }else{
            console.log('未到达底部')
        }
        if (this.scrollTop == 0){
            console.log('到达顶部');
            this.refresh();

        }

    },
    getList(){
        axios.get('/api/moreData').then((res) => {
            if(res.data.success){
                this.dataList = this.dataList.concat(res.data.dataList);

            } else {
                console.log(res)
            }

        }).catch( (error) => {
            console.log(error)
        });
    },
    refresh(){
        axios.get('/api/refresh').then((res) => {
            if( res.data.success ){
                this.dataRefresh = res.data.dataList;
            } else {
                console.log(res);
            }
        }).catch( (error) => {
            console.log(error);
        })
    }

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
    height:2000px;
}

</style>
