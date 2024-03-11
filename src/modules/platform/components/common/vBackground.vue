<template>
  <div>
    <div class="head-box"
         :class="{'bgImg' : browserVersion}">
      <div class="header-ico">
        <span class="left-circle"></span>
        <span>DHC</span>
        <span class="right-circle"></span>
      </div>
      <div id="head">
        <div class="bgItem"></div>
      </div>
      <div id="wrap"
           class="clearfix">
        <div class="bg-border-radius">
          <div class="bgItem bgItem1"></div>
        </div>
        <div class="bg-border-radius">
          <div class="bgItem bgItem2"></div>
        </div>
        <div class="bg-border-radius">
          <div class="bgItem bgItem3"></div>
        </div>
        <div class="bg-border-radius">
          <div class="bgItem bgItem4"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'vBackground',
  data() {
    return {};
  },
  methods: {},
  computed: {
    browserVersion() {
      if (this.common.BrowserType() == 'IE9') {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {},
};
</script>
<style>
.header-ico {
  position: fixed;
  top: 5px;
  left: 30px;
}
.header-ico .left-circle,
.header-ico .right-circle {
  display: inline-block;
  height: 5px;
  width: 5px;
  border-radius: 50%;
  background-color: #8080ff;
  margin-bottom: 2px;
}
.header-ico .right-circle {
  background-color: #f59a23;
}
.head-box {
  position: absolute;
  width: 100%;
  z-index: 1;
  top: 0;
  bottom: 0;
  background-color: #fcfaf8;
}
.bgImg {
  background: url('../../../../assets/images/platform/login/bg.png');
}
.bg-border-radius {
  /* border-radius: 50%; */
  overflow: hidden;
}
.bgItem {
  width: 180px;
  height: 180px;
  margin: 0 auto;
  margin-top: 15vh;
  /*border: 1px solid #000;*/
  background-image: radial-gradient(#bbb 1%, #ccc 20%, #fcfaf8 69%);
}
.bgItem1 {
  background-image: radial-gradient(#f9debf 1%, #fae4cb 30%, #fcfaf8 69%);
}
.bgItem2 {
  background-image: radial-gradient(#cfe3f4 1%, #d5e6f4 30%, #fcfaf8 69%);
}
.bgItem3 {
  background-image: radial-gradient(#c5d7ee 1%, #ccdcf1 30%, #fcfaf8 69%);
}
.bgItem4 {
  background-image: radial-gradient(#bce7e8 1%, #c9eaeb 30%, #fcfaf8 69%);
}
#wrap {
  width: 720px;
  margin: 0 auto;
}
#wrap .bg-border-radius {
  float: left;
}
#head {
  text-align: center;
}
.login-footer {
  position: absolute;
  width: 100%;
  /* color: #fff; */
  z-index: 999;
  text-align: left;
  /* font-size: 20px; */
  bottom: 20px;
  color: #a8a3a3;
  text-align: center;
}
.login-main {
  position: relative;
  z-index: 2;
}
/* <!--[if IE 9]>
.head-box{
    position: absolute;
    width: 100%;
    z-index: 1;
    top: 0;
    bottom:0;
    background:url("../../../../assets/images/platform/login/bg.png")
}
 <![endif]--> */
</style>
