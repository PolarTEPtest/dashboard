import{u as d}from"./VMain-COqGbIWT.js";import{y as s,a7 as g,c as y,f as n,g as u,E as x,G as f,H as v,z as E,C as H,D as k,B as C,n as _,j as w,F as A}from"./index-DXqUMZly.js";import"./ssrBoot-u8X61glJ.js";import"./color-D8yJnlKg.js";class D extends HTMLDetailsElement{constructor(){super()}connectedCallback(){this.el=this,this.summary=this.querySelector("summary"),this.content=this.lastElementChild,this.animation=null,this.isClosing=!1,this.isExpanding=!1,this.summary.addEventListener("click",e=>this.onClick(e))}onClick(e){e?.preventDefault(),this.el.style.overflow="hidden",this.isClosing||!this.el.open?this.doOpen():(this.isExpanding||this.el.open)&&this.shrink()}shrink(){this.isClosing=!0;const e=`${this.el.offsetHeight}px`,t=`${this.summary.offsetHeight}px`;this.animation&&this.animation.cancel(),this.animation=this.el.animate({height:[e,t]},{duration:300,easing:"ease-out"}),this.animation.onfinish=()=>this.onAnimationFinish(!1),this.animation.oncancel=()=>this.isClosing=!1}doOpen(){this.el.style.height=`${this.el.offsetHeight}px`,this.el.open=!0,window.requestAnimationFrame(()=>this.expand()),this.parentElement.querySelectorAll("details[open][exclusive]").forEach(t=>{t!==this&&t.onClick()})}expand(){this.isExpanding=!0;const e=`${this.el.offsetHeight}px`,t=`${this.summary.offsetHeight+this.content.offsetHeight}px`;this.animation&&this.animation.cancel(),this.animation=this.el.animate({height:[e,t]},{duration:300,easing:"ease-out"}),this.animation.onfinish=()=>this.onAnimationFinish(!0),this.animation.oncancel=()=>this.isExpanding=!1}onAnimationFinish(e){this.el.open=e,this.animation=null,this.isClosing=!1,this.isExpanding=!1,this.el.style.height=this.el.style.overflow=""}}customElements.define("animated-details",D,{extends:"details"});const L={__name:"WidgetsContainer",props:{widgets:{type:Array,required:!0}},setup(a){const t=d(a.widgets),l=s([]),o=s([]),h=s(""),r=s(0);return g(()=>{r.value=o.value.reduce((c,i)=>c+=i.clientHeight,0);const{mainRect:m}=y();h.value=(l.value[0].parentElement?.scrollHeight??0)-r.value-m.value.top+"px"}),(m,c)=>(n(!0),u(A,null,x(w(t),(i,p)=>(n(),u("details",{is:"animated-details",ref_for:!0,ref_key:"detailsEls",ref:l,key:p,class:"overflow-auto",exclusive:""},[f("summary",{ref_for:!0,ref_key:"summaryEls",ref:o},v(i.value.title),513),f("span",{style:_({height:h.value}),class:"d-flex flex-column"},[(n(),E(C(i.value.component),H(k(i.value.props)),null,16))],4)]))),128))}};export{L as default};
