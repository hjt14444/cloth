<template>
  <div class="loginOut">
    <div class="loginBlack"></div>
    <div class="loginDiv">
       <div class="loginLogo"></div>
      <p class="loginTitle">臂上眼</p>
      <div class="login">
        <div class="rightLogin">
          <div class="loginInner">
            <!-- <p class="loginP noSelect">W E L C O M E</p> -->
            <el-form  :model="ruleForm"  ref="ruleForm" >
              <el-form-item   prop="username">
                <el-input class="textarea" v-model.number="ruleForm.username" autocomplete="off" placeholder="请输入账号">
                    <template slot="prepend"><div class="prepend_input"><span></span></div></template>
                </el-input>
              </el-form-item>
              <el-form-item  prop="password">
                <el-input  type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码">
                     <template slot="prepend"><div class="prepend_input"><span></span></div></template>
                </el-input>
               
              </el-form-item>
               <p class="loginInner_forget" >
                <router-link :to="{name:'forget'}" target="_blank"><span class="forget_span" style="float: left;cursor: pointer;">忘记密码</span></router-link>
                <router-link :to="{name:'register'}" target="_blank"><span class="register_span" style="float: right;">立即注册</span></router-link>
              </p>
              <el-form-item>
                <el-button type="primary" @click="login('ruleForm')" class="login_btn"><span class="loginspan">登录</span></el-button>
              </el-form-item>
              
            </el-form>
          </div>
        </div>
      </div>
    </div>
  
  
  </div>
</template>

<script>
  import axios from 'axios'
  import {LOGIN} from '../../api/types'
  import myBMap from '../../assets/js/adress/myBMap.js'
  export default {
    name:'login',
    data() {
      return {
        ruleForm: {
          password: '',
          username:'',
        },
        city:'湛江市',     //当地城市
        province:'广东省', //当地省份
        Weather:{},       //当地天气
      };
    },
    methods: {
      //登录
      async login(){
        var {password,username} = this.ruleForm
        if(password&&username){
          var result = await LOGIN({username,password})
          if(result.status == 0){
            this.message('登陆成功',1000,'success')
            this.resetForm('ruleForm')
            this.$router.replace({name:'manage'})
          }else{
            this.message(result.msg,1500,'error')
          }
        }else{
          this.message('账号或密码不能为空',1500,'warning')
        }
      },
      //提示消息
      message(message,duration,type){
        this.$message({
          message,
          duration,
          type
        })
      },
      // 清空表单
      resetForm(formName){
        this.$refs[formName].resetFields();
      },
      //定位
      getCity(){
        myBMap().then(BMap=>{
          const geolocation = new BMap.Geolocation()
          geolocation.getCurrentPosition((position)=>{
            console.log("position",position);
            console.log(position)
            this.city = position.address.city;             //获取城市信息
            this.province = position.address.province;     //获取省份信息
            this.getTianQi()                               //定位成功获取当地的天气
          },(e)=>{  //定位失败
            this.getTianQi()                               //定位失败只能获取初始化数据的天气
          }, {provider: 'baidu'})
        })
      },
      //获取天气
      async getTianQi(){
        var {city} = this
        var result = await axios.get('http://wthrcdn.etouch.cn/weather_mini?city='+this.city)
        console.log(result)
        result = result.data
        this.Weather = result.data.forecast[0] || {}
        console.log("天气");
        console.log(this.Weather)
        var {province,Weather} = this
        var date = new Date()
        var cityWeather = {
          city,
          province,
          Weather,
          date:{
            year:date.getFullYear(),
            month:date.getMonth(),
            date:date.getDate(),
          },
        }
        localStorage.setItem('HCjiaotongCityWeather',JSON.stringify(cityWeather))
      },
    },
    mounted () {
      this.getCity()   //获取定位
    },
  }
</script>


<style lang="less">
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .loginOut{
      height: 100vh;
      background-image: url("../../assets/imgs/login/login.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
    .loginDiv{
        height: 100vh;
        width: 40vw;
        background: #D4E8F5;
        opacity: 0.6;
        margin: 0 auto;
        padding-top: 130px;
        text-align: center;
        .loginLogo{
            width: 121px;
            height: 121px;
            background: #F9FCFF;
            border: 4px solid #81B4DA;
            border-radius: 50%;
            background-image: url("../../assets/imgs/logo/logo.png");
            background-size:100% 100%;
            background-repeat: no-repeat;
            margin:0px auto;
        }
        .loginTitle{
                width: 281px;
                height: 34px;
                font-size: 36px;
                font-family: Alibaba PuHuiTi;
                font-weight: 400;
                color: #1D5D8D;
                margin:18px auto 48px auto;
                cursor: pointer;
            }
        .login{
            .rightLogin{
                .loginInner{
                    margin: 0 auto;
                    .el-input{
                        width: 70%;
                        .el-input-group__append, .el-input-group__prepend{
                            background-color:#1D5D8D; 
                            padding:10px;
                            .prepend_input{
                                span{
                                    width: 20px;
                                    height: 20px;
                                    display: block;
                                    background-image: url("../../assets/imgs/logo/admin.png");
                                    background-size:100% 100%;
                                    background-repeat: no-repeat;
                                }
                            }
                        }
                     }
                     .login_btn{
                        width:70%;
                        height: 62px;
                        font-size: 24px;
                        letter-spacing:3px;
                        font-family: Alibaba PuHuiTi;
                        font-weight:400;
                        background: #04528d;
                        border: 1px solid #8BBADD;
                        border-radius: 15px;
                     }
                     .loginInner_forget{
                         width: 70%;
                         margin: 0 auto;
                         padding: 0px 0 60px 0;
                         height: 23px;
                        font-size: 24px;
                        font-family: Alibaba PuHuiTi;
                        font-weight: 400;
                        color: #3A709A;
                        .forget_span,.register_span{
                            color: #022846;
                        }
                     }
                }
            }
        }
    }
  }
  
  @media screen and(max-width: 1200px) and (min-width: 800px){
     .loginOut{
    .loginDiv{
        width: 60vw;
  }
  }
  }
   @media screen and(max-width: 800px) and (min-width: 300px){
     .loginOut{
    .loginDiv{
        width: 100vw;
  }
  }
  }
  @media screen and(max-width: 500px) and (min-width: 300px){
     .loginOut{
    .loginDiv{
        padding-top: 70px;
        .login{
            .rightLogin{
                .loginInner{
                    margin: 0 auto;
                     .loginInner_forget{
                        font-size: 18px;
                        font-weight: 400;
                         padding: 0px 0 50px 0;
                     }
                }
            }
        }
  }
  }
  }
</style>
