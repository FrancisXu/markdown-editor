<template>
    <div class="markdown-editor">
        <div class="markdown-input" v-show="markdownView==='compare'">
      <textarea placeholder="请输入内容..."
                :value="nativeValue"
                class="markdown_input"
                spellcheck="false">
      </textarea>
            <div v-show="toolVisible" class="editor-tool">
                <i @click="uploadImageVisible = true" class="iconfont icon-image"></i>
            </div>
        </div>
        <markdown :source="nativeValue"
                  :view.sync="markdownView">
        </markdown>
        <upload-image @upload-image="uploadImage"
                      :visible.sync="uploadImageVisible">
        </upload-image>
    </div>
</template>

<script>
    import uploadImage from "./uploadImage.vue";
    import codeMirror from "codeMirror";
    import 'codeMirror/mode/markdown/markdown';

    export default {
        data() {
            return {
                nativeValue: "",
                toolVisible: true,
                fileData: "",
                uploadImageVisible: false,
                cursorStart: 0,
                cursorEnd: 0,
                markdownView: "compare",
            }
        },
        props: {
            value: {},
        },
        computed: {},
        mounted() {
            let that = this;

            let editor = codeMirror.fromTextArea(document.querySelector("textarea"), {
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
                    "Cmd-I"() {
                        that.uploadImageVisible = true;
                    },
                }
            });
            editor.on("change", function (e) {
                that.nativeValueChanged(e.getValue());
            });
        },
        methods: {
            /* eslint-disable */
            uploadMarkdown() {
                let that = this,
                    promise = new Promise((resolve, reject) => {
                        that.$emit("upload-markdown", this.nativeValue, resolve, reject);
                    });

                promise.then(result => {
                });
            },

            uploadImage(fileData) {
                let that = this,
                    promise = new Promise((resolve, reject) => {
                        that.$emit("upload-image", fileData, resolve, reject);
                    });

                promise.then(result => {
                    that.uploadImageVisible = false;

                    let imageContent = "![";
                    imageContent += result.imageName;
                    imageContent += "](" + result.imageUrl + ")";

                    let startContent = that.nativeValue.substring(0, that.cursorStart),
                        endContent = that.nativeValue.substring(that.cursorEnd, that.nativeValue.length);

                    that.nativeValueChanged(startContent + "\n" + imageContent + "\n" + endContent)
                });
            },

            nativeValueChanged(value) {
                this.nativeValue = value;
                this.$emit("input", this.nativeValue);
            }

            /* eslint-disable */
        },
        watch: {
            value: {
                handler(newVal) {
                    if (this.nativeValue === newVal) {
                        return;
                    }
                    this.nativeValue = newVal;
                },
                immediate: true
            },
        },
        components: {
            "upload-image": uploadImage,
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
        textarea.markdown_input {
            @include scroll;
            @include font-size-large;
            line-height: 150%;
            font-family: Menlo, Monaco, Consolas, Courier New, monospace;
            color: $font-color--primary--title;
            padding: $space-medium;
            background-color: $background-color--primary;
            resize: none;
            border: unset;
            word-break: break-all;
            word-wrap: break-word;
            width: 100%;
            height: calc(100% - 48px);
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
        i {
            margin-left: $space-small;
        }
    }
</style>