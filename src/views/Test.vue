<template>
  <div id="header">
    <h1>ly的OCR识别测试</h1>
  </div>

  <div id="content">
    <div id="page-header">
      <div class="row clearfix">
        <div class="span12 whitebg">
          <h1 class="slogon">在线OCR检测与文本识别 － LiYiOCR</h1>
          <div class="process-sequence">
            <ul class="fixed">
              <li class="upload">
                <img class="processImg" src="../assets/upload.png" />
                <div class="process-description">
                  <h3 class="prodesc">
                    <strong>上传图片</strong>
                  </h3>
                </div>
              </li>
              <li class="recognition">
                <img class="processImg" src="../assets/start.png" />
                <div class="process-description">
                  <h3 class="prodesc">
                    <strong>开始识别</strong>
                  </h3>
                </div>
              </li>
              <li class="result">
                <img class="processImg" src="../assets/result.png" />
                <div class="process-description">
                  <h3 class="prodesc">
                    <strong>获得结果</strong>
                  </h3>
                </div>
              </li>
              <li class="correct">
                <img class="processImg" src="../assets/correct.png" />
                <div class="process-description">
                  <h3 class="prodesc">
                    <strong>文本校正</strong>
                  </h3>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="link"></div>


    <form action="/OCR/ParseImage" class="form-horizontal" enctype="multipart/form-data" id="ocrForm" method="post"
      novalidate="novalidate">
      <input name="__RequestVerificationToken" type="hidden" value="unknown">
      <fieldset>
        <div class="row">
          <div class="span12">
            <h3 class="headline">
              <span>在线文字识别，OCR服务<i class="mobileHidden">－LiYiOCR</i></span>
            </h3>
          </div>

          <div class="span12">
            <div class="span4">
              <p class="diyLabel">上传文件 ( png / jpg )</p>
            </div>
            <div class="span8">
              <input type="file" id="imageFile" class="form-control choose" @change="uploadImage($event)"
                accept=".png,.jpg,.jpeg">
            </div>
          </div>

          <div class="span12">
            <h2 class="boldo">或者</h2>
          </div>

          <div class="span12 diyItem">
            <div class="span4">
              <p class="diyLabel">输入图片url ( png / jpg )</p>
            </div>
            <div class="span8">
              <input type="text" id="imageUrl" class="form-control choose">
            </div>
          </div>

          <div class="span12 thirdrow">
            <div class="span4">
              <p class="diyLabel">选择识别语言</p>
            </div>
            <div class="span4">
              <select id="ocrLanguage" class="form-control valid selection">
                <option value="chs" selected="selected">中文（简体）</option>
                <!-- <option value="cht">中文（繁体）</option> -->
                <option value="eng">英语</option>
                <!-- <option value="fre">法语</option>
                <option value="ger">德语</option>
                <option value="ara">阿拉伯语</option>
                <option value="gre">希腊语</option>
                <option value="jpn">日语</option>
                <option value="kor">韩语</option>
                <option value="por">葡萄牙语</option>
                <option value="rus">俄语</option>
                <option value="spa">西班牙语</option> -->
              </select>
            </div>

            <div class="span2" id="btnStartOCR">
              <a class="btn btn-large btn-green-light" @click="StartOCR($event)">开始</a>
            </div>
            <div class="span2" id="btnCancel">
              <a class="btn btn-large btn-green-light" @click="Clear">重置</a>
            </div>
          </div>

          <div id="sucOrErrMesgMainDiv" class="span12" style="display:none">
            <div id="sucOrErrMesgDiv" class="alert alert-dismissible">
              <button type="button" class="close" data-dismiss="alert">×</button>
              <span id="sucOrErrMessage"></span>
            </div>
          </div>

          <div id="animatedProgress" class="span12" style="display: none">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 progress progress-striped active">
              <div class="progress-bar" style="width: 100%"></div>
            </div>
          </div>

          <div style=" clear:both; margin-top:50px !important;"></div>

          <div class="span12">
            <div id="imagePanel" class="span5 borderspanblue">

              <div class="imagearea">
                <h3>图片预览</h3>
              </div>
              <div class="panel-body">
                <div id="filedrag" v-show="isShow" @drop="drop($event)" @dragover="allowDrop($event)"
                  style="height: 80%; display: block">
                  你也可以把图片拖拽到这里
                </div>
                <img id="previewImage" :src="previewImage" class="img-responsive" v-show="isPreImgShow"
                  style="float:left; height:90%; width:100%;" />
              </div>
              <div>
                <h4 id="previewText" v-show="isTextShow">加载成功</h4>
              </div>
            </div>

            <div class="span2" style="padding-right: 12px;">
              <a id="btnDownloadText" class="btn btn-large btn-green-light gap" @click="DownloadText">
                下载
              </a>
              <br>
              <a id="btnShowOverlay" class="example-image-link btn btn-large btn-green-light" @click="ShowOverlay">
                校对
              </a>
            </div>

            <div id="resultPanel" class="span5 borderspan">
              <div class="resultarea">
                <h3>识别结果</h3>
              </div>
              <div class="resulttext-panel">
                <textarea class="form-control" cols="20" id="txtAreaParsedResult" name="parsedResult" rows="2"
                  style="height:80%;width: 100%; resize: none;"></textarea>
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
  import qs from 'qs';
  export default {
    data() {
      return {
        isShow: true, //默认显示虚线提示框
        isTextShow: false, //默认不显示文本提示(加载成功)
        isPreImgShow: false, //默认不显示预览图片框(加载成功)
        previewImage: null,
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
      uploadImage(event) {
        let _this = this;
        _this.isShow = false; //取消显示虚线提示框
        _this.isTextShow = true; //显示文本提示(加载成功)
        _this.isPreImgShow = true; //显示预览图片
        let image = document.getElementById('imageFile').files[0]; //获取图片
        let name = document.getElementById('imageFile').files[0].name; //图片文件名
        let arr = name.split('.'); //将文件名以 . 分割为文件主名和文件扩展名 并存到arr数组
        //console.log(arr);//打印arr数组即打印文件主名和文件扩展名
        let fileSize = 0; //文件大小
        if (image) {
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
        } else {
          return false;
        }

        let reader = new FileReader();
        reader.readAsDataURL(image); //将image转换为Base64编码的图片
        //当读取成功后触发
        reader.onloadend = e => {
          //没有返回值，但是读取完毕后，将读取结果存储在对象的result中
          let imgFileBase64 = e.target.result; //imgFileBase64存放图片的Base64编码串
          //console.log(imgFileBase64);
          _this.previewImage = imgFileBase64;
          //document.getElementById('previewImage').src = imgFileBase64; //将imgFileBase64编码值赋值给ID为previewImage的src属性
        }

        // 通过axios将图片上传到后端处理
        let formData = new FormData();
        // let formData = new window.FormData();
        formData.append('file', image);
        console.log(formData.get("file"));

        let config = {
          //添加请求头
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        const instance = _this.axios.create({
          // withCredentials: true
        })
        instance.post('http://127.0.0.1:8081/ocr/idCardOcr', formData, config)
          .then(response => {
            // console.log(JSON.stringify(response));
            console.log(response);
            console.log(response.data.name)
          });

      },

      allowDrop(e) {
        e.preventDefault();
      },

      drop(e) {
        let _this = this;
        _this.isShow = false; //取消显示虚线提示框
        _this.isTextShow = true; //显示文本提示(加载成功)
        _this.isPreImgShow = true; //显示预览图片
        // 方法二
        var files = [];
        [].forEach.call(
          e.dataTransfer.files,
          function(file) {
            files.push(file);
          },
          false
        );
        let image = files[0];
        console.log(image);
        console.log(image.name);

        let reader = new FileReader();
        reader.readAsDataURL(image); //将image转换为Base64编码的图片
        reader.onloadend = e => {
          let imgFileBase64 = e.target.result; //imgFileBase64存放图片的Base64编码串
          //console.log(imgFileBase64);
          _this.previewImage = imgFileBase64;
          //document.getElementById('previewImage').src = imgFileBase64; //将imgFileBase64编码值赋值给ID为previewImage的src属性
        }

        // 通过axios将图片上传到后端处理
        let formData = new FormData();
        // let formData = new window.FormData();
        formData.append('file', image);
        console.log(formData.get("file"));

        let config = {
          //添加请求头
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        //创建axios实例
        const instance = _this.axios.create({
          // withCredentials: true
        })
        instance.post('http://127.0.0.1:8081/ocr/idCardOcr', formData, config)
          .then(response => {
            //在控制台中打印response
            // console.log(JSON.stringify(response));
            console.log(response);
            // _this.txtAreaParsedResult = response;
          });

      },

      StartOCR(event) {
        let _this = this;
        var imgCode = _this.previewImage;
        console.log(_this.previewImage);
        var jsonObj = {
          name: 'liyi',
          password: '123',
        }

        // // 通过axios将图片上传到后端处理
        // let formData = new FormData();
        // // let formData = new window.FormData();
        // formData.append('file', image);
        // console.log(formData.get("file"));

        // let config = {
        //   //添加请求头
        //   headers: {
        //     'Content-Type': 'multipart/form-data'
        //   }
        // };
        // const instance = _this.axios.create({
        //   // withCredentials: true
        // })
        // instance.post('http://127.0.0.1:8081/ocr/idCardOcr', formData, config).then(response => {
        //   console.log("response:" + response);
        // });

      },

    },

  };
</script>


<style>
  @import url("../assets/lazy.css");

  #header h1 {
    text-align: center;
  }

  #imagePanel .imagearea h3 {
    margin: 0;
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
</style>
