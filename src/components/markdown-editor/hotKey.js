export let hotCodeList = {
    ctrlKey: [
        66,  //加粗文字 ctrl+b
        187, //标记文字 ctrl+=
        191, //注释 ctrl+/
        192, //插入代码 ctrl+`

        49,// 标题1 ctrl+1
        50,// 标题2 ctrl+2
        51,// 标题3 ctrl+3
        52,// 标题4 ctrl+4
        53,// 标题5 ctrl+5
        54,// 标题6 ctrl+6

        54,  // 上角标 ctrl+^（ctrl+shift+6）
        // 中划线 ctrl+~(ctrl+shift+`)
    ],
    tabKey: [
        9 // 缩进 tab
    ],
    commandKey: [
        83,// 保存 command+s
        90// 撤销 command+z,恢复 command+shift+z
    ],
};

//单独输入需要屏蔽的辅助键
export let auxiliaryKey = [
    16, // shift
    17, // ctrl
    18, // alt
    91, // meta
];

export function hotKeyText(content, dom, e) {
    let selectionStart = dom.selectionStart,
        selectionEnd = dom.selectionEnd;

    let startContent = content.substring(0, selectionStart),
        selectContent = content.substring(selectionStart, selectionEnd),
        endContent = content.substring(selectionEnd, content.length);

    if (e.shiftKey === true) {
        switch (e.keyCode) {
            // 上角标 ctrl+^（ctrl+shift+6）
            case 54:
                content = startContent + "^" + selectContent + "^" + endContent;
                selectionStart += 1;
                selectionEnd += 1;
                break;
            // 代码块 ctrl+~(ctrl+shift+`)
            case 192:
                content = startContent + "\n```\n" + selectContent + "\n```\n" + endContent;
                selectionStart += 5;
                selectionEnd += 5;
                break;
        }
    } else {
        switch (e.keyCode) {
            //缩进
            case 9:
                content = startContent + "  " + selectContent + endContent;
                selectionStart += 2;
                selectionEnd += 2;
                break;

            //加粗文字 ctrl+b
            case 66:
                content = startContent + "**" + selectContent + "**" + endContent;
                selectionEnd += 4;
                break;

            //标记文字 ctrl+=
            case 187:
                content = startContent + "==" + selectContent + "==" + endContent;
                selectionEnd += 4;
                break;

            //代码 ctrl+`
            case 192:
                content = startContent + "`" + selectContent + "`" + endContent;
                selectionStart += 1;
                selectionEnd += 1;
                break;
            //注释 ctrl+/
            case 191:
                content = startContent + "// " + selectContent + endContent;
                selectionStart += 3;
                selectionEnd += 3;
                break;

            // 标题1 ctrl+1
            case 49:
                content = startContent + "# " + selectContent + endContent;
                selectionStart += 2;
                selectionEnd += 2;
                break;

            // 标题2 ctrl+2
            case 50:
                content = startContent + "## " + selectContent + endContent;
                selectionStart += 3;
                selectionEnd += 3;
                break;

            // 标题3 ctrl+3
            case 51:
                content = startContent + "### " + selectContent + endContent;
                selectionStart += 4;
                selectionEnd += 4;
                break;

            // 标题4 ctrl+4
            case 52:
                content = startContent + "#### " + selectContent + endContent;
                selectionStart += 5;
                selectionEnd += 5;
                break;

            // 标题5 ctrl+5
            case 53:
                content = startContent + "##### " + selectContent + endContent;
                selectionStart += 6;
                selectionEnd += 6;
                break;

            // 标题6 ctrl+6
            case 54:
                content = startContent + "###### " + selectContent + endContent;
                selectionStart += 7;
                selectionEnd += 7;
                break;
        }
    }

    return {
        content: content,
        selectionStart: selectionStart,
        selectionEnd: selectionEnd,
    };
}

