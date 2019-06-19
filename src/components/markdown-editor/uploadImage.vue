<template>
    <el-dialog custom-class="dialog_form" title="图片上传"
               @close="afterClose"
               :close-on-click-modal="false"
               :visible.sync="nativeVisible">
        <div class="dialog-content">
            <el-upload :show-file-list="false"
                       drag action="/api/admin/image/image"
                       :http-request="httpRequest">
                <div v-show="!fileData">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
                </div>
                <div v-show="fileData">
                    <img :src="fileUrl" alt="" style="width: 100%">
                </div>
            </el-upload>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="nativeVisible = false">取 消</el-button>
            <el-button size="small" type="primary" @click="uploadImage">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
    export default {
        data() {
            return {
                fileData: "",
                fileUrl: "",
                nativeVisible: false,
            }
        },
        props: {
            visible: Boolean,
        },
        methods: {
            uploadImage() {
                this.$emit("upload-image", this.fileData.file);
            },

            httpRequest(fileData) {
                let that = this,
                    reader = new FileReader();
                this.fileData = fileData;
                reader.readAsDataURL(fileData.file);
                reader.onload = function () {
                    that.fileUrl = this.result;
                }
            },

            afterClose() {
                this.$emit("update:visible", this.nativeVisible);
            },
        },
        watch: {
            visible: {
                handler() {
                    this.nativeVisible = this.visible;
                },
            }
        }
    }
</script>
<style lang="scss">
    .dialog_form {
        width: 400px !important;
    }
</style>