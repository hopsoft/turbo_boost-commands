var v={};function C(e){v[e.id]=e}function S(e){delete v[e]}var x={add:C,remove:S,get reflexes(){return[...Object.values(v)]},get length(){return Object.keys(v).length}};var u={start:"turbo-reflex:start",success:"turbo-reflex:success",finish:"turbo-reflex:finish",abort:"turbo-reflex:abort",clientError:"turbo-reflex:client-error",serverError:"turbo-reflex:server-error"};function h(e,t=document,r={},n=!1){try{t=t||document;let s=new CustomEvent(e,{detail:r,cancelable:!1,bubbles:!0});t.dispatchEvent(s)}catch(s){if(n)throw s;h(u.clientError,t,{error:s,...r},!0)}}function L(e){e.detail.endedAt=new Date().getTime(),e.detail.milliseconds=e.detail.endedAt-e.detail.startedAt,setTimeout(()=>h(u.finish,e.target,e.detail),10)}addEventListener(u.serverError,L);addEventListener(u.success,L);addEventListener(u.finish,e=>x.remove(e.detail.id),!0);var o={dispatch:h,events:u};function D(e){return e.closest("[data-turbo-reflex]")}function H(e){return e.closest("turbo-frame")}function _(e,t={}){if(e.tagName.toLowerCase()!=="select")return t.value=e.value;if(!e.multiple)return t.value=e.options[e.selectedIndex].value;t.values=Array.from(e.options).reduce((r,n)=>(n.selected&&r.push(n.value),r),[])}function q(e){let n=Array.from(e.attributes).reduce((s,c)=>{let i=c.value;return typeof i=="string"&&i.length>100&&(i=i.slice(0,100)+"..."),s[c.name]=i,s},{});return n.tag=e.tagName,n.checked=e.checked,n.disabled=e.disabled,_(e,n),typeof n.value=="string"&&n.value.length>500&&(n.value=n.value.slice(0,500)+"..."),delete n.class,delete n["data-turbo-reflex"],delete n["data-turbo-frame"],n}var a={buildAttributePayload:q,findClosestReflex:D,findClosestFrame:H,get metaElement(){return document.getElementById("turbo-reflex")},get metaElementToken(){return document.getElementById("turbo-reflex").getAttribute("content")}};var p={};addEventListener("turbo:before-fetch-request",e=>{let t=e.target.closest("turbo-frame"),{fetchOptions:r}=e.detail;r.headers["TurboReflex-Token"]=a.metaElementToken});addEventListener("turbo:before-fetch-response",e=>{let t=e.target.closest("turbo-frame");t&&(p[t.id]=t.src)});addEventListener("turbo:frame-load",e=>{let t=e.target.closest("turbo-frame");t.dataset.turboReflexSrc=p[t.id]||t.src||t.dataset.turboReflexSrc,delete p[t.id]});var d={},w;function P(e,t){d[e]=t,document.addEventListener(e,w,!0)}function V(e,t){return t=t.toLowerCase(),d[e].includes(t)||!Object.values(d).flat().includes(t)&&d[e].includes("*")}var l={events:d,register:P,isRegistered:V,set handler(e){w=e}};function N(e,t={}){t.token=a.metaElementToken;let r=document.createElement("input");r.type="hidden",r.name="turbo_reflex",r.value=JSON.stringify(t),e.appendChild(r)}var T={invokeReflex:N};function $(e,t={}){let r=document.createElement("a");r.href=e;let n=new URL(r);return n.searchParams.set("turbo_reflex",JSON.stringify(t)),n}var b={build:$};function B(e,t){let r=t.src;t={...t},delete t.src,e.src=b.build(r,t)}var E={invokeReflex:B};function F(e){let t=e.target;o.dispatch(o.events.abort,window,{xhr:t,...e.detail})}function k(e){let t=e.target;o.dispatch(o.events.clientError,window,{xhr:t,...e.detail,error:`Server returned a ${t.status} status code! TurboReflex requires 2XX status codes. Server message: ${t.statusText}`},!0)}function M(e){let t=e.target,r=t.responseText,n=t.getResponseHeader("TurboReflex-Hijacked")==="true";if((t.status<200||t.status>299)&&k(e),n){let s="<turbo-stream",c="</turbo-stream>",i=r.indexOf(s),f=r.lastIndexOf(c);if(i>=0&&f>=0){let g=r.slice(i,f+c.length);document.body.insertAdjacentHTML("beforeend",g)}}else{let s="<html",c="</html",i=r.indexOf(s),f=r.lastIndexOf(c);if(i>=0&&f>=0){let g=r.slice(r.indexOf(">",i)+1,f);document.documentElement.innerHTML=g}}}function U(e){let t=e.src;e={...e},delete e.src;try{let r=new XMLHttpRequest;r.open("GET",b.build(t,e),!0),r.setRequestHeader("TurboReflex-Token",a.metaElementToken),r.addEventListener("abort",F),r.addEventListener("error",k),r.addEventListener("load",M),r.send()}catch(r){let n=`Unexpected error sending HTTP request! ${r.message}`;k(r,{detail:{message:n}})}}var y={invokeReflex:U};function R(e,t){return t=t||{dataset:{}},e.href||t.src||t.dataset.turboReflexSrc||(t?null:location.href)}function X(e){let t=a.findClosestFrame(e),r=e.dataset.turboFrame;return e.tagName.toLowerCase()==="form"?{name:"form",reason:"Element is a form.",frame:t,src:null,invokeReflex:T.invokeReflex}:r&&r!=="_self"?(t=document.getElementById(r),{name:"frame",reason:"element targets a frame that is not _self",frame:t,src:R(e,t),invokeReflex:E.invokeReflex}):(!r||r==="_self")&&t?{name:"frame",reason:"element does NOT target a frame or targets _self and is contained by a frame",frame:t,src:R(e,t),invokeReflex:E.invokeReflex}:{name:"window",reason:"element matches one or more of the following conditions (targets _top, does NOT target a frame, is NOT contained by a frame)",frame:null,src:R(e),invokeReflex:y.invokeReflex}}var O={find:X};var m="unknown",A={debug:Object.values(o.events),info:Object.values(o.events),warn:[o.events.abort,o.events.clientError,o.events.serverError],error:[o.events.clientError,o.events.serverError],unknown:[]};Object.values(o.events).forEach(e=>{addEventListener(e,t=>{A[m].includes(t.type)&&console[m==="debug"?"log":m](t.type,t.detail)})});var I={get level(){return m},set level(e){return Object.keys(A).includes(e)||(e="unknown"),m=e}};function J(){return([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16))}var j={v4:J};function G(e){let t,r={};try{if(t=a.findClosestReflex(e.target),!t||!l.isRegistered(e.type,t.tagName))return;let n=O.find(t);switch(r={id:`reflex-${j.v4()}`,name:t.dataset.turboReflex,driver:n.name,src:n.src,frameId:n.frame?n.frame.id:null,elementId:t.id.length>0?t.id:null,elementAttributes:a.buildAttributePayload(t),startedAt:new Date().getTime()},x.add(r),o.dispatch(o.events.start,t,r),n.name!=="form"&&e.preventDefault(),n.name){case"form":return n.invokeReflex(t,r);case"frame":return n.invokeReflex(n.frame,r);case"window":return n.invokeReflex(r)}}catch(n){o.dispatch(o.events.clientError,t,{error:n,...r})}}l.handler=G;l.register("change",["input","select","textarea"]);l.register("submit",["form"]);l.register("click",["*"]);var Ce={logger:I,registerEventDelegate:l.register,get eventDelegates(){return{...l.events}},get lifecycleEvents(){return[...Object.values(o.events)]}};export{Ce as default};
//# sourceMappingURL=turbo_reflex.js.map
