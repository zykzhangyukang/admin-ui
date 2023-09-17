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
                        <a-input  v-model:value="form.courseName" placeholder="请输入课程标题，字数限制10-25字符" allow-clear/>
                    </a-form-item>
                    <a-form-item label="课程描述" name="description">
                        <a-textarea  v-model:value="form.description" placeholder="课程描述信息" allow-clear :rows="4"/>
                    </a-form-item>
                    <a-form-item :wrapper-col="form.wrapperCol">
                        <a-button type="primary" @click="handleSave" :loading="confirmLoading">保存课程</a-button>
                        <a-button class="ml15" @click="this.$router.go(-1)">返回</a-button>
                        <a-button class="ml15" @click="handleRest">重置</a-button>
                    </a-form-item>
                </a-form>
            </a-card>
        </a-spin>
    </a-layout>
</template>

<script>
    import {eduCourseSave} from "@/api/edu";

    export default {
        name: "CourseCreate.vue",
        data() {
            return {
                form: {},
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
            }
        }
    }
</script>

<style scoped>

</style>