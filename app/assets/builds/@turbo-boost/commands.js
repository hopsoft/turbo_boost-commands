var tt=Object.defineProperty,et=Object.defineProperties;var rt=Object.getOwnPropertyDescriptors;var B=Object.getOwnPropertySymbols;var ot=Object.prototype.hasOwnProperty,nt=Object.prototype.propertyIsEnumerable;var M=(t,e,r)=>e in t?tt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,a=(t,e)=>{for(var r in e||(e={}))ot.call(e,r)&&M(t,r,e[r]);if(B)for(var r of B(e))nt.call(e,r)&&M(t,r,e[r]);return t},p=(t,e)=>et(t,rt(e));var I={};addEventListener("turbo:frame-load",t=>{let e=t.target.closest("turbo-frame");e.dataset.src=I[e.id]||e.src||e.dataset.src,delete I[e.id]});var at={frameAttribute:"data-turbo-frame",methodAttribute:"data-turbo-method",commandAttribute:"data-turbo-command",confirmAttribute:"data-turbo-confirm"},s=a({},at);var i={start:"turbo-boost:command:start",success:"turbo-boost:command:success",finish:"turbo-boost:command:finish",abort:"turbo-boost:command:abort",clientError:"turbo-boost:command:client-error",serverError:"turbo-boost:command:server-error"},u={stateLoad:"turbo-boost:state:load",stateChange:"turbo-boost:state:change"},c=a(a({},i),u);function m(t,e,r={}){return new Promise(o=>{r=r||{},r.detail=r.detail||{},e=e||document;let n=new CustomEvent(t,p(a({},r),{bubbles:!0}));e.dispatchEvent(n),o(n)})}var E={};function st(t){E[t.id]=t}function it(t){delete E[t]}var y={add:st,remove:it,get commands(){return[...Object.values(E)]},get length(){return Object.keys(E).length}};var F={method:t=>Promise.resolve(confirm(t))},mt=t=>t.detail.driver==="method",dt=t=>{if(t.detail.driver!=="form")return!1;let e=t.target,r=e.closest("turbo-frame"),o=e.closest(`[${s.frameAttribute}]`);return!!(r||o)},ct=t=>mt(t)||dt(t);document.addEventListener(i.start,async t=>{let e=t.target.getAttribute(s.confirmAttribute);if(!e||(t.detail.confirmation=!0,ct(t)))return;await F.method(e)||t.preventDefault()});var H=F;var l=[],L;function ut(t,e){let r=l.find(o=>o.name===t);return r&&l.splice(l.indexOf(r),1),l=[{name:t,selectors:e},...l],document.removeEventListener(t,L,!0),document.addEventListener(t,L,!0),a({},l.find(o=>o.name===t))}function lt(t){return l.find(e=>e.selectors.find(r=>Array.from(document.querySelectorAll(r)).find(o=>o===t)))}function ft(t,e){let r=lt(e);return r&&r.name===t}var f={register:ut,isRegisteredForElement:ft,get events(){return[...l]},set handler(t){L=t}};function N(t){t.detail.endedAt=Date.now(),t.detail.milliseconds=t.detail.endedAt-t.detail.startedAt,setTimeout(()=>m(i.finish,t.target,{detail:t.detail}),25)}addEventListener(i.serverError,N);addEventListener(i.success,N);addEventListener(i.finish,t=>y.remove(t.detail.id),!0);var S={events:i};function pt(t){return t.closest(`[${s.commandAttribute}]`)}function bt(t){return t.closest("turbo-frame[src]")||t.closest("turbo-frame[data-turbo-frame-src]")||t.closest("turbo-frame")}function vt(t,e={}){if(t.tagName.toLowerCase()!=="select")return e.value=t.value||null;if(!t.multiple)return e.value=t.options[t.selectedIndex].value;e.values=Array.from(t.options).reduce((r,o)=>(o.selected&&r.push(o.value),r),[])}function ht(t){let e=Array.from(t.attributes).reduce((r,o)=>{let n=o.value;return r[o.name]=n,r},{});return e.tag=t.tagName,e.checked=!!t.checked,e.disabled=!!t.disabled,vt(t,e),delete e.class,delete e.action,delete e.href,delete e[s.commandAttribute],delete e[s.frameAttribute],e}var b={buildAttributePayload:ht,findClosestCommand:pt,findClosestFrameWithSource:bt};function gt(t,e={},r={}){let o=t.querySelector('input[name="turbo_boost_command"]')||document.createElement("input");o.type="hidden",o.name="turbo_boost_command",o.value=JSON.stringify(e),t.appendChild(o)}var j={invokeCommand:gt};var Et="TurboBoost-Command",v={boost:"text/vnd.turbo-boost.html",stream:"text/vnd.turbo-stream.html",html:"text/html",xhtml:"application/xhtml+xml",json:"application/json"},yt=(t={})=>{t=a({},t);let e=(t.Accept||"").split(",").map(r=>r.trim()).filter(r=>r.length);return e.unshift(v.boost,v.stream,v.html,v.xhtml),t.Accept=[...new Set(e)].join(", "),t["Content-Type"]=v.json,t["X-Requested-With"]="XMLHttpRequest",t},xt=t=>{if(t){let[e,r,o]=t.split(", ");return{status:e,strategy:r,name:o}}return{}},x={prepare:yt,tokenize:xt,RESPONSE_HEADER:Et};var T;function C(t,e=null){if(!t||typeof t!="object")return t;let r=new Proxy(t,{deleteProperty(o,n){return delete o[n],m(u.stateChange,document,{detail:{state:T}}),!0},set(o,n,d,g){return o[n]=C(d,this),m(u.stateChange,document,{detail:{state:T}}),!0}});if(Array.isArray(t))t.forEach((o,n)=>t[n]=C(o,r));else if(typeof t=="object")for(let[o,n]of Object.entries(t))t[o]=C(n,r);return e||(T=r),r}var U=C;var O,A,R,X;function Ct(t,e){let r=JSON.parse(t);O=a({},r),X=e,A=U(r),R={},setTimeout(()=>m(u.stateLoad,document,{detail:{state:A}}))}addEventListener(u.stateChange,t=>{for(let[e,r]of Object.entries(A))O[e]!==r&&(R[e]=r)});var h={initialize:Ct,events:u,get initial(){return O},get current(){return A},get changed(){return R},get signed(){return X}};var At=t=>{let e=document.createElement("a");return e.href=t,new URL(e)},q={get commandInvocationURL(){return At("/turbo-boost-command-invocation")}};var kt=t=>{document.body.insertAdjacentHTML("beforeend",t)},wt=t=>{let r=new DOMParser().parseFromString(t,"text/html");document.head.innerHTML=r.head.innerHTML,document.body.innerHTML=r.body.innerHTML},D=(t,e)=>{if(t.match(/^Append$/i))return kt(e);if(t.match(/^Replace$/i))return wt(e)};var z=t=>{let e=`Unexpected error performing a TurboBoost Command! ${t.message}`;m(S.events.clientError,document,{detail:{error:e}},!0)},Lt=t=>{let e=t.status>=200&&t.status<=399,r=x.tokenize(t.headers.get(x.RESPONSE_HEADER)).strategy;if(e)return t.text().then(n=>D(r,n));let o=`Server returned a ${t.status} status code! TurboBoost Commands require 2XX-3XX status codes.`;m(S.events.clientError,document,{detail:{error:o,response:t}},!0),t.text().then(n=>D(r,n))},k=(t={})=>{try{fetch(q.commandInvocationURL.href,{method:"POST",headers:x.prepare({}),body:JSON.stringify(t)}).then(Lt).catch(z)}catch(e){z(e)}};var St=(t,e)=>k(e),P={invokeCommand:St};function Tt(t,e={}){}var J={invokeCommand:Tt};var Ot=(t,e={})=>k(e),V={invokeCommand:Ot};function _(t,e){return e=e||{dataset:{}},t.href||e.src||e.dataset.src||location.href}function Rt(t){let e=b.findClosestFrameWithSource(t),{turboFrame:r,turboMethod:o}=t.dataset;return t.tagName.toLowerCase()==="form"?{name:"form",reason:"Element is a form.",frame:e,src:t.action,invokeCommand:j.invokeCommand}:o&&o.length>0?{name:"method",reason:"Element defines data-turbo-method.",frame:e,src:t.href,invokeCommand:J.invokeCommand}:r&&r!=="_self"?(e=document.getElementById(r),{name:"frame",reason:"element targets a frame that is not _self",frame:e,src:_(t,e),invokeCommand:P.invokeCommand}):(!r||r==="_self")&&e?{name:"frame",reason:"element does NOT target a frame or targets _self and is contained by a frame",frame:e,src:_(t,e),invokeCommand:P.invokeCommand}:{name:"window",reason:"element matches one or more of the following conditions (targets _top, does NOT target a frame, is NOT contained by a frame)",frame:null,src:_(t),invokeCommand:V.invokeCommand}}var $={find:Rt};var w="unknown",W={debug:Object.values(c),info:Object.values(c),warn:[c.abort,c.clientError,c.serverError],error:[c.clientError,c.serverError],unknown:[]};Object.values(c).forEach(t=>{addEventListener(t,e=>{if(W[w].includes(e.type)){let{target:r,detail:o}=e;console[w](e.type,{target:r,detail:o})}})});var G={get level(){return w},set level(t){return Object.keys(W).includes(t)||(t="unknown"),w=t}};function Dt(){return("10000000-1000-4000-8000"+-1e11).replace(/[018]/g,t=>(t^crypto.getRandomValues(new Uint8Array(1))[0]&15>>t/4).toString(16))}var K={v4:Dt};var Q="0.1.2";var Pt=self.TurboBoost||{},Z={VERSION:Q,active:!1,confirmation:H,logger:G,schema:s,events:i,registerEventDelegate:f.register,get eventDelegates(){return f.events}};function Y(t,e){return{id:t,name:e.getAttribute(s.commandAttribute),elementId:e.id.length>0?e.id:null,elementAttributes:b.buildAttributePayload(e),startedAt:Date.now(),changedState:h.changed,clientState:h.current,signedState:h.signed}}async function _t(t){let e,r={};try{if(e=b.findClosestCommand(t.target),!e||!f.isRegisteredForElement(t.type,e))return;let o=`turbo-command-${K.v4()}`,n=$.find(e),d=p(a({},Y(o,e)),{driver:n.name,frameId:n.frame?n.frame.id:null,src:n.src}),g=await m(i.start,e,{cancelable:!0,detail:d});if(g.defaultPrevented||g.detail.confirmation&&t.defaultPrevented)return m(i.abort,e,{detail:{message:`An event handler for '${i.start}' prevented default behavior and blocked command invocation!`,source:g}});switch(n=$.find(e),d=p(a({},Y(o,e)),{driver:n.name,frameId:n.frame?n.frame.id:null,src:n.src}),y.add(d),["frame","window"].includes(n.name)&&t.preventDefault(),n.name){case"method":return n.invokeCommand(e,d);case"form":return n.invokeCommand(e,d,t);case"frame":return n.invokeCommand(n.frame,d);case"window":return n.invokeCommand(self,d)}}catch(o){m(i.clientError,e,{detail:p(a({},r),{error:o})})}}self.TurboBoost=a({},Pt);self.TurboBoost.Commands||(f.handler=_t,f.register("click",[`[${s.commandAttribute}]`]),f.register("submit",[`form[${s.commandAttribute}]`]),f.register("change",[`input[${s.commandAttribute}]`,`select[${s.commandAttribute}]`,`textarea[${s.commandAttribute}]`]),self.TurboBoost.Commands=Z,self.TurboBoost.State=h);var Ve=Z;export{Ve as default};
//# sourceMappingURL=commands.js.map
