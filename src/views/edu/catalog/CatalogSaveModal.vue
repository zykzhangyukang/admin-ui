<template>
    <a-modal v-model:visible="visible"
             title="新增分类"
             @ok="handleOk"
             @cancel="handleClose"
             :confirm-loading="confirmLoading"
             cancelText="取消"
             okText="提交"
    >
        <a-spin :spinning="spinning" >
            <a-form :model="form"  ref="formRef" :rules="formRules"  :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-item label="父级分类" v-if="this.selectedRows && this.selectedRows.length > 0">
                    <a-input disabled v-model:value="this.selectedRows[0].catalogName" />
                </a-form-item>
                <a-form-item label="分类名称" name="catalogName">
                    <a-input v-model:value="form.catalogName" />
                </a-form-item>
            </a-form>
        </a-spin>
    </a-modal>
</template>

<script>

    import {eduCatalogSave} from "@/api/edu";

    export default {
        name: "CatalogSaveModal.vue",
        data() {
            return {
                selectedRows: [],
                spinning: false,
                confirmLoading:  false,
                visible: false,
                labelCol: { span: 4 },
                wrapperCol: { span: 18 },
                form:{
                    catalogName: '',
                },
                formRules: {
                    catalogName: [
                        { required: true, message: '请填写分类名称', trigger: 'blur' },
                    ],
                },
            }
        },
        methods:{
            handleOk() {
                this.$refs.formRef
                    .validate()
                    .then(() => {
                        this.spinning = true;
                        this.confirmLoading = true;
                        if(this.selectedRows && this.selectedRows.length > 0){
                            this.form.parentId = this.selectedRows[0].catalogId;
                        }
                        eduCatalogSave(this.form).then(res => {
                            this.$message.success("新增分类成功！");
                            this.handleClose();
                            this.$emit('success')
                        }).finally(e=>{
                            this.spinning = false;
                            this.confirmLoading =false;
                        })
                    })
                    .catch(() => {
                        this.$message.warn('表单验证失败！');
                    });
            },
            handleClose(){
                this.confirmLoading = false;
                this.visible = false
                this.form = this.$options.data().form;
                this.$refs.formRef.resetFields();
            },
            open(selectedRows){
                this.visible = true;
                this.selectedRows = selectedRows;
            }
        }
    }
</script>

<style scoped>

</style>