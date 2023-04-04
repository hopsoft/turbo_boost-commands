var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a, prop, b2[prop]);
    }
  return a;
};
var __spreadProps = (a, b2) => __defProps(a, __getOwnPropDescs(b2));

// node_modules/@turbo-boost/streams/app/assets/builds/@turbo-boost/streams.js
var fr = Object.defineProperty;
var dr = Object.defineProperties;
var pr = Object.getOwnPropertyDescriptors;
var jt = Object.getOwnPropertySymbols;
var _r = Object.prototype.hasOwnProperty;
var hr = Object.prototype.propertyIsEnumerable;
var Kt = (e, t, n) => t in e ? fr(e, t, { enumerable: true, configurable: true, writable: true, value: n }) : e[t] = n;
var W = (e, t) => {
  for (var n in t || (t = {}))
    _r.call(t, n) && Kt(e, n, t[n]);
  if (jt)
    for (var n of jt(t))
      hr.call(t, n) && Kt(e, n, t[n]);
  return e;
};
var Ee = (e, t) => dr(e, pr(t));
var Ze = false;
var Qe = false;
var G = [];
function gr(e) {
  vr(e);
}
function vr(e) {
  G.includes(e) || G.push(e), yr();
}
function Ut(e) {
  let t = G.indexOf(e);
  t !== -1 && G.splice(t, 1);
}
function yr() {
  !Qe && !Ze && (Ze = true, queueMicrotask(xr));
}
function xr() {
  Ze = false, Qe = true;
  for (let e = 0; e < G.length; e++)
    G[e]();
  G.length = 0, Qe = false;
}
var ie;
var oe;
var ge;
var Yt;
var Xe = true;
function mr(e) {
  Xe = false, e(), Xe = true;
}
function br(e) {
  ie = e.reactive, ge = e.release, oe = (t) => e.effect(t, { scheduler: (n) => {
    Xe ? gr(n) : n();
  } }), Yt = e.raw;
}
function Ft(e) {
  oe = e;
}
function wr(e) {
  let t = () => {
  };
  return [(r) => {
    let i = oe(r);
    return e._x_effects || (e._x_effects = /* @__PURE__ */ new Set(), e._x_runEffects = () => {
      e._x_effects.forEach((o) => o());
    }), e._x_effects.add(i), t = () => {
      i !== void 0 && (e._x_effects.delete(i), ge(i));
    }, i;
  }, () => {
    t();
  }];
}
var Gt = [];
var Jt = [];
var Zt = [];
function Er(e) {
  Zt.push(e);
}
function Qt(e, t) {
  typeof t == "function" ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t)) : (t = e, Jt.push(t));
}
function Ar(e) {
  Gt.push(e);
}
function Sr(e, t, n) {
  e._x_attributeCleanups || (e._x_attributeCleanups = {}), e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []), e._x_attributeCleanups[t].push(n);
}
function Xt(e, t) {
  e._x_attributeCleanups && Object.entries(e._x_attributeCleanups).forEach(([n, r]) => {
    (t === void 0 || t.includes(n)) && (r.forEach((i) => i()), delete e._x_attributeCleanups[n]);
  });
}
var pt = new MutationObserver(vt);
var _t = false;
function ht() {
  pt.observe(document, { subtree: true, childList: true, attributes: true, attributeOldValue: true }), _t = true;
}
function en() {
  Or(), pt.disconnect(), _t = false;
}
var de = [];
var Ue = false;
function Or() {
  de = de.concat(pt.takeRecords()), de.length && !Ue && (Ue = true, queueMicrotask(() => {
    Tr(), Ue = false;
  }));
}
function Tr() {
  vt(de), de.length = 0;
}
function C(e) {
  if (!_t)
    return e();
  en();
  let t = e();
  return ht(), t;
}
var gt = false;
var Oe = [];
function Mr() {
  gt = true;
}
function Cr() {
  gt = false, vt(Oe), Oe = [];
}
function vt(e) {
  if (gt) {
    Oe = Oe.concat(e);
    return;
  }
  let t = [], n = [], r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (let o = 0; o < e.length; o++)
    if (!e[o].target._x_ignoreMutationObserver && (e[o].type === "childList" && (e[o].addedNodes.forEach((a) => a.nodeType === 1 && t.push(a)), e[o].removedNodes.forEach((a) => a.nodeType === 1 && n.push(a))), e[o].type === "attributes")) {
      let a = e[o].target, s = e[o].attributeName, u = e[o].oldValue, l = () => {
        r.has(a) || r.set(a, []), r.get(a).push({ name: s, value: a.getAttribute(s) });
      }, f = () => {
        i.has(a) || i.set(a, []), i.get(a).push(s);
      };
      a.hasAttribute(s) && u === null ? l() : a.hasAttribute(s) ? (f(), l()) : f();
    }
  i.forEach((o, a) => {
    Xt(a, o);
  }), r.forEach((o, a) => {
    Gt.forEach((s) => s(a, o));
  });
  for (let o of n)
    if (!t.includes(o) && (Jt.forEach((a) => a(o)), o._x_cleanups))
      for (; o._x_cleanups.length; )
        o._x_cleanups.pop()();
  t.forEach((o) => {
    o._x_ignoreSelf = true, o._x_ignore = true;
  });
  for (let o of t)
    n.includes(o) || o.isConnected && (delete o._x_ignoreSelf, delete o._x_ignore, Zt.forEach((a) => a(o)), o._x_ignore = true, o._x_ignoreSelf = true);
  t.forEach((o) => {
    delete o._x_ignoreSelf, delete o._x_ignore;
  }), t = null, n = null, r = null, i = null;
}
function tn(e) {
  return ye(te(e));
}
function ve(e, t, n) {
  return e._x_dataStack = [t, ...te(n || e)], () => {
    e._x_dataStack = e._x_dataStack.filter((r) => r !== t);
  };
}
function Dt(e, t) {
  let n = e._x_dataStack[0];
  Object.entries(t).forEach(([r, i]) => {
    n[r] = i;
  });
}
function te(e) {
  return e._x_dataStack ? e._x_dataStack : typeof ShadowRoot == "function" && e instanceof ShadowRoot ? te(e.host) : e.parentNode ? te(e.parentNode) : [];
}
function ye(e) {
  let t = new Proxy({}, { ownKeys: () => Array.from(new Set(e.flatMap((n) => Object.keys(n)))), has: (n, r) => e.some((i) => i.hasOwnProperty(r)), get: (n, r) => (e.find((i) => {
    if (i.hasOwnProperty(r)) {
      let o = Object.getOwnPropertyDescriptor(i, r);
      if (o.get && o.get._x_alreadyBound || o.set && o.set._x_alreadyBound)
        return true;
      if ((o.get || o.set) && o.enumerable) {
        let a = o.get, s = o.set, u = o;
        a = a && a.bind(t), s = s && s.bind(t), a && (a._x_alreadyBound = true), s && (s._x_alreadyBound = true), Object.defineProperty(i, r, Ee(W({}, u), { get: a, set: s }));
      }
      return true;
    }
    return false;
  }) || {})[r], set: (n, r, i) => {
    let o = e.find((a) => a.hasOwnProperty(r));
    return o ? o[r] = i : e[e.length - 1][r] = i, true;
  } });
  return t;
}
function nn(e) {
  let t = (r) => typeof r == "object" && !Array.isArray(r) && r !== null, n = (r, i = "") => {
    Object.entries(Object.getOwnPropertyDescriptors(r)).forEach(([o, { value: a, enumerable: s }]) => {
      if (s === false || a === void 0)
        return;
      let u = i === "" ? o : `${i}.${o}`;
      typeof a == "object" && a !== null && a._x_interceptor ? r[o] = a.initialize(e, u, o) : t(a) && a !== r && !(a instanceof Element) && n(a, u);
    });
  };
  return n(e);
}
function rn(e, t = () => {
}) {
  let n = { initialValue: void 0, _x_interceptor: true, initialize(r, i, o) {
    return e(this.initialValue, () => Nr(r, i), (a) => et(r, i, a), i, o);
  } };
  return t(n), (r) => {
    if (typeof r == "object" && r !== null && r._x_interceptor) {
      let i = n.initialize.bind(n);
      n.initialize = (o, a, s) => {
        let u = r.initialize(o, a, s);
        return n.initialValue = u, i(o, a, s);
      };
    } else
      n.initialValue = r;
    return n;
  };
}
function Nr(e, t) {
  return t.split(".").reduce((n, r) => n[r], e);
}
function et(e, t, n) {
  if (typeof t == "string" && (t = t.split(".")), t.length === 1)
    e[t[0]] = n;
  else {
    if (t.length === 0)
      throw error;
    return e[t[0]] || (e[t[0]] = {}), et(e[t[0]], t.slice(1), n);
  }
}
var on = {};
function L(e, t) {
  on[e] = t;
}
function tt(e, t) {
  return Object.entries(on).forEach(([n, r]) => {
    Object.defineProperty(e, `$${n}`, { get() {
      let [i, o] = cn(t);
      return i = W({ interceptor: rn }, i), Qt(t, o), r(t, i);
    }, enumerable: false });
  }), e;
}
function Rr(e, t, n, ...r) {
  try {
    return n(...r);
  } catch (i) {
    he(i, e, t);
  }
}
function he(e, t, n = void 0) {
  Object.assign(e, { el: t, expression: n }), console.warn(`Alpine Expression Error: ${e.message}

${n ? 'Expression: "' + n + `"

` : ""}`, t), setTimeout(() => {
    throw e;
  }, 0);
}
var Se = true;
function Ir(e) {
  let t = Se;
  Se = false, e(), Se = t;
}
function ee(e, t, n = {}) {
  let r;
  return I(e, t)((i) => r = i, n), r;
}
function I(...e) {
  return an(...e);
}
var an = sn;
function Pr(e) {
  an = e;
}
function sn(e, t) {
  let n = {};
  tt(n, e);
  let r = [n, ...te(e)];
  if (typeof t == "function")
    return $r(r, t);
  let i = Lr(r, t, e);
  return Rr.bind(null, e, t, i);
}
function $r(e, t) {
  return (n = () => {
  }, { scope: r = {}, params: i = [] } = {}) => {
    let o = t.apply(ye([r, ...e]), i);
    Te(n, o);
  };
}
var Ye = {};
function kr(e, t) {
  if (Ye[e])
    return Ye[e];
  let n = Object.getPrototypeOf(async function() {
  }).constructor, r = /^[\n\s]*if.*\(.*\)/.test(e) || /^(let|const)\s/.test(e) ? `(async()=>{ ${e} })()` : e, o = (() => {
    try {
      return new n(["__self", "scope"], `with (scope) { __self.result = ${r} }; __self.finished = true; return __self.result;`);
    } catch (a) {
      return he(a, t, e), Promise.resolve();
    }
  })();
  return Ye[e] = o, o;
}
function Lr(e, t, n) {
  let r = kr(t, n);
  return (i = () => {
  }, { scope: o = {}, params: a = [] } = {}) => {
    r.result = void 0, r.finished = false;
    let s = ye([o, ...e]);
    if (typeof r == "function") {
      let u = r(r, s).catch((l) => he(l, n, t));
      r.finished ? (Te(i, r.result, s, a, n), r.result = void 0) : u.then((l) => {
        Te(i, l, s, a, n);
      }).catch((l) => he(l, n, t)).finally(() => r.result = void 0);
    }
  };
}
function Te(e, t, n, r, i) {
  if (Se && typeof t == "function") {
    let o = t.apply(n, r);
    o instanceof Promise ? o.then((a) => Te(e, a, n, r)).catch((a) => he(a, i, t)) : e(o);
  } else
    typeof t == "object" && t instanceof Promise ? t.then((o) => e(o)) : e(t);
}
var yt = "x-";
function ae(e = "") {
  return yt + e;
}
function jr(e) {
  yt = e;
}
var nt = {};
function S(e, t) {
  return nt[e] = t, { before(n) {
    var i;
    if (!nt[n]) {
      console.warn("Cannot find directive `${directive}`. `${name}` will use the default order of execution");
      return;
    }
    let r = (i = Y.indexOf(n)) != null ? i : Y.indexOf("DEFAULT");
    r >= 0 && Y.splice(r, 0, e);
  } };
}
function xt(e, t, n) {
  if (t = Array.from(t), e._x_virtualDirectives) {
    let o = Object.entries(e._x_virtualDirectives).map(([s, u]) => ({ name: s, value: u })), a = un(o);
    o = o.map((s) => a.find((u) => u.name === s.name) ? { name: `x-bind:${s.name}`, value: `"${s.value}"` } : s), t = t.concat(o);
  }
  let r = {};
  return t.map(pn((o, a) => r[o] = a)).filter(hn).map(Dr(r, n)).sort(Br).map((o) => Fr(e, o));
}
function un(e) {
  return Array.from(e).map(pn()).filter((t) => !hn(t));
}
var rt = false;
var fe = /* @__PURE__ */ new Map();
var ln = Symbol();
function Kr(e) {
  rt = true;
  let t = Symbol();
  ln = t, fe.set(t, []);
  let n = () => {
    for (; fe.get(t).length; )
      fe.get(t).shift()();
    fe.delete(t);
  }, r = () => {
    rt = false, n();
  };
  e(n), r();
}
function cn(e) {
  let t = [], n = (s) => t.push(s), [r, i] = wr(e);
  return t.push(i), [{ Alpine: me, effect: r, cleanup: n, evaluateLater: I.bind(I, e), evaluate: ee.bind(ee, e) }, () => t.forEach((s) => s())];
}
function Fr(e, t) {
  let n = () => {
  }, r = nt[t.type] || n, [i, o] = cn(e);
  Sr(e, t.original, o);
  let a = () => {
    e._x_ignore || e._x_ignoreSelf || (r.inline && r.inline(e, t, i), r = r.bind(r, e, t, i), rt ? fe.get(ln).push(r) : r());
  };
  return a.runCleanups = o, a;
}
var fn = (e, t) => ({ name: n, value: r }) => (n.startsWith(e) && (n = n.replace(e, t)), { name: n, value: r });
var dn = (e) => e;
function pn(e = () => {
}) {
  return ({ name: t, value: n }) => {
    let { name: r, value: i } = _n.reduce((o, a) => a(o), { name: t, value: n });
    return r !== t && e(r, t), { name: r, value: i };
  };
}
var _n = [];
function mt(e) {
  _n.push(e);
}
function hn({ name: e }) {
  return gn().test(e);
}
var gn = () => new RegExp(`^${yt}([^:^.]+)\\b`);
function Dr(e, t) {
  return ({ name: n, value: r }) => {
    let i = n.match(gn()), o = n.match(/:([a-zA-Z0-9\-:]+)/), a = n.match(/\.[^.\]]+(?=[^\]]*$)/g) || [], s = t || e[n] || n;
    return { type: i ? i[1] : null, value: o ? o[1] : null, modifiers: a.map((u) => u.replace(".", "")), expression: r, original: s };
  };
}
var it = "DEFAULT";
var Y = ["ignore", "ref", "data", "id", "radio", "tabs", "switch", "disclosure", "menu", "listbox", "combobox", "bind", "init", "for", "mask", "model", "modelable", "transition", "show", "if", it, "teleport"];
function Br(e, t) {
  let n = Y.indexOf(e.type) === -1 ? it : e.type, r = Y.indexOf(t.type) === -1 ? it : t.type;
  return Y.indexOf(n) - Y.indexOf(r);
}
function pe(e, t, n = {}) {
  e.dispatchEvent(new CustomEvent(t, { detail: n, bubbles: true, composed: true, cancelable: true }));
}
function H(e, t) {
  if (typeof ShadowRoot == "function" && e instanceof ShadowRoot) {
    Array.from(e.children).forEach((i) => H(i, t));
    return;
  }
  let n = false;
  if (t(e, () => n = true), n)
    return;
  let r = e.firstElementChild;
  for (; r; )
    H(r, t, false), r = r.nextElementSibling;
}
function ne(e, ...t) {
  console.warn(`Alpine Warning: ${e}`, ...t);
}
function Hr() {
  document.body || ne("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"), pe(document, "alpine:init"), pe(document, "alpine:initializing"), ht(), Er((t) => z(t, H)), Qt((t) => En(t)), Ar((t, n) => {
    xt(t, n).forEach((r) => r());
  });
  let e = (t) => !Re(t.parentElement, true);
  Array.from(document.querySelectorAll(xn())).filter(e).forEach((t) => {
    z(t);
  }), pe(document, "alpine:initialized");
}
var bt = [];
var vn = [];
function yn() {
  return bt.map((e) => e());
}
function xn() {
  return bt.concat(vn).map((e) => e());
}
function mn(e) {
  bt.push(e);
}
function bn(e) {
  vn.push(e);
}
function Re(e, t = false) {
  return Ie(e, (n) => {
    if ((t ? xn() : yn()).some((i) => n.matches(i)))
      return true;
  });
}
function Ie(e, t) {
  if (e) {
    if (t(e))
      return e;
    if (e._x_teleportBack && (e = e._x_teleportBack), !!e.parentElement)
      return Ie(e.parentElement, t);
  }
}
function zr(e) {
  return yn().some((t) => e.matches(t));
}
var wn = [];
function qr(e) {
  wn.push(e);
}
function z(e, t = H, n = () => {
}) {
  Kr(() => {
    t(e, (r, i) => {
      n(r, i), wn.forEach((o) => o(r, i)), xt(r, r.attributes).forEach((o) => o()), r._x_ignore && i();
    });
  });
}
function En(e) {
  H(e, (t) => Xt(t));
}
var ot = [];
var wt = false;
function Et(e = () => {
}) {
  return queueMicrotask(() => {
    wt || setTimeout(() => {
      at();
    });
  }), new Promise((t) => {
    ot.push(() => {
      e(), t();
    });
  });
}
function at() {
  for (wt = false; ot.length; )
    ot.shift()();
}
function Vr() {
  wt = true;
}
function At(e, t) {
  return Array.isArray(t) ? Bt(e, t.join(" ")) : typeof t == "object" && t !== null ? Wr(e, t) : typeof t == "function" ? At(e, t()) : Bt(e, t);
}
function Bt(e, t) {
  let n = (o) => o.split(" ").filter(Boolean), r = (o) => o.split(" ").filter((a) => !e.classList.contains(a)).filter(Boolean), i = (o) => (e.classList.add(...o), () => {
    e.classList.remove(...o);
  });
  return t = t === true ? t = "" : t || "", i(r(t));
}
function Wr(e, t) {
  let n = (s) => s.split(" ").filter(Boolean), r = Object.entries(t).flatMap(([s, u]) => u ? n(s) : false).filter(Boolean), i = Object.entries(t).flatMap(([s, u]) => u ? false : n(s)).filter(Boolean), o = [], a = [];
  return i.forEach((s) => {
    e.classList.contains(s) && (e.classList.remove(s), a.push(s));
  }), r.forEach((s) => {
    e.classList.contains(s) || (e.classList.add(s), o.push(s));
  }), () => {
    a.forEach((s) => e.classList.add(s)), o.forEach((s) => e.classList.remove(s));
  };
}
function Pe(e, t) {
  return typeof t == "object" && t !== null ? Ur(e, t) : Yr(e, t);
}
function Ur(e, t) {
  let n = {};
  return Object.entries(t).forEach(([r, i]) => {
    n[r] = e.style[r], r.startsWith("--") || (r = Gr(r)), e.style.setProperty(r, i);
  }), setTimeout(() => {
    e.style.length === 0 && e.removeAttribute("style");
  }), () => {
    Pe(e, n);
  };
}
function Yr(e, t) {
  let n = e.getAttribute("style", t);
  return e.setAttribute("style", t), () => {
    e.setAttribute("style", n || "");
  };
}
function Gr(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function st(e, t = () => {
}) {
  let n = false;
  return function() {
    n ? t.apply(this, arguments) : (n = true, e.apply(this, arguments));
  };
}
S("transition", (e, { value: t, modifiers: n, expression: r }, { evaluate: i }) => {
  typeof r == "function" && (r = i(r)), r ? Jr(e, r, t) : Zr(e, n, t);
});
function Jr(e, t, n) {
  An(e, At, ""), { enter: (i) => {
    e._x_transition.enter.during = i;
  }, "enter-start": (i) => {
    e._x_transition.enter.start = i;
  }, "enter-end": (i) => {
    e._x_transition.enter.end = i;
  }, leave: (i) => {
    e._x_transition.leave.during = i;
  }, "leave-start": (i) => {
    e._x_transition.leave.start = i;
  }, "leave-end": (i) => {
    e._x_transition.leave.end = i;
  } }[n](t);
}
function Zr(e, t, n) {
  An(e, Pe);
  let r = !t.includes("in") && !t.includes("out") && !n, i = r || t.includes("in") || ["enter"].includes(n), o = r || t.includes("out") || ["leave"].includes(n);
  t.includes("in") && !r && (t = t.filter((x, E) => E < t.indexOf("out"))), t.includes("out") && !r && (t = t.filter((x, E) => E > t.indexOf("out")));
  let a = !t.includes("opacity") && !t.includes("scale"), s = a || t.includes("opacity"), u = a || t.includes("scale"), l = s ? 0 : 1, f = u ? le(t, "scale", 95) / 100 : 1, d = le(t, "delay", 0), h = le(t, "origin", "center"), A = "opacity, transform", $ = le(t, "duration", 150) / 1e3, X = le(t, "duration", 75) / 1e3, p = "cubic-bezier(0.4, 0.0, 0.2, 1)";
  i && (e._x_transition.enter.during = { transformOrigin: h, transitionDelay: d, transitionProperty: A, transitionDuration: `${$}s`, transitionTimingFunction: p }, e._x_transition.enter.start = { opacity: l, transform: `scale(${f})` }, e._x_transition.enter.end = { opacity: 1, transform: "scale(1)" }), o && (e._x_transition.leave.during = { transformOrigin: h, transitionDelay: d, transitionProperty: A, transitionDuration: `${X}s`, transitionTimingFunction: p }, e._x_transition.leave.start = { opacity: 1, transform: "scale(1)" }, e._x_transition.leave.end = { opacity: l, transform: `scale(${f})` });
}
function An(e, t, n = {}) {
  e._x_transition || (e._x_transition = { enter: { during: n, start: n, end: n }, leave: { during: n, start: n, end: n }, in(r = () => {
  }, i = () => {
  }) {
    ut(e, t, { during: this.enter.during, start: this.enter.start, end: this.enter.end }, r, i);
  }, out(r = () => {
  }, i = () => {
  }) {
    ut(e, t, { during: this.leave.during, start: this.leave.start, end: this.leave.end }, r, i);
  } });
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function(e, t, n, r) {
  let i = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout, o = () => i(n);
  if (t) {
    e._x_transition && (e._x_transition.enter || e._x_transition.leave) ? e._x_transition.enter && (Object.entries(e._x_transition.enter.during).length || Object.entries(e._x_transition.enter.start).length || Object.entries(e._x_transition.enter.end).length) ? e._x_transition.in(n) : o() : e._x_transition ? e._x_transition.in(n) : o();
    return;
  }
  e._x_hidePromise = e._x_transition ? new Promise((a, s) => {
    e._x_transition.out(() => {
    }, () => a(r)), e._x_transitioning.beforeCancel(() => s({ isFromCancelledTransition: true }));
  }) : Promise.resolve(r), queueMicrotask(() => {
    let a = Sn(e);
    a ? (a._x_hideChildren || (a._x_hideChildren = []), a._x_hideChildren.push(e)) : i(() => {
      let s = (u) => {
        let l = Promise.all([u._x_hidePromise, ...(u._x_hideChildren || []).map(s)]).then(([f]) => f());
        return delete u._x_hidePromise, delete u._x_hideChildren, l;
      };
      s(e).catch((u) => {
        if (!u.isFromCancelledTransition)
          throw u;
      });
    });
  });
};
function Sn(e) {
  let t = e.parentNode;
  if (t)
    return t._x_hidePromise ? t : Sn(t);
}
function ut(e, t, { during: n, start: r, end: i } = {}, o = () => {
}, a = () => {
}) {
  if (e._x_transitioning && e._x_transitioning.cancel(), Object.keys(n).length === 0 && Object.keys(r).length === 0 && Object.keys(i).length === 0) {
    o(), a();
    return;
  }
  let s, u, l;
  Qr(e, { start() {
    s = t(e, r);
  }, during() {
    u = t(e, n);
  }, before: o, end() {
    s(), l = t(e, i);
  }, after: a, cleanup() {
    u(), l();
  } });
}
function Qr(e, t) {
  let n, r, i, o = st(() => {
    C(() => {
      n = true, r || t.before(), i || (t.end(), at()), t.after(), e.isConnected && t.cleanup(), delete e._x_transitioning;
    });
  });
  e._x_transitioning = { beforeCancels: [], beforeCancel(a) {
    this.beforeCancels.push(a);
  }, cancel: st(function() {
    for (; this.beforeCancels.length; )
      this.beforeCancels.shift()();
    o();
  }), finish: o }, C(() => {
    t.start(), t.during();
  }), Vr(), requestAnimationFrame(() => {
    if (n)
      return;
    let a = Number(getComputedStyle(e).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3, s = Number(getComputedStyle(e).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
    a === 0 && (a = Number(getComputedStyle(e).animationDuration.replace("s", "")) * 1e3), C(() => {
      t.before();
    }), r = true, requestAnimationFrame(() => {
      n || (C(() => {
        t.end();
      }), at(), setTimeout(e._x_transitioning.finish, a + s), i = true);
    });
  });
}
function le(e, t, n) {
  if (e.indexOf(t) === -1)
    return n;
  let r = e[e.indexOf(t) + 1];
  if (!r || t === "scale" && isNaN(r))
    return n;
  if (t === "duration") {
    let i = r.match(/([0-9]+)ms/);
    if (i)
      return i[1];
  }
  return t === "origin" && ["top", "right", "left", "center", "bottom"].includes(e[e.indexOf(t) + 2]) ? [r, e[e.indexOf(t) + 2]].join(" ") : r;
}
var Me = false;
function xe(e, t = () => {
}) {
  return (...n) => Me ? t(...n) : e(...n);
}
function Xr(e) {
  return (...t) => Me && e(...t);
}
function ei(e, t) {
  t._x_dataStack || (t._x_dataStack = e._x_dataStack), Me = true, ni(() => {
    ti(t);
  }), Me = false;
}
function ti(e) {
  let t = false;
  z(e, (r, i) => {
    H(r, (o, a) => {
      if (t && zr(o))
        return a();
      t = true, i(o, a);
    });
  });
}
function ni(e) {
  let t = oe;
  Ft((n, r) => {
    let i = t(n);
    return ge(i), () => {
    };
  }), e(), Ft(t);
}
function On(e, t, n, r = []) {
  switch (e._x_bindings || (e._x_bindings = ie({})), e._x_bindings[t] = n, t = r.includes("camel") ? li(t) : t, t) {
    case "value":
      ri(e, n);
      break;
    case "style":
      oi(e, n);
      break;
    case "class":
      ii(e, n);
      break;
    default:
      ai(e, t, n);
      break;
  }
}
function ri(e, t) {
  if (e.type === "radio")
    e.attributes.value === void 0 && (e.value = t), window.fromModel && (e.checked = Ht(e.value, t));
  else if (e.type === "checkbox")
    Number.isInteger(t) ? e.value = t : !Number.isInteger(t) && !Array.isArray(t) && typeof t != "boolean" && ![null, void 0].includes(t) ? e.value = String(t) : Array.isArray(t) ? e.checked = t.some((n) => Ht(n, e.value)) : e.checked = !!t;
  else if (e.tagName === "SELECT")
    ui(e, t);
  else {
    if (e.value === t)
      return;
    e.value = t;
  }
}
function ii(e, t) {
  e._x_undoAddedClasses && e._x_undoAddedClasses(), e._x_undoAddedClasses = At(e, t);
}
function oi(e, t) {
  e._x_undoAddedStyles && e._x_undoAddedStyles(), e._x_undoAddedStyles = Pe(e, t);
}
function ai(e, t, n) {
  [null, void 0, false].includes(n) && ci(t) ? e.removeAttribute(t) : (Tn(t) && (n = t), si(e, t, n));
}
function si(e, t, n) {
  e.getAttribute(t) != n && e.setAttribute(t, n);
}
function ui(e, t) {
  let n = [].concat(t).map((r) => r + "");
  Array.from(e.options).forEach((r) => {
    r.selected = n.includes(r.value);
  });
}
function li(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function Ht(e, t) {
  return e == t;
}
function Tn(e) {
  return ["disabled", "checked", "required", "readonly", "hidden", "open", "selected", "autofocus", "itemscope", "multiple", "novalidate", "allowfullscreen", "allowpaymentrequest", "formnovalidate", "autoplay", "controls", "loop", "muted", "playsinline", "default", "ismap", "reversed", "async", "defer", "nomodule"].includes(e);
}
function ci(e) {
  return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(e);
}
function fi(e, t, n) {
  if (e._x_bindings && e._x_bindings[t] !== void 0)
    return e._x_bindings[t];
  let r = e.getAttribute(t);
  return r === null ? typeof n == "function" ? n() : n : r === "" ? true : Tn(t) ? !![t, "true"].includes(r) : r;
}
function Mn(e, t) {
  var n;
  return function() {
    var r = this, i = arguments, o = function() {
      n = null, e.apply(r, i);
    };
    clearTimeout(n), n = setTimeout(o, t);
  };
}
function Cn(e, t) {
  let n;
  return function() {
    let r = this, i = arguments;
    n || (e.apply(r, i), n = true, setTimeout(() => n = false, t));
  };
}
function di(e) {
  e(me);
}
var U = {};
var zt = false;
function pi(e, t) {
  if (zt || (U = ie(U), zt = true), t === void 0)
    return U[e];
  U[e] = t, typeof t == "object" && t !== null && t.hasOwnProperty("init") && typeof t.init == "function" && U[e].init(), nn(U[e]);
}
function _i() {
  return U;
}
var Nn = {};
function hi(e, t) {
  let n = typeof t != "function" ? () => t : t;
  e instanceof Element ? Rn(e, n()) : Nn[e] = n;
}
function gi(e) {
  return Object.entries(Nn).forEach(([t, n]) => {
    Object.defineProperty(e, t, { get() {
      return (...r) => n(...r);
    } });
  }), e;
}
function Rn(e, t, n) {
  let r = [];
  for (; r.length; )
    r.pop()();
  let i = Object.entries(t).map(([a, s]) => ({ name: a, value: s })), o = un(i);
  i = i.map((a) => o.find((s) => s.name === a.name) ? { name: `x-bind:${a.name}`, value: `"${a.value}"` } : a), xt(e, i, n).map((a) => {
    r.push(a.runCleanups), a();
  });
}
var In = {};
function vi(e, t) {
  In[e] = t;
}
function yi(e, t) {
  return Object.entries(In).forEach(([n, r]) => {
    Object.defineProperty(e, n, { get() {
      return (...i) => r.bind(t)(...i);
    }, enumerable: false });
  }), e;
}
var xi = { get reactive() {
  return ie;
}, get release() {
  return ge;
}, get effect() {
  return oe;
}, get raw() {
  return Yt;
}, version: "3.11.1", flushAndStopDeferringMutations: Cr, dontAutoEvaluateFunctions: Ir, disableEffectScheduling: mr, startObservingMutations: ht, stopObservingMutations: en, setReactivityEngine: br, closestDataStack: te, skipDuringClone: xe, onlyDuringClone: Xr, addRootSelector: mn, addInitSelector: bn, addScopeToNode: ve, deferMutations: Mr, mapAttributes: mt, evaluateLater: I, interceptInit: qr, setEvaluator: Pr, mergeProxies: ye, findClosest: Ie, closestRoot: Re, destroyTree: En, interceptor: rn, transition: ut, setStyles: Pe, mutateDom: C, directive: S, throttle: Cn, debounce: Mn, evaluate: ee, initTree: z, nextTick: Et, prefixed: ae, prefix: jr, plugin: di, magic: L, store: pi, start: Hr, clone: ei, bound: fi, $data: tn, walk: H, data: vi, bind: hi };
var me = xi;
function Pn(e, t) {
  let n = /* @__PURE__ */ Object.create(null), r = e.split(",");
  for (let i = 0; i < r.length; i++)
    n[r[i]] = true;
  return t ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
var mi = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";
var Ro = Pn(mi + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");
var bi = Object.freeze({});
var Io = Object.freeze([]);
var $n = Object.assign;
var wi = Object.prototype.hasOwnProperty;
var $e = (e, t) => wi.call(e, t);
var J = Array.isArray;
var _e = (e) => kn(e) === "[object Map]";
var Ei = (e) => typeof e == "string";
var St = (e) => typeof e == "symbol";
var ke = (e) => e !== null && typeof e == "object";
var Ai = Object.prototype.toString;
var kn = (e) => Ai.call(e);
var Ln = (e) => kn(e).slice(8, -1);
var Ot = (e) => Ei(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e;
var Le = (e) => {
  let t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
};
var Si = /-(\w)/g;
var Po = Le((e) => e.replace(Si, (t, n) => n ? n.toUpperCase() : ""));
var Oi = /\B([A-Z])/g;
var $o = Le((e) => e.replace(Oi, "-$1").toLowerCase());
var jn = Le((e) => e.charAt(0).toUpperCase() + e.slice(1));
var ko = Le((e) => e ? `on${jn(e)}` : "");
var Kn = (e, t) => e !== t && (e === e || t === t);
var lt = /* @__PURE__ */ new WeakMap();
var ce = [];
var K;
var Z = Symbol("iterate");
var ct = Symbol("Map key iterate");
function Ti(e) {
  return e && e._isEffect === true;
}
function Mi(e, t = bi) {
  Ti(e) && (e = e.raw);
  let n = Ri(e, t);
  return t.lazy || n(), n;
}
function Ci(e) {
  e.active && (Fn(e), e.options.onStop && e.options.onStop(), e.active = false);
}
var Ni = 0;
function Ri(e, t) {
  let n = function() {
    if (!n.active)
      return e();
    if (!ce.includes(n)) {
      Fn(n);
      try {
        return Pi(), ce.push(n), K = n, e();
      } finally {
        ce.pop(), Dn(), K = ce[ce.length - 1];
      }
    }
  };
  return n.id = Ni++, n.allowRecurse = !!t.allowRecurse, n._isEffect = true, n.active = true, n.raw = e, n.deps = [], n.options = t, n;
}
function Fn(e) {
  let { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
var re = true;
var Tt = [];
function Ii() {
  Tt.push(re), re = false;
}
function Pi() {
  Tt.push(re), re = true;
}
function Dn() {
  let e = Tt.pop();
  re = e === void 0 ? true : e;
}
function k(e, t, n) {
  if (!re || K === void 0)
    return;
  let r = lt.get(e);
  r || lt.set(e, r = /* @__PURE__ */ new Map());
  let i = r.get(n);
  i || r.set(n, i = /* @__PURE__ */ new Set()), i.has(K) || (i.add(K), K.deps.push(i), K.options.onTrack && K.options.onTrack({ effect: K, target: e, type: t, key: n }));
}
function q(e, t, n, r, i, o) {
  let a = lt.get(e);
  if (!a)
    return;
  let s = /* @__PURE__ */ new Set(), u = (f) => {
    f && f.forEach((d) => {
      (d !== K || d.allowRecurse) && s.add(d);
    });
  };
  if (t === "clear")
    a.forEach(u);
  else if (n === "length" && J(e))
    a.forEach((f, d) => {
      (d === "length" || d >= r) && u(f);
    });
  else
    switch (n !== void 0 && u(a.get(n)), t) {
      case "add":
        J(e) ? Ot(n) && u(a.get("length")) : (u(a.get(Z)), _e(e) && u(a.get(ct)));
        break;
      case "delete":
        J(e) || (u(a.get(Z)), _e(e) && u(a.get(ct)));
        break;
      case "set":
        _e(e) && u(a.get(Z));
        break;
    }
  let l = (f) => {
    f.options.onTrigger && f.options.onTrigger({ effect: f, target: e, key: n, type: t, newValue: r, oldValue: i, oldTarget: o }), f.options.scheduler ? f.options.scheduler(f) : f();
  };
  s.forEach(l);
}
var $i = Pn("__proto__,__v_isRef,__isVue");
var Bn = new Set(Object.getOwnPropertyNames(Symbol).map((e) => Symbol[e]).filter(St));
var ki = je();
var Li = je(false, true);
var ji = je(true);
var Ki = je(true, true);
var Ce = {};
["includes", "indexOf", "lastIndexOf"].forEach((e) => {
  let t = Array.prototype[e];
  Ce[e] = function(...n) {
    let r = m(this);
    for (let o = 0, a = this.length; o < a; o++)
      k(r, "get", o + "");
    let i = t.apply(r, n);
    return i === -1 || i === false ? t.apply(r, n.map(m)) : i;
  };
});
["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
  let t = Array.prototype[e];
  Ce[e] = function(...n) {
    Ii();
    let r = t.apply(this, n);
    return Dn(), r;
  };
});
function je(e = false, t = false) {
  return function(r, i, o) {
    if (i === "__v_isReactive")
      return !e;
    if (i === "__v_isReadonly")
      return e;
    if (i === "__v_raw" && o === (e ? t ? Yi : tr : t ? Ui : er).get(r))
      return r;
    let a = J(r);
    if (!e && a && $e(Ce, i))
      return Reflect.get(Ce, i, o);
    let s = Reflect.get(r, i, o);
    return (St(i) ? Bn.has(i) : $i(i)) || (e || k(r, "get", i), t) ? s : ft(s) ? !a || !Ot(i) ? s.value : s : ke(s) ? e ? nr(s) : Rt(s) : s;
  };
}
var Fi = Hn();
var Di = Hn(true);
function Hn(e = false) {
  return function(n, r, i, o) {
    let a = n[r];
    if (!e && (i = m(i), a = m(a), !J(n) && ft(a) && !ft(i)))
      return a.value = i, true;
    let s = J(n) && Ot(r) ? Number(r) < n.length : $e(n, r), u = Reflect.set(n, r, i, o);
    return n === m(o) && (s ? Kn(i, a) && q(n, "set", r, i, a) : q(n, "add", r, i)), u;
  };
}
function Bi(e, t) {
  let n = $e(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
  return i && n && q(e, "delete", t, void 0, r), i;
}
function Hi(e, t) {
  let n = Reflect.has(e, t);
  return (!St(t) || !Bn.has(t)) && k(e, "has", t), n;
}
function zi(e) {
  return k(e, "iterate", J(e) ? "length" : Z), Reflect.ownKeys(e);
}
var zn = { get: ki, set: Fi, deleteProperty: Bi, has: Hi, ownKeys: zi };
var qn = { get: ji, set(e, t) {
  return console.warn(`Set operation on key "${String(t)}" failed: target is readonly.`, e), true;
}, deleteProperty(e, t) {
  return console.warn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), true;
} };
var Lo = $n({}, zn, { get: Li, set: Di });
var jo = $n({}, qn, { get: Ki });
var Mt = (e) => ke(e) ? Rt(e) : e;
var Ct = (e) => ke(e) ? nr(e) : e;
var Nt = (e) => e;
var Ke = (e) => Reflect.getPrototypeOf(e);
function Fe(e, t, n = false, r = false) {
  e = e.__v_raw;
  let i = m(e), o = m(t);
  t !== o && !n && k(i, "get", t), !n && k(i, "get", o);
  let { has: a } = Ke(i), s = r ? Nt : n ? Ct : Mt;
  if (a.call(i, t))
    return s(e.get(t));
  if (a.call(i, o))
    return s(e.get(o));
  e !== i && e.get(t);
}
function De(e, t = false) {
  let n = this.__v_raw, r = m(n), i = m(e);
  return e !== i && !t && k(r, "has", e), !t && k(r, "has", i), e === i ? n.has(e) : n.has(e) || n.has(i);
}
function Be(e, t = false) {
  return e = e.__v_raw, !t && k(m(e), "iterate", Z), Reflect.get(e, "size", e);
}
function Vn(e) {
  e = m(e);
  let t = m(this);
  return Ke(t).has.call(t, e) || (t.add(e), q(t, "add", e, e)), this;
}
function Wn(e, t) {
  t = m(t);
  let n = m(this), { has: r, get: i } = Ke(n), o = r.call(n, e);
  o ? Xn(n, r, e) : (e = m(e), o = r.call(n, e));
  let a = i.call(n, e);
  return n.set(e, t), o ? Kn(t, a) && q(n, "set", e, t, a) : q(n, "add", e, t), this;
}
function Un(e) {
  let t = m(this), { has: n, get: r } = Ke(t), i = n.call(t, e);
  i ? Xn(t, n, e) : (e = m(e), i = n.call(t, e));
  let o = r ? r.call(t, e) : void 0, a = t.delete(e);
  return i && q(t, "delete", e, void 0, o), a;
}
function Yn() {
  let e = m(this), t = e.size !== 0, n = _e(e) ? new Map(e) : new Set(e), r = e.clear();
  return t && q(e, "clear", void 0, void 0, n), r;
}
function He(e, t) {
  return function(r, i) {
    let o = this, a = o.__v_raw, s = m(a), u = t ? Nt : e ? Ct : Mt;
    return !e && k(s, "iterate", Z), a.forEach((l, f) => r.call(i, u(l), u(f), o));
  };
}
function Ae(e, t, n) {
  return function(...r) {
    let i = this.__v_raw, o = m(i), a = _e(o), s = e === "entries" || e === Symbol.iterator && a, u = e === "keys" && a, l = i[e](...r), f = n ? Nt : t ? Ct : Mt;
    return !t && k(o, "iterate", u ? ct : Z), { next() {
      let { value: d, done: h } = l.next();
      return h ? { value: d, done: h } : { value: s ? [f(d[0]), f(d[1])] : f(d), done: h };
    }, [Symbol.iterator]() {
      return this;
    } };
  };
}
function B(e) {
  return function(...t) {
    {
      let n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(`${jn(e)} operation ${n}failed: target is readonly.`, m(this));
    }
    return e === "delete" ? false : this;
  };
}
var Gn = { get(e) {
  return Fe(this, e);
}, get size() {
  return Be(this);
}, has: De, add: Vn, set: Wn, delete: Un, clear: Yn, forEach: He(false, false) };
var Jn = { get(e) {
  return Fe(this, e, false, true);
}, get size() {
  return Be(this);
}, has: De, add: Vn, set: Wn, delete: Un, clear: Yn, forEach: He(false, true) };
var Zn = { get(e) {
  return Fe(this, e, true);
}, get size() {
  return Be(this, true);
}, has(e) {
  return De.call(this, e, true);
}, add: B("add"), set: B("set"), delete: B("delete"), clear: B("clear"), forEach: He(true, false) };
var Qn = { get(e) {
  return Fe(this, e, true, true);
}, get size() {
  return Be(this, true);
}, has(e) {
  return De.call(this, e, true);
}, add: B("add"), set: B("set"), delete: B("delete"), clear: B("clear"), forEach: He(true, true) };
var qi = ["keys", "values", "entries", Symbol.iterator];
qi.forEach((e) => {
  Gn[e] = Ae(e, false, false), Zn[e] = Ae(e, true, false), Jn[e] = Ae(e, false, true), Qn[e] = Ae(e, true, true);
});
function ze(e, t) {
  let n = t ? e ? Qn : Jn : e ? Zn : Gn;
  return (r, i, o) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? r : Reflect.get($e(n, i) && i in r ? n : r, i, o);
}
var Vi = { get: ze(false, false) };
var Ko = { get: ze(false, true) };
var Wi = { get: ze(true, false) };
var Fo = { get: ze(true, true) };
function Xn(e, t, n) {
  let r = m(n);
  if (r !== n && t.call(e, r)) {
    let i = Ln(e);
    console.warn(`Reactive ${i} contains both the raw and reactive versions of the same object${i === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
var er = /* @__PURE__ */ new WeakMap();
var Ui = /* @__PURE__ */ new WeakMap();
var tr = /* @__PURE__ */ new WeakMap();
var Yi = /* @__PURE__ */ new WeakMap();
function Gi(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Ji(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Gi(Ln(e));
}
function Rt(e) {
  return e && e.__v_isReadonly ? e : rr(e, false, zn, Vi, er);
}
function nr(e) {
  return rr(e, true, qn, Wi, tr);
}
function rr(e, t, n, r, i) {
  if (!ke(e))
    return console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  let o = i.get(e);
  if (o)
    return o;
  let a = Ji(e);
  if (a === 0)
    return e;
  let s = new Proxy(e, a === 2 ? r : n);
  return i.set(e, s), s;
}
function m(e) {
  return e && m(e.__v_raw) || e;
}
function ft(e) {
  return Boolean(e && e.__v_isRef === true);
}
L("nextTick", () => Et);
L("dispatch", (e) => pe.bind(pe, e));
L("watch", (e, { evaluateLater: t, effect: n }) => (r, i) => {
  let o = t(r), a = true, s, u = n(() => o((l) => {
    JSON.stringify(l), a ? s = l : queueMicrotask(() => {
      i(l, s), s = l;
    }), a = false;
  }));
  e._x_effects.delete(u);
});
L("store", _i);
L("data", (e) => tn(e));
L("root", (e) => Re(e));
L("refs", (e) => (e._x_refs_proxy || (e._x_refs_proxy = ye(Zi(e))), e._x_refs_proxy));
function Zi(e) {
  let t = [], n = e;
  for (; n; )
    n._x_refs && t.push(n._x_refs), n = n.parentNode;
  return t;
}
var Ge = {};
function ir(e) {
  return Ge[e] || (Ge[e] = 0), ++Ge[e];
}
function Qi(e, t) {
  return Ie(e, (n) => {
    if (n._x_ids && n._x_ids[t])
      return true;
  });
}
function Xi(e, t) {
  e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = ir(t));
}
L("id", (e) => (t, n = null) => {
  let r = Qi(e, t), i = r ? r._x_ids[t] : ir(t);
  return n ? `${t}-${i}-${n}` : `${t}-${i}`;
});
L("el", (e) => e);
or("Focus", "focus", "focus");
or("Persist", "persist", "persist");
function or(e, t, n) {
  L(t, (r) => ne(`You can't use [$${directiveName}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`, r));
}
function eo({ get: e, set: t }, { get: n, set: r }) {
  let i = true, o, a, s, u, l = oe(() => {
    let f, d;
    i ? (f = e(), r(f), d = n(), i = false) : (f = e(), d = n(), s = JSON.stringify(f), u = JSON.stringify(d), s !== o ? (d = n(), r(f), d = f) : (t(d), f = d)), o = JSON.stringify(f), a = JSON.stringify(d);
  });
  return () => {
    ge(l);
  };
}
S("modelable", (e, { expression: t }, { effect: n, evaluateLater: r, cleanup: i }) => {
  let o = r(t), a = () => {
    let f;
    return o((d) => f = d), f;
  }, s = r(`${t} = __placeholder`), u = (f) => s(() => {
  }, { scope: { __placeholder: f } }), l = a();
  u(l), queueMicrotask(() => {
    if (!e._x_model)
      return;
    e._x_removeModelListeners.default();
    let f = e._x_model.get, d = e._x_model.set, h = eo({ get() {
      return f();
    }, set(A) {
      d(A);
    } }, { get() {
      return a();
    }, set(A) {
      u(A);
    } });
    i(h);
  });
});
var to = document.createElement("div");
S("teleport", (e, { modifiers: t, expression: n }, { cleanup: r }) => {
  e.tagName.toLowerCase() !== "template" && ne("x-teleport can only be used on a <template> tag", e);
  let i = xe(() => document.querySelector(n), () => to)();
  i || ne(`Cannot find x-teleport element for selector: "${n}"`);
  let o = e.content.cloneNode(true).firstElementChild;
  e._x_teleport = o, o._x_teleportBack = e, e._x_forwardEvents && e._x_forwardEvents.forEach((a) => {
    o.addEventListener(a, (s) => {
      s.stopPropagation(), e.dispatchEvent(new s.constructor(s.type, s));
    });
  }), ve(o, {}, e), C(() => {
    t.includes("prepend") ? i.parentNode.insertBefore(o, i) : t.includes("append") ? i.parentNode.insertBefore(o, i.nextSibling) : i.appendChild(o), z(o), o._x_ignore = true;
  }), r(() => o.remove());
});
var ar = () => {
};
ar.inline = (e, { modifiers: t }, { cleanup: n }) => {
  t.includes("self") ? e._x_ignoreSelf = true : e._x_ignore = true, n(() => {
    t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore;
  });
};
S("ignore", ar);
S("effect", (e, { expression: t }, { effect: n }) => n(I(e, t)));
function dt(e, t, n, r) {
  let i = e, o = (u) => r(u), a = {}, s = (u, l) => (f) => l(u, f);
  if (n.includes("dot") && (t = no(t)), n.includes("camel") && (t = ro(t)), n.includes("passive") && (a.passive = true), n.includes("capture") && (a.capture = true), n.includes("window") && (i = window), n.includes("document") && (i = document), n.includes("prevent") && (o = s(o, (u, l) => {
    l.preventDefault(), u(l);
  })), n.includes("stop") && (o = s(o, (u, l) => {
    l.stopPropagation(), u(l);
  })), n.includes("self") && (o = s(o, (u, l) => {
    l.target === e && u(l);
  })), (n.includes("away") || n.includes("outside")) && (i = document, o = s(o, (u, l) => {
    e.contains(l.target) || l.target.isConnected !== false && (e.offsetWidth < 1 && e.offsetHeight < 1 || e._x_isShown !== false && u(l));
  })), n.includes("once") && (o = s(o, (u, l) => {
    u(l), i.removeEventListener(t, o, a);
  })), o = s(o, (u, l) => {
    oo(t) && ao(l, n) || u(l);
  }), n.includes("debounce")) {
    let u = n[n.indexOf("debounce") + 1] || "invalid-wait", l = Ne(u.split("ms")[0]) ? Number(u.split("ms")[0]) : 250;
    o = Mn(o, l);
  }
  if (n.includes("throttle")) {
    let u = n[n.indexOf("throttle") + 1] || "invalid-wait", l = Ne(u.split("ms")[0]) ? Number(u.split("ms")[0]) : 250;
    o = Cn(o, l);
  }
  return i.addEventListener(t, o, a), () => {
    i.removeEventListener(t, o, a);
  };
}
function no(e) {
  return e.replace(/-/g, ".");
}
function ro(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function Ne(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function io(e) {
  return [" ", "_"].includes(e) ? e : e.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
}
function oo(e) {
  return ["keydown", "keyup"].includes(e);
}
function ao(e, t) {
  let n = t.filter((o) => !["window", "document", "prevent", "stop", "once"].includes(o));
  if (n.includes("debounce")) {
    let o = n.indexOf("debounce");
    n.splice(o, Ne((n[o + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (n.includes("throttle")) {
    let o = n.indexOf("throttle");
    n.splice(o, Ne((n[o + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (n.length === 0 || n.length === 1 && qt(e.key).includes(n[0]))
    return false;
  let i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((o) => n.includes(o));
  return n = n.filter((o) => !i.includes(o)), !(i.length > 0 && i.filter((a) => ((a === "cmd" || a === "super") && (a = "meta"), e[`${a}Key`])).length === i.length && qt(e.key).includes(n[0]));
}
function qt(e) {
  if (!e)
    return [];
  e = io(e);
  let t = { ctrl: "control", slash: "/", space: " ", spacebar: " ", cmd: "meta", esc: "escape", up: "arrow-up", down: "arrow-down", left: "arrow-left", right: "arrow-right", period: ".", equal: "=", minus: "-", underscore: "_" };
  return t[e] = e, Object.keys(t).map((n) => {
    if (t[n] === e)
      return n;
  }).filter((n) => n);
}
S("model", (e, { modifiers: t, expression: n }, { effect: r, cleanup: i }) => {
  let o = e;
  t.includes("parent") && (o = e.parentNode);
  let a = I(o, n), s;
  typeof n == "string" ? s = I(o, `${n} = __placeholder`) : typeof n == "function" && typeof n() == "string" ? s = I(o, `${n()} = __placeholder`) : s = () => {
  };
  let u = () => {
    let h;
    return a((A) => h = A), Vt(h) ? h.get() : h;
  }, l = (h) => {
    let A;
    a(($) => A = $), Vt(A) ? A.set(h) : s(() => {
    }, { scope: { __placeholder: h } });
  };
  typeof n == "string" && e.type === "radio" && C(() => {
    e.hasAttribute("name") || e.setAttribute("name", n);
  });
  var f = e.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(e.type) || t.includes("lazy") ? "change" : "input";
  let d = dt(e, f, t, (h) => {
    l(so(e, t, h, u()));
  });
  if (e._x_removeModelListeners || (e._x_removeModelListeners = {}), e._x_removeModelListeners.default = d, i(() => e._x_removeModelListeners.default()), e.form) {
    let h = dt(e.form, "reset", [], (A) => {
      Et(() => e._x_model && e._x_model.set(e.value));
    });
    i(() => h());
  }
  e._x_model = { get() {
    return u();
  }, set(h) {
    l(h);
  } }, e._x_forceModelUpdate = (h) => {
    h = h === void 0 ? u() : h, h === void 0 && typeof n == "string" && n.match(/\./) && (h = ""), window.fromModel = true, C(() => On(e, "value", h)), delete window.fromModel;
  }, r(() => {
    let h = u();
    t.includes("unintrusive") && document.activeElement.isSameNode(e) || e._x_forceModelUpdate(h);
  });
});
function so(e, t, n, r) {
  return C(() => {
    if (n instanceof CustomEvent && n.detail !== void 0)
      return typeof n.detail < "u" ? n.detail : n.target.value;
    if (e.type === "checkbox")
      if (Array.isArray(r)) {
        let i = t.includes("number") ? Je(n.target.value) : n.target.value;
        return n.target.checked ? r.concat([i]) : r.filter((o) => !uo(o, i));
      } else
        return n.target.checked;
    else {
      if (e.tagName.toLowerCase() === "select" && e.multiple)
        return t.includes("number") ? Array.from(n.target.selectedOptions).map((i) => {
          let o = i.value || i.text;
          return Je(o);
        }) : Array.from(n.target.selectedOptions).map((i) => i.value || i.text);
      {
        let i = n.target.value;
        return t.includes("number") ? Je(i) : t.includes("trim") ? i.trim() : i;
      }
    }
  });
}
function Je(e) {
  let t = e ? parseFloat(e) : null;
  return lo(t) ? t : e;
}
function uo(e, t) {
  return e == t;
}
function lo(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function Vt(e) {
  return e !== null && typeof e == "object" && typeof e.get == "function" && typeof e.set == "function";
}
S("cloak", (e) => queueMicrotask(() => C(() => e.removeAttribute(ae("cloak")))));
bn(() => `[${ae("init")}]`);
S("init", xe((e, { expression: t }, { evaluate: n }) => typeof t == "string" ? !!t.trim() && n(t, {}, false) : n(t, {}, false)));
S("text", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
  let i = r(t);
  n(() => {
    i((o) => {
      C(() => {
        e.textContent = o;
      });
    });
  });
});
S("html", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
  let i = r(t);
  n(() => {
    i((o) => {
      C(() => {
        e.innerHTML = o, e._x_ignoreSelf = true, z(e), delete e._x_ignoreSelf;
      });
    });
  });
});
mt(fn(":", dn(ae("bind:"))));
S("bind", (e, { value: t, modifiers: n, expression: r, original: i }, { effect: o }) => {
  if (!t) {
    let s = {};
    gi(s), I(e, r)((l) => {
      Rn(e, l, i);
    }, { scope: s });
    return;
  }
  if (t === "key")
    return co(e, r);
  let a = I(e, r);
  o(() => a((s) => {
    s === void 0 && typeof r == "string" && r.match(/\./) && (s = ""), C(() => On(e, t, s, n));
  }));
});
function co(e, t) {
  e._x_keyExpression = t;
}
mn(() => `[${ae("data")}]`);
S("data", xe((e, { expression: t }, { cleanup: n }) => {
  t = t === "" ? "{}" : t;
  let r = {};
  tt(r, e);
  let i = {};
  yi(i, r);
  let o = ee(e, t, { scope: i });
  o === void 0 && (o = {}), tt(o, e);
  let a = ie(o);
  nn(a);
  let s = ve(e, a);
  a.init && ee(e, a.init), n(() => {
    a.destroy && ee(e, a.destroy), s();
  });
}));
S("show", (e, { modifiers: t, expression: n }, { effect: r }) => {
  let i = I(e, n);
  e._x_doHide || (e._x_doHide = () => {
    C(() => {
      e.style.setProperty("display", "none", t.includes("important") ? "important" : void 0);
    });
  }), e._x_doShow || (e._x_doShow = () => {
    C(() => {
      e.style.length === 1 && e.style.display === "none" ? e.removeAttribute("style") : e.style.removeProperty("display");
    });
  });
  let o = () => {
    e._x_doHide(), e._x_isShown = false;
  }, a = () => {
    e._x_doShow(), e._x_isShown = true;
  }, s = () => setTimeout(a), u = st((d) => d ? a() : o(), (d) => {
    typeof e._x_toggleAndCascadeWithTransitions == "function" ? e._x_toggleAndCascadeWithTransitions(e, d, a, o) : d ? s() : o();
  }), l, f = true;
  r(() => i((d) => {
    !f && d === l || (t.includes("immediate") && (d ? s() : o()), u(d), l = d, f = false);
  }));
});
S("for", (e, { expression: t }, { effect: n, cleanup: r }) => {
  let i = po(t), o = I(e, i.items), a = I(e, e._x_keyExpression || "index");
  e._x_prevKeys = [], e._x_lookup = {}, n(() => fo(e, i, o, a)), r(() => {
    Object.values(e._x_lookup).forEach((s) => s.remove()), delete e._x_prevKeys, delete e._x_lookup;
  });
});
function fo(e, t, n, r) {
  let i = (a) => typeof a == "object" && !Array.isArray(a), o = e;
  n((a) => {
    _o(a) && a >= 0 && (a = Array.from(Array(a).keys(), (p) => p + 1)), a === void 0 && (a = []);
    let s = e._x_lookup, u = e._x_prevKeys, l = [], f = [];
    if (i(a))
      a = Object.entries(a).map(([p, x]) => {
        let E = Wt(t, x, p, a);
        r((T) => f.push(T), { scope: W({ index: p }, E) }), l.push(E);
      });
    else
      for (let p = 0; p < a.length; p++) {
        let x = Wt(t, a[p], p, a);
        r((E) => f.push(E), { scope: W({ index: p }, x) }), l.push(x);
      }
    let d = [], h = [], A = [], $ = [];
    for (let p = 0; p < u.length; p++) {
      let x = u[p];
      f.indexOf(x) === -1 && A.push(x);
    }
    u = u.filter((p) => !A.includes(p));
    let X = "template";
    for (let p = 0; p < f.length; p++) {
      let x = f[p], E = u.indexOf(x);
      if (E === -1)
        u.splice(p, 0, x), d.push([X, p]);
      else if (E !== p) {
        let T = u.splice(p, 1)[0], M = u.splice(E - 1, 1)[0];
        u.splice(p, 0, M), u.splice(E, 0, T), h.push([T, M]);
      } else
        $.push(x);
      X = x;
    }
    for (let p = 0; p < A.length; p++) {
      let x = A[p];
      s[x]._x_effects && s[x]._x_effects.forEach(Ut), s[x].remove(), s[x] = null, delete s[x];
    }
    for (let p = 0; p < h.length; p++) {
      let [x, E] = h[p], T = s[x], M = s[E], V = document.createElement("div");
      C(() => {
        M.after(V), T.after(M), M._x_currentIfEl && M.after(M._x_currentIfEl), V.before(T), T._x_currentIfEl && T.after(T._x_currentIfEl), V.remove();
      }), Dt(M, l[f.indexOf(E)]);
    }
    for (let p = 0; p < d.length; p++) {
      let [x, E] = d[p], T = x === "template" ? o : s[x];
      T._x_currentIfEl && (T = T._x_currentIfEl);
      let M = l[E], V = f[E], D = document.importNode(o.content, true).firstElementChild;
      ve(D, ie(M), o), C(() => {
        T.after(D), z(D);
      }), typeof V == "object" && ne("x-for key cannot be an object, it must be a string or an integer", o), s[V] = D;
    }
    for (let p = 0; p < $.length; p++)
      Dt(s[$[p]], l[f.indexOf($[p])]);
    o._x_prevKeys = f;
  });
}
function po(e) {
  let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, n = /^\s*\(|\)\s*$/g, r = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, i = e.match(r);
  if (!i)
    return;
  let o = {};
  o.items = i[2].trim();
  let a = i[1].replace(n, "").trim(), s = a.match(t);
  return s ? (o.item = a.replace(t, "").trim(), o.index = s[1].trim(), s[2] && (o.collection = s[2].trim())) : o.item = a, o;
}
function Wt(e, t, n, r) {
  let i = {};
  return /^\[.*\]$/.test(e.item) && Array.isArray(t) ? e.item.replace("[", "").replace("]", "").split(",").map((a) => a.trim()).forEach((a, s) => {
    i[a] = t[s];
  }) : /^\{.*\}$/.test(e.item) && !Array.isArray(t) && typeof t == "object" ? e.item.replace("{", "").replace("}", "").split(",").map((a) => a.trim()).forEach((a) => {
    i[a] = t[a];
  }) : i[e.item] = t, e.index && (i[e.index] = n), e.collection && (i[e.collection] = r), i;
}
function _o(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function sr() {
}
sr.inline = (e, { expression: t }, { cleanup: n }) => {
  let r = Re(e);
  r._x_refs || (r._x_refs = {}), r._x_refs[t] = e, n(() => delete r._x_refs[t]);
};
S("ref", sr);
S("if", (e, { expression: t }, { effect: n, cleanup: r }) => {
  let i = I(e, t), o = () => {
    if (e._x_currentIfEl)
      return e._x_currentIfEl;
    let s = e.content.cloneNode(true).firstElementChild;
    return ve(s, {}, e), C(() => {
      e.after(s), z(s);
    }), e._x_currentIfEl = s, e._x_undoIf = () => {
      H(s, (u) => {
        u._x_effects && u._x_effects.forEach(Ut);
      }), s.remove(), delete e._x_currentIfEl;
    }, s;
  }, a = () => {
    e._x_undoIf && (e._x_undoIf(), delete e._x_undoIf);
  };
  n(() => i((s) => {
    s ? o() : a();
  })), r(() => e._x_undoIf && e._x_undoIf());
});
S("id", (e, { expression: t }, { evaluate: n }) => {
  n(t).forEach((i) => Xi(e, i));
});
mt(fn("@", dn(ae("on:"))));
S("on", xe((e, { value: t, modifiers: n, expression: r }, { cleanup: i }) => {
  let o = r ? I(e, r) : () => {
  };
  e.tagName.toLowerCase() === "template" && (e._x_forwardEvents || (e._x_forwardEvents = []), e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
  let a = dt(e, t, n, (s) => {
    o(() => {
    }, { scope: { $event: s }, params: [s] });
  });
  i(() => a());
}));
qe("Collapse", "collapse", "collapse");
qe("Intersect", "intersect", "intersect");
qe("Focus", "trap", "focus");
qe("Mask", "mask", "mask");
function qe(e, t, n) {
  S(t, (r) => ne(`You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`, r));
}
me.setEvaluator(sn);
me.setReactivityEngine({ reactive: Rt, effect: Mi, release: Ci, raw: m });
var ho = me;
var It = ho;
function go(e) {
  let t = document.createElement("template");
  return t.innerHTML = e, t.content.firstElementChild;
}
function vo(e) {
  return e.nodeType === 3 || e.nodeType === 8;
}
var b = { replace(e, t, n) {
  let r = e.indexOf(t);
  if (r === -1)
    throw "Cant find element in children";
  return t.replaceWith(n), e[r] = n, e;
}, before(e, t, n) {
  let r = e.indexOf(t);
  if (r === -1)
    throw "Cant find element in children";
  return t.before(n), e.splice(r, 0, n), e;
}, append(e, t, n) {
  let r = e[e.length - 1];
  return n(t), e.push(t), e;
}, remove(e, t) {
  if (e.indexOf(t) === -1)
    throw "Cant find element in children";
  return t.remove(), e.filter((r) => r !== t);
}, first(e) {
  return this.teleportTo(e[0]);
}, next(e, t) {
  let n = e.indexOf(t);
  if (n !== -1)
    return this.teleportTo(this.teleportBack(e[n + 1]));
}, teleportTo(e) {
  return e && (e._x_teleport ? e._x_teleport : e);
}, teleportBack(e) {
  return e && (e._x_teleportBack ? e._x_teleportBack : e);
} };
var yo = () => {
};
var xo = () => {
};
function Pt(e, t, n) {
  let r, i, o, a, s, u, l, f, d, h;
  function A(c = {}) {
    let _ = (O) => O.getAttribute("key"), y = () => {
    };
    s = c.updating || y, u = c.updated || y, l = c.removing || y, f = c.removed || y, d = c.adding || y, h = c.added || y, o = c.key || _, a = c.lookahead || false;
  }
  function $(c, _) {
    if (X(c, _))
      return p(c, _);
    let y = false;
    if (!se(s, c, _, () => y = true)) {
      if (window.Alpine && mo(c, _, () => y = true), vo(_)) {
        x(c, _), u(c, _);
        return;
      }
      y || E(c, _), u(c, _), T(Array.from(c.childNodes), Array.from(_.childNodes), (O) => {
        c.appendChild(O);
      });
    }
  }
  function X(c, _) {
    return c.nodeType != _.nodeType || c.nodeName != _.nodeName || M(c) != M(_);
  }
  function p(c, _) {
    if (se(l, c))
      return;
    let y = _.cloneNode(true);
    se(d, y) || (b.replace([c], c, y), f(c), h(y));
  }
  function x(c, _) {
    let y = _.nodeValue;
    c.nodeValue !== y && (c.nodeValue = y);
  }
  function E(c, _) {
    if (c._x_isShown && !_._x_isShown || !c._x_isShown && _._x_isShown)
      return;
    let y = Array.from(c.attributes), O = Array.from(_.attributes);
    for (let N = y.length - 1; N >= 0; N--) {
      let v = y[N].name;
      _.hasAttribute(v) || c.removeAttribute(v);
    }
    for (let N = O.length - 1; N >= 0; N--) {
      let v = O[N].name, g = O[N].value;
      c.getAttribute(v) !== g && c.setAttribute(v, g);
    }
  }
  function T(c, _, y) {
    let O = {}, N = {}, v = b.first(_), g = b.first(c);
    for (; v; ) {
      let P = M(v), j = M(g);
      if (!g)
        if (P && N[P]) {
          let w = N[P];
          c = b.append(c, w, y), g = w;
        } else {
          if (!se(d, v)) {
            let w = v.cloneNode(true);
            c = b.append(c, w, y), h(w);
          }
          v = b.next(_, v);
          continue;
        }
      let be = (w) => w.nodeType === 8 && w.textContent === " __BLOCK__ ", we = (w) => w.nodeType === 8 && w.textContent === " __ENDBLOCK__ ";
      if (be(v) && be(g)) {
        let w = [], ue, F = 0;
        for (; g; ) {
          let R = b.next(c, g);
          if (be(R))
            F++;
          else if (we(R) && F > 0)
            F--;
          else if (we(R) && F === 0) {
            g = b.next(c, R), ue = R;
            break;
          }
          w.push(R), g = R;
        }
        let Lt = [];
        for (F = 0; v; ) {
          let R = b.next(_, v);
          if (be(R))
            F++;
          else if (we(R) && F > 0)
            F--;
          else if (we(R) && F === 0) {
            v = b.next(_, R);
            break;
          }
          Lt.push(R), v = R;
        }
        T(w, Lt, (R) => ue.before(R));
        continue;
      }
      if (g.nodeType === 1 && a) {
        let w = b.next(_, v), ue = false;
        for (; !ue && w; )
          g.isEqualNode(w) && (ue = true, [c, g] = D(c, v, g), j = M(g)), w = b.next(_, w);
      }
      if (P !== j) {
        if (!P && j) {
          N[j] = g, [c, g] = D(c, v, g), c = b.remove(c, N[j]), g = b.next(c, g), v = b.next(_, v);
          continue;
        }
        if (P && !j && O[P] && (c = b.replace(c, g, O[P]), g = O[P]), P && j) {
          let w = O[P];
          if (w)
            N[j] = g, c = b.replace(c, g, w), g = w;
          else {
            N[j] = g, [c, g] = D(c, v, g), c = b.remove(c, N[j]), g = b.next(c, g), v = b.next(_, v);
            continue;
          }
        }
      }
      let cr = g && b.next(c, g);
      $(g, v), v = v && b.next(_, v), g = cr;
    }
    let We = [];
    for (; g; )
      se(l, g) || We.push(g), g = b.next(c, g);
    for (; We.length; ) {
      let P = We.shift();
      P.remove(), f(P);
    }
  }
  function M(c) {
    return c && c.nodeType === 1 && o(c);
  }
  function V(c) {
    let _ = {};
    return c.forEach((y) => {
      let O = M(y);
      O && (_[O] = y);
    }), _;
  }
  function D(c, _, y) {
    if (!se(d, _)) {
      let O = _.cloneNode(true);
      return c = b.before(c, y, O), h(O), [c, O];
    }
    return [c, _];
  }
  return A(n), r = e, i = typeof t == "string" ? go(t) : t, window.Alpine && window.Alpine.closestDataStack && !e._x_dataStack && (i._x_dataStack = window.Alpine.closestDataStack(e), i._x_dataStack && window.Alpine.clone(e, i)), $(e, i), r = void 0, i = void 0, e;
}
Pt.step = () => yo();
Pt.log = (e) => {
  xo = e;
};
function se(e, ...t) {
  let n = false;
  return e(...t, () => n = true), n;
}
function mo(e, t, n) {
  e.nodeType === 1 && e._x_dataStack && window.Alpine.clone(e, t);
}
function bo(e) {
  e.morph = Pt;
}
var ur = bo;
It.plugin(ur);
var wo = /INPUT/i;
var Eo = /date|datetime-local|email|month|number|password|range|search|tel|text|time|url|week/i;
var Ao = /TEXTAREA/i;
function So(e, t, n, r) {
  if (e.nodeType !== Node.ELEMENT_NODE || e !== document.activeElement)
    return;
  if (e.tagName.match(Ao) || e.tagName.match(wo) && e.getAttribute("type").match(Eo))
    return r();
}
function $t(e, t) {
  It.morph(e, t, { updating: So });
}
var Q = { before: "turbo-boost:stream:before-invoke", after: "turbo-boost:stream:after-invoke", finish: "turbo-boost:stream:finish-invoke" };
function Ve(e, t, n) {
  let { object: r, target: i } = e;
  t = t || {}, t = Ee(W({}, t), { object: e.object });
  let o = { detail: t, bubbles: true };
  i.dispatchEvent(new CustomEvent(Q.before, o));
  let { delay: a } = t.invoke || {};
  a = a || 0;
  let s = () => {
    let u = n(r);
    o.detail.result = u, i.dispatchEvent(new CustomEvent(Q.after, o));
    let l;
    u instanceof Animation && (l = u.finished), u instanceof Promise && (l = u), l ? l.then(() => {
      o.detail.promise = "fulfilled", i.dispatchEvent(new CustomEvent(Q.finish, o));
    }, () => {
      o.detail.promise = "rejected", i.dispatchEvent(new CustomEvent(Q.finish, o));
    }) : i.dispatchEvent(new CustomEvent(Q.finish, o));
  };
  a > 0 ? setTimeout(s, a) : s();
}
function Oo(e, t, n) {
  let r = t[0], i = t[1], o = { method: e, eventName: r, eventOptions: i };
  n.forEach((a) => Ve(a, o, (s) => s.dispatchEvent(new CustomEvent(r, i))));
}
function To(e, t, n) {
  let r = t[0], i = { method: e, html: r };
  n.forEach((o) => Ve(o, i, (a) => $t(a, r)));
}
function Mo(e, t, n) {
  let r = e.slice(0, -1).trim(), i = t[0], o = { method: e, property: r, value: i };
  n.forEach((a) => Ve(a, o, (s) => s[r] = i));
}
function Co(e, t, n) {
  let r = { method: e, args: t };
  n.forEach((i) => Ve(i, r, (o) => o[e].apply(o, t)));
}
function lr(e, t, n) {
  return e.match(/^dispatch(Event)?$/) ? Oo(e, t, n) : e.match(/^morph|mutate$/) ? To(e, t, n) : e.endsWith("=") ? Mo(e, t, n) : Co(e, t, n);
}
function kt() {
  let e = JSON.parse(this.templateContent.textContent), { id: t, selector: n, receiver: r, method: i, args: o, delay: a } = e, s = [{ object: self, target: self }];
  n && (s = Array.from(document.querySelectorAll(n)).map((u) => ({ object: u, target: u }))), r && (s = s.map((u) => {
    let { object: l, target: f } = u, d = r.split(".");
    for (; d.length > 0; )
      l = l[d.shift()], l.dispatchEvent && (f = l);
    return { object: l, target: f };
  })), a > 0 ? setTimeout(() => lr(i, o, s), a) : lr(i, o, s);
}
if (!self.Turbo)
  throw new Error("`Turbo` is not defined! Be sure to import `@turbo-boost/streams` after `@hotwired/turbo` or `@hotwired/turbo-rails`.");
if (!Turbo.StreamActions)
  throw new Error("`Turbo.StreamActions` is not defined! Verify that you are running >= `7.2.0` of `@hotwired/turbo`.");
Turbo.StreamActions.invoke = kt;
self.TurboBoost = self.TurboBoost || {};
self.TurboBoost.Streams = { invoke: kt, invokeEvents: Q };
console.info("@turbo-boost/streams has initialized and registered new stream actions with Turbo.");
var Jo = self.TurboBoost.Streams;

// app/javascript/meta.js
var Meta = class {
  get element() {
    return document.querySelector('meta[name="turbo-boost"]');
  }
  get token() {
    return this.element.getAttribute("content");
  }
  get busy() {
    return this.element.dataset.busy === "true";
  }
  set busy(value) {
    return this.element.dataset.busy = !!value;
  }
};
var meta_default = new Meta();

// app/javascript/events.js
var commandEvents = {
  start: "turbo-boost:command:start",
  success: "turbo-boost:command:success",
  finish: "turbo-boost:command:finish",
  abort: "turbo-boost:command:abort",
  dispatchFailure: "turbo-boost:command:dispatch-failure",
  clientError: "turbo-boost:command:client-error",
  serverError: "turbo-boost:command:server-error"
};
var stateEvents = {
  stateLoad: "turbo-boost:state:load",
  stateChange: "turbo-boost:state:change"
};
var allEvents = __spreadValues(__spreadValues({}, commandEvents), stateEvents);
function dispatch(name, target, options = {}) {
  options = options || {};
  options.detail = __spreadValues({}, options.detail);
  options.detail.promises = options.detail.promises || [];
  target = target || document;
  const evt = new CustomEvent(name, __spreadProps(__spreadValues({}, options), { bubbles: true }));
  target.dispatchEvent(evt);
  return Promise.all(evt.detail.promises).then(
    // resolution ............................................................................................
    (values) => {
      evt.detail.promiseResults = values;
      switch (name) {
        case commandEvents.start:
          const value = values.find(
            (value2) => typeof value2 === "object" && value2.method === "TurboBoost.Commands.confirmMethod"
          ) || {};
          const { result } = value;
          if (result === false) {
            evt.preventDefault();
            const detail = { message: "The user aborted the command!" };
            dispatch(commandEvents.abort, target, { detail });
          }
      }
      return Promise.resolve(evt);
    },
    // rejection (i.e. an error occurred or one of the promises was rejected) ................................
    (reason) => {
      evt.preventDefault();
      const message = `The ${name} event has been prevented because an error occurred or a promise was rejected in one of its handlers!`;
      dispatch(commandEvents.dispatchFailure, target, {
        detail: { message, reason }
      });
      return Promise.reject(evt);
    }
  );
}

// app/javascript/state/observable.js
var head;
function observable(object, parent = null) {
  if (!object || typeof object !== "object")
    return object;
  const proxy = new Proxy(object, {
    deleteProperty(target, key) {
      delete target[key];
      dispatch(stateEvents.stateChange, meta_default.element, { detail: { state: head } });
      return true;
    },
    set(target, key, value, receiver) {
      target[key] = observable(value, this);
      dispatch(stateEvents.stateChange, meta_default.element, { detail: { state: head } });
      return true;
    }
  });
  if (Array.isArray(object)) {
    object.forEach((value, index) => object[index] = observable(value, proxy));
  } else if (typeof object === "object") {
    for (const [key, value] of Object.entries(object))
      object[key] = observable(value, proxy);
  }
  if (!parent)
    head = proxy;
  return proxy;
}
var observable_default = observable;

// app/javascript/state/index.js
var loadedState;
var currentState;
var changedState;
var loadStateTimeout;
function loadState() {
  if (!meta_default.element)
    return loadStateLater();
  const json = atob(meta_default.element.dataset.state);
  changedState = {};
  currentState = observable_default(JSON.parse(json));
  loadedState = __spreadValues({}, currentState);
  delete meta_default.element.dataset.clientStateChange;
  setTimeout(
    () => dispatch(stateEvents.stateLoad, meta_default.element, {
      detail: { state: currentState }
    })
  );
}
function loadStateLater() {
  clearTimeout(loadStateTimeout);
  loadStateTimeout = setTimeout(loadState, 10);
}
if (!loadedState)
  loadState();
addEventListener("DOMContentLoaded", loadStateLater);
addEventListener("load", loadStateLater);
addEventListener("turbo:load", loadStateLater);
addEventListener("turbo:frame-load", loadStateLater);
addEventListener(commandEvents.success, loadStateLater);
addEventListener(stateEvents.stateChange, (event) => {
  changedState = {};
  for (const [key, value] of Object.entries(currentState))
    if (loadedState[key] !== value)
      changedState[key] = value;
  meta_default.element.dataset.clientStateChange = true;
  meta_default.element.dataset.state = btoa(JSON.stringify(currentState));
});
var state_default = {
  events: stateEvents,
  get current() {
    return currentState;
  },
  get delta() {
    return changedState;
  },
  // The UI state changes are split into chunks and sent to the server in an HTTP request header.
  // Max size for an HTTP header is around 4k or 4,000 bytes.
  // A Base64 character is an 8-bit-padded ASCII character... or 1 byte
  //
  // SEE: lib/state.rb - for info on how `state` is serialized/deserialized
  get payloadChunks() {
    return btoa(JSON.stringify(changedState)).match(/.{1,2000}/g);
  }
};

// app/javascript/renderer.js
function replaceDocument(content) {
  const head2 = "<html";
  const tail = "</html";
  const headIndex = content.indexOf(head2);
  const tailIndex = content.lastIndexOf(tail);
  if (headIndex >= 0 && tailIndex >= 0) {
    const html = content.slice(content.indexOf(">", headIndex) + 1, tailIndex);
    document.documentElement.innerHTML = html;
  }
}
function append(content) {
  document.body.insertAdjacentHTML("beforeend", content);
}
var renderer_default = { append, replaceDocument };

// app/javascript/activity.js
var active = {};
function add(payload) {
  active[payload.id] = payload;
}
function remove(id) {
  delete active[id];
}
var activity_default = {
  add,
  remove,
  get commands() {
    return [...Object.values(active)];
  },
  get length() {
    return Object.keys(active).length;
  }
};

// app/javascript/lifecycle.js
function finish(event) {
  event.detail.endedAt = Date.now();
  event.detail.milliseconds = event.detail.endedAt - event.detail.startedAt;
  setTimeout(
    () => dispatch(commandEvents.finish, event.target, { detail: event.detail }),
    25
  );
}
addEventListener(commandEvents.serverError, finish);
addEventListener(commandEvents.success, finish);
addEventListener(
  commandEvents.finish,
  (event) => activity_default.remove(event.detail.id),
  true
);
var lifecycle_default = { events: commandEvents };

// app/javascript/turbo.js
var frameSources = {};
addEventListener("turbo:before-fetch-request", (event) => {
  const frame = event.target.closest("turbo-frame");
  const { fetchOptions } = event.detail;
  if (meta_default.busy) {
    let acceptHeaders = [
      "text/vnd.turbo-boost.html",
      fetchOptions.headers["Accept"]
    ];
    acceptHeaders = acceptHeaders.filter((entry) => entry && entry.trim().length > 0).join(", ");
    fetchOptions.headers["Accept"] = acceptHeaders;
    fetchOptions.headers["TurboBoost-Token"] = meta_default.token;
  }
  state_default.payloadChunks.forEach((chunk, i) => {
    fetchOptions.headers[`TurboBoost-State-${i.toString().padStart(4, "0")}`] = chunk;
  });
});
addEventListener("turbo:before-fetch-response", (event) => {
  const frame = event.target.closest("turbo-frame");
  const { fetchResponse: response } = event.detail;
  if (frame)
    frameSources[frame.id] = frame.src;
  if (response.header("TurboBoost")) {
    if (response.statusCode < 200 || response.statusCode > 399) {
      const error2 = `Server returned a ${response.statusCode} status code! TurboBoost Commands require 2XX-3XX status codes.`;
      dispatch(
        lifecycle_default.events.clientError,
        document,
        { detail: __spreadProps(__spreadValues({}, event.detail), { error: error2 }) },
        true
      );
    }
    if (response.header("TurboBoost") === "Append") {
      event.preventDefault();
      response.responseText.then((content) => renderer_default.append(content));
    }
  }
});
addEventListener("turbo:frame-load", (event) => {
  const frame = event.target.closest("turbo-frame");
  frame.dataset.turboBoostSrc = frameSources[frame.id] || frame.src || frame.dataset.turboBoostSrc;
  delete frameSources[frame.id];
});

// app/javascript/schema.js
var schema = {
  frameAttribute: "data-turbo-frame",
  methodAttribute: "data-turbo-method",
  commandAttribute: "data-turbo-command"
};
var schema_default = __spreadValues({}, schema);

// app/javascript/delegates.js
var events = [];
var eventListener;
function register(eventName, selectors) {
  const match = events.find((evt) => evt.name === eventName);
  if (match)
    events.splice(events.indexOf(match), 1);
  events = [{ name: eventName, selectors }, ...events];
  document.addEventListener(eventName, eventListener, true);
  return __spreadValues({}, events.find((evt) => evt.name === eventName));
}
function getRegisteredEventForElement(element) {
  return events.find(
    (evt) => evt.selectors.find(
      (selector) => Array.from(document.querySelectorAll(selector)).find((el) => el === element)
    )
  );
}
function isRegisteredForElement(eventName, element) {
  const evt = getRegisteredEventForElement(element);
  return evt && evt.name === eventName;
}
var delegates_default = {
  register,
  isRegisteredForElement,
  get events() {
    return [...events];
  },
  set handler(fn2) {
    eventListener = fn2;
  }
};

// app/javascript/elements.js
function findClosestCommand(element) {
  return element.closest(`[${schema_default.commandAttribute}]`);
}
function findClosestFrameWithSource(element) {
  return element.closest("turbo-frame[src]") || element.closest("turbo-frame[data-turbo-frame-src]") || element.closest("turbo-frame");
}
function assignElementValueToPayload(element, payload = {}) {
  if (element.tagName.toLowerCase() !== "select")
    return payload.value = element.value || null;
  if (!element.multiple)
    return payload.value = element.options[element.selectedIndex].value;
  payload.values = Array.from(element.options).reduce((memo, option) => {
    if (option.selected)
      memo.push(option.value);
    return memo;
  }, []);
}
function buildAttributePayload(element) {
  const payload = Array.from(element.attributes).reduce((memo, attr) => {
    let value = attr.value;
    memo[attr.name] = value;
    return memo;
  }, {});
  payload.tag = element.tagName;
  payload.checked = !!element.checked;
  payload.disabled = !!element.disabled;
  assignElementValueToPayload(element, payload);
  delete payload.class;
  delete payload.action;
  delete payload.href;
  delete payload[schema_default.commandAttribute];
  delete payload[schema_default.frameAttribute];
  return payload;
}
var elements_default = {
  buildAttributePayload,
  findClosestCommand,
  findClosestFrameWithSource
};

// app/javascript/drivers/form.js
function invokeCommand(form, payload = {}) {
  payload.token = meta_default.token;
  const input = document.createElement("input");
  input.type = "hidden";
  input.name = "turbo_boost_command";
  input.value = JSON.stringify(payload);
  form.appendChild(input);
}
var form_default = { invokeCommand };

// app/javascript/urls.js
function build(urlString, payload = {}) {
  const a = document.createElement("a");
  a.href = urlString;
  const url = new URL(a);
  url.searchParams.set("turbo_boost_command", JSON.stringify(payload));
  return url;
}
var urls_default = { build };

// app/javascript/drivers/frame.js
function invokeCommand2(frame, payload) {
  const src2 = payload.src;
  payload = __spreadValues({}, payload);
  delete payload.src;
  frame.src = urls_default.build(src2, payload);
}
var frame_default = { invokeCommand: invokeCommand2 };

// app/javascript/drivers/method.js
function invokeCommand3(element, payload = {}) {
  const src2 = payload.src;
  payload = __spreadValues({}, payload);
  delete payload.src;
  delete payload.href;
  element.setAttribute("href", urls_default.build(src2, payload));
}
var method_default = { invokeCommand: invokeCommand3 };

// app/javascript/drivers/window.js
function aborted(event) {
  const xhr = event.target;
  dispatch(lifecycle_default.events.abort, document, {
    detail: __spreadProps(__spreadValues({}, event.detail), { xhr })
  });
}
function errored(event) {
  const xhr = event.target;
  xhr.getResponseHeader("TurboBoost") === "Append" ? renderer_default.append(xhr.responseText) : renderer_default.replaceDocument(xhr.responseText);
  const error2 = `Server returned a ${xhr.status} status code! TurboBoost Commands require 2XX-3XX status codes.`;
  dispatch(
    lifecycle_default.events.clientError,
    document,
    { detail: __spreadProps(__spreadValues({}, event.detail), { error: error2, xhr }) },
    true
  );
}
function loaded(event) {
  const xhr = event.target;
  if (xhr.status < 200 || xhr.status > 399)
    return errored(event);
  const content = xhr.responseText;
  xhr.getResponseHeader("TurboBoost") === "Append" ? renderer_default.append(xhr.responseText) : renderer_default.replaceDocument(xhr.responseText);
}
function invokeCommand4(payload) {
  const src2 = payload.src;
  payload = __spreadValues({}, payload);
  delete payload.src;
  try {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", urls_default.build(src2, payload), true);
    xhr.setRequestHeader(
      "Accept",
      "text/vnd.turbo-boost.html, text/html, application/xhtml+xml"
    );
    xhr.setRequestHeader("TurboBoost-Token", meta_default.token);
    state_default.payloadChunks.forEach(
      (chunk, i) => xhr.setRequestHeader(
        `TurboBoost-State-${i.toString().padStart(4, "0")}`,
        chunk
      )
    );
    xhr.addEventListener("abort", aborted);
    xhr.addEventListener("error", errored);
    xhr.addEventListener("load", loaded);
    xhr.send();
  } catch (ex) {
    const message = `Unexpected error sending HTTP request! ${ex.message}`;
    errored(ex, { detail: { message } });
  }
}
var window_default = { invokeCommand: invokeCommand4 };

// app/javascript/drivers/index.js
function src(element, frame) {
  frame = frame || { dataset: {} };
  return element.href || frame.src || frame.dataset.turboBoostSrc || location.href;
}
function find(element) {
  let frame = elements_default.findClosestFrameWithSource(element);
  const { turboFrame, turboMethod } = element.dataset;
  if (element.tagName.toLowerCase() === "form")
    return {
      name: "form",
      reason: "Element is a form.",
      frame,
      src: element.action,
      invokeCommand: form_default.invokeCommand
    };
  if (turboMethod && turboMethod.length > 0)
    return {
      name: "method",
      reason: "Element defines data-turbo-method.",
      frame,
      src: element.href,
      invokeCommand: method_default.invokeCommand
    };
  if (turboFrame && turboFrame !== "_self") {
    frame = document.getElementById(turboFrame);
    return {
      name: "frame",
      reason: "element targets a frame that is not _self",
      frame,
      src: src(element, frame),
      invokeCommand: frame_default.invokeCommand
    };
  }
  if ((!turboFrame || turboFrame === "_self") && frame)
    return {
      name: "frame",
      reason: "element does NOT target a frame or targets _self and is contained by a frame",
      frame,
      src: src(element, frame),
      invokeCommand: frame_default.invokeCommand
    };
  return {
    name: "window",
    reason: "element matches one or more of the following conditions (targets _top, does NOT target a frame, is NOT contained by a frame)",
    frame: null,
    src: src(element),
    invokeCommand: window_default.invokeCommand
  };
}
var drivers_default = { find };

// app/javascript/logger.js
var currentLevel = "unknown";
var logLevels = {
  debug: Object.values(allEvents),
  info: Object.values(allEvents),
  warn: [allEvents.abort, allEvents.clientError, allEvents.serverError],
  error: [allEvents.clientError, allEvents.serverError],
  unknown: []
};
Object.values(allEvents).forEach((name) => {
  addEventListener(name, (event) => {
    if (logLevels[currentLevel].includes(event.type)) {
      const level = currentLevel === "debug" ? "log" : currentLevel;
      console[level](event.type, { target: event.target, detail: event.detail });
    }
  });
});
var logger_default = {
  get level() {
    return currentLevel;
  },
  set level(value) {
    if (!Object.keys(logLevels).includes(value))
      value = "unknown";
    return currentLevel = value;
  }
};

// app/javascript/uuids.js
function v4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
    /[018]/g,
    (c) => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}
var uuids_default = { v4 };

// app/javascript/confirm.js
var confirmMethod;
function setConfirmMethod(method) {
  confirmMethod = method;
}
function showConfirm(event) {
  const element = event.target.closest("[data-turbo-command]");
  const { turboConfirm: message } = element.dataset;
  if (!message)
    return;
  event.detail.promises.push(
    new Promise(
      (resolve, _reject) => resolve({
        method: "TurboBoost.Commands.confirmMethod",
        result: confirmMethod(message)
      })
    )
  );
}
setConfirmMethod((message) => confirm(message));
setConfirmMethod((message) => {
  throw "Nate said it fails!";
});
document.addEventListener(commandEvents.start, showConfirm, true);

// app/javascript/index.js
function buildCommandPayload(id, element) {
  return {
    id,
    // uniquely identifies the command
    name: element.getAttribute(schema_default.commandAttribute),
    elementId: element.id.length > 0 ? element.id : null,
    elementAttributes: elements_default.buildAttributePayload(element),
    startedAt: Date.now()
  };
}
function invokeCommand5(event) {
  let element;
  let payload = {};
  try {
    element = elements_default.findClosestCommand(event.target);
    if (!element)
      return;
    if (!delegates_default.isRegisteredForElement(event.type, element))
      return;
    const commandId = `turbo-command-${uuids_default.v4()}`;
    let driver = drivers_default.find(element);
    let payload2 = __spreadProps(__spreadValues({}, buildCommandPayload(commandId, element)), {
      driver: driver.name,
      frameId: driver.frame ? driver.frame.id : null,
      src: driver.src
    });
    const options = { cancelable: true, detail: payload2 };
    dispatch(commandEvents.start, element, options).then(
      // resolution ..........................................................................................
      (evt) => {
        if (evt.defaultPrevented)
          return event.preventDefault();
        driver = drivers_default.find(element);
        payload2 = __spreadProps(__spreadValues({}, buildCommandPayload(commandId, element)), {
          driver: driver.name,
          frameId: driver.frame ? driver.frame.id : null,
          src: driver.src
        });
        activity_default.add(payload2);
        if (["frame", "window"].includes(driver.name))
          event.preventDefault();
        meta_default.busy = true;
        setTimeout(() => meta_default.busy = false, 10);
        switch (driver.name) {
          case "method":
            return driver.invokeCommand(element, payload2);
          case "form":
            return driver.invokeCommand(element, payload2);
          case "frame":
            return driver.invokeCommand(driver.frame, payload2);
          case "window":
            return driver.invokeCommand(payload2);
        }
      },
      // rejection ...........................................................................................
      (_reason) => event.preventDefault()
    );
  } catch (error2) {
    event.preventDefault();
    dispatch(commandEvents.clientError, element, {
      detail: __spreadProps(__spreadValues({}, payload), { error: error2 })
    });
  }
}
delegates_default.handler = invokeCommand5;
delegates_default.register("click", [`[${schema_default.commandAttribute}]`]);
delegates_default.register("submit", [`form[${schema_default.commandAttribute}]`]);
delegates_default.register("change", [
  `input[${schema_default.commandAttribute}]`,
  `select[${schema_default.commandAttribute}]`,
  `textarea[${schema_default.commandAttribute}]`
]);
self.TurboBoost = self.TurboBoost || {};
self.TurboBoost = __spreadProps(__spreadValues({}, self.TurboBoost), {
  stateEvents,
  get state() {
    return state_default.current;
  },
  get stateDelta() {
    return state_default.delta;
  }
});
self.TurboBoost.Commands = {
  logger: logger_default,
  schema: schema_default,
  setConfirmMethod,
  events: commandEvents,
  registerEventDelegate: delegates_default.register,
  get eventDelegates() {
    return delegates_default.events;
  }
};
var javascript_default = self.TurboBoost.Commands;
export {
  javascript_default as default
};
//# sourceMappingURL=commands.js.map
