<template>
  <el-dialog :visible.sync="param.visible"
             width="60%"
             :close-on-click-modal="false"
             custom-class="model-dialog el-dialog-l">
    <span slot="title"
          class="clearfix">
      <span class="dialog-title el-dialog-titleM">{{param.title}}</span>
      <span class="dialog-title-bg"></span>
    </span>
    <span>这是一段信息</span>
    <span slot="footer"
          class="dialog-footer">
      <el-button class="cancle_btn"
                 @click="param.visible = false">取 消</el-button>
      <el-button class="certain_btn"
                 @click="param.visible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: ['param'],
};
</script>
<style>
</style>
