<template>
  <div style="width: 100%;height: 10%;">
    <userHeader></userHeader>
    <div style="width: 100%; text-align: center; font-size: 1rem;">
      <span>尊敬的{{userName}},欢迎您使用森北在线测评系统</span>
    </div>
    <el-divider></el-divider>
    <form action="/OCR/ParseImage" class="form-horizontal" enctype="multipart/form-data" id="ocrForm" method="post"
      novalidate="novalidate">
      <input name="__RequestVerificationToken" type="hidden" value="unknown">
      <fieldset>
        <div class="row">
          <div class="span12">
            <h3 class="headline">
              <span>在线身份证识别，OCR服务<i class="mobileHidden">－核验身份</i></span>
            </h3>
          </div>

          <div class="span12">
            <div class="span4">
              <p class="diyLabel">上传身份证图片 ( png / jpg )</p>
            </div>
            <div class="span8">
              <input type="file" id="imageFile" class="form-control choose" @change="uploadImage($event)"
                ref="clearFile" accept=".png,.jpg,.jpeg">
            </div>
          </div>

          <div class="span12" style="margin: 1%;">
            <h2 class="boldo"></h2>
          </div>

          <!-- <div style="margin"></div> -->

          <div style=" clear:both; margin-top:50px !important;"></div>

          <div id="mesgDiv">
            <div class="sucOrErrMessage" v-show="isMsgShow">
              <span>
                <strong>{{sucOrErrMsg}}</strong>
                {{ocrTotalTime}}
                <!-- <button type="button" class="close" data-dismiss="alert">×</button> -->
              </span>
            </div>
            <!-- 进度条 -->
            <el-progress :text-inside="true" :stroke-width="18" :percentage="dlProgress" v-show="isProgressBar"
              style="margin-bottom: 0.625rem;">
            </el-progress>
          </div>


          <div class="span12">
            <div id="imagePanel" class="span5 borderspanblue">

              <div class="imagearea">
                <h3>图片预览</h3>
              </div>
              <div class="panel-body">
                <div id="filedrag" v-show="isDrogShow" @drop="drop($event)" @dragover="allowDrop($event)"
                  style="height: 80%; display: block">
                  你也可以把身份证图片拖拽到这里
                </div>
                <img id="previewImage" class="img-responsive" :src="previewImage" v-show="isPreImgShow"
                  style="float:left; height:90%; width:100%;" />
              </div>
              <div>
                <h4 id="previewText" v-show="isTextShow">加载成功</h4>
              </div>
            </div>

            <div class="span2">
              <!-- <a class="btn btn-large btn-green-light gap" @click="StartOCR($event)">开始</a> -->
              <el-button class="btn btn-large  gap" @click="StartOCR($event)" type="primary" plain=""
                style="margin-left: 0;">开始
              </el-button>

              <!-- <a id="btnShowOverlay" class="example-image-link btn btn-large btn-green-light" @click="ShowOverlay()">
                校对
              </a> -->
              <el-button id="btnShowOverlay" class="example-image-link btn btn-large " type="primary" plain=""
                @click="ShowOverlay()" :disabled="isBtnActive" style="margin-left: 0;">校对</el-button>

              <!-- <a id="btnDownloadText" class="btn btn-large btn-green-light" @click="DownloadText()">
                下载
              </a> -->
              <el-button id="btnDownloadText" class="btn btn-large " type="primary" plain="" @click="DownloadText()"
                :disabled="isBtnActive" style=" margin-left: 0;">下载</el-button>

              <!-- <a class="btn btn-large btn-green-light" @click="Clear()">重置</a> -->
              <el-button class="btn btn-large " type="primary" plain="" @click="Clear()" style=" margin-left: 0;">
                重置</el-button>
            </div>

            <div id="resultPanel" class="span5 borderspan">
              <div class="resultarea">
                <h3>识别结果</h3>
              </div>

              <div class="idCardresult-panel fixed">
                <ul class="fixed"
                  style="list-style: none; width: 90%; margin-left: 5%; margin-right: 5%; margin-bottom: 0;">

                  <!-- 姓名 -->
                  <li>
                    <p class="idCardInfoLabel">姓名：</p>
                    <el-input class="idCardInfo" v-model="idCardInfo.name" readonly="true" style="width: 40%;"></el-input>
                  </li>

                  <!-- 性别和名族 -->
                  <li>
                    <p class="idCardInfoLabel">性别：</p>
                    <el-input class="idCardInfo" v-model="idCardInfo.sex"
                      style="width: 25%; margin-right: 10%; text-align: center;"></el-input>

                    <p class="idCardInfoLabel">名族：</p>
                    <el-input class="idCardInfo" v-model="idCardInfo.nation" style="width: 25%; text-align: center;">
                    </el-input>
                  </li>

                  <!-- 出生年月日 -->
                  <li>
                    <p class="idCardInfoLabel">出生：</p>
                    <el-input class="idCardInfo" v-model="idCardInfo.year"
                      style="width: 20%; margin-right: 2%; text-align: center;"></el-input>
                    <p class="idCardInfoLabel">年</p>

                    <el-input class="idCardInfo" v-model="idCardInfo.month"
                      style="width: 15%; margin-left: 2%; margin-right: 2%; text-align: center;"></el-input>
                    <p class="idCardInfoLabel">月</p>

                    <el-input class="idCardInfo" v-model="idCardInfo.day"
                      style="width: 15%; margin-left: 2%; margin-right: 2%; text-align: center;"></el-input>
                    <p class="idCardInfoLabel">日</p>
                  </li>

                  <!-- 地址 -->
                  <li>
                    <p class="idCardInfoLabel address">地址：</p>
                    <el-input id="textarea" class="idCardInfo" type="textarea" :autosize="{minRows:1, maxRows: 2}"
                      v-model="idCardInfo.address" style="width: 80%;">
                    </el-input>
                  </li>

                  <!-- 身份证号码 -->
                  <li>
                    <p class="idCardInfoLabel">身份证号码：</p>
                    <el-input class="idCardInfo" v-model="idCardInfo.idNumber" readonly="true" style="width: 60%;">
                    </el-input>
                  </li>

                </ul>
              </div>

              <div>
                <h4 onclick="resultCopy(this)" id="copyText"
                  style="color: #337ab7; font-size: 14px; float: right; margin-right: 30px; cursor: pointer;"></h4>
                <h4 id="copySuccess"
                  style="color: #3c763d; font-size: 14px; float: right; margin-right: 15px; font-style: italic;"></h4>
              </div>
            </div>
          </div>

        </div>
      </fieldset>
    </form><br><br>

  </div>
</template>

<script>
  import userHeader from "../components/Header.vue";
  import Cookies from 'js-cookie';

  import qs from 'qs';
  import global_ from '/src/views/Global.vue';
  import {
    imageToBase64,
    base64ToFile
  } from '../utils/imageConvert.js';

  export default {
    name: 'UserInfo',
    data() {
      return {
        userName: Cookies.get('userName'),
        isBtnActive: false,
        isDrogShow: true, //默认显示拖拽虚线提示框
        isTextShow: false, //默认不显示文本提示(加载成功)
        isPreImgShow: false, //默认不显示预览图片框(加载成功)
        isMsgShow: false, //默认不显示识别消息提示
        isProgressBar: false, //默认不显示进度条
        dlProgress: 0, //进度条默认值为0
        startTimer: '',
        endTimer: '',
        ocrTotalTime: null, //识别花费总时间
        previewImage: null, //预览图片默认为null
        sucOrErrMsg: "", //识别结果消息提示默认为""
        // idCardInfo: "", //身份证信息默认为""
        idCardInfo: {
          name: "", //姓名
          sex: "", //性别
          nation: "", //名族
          year: "", //出生年份
          month: "", //出生月份
          day: "", //出生日
          address: "", //地址
          idNumber: "", //身份证号码
        },
      }
    },

    components: {
      userHeader
    },
    props: {
      progressStatus: {
        type: Boolean,
        default () {
          return false
        }
      }
    },
    watch: {
      progressStatus(val) {
        if (val) {
          this.endProgress()
        }
      }
    },
    mounted() {
      document.ondragover = function(e) {
        e.preventDefault(); //阻止拖放的图片在新窗口中直接显示,拖放的目标对象此时是document对象
      };
      document.ondrop = function(e) {
        e.preventDefault(); //阻止 document.ondrop的默认行为  *** 在新窗口中打开拖进的图片
      };
    },
    methods: {
      startProgress() {
        this.startTimer = setInterval(() => {
          if (this.dlProgress < 100) {
            this.dlProgress++;
          } else if (this.dlProgress >= 100) {
            clearInterval(this.startTimer)
          }
        }, 100);
      },
      endProgress() {
        clearInterval(this.startTimer)
        this.endTimer = setInterval(() => {
          if (this.dlProgress < 100) {
            this.dlProgress++;
          } else if (this.dlProgress >= 100) {
            clearInterval(this.endTimer);
            this.finishProgress();
          }
        }, 10);
      },
      finishProgress() {
        this.$emit('finishProgress', false)
      },

      //上传图片
      uploadImage(event) {
        let _this = this;

        let image = document.getElementById('imageFile').files[0]; //获取图片
        let name = document.getElementById('imageFile').files[0].name; //图片文件名
        let arr = name.split('.'); //将文件名以 . 分割为文件主名和文件扩展名 并存到arr数组
        //console.log(arr); //测试打印arr数组即打印文件主名和文件扩展名
        let fileSize = 0; //文件大小
        if (image) {

          _this.isDrogShow = false; //取消显示虚线提示框
          _this.isTextShow = true; //显示文本提示(加载成功)
          _this.isPreImgShow = true; //显示预览图片
          _this.isProgressBar = false; //取消显示进度条
          _this.dlProgress = 0; //将进度条进度重置为0
          _this.isMsgShow = false; //取消显示识别结果消息提示
          _this.idCardInfo = ""; //清除身份证信息


          fileSize = image.size;
          if (fileSize > 10 * 1024 * 1024) {
            alert("文件大小不能大于10M！");
            file.value = "";
            return false;
          } else if (fileSize <= 0) {
            alert("文件大小不能为0M！");
            file.value = "";
            return false;
          }

          let reader = new FileReader();
          reader.readAsDataURL(image); //将image转换为Base64编码的图片
          //当读取成功后触发
          reader.onloadend = e => {
            //没有返回值，但是读取完毕后，将读取结果存储在对象的result中
            let imgBase64 = e.target.result; //imgBase64存放图片的Base64编码串
            _this.previewImage = imgBase64; //将Base64图片编码串动态绑定到img标签（：src值为previewImage）
            //document.getElementById('previewImage').src = imgBase64; //将imgBase64编码值赋值给ID为previewImage的src属性
          }
        } else {
          return false;
        }


      },

      allowDrop(e) {
        e.preventDefault();
      },

      //拖动文件到预览框内
      drop(e) {
        let _this = this;
        _this.isDrogShow = false; //取消显示虚线提示框
        _this.isTextShow = true; //显示文本提示(加载成功)
        _this.isPreImgShow = true; //显示预览图片
        _this.isProgressBar = false; //取消显示进度条
        _this.dlProgress = 0; //将进度条进度重置为0

        var files = [];
        [].forEach.call(
          e.dataTransfer.files,
          function(file) {
            files.push(file);
          },
          false
        );
        let image = files[0]; //image为被选择拖动图片的第一个图片文件

        let reader = new FileReader();
        reader.readAsDataURL(image); //将image文件转换为Base64编码的图片
        //当读取成功后触发
        reader.onloadend = e => {
          //没有返回值，但是读取完毕后，将读取结果存储在对象的result中
          let imgBase64 = e.target.result; //imgBase64存放图片的Base64编码串
          _this.previewImage = imgBase64; //将Base64图片编码串动态绑定到img标签（：src值为previewImage）
          //document.getElementById('previewImage').src = imgBase64; //将imgBase64编码值赋值给ID为previewImage的src属性
        }
      },

      //开始身份证信息识别
      StartOCR() {
        let _this = this;

        var imgBase64 = _this.previewImage;
        var startTime; //开始时间
        var endTime; //识别结束时间
        // var ocrTotalTime; //识别耗费的总时间


        //imgBase64不为空，及图片预览框有内容
        if (imgBase64 != null) {
          startTime = new Date().getTime(); //开始时间
          _this.isBtnActive = true;

          //调用方法base64ToFile()将预览框内的Base64编码图片转换为文件主名为image的文件图片
          var image = base64ToFile(imgBase64, 'image');

          // 通过axios将图片上传到后端处理
          let formData = new FormData();
          // let formData = new window.FormData();
          formData.append('file', image);
          console.log(formData.get("file"));
          let config = {
            //添加请求头
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: function(progressEvent) {

            },
          };
          const instance = _this.axios.create({
            // withCredentials: true
          })

          _this.isProgressBar = true; //显示进度条
          _this.startProgress();

          instance.post('http://127.0.0.1:8081/ocr/idCardOcr', formData, config)
            .then(response => {
              _this.dlProgress = 100;
              // console.log(JSON.stringify(response));
              // if (response.request.status === 200) {
              //   console.log('上传成功')
              // }
              if (response.data != null) {
                console.log(response);
                _this.idCardInfo = response.data;

                _this.isMsgShow = true;

                endTime = new Date().getTime(); //识别结束时间
                if (_this.dlProgress === 100) {
                  _this.isBtnActive = false;
                  _this.sucOrErrMsg = "识别成功！";
                  _this.ocrTotalTime = "识别用时：" + ((endTime - startTime) / 1000).toFixed(2) +
                    "s"; //toFixed()四舍五入保留两位小数
                }
                // console.log(_this.ocrTotalTime);
              }

            });
        } else {
          //todo 无内容点击开始识别
        }

      },

      //点击重置按钮清空页面内容
      Clear(e) {
        let _this = this;
        _this.previewImage = ""; //将图片预览框的内容重置为""
        _this.isDrogShow = true; //将拖拽提示框显示
        _this.isTextShow = false; //将文本提示（加载成功）取消显示
        _this.isPreImgShow = false; //将预览图片img标签取消显示
        _this.isMsgShow = false; //将识别提示消息取消显示
        _this.idCardInfo = ""; //将身份证信息idCardInfo重置为""
        _this.isProgressBar = false; //取消显示进度条
        _this.dlProgress = 0; //将进度条进度重置为0

        _this.$refs.clearFile.value = ''; // 清空input-file文件
      }
    }


  }
</script>

<style>
  @import url("../assets/lazy.css");

  #header h1 {
    text-align: center;
  }

  #imagePanel .imagearea h3 {
    margin: 0;
  }

  #mesgDiv .sucOrErrMessage {
    color: #3c763d;
    background-color: #dff0d8;
    border-color: #d6e9c6;
    padding: 1rem;
    margin-bottom: 0.25rem;
    border: 0.0625rem, solid, transparent;
    border-radius: 0.25rem;
    font-size: 100%;
    box-sizing: border-box;
  }

  .panel-body {
    padding: 5%;
    /* margin-left: 5%;
    margin-right: 5%;
    margin-top: 5%;
    margin-bottom: 5%; */
  }

  .resulttext-panel {
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 10%;
    margin-bottom: 10%;
  }

  .panel-body::after,
  .panel-body::before {
    content: "";
    display: table;
  }

  /* 消除浮动影响 */
  .panel-body::after {
    /* 生成内容为空 */
    content: "";
    /* 伪元素高度为0，不影响其他元素 */
    height: 0;
    /* 伪元素字体大小为0 */
    font-size: 0;
    /* 生成的元素以块级元素显示 */
    display: block;
    /* 清除前面元素浮动带来的影响 */
    clear: both;
    /* 设为不可见 */
    visibility: hidden;
  }

  .panel-body {
    zoom: 1;
  }

  ::after,
  ::before {
    box-sizing: border-box;
  }

  #previewText {
    color: #337ab7;
    height: 5%;
    margin-left: 5%;
    font-size: 14px;
  }

  #resultPanel .resultarea h3 {
    margin: 0;
  }

  .idCardresult-panel {
    position: relative;
    margin-top: 5%;
  }

  /* 身份证信息列表 */
  .idCardresult-panel ul li {
    position: relative;
    float: left;
    width: 100%;
    margin-bottom: 5%;
    display: flex;
    align-items: center;
    /* justify-content: center; */
  }

  /* 身份证信息文本框 */
  .idCardresult-panel ul li .idCardInfo {
    float: left;
    line-height: normal;
    font-family: "微软雅黑";
    font-size: 1rem;
    border: 0.0625rem, solid;
    margin: 0;
    border-radius: 0.25rem;
  }

  /* 地址标签 */
  .idCardresult-panel ul li .address {
    width: 2.4375rem;
    min-width: 2.4375rem;
  }

  /* 地址文本框 */
  .idCardresult-panel ul li .idCardInfo .el-textarea__inner {
    margin: 0;
    line-height: 1.5;
    min-height: 2.15rem !important;
    border: 0.0625rem, solid !important;
    font-family: "微软雅黑";
    font-size: 1rem;
    overflow: hidden;
    resize: none;
    width: 90%;
  }

  /* 身份证信息文本框 */
  .idCardresult-panel ul li .idCardInfo .el-input__inner {
    text-align: center;
    height: 2.15rem;
  }

  /* 身份证信息名标签 */
  .idCardresult-panel ul li .idCardInfoLabel {
    max-width: 100%;
    float: left;
    font-weight: 600;
  }

  textarea::-webkit-input-placeholder {
    color: #999999;
    font-size: 1rem;
    font-family: "微软雅黑";
  }
</style>
