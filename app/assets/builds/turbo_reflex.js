var n={};function c(e,t){return t=t.toLowerCase(),n[e]===t||!Object.values(n).includes(t)&&n[e]==="*"}function l(e){let t=e.dataset.turboReflexFrame;return t||console.error("The reflex element does not specify a frame!","Please set the 'data-turbo-reflex-frame' attribute.",e),t}function m(e){let t=document.getElementById(e);return t||console.error(`The frame '${e}' does not exist!`),t}function d(e){let t=document.createElement("a");return t.href=e,new URL(t)}function h(e){let t=Array.from(e.attributes).reduce((r,a)=>(a.name.includes("data-turbo-reflex")||(r[a.name]=a.value),r),{});return t.tagName=e.tagName,t.value=e.value,t}function f(e){let t=e.target.closest("[data-turbo-reflex]");if(!t||!c(e.type,e.target.tagName))return;e.preventDefault(),e.stopPropagation();let r=l(t);if(!r)return;let a=m(r);if(!a)return;let s=a.dataset.turboReflexFrameSrc;if(!s)return;let u={name:t.dataset.turboReflex,frame:r,element:h(t)},i=d(s);i.searchParams.set("turbo_reflex",JSON.stringify(u)),a.src=i.toString()}function o(e,t){t.forEach(r=>n[e]=r.toLowerCase()),document.removeEventListener(e,f,!0),document.addEventListener(e,f,!0)}o("change",["input","select","textarea"]);o("submit",["form"]);o("click",["*"]);var b={registerEvent:o,registeredEvents:n};export{b as default};
//# sourceMappingURL=turbo_reflex.js.map
