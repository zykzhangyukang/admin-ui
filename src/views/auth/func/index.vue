<template>
    <a-layout>
            <a-row :gutter="10">
                <a-col :span="4">
                    <div class="left">
                        <func-left-tree ref="funcLeftTree" @select-node="handleSelectNode"></func-left-tree>
                    </div>
                </a-col>
                <a-col :span="20">
                    <a-card>
                        <a-form
                                :style="{'marginBottom':'10px'}"
                                layout='inline'
                        >
                            <a-form-item label="功能名称">
                                <a-input v-model:value="searchParams.funcName" :style="{width:'180px'}" placeholder="功能名称输入框"  autocomplete="off" ></a-input>
                            </a-form-item>
                            <a-form-item label="资源URL">
                                <a-input v-model:value="searchParams.rescUrl" :style="{width:'180px'}" placeholder="资源URL输入框"  autocomplete="off" ></a-input>
                            </a-form-item>
                            <a-form-item label="功能Key">
                                <a-input v-model:value="searchParams.funcKey" :style="{width:'180px'}" placeholder="功能Key输入框"  autocomplete="off" ></a-input>
                            </a-form-item>
                            <a-form-item label="功能类型">
                                <a-select v-model:value="searchParams.funcType" :style="{width:'180px'}" placeholder="功能类型">
                                    <a-select-option v-for="item in funcTypeG" :value="item.code" :key="item.code">{{funcTypeGName[item.code]}}</a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item label="是否隐藏">
                                <a-select v-model:value="searchParams.funcDirStatus" :style="{width:'180px'}" placeholder="是否隐藏">
                                    <a-select-option v-for="item in funcDirStatusG" :value="item.code" :key="item.code">{{funcDirStatusGName[item.code]}}</a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item label="创建时间">
                                <a-range-picker
                                        style="width: 200px"
                                        v-model:value="timeList"
                                        :ranges="ranges"
                                        :allowClear="false"
                                        valueFormat="YYYY-MM-DD HH:mm:ss"
                                        format="YYYY-MM-DD HH:mm:ss"
                                        showTime
                                />
                            </a-form-item>
                            <a-form-item>
                                <a-button type="primary" @click="pageSearchChange" v-permission="'auth:func:page'"><template #icon><SearchOutlined /></template>搜索</a-button>
                            </a-form-item>
                            <a-form-item>
                                <a-button type="default" @click="pageSearchReset">重置</a-button>
                            </a-form-item>
                            <a-form-item>
                            <a-button @click="handleAdd" v-permission="'auth:func:add'">
                                新增功能
                            </a-button>
                            </a-form-item>
                        </a-form>
                        <HTable
                                bordered
                                rowKey='funcId'
                                :pagination='false'
                                :loading='tableLoading'
                                :columns='tableColumns'
                                :data-source='tableData'
                                @change="sortChange"
                        >
                            <template #funcIcon="{ text }">
                                <span v-if="text">
                                      <component class="icon" :is="this.$antIcons[text]"/>
                                </span>
                                <a v-else class="btn-text-small color303030">-</a>
                            </template>
                            <template #funcType="{ text }">
                                {{ funcTypeGName[text] }}
                            </template>
                            <template #funcKey="{ text }">
                               {{text}}
                            </template>
                            <template #rescVOList="{ record }">
                                   <span>
                                         <a v-if="record.rescVOList !==null && record.rescVOList.length >0" class="btn-text-small color_link" @click="handleLookResc(record.funcId)">
                                             {{record.rescVOList.map(item=>{return item.rescUrl}).join(",") }}
                                         </a>
                                        <a v-else class="btn-text-small color_link" @click="handleLookResc(record.funcId)">-</a>
                                    </span>
                            </template>
                            <template #action="{ record }">
                                <div class="action-btns">
                                    <!-- 常用按钮 -->
                                    <a  class="btn-text-mini" href="javascript:;" @click="handleUpdate(record.funcId)" v-permission="'auth:func:update'"><FormOutlined />编辑</a>
                                    <a  class="btn-text-mini" href="javascript:;"  @click="handleBindResc(record.funcId)" v-permission="'auth:func:rescUpdate'"><OrderedListOutlined /> 资源</a>
                                    <a-popconfirm
                                            title="您确定要删除该功能吗?"
                                            ok-text="确定"
                                            cancel-text="取消"
                                            @confirm="handleDelete(record.funcId)">
                                        <a class="btn-text-mini" href="javascript:;" v-permission="'auth:func:delete'"><DeleteOutlined/>删除</a>
                                    </a-popconfirm>
                                    <!-- 更多选项按钮 -->
                                    <a-dropdown :trigger="['click']">
                                        <a class="btn-text-mini" href="javascript:;">
                                            更多 <DownOutlined />
                                        </a>
                                        <template #overlay>
                                            <a-menu>
                                                <a-menu-item>
                                                    <a  class="btn-text-mini" href="javascript:;"  @click="handleDeleteResourceBind(record.funcId)" v-permission="'auth:func:rescRemove'"> <ClearOutlined /> 解绑资源</a>
                                                </a-menu-item>
                                                <a-menu-item>
                                                    <a  class="btn-text-mini" href="javascript:;"   @click="handleDeleteUserBind(record.funcId)" v-permission="'auth:func:userRemove'"><FileExcelOutlined />  解绑用户</a>
                                                </a-menu-item>
                                            </a-menu>
                                        </template>
                                    </a-dropdown>
                                </div>
                            </template>
                        </HTable>
                        <HPage
                                :current="searchParams.currentPage"
                                :page-size="searchParams.pageSize"
                                :total="total"
                                @current-change="pageCurrentChange"
                                @size-change="pageSizeChange">
                        </HPage>
                        <!-- 新增功能 -->
                        <func-save-modal ref="funcSaveModal" @success="queryData"></func-save-modal>
                        <!-- 更新功能 -->
                        <func-update-modal ref="funcUpdateModal" @success="queryData"></func-update-modal>
                        <!-- 绑定资源 -->
                        <func-bind-resc-modal ref="funcBindRescModal" @success="queryData"></func-bind-resc-modal>
                        <!-- 查看资源 -->
                        <func-resc-look-modal ref="funcRescLookModal"></func-resc-look-modal>
                    </a-card>
                </a-col>
            </a-row>
    </a-layout>
</template>
<script>
import {autFuncUserBindDelete, authFuncRescBindDelete, authFuncDelete, authFuncPage,} from "@/api/auth";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  FolderOpenOutlined,
  SettingOutlined,
  ToolOutlined
} from '@ant-design/icons-vue';
import constant, {adminDomain} from "@/utils/constant";
import funcLeftTree from "@/views/auth/func/FuncLeftTree";
import funcSaveModal from "@/views/auth/func/FuncSaveModal";
import funcUpdateModal from "@/views/auth/func/FuncUpdateModal";
import funcBindRescModal from "@/views/auth/func/FuncBindRescModal";
import funcRescLookModal from "@/views/auth/func/FuncRescLookModal";
import HPage from "@/components/pagination/HPage";
import HTable from "@/components/table/HTable";
import {Modal} from "ant-design-vue";
import {createVNode} from 'vue';
import moment from "moment";

export default {
        name: "Func.vue",
    components: {
        HPage,
        HTable,
        funcLeftTree,
        funcSaveModal,
        funcUpdateModal,
        funcBindRescModal,
        funcRescLookModal,
        FolderOpenOutlined,
        ToolOutlined,
        EditOutlined,
        DeleteOutlined,
        SettingOutlined
    },
        data(){
            return {
                timeList: [],
                ranges: {
                    "今天": [moment().startOf("day"), moment().endOf('day')],
                    "昨天": [moment().subtract(1, 'day').startOf("day"), moment().subtract(1, 'day').endOf('day')],
                    "近7天": [moment().subtract(7, 'day').startOf("day"), moment().endOf('day')],
                    "本月": [moment().startOf('month'), moment().endOf('month')]
                },
                toolbarFixed: true,
                searchParams: {
                    currentPage: 1,
                    pageSize: 20,
                    funcName: '',
                    funcKey: '',
                    funcType: '',
                    rescUrl:  '',
                    funcDirStatus: '',
                    sortType: '',
                    sortField: '',
                },
                parentFunc: {},
                total: 0,
                tableData: [],
                tableLoading: true,
                tableColumns: [{
                    title: 'ID',
                    dataIndex: 'funcId',
                    key: 'funcId',
                },
                    {
                        title: '功能名称',
                        dataIndex: 'funcName',
                        key: 'funcName',
                        align: 'center',
                        ellipsis: true,
                    },
                    {
                        title: '功能类型',
                        dataIndex: 'funcType',
                        key: 'funcType',
                        align: 'center',
                        slots: {customRender: 'funcType'},
                        sorter: true,
                    },
                    {
                        title: '功能Key',
                        dataIndex: 'funcKey',
                        key: 'funcKey',
                        ellipsis: true,
                        width: '180px',
                        slots: {customRender: 'funcKey'},
                        sorter: true,
                    },
                    {
                        title: '资源列表',
                        dataIndex: 'rescVOList',
                        key: 'rescVOList',
                        slots: {customRender: 'rescVOList'},
                        align: 'center',
                        width: '180px',
                        ellipsis: true,
                    },
                    {
                        title: '排序',
                        dataIndex: 'funcSort',
                        align: 'center',
                        key: 'funcSort',
                        sorter: true,
                    },
                    {
                        title: '菜单图标',
                        dataIndex: 'funcIcon',
                        align: 'center',
                        key: 'funcIcon',
                        slots: {customRender: 'funcIcon'},
                        ellipsis: true,
                    },
                    {
                        title: '创建时间',
                        dataIndex: 'createTime',
                        align: 'center',
                        key: 'createTime',
                        width: '150px',
                        ellipsis: true,
                        sorter: true,
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width: '200px',
                        slots: {customRender: 'action'},
                        fixed: 'right',
                    },
                ],
            }
        },
        computed:{
            funcTypeG(){
                return constant.getConst("func_type_group",adminDomain)
            },
            funcTypeGName(){
                return constant.formatConst(this.funcTypeG)
            },
            funcDirStatusG(){
                return constant.getConst("func_dir_status_group",adminDomain)
            },
            funcDirStatusGName(){
                return constant.formatConst(this.funcDirStatusG)
            },
        },
        methods:{
            sortChange(p, f, {field, order}) {
                if (order === 'ascend') {
                    this.searchParams.sortType = 'asc';
                } else if (order === 'descend') {
                    this.searchParams.sortType = 'desc';
                } else {
                    this.searchParams.sortType = '';
                }
                this.searchParams.sortField = field || '';
                this.queryData();
            },
            handleSelectNode(item){
                if(item && item.funcId !==null){
                    this.parentFunc = item;
                    this.searchParams.parentId = item.funcId;
                    this.searchParams.currentPage = 1;
                    this.queryData();
                }else {
                    this.parentFunc = item;
                }
            },
            handleUpdate(id){
                this.$refs['funcUpdateModal'].open(id);
            },
            handleLookResc(id){
                this.$refs['funcRescLookModal'].open(id);
            },
            handleBindResc(id){
                this.$refs['funcBindRescModal'].open(id);
            },
          handleDeleteResourceBind(funcId){
            const _this = this;
            Modal.confirm({
              title:  '是否清空绑定的资源?',
              cancelText: "取消",
              okText: "确定",
              icon: () => createVNode(ExclamationCircleOutlined),
              onOk() {
                authFuncRescBindDelete(funcId).then(res=>{
                  _this.$message.success("清空绑定资源成功！");
                  _this.queryData();
                })
              },
              onCancel() {},
            })
          },
          handleDeleteUserBind(funcId){
            const _this = this;
            Modal.confirm({
              title:  '是否清空绑定的用户?',
              cancelText: "取消",
              okText: "确定",
              icon: () => createVNode(ExclamationCircleOutlined),
              onOk() {
                autFuncUserBindDelete(funcId).then(res=>{
                  _this.$message.success("清空绑定用户成功！");
                  _this.queryData();
                })
              },
              onCancel() {},
            })
          },
            handleDelete(id){
                this.tableLoading = true;
                authFuncDelete(id).then(e=>{
                    this.$message.success("删除功能成功！");
                    this.queryData();
                }).finally(()=>{
                    this.tableLoading = false;
                })
            },
            handleAdd(){
              this.$refs['funcSaveModal'].open(this.parentFunc);
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
                const sort = {
                    sortType : this.searchParams.sortType,
                    sortField : this.searchParams.sortField,
                }
                this.searchParams = {
                    ...this.$options.data().searchParams,
                    ...page,
                    ...sort
                }
                this.parentFunc = {};
                this.timeList = [];
                this.$refs['funcLeftTree'].resetSelect();
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
                    if(this.timeList && this.timeList.length === 2){
                        this.searchParams.startTime = this.timeList[0];
                        this.searchParams.endTime = this.timeList[1];
                    }
                    const res = await authFuncPage(this.searchParams)
                    const { totalRow, dataList } = res.result
                    this.total = totalRow
                    this.tableData = dataList
                } finally {
                    this.tableLoading = false
                }
            },
        },
        created() {
            this.searchParams.rescUrl =  this.$route.params.rescUrl || '';
            this.pageSearchChange();
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