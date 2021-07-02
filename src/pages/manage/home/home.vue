<template>
 <div class="home">
<el-container>
  <el-header>
    <div class="home_nav">
      <span class="nav_img"><img src="../../../assets/imgs/logo/head_nav.png"></span>
      <span class="home_nav_txt" @click="$router.replace({name:'mainPage'})" :class="{border:$route.name=='mainPage'}">云预警平台</span> 
      <span class="home_nav_txt" @click="$router.replace({ name: 'history' })" :class="{border:$route.name=='history'||$route.name=='history_video'}">历史记录</span> 
      <span class="home_nav_txt" @click="$router.replace({ name: 'video' })" :class="{border:$route.name=='video'}">视频监控</span> 
      </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
          <span class="el-dropdown-link"><img src="../../../assets/imgs/logo/logo.png" class="user"/></span>
          <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
      </el-dropdown>
      <span class="el-dropdown-text">hi,海创</span>
      </div>
    <!-- 右边图像 -->
  </el-header>
  <el-main>
    <router-view></router-view>
  </el-main>
</el-container>
 </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   components: {

   },
   methods: {
   },
   mounted () {
     console.log(this.$route.name);
   }
 }
</script>

<style lang="less">
.home{
  .el-header{
    height: 50px  !important;
    padding: 0;
    background: #d9edfa;
    //opacity: 0.9;
    text-align: center;
    line-height: 50px;
    
    .home_nav{
      height: 50px;
      line-height: 50px;
      width: auto;
      padding-left:20px;
      float: left;
      .nav_img{
        display: block;
        float: left;
        width: 50px;
        height:50px;
        padding: 10px;
        box-sizing: border-box;
        img{
          height: 30px;
          width: 30px;
        }
      }
      .home_nav_txt{
      display: block;
      float: left;
      width: 88px;
      height: 40px;
      font-size:16px;
      font-family: Alibaba PuHuiTi;
      margin:0 20px;
      font-weight: 400;
      color: #666666;
      line-height: 50px;
      cursor: pointer;
      }
      .border{
            border-bottom: 3px solid rgb(218, 130, 30) ;
  
      }
      
    }
     .r-content {
                float: right;
                width: auto;
                padding: 10px;
                 .el-dropdown {
                    vertical-align: top;
                }
                .el-dropdown + .el-dropdown {
                    margin-left: 15px;
                }
                .el-icon-arrow-down {
                    font-size: 12px;
                }
                .user {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                }
                .el-dropdown-text{
                  display: block;
                  float: right;
                  height: 30px;
                  line-height: 30px;
                  width: 70px;
                  font-size: 16px;
                  font-family: Alibaba PuHuiTi;
                  font-weight: 400;
                  color: #666666;
                }
                }
  }
  .el-main {
    height: calc(100vh - 50px);
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    margin: 0;
    padding: 0;

  }
}
</style>
