<template>
    <div class="">
        <v-scroll :next = "getList" :up="refresh" :isLastPage="isLastPage">
            <ul slot="list">
                <li v-for="item in dataRefresh">{{item.name}}</li>
                <li v-for="item in dataList">{{item.name}}</li>
            </ul>
        </v-scroll>
    </div>
</template>

<script>
import axios from 'axios';
import scroll from './components/Hello';
export default {
    components: {
        'v-scroll':scroll
    },
  data() {
      return{
          isLastPage:false,
          dataList:[],
          dataRefresh:[]//上拉刷新数据
      }
},
methods:{
    getList(){
        return new Promise((resolve, reject) => {
            axios.get('/api/moreData').then((res) => {
                if(res.data.success){
                    console.log(this.isLastPage);
                    this.dataList = this.dataList.concat(res.data.dataList);
                    resolve();
                } else {
                    reject();
                    console.log(res)
                }

            }).catch( (error) => {
                console.log(error);
            });
        });
    },
    refresh(){
        return new Promise((resolve, reject) => {
            axios.get('/api/refresh').then((res) => {
                if( res.data.success ){
                    this.dataRefresh = res.data.dataList;
                    resolve();
                } else {
                    reject();
                    console.log(res);
                }
            }).catch( (error) => {
                console.log(error);
            })
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
    height:1000px;
}
.refresh-tip{
    display:inline-block;
    text-align: center;
    line-height: 80px;
    height:80px;
    width:100%;
}

</style>
