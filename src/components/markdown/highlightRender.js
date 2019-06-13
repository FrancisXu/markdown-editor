import highlightService from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';
import 'highlight.js/styles/dracula.css';

highlightService.registerLanguage('javascript', javascript);
highlightService.registerLanguage('css', css);
highlightService.registerLanguage('xml', xml);
highlightService.registerLanguage('json', json);

export function jsRender(h) {
    let arr,
        tempArr = h.split("<code class=\"language-javascript\">");
    arr = tempArr.map((temp, index) => {
        if (temp.indexOf("</code>") > 0 && index > 0) {
            let arr = temp.split("</code>");
            arr[0] = highlightService.highlight("javascript", arr[0]).value;
            arr[0] = arr[0].replace(/&amp;/g, '&');
            temp = arr.join("</code>");
        }
        return temp;
    });

    h = arr.join("<code class=\"language-javascript\">");
    return h
}

export function cssRender(h) {
    let arr,
        tempArr = h.split("<code class=\"language-css\">");
    arr = tempArr.map((temp, index) => {
        if (temp.indexOf("</code>") > 0 && index > 0) {
            let arr = temp.split("</code>");
            arr[0] = highlightService.highlight("css", arr[0]).value;
            arr[0] = arr[0].replace(/&amp;/g, '&');
            temp = arr.join("</code>");
        }
        return temp;
    });

    h = arr.join("<code class=\"language-css\">");
    return h
}

export function htmlRender(h) {
    let arr,
        tempArr = h.split("<code class=\"language-html\">");
    arr = tempArr.map((temp, index) => {
        if (temp.indexOf("</code>") > 0 && index > 0) {
            let arr = temp.split("</code>");
            arr[0] = arr[0].replace(/&lt;/g, '<').replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"');
            arr[0] = highlightService.highlight("xml", arr[0]).value;
            temp = arr.join("</code>");
        }
        return temp;
    });

    h = arr.join("<code class=\"language-html\">");
    return h
}

export function jsonRender(h) {
    let arr,
        tempArr = h.split("<code class=\"language-json\">");
    arr = tempArr.map((temp, index) => {
        if (temp.indexOf("</code>") > 0 && index > 0) {
            let arr = temp.split("</code>");
            arr[0] = arr[0].replace(/&lt;/g, '<').replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"');
            arr[0] = highlightService.highlight("json", arr[0]).value;
            temp = arr.join("</code>");
        }
        return temp;
    });

    h = arr.join("<code class=\"language-json\">");
    return h
}
