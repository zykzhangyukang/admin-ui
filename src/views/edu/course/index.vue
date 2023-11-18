<template>
    <a-layout class='course-container'>
        <a-card>
            <div :style="{'textAlign':'right'}">
                <a-button type="primary" @click="handleAdd" v-permission="'edu:course:add'">
                    <PlusOutlined/>
                    创建课程
                </a-button>
            </div>
            <a-form
                    :style="{'marginBottom':'10px'}"
                    layout='inline'
            >
                <a-form-item label="课程名称" name='courseName'>
                    <a-input v-model:value="searchParams.courseName" :style="{width:'180px'}" placeholder="课程名称输入框"
                             autocomplete="off"></a-input>
                </a-form-item>
                <a-form-item label="课程分类">
                    <a-tree-select
                            :style="{width:'200px'}"
                            placeholder="请选择课程分类"
                            v-model:value="searchParams.catalogIdList"
                            :tree-data="catalogData"
                            :replaceFields="replaceFields"
                            tree-checkable
                            :maxTagCount="1"
                            search-placeholder="请选择课程分类"
                    />
                </a-form-item>
                <a-form-item label="创建人" name='creatorName'>
                    <a-input v-model:value="searchParams.creatorName" :style="{width:'180px'}" placeholder="创建人输入框"
                             autocomplete="off"></a-input>
                </a-form-item>
                <a-form-item label="用户状态">
                    <a-select v-model:value="searchParams.status" :style="{width:'180px'}" placeholder="课程状态">
                        <a-select-option v-for="item in courseStatusG" :value="item.code" :key="item.code">
                            {{courseStatusGName[item.code]}}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" @click="pageSearchChange" v-permission="'edu:course:page'"><template #icon><SearchOutlined /></template>搜索</a-button>
                </a-form-item>
                <a-form-item>
                    <a-button type="default" @click="pageSearchReset">重置</a-button>
                </a-form-item>
                <a-form-item v-permission="'edu:course:updateStatus'">
                    <a-dropdown>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item key="1" @click="handleUpdateStatus('enable')">
                                    更新上架
                                </a-menu-item>
                                <a-menu-item key="2" @click="handleUpdateStatus('disable')">
                                    更新下架
                                </a-menu-item>
                            </a-menu>
                        </template>
                        <a-button :loading="btnLoading">
                            状态更新
                            <DownOutlined/>
                        </a-button>
                    </a-dropdown>
                </a-form-item>
            </a-form>

            <HTable
                    :pagination='false'
                    :loading='tableLoading'
                    rowKey='courseId'
                    bordered
                    :columns='tableColumns'
                    :expandRowByClick="true"
                    :data-source='tableData'
                    :rowSelection="{ selectedRowKeys: selectedRowKeysArray, onChange: onSelectChange, type: 'radio' }"
            >
                <template #status="{ text }">
                    <span v-if="text==='enable'" style="color: #19be6b">
                         {{ courseStatusGName[text] }}
                    </span>
                    <span v-else-if="text==='disable'" style="color: #ed4014">
                         {{ courseStatusGName[text] }}
                    </span>
                    <span v-else style="color: #303030">{{courseStatusGName[text]}}</span>
                </template>
                <template #description="{ text }">
                    <span> {{ text }}</span>
                </template>
                <template #action="{ record }">
                    <div class="action-btns">
                        <a class="btn-text-mini" href="javascript:;" @click="handleToChapter(record.courseId)">
                            <FolderOutlined/>
                            课程章节</a>
                    </div>
                </template>
            </HTable>
            <HPage
                    :current="searchParams.currentPage"
                    :page-size="searchParams.pageSize"
                    :total="total"
                    @current-change="pageCurrentChange"
                    @size-change="pageSizeChange"/>

        </a-card>
    </a-layout>
</template>

<script>
    import HPage from "@/components/pagination/HPage";
    import HTable from "@/components/table/HTable";
    import {eduCatalogTree, eduCoursePage, eduCourseUpdateStatus} from "@/api/edu";
    import {adminDomain, formatConst, getConst} from "@/utils/constant";

    export default {
        name: "course.vue",
        components: {
            HPage,
            HTable
        },
        data() {
            return {
                toolbarFixed: true,
                btnLoading: false,
                catalogData: [],
                replaceFields: {children:'children', title:'catalogName', key:'catalogId', value: 'catalogId' },
                selectedRowKeysArray: [],
                selectedRows: [],
                searchParams: {
                    currentPage: 1,
                    pageSize: 20,
                    courseName: '',
                    status: '',
                    creatorName: '',
                    catalogIdList: [],
                },
                total: 0,
                tableData: [],
                tableLoading: true,
                tableColumns: [
                    {
                        title: '课程名称',
                        dataIndex: 'courseName',
                        key: 'courseName',
                        align: 'center',
                        ellipsis: true,
                    },
                    {
                        title: '课程描述',
                        dataIndex: 'description',
                        key: 'description',
                        ellipsis: true,
                        align: 'center',
                        slots: {customRender: 'description'},
                    },
                    {
                        title: '课程状态',
                        dataIndex: 'status',
                        key: 'status',
                        align: 'center',
                        slots: {customRender: 'status'},
                    },
                    {
                        title: '创建人',
                        dataIndex: 'creatorName',
                        key: 'creatorName',
                        align: 'center',
                    },
                    {
                        title: '创建时间',
                        dataIndex: 'createTime',
                        align: 'center',
                        key: 'createTime',
                    },
                    {
                        title: '更新时间',
                        dataIndex: 'updateTime',
                        align: 'center',
                        key: 'updateTime',
                    },
                    {
                        title: '操作',
                        align: 'center',
                        key: 'action',
                        width: '200px',
                        slots: {customRender: 'action'},
                    },
                ],
            }
        },
        computed: {
            courseStatusG() {
                return getConst("course_status_group", adminDomain)
            },
            courseStatusGName() {
                return formatConst(this.courseStatusG);
            }
        },
        methods: {
            onSelectChange(selectedRowKeys, selectedRows) {
                this.selectedRowKeysArray = selectedRowKeys;
                this.selectedRows = selectedRows;
            },
            handleToChapter(courseId) {
                this.$router.push({path: '/edu/chapter', query: {courseId}})
            },
            handleAdd() {
                this.$router.push({name: 'EduCreateCourse'});
            },
            handleUpdateStatus(status) {
                if (!this.selectedRowKeysArray[0]) {
                    return this.$message.warn("请选择记录后操作！");
                }
                const id = this.selectedRowKeysArray[0];
                const params = {courseId: id, status: status};
                this.btnLoading = true;
                eduCourseUpdateStatus(params).then(res => {
                    this.$message.success("更新状态成功！");
                    this.selectedRowKeysArray = [];
                    this.selectedRows = [];
                    this.queryData();
                }).finally(() => {
                    this.btnLoading = false;
                })
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
                this.selectedRowKeysArray = [];
                this.selectedRows = []
            },
            pageCurrentChange(page, pageSize) {
                this.searchParams.currentPage = page;
                this.searchParams.pageSize = pageSize;
                this.queryData()
            },
            pageSizeChange(current, size) {
                this.searchParams.pageSize = size
                this.queryData()
            },
            async queryData() {
                try {
                    this.tableLoading = true
                    const res = await eduCoursePage(this.searchParams)
                    const {totalRow, dataList} = res.result
                    this.total = totalRow
                    this.tableData = dataList
                } finally {
                    this.tableLoading = false
                }
            },
            getCatalogTree() {
                eduCatalogTree().then(res => {
                    this.catalogData = res.result;
                })
            }
        },
        created() {
            this.queryData();
            this.getCatalogTree()
        }
    }
</script>


<style scoped>
    .action-btns {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px;
    }
</style>