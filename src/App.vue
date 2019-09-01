<template>
    <div id="app">
        <markdown-editor
                v-model="articleValue"
                @upload-image="uploadImage"
                @upload-markdown="updateMarkdown">
        </markdown-editor>
    </div>
</template>

<script>
    import "./components/markdown-editor";

    export default {
        name: 'app',
        data() {
            return {
                articleValue: "# h1 Heading\n" +
                "## h2 Heading\n" +
                "### h3 Heading\n" +
                "#### h4 Heading\n" +
                "##### h5 Heading\n" +
                "###### h6 Heading\n" +
                "\n" +
                "---\n" +
                "\n" +
                "\n" +
                "Enable typographer option to see result.\n" +
                "\n" +
                "(c) (C) (r) (R) (tm) (TM) (p) (P) +-\n" +
                "\n" +
                "**This is bold text**\n" +
                "\n" +
                "*This is italic text*\n" +
                "\n" +
                "~~Strikethrough~~\n" +
                "\n" +
                "## Blockquotes\n" +
                "\n" +
                "> Blockquotes can also be nested...\n" +
                ">> ...by using additional greater-than signs right next to each other...\n" +
                "> > > ...or with spaces between arrows.\n" +
                "\n" +
                "## Lists\n" +
                "\n" +
                "Unordered\n" +
                "\n" +
                "+ Create a list by starting a line with `+`, `-`, or `*`\n" +
                "+ Sub-lists are made by indenting 2 spaces:\n" +
                "  - Marker character change forces new list start:\n" +
                "    * Ac tristique libero volutpat at\n" +
                "    + Facilisis in pretium nisl aliquet\n" +
                "    - Nulla volutpat aliquam velit\n" +
                "+ Very easy!\n" +
                "\n" +
                "Ordered\n" +
                "\n" +
                "1. Lorem ipsum dolor sit amet\n" +
                "2. Consectetur adipiscing elit\n" +
                "3. Integer molestie lorem at massa\n" +
                "\n" +
                "\n" +
                "1. You can use sequential numbers...\n" +
                "1. ...or keep all the numbers as `1.`\n" +
                "\n" +
                "Start numbering with offset:\n" +
                "\n" +
                "57. foo\n" +
                "1. bar\n" +
                "\n" +
                "\n" +
                "## Code\n" +
                "\n" +
                "Inline `code`\n" +
                "\n" +
                "Indented code\n" +
                "\n" +
                "    // Some comments\n" +
                "    line 1 of code\n" +
                "    line 2 of code\n" +
                "    line 3 of code\n" +
                "\n" +
                "\n" +
                "Block code \"fences\"\n" +
                "\n" +
                "```\n" +
                "Sample text here...\n" +
                "```\n" +
                "Syntax highlighting\n" +
                "\n" +
                "``` javascript\n" +
                "var foo = function (bar) {\n" +
                "  return bar++;\n" +
                "};\n" +
                "\n" +
                "console.log(foo(5));\n" +
                "```\n" +
                "\n" +
                "## Tables\n" +
                "\n" +
                "| Option | Description |\n" +
                "| ------ | ----------- |\n" +
                "| data   | path to data files to supply the data that will be passed into templates. |\n" +
                "| engine | engine to be used for processing templates. Handlebars is the default. |\n" +
                "| ext    | extension to be used for dest files. |\n" +
                "\n" +
                "Right aligned columns\n" +
                "\n" +
                "| Option | Description |\n" +
                "| ------:| -----------:|\n" +
                "| data   | path to data files to supply the data that will be passed into templates. |\n" +
                "| engine | engine to be used for processing templates. Handlebars is the default. |\n" +
                "| ext    | extension to be used for dest files. |\n" +
                "\n" +
                "## Links\n" +
                "\n" +
                "[vue-markdown](https://github.com/miaolz123/vue-markdown)\n" +
                "\n" +
                "[link with title](https://github.com/miaolz123/vue-markdown \"VueMarkdown\")\n" +
                "\n" +
                "Autoconverted link https://github.com/miaolz123/vue-markdown (enable linkify to see)\n" +
                "\n" +
                "\n" +
                "## Images\n" +
                "\n" +
                "![Minion](dist/img/minion.png)\n" +
                "\n" +
                "Like links, Images also have a footnote style syntax\n" +
                "\n" +
                "![Alt text][id]\n" +
                "\n" +
                "With a reference later in the document defining the URL location:\n" +
                "\n" +
                "[id]: dist/img/minion.png  \"The Dojocat\"\n" +
                "\n" +
                "\n" +
                "### Emojies\n" +
                "\n" +
                "> Classic markup: :wink: :cry: :laughing: :yum:\n" +
                ">\n" +
                "> Shortcuts (emoticons): :-) :-( 8-) ;)\n" +
                "\n" +
                "\n" +
                "### Subscript / Superscript\n" +
                "\n" +
                "- 19^th^\n" +
                "- H~2~O\n" +
                "\n" +
                "\n" +
                "### \\<ins>\n" +
                "\n" +
                "++Inserted text++\n" +
                "\n" +
                "\n" +
                "### \\<mark>\n" +
                "\n" +
                "==Marked text==\n" +
                "\n" +
                "\n" +
                "### Footnotes\n" +
                "\n" +
                "Footnote 1 link[^first].\n" +
                "\n" +
                "Footnote 2 link[^second].\n" +
                "\n" +
                "Inline footnote^[Text of inline footnote] definition.\n" +
                "\n" +
                "Duplicated footnote reference[^second].\n" +
                "\n" +
                "[^first]: Footnote **can have markup**\n" +
                "\n" +
                "    and multiple paragraphs.\n" +
                "\n" +
                "[^second]: Footnote text.\n" +
                "\n" +
                "\n" +
                "\n" +
                "### Abbreviations\n" +
                "\n" +
                "This is HTML abbreviation example.\n" +
                "\n" +
                "It converts \"HTML\", but keep intact partial entries like \"xxxHTMLyyy\" and so on.\n" +
                "\n" +
                "*[HTML]: Hyper Text Markup Language"
            }
        },
        methods: {
            /* eslint-disable */
            uploadImage(fileData, resolve, reject) {
                resolve({
                    imageName: "测试",
                    imageUrl: "https://www.test.com"
                });
                reject();
            },
            updateMarkdown(content, resolve, reject) {
                resolve();
                reject();
            },
            /* eslint-disable */
        }
    }
</script>

<style lang="scss">
    @import "./style/index";

    #app {
        position: absolute;
        width: 100%;
        height: 100%;
    }
</style>
