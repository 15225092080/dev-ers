import Vue from "vue";
import Router from "vue-router";
import errorRoutes from "@/modules/ers/script/error";
Vue.use(Router);
// export default arr;
export const asyncRoutes = [
    {
        path: "/iframe",
        component: resolve =>
            require(["../components/common/iframe.vue"], resolve),
        meta: { title: "iframe" }
    },
    {
        path: "/platform",
        component: resolve =>
            require([
                "@/modules/ers/components/view/creditAssets/index.vue"
            ], resolve),
        meta: { title: "系统首页" }
    },
    // {
    //     path: "/ecb-list",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/clientInfo/ecb-list/index.vue"
    //         ], resolve),
    //     meta: { title: "企业身份标识整合", keepAlive: true }
    // },
    // {
    //     path: "/ecc-list",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/clientInfo/ecc-list/index.vue"
    //         ], resolve),
    //     meta: { title: "关联关系信息", keepAlive: true }
    // },
    // {
    //     path: "elb-loanTab",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/transactionInfo/elb-loanTab/index.vue"
    //         ], resolve),
    //     meta: { title: "借贷交易维护", keepAlive: true }
    // },
    // {
    //     path: "/elb-loanTab-edit",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/transactionInfo/elb-loanTab/model/edit.vue"
    //         ], resolve),
    //     meta: { icon: "jiedaijiaoyi" }
    // },
    // {
    //     path: "/elb-loanTab-detail",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/transactionInfo/elb-loanTab/model/detail.vue"
    //         ], resolve),
    //     meta: {}
    // },
    // {
    //     path: "egb-guaranteeTab",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/transactionInfo/egb-guaranteeTab/index.vue"
    //         ], resolve),
    //     meta: { title: "担保交易维护", keepAlive: true }
    // },
    // {
    //     path: "/egb-guarantee-edit",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/transactionInfo/egb-guaranteeTab/model/edit.vue"
    //         ], resolve),
    //     meta: { icon: "danbaojiaoyi" }
    // },
    // {
    //     path: "/egb-guarantee-detail",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/transactionInfo/egb-guaranteeTab/model/detail.vue"
    //         ], resolve),
    //     meta: {}
    // },
    // {
    //     path: "epb-mortgageTab",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/transactionInfo/epb-mortgageTab/index.vue"
    //         ], resolve),
    //     meta: { title: "抵质押合同信息", keepAlive: true }
    // },
    // {
    //     path: "/epb-mortgage-edit",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/transactionInfo/epb-mortgageTab/model/edit.vue"
    //         ], resolve),
    //     meta: { icon: "dizhiya" }
    // },
    // {
    //     path: "/epb-mortgage-detail",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/transactionInfo/epb-mortgageTab/model/detail.vue"
    //         ], resolve)
    // },
    // {
    //     path: "/financial-efb-list",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/financial/efb/index.vue"
    //         ], resolve),
    //     meta: { title: "02版资产负债表", keepAlive: true }
    // },
    // {
    //     path: "/financial-efb-edit",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/financial/efb/model/edit.vue"
    //         ], resolve),
    //     meta: {}
    // },
    // {
    //     path: "/financial-efb-detail",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/financial/efb/model/detail.vue"
    //         ], resolve),
    //     meta: {}
    // },
    // {
    //     path: "/financial-efc-list",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/financial/efc/index.vue"
    //         ], resolve),
    //     meta: { title: "07版资产负债表", keepAlive: true }
    // },
    // {
    //     path: "/financial-efc-edit",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/financial/efc/model/edit.vue"
    //         ], resolve),
    //     meta: {}
    // },
    // {
    //     path: "/financial-efc-detail",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/financial/efc/model/detail.vue"
    //         ], resolve),
    //     meta: {}
    // },
    // {
    //     path: "/financial-efd-list",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/financial/efd/index.vue"
    //         ], resolve),
    //     meta: { title: "02版利润分配表", keepAlive: true }
    // },
    // {
    //     path: "/financial-efd-edit",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/financial/efd/model/edit.vue"
    //         ], resolve),
    //     meta: {}
    // },
    // {
    //     path: "/financial-efd-detail",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/financial/efd/model/detail.vue"
    //         ], resolve),
    //     meta: {}
    // },
    // {
    //     path: "/financial-efe-list",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/financial/efe/index.vue"
    //         ], resolve),
    //     meta: { title: "07版利润分配表", keepAlive: true }
    // },
    // {
    //     path: "/financial-efe-edit",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/financial/efe/model/edit.vue"
    //         ], resolve),
    //     meta: {}
    // },
    // {
    //     path: "/financial-efe-detail",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/financial/efe/model/detail.vue"
    //         ], resolve),
    //     meta: {}
    // },
    // {
    //     path: "/financial-eff-list",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/financial/eff/index.vue"
    //         ], resolve),
    //     meta: { title: "07版现金流量表", keepAlive: true }
    // },
    // {
    //     path: "/financial-eff-edit",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/financial/eff/model/edit.vue"
    //         ], resolve),
    //     meta: {}
    // },
    // {
    //     path: "/financial-eff-detail",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/financial/eff/model/detail.vue"
    //         ], resolve),
    //     meta: {}
    // },
    // {
    //     path: "/financial-efg-list",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/financial/efg/index.vue"
    //         ], resolve),
    //     meta: { title: "02版现金流量表", keepAlive: true }
    // },
    // {
    //     path: "/financial-efg-edit",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/financial/efg/model/edit.vue"
    //         ], resolve),
    //     meta: {}
    // },
    // {
    //     path: "/financial-efg-detail",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/financial/efg/model/detail.vue"
    //         ], resolve),
    //     meta: {}
    // },
    // {
    //     path: "/financial-efh-list",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/financial/efh/index.vue"
    //         ], resolve),
    //     meta: { title: "事业单位资产负债表", keepAlive: true }
    // },
    // {
    //     path: "/financial-efh-edit",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/financial/efh/model/edit.vue"
    //         ], resolve),
    //     meta: {}
    // },
    // {
    //     path: "/financial-efh-detail",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/financial/efh/model/detail.vue"
    //         ], resolve),
    //     meta: {}
    // },
    // {
    //     path: "/financial-efi-list",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/financial/efi/index.vue"
    //         ], resolve),
    //     meta: { title: "事业单位收入支出表", keepAlive: true }
    // },
    // {
    //     path: "/financial-efi-edit",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/financial/efi/model/edit.vue"
    //         ], resolve),
    //     meta: {}
    // },
    // {
    //     path: "/financial-efi-detail",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/financial/efi/model/detail.vue"
    //         ], resolve),
    //     meta: {}
    // },
    // {
    //     path: "/idcagsinf",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/idcagsinf/index.vue"
    //         ], resolve),
    //     meta: { title: "标识变更" }
    // },
    // {
    //     path: "/bothCheck",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/bothCheck/index.vue"
    //         ], resolve),
    //     meta: { title: "两端数据核对" }
    // },
    // {
    //     path: "/customize-getParamList",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/reportStatistics/customReport/index.vue"
    //         ], resolve),
    //     meta: { title: "自定义报表" }
    // },
    // {
    //     path: "/businessVolume-list",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/reportStatistics/businessVolume/index.vue"
    //         ], resolve),
    //     meta: { title: "未结清数据业务量统计" }
    // },
    // {
    //     path: "/msgForm-list",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/reportStatistics/msgForm/index.vue"
    //         ], resolve),
    //     meta: { title: "数据报送情况统计" }
    // },
    // {
    //     path: "/err-getpagenoorg",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/reportStatistics/errNoOrg/index.vue"
    //         ], resolve),
    //     meta: { title: "数据错误信息统计" }
    // },
    // {
    //     path: "/err-getpagehasorg",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/reportStatistics/errHasOrg/index.vue"
    //         ], resolve),
    //     meta: { title: "分机构数据错误信息统计" }
    // },
    // {
    //     path: "/amom-list",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/amom/index.vue"
    //         ], resolve),
    //     meta: { title: "机构管理" }
    // },
    {
        path: "/approval-approvalTab",
        component: resolve =>
            require([
                "@/modules/ers/components/view/approval/index.vue"
            ], resolve),
        meta: { title: "企评待审批数据记录" }
    },
    {
        path: "/approval-approvalHistoryTab",
        component: resolve =>
            require([
                "@/modules/ers/components/view/approval/approvalHistory.vue"
            ], resolve),
        meta: { title: "企评已审批数据记录查询" }
    },
    // {
    //     path: "/entInform-list",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/entInform/index.vue"
    //         ], resolve),
    //     meta: { title: "批处理通知" }
    // },
    {
        path: "/interFaceFileImport-list",
        component: resolve =>
            require([
                "@/modules/ers/components/view/interFaceFileImport/index.vue"
            ], resolve),
        meta: { title: "文件导入" }
    },
    // {
    //     path: "/creditUser-list",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/creditUser/index.vue"
    //         ], resolve),
    //     meta: { title: "企业征信用户配置列表" }
    // },
    {
        path: "/404",
        component: resolve => require(["@/common/components/404.vue"], resolve),
        meta: { title: "404" }
    },
    {
        path: "/403",
        component: resolve => require(["@/common/components/403.vue"], resolve),
        meta: { title: "403" }
    },
    {
        path: "/submit-submitList",
        component: resolve =>
            require([
                "@/modules/ers/components/view/messageManagement/submit/index.vue"
            ], resolve),
        meta: { title: "报文生成" }
    },
    {
        path: "/ebatch-embtBatchTab",
        component: resolve =>
            require([
                "@/modules/ers/components/view/messageManagement/ebatch-embtBatchTab/index.vue"
            ], resolve),
        meta: { title: "报文查询" }
    },
    {
        path: "/ebatch-embtBatchTab-detail",
        component: resolve =>
            require([
                "@/modules/ers/components/view/messageManagement/ebatch-embtBatchTab/model/detail.vue"
            ], resolve),
        meta: {}
    },
    {
        path: "/psgCheckError-list",
        component: resolve =>
            require([
                "@/modules/ers/components/view/messageManagement/psgCheckError/index.vue"
            ], resolve),
        meta: { title: "错误信息查看" }
    },
    {
        path: "/emieError-list",
        component: resolve =>
            require([
                "@/modules/ers/components/view/interfaceImport/emieError/index.vue"
            ], resolve),
        meta: { title: "接口导入错误" }
    },
    {
        path: "/interImport-list",
        component: resolve =>
            require([
                "@/modules/ers/components/view/interfaceImport/interImport/index.vue"
            ], resolve),
        meta: { title: "接口数据导入" }
    },
    {
        path: "/authorize-authorizeTab",
        component: resolve =>
            require([
                "@/modules/ers/components/view/authorize/index.vue"
            ], resolve),
        meta: { title: "授权档案管理" }
    },
    {
        path: "/interImport-detail",
        component: resolve =>
            require([
                "@/modules/ers/components/view/interfaceImport/interImport/model/detail.vue"
            ], resolve),
        meta: {}
    },
    {
        path: "/econfig-entConficTab",
        component: resolve =>
            require([
                "@/modules/ers/components/view/entConfig/index.vue"
            ], resolve),
        meta: { title: "参数管理" }
    },
    {
        path: "/erj-rateTab",
        component: resolve =>
            require([
                "@/modules/ers/components/view/creditAssets/index.vue"
            ], resolve),
        meta: { title: "企业信贷资产", keepAlive: true }
    },
    {
        path: "/erj-rateTab-edit",
        component: resolve =>
            require([
                "@/modules/ers/components/view/creditAssets/model/edit.vue"
            ], resolve),
        meta: { icon: "jiedaijiaoyi" }
    },
    {
        path: "/erj-rateTab-detail",
        component: resolve =>
            require([
                "@/modules/ers/components/view/creditAssets/model/detail.vue"
            ], resolve),
        meta: {}
    },
    {
        path: "/era-rateTab",
        component: resolve =>
            require([
                "@/modules/ers/components/view/ratingInfo/index.vue"
            ], resolve),
        meta: { title: "企业评级信息" }
    },
    {
        path: "/era-rateTab-edit",
        component: resolve =>
            require([
                "@/modules/ers/components/view/ratingInfo/model/edit.vue"
            ], resolve),
        meta: { icon: "jibenxinxi" }
    },
    {
        path: "/era-rateTab-detail",
        component: resolve =>
            require([
                "@/modules/ers/components/view/ratingInfo/model/detail.vue"
            ], resolve),
        meta: {}
    },
    {
        path: "/erg-edit",
        component: resolve =>
            require([
                "@/modules/ers/components/view/ratingInfo/model/erg/edit.vue"
            ], resolve),
        meta: { icon: "jibenxinxi" }
    },
    {
        path: "/erg-detail",
        component: resolve =>
            require([
                "@/modules/ers/components/view/ratingInfo/model/erg/detail.vue"
            ], resolve),
        meta: {}
    },
    {
        path: "/erh-edit",
        component: resolve =>
            require([
                "@/modules/ers/components/view/ratingInfo/model/erh/edit.vue"
            ], resolve),
        meta: { keepAlive: true }
    },
    {
        path: "/erh-detail",
        component: resolve =>
            require([
                "@/modules/ers/components/view/ratingInfo/model/erh/detail.vue"
            ], resolve),
        meta: { keepAlive: true }
    },
    {
        path: "/eri-edit",
        component: resolve =>
            require([
                "@/modules/ers/components/view/ratingInfo/model/eri/edit.vue"
            ], resolve),
        meta: { keepAlive: true }
    },
    {
        path: "/eri-detail",
        component: resolve =>
            require([
                "@/modules/ers/components/view/ratingInfo/model/eri/detail.vue"
            ], resolve),
        meta: { keepAlive: true }
    },
    {
        path: "/interceptA",
        component: resolve =>
            require([
                "@/modules/ers/components/view/interceptA/index.vue"
            ], resolve),
        meta: { title: "信贷上报拦截" }
    },
    {
        path: "/interceptR",
        component: resolve =>
            require([
                "@/modules/ers/components/view/interceptR/index.vue"
            ], resolve),
        meta: { title: "评级上报拦截" }
    },
    {
        path: "/rptWhiteListA",
        component: resolve =>
            require([
                "@/modules/ers/components/view/rptWhiteListA/index.vue"
            ], resolve),
        meta: { title: "信贷上报白名单" }
    },
    {
        path: "/rptWhiteListR",
        component: resolve =>
            require([
                "@/modules/ers/components/view/rptWhiteListR/index.vue"
            ], resolve),
        meta: { title: "评级上报白名单" }
    },
    {
        path: "/rateImportApp-list",
        component: resolve =>
            require([
                "@/modules/ers/components/view/rateImportApp/index.vue"
            ], resolve),
        meta: { title: "央评中心文件导入" }
    },
    {
        path: "/rateImportPrepare-list",
        component: resolve =>
            require([
                "@/modules/ers/components/view/rateImportPrepare/index.vue"
            ], resolve),
        meta: { title: "评级准备信息" }
    },
    {
        path: "/rateImportProcess-list",
        component: resolve =>
            require([
                "@/modules/ers/components/view/rateImportProcess/index.vue"
            ], resolve),
        meta: { title: "评级进程查看信息" }
    },
    {
        path: "/rateImportAsset-list",
        component: resolve =>
            require([
                "@/modules/ers/components/view/rateImportAsset/index.vue"
            ], resolve),
        meta: { title: "信贷资产管理资产清单" }
    }
];
let allRouter = asyncRoutes.concat(errorRoutes);
export const constantRoutes = [
    {
        path: "/",
        redirect: "/platform"
    },
    {
        path: "/",
        component: resolve =>
            require(["@/modules/ers/components/common/index.vue"], resolve),
        meta: { title: "首页" },
        children: allRouter
    },
    {
        path: "/login",
        component: resolve =>
            require(["@/modules/platform/components/common/login.vue"], resolve)
    },
    {
        path: "/notice",
        component: resolve =>
            require([
                "@/modules/platform/components/common/notice.vue"
            ], resolve)
    },
    {
        path: "/homePage",
        component: resolve =>
            require([
                "@/modules/platform/components/common/homePage.vue"
            ], resolve)
    },
    {
        path: "/checkFingerprint",
        component: resolve =>
            require([
                "@/modules/platform/components/common/checkFingerprint.vue"
            ], resolve)
    },
    {
        path: "/changePwd",
        component: resolve =>
            require([
                "@/modules/platform/components/common/changePwd.vue"
            ], resolve)
    },
    {
        path: "/userInfoDetail",
        component: resolve =>
            require([
                "@/modules/platform/components/common/userInfoDetail.vue"
            ], resolve)
    }
];
const createRouter = () =>
    new Router({
        // mode: 'history', // require service support
        scrollBehavior: () => ({ y: 0 }),
        routes: constantRoutes
    });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;
