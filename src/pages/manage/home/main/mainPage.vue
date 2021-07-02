<template>
 <div class="mainPage">
   <div class="main_left">
     <el-row :gutter="24">
      <el-col class="one" :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
        <div class="grid_one grid-content">
         <div class="user">
           <div class="userinfo">
             <img src="../../../../assets/imgs/logo/logo.png" />
            <!-- <p class="name">2021-4-25</p>
            <p class="access">湛江</p> -->
          </div>
          <div class="today_info">
            <div class="title">今日信息</div>
            <div class="detail_info">
          <el-row :gutter="12">
          <el-col class="one" :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <div class="info_one info">
                <p class="view">正在监控</p>
                <p class="count">数量</p>
                <p class="num">5</p>
                <p class="per">(台)</p>
              </div>
          </el-col>
          <el-col class="one" :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <div class="info_two info">
                <p class="view">发出警报</p>
                <p class="count">数量</p>
                <p class="num">0</p>
                <p class="per">(台)</p>
              </div>
          </el-col>
          <el-col class="one" :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <div class="info_three info">
                <p class="view">挂起报警</p>
                <p class="count">数量</p>
                <p class="num">0</p>
                <p class="per">(台)</p>
              </div>
          </el-col>
          </el-row>
            </div>
          </div>
        </div>       
        <div class="login-info">
          <p>上次登录时间：<span>2021-5-5</span></p>
          <p>上次登录地点：<span>湛江</span></p>
        </div>
        </div>
      </el-col>
      <!-- 扇形图 -->
      <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
        <div class="grid_two grid-content ">
          <div class="choose">
          <div class="block">
          <el-date-picker
            size="mini"
            v-model="three_value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="select">
        <el-select  size="mini" v-model="choose_value" placeholder="请选择">
          <el-option
            v-for="item in choose_line"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
    </div>
    </div>
            <EchartPei></EchartPei>
          </div>
          </el-col>
      <!-- 柱状图 -->
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="grid_three grid-content ">
          <div class="block">
          <el-date-picker
            v-model="three_value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
          <Echartbar></Echartbar>
        </div>
        </el-col>
     </el-row>
   </div>
   <!-- 
     表格数据显示
    -->
   <div class="main_right">
    <el-row :gutter="24">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
    <div class="grid_four grid-content ">
      <span class="demonstration">不同流水线的不同布料的相关数据</span>
       <div class="block">
        <el-date-picker
          v-model="four_value1"
          size="mini"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']">
        </el-date-picker>
    </div>
    <div class="select">
    <el-select  size="mini" v-model="choose_value" placeholder="请选择">
      <el-option
        v-for="item in choose_line"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    </div>
    <el-table
    :data="table_one"
    style="width: 100%;"
    :cell-style="tableRowStyle"
    :header-cell-style="tableHeaderColor"
    >
    <el-table-column
      prop="cloth"
      label="布料"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="max_num"
      label="阈值"
      align="center"
      >
    </el-table-column>
    <el-table-column
      prop="alrma_num"
      label="不合格布匹"
      align="center"
      >
    </el-table-column>
    <!-- <el-table-column
      align="right">
      eslint-disable-next-line
      <template slot="header" slot-scope="scope">
        <el-select  size="mini" v-model="choose_value" placeholder="选择流水线">
        <el-option
          v-for="item in choose_line"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      </template>
    </el-table-column> -->
  </el-table>
    </div>
    </el-col>
  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
    <div class="grid_five grid-content ">
      <el-table
    :data="table_two"
    style="width: 100%;"
    :cell-style="tableRowStyle"
    :header-cell-style="tableHeaderColor"
    >
     <el-table-column
      prop="line"
      label="流水线"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="adminer"
      align="center"
      label="负责人员">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="联系方式"
      align="center"
    > 
    </el-table-column>
  </el-table>
    </div>
    </el-col>
</el-row>
   </div>
 </div>
</template>

<script>
import EchartPei from '../charts/EchartPei'
import Echartbar from '../charts/Echartbar'
 export default {
   methods: {
     // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      // if (rowIndex%2 ==0) {
      //   return 'background-color: pink'
      // }
      return 'background-color: #D4E8F5;opacity: 0.9;'
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #D4E8F5;opacity: 0.9;'
      }
    }
    },
    data() {
      return {
        three_value1: '',//第三个板块是时间选择器
        four_value1: '',//第四个板块是时间选择器
        //选择流水线
        choose_line: [{
          value: '选项1',
          label: 'A线'
        }, {
          value: '选项2',
          label: 'B线'
        }, {
          value: '选项3',
          label: 'C线'
        }, {
          value: '选项4',
          label: 'D线'
        }, {
          value: '选项5',
          label: 'E线'
        }],
        choose_value: '',
        table_one: [{
          cloth: '棉布',
          max_num: '21',
          alrma_num: '20'
        }, {
          cloth: '麻布',
          max_num: '18',
          alrma_num: '43',
        }, {
          cloth: '丝绸',
          max_num: '17',
          alrma_num: '24',
        }, {
          cloth: '皮革',
          max_num: '16',
          alrma_num: '25',
        }, {
          cloth: '化纤',
          max_num: '15',
          alrma_num: '6',
          adminer:'王小虎'
        }, {
          cloth: '混纺',
          max_num: '11',
          alrma_num: '21',
        }, {
          cloth: '莫代尔',
          max_num: '13',
          alrma_num: '17',
        }, {
          cloth: '呢绒',
          max_num: '12',
          alrma_num: '18',
        },
        ],
        table_two: [{
          line: 'A线',
          adminer:'王小虎',
          phone:42345
        }, {
          line: 'B线',
          adminer:'王胖虎',
          phone:24234
        }, {
          line: 'C线',
          adminer:'王大虎',
          phone:52423
        }, {
          line: 'D线',
          adminer:'王肥虎',
          phone:24345
        }, {
          line: 'E线',
          adminer:'王老虎',
          phone:42345
        }
        ],
      }
    },
   components: {
     EchartPei,
     Echartbar
   },
   mounted () {
   }
 }
</script>

<style lang="less">
.mainPage{
  height:auto;
  width: 100%;
  float: left;
  margin: 0;
  background-image: url("../../../../assets/imgs/login/login.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .main_left{
    width:70%;
    height: 100%;
    float: left;
    padding: 20px;
    box-sizing: border-box;
  }
  .main_right{
    width:30%;
    height: 100%;
    float: left;
    padding: 20px;
    box-sizing: border-box;
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    background: #D4E8F5;
    opacity: 0.9;
    padding: 20px;
    box-sizing: border-box;
    .el-table{
    background-color: #D4E8F5;
    opacity: 0.9;
    }
  }
  .grid_one,.grid_two{
    height: 45vh;
    margin-bottom: 20px;
    position: relative;
    .choose{
      margin-bottom:40px;
      .block{
        float: left;
      //right: 10px;
      //position: absolute;
      margin-left:80px;
      .el-range-editor--mini.el-input__inner{
        width:320px;
      }
    }
    .select{
      float: left;
      margin-left: 30px;
    }
    }
    
    .user {
    display: flex;
    align-items: center;
    height: auto;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 3px solid #f3efb9;
    &info {
      text-align: left;
      margin-right:40px;
      border: 4px solid #81B4DA;
      border-radius: 50%;
      box-sizing: border-box;
      img {
      display: block;
      width: 150px;
      height: 150px;
      border-radius: 50%;
    }
      .name {
        font-size: 16px;
        margin: 10px 0px 10px 20px;
      }
      .access {
        color: #999999;
        margin-left: 20px;
      }
    }
    .today_info{
      height:auto;
      width:calc(100% - 100px);
      text-align: center;
      .title{
        height:50px;
        line-height: 50px;
        border-bottom: 1px solid #ccc;
        color: #1D5D8D;
      }
      .detail_info{
        .info{
          float: left;
          margin-right:20px;
          p{
            margin-bottom: 10px;
          }
          .view{
            color: #1D5D8D;
            height: 40px;
            margin-top: 20px;
          }
          .count,.per{
            font-size: 12px;
          }
          .num{
            font-size: 70px;
            font-weight: 400;
          }
        }
      }
    }
  }
    
  .login-info {
    p {
      text-align: left;
      line-height: 28px;
      font-size: 14px;
      color: #999999;
      span {
        color: #666666;
        margin-left: 10px;
      }
    }
  }
  }
  .grid_three{
    height: calc(55vh - 110px);
    position: relative;
    .block{
      right: 10px;
      position: absolute;
    }
  }
  .grid_four{
    height:45vh;
    margin-bottom: 20px;
    width: 100%;
    overflow-y: auto;
    .demonstration{
      display: block;
      margin-bottom:15px;
    }
    .block{
      width: 100%;
      .el-range-editor--mini.el-input__inner{
        width:320px;
        float: left;
        margin-left:30px;
      }
    }
    .select{
      //float: right;
      .el-input--mini .el-input__inner{
      width:70px;
      // float: right;
    }
    }
    
  }
  .grid_five{
     height:calc(55vh - 110px);
     overflow-y: auto;
  }
}
 @media screen and(max-width: 500px) and (min-width: 300px){
    .mainPage{
  .main_left{
    width:100%;
    height: auto;
  }
  .main_right{
    width:100%;
    height:auto;
    float: left;
    padding: 20px;
    box-sizing: border-box;
  }
  }
  }
</style>
