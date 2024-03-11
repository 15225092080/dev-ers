import seltopn from "@/common/components/seltopn";
import search from "@/common/components/search";
import form from "@/modules/ers/components/common/form";
import table from "@/modules/ers/components/common/table.vue";
import steps from "@/modules/ers/components/common/steps.vue";
import uploadFile from "@/modules/ers/components/common/uploadFile.vue";
import treetable from "@/common/components/tableRecord";
import cascader from "@/common/components/cascader";
import upload from "@/common/components/upload";
function plugin(Vue) {
    if (plugin.installed) {
        return;
    }
    Vue.component("vSelect", seltopn);
    Vue.component("vOperation", search);
    Vue.component("vForm", form);
    Vue.component("vTable", table);
    Vue.component("vSteps", steps);
    Vue.component("upload-file", uploadFile);
    Vue.component("vCascader", cascader);
    Vue.component("vUpload", upload);
    Vue.component("vTreetable", treetable);
}
export default plugin;
// 注册全局组件，在页面中直接调用，不用import
