<template>
    <a-layout class='course-container'>
        <a-card>
            <div :style="{'textAlign':'right'}">
                <a-button type="primary" @click="handleAdd" v-permission="'edu:course:page'">创建课程</a-button>
            </div>
            <a-form
                    :style="{'marginBottom':'10px'}"
                    layout='inline'
            >
                <a-form-item label="课程名称" name='courseName'>
                    <a-input v-model:value="searchParams.courseName" :style="{width:'180px'}" placeholder="课程名称输入框"  autocomplete="off" ></a-input>
                </a-form-item>
                <a-form-item label="用户状态">
                    <a-select v-model:value="searchParams.status" :style="{width:'180px'}" placeholder="课程状态">
                        <a-select-option v-for="item in courseStatusG" :value="item.code" :key="item.code">{{courseStatusGName[item.code]}}</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" @click="pageSearchChange" v-permission="'auth:role:page'">搜索</a-button>
                </a-form-item>
                <a-form-item>
                    <a-button type="default" @click="pageSearchReset">重置</a-button>
                </a-form-item>
            </a-form>

            <HTable
                    :pagination='false'
                    :loading='tableLoading'
                    bordered
                    rowKey='courseId'
                    :columns='tableColumns'
                    :data-source='tableData'
            >
                <template #status="{ text }">
                    <a-tag :color="text==='enable' ? 'green' : 'red'">
                        {{ courseStatusGName[text] }}
                    </a-tag>
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
    import HPage from "@/components/pagination/HPage";
    import HTable from "@/components/table/HTable";
    import {eduCoursePage} from "@/api/edu";
    import {bizeduDomain, formatConst, getConst} from "@/utils/constant";

    export default {
        name: "course.vue",
        components: {
            HPage,
            HTable
        },
        data() {
            return {
                toolbarFixed: true,
                searchParams: {
                    currentPage: 1,
                    pageSize: 20,
                    courseName: '',
                    status: ''
                },
                total: 0,
                tableData: [],
                tableLoading: true,
                tableColumns: [{
                    title: 'ID',
                    dataIndex: 'courseId',
                    key: 'courseId',
                },
                    {
                        title: '课程名称',
                        dataIndex: 'courseName',
                        key: 'courseName',
                        ellipsis:  true,
                    },
                    {
                        title: '课程描述',
                        dataIndex: 'description',
                        key: 'description',
                        ellipsis:  true,
                    },
                    {
                        title: '创建时间',
                        dataIndex: 'createTime',
                        key: 'createTime',
                    },
                    {
                        title: '课程状态',
                        dataIndex: 'status',
                        key: 'status',
                        slots: { customRender: 'status' },
                    },
                    {
                        title: '更新时间',
                        dataIndex: 'updateTime',
                        key: 'updateTime',
                    },
                    {
                        title: '创建人',
                        dataIndex: 'creatorName',
                        key: 'creatorName',
                    }
                ],
            }
        },
        computed:{
            courseStatusG(){
                return getConst("course_status_group", bizeduDomain)
            },
            courseStatusGName(){
                return formatConst(this.courseStatusG);
            }
        },
        methods:{
            handleUpdate(id){
                this.$refs['roleUpdateModal'].open(id);
            },
            handleAdd(){
                this.$router.push('/edu/course/create');
            },
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
                    const res = await eduCoursePage(this.searchParams)
                    const { totalRow, dataList } = res.result
                    this.total = totalRow
                    this.tableData = dataList
                } finally {
                    this.tableLoading = false
                }
            },
        },
        created() {
            this.queryData();
        }
    }
</script>


<style scoped>

</style>