<template>
    <a-layout class='log-container'>
        <a-card>
            <a-form
                    :style="{'marginBottom':'10px'}"
                    layout='inline'
            >
                <a-form-item label="日志模块" >
                    <a-select v-model:value="searchParams.logModule" :style="{width:'180px'}" placeholder="业务模块">
                        <a-select-option v-for="item in logModuleG" :value="item.code" :key="item.code">{{logModuleGName[item.code]}}</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="日志等级" >
                    <a-select v-model:value="searchParams.logLevel" :style="{width:'180px'}" placeholder="日志等级">
                        <a-select-option v-for="item in logLevelG" :value="item.code" :key="item.code">{{logLevelGName[item.code]}}</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="操作人" name='username'>
                    <a-input v-model:value="searchParams.username" :style="{width:'180px'}" placeholder="操作人输入框"  autocomplete="off" ></a-input>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" @click="pageSearchChange" v-permission="'auth:log:page'">搜索</a-button>
                </a-form-item>
                <a-form-item>
                    <a-button type="default" @click="pageSearchReset">重置</a-button>
                </a-form-item>
            </a-form>

            <HTable
                    :pagination='false'
                    :loading='tableLoading'
                    bordered
                    rowKey='logId'
                    :columns='tableColumns'
                    :data-source='tableData'
            >
                <template #logModule="{ text }">
                    {{ logModuleGName[text] }}
                </template>
                <template #logLevel="{ text }">
                    {{ logLevelGName[text] }}
                </template>
            </HTable>
            <HPage
                    :current="searchParams.currentPage"
                    :page-size="searchParams.pageSize"
                    :total="total"
                    @change="pageCurrentChange"
                    @showSizeChange="pageSizeChange"/>
        </a-card>
    </a-layout>
</template>


<script>
    import {authLogPage} from "@/api/auth";
    import HTable from "@/components/table/HTable";
    import HPage from "@/components/pagination/HPage";
    import constant, {bizeduDomain} from "@/utils/constant";

    export default {
        name: "log.vue",
        components: {
            HTable,
            HPage
        },
        data() {
            return {
                toolbarFixed: true,
                searchParams: {
                    currentPage: 1,
                    pageSize: 20,
                    username: '',
                    logModule: '',
                    logLevel: ''
                },
                total: 0,
                tableData: [],
                tableLoading: true,
                tableColumns: [{
                    title: 'ID',
                    dataIndex: 'logId',
                    key: 'logId',
                },
                    {
                        title: '日志类型',
                        dataIndex: 'logModule',
                        key: 'logModule',
                        slots: { customRender: 'logModule' },
                    },
                    {
                        title: '日志等级',
                        dataIndex: 'logLevel',
                        key: 'logLevel',
                        slots: { customRender: 'logLevel' },
                    },
                    {
                        title: '日志信息',
                        dataIndex: 'logInfo',
                        key: 'roleDesc',
                    },
                    {
                        title: '创建时间',
                        dataIndex: 'createTime',
                        key: 'createTime',
                    },
                    {
                        title: '操作人账号',
                        dataIndex: 'username',
                        key: 'username',
                    },
                    {
                        title: '操作人姓名',
                        dataIndex: 'realName',
                        key: 'realName',
                    },
                ],
            }
        },
        computed:{
            logModuleG(){
                return constant.getConst("log_module_group",bizeduDomain)
            },
            logModuleGName(){
                return constant.formatConst(this.logModuleG)
            },
            logLevelG(){
                return constant.getConst("log_level_group",bizeduDomain)
            },
            logLevelGName(){
                return constant.formatConst(this.logLevelG)
            },
        },
        methods:{
            pageSearchChange() {
                this.searchParams.currentPage = 1
                this.queryData()
            },
            pageSearchReset() {
                const page = {
                    currentPage: this.searchParams.currentPage,
                    pageSize: this.searchParams.pageSize
                }
                this.searchParams = {
                    ...this.$options.data().searchParams,
                    ...page
                }
            },
            pageCurrentChange(page, pageSize) {
                this.searchParams.currentPage = page;
                this.searchParams.pageSize = pageSize;
                this.queryData()
            },
            pageSizeChange(current, size){
                this.searchParams.pageSize = size
                this.queryData()
            },
            async queryData() {
                try {
                    this.tableLoading = true
                    const res = await authLogPage(this.searchParams)
                    const { totalRow, dataList } = res.result
                    this.total = totalRow
                    this.tableData = dataList
                } finally {
                    this.tableLoading = false
                }
            },
        },
        created() {
            this.pageSearchChange();
        }
    }
</script>

<style scoped>

</style>