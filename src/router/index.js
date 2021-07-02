import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
var router = new VueRouter({
  routes:[
    {
      path:'/manage',
      name:'manage',
      meta:{
        auth:true       //需要登录
      },
    component:resolve =>require(['../pages/manage/home/home.vue'],resolve),
      children:[
        {
          path:'mainPage',
          name:'mainPage',
          meta:{
            auth:true       //是否需要登录
          },
          component:resolve => require(['../pages/manage/home/main/mainPage'],resolve),
        },
        {
          path:'video',
          name:'video',
          meta:{
            auth:true       //是否需要登录
          },
          component:resolve => require(['../pages/manage/home/main/video.vue'],resolve),
        },
        {
          path:'history_video',
          name:'history_video',
          meta:{
            auth:true       //是否需要登录
          },
          component:resolve => require(['../pages/manage/home/main/history_video.vue'],resolve),
        },
        {
          path:'history',
          name:'history',
          meta:{
            auth:true       //是否需要登录
          },
          // component:resolve => require(['../pages/manage/home/main/history.vue'],resolve),
          component:resolve => require(['../pages/manage/home/main/history2.vue'],resolve),
        },
      ],
      redirect:{name:'mainPage'}
    },
    {
      path:'/login',
      name:'login',
      component:resolve => require(['../pages/Login/Login.vue'],resolve),
    },
    {
      path:'/register',
      name:'register',
      component:resolve => require(['../pages/register/register.vue'],resolve),
    },
    {
      path:'/forget',
      name:'forget',
      component:resolve => require(['../pages/forget/forget.vue'],resolve),
    },
    {
      path:'/',
      redirect:to => {
        return 'login'
      }
    },
    {
      path:'',
      redirect:to => {
        return '/login'
      }
    },
    // {
    //   path:'*',
    //   redirect:to => {
    //     return '/error'
    //   }
    // },
  ]
})
//开启之后如果没有从登录页面登录的话会返回登录页面
// router.beforeEach(function(to, from, next) {
//   if (to.meta.auth) {                                //跳转的页面不是登录界面
//     let auth = sessionStorage.getItem('HCjiaotong')
//     if (auth == 'success') {                         //验证是否登录过
//       return next()
//     }else{                                           //一天内免登陆通道以及新开窗口通道
//       if(localStorage.getItem('HCjiaotong') && JSON.parse(localStorage.getItem('HCjiaotong'))){      //之前登录过
//         auth = JSON.parse(localStorage.getItem('HCjiaotong'))
//         var date = new Date()
//         if(date.getFullYear() == auth.date.year && date.getMonth() == auth.date.month && date.getDate() == auth.date.date){     //同一天免登陆
//           if(auth.auth == 'success'){               //验证通过
//             return next()
//           }else{                                    //验证不通过
//             if(from.path != '/login'){
//               router.replace({name:'login'})
//             }
//           }
//         }else{                                      //超过一天
//           if(from.path != '/login'){
//             router.replace({name:'login'})
//           }
//         }
//       }else{                                        //之前没登录过或者退出登录
//         if(from.path != '/login'){
//           router.replace({name:'login'})
//         }
//       }
//     }
//   } else {
//     return next()
//   }
// })

export default router
