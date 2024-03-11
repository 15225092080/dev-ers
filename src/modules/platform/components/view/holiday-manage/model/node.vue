<template>
    <div class="node">
        <div v-if="isCurMonth" @click="handleClick" class="nodeContent">
            <p>
                {{ data.day.split("-").slice(2).join("-") }}
            </p>
            <p class="tag" :class="tag==='节假日'?'holidayTag':'workdayTag'">{{tag}}</p>
        </div>
        <div v-else class="nodeContent">
            <p>
                {{ data.day.split("-").slice(2).join("-") }}
            </p>
        </div>
    </div>
</template>

<script>
import {formatYearMonthDay, getWeek} from "./util";
export default {
    name: "node",
    props:{
        data:{type:Object},
        monthConfig:{type:Array},
        addWorkday:{type:Function},
        addHoliday:{type:Function},
        delWorkday:{type:Function},
        delHoliday:{type:Function},
        yearMonth:{type:String}
    },
    data(){
        return {
            // 标签名字
            tag:"",
            // 是否显示标签
            showTag: false,
            // 当前日期格式化后的字符串，格式：20211202
            curDateStr:"",
            // 当前日期是否属于当前月
            isCurMonth: true
        }
    },
    created() {
        // 格式化当前字符串
        this.curDateStr = formatYearMonthDay(this.data.day);
        this.isCurMonth = this.data.day.split("-")[1] === this.yearMonth.substring(4, this.yearMonth.length);
    },
    methods:{
        initTag(){
            // 初始化当前标签
            if(this.isHoliday()){
                this.tag = "节假日";
            }else{
                this.tag = "工作日";
            }
        },
        // 点击日历切换类型事件
        handleClick(){
            // 点击的是上个月最后几天或下个月前几天不处理，否则会切换日历月份，体验不好
            if(!this.isCurMonth){
                return;
            }
            // 原来是节假日的切换成工作日
            if(this.tag === '节假日'){
                if(this.isHoliday()){
                    this.addWorkday(this.curDateStr);
                }
                this.delHoliday(this.curDateStr);
                this.tag = "工作日";
            }else if(this.tag === '工作日'){
                if(!this.isHoliday()) {
                    this.addHoliday(this.curDateStr);
                }
                this.delWorkday(this.curDateStr);
                this.tag = '节假日';
            }
        },
        // 是否是节假日
        isHoliday(){
            // 优先按已经配置的返回
            if(this.monthConfig.length > 0){
                for (let i = 0; i < this.monthConfig.length; i++) {
                    if(this.monthConfig[i].dateId === this.curDateStr){
                        // 状态（0-工作日，1-非工作日）
                        return this.monthConfig[i].status !== '0';
                    }
                }
            }
            //未配置的按默认周六日为节假日，一到五为工作日
            let week = getWeek(this.data.day);
            return week === 0 || week === 6;
        },
    },
    watch:{
        // 初始化当前标签
        monthConfig:function (){
            this.initTag();
        }
    }
}
</script>

<style scoped lang="less">
.node{
    width: 100%;
    height: 100%;
}
.nodeContent{
    padding: 12px 10px;
}
.el-calendar .tag{
    font-size: 12px;
}
.holidayTag{
    color: #f00;
}
.workdayTag{
    color: #242f42;
}
</style>
