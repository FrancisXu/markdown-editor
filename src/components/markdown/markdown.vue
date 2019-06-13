<template>
    <div :class="nativeView==='preview'?'preview':''"
         class="markdown-output">
        <div class="markdown-container">
            <vue-markdown class="markdown"
                          :task-lists="false"
                          :toc="nativeView==='preview'"
                          :toc-first-level="tocFirstLevel"
                          :toc-last-level="tocLastLevel"
                          :toc-anchor-link-space="true"
                          toc-anchor-link-symbol=""
                          @toc-rendered="tocRender"
                          :source="nativeValue"
                          :prerender="beforeRender"
                          :postrender="afterRender">
            </vue-markdown>
            <div class="aside" v-show="nativeView==='preview'"></div>
        </div>
        <div class="markdown-tool">
            <i @click="toggleView"
               class="iconfont"
               :class="nativeView==='preview'?'icon-right-push':'icon-left-push'"></i>
        </div>
    </div>
</template>

<script>
    import vueMarkdown from "vue-markdown";
    import {jsRender, cssRender, htmlRender, jsonRender} from "./highlightRender"

    export default {
        name: "markdown",
        data() {
            return {
                tocHtml: "",
                tocFirstLevel: 0,
                tocLastLevel: 6,
                toolVisible: true,
                nativeView: "",

                beforeRender(renderStr) {
                    let linkStr, tempArr = renderStr.split("{{{");
                    linkStr = tempArr.map((temp, index) => {
                        if (temp.indexOf("}}}") > 0 && index > 0) {
                            let arr = temp.split("}}}");
                            arr[0] = this.$store.state.httpPrefix + arr[0];
                            temp = arr.join(")");
                        }
                        return temp;
                    });
                    renderStr = linkStr.join("(");

                    return renderStr
                },

                afterRender(h) {
                    h = jsRender(h);
                    h = cssRender(h);
                    h = htmlRender(h);
                    h = jsonRender(h);

                    return h;
                },
            };
        },
        props: {
            source: {},
            tocId: {
                type: String,
            },
            tocClass: {
                type: String,
            },
            view: {
                type: String
            }
        },
        computed: {
            nativeValue() {
                return this.source;
            }
        },
        methods: {
            tocRender(h) {
                let appendDom,
                    tocDom = document.createElement("div");
                if (this.tocId) {
                    appendDom = document.querySelector("#" + this.tocId);
                }
                else if (this.tocClass) {
                    appendDom = document.querySelector("." + this.tocClass);
                } else {
                    appendDom = document.querySelector(".markdown-container>.aside");
                }
                tocDom.innerHTML = h;
                tocDom.className = "markdown-toc";

                appendDom.appendChild(tocDom);
            },
            toggleView() {
                if (this.nativeView === "compare") {
                    this.nativeView = "preview";
                } else if (this.nativeView === "preview") {
                    this.nativeView = "compare";
                }
                this.$emit("update:view", this.nativeView);
            }
        },
        components: {
            "vue-markdown": vueMarkdown
        },
        watch: {
            "source": {
                handler(value) {
                    if (this.toc) {
                        // 清空toc
                        this.tocHtml = "";

                        // 检查内容中最长和最短的#，确认标题范围
                        let tocLevelArr = [];
                        value.replace(/###### /g, function () {
                            tocLevelArr.push(6);
                            return " ";
                        }).replace(/##### /g, function () {
                            tocLevelArr.push(5);
                            return " ";
                        }).replace(/#### /g, function () {
                            tocLevelArr.push(4);
                            return " ";
                        }).replace(/### /g, function () {
                            tocLevelArr.push(3);
                            return " ";
                        }).replace(/## /g, function () {
                            tocLevelArr.push(2);
                            return " ";
                        }).replace(/# /g, function () {
                            tocLevelArr.push(1);
                            return " ";
                        });
                        this.tocFirstLevel = tocLevelArr[tocLevelArr.length - 1] - 1;
                        this.tocLastLevel = tocLevelArr[0];
                    }
                },
                deep: true,
            },
            view: {
                handler(value) {
                    this.nativeView = value;
                },
                immediate: true,
            }
        }
    }
</script>

<style lang="scss">
    @import "./markdown";
</style>