import markdown from './src/components/markdown';
import markdownEditor from './src/components/markdown-editor';

const components = [
    markdown,
    markdownEditor,
];

const install = function(Vue) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
