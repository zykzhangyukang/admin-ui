<template>
    <a-modal v-model:visible="visible"
             :title="null"
             :width="700"
             :footer="null"
             :closable="true"
             @cancel="handleClose"
    >
            <pre class="sync_cnt_code">
              <code v-highlightjs class="json" :key="Math.ceil(Math.random()*100000)">{{code}}</code>
            </pre>
    </a-modal>
</template>

<script>
    import {highlightjs} from '@/utils/highlight';
    import 'highlight.js/styles/idea.css';

    export default {
        name: "PlanLookModal.vue",
        directives: {
            highlightjs,
        },
        components: {
        },
        data(){
            return {
                code: '',
                visible: false,
            }
        },
        methods:{
            handleClose() {
                this.visible = false
            },
            open(code) {
                const parsedData = JSON.parse(code);
                this.code = JSON.stringify(parsedData, null, 4);
                this.visible = true;
            }
        },
    }
</script>

<style scoped>
    .sync_cnt_code{
        font-size: 13px;
    }
</style>