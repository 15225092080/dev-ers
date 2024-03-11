const errorRoutes = [
    // {
    //     path: "/error-eeb-edit",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/transactionInfo/eeb-creditinfoTab/model/edit.vue"
    //         ], resolve),
    //     meta: { title: "错误信息", offsideStatus: "false" }
    // },
    // {
    //     path: "/error-eeb-detail",
    //     component: resolve =>
    //         require([
    //             "@/modules/ers/components/view/transactionInfo/eeb-creditinfoTab/model/detail.vue"
    //         ], resolve),
    //     meta: { title: "错误信息", offsideStatus: "false" }
    // },
    {
        path: "/error-elb-edit",
        component: resolve =>
            require([
                "@/modules/ers/components/view/transactionInfo/elb-loanTab/model/edit.vue"
            ], resolve),
        meta: { title: "错误信息", offsideStatus: "false" }
    },
    {
        path: "/error-elb-detail",
        component: resolve =>
            require([
                "@/modules/ers/components/view/transactionInfo/elb-loanTab/model/detail.vue"
            ], resolve),
        meta: { title: "错误信息", offsideStatus: "false" }
    },
    {
        path: "/error-egb-edit",
        component: resolve =>
            require([
                "@/modules/ers/components/view/transactionInfo/egb-guaranteeTab/model/edit.vue"
            ], resolve),
        meta: { title: "错误信息", offsideStatus: "false" }
    },
    {
        path: "/error-egb-detail",
        component: resolve =>
            require([
                "@/modules/ers/components/view/transactionInfo/egb-guaranteeTab/model/detail.vue"
            ], resolve),
        meta: { title: "错误信息", offsideStatus: "false" }
    },
    {
        path: "/error-epb-edit",
        component: resolve =>
            require([
                "@/modules/ers/components/view/transactionInfo/epb-mortgageTab/model/edit.vue"
            ], resolve),
        meta: { title: "错误信息", offsideStatus: "false" }
    },
    {
        path: "/error-epb-detail",
        component: resolve =>
            require([
                "@/modules/ers/components/view/transactionInfo/epb-mortgageTab/model/detail.vue"
            ], resolve),
        meta: { title: "错误信息", offsideStatus: "false" }
    },
    {
        path: "/error-ecb-detail",
        component: resolve =>
            require([
                "@/modules/ers/components/view/clientInfo/ecb-list/error/detail.vue"
            ], resolve),
        meta: { title: "错误信息", offsideStatus: "false" }
    },
    {
        path: "/error-ecb-edit",
        component: resolve =>
            require([
                "@/modules/ers/components/view/clientInfo/ecb-list/error/edit.vue"
            ], resolve),
        meta: { title: "错误信息", offsideStatus: "false" }
    },
    {
        path: "/error-ecc-detail",
        component: resolve =>
            require([
                "@/modules/ers/components/view/clientInfo/ecc-list/error/detail.vue"
            ], resolve),
        meta: { title: "错误信息", offsideStatus: "false" }
    },
    {
        path: "/error-ecc-edit",
        component: resolve =>
            require([
                "@/modules/ers/components/view/clientInfo/ecc-list/error/edit.vue"
            ], resolve),
        meta: { title: "错误信息", offsideStatus: "false" }
    },
    {
        path: "/error-efb-edit",
        component: resolve =>
            require([
                "@/modules/ers/components/view/financial/efb/model/edit.vue"
            ], resolve),
        meta: { title: "错误信息", offsideStatus: "false" }
    },
    {
        path: "/error-efb-detail",
        component: resolve =>
            require([
                "@/modules/ers/components/view/financial/efb/model/detail.vue"
            ], resolve),
        meta: { title: "错误信息", offsideStatus: "false" }
    },
    {
        path: "/error-efc-edit",
        component: resolve =>
            require([
                "@/modules/ers/components/view/financial/efc/model/edit.vue"
            ], resolve),
        meta: { title: "错误信息", offsideStatus: "false" }
    },
    {
        path: "/error-efc-detail",
        component: resolve =>
            require([
                "@/modules/ers/components/view/financial/efc/model/detail.vue"
            ], resolve),
        meta: { title: "错误信息", offsideStatus: "false" }
    },
    {
        path: "/error-efd-edit",
        component: resolve =>
            require([
                "@/modules/ers/components/view/financial/efd/model/edit.vue"
            ], resolve),
        meta: { title: "错误信息", offsideStatus: "false" }
    },
    {
        path: "/error-efd-detail",
        component: resolve =>
            require([
                "@/modules/ers/components/view/financial/efd/model/detail.vue"
            ], resolve),
        meta: { title: "错误信息", offsideStatus: "false" }
    },
    {
        path: "/error-efe-edit",
        component: resolve =>
            require([
                "@/modules/ers/components/view/financial/efe/model/edit.vue"
            ], resolve),
        meta: { title: "错误信息", offsideStatus: "false" }
    },
    {
        path: "/error-efe-detail",
        component: resolve =>
            require([
                "@/modules/ers/components/view/financial/efe/model/detail.vue"
            ], resolve),
        meta: { title: "错误信息", offsideStatus: "false" }
    },
    {
        path: "/error-eff-edit",
        component: resolve =>
            require([
                "@/modules/ers/components/view/financial/eff/model/edit.vue"
            ], resolve),
        meta: { title: "错误信息", offsideStatus: "false" }
    },
    {
        path: "/error-eff-detail",
        component: resolve =>
            require([
                "@/modules/ers/components/view/financial/eff/model/detail.vue"
            ], resolve),
        meta: { title: "错误信息", offsideStatus: "false" }
    },
    {
        path: "/error-efg-edit",
        component: resolve =>
            require([
                "@/modules/ers/components/view/financial/efg/model/edit.vue"
            ], resolve),
        meta: { title: "错误信息", offsideStatus: "false" }
    },
    {
        path: "/error-efg-detail",
        component: resolve =>
            require([
                "@/modules/ers/components/view/financial/efg/model/detail.vue"
            ], resolve),
        meta: { title: "错误信息", offsideStatus: "false" }
    },
    {
        path: "/error-efh-edit",
        component: resolve =>
            require([
                "@/modules/ers/components/view/financial/efh/model/edit.vue"
            ], resolve),
        meta: { title: "错误信息", offsideStatus: "false" }
    },
    {
        path: "/error-efh-detail",
        component: resolve =>
            require([
                "@/modules/ers/components/view/financial/efh/model/detail.vue"
            ], resolve),
        meta: { title: "错误信息", offsideStatus: "false" }
    },
    {
        path: "/error-efi-edit",
        component: resolve =>
            require([
                "@/modules/ers/components/view/financial/efi/model/edit.vue"
            ], resolve),
        meta: { title: "错误信息", offsideStatus: "false" }
    },
    {
        path: "/error-efi-detail",
        component: resolve =>
            require([
                "@/modules/ers/components/view/financial/efi/model/detail.vue"
            ], resolve),
        meta: { title: "错误信息", offsideStatus: "false" }
    }
];
export default errorRoutes;
