<template>
    <el-upload
        class="upload-demo"
        :action="uploadUrl"
        :show-file-list="false"
        :headers="headers"
        :data="uploadParams"
        :before-upload="beforeUpload"
        :on-success="handleAvatarSuccess"
    >
        <el-button class="submit_btn" slot="trigger">
            <i class="DHCiconfont">&#xe6b3;</i>
            导入模板文件
        </el-button>
    </el-upload>
</template>

<script>
import store from '@/store'; // 引用vuex
export default {
    name: "upload",
    props:{
        name:{}
    },
    data(){
        return {
            // 上传地址
            uploadUrl:process.env.API_ROOT_PLATFORM + this.$urlList.holiday.importExcel,
            // 请求头
            headers:{
                Authorization:store.getters.token
            },
            // 上传附加参数
            uploadParams:{}
        }
    },
    methods: {
        beforeUpload(){
            this.uploadParams.name = this.name;
        },
        handleAvatarSuccess(){
            this.$emit("callback")
        }
    }
}
</script>

<style scoped>
/deep/ .el-upload {
    display: inline;
    text-align: center;
    cursor: pointer;
    outline: 0;
}

/deep/ .upload-demo {
    display: inline;
}
</style>
