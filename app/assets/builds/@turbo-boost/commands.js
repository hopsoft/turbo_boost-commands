var nt=Object.defineProperty,at=Object.defineProperties;var st=Object.getOwnPropertyDescriptors;var I=Object.getOwnPropertySymbols;var it=Object.prototype.hasOwnProperty,dt=Object.prototype.propertyIsEnumerable;var M=(t,e,r)=>e in t?nt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,a=(t,e)=>{for(var r in e||(e={}))it.call(e,r)&&M(t,r,e[r]);if(I)for(var r of I(e))dt.call(e,r)&&M(t,r,e[r]);return t},v=(t,e)=>at(t,st(e));var mt="TurboBoost-Command",h={boost:"text/vnd.turbo-boost.html",stream:"text/vnd.turbo-stream.html",html:"text/html",xhtml:"application/xhtml+xml",json:"application/json"},ct=(t={})=>{t=a({},t);let e=(t.Accept||"").split(",").map(r=>r.trim()).filter(r=>r.length);return e.unshift(h.boost,h.stream,h.html,h.xhtml),t.Accept=[...new Set(e)].join(", "),t["Content-Type"]=h.json,t["X-Requested-With"]="XMLHttpRequest",t},ut=t=>{if(t){let[e,r,o]=t.split(", ");return{status:e,strategy:r,name:o}}return{}},b={prepare:ct,tokenize:ut,RESPONSE_HEADER:mt};var x={};function lt(t){x[t.id]=t}function ft(t){delete x[t]}var k={add:lt,remove:ft,get commands(){return[...Object.values(x)]},get length(){return Object.keys(x).length}};var i={start:"turbo-boost:command:start",success:"turbo-boost:command:success",finish:"turbo-boost:command:finish",abort:"turbo-boost:command:abort",clientError:"turbo-boost:command:client-error",serverError:"turbo-boost:command:server-error"},l={stateLoad:"turbo-boost:state:load",stateChange:"turbo-boost:state:change"},c=a(a({},i),l);function s(t,e,r={}){return new Promise(o=>{r=r||{},r.detail=r.detail||{},e=e||document;let n=new CustomEvent(t,v(a({},r),{bubbles:!0}));e.dispatchEvent(n),o(n)})}function j(t){t.detail.endedAt=Date.now(),t.detail.milliseconds=t.detail.endedAt-t.detail.startedAt,setTimeout(()=>s(i.finish,t.target,{detail:t.detail}),25)}addEventListener(i.serverError,j);addEventListener(i.success,j);addEventListener(i.finish,t=>k.remove(t.detail.id),!0);var g={events:i};function pt(){return("10000000-1000-4000-8000"+-1e11).replace(/[018]/g,t=>(t^crypto.getRandomValues(new Uint8Array(1))[0]&15>>t/4).toString(16))}var q={v4:pt};var bt=t=>{document.body.insertAdjacentHTML("beforeend",t)},vt=t=>{let r=new DOMParser().parseFromString(t,"text/html");TurboBoost.Streams.morph.method(document.documentElement,r.documentElement)},S=(t,e)=>{if(t.match(/^Append$/i))return bt(e);if(t.match(/^Replace$/i))return vt(e)};var R={};addEventListener("turbo:before-fetch-response",t=>{let e=t.target.closest("turbo-frame");e!=null&&e.id&&(e!=null&&e.src)&&(R[e.id]=e.src);let{fetchResponse:r}=t.detail,o=r.header(b.RESPONSE_HEADER);if(!o)return;t.preventDefault();let{statusCode:n}=r,{strategy:m}=b.tokenize(o);if(n<200||n>399){let u=`Server returned a ${status} status code! TurboBoost Commands require 2XX-3XX status codes.`;s(g.events.clientError,document,{detail:{error:u,response:r}},!0)}r.responseHTML.then(u=>S(m,u))});addEventListener("turbo:frame-load",t=>{let e=t.target.closest("turbo-frame");e.dataset.src=R[e.id]||e.src||e.dataset.src,delete R[e.id]});var ht={frameAttribute:"data-turbo-frame",methodAttribute:"data-turbo-method",commandAttribute:"data-turbo-command",confirmAttribute:"data-turbo-confirm"},d=a({},ht);var H={method:t=>Promise.resolve(confirm(t))},gt=t=>t.detail.driver==="method",Et=t=>{if(t.detail.driver!=="form")return!1;let e=t.target,r=e.closest("turbo-frame"),o=e.closest(`[${d.frameAttribute}]`);return!!(r||o)},yt=t=>gt(t)||Et(t);document.addEventListener(i.start,async t=>{let e=t.target.getAttribute(d.confirmAttribute);if(!e||(t.detail.confirmation=!0,yt(t)))return;await H.method(e)||t.preventDefault()});var U=H;var f=[],_;function Ct(t,e){let r=f.find(o=>o.name===t);return r&&f.splice(f.indexOf(r),1),f=[{name:t,selectors:e},...f],document.removeEventListener(t,_,!0),document.addEventListener(t,_,!0),a({},f.find(o=>o.name===t))}function At(t){return f.find(e=>e.selectors.find(r=>Array.from(document.querySelectorAll(r)).find(o=>o===t)))}function xt(t,e){let r=At(e);return r&&r.name===t}var p={register:Ct,isRegisteredForElement:xt,get events(){return[...f]},set handler(t){_=t}};function kt(t){return t.closest(`[${d.commandAttribute}]`)}function St(t){return t.closest("turbo-frame[src]")||t.closest("turbo-frame[data-turbo-frame-src]")||t.closest("turbo-frame")}function wt(t,e={}){if(t.tagName.toLowerCase()!=="select")return e.value=t.value||null;if(!t.multiple)return e.value=t.options[t.selectedIndex].value;e.values=Array.from(t.options).reduce((r,o)=>(o.selected&&r.push(o.value),r),[])}function Lt(t){let e=Array.from(t.attributes).reduce((r,o)=>{let n=o.value;return r[o.name]=n,r},{});return e.tag=t.tagName,e.checked=!!t.checked,e.disabled=!!t.disabled,wt(t,e),delete e.class,delete e.action,delete e.href,delete e[d.commandAttribute],delete e[d.frameAttribute],e}var E={buildAttributePayload:Lt,findClosestCommand:kt,findClosestFrameWithSource:St};var Tt=(t,e={})=>{let r=t.querySelector('input[name="turbo_boost_command"]')||document.createElement("input");r.type="hidden",r.name="turbo_boost_command",r.value=JSON.stringify(e),t.contains(r)||t.appendChild(r)},z={invokeCommand:Tt};var D;function w(t,e=null){if(!t||typeof t!="object")return t;let r=new Proxy(t,{deleteProperty(o,n){return delete o[n],s(l.stateChange,document,{detail:{state:D}}),!0},set(o,n,m,u){return o[n]=w(m,this),s(l.stateChange,document,{detail:{state:D}}),!0}});if(Array.isArray(t))t.forEach((o,n)=>t[n]=w(o,r));else if(typeof t=="object")for(let[o,n]of Object.entries(t))t[o]=w(n,r);return e||(D=r),r}var J=w;var P,L,$,V;function Ot(t,e){let r=JSON.parse(t);P=a({},r),V=e,L=J(r),$={},setTimeout(()=>s(l.stateLoad,document,{detail:{state:L}}))}addEventListener(l.stateChange,t=>{for(let[e,r]of Object.entries(L))P[e]!==r&&($[e]=r)});var y={initialize:Ot,events:l,get initial(){return P},get current(){return L},get changed(){return $},get signed(){return V}};var Rt=t=>{let e=document.createElement("a");return e.href=t,new URL(e)},W={get commandInvocationURL(){return Rt("/turbo-boost-command-invocation")}};var G=t=>{let e=`Unexpected error performing a TurboBoost Command! ${t.message}`;s(g.events.clientError,document,{detail:{error:e}},!0)},_t=t=>{let{strategy:e}=b.tokenize(t.headers.get(b.RESPONSE_HEADER));if(t.status<200||t.status>399){let r=`Server returned a ${t.status} status code! TurboBoost Commands require 2XX-3XX status codes.`;s(g.events.serverError,document,{detail:{error:r,response:t}},!0)}t.text().then(r=>S(e,r))},T=(t={})=>{try{fetch(W.commandInvocationURL.href,{method:"POST",headers:b.prepare({}),body:JSON.stringify(t)}).then(_t).catch(G)}catch(e){G(e)}};var Dt=(t,e)=>T(e),B={invokeCommand:Dt};var C,N,Pt=()=>{C=null,N=null},$t=(t,e={})=>{C=t,N=e},Bt=t=>{try{if(!C||t.getAttribute("method")!==C.dataset.turboMethod||t.getAttribute("action")!==C.href)return;let e=t.querySelector('input[name="turbo_boost_command"]')||document.createElement("input");e.type="hidden",e.name="turbo_boost_command",e.value=JSON.stringify(N),t.contains(e)||t.appendChild(e)}finally{Pt()}};document.addEventListener("submit",t=>Bt(t.target),!0);var K={invokeCommand:$t};var Nt=(t,e={})=>T(e),Q={invokeCommand:Nt};function X(t,e){return e=e||{dataset:{}},t.href||e.src||e.dataset.src||location.href}function Xt(t){let e=E.findClosestFrameWithSource(t),{turboFrame:r,turboMethod:o}=t.dataset;return t.tagName.toLowerCase()==="form"?{name:"form",reason:"Element is a form.",frame:e,src:t.action,invokeCommand:z.invokeCommand}:o&&o.length>0?{name:"method",reason:"Element defines data-turbo-method.",frame:e,src:t.href,invokeCommand:K.invokeCommand}:r&&r!=="_self"?(e=document.getElementById(r),{name:"frame",reason:"element targets a frame that is not _self",frame:e,src:X(t,e),invokeCommand:B.invokeCommand}):(!r||r==="_self")&&e?{name:"frame",reason:"element does NOT target a frame or targets _self and is contained by a frame",frame:e,src:X(t,e),invokeCommand:B.invokeCommand}:{name:"window",reason:"element matches one or more of the following conditions (targets _top, does NOT target a frame, is NOT contained by a frame)",frame:null,src:X(t),invokeCommand:Q.invokeCommand}}var F={find:Xt};var A="unknown",Y=!1,O=[],Z={debug:Object.values(c),info:Object.values(c),warn:[c.abort,c.clientError,c.serverError],error:[c.clientError,c.serverError],unknown:[]},Ft=t=>{if(!Z[A].includes(t.type)||typeof console[A]!="function")return!1;let{detail:e}=t;if(!e.id)return!0;let r=`${t.type}-${e.id}`;return O.includes(r)?!1:(O.length>16&&O.shift(),O.push(r),!0)},It=t=>{if(Ft(t)){let{target:e,type:r,detail:o}=t;console[A](r,o.id||"",{target:e,detail:o})}};Y||(Y=!0,Object.values(c).forEach(t=>addEventListener(t,e=>It(e))));var tt={get level(){return A},set level(t){return Object.keys(Z).includes(t)||(t="unknown"),A=t}};var et="0.2.0";var Mt=self.TurboBoost||{},ot={VERSION:et,active:!1,confirmation:U,logger:tt,schema:d,events:i,registerEventDelegate:p.register,get eventDelegates(){return p.events}};function rt(t,e){return{id:t,name:e.getAttribute(d.commandAttribute),elementId:e.id.length>0?e.id:null,elementAttributes:E.buildAttributePayload(e),startedAt:Date.now(),changedState:y.changed,clientState:y.current,signedState:y.signed}}async function jt(t){let e,r={};try{if(e=E.findClosestCommand(t.target),!e||!p.isRegisteredForElement(t.type,e))return;let o=`turbo-command-${q.v4()}`,n=F.find(e),m=v(a({},rt(o,e)),{driver:n.name,frameId:n.frame?n.frame.id:null,src:n.src}),u=await s(i.start,e,{cancelable:!0,detail:m});if(u.defaultPrevented||u.detail.confirmation&&t.defaultPrevented)return s(i.abort,e,{detail:{message:`An event handler for '${i.start}' prevented default behavior and blocked command invocation!`,source:u}});switch(n=F.find(e),m=v(a({},rt(o,e)),{driver:n.name,frameId:n.frame?n.frame.id:null,src:n.src}),k.add(m),["frame","window"].includes(n.name)&&t.preventDefault(),n.name){case"method":return n.invokeCommand(e,m);case"form":return n.invokeCommand(e,m,t);case"frame":return n.invokeCommand(n.frame,m);case"window":return n.invokeCommand(self,m)}}catch(o){s(i.clientError,e,{detail:v(a({},r),{error:o})})}}self.TurboBoost=a({},Mt);self.TurboBoost.Commands||(p.handler=jt,p.register("click",[`[${d.commandAttribute}]`]),p.register("submit",[`form[${d.commandAttribute}]`]),p.register("change",[`input[${d.commandAttribute}]`,`select[${d.commandAttribute}]`,`textarea[${d.commandAttribute}]`]),self.TurboBoost.Commands=ot,self.TurboBoost.State=y);var ir=ot;export{ir as default};
//# sourceMappingURL=commands.js.map
