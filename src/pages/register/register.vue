<template>
  <div class="register">
    <div class="nav">
      <div class="inner">
        <router-link :to="{name:'main'}">
          <div class="logo">
            <span>海创-臂上眼</span>
          </div>
        </router-link>
      </div>
    </div>
    <div class="registerDiv">
      <div class="find">
        <el-steps :space="330" :active="active"  align-center>
          <el-step title="账号/密码设置"></el-step>
          <el-step title="信息完善"></el-step>
          <el-step title="注册成功"></el-step>
        </el-steps>
        <div class="info" v-show="active == 0">
          <div class="inputRow"><span class="name">账号：</span><el-input v-model="username" autocomplete="new-password" placeholder="请输入您的用户名，最多12位" @blur="ruleUser" :suffix-icon="`${usernameOk?usernameOk=='yes'?'el-icon-circle-check':'el-icon-circle-close':''}`"></el-input></div>
          <div class="inputRow"><span class="name">密码：</span><el-input placeholder="请输入密码" autocomplete="new-password" v-model="password" show-password></el-input></div>
          <div class="inputRow"><span class="name">确认密码：</span><el-input placeholder="请再次输入密码" autocomplete="new-password" v-model="password1" show-password></el-input></div>
          <div class="inputRow"><el-button type="primary" @click="toTwo">下一步</el-button></div>
          <router-link :to="{name:'login'}">
            <div class="inputRow"><el-button type="danger">已有账号，返回登陆</el-button></div>
          </router-link>
        </div>
        <div class="info" v-show="active == 1">
          <div class="inputRow"><span class="name">密保问题：</span><el-input prefix-icon="el-icon-question" v-model="question" placeholder="请输入密保问题"></el-input></div>
          <div class="inputRow"><span class="name">密保答案：</span><el-input prefix-icon="el-icon-unlock"  v-model="answer" placeholder="请输入密保答案"></el-input></div>
          <div class="inputRow"><span class="name">手机：</span><el-input  prefix-icon="el-icon-phone-outline" v-model="phone" autocomplete="off" placeholder="请输入您的手机号" @blur="rulePhone" :suffix-icon="`${phoneOk?phoneOk=='yes'?'el-icon-circle-check':'el-icon-circle-close':''}`"></el-input></div>
          <div class="inputRow"><span class="name">邮箱：</span><el-input  prefix-icon="el-icon-message" v-model="email" autocomplete="off" placeholder="请输入您的邮箱" @blur="ruleEmail" :suffix-icon="`${emailOk?emailOk=='yes'?'el-icon-circle-check':'el-icon-circle-close':''}`"></el-input></div>
          <div class="inputRow"><el-button type="primary" @click="register()">注&nbsp;册</el-button></div>
        </div>
        <div class="info" v-show="active == 3">
          <div class="inputRow"><span class="registerSuccess"><i class="el-icon-success"></i>恭喜您，注册成功</span></div>
          <router-link :to="{name:'login'}"><div class="back_login"><el-button>返回登录</el-button></div></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
   import {REGISTER,CHECKVALID} from '../../api/types'
  export default {
    name:'register',
    data () {
      return {
        username:'',   //账号
        question:'',   //问题
        answer:'',     //答案
        password:'',    //密码
        password1:'',  //验证密码
        phone:'',     //电话
        email:'',      //邮箱
        usernameOk:'',   //用户名是否可用
        userError:'',    //用户名错误信息
        emailOk:'',     //邮箱是否正确
        emailError:'',     //邮箱错误信息
        phoneOk:'',     //手机是否正确
        phoneError:'',     //手机错误信息
        active: 0,     //当前第几步
      }
    },
    mounted () {

    },
    methods: {
      //下一步
      next() {
        this.active++
      },
      //去第二步
      async toTwo(){
        var {username,password,password1,usernameOk,userError} = this
        if(username&&password&&password1){
          if(usernameOk !== 'yes' && userError){
            this.message(userError,1500,'error')
            return
          }
          if(password !== password1){
            this.message('两次密码输入不一致',1500,'error')
            this.password1 = ''
            return
          }
          this.next()
        }else{
          this.message('请输入完整信息再注册',1500,'warning')
        }
      },
      //注册
      async register(){
        var {username,password,phone,email,question,answer,emailOk,phoneOk,emailError,phoneError} = this
        if(phone&&email&&question.trim()&&answer.trim()){
          if(emailOk == 'yes' && phoneOk == 'yes'){
            //收集表单
            var params = new FormData()
            params.append('username',username)
            params.append('password',password)
            params.append('phone',phone)
            params.append('email',email)
            params.append('question',question)
            params.append('answer',answer)
            var result = await REGISTER(params)
            if(result.status == 0){
              this.message(result.msg,1500,'success')
              console.log(result)
              this.active = 3
            }else{
              this.message(result.msg,1500,'error')
            }
          }else{
            if(emailOk !== 'yes' && emailError){
              this.message(emailError,1500,'error')
            }else if(phoneError !== 'yes' && phoneError){
              this.message(phoneError,1500,'error')
            }
          }
        }else{
          this.message('请输入完整信息',1500,'warning')
        }
      },

      //检验用户名
      async ruleUser(){
        var {username} = this
        if(username.trim()){
          var result = await CHECKVALID({str:username,type:'username'})
          if(result.status == 0){
            this.usernameOk = 'yes'
          }else{
            this.usernameOk = 'no'
            this.userError = result.msg
            this.message(result.msg,1500,'error')
          }
        }else{
          this.usernameOk = ''
        }
      },
      //邮箱验证
      async ruleEmail(){
        var {email} = this
        var regEmail=/^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/
        if(!regEmail.test(email)){
          this.message('邮箱格式不正确',1500,'error')
          this.emailError = '邮箱格式不正确'
          this.emailOk = 'no'
        }else{
          var result = await CHECKVALID({str:email,type:'email'})
          if(result.status == 0){
            this.emailOk = 'yes'
          }else{
            this.emailOk = 'no'
            this.emailError = result.msg
            this.message(result.msg,1500,'error')
          }
        }
      },
      //手机验证
      rulePhone(){
        var {phone} = this
        var regPhone = /^1[34578]\d{9}$/ ;
        if(!regPhone.test(phone)){
          this.message('手机号码不正确',1500,'error')
          this.phoneError = '手机号码不正确'
          this.phoneOk = 'no'
        }else{
          this.phoneOk = 'yes'
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
    },
    watch:{
       username(newval,oldval){
        if(newval.length>12){
          this.message('用户名最多输入12位',1200,'warning')
          this.username = newval.slice(0,12)
        }
      },
    }
  }
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
}
  .register{
    width: 100vw;
    height: 100vh;
    background-image: url("../../assets/imgs/login/login.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    overflow: hidden;
    background-color:#D4E8F5 ;
    opacity: .8;
    .nav{
      width:100vw;
      height: 100px;
      padding: auto;
      vertical-align: center;
      .inner{
        width: 100vw;
        height: 100px;
        box-sizing: border-box;
        padding-left:150px;
        vertical-align: center;
        margin: auto;
        .logo{
          float: left;
          width: 300px;
          height: 100px;
          overflow: hidden;
          span{
            display: inline-block;
            width:300px;
            margin: 30px 0;
            height: 50px;
            line-height: 50px;
            font-size: 45px;
            font-weight: bold;
            // font-family: '宋体';
            font-family: 'Courier New';
            border-right: 2px solid rgb(234,234,234);
            color: #fff;
            cursor: pointer;
          }
        }
        // .find{
        //   display: inline-block;
        //   font-size: 20px;
        //   height: 40px;
        //   line-height: 40px;
        //   margin-top: 35px;
        //   margin-left: 15px;
        // }
        .right{
          float: right;
          height: 20px;
          margin-top: 60px;
          span{
            font-size: 14px;
            margin-right: 20px;
            color: rgb(134,134,134);
            &:hover{
              color: rgb(0,0,0);
            }
          }
        }
      }
    }
    .registerDiv{
      width: 100vw;
      margin: 15px auto;
      padding: 40px;
      .find{
        width: 690px;
        margin: auto;
        height: 500px;
        // .el-step__title.is-process{
        //   color: rgb(0, 119, 255);
        // }
        // .register .registerDiv .find .el-step__title.is-process{
        //   color: rgb(0, 119, 255);
        // }
        .el-step__title.is-finish{
          color: rgb(0, 119, 255);
        }
        .el-step__title.is-wait{
          color: rgb(75, 74, 74);
        }
        .info{
          max-width: 420px;
          margin: 75px auto;
          .back_login{
          display: inline-block;
          font-size: 20px;
          height: 40px;
          line-height: 40px;
          margin-top: 35px;
          margin-left: 15px;
        }
          .inputRow{
            margin: 25px 0px;
            span.name{
              display: inline-block;
              width: 80px;
              height: 40px;
              line-height: 40px;
              font-size:16px;
              font-weight:800;
              float: left;
              text-align: right;
              color:#012744;
            }
            span.registerSuccess{
              display: block;
              height: 50px;
              line-height: 50px;
              font-size: 25px;
              text-align: center;
              margin-bottom: 40px;
              i{
                font-size: 30px;
                color: greenyellow;
                margin-left: 20px;
                margin-right: 15px;
              }
            }
            .el-input{
              float: left;
              width: 320px;
            }
            &:before,&:after{
              display: table;
              content: '';
              clear: both;
            }
            .el-icon-circle-check{
              color: greenyellow;
            }
            .el-icon-circle-close{
              color: red;
            }
            .is-disabled .el-input__inner{
              color: black!important;
            }
            .el-button{
              width: 320px;
              float: right;
              margin-right: 20px;
              background-color: #1D5D8D;
            }
            .el-button--danger{
              border-color: transparent;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 899px){
    .register{
      .nav{
        margin-bottom: 50px;
        .inner{
          margin:0;
          padding-left:50px;
          .logo span{
            border-right:0px;
          }
        }
      }
      .registerDiv{
        margin: 0 auto;
        .find{
          padding: 15vw;
          .info{
            margin-left: 0;
          }
          .el-steps{
            width:70vw !important;
            margin-left: -20px;
          }
        }
      }
    }
  }
  @media screen and (max-width:600px){
    .register{
      .registerDiv{
        padding: 0;
        margin: 0 auto;
        .find{
          width: 85vw;
          padding: 0;
          .info{
            margin-left: 0;
            .inputRow{
            .el-input{
              width: 220px;
            }
            .el-button{
              width: 220px;
              margin-right:50px
            }
            }
          }
          .el-steps{
            width:90vw !important;
            margin-left: 0px;
          }
        }
      }
    }
  }
    @media screen and (max-width:380px){
      .register{
        .registerDiv{
          .find{
            .info{
              .inputRow{
                .el-button{
                  margin-right: 20px;
                }
              }
            }
          }
        }
      }
    }
</style>
