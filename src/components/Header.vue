<template>

  <el-header>
    <div id="user" style="width: 100%">
      <div style="display: inline-block; cursor: pointer;" @click="href()" @mouseover="mouseOver()"
        @mouseleave="mouseLeave()">
        <el-avatar style="float: left;" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">

        </el-avatar>
        <span class="top-username"
          style="float: left; line-height: 1.5; margin-top: 10px; margin-left:6px; max-width: 6.25rem; overflow: hidden;text-overflow: ellipsis; inline-block;vertical-align: top; font: 13px/23px 'PingFang SC',Arial,'Microsoft YaHei',sans-serif; ">{{userName}}</span>
      </div>
      
      <div v-show="isShowLogout" @mouseover="enterLogout()" @mouseleave="leaveLogout()" @click="logout()"
        style="width: 4.5%; text-align: center; background-color: rgb(234, 241, 255); cursor: pointer;">退出登录
      </div>
    </div>

  </el-header>

</template>

<script>
  import Cookie from 'js-cookie';
  var t;
  export function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
      return (arr[2]);
    } else {
      return false
    }
  }
  export function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval) {
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
  };


  export default {
    data() {
      return {
        isLogin: false,
        userName: "未登录",
        isShowLogout: false,
        isEnterLogout: false,
        // t:"",
      }
    },
    computed: {
      userName() {
        let _this = this;
        if (Cookie.get('userName')) {
          _this.isLogin = true;
          return Cookie.get('userName');
        } else {
          _this.$router.push({
            path: "/login",
          })
          return "未登录"
        }
      },
    },
    methods: {
      href() {
        let _this = this;
        if (!_this.isLogin) {

          _this.$router.push({
            path: "/login"
          })
        } else {}
      },
      mouseOver() {
        if (this.isLogin) {
          this.isShowLogout = true;
        }
      },
      mouseLeave: function() {
        let _this = this;
        if (_this.isLogin && !_this.isEnterLogout) {
          //setTimeout函数延迟0.5s隐藏退出登录
          t = setTimeout(function() {
            _this.isShowLogout = false;
          }, 500)
        }
      },

      enterLogout() {
        let _this = this;
        _this.isEnterLogout = true;
        _this.isShowLogout = true;

        clearTimeout(t); //终止执行mouseLeave的setTimeout方法，即鼠标移出了用户头像和昵称范围但移入了退出登录范围，那么退出登录就不会消失，
      },
      leaveLogout() {
        let _this = this;
        _this.isEnterLogout = false;
        setTimeout(function() {
          _this.isShowLogout = false;
        }, 200)
      },
      logout() {
        if (getCookie("userName")) {
          delCookie("userName");
          this.$message({
            showClose: true,
            message: '登出成功',
            type: 'success',
          });
          this.$router.push({
            path: "/login"
          })
        }
      }
    }

  }
</script>

<style>
</style>
