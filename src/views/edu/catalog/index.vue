<template>
    <a-layout class='catalog-container'>
        <a-card>
            <div :style="{'textAlign':'right','marginBottom': '15px'}">
                <a-button type="primary" @click="handleAdd" v-permission="'edu:course:add'"><PlusOutlined /> 新增分类</a-button>
                <a-button type="info" class="ml15" @click="this.queryData" > <ReloadOutlined /> 列表刷新</a-button>
            </div>


            <HTable
                    :pagination='false'
                    :loading='tableLoading'
                    rowKey='catalogId'
                    :columns='tableColumns'
                    :expandRowByClick="true"
                    :data-source='tableData'
            >
                <template #catalogName="{ record }">
                 <span>
                       <img v-if="(record.children && record.children.length > 0) || record.parentId === 0"  :src="require('@/assets/images/folder.svg')" class="tree-icon" >
                       <img v-else :src="require('@/assets/images/func.svg')" class="tree-icon" >
                       <span class="ml15"> {{record.catalogName}}</span>
                 </span>
                </template>
            </HTable>

        </a-card>
    </a-layout>
</template>

<script>
    import HTable from "@/components/table/HTable";
    import {eduCatalogTree} from "@/api/edu";
    export default {
        name: "catalog.vue",
        components: {
            HTable
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
        methods:{
            handleAdd() {
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