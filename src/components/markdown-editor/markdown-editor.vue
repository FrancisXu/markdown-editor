<template>
    <div class="main-content">
        <div class="markdown-input" v-show="markdownView==='compare'">
            <textarea placeholder="请输入内容..."
                      :value="nativeValue"
                      @input="handleInput"
                      @keydown="hotKey"
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
    import {hotCodeList, auxiliaryKey, hotKeyText} from "./hotKey";
    import UndoQueue from "./undo";

    let undoQueue = new UndoQueue();
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
        mounted() {
            let that = this;
            document.querySelector(".markdown_input").addEventListener("blur",
                function () {
                    that.cursorStart = this.selectionStart;
                    that.cursorEnd = this.selectionEnd;
                }, false)
        },
        methods: {
            /* eslint-disable */
            handleInput($event) {
                let dom = document.querySelector(".markdown_input"),
                    value = $event.target.value;

                this.nativeValue = value;

                this.$nextTick(() => {
                    undoQueue.into({
                        content: value,
                        selectionStart: dom.selectionStart,
                        selectionEnd: dom.selectionEnd
                    });
                });

                this.$emit('input', this.nativeValue);
            },

            hotKey(e) {
                let dom = document.querySelector(".markdown_input");

                console.log(e);
                // 如果按键为普通输入键，不需要处理
                if (e.ctrlKey === false && e.metaKey === false
                    && !hotCodeList.tabKey.includes(e.keyCode)) {
                    return;
                }

                // 如果按键只是不产生内容的辅助键，不需要处理
                if (auxiliaryKey.includes(e.keyCode)) {
                    return;
                }

                if (hotCodeList.ctrlKey.includes(e.keyCode) && e.ctrlKey === true) {
                    e.preventDefault();

                    let obj = hotKeyText(this.nativeValue, dom, e);

                    this.nativeValue = obj.content;

                    undoQueue.into(obj);
                } else if (hotCodeList.tabKey.includes(e.keyCode)) {
                    e.preventDefault();

                    let obj = hotKeyText(this.nativeValue, dom, e);

                    this.nativeValue = obj.content;

                    undoQueue.into(obj);
                } else if (hotCodeList.commandKey.includes(e.keyCode) && e.metaKey === true) {
                    e.preventDefault();

                    if (e.shiftKey === false && e.keyCode === 90) {
                        undoQueue.undo();
                    }

                    if (e.shiftKey === true && e.keyCode === 90) {
                        undoQueue.redo();
                    }

                    if (e.shiftKey === false && e.keyCode === 83) {
                        this.uploadMarkdown();
                    }
                } else {
                    return;
                }
                this.nativeValue = undoQueue.current.content;
                this.$emit("input", this.nativeValue);

                this.$nextTick(() => {
                    dom.selectionStart = undoQueue.current.selectionStart;
                    dom.selectionEnd = undoQueue.current.selectionEnd;
                });
            },

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

                    that.nativeValue = startContent + "\n" + imageContent + "\n" + endContent;
                    that.$emit("input", that.nativeValue);
                });
            },

            /* eslint-disable */
        },
        watch: {
            value: {
                handler(newVal) {
                    if (this.nativeValue === newVal) {
                        return;
                    }
                    this.nativeValue = newVal;
                    undoQueue = new UndoQueue({
                        content: newVal,
                        selectionStart: newVal.length,
                        selectionEnd: newVal.length
                    });
                },
                immediate: true
            },
        },
        components: {
            "upload-image": uploadImage,
        },
        beforeDestroy() {
            undoQueue = null;
        },
    }
</script>

<style lang="scss">
    @import "../../style/common/var";
    @import "../../style/common/function";

    .main-content {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
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

    output {
    }
</style>