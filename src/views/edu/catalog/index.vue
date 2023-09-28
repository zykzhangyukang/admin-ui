<template>
    <a-layout class='catalog-container'>
        <a-card>
            <div :style="{'textAlign':'right','marginBottom': '15px'}">
                <a-button type="info" class="ml15" @click="this.queryData" > <ReloadOutlined /> 列表刷新</a-button>
                <a-button type="info" class="ml15" @click="pageSearchReset">取消勾选</a-button>
                <a-button type="info" class="ml15" @click="handleDelete" v-permission="'edu:catalog:delete'">删除分类</a-button>
                <a-button type="primary"  class="ml15"  @click="handleAdd" v-permission="'edu:catalog:add'"><PlusOutlined /> 新增分类</a-button>
            </div>
            <HTable
                    :pagination='false'
                    :loading='tableLoading'
                    rowKey='catalogId'
                    :columns='tableColumns'
                    :expandRowByClick="true"
                    :data-source='tableData'
                    :rowSelection="{ selectedRowKeys: selectedRowKeysArray, onChange: onSelectChange, type: 'radio' }"
            >
                <template #catalogName="{ record }">
                 <span style="cursor: pointer">
                       <img v-if="(record.children && record.children.length > 0) || record.parentId === 0"  :src="require('@/assets/images/folder.svg')" class="tree-icon" >
                       <img v-else :src="require('@/assets/images/func.svg')" class="tree-icon" >
                       <span class="ml15"> {{record.catalogName}}</span>
                 </span>
                </template>
            </HTable>
            <catalog-save-modal ref="catalogSaveModal" @success="queryData"></catalog-save-modal>
        </a-card>
    </a-layout>
</template>

<script>
    import HTable from "@/components/table/HTable";
    import {eduCatalogDelete, eduCatalogTree} from "@/api/edu";
    import CatalogSaveModal from "@/views/edu/catalog/CatalogSaveModal";
    import {Modal} from "ant-design-vue";

    export default {
        name: "catalog.vue",
        components: {
            HTable,
            CatalogSaveModal
        },
        data() {
            return {
                selectedRowKeysArray: [],
                selectedRows: [],
                tableData: [],
                tableLoading: true,
                tableColumns: [
                    {
                        title: '课程分类',
                        dataIndex: 'catalogName',
                        key: 'catalogName',
                        ellipsis:  true,
                        slots: { customRender: 'catalogName' },
                    },
                    {
                        title: '创建时间',
                        dataIndex: 'createTime',
                        key: 'createTime',
                        ellipsis:  true,
                    },
                    {
                        title: '更新时间',
                        dataIndex: 'updateTime',
                        key: 'updateTime',
                    },
                ],
            }
        },
        computed:{
        },
        methods: {
            handleDelete() {
                if (!this.selectedRows || this.selectedRows.length === 0) {
                    return this.$message.warning("请勾选要删除掉的分类!");
                }
                let _this = this;
                Modal.confirm({
                    title: '删除课程分类',
                    content: '您确定删除该课程分类吗？',
                    okText: '确认',
                    cancelText: '取消',
                    onOk() {
                        eduCatalogDelete(_this.selectedRows[0].catalogId).then(res => {
                            _this.$message.success("删除分类成功！");
                            _this.queryData();
                        })
                    },
                });
            },
            pageSearchReset() {
                this.selectedRowKeysArray = [];
                this.selectedRows = []
            },
            onSelectChange(selectedRowKeys, selectedRows) {
                this.selectedRowKeysArray = selectedRowKeys;
                this.selectedRows = selectedRows;
            },
            handleAdd() {
                this.$refs['catalogSaveModal'].open(this.selectedRows);
            },
            async queryData() {
                try {
                    this.tableLoading = true
                    const res = await eduCatalogTree()
                    this.tableData = res.result;
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
    .action-btns {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px;
    }
    .tree-icon{
        width: 15px;
        height: 15px;
        user-select: none;
        -webkit-user-drag: none;
        margin-left: 20px;
    }
</style>