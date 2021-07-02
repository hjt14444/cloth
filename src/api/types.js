import ajax from './ajax'

const Base = "http://124.70.40.181:8257"
export const LOGIN = (date) => ajax(Base+"/user/login.do",date,'POST',true)                 //登录
export const REQUSERINFO = (date) => ajax(Base+"/user/get_user_info.do",date)                          //登录
export const LOGOUT = (date) => ajax(Base+"/user/logout.do",date,)                                     //退出登录
export const REGISTER = (date) => ajax(Base+"/user/register.do",date,'POST')                      //注册
export const CHECKVALID = (date) => ajax(Base+"/user/check_valid.do",date)                              //校验手机号和邮箱是否重复注册
export const CHECKQUESTION = (date) => ajax(Base+"/user/forget_get_question.do",date)                   //忘记密码时获取问题
export const CHECKANSWER = (date) => ajax(Base+"/user/forget_check_answer.do",date)                     //忘记密码验证是否答案正确
export const RESETPW = (date,token) => ajax(Base+"/user/forget_reset_password.do",date,'PUT')     //忘记密码重置密码是否成功

export const REQVIDEOLISTS = (date) => ajax(Base+"/video/select_all.do",date)                           //获取分页视频列表
export const REQVIDEOLIST = (date) => ajax(Base+"/video/select_one.do",date)                            //获取单个视频列表
//http://haichuang.natapp1.cc/uploadVideo.do
export const UPLOADVIDEO = (date) => ajax('http://haichuang.natapp1.cc/uploadVideo.do',date,'POST')                       //上传单个视频
//export const UPLOADVIDEO = (date) => ajax(Base+"/video/upload",date,'POST')       
export const UPLOADBIAOZHU = (date) => ajax(Base+"/video/pull",date,'POST')                       //上传单个视频的标注信息

export const REQLABELLISTS = (date) => ajax(Base+"/label/select_one.do",date)                           //根据视频编号获取标注信息
export const REQONELABELLIST = (date) => ajax(Base+"/labels/list_page.do",date)                         //根据视频编号获取录播视频以及标注

export const getWeather = (date) => ajax("http://wthrcdn.etouch.cn/weather_mini",date)                  //根据城市名获取对应的天气情况
