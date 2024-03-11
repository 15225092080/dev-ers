<template>
  <div class="rightNotice">
    <div class="noticeHeader">
      <h2 :title="noticeData.title">{{noticeData.title}}</h2>
      <p>
        <span :title="noticeData.updateUserName">发布人：{{noticeData.updateUserName}}</span>
        <span :title="noticeData.announceTime">发布时间：{{noticeData.announceTime}}</span>
        <span :title="systemId">隶属系统：{{systemId}}</span>
      </p>
    </div>
    <div class="noticeMain">
      <p>
        <el-input type="textarea"
                  v-model="noticeData.content"
                  :autosize="{minRows:10,maxRows: 10}"
                  :disabled="true"></el-input>
        <!-- {{noticeData.content}} -->
      </p>
      <ul>
        <li v-for="(item,index) in noticeData.fileList"
            :key="index"><span>{{item.name}}</span>
          <el-button @click="downLoad(item.id)"
                     size="mini"
                     type="warning"><i class="DHCiconfont">&#xe6c0;</i>下载</el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noticeData: '',
      systemId: '',
    };
  },
  props: ['activeIndex'],
  components: {},
  computed: {
    //   systemId(){
    //       return JSON.parse(sessionStorage.getItem(sessionStorage.getItem('systemId') + '_systemList'))[this.noticeData.systemId]
    //   }
  },
  methods: {
    //   公告详情事件 父组件调用
    getNoticeData(key) {
      let param = {
        params: {
          id: key,
        },
      };

      this.http
        .apiGet(this.$commonUrl.notice.getById, param, {
          showLoading: true,
        })
        .then((res) => {
          if (res.code == 0) {
            res.data.announceTime = res.data.announceTime.split(' ')[0];
            this.noticeData = res.data;
            setTimeout(() => {
              this.systemId = JSON.parse(sessionStorage.getItem(sessionStorage.getItem('systemId') + '_systemList'))[res.data.systemId];
            }, 100);
          } else {
            this.$message.error(res.message);
          }
        });
    },
    downLoad(attachmentId) {
      //   window.location.href = this.$urlList.systemmsg.download + '?path=' + encodeURI(attachmentPath);
      this.common.downLoad(this.$commonUrl.systemmsg.download, { attachmentId: attachmentId });
      //   window.open(this.$urlList.systemmsg.download+"?path="+encodeURI(attachmentPath),"_blank")
    },
  },
  mounted() {
    this.getNoticeData(this.activeIndex);
  },
  created() {
    this.common.getdic(this.$commonUrl.home.system, 'systemList');
  },
};
</script>
<style scoped>
.noticeHeader,
.noticeMain {
  padding: 0 60px;
}
.noticeHeader h2,
.noticeHeader p {
  text-align: center;
  padding-top: 15px;
}
.noticeHeader p {
  border-bottom: 1px solid #f1f1f1;
  padding-bottom: 15px;
  display: flex;
  justify-content: space-around;
}
.noticeMain {
  height: 300px;
  overflow: auto;
  border-left: 1px solid #f1f1f1;
  margin-bottom: 30px;
}
.noticeMain p {
  padding: 15px 0;
  line-height: 1.3;
  border-bottom: 1px solid #f1f1f1;
}
.noticeMain ul li {
  list-style: none;
  padding: 5px 0;
  display: flex;
  align-items: center;
}
.noticeMain ul li span {
  width: 85%;
  display: inline-block;
}
.noticeMain ul li button {
  border-radius: 5px;
}
.rightNotice {
  margin-left: 160px;
}
.noticeMain >>> .el-textarea.is-disabled .el-textarea__inner {
  background-color: #fff;
  color: #000;
  border: none;
  font-size: 14px;
  text-indent: 2em;
}
.noticeHeader h2,
.noticeHeader span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 20px;
  padding-right: 20px;
}
.noticeHeader h2 {
  padding-left: 60px;
  padding-right: 60px;
}
</style>
