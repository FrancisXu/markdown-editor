<template>
    <div class="markdown-editor">
        <div class="markdown-input" v-show="markdownView==='compare'">
            <textarea placeholder="请输入内容..."
                      :value="markdownValue"
                      class="markdown_input"
                      spellcheck="false">
            </textarea>
            <div v-show="toolVisible" class="editor-tool">
                <i @click="uploadImageVisible = true" class="iconfont icon-image"></i>
            </div>
        </div>
        <markdown :source="markdownValue"
                  :view.sync="markdownView">
        </markdown>
        <upload-image @upload-image="uploadImage"
                      :visible.sync="uploadImageVisible">
        </upload-image>
    </div>
</template>
<script>
    import codeMirror from "codeMirror";
    import 'codeMirror/mode/markdown/markdown';

    export default {
        data() {
            return {
                nativeValue: "",

                editorModel: "",

                toolVisible: true,

                fileData: "",

                uploadImageVisible: false,

                markdownView: "compare",

                startCursor: "",
                endCursor: "",
            }
        },
        props: {
            value: {},
        },
        computed: {
            markdownValue: {
                get() {
                    return this.nativeValue;
                },
                set(value) {
                    this.nativeValue = value;
                    this.$emit("input", this.nativeValue);
                }
            }

        },
        mounted() {
            let that = this;

            this.editorModel = codeMirror.fromTextArea(document.querySelector("textarea"), {
                // lineNumbers: true,
                highlightFormatting: true,
                maxBlockquoteDepth: true,
                xml: true,
                allowAtxHeaderWithoutSpace: true,
                mode: {name: "markdown", json: true},
                gitHubSpice: true,
                addClass: ["hahah"],
                addModeClass: true,
                extraKeys: {
                    // 上角标 ctrl+^
                    "Shift-Cmd-6"(cm) {
                        cm.doc.replaceSelection("^" + cm.doc.getSelection() + "^");
                    },
                    // 代码块 ctrl+shift+c
                    "Shift-Cmd-C"(cm) {
                        cm.doc.replaceSelection("\n```\n" + cm.doc.getSelection() + "\n```\n");
                    },
                    // 加粗文字 ctrl+b
                    "Cmd-B"(cm) {
                        cm.doc.replaceSelection("**" + cm.doc.getSelection() + "**");
                    },
                    // 标记文字 ctrl+=
                    "Cmd-="(cm) {
                        cm.doc.replaceSelection("==" + cm.doc.getSelection() + "==");
                    },
                    // 行内代码 ctrl+k
                    "Cmd-K"(cm) {
                        cm.doc.replaceSelection("`" + cm.doc.getSelection() + "`");
                    },
                    // 行内代码 ctrl+l
                    "Cmd-L"(cm) {
                        cm.doc.replaceSelection("`" + cm.doc.getSelection() + "`");
                    },
                    // 注释 ctrl+/
                    "Cmd-/"(cm) {
                        cm.doc.replaceSelection("// " + cm.doc.getSelection());
                    },
                    // 标题1 ctrl+1
                    "Cmd-1"(cm) {
                        cm.doc.replaceSelection("# " + cm.doc.getSelection());
                    },
                    // 标题2 ctrl+2
                    "Cmd-2"(cm) {
                        cm.doc.replaceSelection("## " + cm.doc.getSelection());
                    },
                    // 标题3 ctrl+3
                    "Cmd-3"(cm) {
                        cm.doc.replaceSelection("### " + cm.doc.getSelection());
                    },
                    // 标题4 ctrl+4
                    "Cmd-4"(cm) {
                        cm.doc.replaceSelection("#### " + cm.doc.getSelection());
                    },
                    // 标题5 ctrl+5
                    "Cmd-5"(cm) {
                        cm.doc.replaceSelection("##### " + cm.doc.getSelection());
                    },
                    // 标题6 ctrl+6
                    "Cmd-6"(cm) {
                        cm.doc.replaceSelection("###### " + cm.doc.getSelection());
                    },
                    "Cmd-S"() {
                        that.uploadMarkdown();
                    },
                    "Cmd-I"(cm) {
                        that.uploadImageVisible = true;

                        that.startCursor = cm.doc.getCursor("start");
                        that.endCursor = cm.doc.getCursor();
                    },
                }
            });

            this.editorModel.on("change", function (e) {
                that.markdownValue = e.getValue();
            });
        },
        methods: {
            /* eslint-disable */
            uploadMarkdown() {
                let that = this,
                    promise = new Promise((resolve, reject) => {
                        that.$emit("upload-markdown", this.markdownValue, resolve, reject);
                    });

                promise.then(res => {
                    this.$message.success("保存成功");
                }).catch(err => {
                    this.$message.error("保存失败");
                });
            },

            uploadImage(fileData) {
                let that = this,
                    promise = new Promise((resolve, reject) => {
                        that.$emit("upload-image", fileData, resolve, reject);
                    });

                promise.then(res => {
                    this.uploadImageVisible = false;
                    this.editorModel.doc.setSelection(this.startCursor, this.endCursor);
                    this.editorModel.doc.replaceSelection("![" + result.imageName + "](" + result.imageUrl + ")");
                }).catch(err => {
                    this.$message.error("图片上传失败");
                });
            },

            /* eslint-disable */
        },
        watch: {
            value: {
                handler(newVal) {
                    if (this.markdownValue === newVal) {
                        return;
                    }
                    this.markdownValue = newVal;
                },
                immediate: true
            },
        },
    }
</script>
<style lang="scss">
    @import "../../style/common/var";
    @import "../../style/common/function";
    @import "markdown-editor";

    .markdown-editor {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        font-size: 16px;
    }

    .markdown-input {
        border-right: $border--medium;
        position: relative;
        width: 50%;
        height: 100%;

        &.preview {
            width: 100%;
        }

        .editor-tool {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 48px;
            background-color: white;
            display: flex;
            align-items: center;
            flex-shrink: 0;
            padding: 0 $space-small;
            border-top: $border--medium;
            justify-content: flex-start;
            i {
                margin-left: $space-small;
            }
        }
    }

    .editor-tool {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 48px;
        background-color: white;
        display: flex;
        align-items: center;
        flex-shrink: 0;
        padding: 0 $space-small;
        border-top: $border--medium;
        justify-content: flex-start;
        z-index: 10;
        i {
            margin-left: $space-small;
        }
    }
</style>