<template>
    <a-layout class='courseCreate-container'>
        <a-spin :spinning="spinning">
            <a-page-header
                    style="background: #ffffff"
                    title="创建课程"
            />
            <a-card>
                <a-form  :model="form">
                    <a-form-item label="课程标题">
                        <a-input v-model:value="form.courseName" placeholder="请输入课程标题，字数限制5-30字符" allow-clear/>
                    </a-form-item>
                    <a-form-item label="课程分类">
                        <a-tree-select
                                placeholder="请选择课程分类"
                                v-model:value="form.catalogIdList"
                                style="width: 100%"
                                :tree-data="catalogData"
                                :replaceFields="replaceFields"
                                tree-checkable
                                search-placeholder="请选择课程分类"
                        />
                    </a-form-item>
                    <a-form-item label="课程描述" name="description">
                        <a-textarea  v-model:value="form.description" placeholder="课程描述信息" allow-clear :rows="4"/>
                    </a-form-item>
                    <a-form-item :wrapper-col="form.wrapperCol">
                        <a-button type="primary" @click="handleSave" :loading="confirmLoading">立即创建</a-button>
                        <a-button class="ml15" @click="this.$router.go(-1)">返回</a-button>
                        <a-button class="ml15" @click="handleRest">重置</a-button>
                    </a-form-item>
                </a-form>
            </a-card>
        </a-spin>
    </a-layout>
</template>

<script>
    import {eduCatalogTree, eduCourseSave} from "@/api/edu";
    export default {
        name: "CourseCreate.vue",
        data() {
            return {
                catalogData: [],
                replaceFields: {children:'children', title:'catalogName', key:'catalogId', value: 'catalogId' },
                form: {
                    catalogIdList: [],
                    courseName: '',
                },
                spinning: false,
                confirmLoading: false,
            }
        },
        methods: {
            handleSave() {
                this.spinning = true;
                this.confirmLoading = true;
                eduCourseSave(this.form).then(res => {
                    this.$message.success("创建课程成功");
                    this.handleRest();
                }).finally(e => {
                    this.confirmLoading = false;
                    this.spinning = false;
                })
            },
            handleRest(){
                this.form = {
                    ...this.$options.data().searchParams,
                }
            },
            getCatalogTree(){
              eduCatalogTree().then(res=>{
                  this.catalogData = res.result;
              })
            }
        },
        created() {
            this.getCatalogTree();
        }
    }
</script>

<style scoped>

</style>