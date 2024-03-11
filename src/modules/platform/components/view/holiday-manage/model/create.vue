<template>
    <div>
        <el-dialog :title="title"
                   :visible.sync="isShow"
                   :modal="true"
                   :close-on-click-modal="false"
                   custom-class="model-dialog el-dialog-s">
          <span slot="title"
                class="clearfix">
            <span class="dialog-title">{{title}}</span>
            <span class="dialog-title-bg"></span>
          </span>
            <el-form ref="form" :model="form" :rules="rules" label-width="100px" style="margin: 20px">
                <el-form-item label="业务线名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" :loading="submitLoading">立即创建</el-button>
                    <el-button class="close_btn" @click="isShow = false">
                        取 消
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "create",
    data(){
        return {
            // 是否显示
            isShow:false,
            // 标题
            title:"",
            submitLoading:false,
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
            },
            form:{}
        }
    },
    methods:{
        show(record){
            // record存在为编辑，否则为创建(预留，暂无编辑需求)
            if(record){
                this.title = "编辑业务线"
            }else{
                this.title = "添加业务线"
            }
            this.isShow = true;
        },
        // 提交
        onSubmit(){
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.submitLoading = true
                    let paramData = {
                        name:this.form.name
                    }
                    this.http.apiPost(this.$urlList.holiday.createName, paramData).then((res) => {
                        if(res.code === 0){
                            this.isShow = false;
                            this.$emit("addCallback");
                            this.submitLoading = false;
                        }else{
                            this.submitLoading = false;
                        }
                    }).catch(e => {
                        this.submitLoading = false;
                    })
                }
            });
        }
    }
}
</script>

<style scoped>

</style>
