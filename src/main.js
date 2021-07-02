// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//引入echart
import echarts from 'echarts'
Vue.prototype.echarts = echarts
//视频插件

// 视频播放
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
//引入 hls,视频直播(m3u8)必须引入的
//import 'videojs-contrib-hls'
//播放rtmp视频
import 'videojs-flash'
//如果你需要自定义播放器的样式，自己新建一个css
//require('./assets/css/video_css/myvideo.css')
Vue.use(VideoPlayer)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
