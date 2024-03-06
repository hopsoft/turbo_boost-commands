var at=Object.defineProperty,it=Object.defineProperties;var ct=Object.getOwnPropertyDescriptors;var B=Object.getOwnPropertySymbols;var mt=Object.prototype.hasOwnProperty,dt=Object.prototype.propertyIsEnumerable;var F=(t,e,r)=>e in t?at(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,s=(t,e)=>{for(var r in e||(e={}))mt.call(e,r)&&F(t,r,e[r]);if(B)for(var r of B(e))dt.call(e,r)&&F(t,r,e[r]);return t},v=(t,e)=>it(t,ct(e));var ut="TurboBoost-Command",h={boost:"text/vnd.turbo-boost.html",stream:"text/vnd.turbo-stream.html",html:"text/html",xhtml:"application/xhtml+xml",json:"application/json"},lt=(t={})=>{t=s({},t);let e=(t.Accept||"").split(",").map(r=>r.trim()).filter(r=>r.length);return e.unshift(h.boost,h.stream,h.html,h.xhtml),t.Accept=[...new Set(e)].join(", "),t["Content-Type"]=h.json,t["X-Requested-With"]="XMLHttpRequest",t},ft=t=>{if(t){let[e,r,o]=t.split(", ");return{name:e,status:r,strategy:o}}return{}},b={prepare:lt,tokenize:ft,RESPONSE_HEADER:ut};var A={};function pt(t){A[t.id]=t}function bt(t){delete A[t]}var x={add:pt,remove:bt,get commands(){return[...Object.values(A)]},get length(){return Object.keys(A).length}};var i={start:"turbo-boost:command:start",success:"turbo-boost:command:success",finish:"turbo-boost:command:finish",abort:"turbo-boost:command:abort",clientError:"turbo-boost:command:client-error",serverError:"turbo-boost:command:server-error"},u={stateLoad:"turbo-boost:state:load",stateChange:"turbo-boost:state:change"},d=s(s({},i),u);function m(t,e,r={}){return new Promise(o=>{r=r||{},r.detail=r.detail||{},e=e||document;let n=new CustomEvent(t,v(s({},r),{bubbles:!0}));e.dispatchEvent(n),o(n)})}function vt(t){setTimeout(()=>m(i.finish,t.target,{detail:t.detail}))}var ht=[i.abort,i.serverError,i.success];ht.forEach(t=>addEventListener(t,vt));addEventListener(i.finish,t=>x.remove(t.detail.id),!0);var J={events:i};function gt(){return("10000000-1000-4000-8000"+-1e11).replace(/[018]/g,t=>(t^crypto.getRandomValues(new Uint8Array(1))[0]&15>>t/4).toString(16))}var z={v4:gt};var Et=t=>{document.body.insertAdjacentHTML("beforeend",t)},yt=t=>{let r=new DOMParser().parseFromString(t,"text/html");TurboBoost.Streams.morph.method(document.documentElement,r.documentElement)},C=(t,e)=>{if(t&&e){if(t.match(/^Append$/i))return Et(e);if(t.match(/^Replace$/i))return yt(e)}};var R={};addEventListener("turbo:before-fetch-response",t=>{let e=t.target.closest("turbo-frame");e!=null&&e.id&&(e!=null&&e.src)&&(R[e.id]=e.src);let{fetchResponse:r}=t.detail,o=r.header(b.RESPONSE_HEADER);if(!o)return;t.preventDefault();let{strategy:n}=b.tokenize(o);r.responseHTML.then(c=>C(n,c))});addEventListener("turbo:frame-load",t=>{let e=t.target.closest("turbo-frame");e.dataset.src=R[e.id]||e.src||e.dataset.src,delete R[e.id]});var At={frameAttribute:"data-turbo-frame",methodAttribute:"data-turbo-method",commandAttribute:"data-turbo-command",confirmAttribute:"data-turbo-confirm"},a=s({},At);var M={method:t=>Promise.resolve(confirm(t))},xt=t=>t.detail.driver==="method",Ct=t=>{if(t.detail.driver!=="form")return!1;let e=t.target,r=e.closest("turbo-frame"),o=e.closest(`[${a.frameAttribute}]`);return!!(r||o)},kt=t=>xt(t)||Ct(t);document.addEventListener(i.start,async t=>{let e=t.target.getAttribute(a.confirmAttribute);if(!e||(t.detail.confirmation=!0,kt(t)))return;await M.method(e)||t.preventDefault()});var H=M;var l=[],T;function St(t,e){let r=l.find(o=>o.name===t);return r&&l.splice(l.indexOf(r),1),l=[{name:t,selectors:e},...l],document.removeEventListener(t,T,!0),document.addEventListener(t,T,!0),s({},l.find(o=>o.name===t))}function wt(t){return l.find(e=>e.selectors.find(r=>Array.from(document.querySelectorAll(r)).find(o=>o===t)))}function Lt(t,e){let r=wt(e);return r&&r.name===t}var f={register:St,isRegisteredForElement:Lt,get events(){return[...l]},set handler(t){T=t}};function Ot(t){return t.closest(`[${a.commandAttribute}]`)}function Rt(t){return t.closest("turbo-frame[src]")||t.closest("turbo-frame[data-turbo-frame-src]")||t.closest("turbo-frame")}function Tt(t,e={}){if(t.tagName.toLowerCase()!=="select")return e.value=t.value||null;if(!t.multiple)return e.value=t.options[t.selectedIndex].value;e.values=Array.from(t.options).reduce((r,o)=>(o.selected&&r.push(o.value),r),[])}function $t(t){let e=Array.from(t.attributes).reduce((r,o)=>{let n=o.value;return r[o.name]=n,r},{});return e.tag=t.tagName,e.checked=!!t.checked,e.disabled=!!t.disabled,Tt(t,e),delete e.class,delete e.action,delete e.href,delete e[a.commandAttribute],delete e[a.frameAttribute],e}var g={buildAttributePayload:$t,findClosestCommand:Ot,findClosestFrameWithSource:Rt};var Pt=(t,e={})=>{let r=t.querySelector('input[name="turbo_boost_command"]')||document.createElement("input");r.type="hidden",r.name="turbo_boost_command",r.value=JSON.stringify(e),t.contains(r)||t.appendChild(r)},U={invokeCommand:Pt};var _t=t=>{let e=document.createElement("a");return e.href=t,new URL(e)},q={get commandInvocationURL(){return _t("/turbo-boost-command-invocation")}};var V=t=>{let e=`Unexpected error performing a TurboBoost Command! ${t.message}`;m(J.events.clientError,document,{detail:{message:e,error:t}},!0)},Dt=t=>{let{strategy:e}=b.tokenize(t.headers.get(b.RESPONSE_HEADER));t.text().then(r=>C(e,r))},k=(t={})=>{try{fetch(q.commandInvocationURL.href,{method:"POST",headers:b.prepare({}),body:JSON.stringify(t)}).then(Dt).catch(V)}catch(e){V(e)}};var Nt=(t,e)=>k(e),$={invokeCommand:Nt};var E,P,It=()=>{E=null,P=null},jt=(t,e={})=>{E=t,P=e},Bt=t=>{try{if(!E||t.getAttribute("method")!==E.dataset.turboMethod||t.getAttribute("action")!==E.href)return;let e=t.querySelector('input[name="turbo_boost_command"]')||document.createElement("input");e.type="hidden",e.name="turbo_boost_command",e.value=JSON.stringify(P),t.contains(e)||t.appendChild(e)}finally{It()}};document.addEventListener("submit",t=>Bt(t.target),!0);var W={invokeCommand:jt};var Ft=(t,e={})=>k(e),X={invokeCommand:Ft};function _(t,e){return e=e||{dataset:{}},t.href||e.src||e.dataset.src||location.href}function Jt(t){let e=g.findClosestFrameWithSource(t),{turboFrame:r,turboMethod:o}=t.dataset;return t.tagName.toLowerCase()==="form"?{name:"form",reason:"Element is a form.",frame:e,src:t.action,invokeCommand:U.invokeCommand}:o&&o.length>0?{name:"method",reason:"Element defines data-turbo-method.",frame:e,src:t.href,invokeCommand:W.invokeCommand}:r&&r!=="_self"?(e=document.getElementById(r),{name:"frame",reason:"element targets a frame that is not _self",frame:e,src:_(t,e),invokeCommand:$.invokeCommand}):(!r||r==="_self")&&e?{name:"frame",reason:"element does NOT target a frame or targets _self and is contained by a frame",frame:e,src:_(t,e),invokeCommand:$.invokeCommand}:{name:"window",reason:"element matches one or more of the following conditions (targets _top, does NOT target a frame, is NOT contained by a frame)",frame:null,src:_(t),invokeCommand:X.invokeCommand}}var D={find:Jt};var w="unknown",G=!1,S=[],K={debug:Object.values(d),info:Object.values(d),warn:[d.abort,d.clientError,d.serverError],error:[d.clientError,d.serverError],unknown:[]},zt=t=>{if(!K[w].includes(t.type)||typeof console[w]!="function")return!1;let{detail:e}=t;if(!e.id)return!0;let r=`${t.type}-${e.id}`;return S.includes(r)?!1:(S.length>16&&S.shift(),S.push(r),!0)},Mt=t=>{if(zt(t)){let{target:e,type:r,detail:o}=t,n=o.id||"",c=o.name||"",p="";o.startedAt&&(p=`${Date.now()-o.startedAt}ms `);let I=r.split(":"),nt=I.pop(),j=`%c${I.join(":")}:%c${nt}`,st=[`%c${c}`,`%c${p}`,j];console.log(st.join(" ").replace(/\s{2,}/g," "),"color:deepskyblue","color:lime","color:darkgray",j.match(/abort|error/i)?"color:red":"color:deepskyblue",{id:n,detail:o,target:e})}};G||(G=!0,Object.values(d).forEach(t=>addEventListener(t,e=>Mt(e))));var Q={get level(){return w},set level(t){return Object.keys(K).includes(t)||(t="unknown"),w=t}};var N;function L(t,e=null){if(!t||typeof t!="object")return t;let r=new Proxy(t,{deleteProperty(o,n){return delete o[n],m(u.stateChange,document,{detail:{state:N}}),!0},set(o,n,c,p){return o[n]=L(c,this),m(u.stateChange,document,{detail:{state:N}}),!0}});if(Array.isArray(t))t.forEach((o,n)=>t[n]=L(o,r));else if(typeof t=="object")for(let[o,n]of Object.entries(t))t[o]=L(n,r);return e||(N=r),r}var Y=L;function Ht(t,e){return typeof e!="object"&&(e={}),sessionStorage.setItem(String(t),JSON.stringify(e))}function Ut(t){let e=sessionStorage.getItem(String(t));return e?JSON.parse(e):{}}var O={save:Ht,find:Ut};var tt={},Z={};function qt(t,e){removeEventListener(u.stateChange,Z[t]),Z[t]=addEventListener(u.stateChange,r=>{for(let[o,n]of Object.entries(e.current))e.initial[o]!==n&&(e.changed[o]=n);O.save(t,e)})}function Vt(t,e,r){let o=JSON.parse(e),n={name:t,signed:r,initial:s({},o),current:Y(s({},o)),changed:{}};tt[t]=n,O.save(t,n),qt(t,n),setTimeout(()=>m(u.stateLoad,document,{detail:n}))}function Wt(t){let e={name:t,initial:{},current:{},changed:{}},r=O.find(t);return s(s({},e),r)}function Xt(t){let e=`[${a.commandAttribute}]`,r=[],o=t.closest(e);for(;o;)r.push(Wt(o.getAttribute(a.commandAttribute))),o=o.parentElement.closest(e);return r}var y={initialize:Vt,collect:Xt,entries:tt};var et="0.2.1";var Gt=self.TurboBoost||{},ot={VERSION:et,active:!1,confirmation:H,logger:Q,schema:a,events:i,registerEventDelegate:f.register,get eventDelegates(){return f.events}};function rt(t,e){let r=y.collect(e).map(({name:o,signed:n,changed:c})=>({name:o,signed:n,changed:c}));return{id:t,name:e.getAttribute(a.commandAttribute),elementId:e.id.length>0?e.id:null,elementAttributes:g.buildAttributePayload(e),startedAt:Date.now(),stateCollection:r}}async function Kt(t){let e,r={};try{if(e=g.findClosestCommand(t.target),!e||!f.isRegisteredForElement(t.type,e))return;let o=z.v4(),n=D.find(e),c=v(s({},rt(o,e)),{driver:n.name,frameId:n.frame?n.frame.id:null,src:n.src}),p=await m(i.start,e,{cancelable:!0,detail:c});if(p.defaultPrevented||p.detail.confirmation&&t.defaultPrevented)return m(i.abort,e,{detail:{message:`An event handler for '${i.start}' prevented default behavior and blocked command invocation!`,source:p}});switch(n=D.find(e),c=v(s({},rt(o,e)),{driver:n.name,frameId:n.frame?n.frame.id:null,src:n.src}),x.add(c),["frame","window"].includes(n.name)&&t.preventDefault(),n.name){case"method":return n.invokeCommand(e,c);case"form":return n.invokeCommand(e,c,t);case"frame":return n.invokeCommand(n.frame,c);case"window":return n.invokeCommand(self,c)}}catch(o){m(i.clientError,e,{detail:v(s({},r),{error:o})})}}self.TurboBoost=s({},Gt);self.TurboBoost.Commands||(f.handler=Kt,f.register("click",[`[${a.commandAttribute}]`]),f.register("submit",[`form[${a.commandAttribute}]`]),f.register("change",[`input[${a.commandAttribute}]`,`select[${a.commandAttribute}]`,`textarea[${a.commandAttribute}]`]),self.TurboBoost.Commands=ot,self.TurboBoost.State={initialize:y.initialize,collect:y.collect,get entries(){return JSON.parse(JSON.stringify(y.entries))}});var Er=ot;export{Er as default};
//# sourceMappingURL=commands.js.map
