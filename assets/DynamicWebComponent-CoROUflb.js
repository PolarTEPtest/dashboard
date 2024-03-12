function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{w as m,a as p,y as d,ad as f,a7 as _,o as g,f as u,g as y,z as k,K as h,B as v,_ as w}from"./index-DXqUMZly.js";const P={class:"d-flex flex-column fill-height overflow-auto"},S={__name:"DynamicWebComponent",props:{link:{type:[String,Function],required:!0},constructorProp:String,tagName:{type:String,required:!0},properties:{type:Object,default:()=>({})},onMounted:Function,onUnmounted:Function},async setup(n){let t,s;const e=n,i=async()=>typeof e.link=="string"?await w(()=>import(e.link),__vite__mapDeps([])):await e.link(),l=([t,s]=m(()=>i().catch(o=>{console.error(o)})),t=await t,s(),t);if(!customElements.get(e.tagName)&&e.constructorProp){const o=l[e.constructorProp];customElements.define(e.tagName,o)}const a=p(),r=d(null),c=f();return _(()=>{e.onMounted?.(r.value,a,c)}),g(()=>{e.onUnmounted?.(r.value,a,c)}),(o,C)=>(u(),y("span",P,[(u(),k(v(n.tagName),h(n.properties,{ref_key:"elementRef",ref:r}),null,16))]))}};export{S as default};
