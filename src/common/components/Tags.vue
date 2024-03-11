<template>
  <el-row class="header"
          :gutter="20">
    <div v-if="defaultTagStatus"
         class="tagsWrap"
         :style="wrapStyle">
      <i class="icon DHCiconfont DHC-zuofanye moveTags moveTagsLeft"
         @click="prev"></i>
      <div class="tags"
           v-if="showTags">
        <ul>
          <scroll-pane ref="scrollPane"
                       class="tags-view-wrapper"
                       style="width:100%;">
            <li class="tags-li"
                v-for="(item,index) in tagsList"
                v-show="item.title"
                :class="{'active': isActive(item.path,index)}"
                :key="index">
              <span v-show="item.title"
                    @click="linkToPath(item)">{{item.title}}</span>
              <span v-show="item.path !== '/platform'"
                    class="tags-li-icon"
                    @click="closeTags(index)"><i class="el-icon-close"
                   v-if="item.path!==subs($route.path)"></i></span>
              <!-- 判断是否是新增或者编辑页面 新增编辑页面的时候没有title  如果是首页不能关闭 -->
            </li>
          </scroll-pane>
        </ul>
      </div>
      <i class="icon DHCiconfont DHC-youfanye moveTags moveTagsRight"
         @click="next"></i>
    </div>
  </el-row>
</template>

<script>
import Bus from '../script/bus';
import winBus from '../script/eventBus';
import ScrollPane from './ScrollPane';
export default {
  components: { ScrollPane },
  data() {
    return {
      wrapStyle: {
        width: '0%',
        position: 'relative',
        bottom: '0',
        'margin-left': '0',
        padding: '10px 0',
        clear: 'both',
      },
      collapse: false,
      defaultTagStatus: true,
      tagsList: [],
    };
  },
  methods: {
    subs(str) {
      let index = str.lastIndexOf('-');
      str = str.substring(0, index);
      return str;
    },
    prev() {
      this.$refs.scrollPane.prevScroll();
    },
    next() {
      this.$refs.scrollPane.nextScroll();
    },
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse;
      Bus.$emit('collapse', this.collapse);
    },
    isActive(path, index) {
      let flag = path === this.$route.fullPath;
      if (flag) {
        this.$store.tagsObj = {
          activeIndex: index,
          tagsList: this.tagsList,
        };
      }
      return flag;
    },
    linkToPath(item) {
      // 兼容非vue组件，通过改变iframe的src属性实现跳转
      if (item.iframeSrc && item.iframeSrc.indexOf('iframe') > -1) {
        if (this.common.BrowserType().indexOf('IE') == -1) {
          this.$router.push({
            path: '/iframe',
            query: {
              name: item.title,
              index: item.iframeSrc,
            },
          });
          Bus.$emit('iframeSrc', item.iframeSrc);
        } else {
          this.$router.push({
            path: '/blank',
            query: { index: item.iframeSrc, name: item.title },
          });
        }
        // this.$router.push({
        //   path: '/iframe',
        //   query: {
        //     name: item.title,
        //     index: item.iframeSrc
        //   }
        // });
        sessionStorage.iframeLink = item.iframeSrc;
        // Bus.$emit('iframeSrc', item.iframeSrc);
      } else {
        this.$router.push(item.path);
      }
    },
    // 关闭单个标签
    closeTags(index) {
      const delItem = this.tagsList.splice(index, 1)[0];
      let item = this.tagsList[index]
        ? this.tagsList[index]
        : this.tagsList[index - 1];
      if (item) {
        let colsePath = this.$route.fullPath;
        if (this.$route.fullPath.indexOf('-edit')) {
          colsePath = colsePath.replace('-edit', '');
        } else if (colsePath.indexOf('-detail')) {
          colsePath = colsePath.replace('-detail', '');
        }

        //   if(item['path'].includes("-edit")||item['path'].includes("-detail")){

        //     // this.tagsList.splice(this.tagsList.findIndex(v => v['path'].indexOf('-edit')>0))
        //      console.log(this.tagsList,item.path)

        //     // this.$router.push(item.path)
        // }

        //  console.log(this.tagsList.filter(i=>{
        //          i['path']==='/system-org'
        //    }))
        // console.log(this.tagsList)
        delItem.path === colsePath && this.$router.push(item.path);
      } else {
        this.$router.push('/');
      }
      this.$store.dispatch('user/setTagsList', this.tagsList);
    },
    // 关闭全部标签
    closeAll() {
      this.tagsList = [];
      this.$router.push('/');
    },
    // 关闭其他标签
    closeOther() {
      const curItem = this.tagsList.filter((item) => {
        return item.path === this.$route.fullPath;
      });
      this.tagsList = curItem;
    },
    // 设置标签
    setTags(route) {
      if (route.fullPath.indexOf('blank') != -1) {
        return;
      }
      const isExist = this.tagsList.some((item) => {
        if (route.query.name && item.iframeSrc) {
          return item.iframeSrc === route.query.index;
        }
        return item.path === route.fullPath;
      });
      const redFruits = ['/system-user-edit', '/system-org-edit'];
      if (!redFruits.includes(route.fullPath)) {
        if (!isExist) {
          // if (this.tagsList.length >= 8) {
          //     this.tagsList.shift();
          // }
          let title = route.meta.title;
          let iframeSrc = null;
          if (this.$route.query.name) {
            title = this.$route.query.name;
            iframeSrc = this.$route.query.index;
          }
          if (title) {
            title = decodeURI(title);
            this.tagsList.push({
              title: title,
              path: route.fullPath,
              iframeSrc: iframeSrc,
              // name: route.matched[1].components.default.name
            });
            this.$store.dispatch('user/setTagsList', this.tagsList);
          }
        }
        this.tagsList = this.tagDataList;
        Bus.$emit('tags', this.tagsList);
      }
    },
    handleTags(command) {
      command === 'other' ? this.closeOther() : this.closeAll();
    },
    setTagsWidth() {
      this.wrapStyle.width = window.innerWidth - 220 + 'px';
    },
  },
  computed: {
    showTags() {
      return this.tagsList.length > 0;
    },
    tagStatus() {
      return this.$store.getters.tagStatus;
    },
    tagDataList() {
      return this.$store.getters.tagsList;
    },
  },
  watch: {
    tagStatus(newValue) {
      this.defaultTagStatus = newValue;
    },
    $route(newValue) {
      if (
        this.$route.fullPath.indexOf('-edit') &&
        JSON.stringify(this.$route.query) !== '{}'
      ) {
        this.$store.dispatch('user/setOperatState', 'edit');
      } else if (this.$route.fullPath.indexOf('-edit')) {
        this.$store.dispatch('user/setOperatState', 'add');
      } else {
        this.$store.dispatch('user/setOperatState', '');
      }
      if (newValue.meta.title) {
        this.$store.dispatch('table/setTagStatus', true);
      } else {
        this.$store.dispatch('table/setTagStatus', false);
      }
      this.setTags(newValue);
      if (newValue.path.indexOf('-') < 0) {
        setTimeout(() => {
          Bus.$emit('iframeLink', newValue.path);
        }, 500);
      }
    },
    tagsList: function (newValue) {
      let item = newValue.find((i) => {
        return i.path == '/creditper-inquire';
      });
      let index = newValue.find((j) => {
        return j.path == '/crediten-inquire';
      });
      if (!item) {
        sessionStorage.active = 0;
      }
      if (!index) {
        sessionStorage.enactive = 0;
      }
    },
  },
  created() {
    winBus(this);
    this.defaultTagStatus = this.tagStatus;
    window.top.eventBus.$on('tagShow', (msg) => {
      this.defaultTagStatus = msg;
      this.$store.dispatch('table/setTagStatus', msg);
    });
    this.setTags(this.$route);
    var that = this;
    Bus.$on('closeTabs', () => {
      that.closeTags(that.tagsList.length - 1);
    });
    this.setTagsWidth();
  },
  mounted() {},
  destroyed() {
    /**
     * Bus这个事件需要解绑，要不然路由切换回缓存之前的调用
     */
    Bus.$off('closeTabs');
  },
};
</script>


<style>
.header {
  margin-left: 0 !important;
  background: #ffffff !important;
  color: #747474;
  margin-top: 4px;
  margin-right: 0 !important;
  border-radius: 5px 5px 0 0;
  border-bottom: 1px solid #ecedf2;
}
.moveTags {
  float: left;
  display: inline-block;
  top: 17px;
  /* height: 34px; */
}
.moveTagsLeft {
  position: absolute;
  left: 0;
  padding-left: 5px;
}
.moveTagsRight {
  position: absolute;
  right: 0;
  padding-right: 27px;
}
.tags {
  /* display: inline-block; */
  float: left;
  position: relative;
  height: 30px;
  overflow: hidden;
  /* background: #fff; */
  padding-right: 120px;
  margin-left: 28px;
  width: 96%;
  /*box-shadow: 0 5px 10px #ddd;*/
}
.tagsWrap {
  padding: 14px 0px !important;
}
.tags ul {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.tags-li {
  /* float: left; */
  display: inline-block;
  margin: 3px 5px 2px 3px;
  border-radius: 3px;
  font-size: 12px;
  overflow: hidden;
  cursor: pointer;
  height: 23px;
  line-height: 23px;
  /* border: 1px solid #e9eaec; */
  background: #fff;
  padding: 0 5px 0 12px;
  vertical-align: middle;
  color: #676767;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
}

.tags-li:not(.active):hover {
  background: #f8f8f8;
}

.tags-li.active {
  position: relative;
  color: #3075c7;
}
.tags-li-title {
  float: left;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 5px;
  color: #666;
}

.tags-li.active .tags-li-title {
  color: #3075c7;
}

.tags-close-box {
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  padding-top: 1px;
  text-align: center;
  width: 110px;
  height: 30px;
  background: #fff;
  box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.collapse {
  float: left;
  padding: 0 10px;
  cursor: pointer;
  line-height: 35px;
  color: #409eff;
}
</style>
