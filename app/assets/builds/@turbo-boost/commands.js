var mt=Object.defineProperty,lt=Object.defineProperties;var ft=Object.getOwnPropertyDescriptors;var V=Object.getOwnPropertySymbols;var pt=Object.prototype.hasOwnProperty,bt=Object.prototype.propertyIsEnumerable;var W=(t,e,r)=>e in t?mt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,s=(t,e)=>{for(var r in e||(e={}))pt.call(e,r)&&W(t,r,e[r]);if(V)for(var r of V(e))bt.call(e,r)&&W(t,r,e[r]);return t},p=(t,e)=>lt(t,ft(e));var gt="TurboBoost-Command",y={boost:"text/vnd.turbo-boost.html",stream:"text/vnd.turbo-stream.html",html:"text/html",xhtml:"application/xhtml+xml",json:"application/json"},ht=(t={})=>{t=s({},t);let e=(t.Accept||"").split(",").map(r=>r.trim()).filter(r=>r.length);return e.unshift(y.boost,y.stream,y.html,y.xhtml),t.Accept=[...new Set(e)].join(", "),t["Content-Type"]=y.json,t["X-Requested-With"]="XMLHttpRequest",t},vt=t=>{if(t){let[e,r,o]=t.split(", ");return{name:e,status:r,strategy:o}}return{}},f={prepare:ht,tokenize:vt,RESPONSE_HEADER:gt};var yt=t=>{document.body.insertAdjacentHTML("beforeend",t)},Et=t=>{var h,x,v,C;let r=new DOMParser().parseFromString(t,"text/html"),o=document.querySelector("head"),n=document.querySelector("body"),i=r.querySelector("head"),u=r.querySelector("body");o&&i&&((x=(h=TurboBoost==null?void 0:TurboBoost.Streams)==null?void 0:h.morph)==null||x.method(o,i)),n&&u&&((C=(v=TurboBoost==null?void 0:TurboBoost.Streams)==null?void 0:v.morph)==null||C.method(n,u))},k=(t,e)=>{if(t&&e){if(t.match(/^Append$/i))return yt(e);if(t.match(/^Replace$/i))return Et(e)}};var N={};addEventListener("turbo:before-fetch-response",t=>{let e=t.target.closest("turbo-frame");e!=null&&e.id&&(e!=null&&e.src)&&(N[e.id]=e.src);let{fetchResponse:r}=t.detail,o=r.header(f.RESPONSE_HEADER);if(!o)return;t.preventDefault();let{strategy:n}=f.tokenize(o);r.responseHTML.then(i=>k(n,i))});addEventListener("turbo:frame-load",t=>{let e=t.target.closest("turbo-frame");e.dataset.src=N[e.id]||e.src||e.dataset.src,delete N[e.id]});var At={frameAttribute:"data-turbo-frame",methodAttribute:"data-turbo-method",commandAttribute:"data-turbo-command",confirmAttribute:"data-turbo-confirm",stateAttributesAttribute:"data-turbo-boost-state-attributes"},d=s({},At);var a={start:"turbo-boost:command:start",success:"turbo-boost:command:success",finish:"turbo-boost:command:finish",abort:"turbo-boost:command:abort",clientError:"turbo-boost:command:client-error",serverError:"turbo-boost:command:server-error"},E={stateChange:"turbo-boost:state:change",stateInitialize:"turbo-boost:state:initialize"};function c(t,e,r={}){return new Promise(o=>{r=r||{},r.detail=r.detail||{},e=e||document;let n=new CustomEvent(t,p(s({},r),{bubbles:!0}));e.dispatchEvent(n),o(n)})}var w={};function St(t){w[t.id]=t}function xt(t){delete w[t]}var L={add:St,remove:xt,get commands(){return[...Object.values(w)]},get length(){return Object.keys(w).length}};var X={method:t=>Promise.resolve(confirm(t))},Ct=t=>t.detail.driver==="method",kt=t=>{if(t.detail.driver!=="form")return!1;let e=t.target,r=e.closest("turbo-frame"),o=e.closest(`[${d.frameAttribute}]`);return!!(r||o)},wt=t=>Ct(t)||kt(t);document.addEventListener(a.start,async t=>{let e=t.target.getAttribute(d.confirmAttribute);if(!e||(t.detail.confirmation=!0,wt(t)))return;await X.method(e)||t.preventDefault()});var G=X;var l=[],B;function Lt(t,e){let r=l.find(o=>o.name===t);return r&&l.splice(l.indexOf(r),1),l=[{name:t,selectors:e},...l],document.removeEventListener(t,B,!0),document.addEventListener(t,B,!0),s({},l.find(o=>o.name===t))}function Ot(t){return l.find(e=>e.selectors.find(r=>Array.from(document.querySelectorAll(r)).find(o=>o===t)))}function Tt(t,e){let r=Ot(e);return r&&r.name===t}var m={register:Lt,isRegisteredForElement:Tt,get events(){return[...l]},set handler(t){B=t}};function Rt(t){return t.closest(`[${d.commandAttribute}]`)}function Pt(t){return t.closest("turbo-frame[src]")||t.closest("turbo-frame[data-turbo-frame-src]")||t.closest("turbo-frame")}function $t(t,e={}){if(t.tagName.toLowerCase()!=="select")return e.value=t.value||null;if(!t.multiple)return e.value=t.options[t.selectedIndex].value;e.values=Array.from(t.options).reduce((r,o)=>(o.selected&&r.push(o.value),r),[])}function _t(t){let e=Array.from(t.attributes).reduce((r,o)=>{let n=o.value;return r[o.name]=n,r},{});return e.tag=t.tagName,e.checked=!!t.checked,e.disabled=!!t.disabled,$t(t,e),delete e.class,delete e.action,delete e.href,delete e[d.commandAttribute],delete e[d.frameAttribute],e}var A={buildAttributePayload:_t,findClosestCommand:Rt,findClosestFrameWithSource:Pt};var Dt=(t,e={})=>{let r=t.querySelector('input[name="turbo_boost_command"]')||document.createElement("input");r.type="hidden",r.name="turbo_boost_command",r.value=JSON.stringify(e),t.contains(r)||t.appendChild(r)},K={invokeCommand:Dt};function Nt(t){setTimeout(()=>c(a.finish,t.target,{detail:t.detail}))}var Bt=[a.abort,a.serverError,a.success];Bt.forEach(t=>addEventListener(t,Nt));addEventListener(a.finish,t=>L.remove(t.detail.id),!0);var Q={events:a};var It=t=>{let e=document.createElement("a");return e.href=t,new URL(e)},Y={get commandInvocationURL(){return It("/turbo-boost-command-invocation")}};var Z=t=>{let e=`Unexpected error performing a TurboBoost Command! ${t.message}`;c(Q.events.clientError,document,{detail:{message:e,error:t}},!0)},qt=t=>{let{strategy:e}=f.tokenize(t.headers.get(f.RESPONSE_HEADER));t.text().then(r=>k(e,r))},O=(t={})=>{try{fetch(Y.commandInvocationURL.href,{method:"POST",headers:f.prepare({}),body:JSON.stringify(t)}).then(qt).catch(Z)}catch(e){Z(e)}};var jt=(t,e)=>O(e),I={invokeCommand:jt};var S,q,zt=()=>{S=null,q=null},Ft=(t,e={})=>{S=t,q=e},Mt=t=>{try{if(!S||t.getAttribute("method")!==S.dataset.turboMethod||t.getAttribute("action")!==S.href)return;let e=t.querySelector('input[name="turbo_boost_command"]')||document.createElement("input");e.type="hidden",e.name="turbo_boost_command",e.value=JSON.stringify(q),t.contains(e)||t.appendChild(e)}finally{zt()}};document.addEventListener("submit",t=>Mt(t.target),!0);var tt={invokeCommand:Ft};var Ht=(t,e={})=>O(e),et={invokeCommand:Ht};function j(t,e){return e=e||{dataset:{}},t.href||e.src||e.dataset.src||location.href}function Jt(t){let e=A.findClosestFrameWithSource(t),{turboFrame:r,turboMethod:o}=t.dataset;return t.tagName.toLowerCase()==="form"?{name:"form",reason:"Element is a form.",frame:e,src:t.action,invokeCommand:K.invokeCommand}:o&&o.length>0?{name:"method",reason:"Element defines data-turbo-method.",frame:e,src:t.href,invokeCommand:tt.invokeCommand}:r&&r!=="_self"?(e=document.getElementById(r),{name:"frame",reason:"element targets a frame that is not _self",frame:e,src:j(t,e),invokeCommand:I.invokeCommand}):(!r||r==="_self")&&e?{name:"frame",reason:"element does NOT target a frame or targets _self and is contained by a frame",frame:e,src:j(t,e),invokeCommand:I.invokeCommand}:{name:"window",reason:"element matches one or more of the following conditions (targets _top, does NOT target a frame, is NOT contained by a frame)",frame:null,src:j(t),invokeCommand:et.invokeCommand}}var z={find:Jt};var R="unknown",rt=!1,T=[],b={debug:Object.values(a),info:Object.values(a),warn:[a.abort,a.clientError,a.serverError],error:[a.clientError,a.serverError],unknown:[]},Ut=t=>{if(!b[R].includes(t.type)||typeof console[R]!="function")return!1;let{detail:e}=t;if(!e.id)return!0;let r=`${t.type}-${e.id}`;return T.includes(r)?!1:(T.length>16&&T.shift(),T.push(r),!0)},Vt=t=>b.error.includes(t.type)?"error":b.warn.includes(t.type)?"warn":b.info.includes(t.type)?"info":b.debug.includes(t.type)?"debug":"log",Wt=t=>{if(Ut(t)){let{target:e,type:r,detail:o}=t,n=o.id||"",i=o.name||"",u="";o.startedAt&&(u=`${Date.now()-o.startedAt}ms `);let h=r.split(":"),x=h.pop(),v=`%c${h.join(":")}:%c${x}`,C=[`%c${i}`,`%c${u}`,v];console[Vt(t)](C.join(" ").replace(/\s{2,}/g," "),"color:deepskyblue","color:lime","color:darkgray",v.match(/abort|error/i)?"color:red":"color:deepskyblue",{id:n,detail:o,target:e})}};rt||(rt=!0,Object.values(a).forEach(t=>addEventListener(t,e=>Wt(e))));var ot={get level(){return R},set level(t){return Object.keys(b).includes(t)||(t="unknown"),R=t}};var F;function P(t,e=null){if(!t||typeof t!="object")return t;let r=new Proxy(t,{deleteProperty(o,n){return delete o[n],c(E.stateChange,document,{detail:{state:F}}),!0},set(o,n,i,u){return o[n]=P(i,this),c(E.stateChange,document,{detail:{state:F}}),!0}});if(Array.isArray(t))t.forEach((o,n)=>t[n]=P(o,r));else if(typeof t=="object")for(let[o,n]of Object.entries(t))t[o]=P(n,r);return e||(F=r),r}var nt=P;var at=(t,e,r,o=1)=>{if(o>20)return;let n=document.getElementById(t);if(n!=null&&n.isConnected)return n.setAttribute(e,r);setTimeout(()=>at(t,e,r,o+1),o*5)},Xt=()=>Array.from(document.querySelectorAll(`[id][${d.stateAttributesAttribute}]`)).reduce((e,r)=>{let o=JSON.parse(r.getAttribute(d.stateAttributesAttribute));return r.id&&(e[r.id]=o.reduce((n,i)=>(r.hasAttribute(i)&&(n[i]=r.getAttribute(i)||i),n),{})),e},{}),Gt=(t={})=>{for(let[e,r]of Object.entries(t))for(let[o,n]of Object.entries(r))at(e,o,n)},$={buildState:Xt,restoreState:Gt};function Kt(t,e){return typeof e!="object"&&(e={}),sessionStorage.setItem(String(t),JSON.stringify(e))}function Qt(t){let e=sessionStorage.getItem(String(t));return e?JSON.parse(e):{}}var _={save:Kt,find:Qt};var M="TurboBoost::State",st={pages:{},signed:null,unsigned:{}},H=null,D={},J=()=>{let t=s(s({},st),_.find(M));t.pages[location.pathname]=t.pages[location.pathname]||{},$.restoreState(t.pages[location.pathname])},U=()=>{let t=s(s({},st),_.find(M)),e={signed:H||t.signed,unsigned:s(s({},t.unsigned),D),pages:s({},t.pages)};e.pages[location.pathname]=s(s({},e.pages[location.pathname]),$.buildState()),_.save(M,e)},Yt=t=>{let e=JSON.parse(t);H=e.signed,D=nt(e.unsigned||{}),U(),c(E.stateInitialize,document,{detail:D})};addEventListener("DOMContentLoaded",J);addEventListener("turbo:morph",J);addEventListener("turbo:render",J);addEventListener("turbo:before-fetch-request",U);addEventListener("beforeunload",U);var g={initialize:Yt,buildPageState:$.buildState,get signed(){return H},get unsigned(){return D}};function Zt(){return("10000000-1000-4000-8000"+-1e11).replace(/[018]/g,t=>(t^crypto.getRandomValues(new Uint8Array(1))[0]&15>>t/4).toString(16))}var it={v4:Zt};var dt="0.2.2";var te=self.TurboBoost||{},ut={VERSION:dt,active:!1,confirmation:G,logger:ot,schema:d,events:a,registerEventDelegate:m.register,get eventDelegates(){return m.events}};function ct(t,e){return{id:t,name:e.getAttribute(d.commandAttribute),elementId:e.id.length>0?e.id:null,elementAttributes:A.buildAttributePayload(e),startedAt:Date.now(),state:{page:g.buildPageState(),signed:g.signed,unsigned:g.unsigned}}}async function ee(t){let e,r={};try{if(e=A.findClosestCommand(t.target),!e||!m.isRegisteredForElement(t.type,e))return;let o=it.v4(),n=z.find(e),i=p(s({},ct(o,e)),{driver:n.name,frameId:n.frame?n.frame.id:null,src:n.src}),u=await c(a.start,e,{cancelable:!0,detail:i});if(u.defaultPrevented||u.detail.confirmation&&t.defaultPrevented)return c(a.abort,e,{detail:{message:`An event handler for '${a.start}' prevented default behavior and blocked command invocation!`,source:u}});switch(n=z.find(e),i=p(s({},ct(o,e)),{driver:n.name,frameId:n.frame?n.frame.id:null,src:n.src}),L.add(i),["frame","window"].includes(n.name)&&t.preventDefault(),n.name){case"method":return n.invokeCommand(e,i);case"form":return n.invokeCommand(e,i,t);case"frame":return n.invokeCommand(n.frame,i);case"window":return n.invokeCommand(self,i)}}catch(o){c(a.clientError,e,{detail:p(s({},r),{error:o})})}}self.TurboBoost=s({},te);self.TurboBoost.Commands||(m.handler=ee,m.register("click",[`[${d.commandAttribute}]`]),m.register("submit",[`form[${d.commandAttribute}]`]),m.register("toggle",[`details[${d.commandAttribute}]`]),m.register("change",[`input[${d.commandAttribute}]`,`select[${d.commandAttribute}]`,`textarea[${d.commandAttribute}]`]),self.TurboBoost.Commands=ut,self.TurboBoost.State={initialize:g.initialize,get current(){return g.unsigned}});var gr=ut;export{gr as default};
//# sourceMappingURL=commands.js.map
