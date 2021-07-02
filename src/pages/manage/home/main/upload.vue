<template>
  <div class="myBiaoZhu" id="myBiaoZhuDiv" v-loading="loading"
       element-loading-text="视频解析中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="container-fluid">
      <div class="upload-element uploadDiv" v-if="show">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px">
          <el-form-item label="上传视频:" ref="uploadElement" required prop="video">
            <el-input v-model="ruleForm.video" v-if="false"></el-input>
            <el-upload
              class="avatar-uploader"
              style="float: left"
              ref="upload"
              :show-file-list="false"
              action="#"
              :before-upload="beforeUpload"
              :on-change="handleChange"
              :auto-upload="false"
              accept="video/*"
              :data="ruleForm">
              <i v-if="type===1" class="el-icon-plus avatar-uploader-icon"></i>
              <el-progress type="circle" :percentage="persent" v-if="type===2"></el-progress>
              <i v-if="type===3" class="el-icon-refresh-right avatar-uploader-icon"></i>
            </el-upload>
            <video
              controls
              aspectRatio="16:9"
              fluid
              ref="video"
              :style="{'display':isShow}"
            >
            </video>
          </el-form-item>
          <el-form-item label="监控地点:" prop="name" required v-if="false">
            <el-input v-model="ruleForm.name" placeholder="请输入监控地点" class="manage_input"></el-input>
          </el-form-item>
          <el-form-item label="图片标注:" prop="biaozhu" required v-show="imageUrl">
            <el-button type="primary" plain size="small" @click="startBiaoZhu">开始标注</el-button>
            <el-button type="success" plain size="small" @click="endBiaoZhu">标注完成</el-button>
          </el-form-item>
          <div class="biaoZhuDiv" v-show="imageUrl">
            <img id="myBiaoZhu" :src="imageUrl" alt="" class="biaoZhuTu">
          </div>
          <el-form-item label="" style="margin-top: 15px;margin-bottom: 0!important;">
            <el-button type="primary" size="small" @click="uploadBiaoZhu()">上传标注信息</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {UPLOADBIAOZHU} from '../../../../api/types'
  import {mapActions} from 'vuex'
  export default {
    name: '',
    data () {
      return {
        banMa:[],           //实线数组
        count:0,            //点的数目
        banMa1:[],          //点数组
        banMa11:[],         //路口点数组
        pointType:0,        //标注类型，0为初始化，1为实线，2为路口

        bili: 2,            //图片缩放比例

        videoUrl:'',        //视频播放地址
        imageUrl:'',        //视频封面地址
        videoId:'',         //视频Id

        canBiaoZhu:false,   //是否可以进行标注
        pointColor:'red',   //点的颜色
        pointSize:6,        //点的大小

        websock:'',        //与深度学习握手sock对象
        wsPath:'ws://haichuang.natapp1.cc/status', //与深度学习握手地址

        type:1,           //上传状态，1：初始化，还未选择上传文件  2：上传中，显示进度条  3：上传完成，改为封面
        persent:0,        //视频上传进度百分比
        isShow:'none',
        ruleForm: {
          video:'',   //视频源文件
          uploadFile:'',  //视频文件
          name:'',       //视频名称
        },

        loading:false,   //是否显示上传中
        show:true,       //用于使组件刷新

        receive:false,   //是否已经接受后台标志
      }
    },
    methods: {
      ...mapActions(['choiceMenuId','setUploadFile']),
      //选择上传视频
      handleChange (file, fileList) {
        this.ruleForm.uploadFile = file.raw
        this.uploadVideo()
      },
      beforeUpload (file) {
      },

      initWebSocket(){ //初始化深度学习websocket
        if ('WebSocket' in window) {
          this.websock = new WebSocket(this.wsPath)
        } else {
          alert('当前浏览器 Not support websocket')
        }
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;
        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = function () {
          this.websocket.close()
        }
      },
      websocketonopen(){ //连接建立之后执行send方法发送数据
        console.log('已连接')
      },
      websocketonerror(){//连接建立失败重连
        if(this.getWebsock){
          this.initWebSocket();
        }
      },
      websocketonmessage(e){ //数据接收
        console.log('后台：')
        console.log(e)
        if(e.data.indexOf('success')>0){
          this.websock.close()
          this.loading = false
          this.receive = true
          this.$confirm('视频已处理完，是否前往查看?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            var videoId = this.videoId
            this.$router.replace({name:'mainPage',query:{videoId:JSON.stringify(videoId)}})
          }).catch(() => {
            this.$router.replace({name:'more'})
          })
        }
      },
      websocketsend(Data){//数据发送
      },
      websocketclose(e){  //关闭
        console.log('断开连接',e);
      },

      //上传视频
      async uploadVideo () {
        const {uploadFile} = this.ruleForm
        if(uploadFile){
          this.persent = 0
          let param = new FormData() //创建form对象，私有，无法直接获取，只能通过get来查看其中的元素
          param.append('file',uploadFile)
          let config = {
            headers:{
              'Content-Type':'multipart/form-data',
            },
            withCredentials:true,
            transformRequest: [function (data) {
              return data
            }],
            onUploadProgress: progressEvent => {
              let persent = (progressEvent.loaded / progressEvent.total * 100 | 0)
              if(persent != 100){
                this.persent = persent
              }
            },
          }
          this.type = 2
          axios.post('http://haichuang.natapp1.cc/video/upload',param,config)
            .then(response=>{
              var result = response.data
              console.log(result)
              if(result.status == 0){
                result = result.data
                this.videoId = result.videoId
                this.videoUrl = result.videoUrl
                this.imageUrl = result.imgUrl
                this.type = 3
                this.$refs.video.src= this.videoUrl
                //this.bili = 3                        //通过返回图片计算缩放比例
                //console.log(this.bili)
                this.$refs.video.load()
                this.isShow = 'block'
              }else{
                this.type = 1
                this.$message({
                  message: '上传失败',
                  type: 'error',
                  duration:'1000'
                });
              }
            }).catch(err => {
            console.log(err)
          })
        }
      },
      //上传标注信息
      async uploadBiaoZhu(){
        console.log("aaa标注");
        var {banMa,videoUrl,videoId} = this
        var params = new FormData()
        params.append('message',banMa)
        params.append('videoId',videoId)
        params.append('videoUrl',videoUrl)
        if(banMa.length>0 && videoUrl && videoId){
          var message = JSON.stringify(banMa)
          var result = await UPLOADBIAOZHU(params)
          if(result.status == 0){
            if(videoId){
              this.loading = true
            }
          }else{
            this.$message({
              message: '上传标注信息失败，请重试',
              type: 'error',
              duration:'1200'
            })
          }
        }else{
          this.$message({
            message: '请输入完整信息再上传',
            type: 'warning',
            duration:'1200'
          })
        }
      },

      //点数组按x，y排序
      sortByX(a,b){
        if(a.x == b.x)
          return a.x - b.x
        return a.x - b.x
      },
      sortByY(a,b){
        if(a.y == b.y)
          return a.y - b.y
        return a.y - b.y
      },

      //开始标注实线
      startBiaoZhu(){
        this.pointColor = 'red'
        this.pointType = 1
        this.canBiaoZhu = true
      },
      //开始标注路口
      startBiaoZhu1(){
        this.pointColor = 'yellow'
        this.pointType = 2
        this.canBiaoZhu = true
      },
      //完成标注
      endBiaoZhu(){
        if(((this.banMa1.length%4) == 0)&&(this.banMa11.length%4) == 0){
          this.banMa = []
          this.canBiaoZhu = false
          this.banMa1.sort(this.sortByX)       //对所有坐标数组按x轴从左往右排序，每四个为一个四边形
          this.banMa11.sort(this.sortByX)      //对所有坐标数组按x轴从左往右排序，每四个为一个四边形
          var num = this.banMa1.length/4
          var num1 = this.banMa11.length/4
          var banMa2 = []
          var banMa22 = []
          var banMa1 = this.banMa1
          var banMa11 = this.banMa11
          for(var i = 0;i < num;i++){
            var newBanMa = banMa1.slice(i*4,(i+1)*4).sort(this.sortByY)
            var point1
            var point2
            var point3
            var point4
            if(newBanMa[0].x>newBanMa[1].x){
              point1 = newBanMa[0]
              point4 = newBanMa[1]
            }else{
              point1 = newBanMa[1]
              point4 = newBanMa[0]
            }
            if(newBanMa[2].x>newBanMa[3].x){
              point2 = newBanMa[2]
              point3 = newBanMa[3]
            }else{
              point2 = newBanMa[3]
              point3 = newBanMa[2]
            }
            newBanMa[0] = point1
            newBanMa[1] = point2
            newBanMa[2] = point3
            newBanMa[3] = point4
            var newBanMa1 = []
            for(var j = 0;j < 4;j++){
              var xiaoBanMa = []
              xiaoBanMa.push(newBanMa[j].x)
              xiaoBanMa.push(newBanMa[j].y)
              newBanMa1.push(xiaoBanMa)
            }
            banMa2.push(newBanMa1)
          }
          // for(var i = 0;i < num1;i++){
          //   var newBanMa = banMa11.slice(i*4,(i+1)*4).sort(this.sortByY)
          //   var point1
          //   var point2
          //   var point3
          //   var point4
          //   if(newBanMa[0].x>newBanMa[1].x){
          //     point1 = newBanMa[0]
          //     point4 = newBanMa[1]
          //   }else{
          //     point1 = newBanMa[1]
          //     point4 = newBanMa[0]
          //   }
          //   if(newBanMa[2].x>newBanMa[3].x){
          //     point2 = newBanMa[2]
          //     point3 = newBanMa[3]
          //   }else{
          //     point2 = newBanMa[3]
          //     point3 = newBanMa[2]
          //   }
          //   newBanMa[0] = point1
          //   newBanMa[1] = point2
          //   newBanMa[2] = point3
          //   newBanMa[3] = point4
          //   var newBanMa1 = []
          //   for(var j = 0;j < 4;j++){
          //     var xiaoBanMa = []
          //     xiaoBanMa.push(newBanMa[j].x)
          //     xiaoBanMa.push(newBanMa[j].y)
          //     newBanMa1.push(xiaoBanMa)
          //   }
          //   //banMa22.push(newBanMa1)
          //   banMa22 = newBanMa1
          // }
          // banMa2.push(banMa22)
          this.banMa.push(banMa2)
          console.log(this.banMa)
        }else{
          this.$message({
            type:'warning',
            duration:1200,
            message:'您还未完整标注实线或路口'
          })
        }
      },

      //画点
      createMarker(x, y) {
        var div = document.createElement('div')
        div.className = 'marker'
        div.id = 'marker'+this.count
        y = y + document.getElementById('myBiaoZhu').offsetTop - this.pointSize/2
        x = x + document.getElementById('myBiaoZhu').offsetLeft - this.pointSize/2
        div.style.width = this.pointSize + 'px'
        div.style.height = this.pointSize + 'px'
        div.style.backgroundColor = this.pointColor
        div.style.left = x + 'px'
        div.style.top = y + 'px'
        div.oncontextmenu=((e)=>{
          console.log(e.target.style.backgroundColor)
          if(this.canBiaoZhu){
            var id = e.target.id
            document.getElementById('myBiaoZhuDiv').removeChild(div)
            if(e.target.style.backgroundColor == 'red'){
              this.banMa1 = this.banMa1.filter(item=>item.id!= id.slice(6,id.length))
            }else if(e.target.style.backgroundColor == 'yellow'){
              this.banMa11 = this.banMa11.filter(item=>item.id!= id.slice(6,id.length))
            }
            if(e && e.preventDefault) {
              //阻止默认浏览器动作(W3C)
              e.preventDefault()
            } else {
              //IE中阻止函数器默认动作的方式
              window.event.returnValue = false
            }
            return false
          }
        })  //阻止冒泡行为和默认右键菜单事件，删除该点
        document.getElementById('myBiaoZhuDiv').appendChild(div)
      },
    },
    mounted () {
      document.getElementById('myBiaoZhu').oncontextmenu=((e)=>{
        if(e && e.preventDefault) {
          //阻止默认浏览器动作(W3C)
          e.preventDefault()
        } else {
          //IE中阻止函数器默认动作的方式
          window.event.returnValue = false
        }
        return false
      })        //阻止冒泡行为和默认右键菜单事件
      document.getElementById('myBiaoZhu').onmousedown=(e)=>{
        e = e || window.event
        if(e.button !== 2){       //判断是否右击
          if(this.canBiaoZhu){    //判断是否可以进行标注
            var x = e.offsetX || e.layerX
            var y = e.offsetY || e.layerY
            var myImg = document.querySelector("#myBiaoZhu")
            var currWidth = myImg.clientWidth
            var currHeight = myImg.clientHeight
            var ProportionWidthInImg = x/currWidth
            var ProportionHeightInImg = y/currHeight
            this.count++
            if(this.pointType == 1){
              this.banMa1.push({
                pointType:2,
                id:this.count,
                x:this.bili*x,
                y:this.bili*y,
              })
            }else if(this.pointType == 2){
              this.banMa11.push({
                pointType:2,
                id:this.count,
                x:this.bili*x,
                y:this.bili*y,
              })
            }
            this.createMarker(x,y)
          }
        }
      }
      this.choiceMenuId('upload')
      this.initWebSocket()
    },
    beforeDestroy () {
      if(this.websock){
        this.websock.close()
      }
    },
  }
</script>

<style lang="less">
  @media screen and(max-width: 400px) {
    .uploadDiv{
      margin-left: -15px!important;
      margin-right: -15px!important;
      .manage_input{
        width: 180px!important;
      }
      video{
        margin-left: 0!important;
      }
    }
  }
  #myBiaoZhuDiv{
    position:relative;
    padding-top: 9px;
    padding-bottom: 9px;
    .el-form-item__label{
      // color: white;
    }
    video:focus{
      outline: 0;
    }
    video{
      margin-left: 25px;
      width: 200px !important;
      height: 150px !important;
      overflow: hidden;
      object-fit:fill;    //消除留白
    }
    input[type="file"] {
      display: none;
    }
    .upload-element{
      width: 100%;
    }
    .avatar-uploader{
      height: 150px;
    }
    .avatar-uploader .el-upload {
      width: 148px;
      height: 148px!important;
      padding: 10px;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: rgb(0,153,255);
      width: 128px;
      height: 128px;
      line-height: 128px;
      text-align: center;
    }
    .avatar {
      width: 148px;
      height: 148px;
      display: block;
      margin: -10px;
    }
    .uploadDiv{
      .el-progress__text{
        color: rgb(0,153,255);
      }
      .manage_input{
        width: 250px;
      }
      .el-input{
        .el-input__inner{
          background-color: rgb(4,51,77);
          color: white!important;
          height: 35px!important;
          border: 0!important;
        }
      }
    }
    .biaoZhuDiv{
      margin-left: 100px;
      margin-top: -12px;
      border: 5px solid rgb(24,96,154);
      display: inline-block;
      .biaoZhuTu{
        display:inline-block;
        z-index: 1;
        width: 960px;
        height: 540px;
      }
    }
    .marker{
      position:absolute;
      border-radius: 50%;
      z-index: 999;
    }
  }
</style>
