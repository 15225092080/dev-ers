<template>
  <div>
    <el-card shadow="hover"
             class="user-info">
      <div class="welcomeText">您好，欢迎使用{{$route.meta.content || '平台管理系统'}}</div>
      <img src="../../../../../assets/images/platform/welcome.png"
           alt>
    </el-card>
  </div>
</template>

<script>
</script>
<style scoped>
.welcomeText {
  height: 15vh;
  line-height: 15vh;
  font-size: 26px;
  color: #97a2b1;
}
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  text-align: center;
  height: 85vh;
}
/* .mgb20 {
        margin-bottom: 20px;
    } */

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}
</style>
