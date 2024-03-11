<template>
    <div class="baerdcrumbWarp">
        <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item)  in levelList" :key="item.id" v-if="item.name">
                <router-link class="routerLink" :to="item.index.length>5?item.index:''">{{item.name}}</router-link>
                <!-- <el-breadcrumb-item v-for="(children)  in item.children" :key="children.id" v-if="children.name">
                        <router-link :to="children.index">{{children.name}}</router-link>
                </el-breadcrumb-item>-->
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    import Bus from '../script/bus'

    export default {
        data() {
            return {
                levelList: null,
                proMenu:null,
                routers:this.$route.name
            };
        },
        methods: {
            getBreadcrumb(flag) {
                let matched;
                /* if(this.$route.path !== '/dashboard'){
                    // matched = JSON.parse(sessionStorage[this.$route.path.split('-')[0].split('/')[1]]).filter(
                    //     item => item.name
                    // );
                    // console.log(this.$router)
                    // debugger
                    if(this.$route.path.split('-')[0].split('/')[1] == 'creditper'){
                        Bus.$emit('toHeader',20000000)
                    }else if(this.$route.path.split('-')[0].split('/')[1] == 'crediten'){
                        Bus.$emit('toHeader',30000000)
                    }else{
                        Bus.$emit('toHeader',10000000)
                    }
                    matched = JSON.parse(sessionStorage[this.$route.path.split('-')[0].split('/')[1]]).filter(
                        item => item.name
                    );
                }else{
                    matched = JSON.parse(sessionStorage.menuData).filter(
                        item => item.name
                    );
                } */
                matched = JSON.parse(sessionStorage['menuData' + sessionStorage.getItem('id')]).filter(
                            item => item.name
                    );
                    let menuName;
                if(this.$route.meta.projectId){
                    // Bus.$emit('toHeader',this.$route.meta.projectId)
                    matched = JSON.parse(sessionStorage['menuData' + this.$route.meta.projectId]).filter(
                            item => item.name
                    );
                    for(var k in JSON.parse(sessionStorage.getItem('projectMenu'))){
                        if(JSON.parse(sessionStorage.getItem('projectMenu'))[k].id == this.$route.meta.projectId){
                            menuName = JSON.parse(sessionStorage.getItem('projectMenu'))[k].name;
                        }
                    }
                }
                let matchedTwo = [];
                this.getSelectProject();
                matchedTwo = matchedTwo.concat({index: "/dashboard", name: menuName = menuName ? menuName : this.proMenu.name});
                if(flag){
                    return;
                }
                for (var i = 0; i < matched.length; i++) {
                    if (this.$route.meta.title == matched[i].name) {
                        matchedTwo.push(matched[i]);
                    } else if (matched[i].children) {
                        for (var j = 0; j < matched[i].children.length; j++) {
                            if (this.$route.path == "/" + matched[i].children[j].index) {
                                matchedTwo.push(matched[i]);
                                matchedTwo = matchedTwo.concat(matched[i].children[j]);
                            }
                        }
                    }
                }
                if(this.$route.fullPath=='/changePassword'){ //判断下，首次登陆修改密码就不要面包屑了
                     this.levelList =[];   
                }else{
                     this.levelList = matchedTwo;
                } 
            },
            getSelectProject(){
                let id = sessionStorage["id"];
                let proMenu = sessionStorage["projectMenu"]
                proMenu = JSON.parse(proMenu);
                for(let i =0; i<proMenu.length; i++ ){
                    if(id == proMenu[i].id){
                        this.proMenu =  proMenu[i];
                        break;
                    }
                }
            }
        },
        computed: {},
        mounted() {
            setTimeout(() => {
                this.getBreadcrumb();
            }, 1000);
            Bus.$on("sysNo", ()=>{
                setTimeout(()=>{
                    if(this.$route.path !== "/dashboard"){
                        this.getBreadcrumb(true);
                    }else{
                        this.getBreadcrumb();
                    }
                },100)
            })
        },
        watch: {
            $route(to, from) {
                setTimeout(()=>{
                    this.getBreadcrumb();
                },100)
            }
        }
    };
</script>


<style>
    .baerdcrumbWarp {
        padding: 10px 0 0 20px;
    }

    .el-breadcrumb__item:last-child .el-breadcrumb__inner,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner a,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
        font-weight: 400;
        color: #5083cb;
        /* cursor: text; */
    }

    .el-breadcrumb__inner a,
    .el-breadcrumb__inner.is-link {
        font-weight: 400;
        color: #303133;
        text-decoration: none;
        /* cursor: text; */
    }
</style>
