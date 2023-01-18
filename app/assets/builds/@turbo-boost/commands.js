var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// node_modules/@turbo-boost/streams/app/assets/builds/@turbo-boost/streams.js
var ln = Object.defineProperty;
var un = Object.defineProperties;
var cn = Object.getOwnPropertyDescriptors;
var Nt = Object.getOwnPropertySymbols;
var fn = Object.prototype.hasOwnProperty;
var dn = Object.prototype.propertyIsEnumerable;
var De = (e, t, r) => t in e ? ln(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r;
var ie = (e, t) => {
  for (var r in t || (t = {}))
    fn.call(t, r) && De(e, r, t[r]);
  if (Nt)
    for (var r of Nt(t))
      dn.call(t, r) && De(e, r, t[r]);
  return e;
};
var Rt = (e, t) => un(e, cn(t));
var Be = (e, t, r) => (De(e, typeof t != "symbol" ? t + "" : t, r), r);
function pn(e, t, r = {}) {
  let n = new CustomEvent(t, r);
  e.forEach((i) => i.dispatchEvent(n));
}
var Pt = pn;
var Ve = false;
var Ue = false;
var V = [];
function _n(e) {
  hn(e);
}
function hn(e) {
  V.includes(e) || V.push(e), gn();
}
function Dt(e) {
  let t = V.indexOf(e);
  t !== -1 && V.splice(t, 1);
}
function gn() {
  !Ue && !Ve && (Ve = true, queueMicrotask(vn));
}
function vn() {
  Ve = false, Ue = true;
  for (let e = 0; e < V.length; e++)
    V[e]();
  V.length = 0, Ue = false;
}
var te;
var de;
var we;
var Bt;
var Ye = true;
function mn(e) {
  Ye = false, e(), Ye = true;
}
function xn(e) {
  te = e.reactive, we = e.release, de = (t) => e.effect(t, { scheduler: (r) => {
    Ye ? _n(r) : r();
  } }), Bt = e.raw;
}
function $t(e) {
  de = e;
}
function yn(e) {
  let t = () => {
  };
  return [(n) => {
    let i = de(n);
    return e._x_effects || (e._x_effects = /* @__PURE__ */ new Set(), e._x_runEffects = () => {
      e._x_effects.forEach((o) => o());
    }), e._x_effects.add(i), t = () => {
      i !== void 0 && (e._x_effects.delete(i), we(i));
    }, i;
  }, () => {
    t();
  }];
}
var Ht = [];
var zt = [];
var qt = [];
function bn(e) {
  qt.push(e);
}
function Wt(e, t) {
  typeof t == "function" ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t)) : (t = e, zt.push(t));
}
function wn(e) {
  Ht.push(e);
}
function En(e, t, r) {
  e._x_attributeCleanups || (e._x_attributeCleanups = {}), e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []), e._x_attributeCleanups[t].push(r);
}
function Vt(e, t) {
  e._x_attributeCleanups && Object.entries(e._x_attributeCleanups).forEach(([r, n]) => {
    (t === void 0 || t.includes(r)) && (n.forEach((i) => i()), delete e._x_attributeCleanups[r]);
  });
}
var lt = new MutationObserver(ft);
var ut = false;
function Ut() {
  lt.observe(document, { subtree: true, childList: true, attributes: true, attributeOldValue: true }), ut = true;
}
function An() {
  Sn(), lt.disconnect(), ut = false;
}
var le = [];
var He = false;
function Sn() {
  le = le.concat(lt.takeRecords()), le.length && !He && (He = true, queueMicrotask(() => {
    Tn(), He = false;
  }));
}
function Tn() {
  ft(le), le.length = 0;
}
function A(e) {
  if (!ut)
    return e();
  An();
  let t = e();
  return Ut(), t;
}
var ct = false;
var xe = [];
function On() {
  ct = true;
}
function Cn() {
  ct = false, ft(xe), xe = [];
}
function ft(e) {
  if (ct) {
    xe = xe.concat(e);
    return;
  }
  let t = [], r = [], n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (let o = 0; o < e.length; o++)
    if (!e[o].target._x_ignoreMutationObserver && (e[o].type === "childList" && (e[o].addedNodes.forEach((a) => a.nodeType === 1 && t.push(a)), e[o].removedNodes.forEach((a) => a.nodeType === 1 && r.push(a))), e[o].type === "attributes")) {
      let a = e[o].target, s = e[o].attributeName, l = e[o].oldValue, u = () => {
        n.has(a) || n.set(a, []), n.get(a).push({ name: s, value: a.getAttribute(s) });
      }, f = () => {
        i.has(a) || i.set(a, []), i.get(a).push(s);
      };
      a.hasAttribute(s) && l === null ? u() : a.hasAttribute(s) ? (f(), u()) : f();
    }
  i.forEach((o, a) => {
    Vt(a, o);
  }), n.forEach((o, a) => {
    Ht.forEach((s) => s(a, o));
  });
  for (let o of r)
    if (!t.includes(o) && (zt.forEach((a) => a(o)), o._x_cleanups))
      for (; o._x_cleanups.length; )
        o._x_cleanups.pop()();
  t.forEach((o) => {
    o._x_ignoreSelf = true, o._x_ignore = true;
  });
  for (let o of t)
    r.includes(o) || o.isConnected && (delete o._x_ignoreSelf, delete o._x_ignore, qt.forEach((a) => a(o)), o._x_ignore = true, o._x_ignoreSelf = true);
  t.forEach((o) => {
    delete o._x_ignoreSelf, delete o._x_ignore;
  }), t = null, r = null, n = null, i = null;
}
function Yt(e) {
  return _e(Q(e));
}
function pe(e, t, r) {
  return e._x_dataStack = [t, ...Q(r || e)], () => {
    e._x_dataStack = e._x_dataStack.filter((n) => n !== t);
  };
}
function It(e, t) {
  let r = e._x_dataStack[0];
  Object.entries(t).forEach(([n, i]) => {
    r[n] = i;
  });
}
function Q(e) {
  return e._x_dataStack ? e._x_dataStack : typeof ShadowRoot == "function" && e instanceof ShadowRoot ? Q(e.host) : e.parentNode ? Q(e.parentNode) : [];
}
function _e(e) {
  let t = new Proxy({}, { ownKeys: () => Array.from(new Set(e.flatMap((r) => Object.keys(r)))), has: (r, n) => e.some((i) => i.hasOwnProperty(n)), get: (r, n) => (e.find((i) => {
    if (i.hasOwnProperty(n)) {
      let o = Object.getOwnPropertyDescriptor(i, n);
      if (o.get && o.get._x_alreadyBound || o.set && o.set._x_alreadyBound)
        return true;
      if ((o.get || o.set) && o.enumerable) {
        let a = o.get, s = o.set, l = o;
        a = a && a.bind(t), s = s && s.bind(t), a && (a._x_alreadyBound = true), s && (s._x_alreadyBound = true), Object.defineProperty(i, n, Rt(ie({}, l), { get: a, set: s }));
      }
      return true;
    }
    return false;
  }) || {})[n], set: (r, n, i) => {
    let o = e.find((a) => a.hasOwnProperty(n));
    return o ? o[n] = i : e[e.length - 1][n] = i, true;
  } });
  return t;
}
function Gt(e) {
  let t = (n) => typeof n == "object" && !Array.isArray(n) && n !== null, r = (n, i = "") => {
    Object.entries(Object.getOwnPropertyDescriptors(n)).forEach(([o, { value: a, enumerable: s }]) => {
      if (s === false || a === void 0)
        return;
      let l = i === "" ? o : `${i}.${o}`;
      typeof a == "object" && a !== null && a._x_interceptor ? n[o] = a.initialize(e, l, o) : t(a) && a !== n && !(a instanceof Element) && r(a, l);
    });
  };
  return r(e);
}
function Jt(e, t = () => {
}) {
  let r = { initialValue: void 0, _x_interceptor: true, initialize(n, i, o) {
    return e(this.initialValue, () => Mn(n, i), (a) => Ge(n, i, a), i, o);
  } };
  return t(r), (n) => {
    if (typeof n == "object" && n !== null && n._x_interceptor) {
      let i = r.initialize.bind(r);
      r.initialize = (o, a, s) => {
        let l = n.initialize(o, a, s);
        return r.initialValue = l, i(o, a, s);
      };
    } else
      r.initialValue = n;
    return r;
  };
}
function Mn(e, t) {
  return t.split(".").reduce((r, n) => r[n], e);
}
function Ge(e, t, r) {
  if (typeof t == "string" && (t = t.split(".")), t.length === 1)
    e[t[0]] = r;
  else {
    if (t.length === 0)
      throw error;
    return e[t[0]] || (e[t[0]] = {}), Ge(e[t[0]], t.slice(1), r);
  }
}
var Zt = {};
function k(e, t) {
  Zt[e] = t;
}
function Je(e, t) {
  return Object.entries(Zt).forEach(([r, n]) => {
    Object.defineProperty(e, `$${r}`, { get() {
      let [i, o] = nr(t);
      return i = ie({ interceptor: Jt }, i), Wt(t, o), n(t, i);
    }, enumerable: false });
  }), e;
}
function Nn(e, t, r, ...n) {
  try {
    return r(...n);
  } catch (i) {
    fe(i, e, t);
  }
}
function fe(e, t, r = void 0) {
  Object.assign(e, { el: t, expression: r }), console.warn(`Alpine Expression Error: ${e.message}

${r ? 'Expression: "' + r + `"

` : ""}`, t), setTimeout(() => {
    throw e;
  }, 0);
}
var me = true;
function Rn(e) {
  let t = me;
  me = false, e(), me = t;
}
function Z(e, t, r = {}) {
  let n;
  return O(e, t)((i) => n = i, r), n;
}
function O(...e) {
  return Qt(...e);
}
var Qt = Xt;
function Pn(e) {
  Qt = e;
}
function Xt(e, t) {
  let r = {};
  Je(r, e);
  let n = [r, ...Q(e)];
  if (typeof t == "function")
    return $n(n, t);
  let i = kn(n, t, e);
  return Nn.bind(null, e, t, i);
}
function $n(e, t) {
  return (r = () => {
  }, { scope: n = {}, params: i = [] } = {}) => {
    let o = t.apply(_e([n, ...e]), i);
    ye(r, o);
  };
}
var ze = {};
function In(e, t) {
  if (ze[e])
    return ze[e];
  let r = Object.getPrototypeOf(async function() {
  }).constructor, n = /^[\n\s]*if.*\(.*\)/.test(e) || /^(let|const)\s/.test(e) ? `(() => { ${e} })()` : e, o = (() => {
    try {
      return new r(["__self", "scope"], `with (scope) { __self.result = ${n} }; __self.finished = true; return __self.result;`);
    } catch (a) {
      return fe(a, t, e), Promise.resolve();
    }
  })();
  return ze[e] = o, o;
}
function kn(e, t, r) {
  let n = In(t, r);
  return (i = () => {
  }, { scope: o = {}, params: a = [] } = {}) => {
    n.result = void 0, n.finished = false;
    let s = _e([o, ...e]);
    if (typeof n == "function") {
      let l = n(n, s).catch((u) => fe(u, r, t));
      n.finished ? (ye(i, n.result, s, a, r), n.result = void 0) : l.then((u) => {
        ye(i, u, s, a, r);
      }).catch((u) => fe(u, r, t)).finally(() => n.result = void 0);
    }
  };
}
function ye(e, t, r, n, i) {
  if (me && typeof t == "function") {
    let o = t.apply(r, n);
    o instanceof Promise ? o.then((a) => ye(e, a, r, n)).catch((a) => fe(a, i, t)) : e(o);
  } else
    e(t);
}
var dt = "x-";
function re(e = "") {
  return dt + e;
}
function Ln(e) {
  dt = e;
}
var er = {};
function E(e, t) {
  er[e] = t;
}
function pt(e, t, r) {
  if (t = Array.from(t), e._x_virtualDirectives) {
    let o = Object.entries(e._x_virtualDirectives).map(([s, l]) => ({ name: s, value: l })), a = tr(o);
    o = o.map((s) => a.find((l) => l.name === s.name) ? { name: `x-bind:${s.name}`, value: `"${s.value}"` } : s), t = t.concat(o);
  }
  let n = {};
  return t.map(ar((o, a) => n[o] = a)).filter(lr).map(Kn(n, r)).sort(Dn).map((o) => jn(e, o));
}
function tr(e) {
  return Array.from(e).map(ar()).filter((t) => !lr(t));
}
var Ze = false;
var se = /* @__PURE__ */ new Map();
var rr = Symbol();
function Fn(e) {
  Ze = true;
  let t = Symbol();
  rr = t, se.set(t, []);
  let r = () => {
    for (; se.get(t).length; )
      se.get(t).shift()();
    se.delete(t);
  }, n = () => {
    Ze = false, r();
  };
  e(r), n();
}
function nr(e) {
  let t = [], r = (s) => t.push(s), [n, i] = yn(e);
  return t.push(i), [{ Alpine: he, effect: n, cleanup: r, evaluateLater: O.bind(O, e), evaluate: Z.bind(Z, e) }, () => t.forEach((s) => s())];
}
function jn(e, t) {
  let r = () => {
  }, n = er[t.type] || r, [i, o] = nr(e);
  En(e, t.original, o);
  let a = () => {
    e._x_ignore || e._x_ignoreSelf || (n.inline && n.inline(e, t, i), n = n.bind(n, e, t, i), Ze ? se.get(rr).push(n) : n());
  };
  return a.runCleanups = o, a;
}
var ir = (e, t) => ({ name: r, value: n }) => (r.startsWith(e) && (r = r.replace(e, t)), { name: r, value: n });
var or = (e) => e;
function ar(e = () => {
}) {
  return ({ name: t, value: r }) => {
    let { name: n, value: i } = sr.reduce((o, a) => a(o), { name: t, value: r });
    return n !== t && e(n, t), { name: n, value: i };
  };
}
var sr = [];
function _t(e) {
  sr.push(e);
}
function lr({ name: e }) {
  return ur().test(e);
}
var ur = () => new RegExp(`^${dt}([^:^.]+)\\b`);
function Kn(e, t) {
  return ({ name: r, value: n }) => {
    let i = r.match(ur()), o = r.match(/:([a-zA-Z0-9\-:]+)/), a = r.match(/\.[^.\]]+(?=[^\]]*$)/g) || [], s = t || e[r] || r;
    return { type: i ? i[1] : null, value: o ? o[1] : null, modifiers: a.map((l) => l.replace(".", "")), expression: n, original: s };
  };
}
var Qe = "DEFAULT";
var ge = ["ignore", "ref", "data", "id", "radio", "tabs", "switch", "disclosure", "menu", "listbox", "list", "item", "combobox", "bind", "init", "for", "mask", "model", "modelable", "transition", "show", "if", Qe, "teleport"];
function Dn(e, t) {
  let r = ge.indexOf(e.type) === -1 ? Qe : e.type, n = ge.indexOf(t.type) === -1 ? Qe : t.type;
  return ge.indexOf(r) - ge.indexOf(n);
}
function ue(e, t, r = {}) {
  e.dispatchEvent(new CustomEvent(t, { detail: r, bubbles: true, composed: true, cancelable: true }));
}
var Xe = [];
var ht = false;
function cr(e = () => {
}) {
  return queueMicrotask(() => {
    ht || setTimeout(() => {
      et();
    });
  }), new Promise((t) => {
    Xe.push(() => {
      e(), t();
    });
  });
}
function et() {
  for (ht = false; Xe.length; )
    Xe.shift()();
}
function Bn() {
  ht = true;
}
function G(e, t) {
  if (typeof ShadowRoot == "function" && e instanceof ShadowRoot) {
    Array.from(e.children).forEach((i) => G(i, t));
    return;
  }
  let r = false;
  if (t(e, () => r = true), r)
    return;
  let n = e.firstElementChild;
  for (; n; )
    G(n, t, false), n = n.nextElementSibling;
}
function X(e, ...t) {
  console.warn(`Alpine Warning: ${e}`, ...t);
}
function Hn() {
  document.body || X("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"), ue(document, "alpine:init"), ue(document, "alpine:initializing"), Ut(), bn((t) => H(t, G)), Wt((t) => qn(t)), wn((t, r) => {
    pt(t, r).forEach((n) => n());
  });
  let e = (t) => !Ee(t.parentElement, true);
  Array.from(document.querySelectorAll(pr())).filter(e).forEach((t) => {
    H(t);
  }), ue(document, "alpine:initialized");
}
var gt = [];
var fr = [];
function dr() {
  return gt.map((e) => e());
}
function pr() {
  return gt.concat(fr).map((e) => e());
}
function _r(e) {
  gt.push(e);
}
function hr(e) {
  fr.push(e);
}
function Ee(e, t = false) {
  return Ae(e, (r) => {
    if ((t ? pr() : dr()).some((i) => r.matches(i)))
      return true;
  });
}
function Ae(e, t) {
  if (e) {
    if (t(e))
      return e;
    if (e._x_teleportBack && (e = e._x_teleportBack), !!e.parentElement)
      return Ae(e.parentElement, t);
  }
}
function zn(e) {
  return dr().some((t) => e.matches(t));
}
function H(e, t = G) {
  Fn(() => {
    t(e, (r, n) => {
      pt(r, r.attributes).forEach((i) => i()), r._x_ignore && n();
    });
  });
}
function qn(e) {
  G(e, (t) => Vt(t));
}
function vt(e, t) {
  return Array.isArray(t) ? kt(e, t.join(" ")) : typeof t == "object" && t !== null ? Wn(e, t) : typeof t == "function" ? vt(e, t()) : kt(e, t);
}
function kt(e, t) {
  let r = (o) => o.split(" ").filter(Boolean), n = (o) => o.split(" ").filter((a) => !e.classList.contains(a)).filter(Boolean), i = (o) => (e.classList.add(...o), () => {
    e.classList.remove(...o);
  });
  return t = t === true ? t = "" : t || "", i(n(t));
}
function Wn(e, t) {
  let r = (s) => s.split(" ").filter(Boolean), n = Object.entries(t).flatMap(([s, l]) => l ? r(s) : false).filter(Boolean), i = Object.entries(t).flatMap(([s, l]) => l ? false : r(s)).filter(Boolean), o = [], a = [];
  return i.forEach((s) => {
    e.classList.contains(s) && (e.classList.remove(s), a.push(s));
  }), n.forEach((s) => {
    e.classList.contains(s) || (e.classList.add(s), o.push(s));
  }), () => {
    a.forEach((s) => e.classList.add(s)), o.forEach((s) => e.classList.remove(s));
  };
}
function Se(e, t) {
  return typeof t == "object" && t !== null ? Vn(e, t) : Un(e, t);
}
function Vn(e, t) {
  let r = {};
  return Object.entries(t).forEach(([n, i]) => {
    r[n] = e.style[n], n.startsWith("--") || (n = Yn(n)), e.style.setProperty(n, i);
  }), setTimeout(() => {
    e.style.length === 0 && e.removeAttribute("style");
  }), () => {
    Se(e, r);
  };
}
function Un(e, t) {
  let r = e.getAttribute("style", t);
  return e.setAttribute("style", t), () => {
    e.setAttribute("style", r || "");
  };
}
function Yn(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function tt(e, t = () => {
}) {
  let r = false;
  return function() {
    r ? t.apply(this, arguments) : (r = true, e.apply(this, arguments));
  };
}
E("transition", (e, { value: t, modifiers: r, expression: n }, { evaluate: i }) => {
  typeof n == "function" && (n = i(n)), n ? Gn(e, n, t) : Jn(e, r, t);
});
function Gn(e, t, r) {
  gr(e, vt, ""), { enter: (i) => {
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
  } }[r](t);
}
function Jn(e, t, r) {
  gr(e, Se);
  let n = !t.includes("in") && !t.includes("out") && !r, i = n || t.includes("in") || ["enter"].includes(r), o = n || t.includes("out") || ["leave"].includes(r);
  t.includes("in") && !n && (t = t.filter((v, y) => y < t.indexOf("out"))), t.includes("out") && !n && (t = t.filter((v, y) => y > t.indexOf("out")));
  let a = !t.includes("opacity") && !t.includes("scale"), s = a || t.includes("opacity"), l = a || t.includes("scale"), u = s ? 0 : 1, f = l ? oe(t, "scale", 95) / 100 : 1, _ = oe(t, "delay", 0), m = oe(t, "origin", "center"), R = "opacity, transform", w = oe(t, "duration", 150) / 1e3, J = oe(t, "duration", 75) / 1e3, d = "cubic-bezier(0.4, 0.0, 0.2, 1)";
  i && (e._x_transition.enter.during = { transformOrigin: m, transitionDelay: _, transitionProperty: R, transitionDuration: `${w}s`, transitionTimingFunction: d }, e._x_transition.enter.start = { opacity: u, transform: `scale(${f})` }, e._x_transition.enter.end = { opacity: 1, transform: "scale(1)" }), o && (e._x_transition.leave.during = { transformOrigin: m, transitionDelay: _, transitionProperty: R, transitionDuration: `${J}s`, transitionTimingFunction: d }, e._x_transition.leave.start = { opacity: 1, transform: "scale(1)" }, e._x_transition.leave.end = { opacity: u, transform: `scale(${f})` });
}
function gr(e, t, r = {}) {
  e._x_transition || (e._x_transition = { enter: { during: r, start: r, end: r }, leave: { during: r, start: r, end: r }, in(n = () => {
  }, i = () => {
  }) {
    rt(e, t, { during: this.enter.during, start: this.enter.start, end: this.enter.end }, n, i);
  }, out(n = () => {
  }, i = () => {
  }) {
    rt(e, t, { during: this.leave.during, start: this.leave.start, end: this.leave.end }, n, i);
  } });
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function(e, t, r, n) {
  let i = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout, o = () => i(r);
  if (t) {
    e._x_transition && (e._x_transition.enter || e._x_transition.leave) ? e._x_transition.enter && (Object.entries(e._x_transition.enter.during).length || Object.entries(e._x_transition.enter.start).length || Object.entries(e._x_transition.enter.end).length) ? e._x_transition.in(r) : o() : e._x_transition ? e._x_transition.in(r) : o();
    return;
  }
  e._x_hidePromise = e._x_transition ? new Promise((a, s) => {
    e._x_transition.out(() => {
    }, () => a(n)), e._x_transitioning.beforeCancel(() => s({ isFromCancelledTransition: true }));
  }) : Promise.resolve(n), queueMicrotask(() => {
    let a = vr(e);
    a ? (a._x_hideChildren || (a._x_hideChildren = []), a._x_hideChildren.push(e)) : i(() => {
      let s = (l) => {
        let u = Promise.all([l._x_hidePromise, ...(l._x_hideChildren || []).map(s)]).then(([f]) => f());
        return delete l._x_hidePromise, delete l._x_hideChildren, u;
      };
      s(e).catch((l) => {
        if (!l.isFromCancelledTransition)
          throw l;
      });
    });
  });
};
function vr(e) {
  let t = e.parentNode;
  if (t)
    return t._x_hidePromise ? t : vr(t);
}
function rt(e, t, { during: r, start: n, end: i } = {}, o = () => {
}, a = () => {
}) {
  if (e._x_transitioning && e._x_transitioning.cancel(), Object.keys(r).length === 0 && Object.keys(n).length === 0 && Object.keys(i).length === 0) {
    o(), a();
    return;
  }
  let s, l, u;
  Zn(e, { start() {
    s = t(e, n);
  }, during() {
    l = t(e, r);
  }, before: o, end() {
    s(), u = t(e, i);
  }, after: a, cleanup() {
    l(), u();
  } });
}
function Zn(e, t) {
  let r, n, i, o = tt(() => {
    A(() => {
      r = true, n || t.before(), i || (t.end(), et()), t.after(), e.isConnected && t.cleanup(), delete e._x_transitioning;
    });
  });
  e._x_transitioning = { beforeCancels: [], beforeCancel(a) {
    this.beforeCancels.push(a);
  }, cancel: tt(function() {
    for (; this.beforeCancels.length; )
      this.beforeCancels.shift()();
    o();
  }), finish: o }, A(() => {
    t.start(), t.during();
  }), Bn(), requestAnimationFrame(() => {
    if (r)
      return;
    let a = Number(getComputedStyle(e).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3, s = Number(getComputedStyle(e).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
    a === 0 && (a = Number(getComputedStyle(e).animationDuration.replace("s", "")) * 1e3), A(() => {
      t.before();
    }), n = true, requestAnimationFrame(() => {
      r || (A(() => {
        t.end();
      }), et(), setTimeout(e._x_transitioning.finish, a + s), i = true);
    });
  });
}
function oe(e, t, r) {
  if (e.indexOf(t) === -1)
    return r;
  let n = e[e.indexOf(t) + 1];
  if (!n || t === "scale" && isNaN(n))
    return r;
  if (t === "duration") {
    let i = n.match(/([0-9]+)ms/);
    if (i)
      return i[1];
  }
  return t === "origin" && ["top", "right", "left", "center", "bottom"].includes(e[e.indexOf(t) + 2]) ? [n, e[e.indexOf(t) + 2]].join(" ") : n;
}
var nt = false;
function Te(e, t = () => {
}) {
  return (...r) => nt ? t(...r) : e(...r);
}
function Qn(e, t) {
  t._x_dataStack || (t._x_dataStack = e._x_dataStack), nt = true, ei(() => {
    Xn(t);
  }), nt = false;
}
function Xn(e) {
  let t = false;
  H(e, (n, i) => {
    G(n, (o, a) => {
      if (t && zn(o))
        return a();
      t = true, i(o, a);
    });
  });
}
function ei(e) {
  let t = de;
  $t((r, n) => {
    let i = t(r);
    return we(i), () => {
    };
  }), e(), $t(t);
}
function mr(e, t, r, n = []) {
  switch (e._x_bindings || (e._x_bindings = te({})), e._x_bindings[t] = r, t = n.includes("camel") ? si(t) : t, t) {
    case "value":
      ti(e, r);
      break;
    case "style":
      ni(e, r);
      break;
    case "class":
      ri(e, r);
      break;
    default:
      ii(e, t, r);
      break;
  }
}
function ti(e, t) {
  if (e.type === "radio")
    e.attributes.value === void 0 && (e.value = t), window.fromModel && (e.checked = Lt(e.value, t));
  else if (e.type === "checkbox")
    Number.isInteger(t) ? e.value = t : !Number.isInteger(t) && !Array.isArray(t) && typeof t != "boolean" && ![null, void 0].includes(t) ? e.value = String(t) : Array.isArray(t) ? e.checked = t.some((r) => Lt(r, e.value)) : e.checked = !!t;
  else if (e.tagName === "SELECT")
    ai(e, t);
  else {
    if (e.value === t)
      return;
    e.value = t;
  }
}
function ri(e, t) {
  e._x_undoAddedClasses && e._x_undoAddedClasses(), e._x_undoAddedClasses = vt(e, t);
}
function ni(e, t) {
  e._x_undoAddedStyles && e._x_undoAddedStyles(), e._x_undoAddedStyles = Se(e, t);
}
function ii(e, t, r) {
  [null, void 0, false].includes(r) && li(t) ? e.removeAttribute(t) : (xr(t) && (r = t), oi(e, t, r));
}
function oi(e, t, r) {
  e.getAttribute(t) != r && e.setAttribute(t, r);
}
function ai(e, t) {
  let r = [].concat(t).map((n) => n + "");
  Array.from(e.options).forEach((n) => {
    n.selected = r.includes(n.value);
  });
}
function si(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, r) => r.toUpperCase());
}
function Lt(e, t) {
  return e == t;
}
function xr(e) {
  return ["disabled", "checked", "required", "readonly", "hidden", "open", "selected", "autofocus", "itemscope", "multiple", "novalidate", "allowfullscreen", "allowpaymentrequest", "formnovalidate", "autoplay", "controls", "loop", "muted", "playsinline", "default", "ismap", "reversed", "async", "defer", "nomodule"].includes(e);
}
function li(e) {
  return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(e);
}
function ui(e, t, r) {
  if (e._x_bindings && e._x_bindings[t] !== void 0)
    return e._x_bindings[t];
  let n = e.getAttribute(t);
  return n === null ? typeof r == "function" ? r() : r : n === "" ? true : xr(t) ? !![t, "true"].includes(n) : n;
}
function yr(e, t) {
  var r;
  return function() {
    var n = this, i = arguments, o = function() {
      r = null, e.apply(n, i);
    };
    clearTimeout(r), r = setTimeout(o, t);
  };
}
function br(e, t) {
  let r;
  return function() {
    let n = this, i = arguments;
    r || (e.apply(n, i), r = true, setTimeout(() => r = false, t));
  };
}
function ci(e) {
  e(he);
}
var W = {};
var Ft = false;
function fi(e, t) {
  if (Ft || (W = te(W), Ft = true), t === void 0)
    return W[e];
  W[e] = t, typeof t == "object" && t !== null && t.hasOwnProperty("init") && typeof t.init == "function" && W[e].init(), Gt(W[e]);
}
function di() {
  return W;
}
var wr = {};
function pi(e, t) {
  let r = typeof t != "function" ? () => t : t;
  e instanceof Element ? Er(e, r()) : wr[e] = r;
}
function _i(e) {
  return Object.entries(wr).forEach(([t, r]) => {
    Object.defineProperty(e, t, { get() {
      return (...n) => r(...n);
    } });
  }), e;
}
function Er(e, t, r) {
  let n = [];
  for (; n.length; )
    n.pop()();
  let i = Object.entries(t).map(([a, s]) => ({ name: a, value: s })), o = tr(i);
  i = i.map((a) => o.find((s) => s.name === a.name) ? { name: `x-bind:${a.name}`, value: `"${a.value}"` } : a), pt(e, i, r).map((a) => {
    n.push(a.runCleanups), a();
  });
}
var Ar = {};
function hi(e, t) {
  Ar[e] = t;
}
function gi(e, t) {
  return Object.entries(Ar).forEach(([r, n]) => {
    Object.defineProperty(e, r, { get() {
      return (...i) => n.bind(t)(...i);
    }, enumerable: false });
  }), e;
}
var vi = { get reactive() {
  return te;
}, get release() {
  return we;
}, get effect() {
  return de;
}, get raw() {
  return Bt;
}, version: "3.10.5", flushAndStopDeferringMutations: Cn, dontAutoEvaluateFunctions: Rn, disableEffectScheduling: mn, setReactivityEngine: xn, closestDataStack: Q, skipDuringClone: Te, addRootSelector: _r, addInitSelector: hr, addScopeToNode: pe, deferMutations: On, mapAttributes: _t, evaluateLater: O, setEvaluator: Pn, mergeProxies: _e, findClosest: Ae, closestRoot: Ee, interceptor: Jt, transition: rt, setStyles: Se, mutateDom: A, directive: E, throttle: br, debounce: yr, evaluate: Z, initTree: H, nextTick: cr, prefixed: re, prefix: Ln, plugin: ci, magic: k, store: fi, start: Hn, clone: Qn, bound: ui, $data: Yt, data: hi, bind: pi };
var he = vi;
function Sr(e, t) {
  let r = /* @__PURE__ */ Object.create(null), n = e.split(",");
  for (let i = 0; i < n.length; i++)
    r[n[i]] = true;
  return t ? (i) => !!r[i.toLowerCase()] : (i) => !!r[i];
}
var mi = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";
var To = Sr(mi + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");
var xi = Object.freeze({});
var Oo = Object.freeze([]);
var Tr = Object.assign;
var yi = Object.prototype.hasOwnProperty;
var Oe = (e, t) => yi.call(e, t);
var U = Array.isArray;
var ce = (e) => Or(e) === "[object Map]";
var bi = (e) => typeof e == "string";
var mt = (e) => typeof e == "symbol";
var Ce = (e) => e !== null && typeof e == "object";
var wi = Object.prototype.toString;
var Or = (e) => wi.call(e);
var Cr = (e) => Or(e).slice(8, -1);
var xt = (e) => bi(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e;
var Me = (e) => {
  let t = /* @__PURE__ */ Object.create(null);
  return (r) => t[r] || (t[r] = e(r));
};
var Ei = /-(\w)/g;
var Co = Me((e) => e.replace(Ei, (t, r) => r ? r.toUpperCase() : ""));
var Ai = /\B([A-Z])/g;
var Mo = Me((e) => e.replace(Ai, "-$1").toLowerCase());
var Mr = Me((e) => e.charAt(0).toUpperCase() + e.slice(1));
var No = Me((e) => e ? `on${Mr(e)}` : "");
var Nr = (e, t) => e !== t && (e === e || t === t);
var it = /* @__PURE__ */ new WeakMap();
var ae = [];
var j;
var Y = Symbol("iterate");
var ot = Symbol("Map key iterate");
function Si(e) {
  return e && e._isEffect === true;
}
function Ti(e, t = xi) {
  Si(e) && (e = e.raw);
  let r = Mi(e, t);
  return t.lazy || r(), r;
}
function Oi(e) {
  e.active && (Rr(e), e.options.onStop && e.options.onStop(), e.active = false);
}
var Ci = 0;
function Mi(e, t) {
  let r = function() {
    if (!r.active)
      return e();
    if (!ae.includes(r)) {
      Rr(r);
      try {
        return Ri(), ae.push(r), j = r, e();
      } finally {
        ae.pop(), Pr(), j = ae[ae.length - 1];
      }
    }
  };
  return r.id = Ci++, r.allowRecurse = !!t.allowRecurse, r._isEffect = true, r.active = true, r.raw = e, r.deps = [], r.options = t, r;
}
function Rr(e) {
  let { deps: t } = e;
  if (t.length) {
    for (let r = 0; r < t.length; r++)
      t[r].delete(e);
    t.length = 0;
  }
}
var ee = true;
var yt = [];
function Ni() {
  yt.push(ee), ee = false;
}
function Ri() {
  yt.push(ee), ee = true;
}
function Pr() {
  let e = yt.pop();
  ee = e === void 0 ? true : e;
}
function I(e, t, r) {
  if (!ee || j === void 0)
    return;
  let n = it.get(e);
  n || it.set(e, n = /* @__PURE__ */ new Map());
  let i = n.get(r);
  i || n.set(r, i = /* @__PURE__ */ new Set()), i.has(j) || (i.add(j), j.deps.push(i), j.options.onTrack && j.options.onTrack({ effect: j, target: e, type: t, key: r }));
}
function z(e, t, r, n, i, o) {
  let a = it.get(e);
  if (!a)
    return;
  let s = /* @__PURE__ */ new Set(), l = (f) => {
    f && f.forEach((_) => {
      (_ !== j || _.allowRecurse) && s.add(_);
    });
  };
  if (t === "clear")
    a.forEach(l);
  else if (r === "length" && U(e))
    a.forEach((f, _) => {
      (_ === "length" || _ >= n) && l(f);
    });
  else
    switch (r !== void 0 && l(a.get(r)), t) {
      case "add":
        U(e) ? xt(r) && l(a.get("length")) : (l(a.get(Y)), ce(e) && l(a.get(ot)));
        break;
      case "delete":
        U(e) || (l(a.get(Y)), ce(e) && l(a.get(ot)));
        break;
      case "set":
        ce(e) && l(a.get(Y));
        break;
    }
  let u = (f) => {
    f.options.onTrigger && f.options.onTrigger({ effect: f, target: e, key: r, type: t, newValue: n, oldValue: i, oldTarget: o }), f.options.scheduler ? f.options.scheduler(f) : f();
  };
  s.forEach(u);
}
var Pi = Sr("__proto__,__v_isRef,__isVue");
var $r = new Set(Object.getOwnPropertyNames(Symbol).map((e) => Symbol[e]).filter(mt));
var $i = Ne();
var Ii = Ne(false, true);
var ki = Ne(true);
var Li = Ne(true, true);
var be = {};
["includes", "indexOf", "lastIndexOf"].forEach((e) => {
  let t = Array.prototype[e];
  be[e] = function(...r) {
    let n = x(this);
    for (let o = 0, a = this.length; o < a; o++)
      I(n, "get", o + "");
    let i = t.apply(n, r);
    return i === -1 || i === false ? t.apply(n, r.map(x)) : i;
  };
});
["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
  let t = Array.prototype[e];
  be[e] = function(...r) {
    Ni();
    let n = t.apply(this, r);
    return Pr(), n;
  };
});
function Ne(e = false, t = false) {
  return function(n, i, o) {
    if (i === "__v_isReactive")
      return !e;
    if (i === "__v_isReadonly")
      return e;
    if (i === "__v_raw" && o === (e ? t ? Vi : Ur : t ? Wi : Vr).get(n))
      return n;
    let a = U(n);
    if (!e && a && Oe(be, i))
      return Reflect.get(be, i, o);
    let s = Reflect.get(n, i, o);
    return (mt(i) ? $r.has(i) : Pi(i)) || (e || I(n, "get", i), t) ? s : at(s) ? !a || !xt(i) ? s.value : s : Ce(s) ? e ? Yr(s) : At(s) : s;
  };
}
var Fi = Ir();
var ji = Ir(true);
function Ir(e = false) {
  return function(r, n, i, o) {
    let a = r[n];
    if (!e && (i = x(i), a = x(a), !U(r) && at(a) && !at(i)))
      return a.value = i, true;
    let s = U(r) && xt(n) ? Number(n) < r.length : Oe(r, n), l = Reflect.set(r, n, i, o);
    return r === x(o) && (s ? Nr(i, a) && z(r, "set", n, i, a) : z(r, "add", n, i)), l;
  };
}
function Ki(e, t) {
  let r = Oe(e, t), n = e[t], i = Reflect.deleteProperty(e, t);
  return i && r && z(e, "delete", t, void 0, n), i;
}
function Di(e, t) {
  let r = Reflect.has(e, t);
  return (!mt(t) || !$r.has(t)) && I(e, "has", t), r;
}
function Bi(e) {
  return I(e, "iterate", U(e) ? "length" : Y), Reflect.ownKeys(e);
}
var kr = { get: $i, set: Fi, deleteProperty: Ki, has: Di, ownKeys: Bi };
var Lr = { get: ki, set(e, t) {
  return console.warn(`Set operation on key "${String(t)}" failed: target is readonly.`, e), true;
}, deleteProperty(e, t) {
  return console.warn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), true;
} };
var Ro = Tr({}, kr, { get: Ii, set: ji });
var Po = Tr({}, Lr, { get: Li });
var bt = (e) => Ce(e) ? At(e) : e;
var wt = (e) => Ce(e) ? Yr(e) : e;
var Et = (e) => e;
var Re = (e) => Reflect.getPrototypeOf(e);
function Pe(e, t, r = false, n = false) {
  e = e.__v_raw;
  let i = x(e), o = x(t);
  t !== o && !r && I(i, "get", t), !r && I(i, "get", o);
  let { has: a } = Re(i), s = n ? Et : r ? wt : bt;
  if (a.call(i, t))
    return s(e.get(t));
  if (a.call(i, o))
    return s(e.get(o));
  e !== i && e.get(t);
}
function $e(e, t = false) {
  let r = this.__v_raw, n = x(r), i = x(e);
  return e !== i && !t && I(n, "has", e), !t && I(n, "has", i), e === i ? r.has(e) : r.has(e) || r.has(i);
}
function Ie(e, t = false) {
  return e = e.__v_raw, !t && I(x(e), "iterate", Y), Reflect.get(e, "size", e);
}
function Fr(e) {
  e = x(e);
  let t = x(this);
  return Re(t).has.call(t, e) || (t.add(e), z(t, "add", e, e)), this;
}
function jr(e, t) {
  t = x(t);
  let r = x(this), { has: n, get: i } = Re(r), o = n.call(r, e);
  o ? Wr(r, n, e) : (e = x(e), o = n.call(r, e));
  let a = i.call(r, e);
  return r.set(e, t), o ? Nr(t, a) && z(r, "set", e, t, a) : z(r, "add", e, t), this;
}
function Kr(e) {
  let t = x(this), { has: r, get: n } = Re(t), i = r.call(t, e);
  i ? Wr(t, r, e) : (e = x(e), i = r.call(t, e));
  let o = n ? n.call(t, e) : void 0, a = t.delete(e);
  return i && z(t, "delete", e, void 0, o), a;
}
function Dr() {
  let e = x(this), t = e.size !== 0, r = ce(e) ? new Map(e) : new Set(e), n = e.clear();
  return t && z(e, "clear", void 0, void 0, r), n;
}
function ke(e, t) {
  return function(n, i) {
    let o = this, a = o.__v_raw, s = x(a), l = t ? Et : e ? wt : bt;
    return !e && I(s, "iterate", Y), a.forEach((u, f) => n.call(i, l(u), l(f), o));
  };
}
function ve(e, t, r) {
  return function(...n) {
    let i = this.__v_raw, o = x(i), a = ce(o), s = e === "entries" || e === Symbol.iterator && a, l = e === "keys" && a, u = i[e](...n), f = r ? Et : t ? wt : bt;
    return !t && I(o, "iterate", l ? ot : Y), { next() {
      let { value: _, done: m } = u.next();
      return m ? { value: _, done: m } : { value: s ? [f(_[0]), f(_[1])] : f(_), done: m };
    }, [Symbol.iterator]() {
      return this;
    } };
  };
}
function B(e) {
  return function(...t) {
    {
      let r = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(`${Mr(e)} operation ${r}failed: target is readonly.`, x(this));
    }
    return e === "delete" ? false : this;
  };
}
var Br = { get(e) {
  return Pe(this, e);
}, get size() {
  return Ie(this);
}, has: $e, add: Fr, set: jr, delete: Kr, clear: Dr, forEach: ke(false, false) };
var Hr = { get(e) {
  return Pe(this, e, false, true);
}, get size() {
  return Ie(this);
}, has: $e, add: Fr, set: jr, delete: Kr, clear: Dr, forEach: ke(false, true) };
var zr = { get(e) {
  return Pe(this, e, true);
}, get size() {
  return Ie(this, true);
}, has(e) {
  return $e.call(this, e, true);
}, add: B("add"), set: B("set"), delete: B("delete"), clear: B("clear"), forEach: ke(true, false) };
var qr = { get(e) {
  return Pe(this, e, true, true);
}, get size() {
  return Ie(this, true);
}, has(e) {
  return $e.call(this, e, true);
}, add: B("add"), set: B("set"), delete: B("delete"), clear: B("clear"), forEach: ke(true, true) };
var Hi = ["keys", "values", "entries", Symbol.iterator];
Hi.forEach((e) => {
  Br[e] = ve(e, false, false), zr[e] = ve(e, true, false), Hr[e] = ve(e, false, true), qr[e] = ve(e, true, true);
});
function Le(e, t) {
  let r = t ? e ? qr : Hr : e ? zr : Br;
  return (n, i, o) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? n : Reflect.get(Oe(r, i) && i in n ? r : n, i, o);
}
var zi = { get: Le(false, false) };
var $o = { get: Le(false, true) };
var qi = { get: Le(true, false) };
var Io = { get: Le(true, true) };
function Wr(e, t, r) {
  let n = x(r);
  if (n !== r && t.call(e, n)) {
    let i = Cr(e);
    console.warn(`Reactive ${i} contains both the raw and reactive versions of the same object${i === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
var Vr = /* @__PURE__ */ new WeakMap();
var Wi = /* @__PURE__ */ new WeakMap();
var Ur = /* @__PURE__ */ new WeakMap();
var Vi = /* @__PURE__ */ new WeakMap();
function Ui(e) {
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
function Yi(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Ui(Cr(e));
}
function At(e) {
  return e && e.__v_isReadonly ? e : Gr(e, false, kr, zi, Vr);
}
function Yr(e) {
  return Gr(e, true, Lr, qi, Ur);
}
function Gr(e, t, r, n, i) {
  if (!Ce(e))
    return console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  let o = i.get(e);
  if (o)
    return o;
  let a = Yi(e);
  if (a === 0)
    return e;
  let s = new Proxy(e, a === 2 ? n : r);
  return i.set(e, s), s;
}
function x(e) {
  return e && x(e.__v_raw) || e;
}
function at(e) {
  return Boolean(e && e.__v_isRef === true);
}
k("nextTick", () => cr);
k("dispatch", (e) => ue.bind(ue, e));
k("watch", (e, { evaluateLater: t, effect: r }) => (n, i) => {
  let o = t(n), a = true, s, l = r(() => o((u) => {
    JSON.stringify(u), a ? s = u : queueMicrotask(() => {
      i(u, s), s = u;
    }), a = false;
  }));
  e._x_effects.delete(l);
});
k("store", di);
k("data", (e) => Yt(e));
k("root", (e) => Ee(e));
k("refs", (e) => (e._x_refs_proxy || (e._x_refs_proxy = _e(Gi(e))), e._x_refs_proxy));
function Gi(e) {
  let t = [], r = e;
  for (; r; )
    r._x_refs && t.push(r._x_refs), r = r.parentNode;
  return t;
}
var qe = {};
function Jr(e) {
  return qe[e] || (qe[e] = 0), ++qe[e];
}
function Ji(e, t) {
  return Ae(e, (r) => {
    if (r._x_ids && r._x_ids[t])
      return true;
  });
}
function Zi(e, t) {
  e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = Jr(t));
}
k("id", (e) => (t, r = null) => {
  let n = Ji(e, t), i = n ? n._x_ids[t] : Jr(t);
  return r ? `${t}-${i}-${r}` : `${t}-${i}`;
});
k("el", (e) => e);
Zr("Focus", "focus", "focus");
Zr("Persist", "persist", "persist");
function Zr(e, t, r) {
  k(t, (n) => X(`You can't use [$${directiveName}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${r}`, n));
}
E("modelable", (e, { expression: t }, { effect: r, evaluateLater: n }) => {
  let i = n(t), o = () => {
    let u;
    return i((f) => u = f), u;
  }, a = n(`${t} = __placeholder`), s = (u) => a(() => {
  }, { scope: { __placeholder: u } }), l = o();
  s(l), queueMicrotask(() => {
    if (!e._x_model)
      return;
    e._x_removeModelListeners.default();
    let u = e._x_model.get, f = e._x_model.set;
    r(() => s(u())), r(() => f(o()));
  });
});
E("teleport", (e, { expression: t }, { cleanup: r }) => {
  e.tagName.toLowerCase() !== "template" && X("x-teleport can only be used on a <template> tag", e);
  let n = document.querySelector(t);
  n || X(`Cannot find x-teleport element for selector: "${t}"`);
  let i = e.content.cloneNode(true).firstElementChild;
  e._x_teleport = i, i._x_teleportBack = e, e._x_forwardEvents && e._x_forwardEvents.forEach((o) => {
    i.addEventListener(o, (a) => {
      a.stopPropagation(), e.dispatchEvent(new a.constructor(a.type, a));
    });
  }), pe(i, {}, e), A(() => {
    n.appendChild(i), H(i), i._x_ignore = true;
  }), r(() => i.remove());
});
var Qr = () => {
};
Qr.inline = (e, { modifiers: t }, { cleanup: r }) => {
  t.includes("self") ? e._x_ignoreSelf = true : e._x_ignore = true, r(() => {
    t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore;
  });
};
E("ignore", Qr);
E("effect", (e, { expression: t }, { effect: r }) => r(O(e, t)));
function Xr(e, t, r, n) {
  let i = e, o = (l) => n(l), a = {}, s = (l, u) => (f) => u(l, f);
  if (r.includes("dot") && (t = Qi(t)), r.includes("camel") && (t = Xi(t)), r.includes("passive") && (a.passive = true), r.includes("capture") && (a.capture = true), r.includes("window") && (i = window), r.includes("document") && (i = document), r.includes("prevent") && (o = s(o, (l, u) => {
    u.preventDefault(), l(u);
  })), r.includes("stop") && (o = s(o, (l, u) => {
    u.stopPropagation(), l(u);
  })), r.includes("self") && (o = s(o, (l, u) => {
    u.target === e && l(u);
  })), (r.includes("away") || r.includes("outside")) && (i = document, o = s(o, (l, u) => {
    e.contains(u.target) || u.target.isConnected !== false && (e.offsetWidth < 1 && e.offsetHeight < 1 || e._x_isShown !== false && l(u));
  })), r.includes("once") && (o = s(o, (l, u) => {
    l(u), i.removeEventListener(t, o, a);
  })), o = s(o, (l, u) => {
    to(t) && ro(u, r) || l(u);
  }), r.includes("debounce")) {
    let l = r[r.indexOf("debounce") + 1] || "invalid-wait", u = st(l.split("ms")[0]) ? Number(l.split("ms")[0]) : 250;
    o = yr(o, u);
  }
  if (r.includes("throttle")) {
    let l = r[r.indexOf("throttle") + 1] || "invalid-wait", u = st(l.split("ms")[0]) ? Number(l.split("ms")[0]) : 250;
    o = br(o, u);
  }
  return i.addEventListener(t, o, a), () => {
    i.removeEventListener(t, o, a);
  };
}
function Qi(e) {
  return e.replace(/-/g, ".");
}
function Xi(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, r) => r.toUpperCase());
}
function st(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function eo(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
}
function to(e) {
  return ["keydown", "keyup"].includes(e);
}
function ro(e, t) {
  let r = t.filter((o) => !["window", "document", "prevent", "stop", "once"].includes(o));
  if (r.includes("debounce")) {
    let o = r.indexOf("debounce");
    r.splice(o, st((r[o + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (r.length === 0 || r.length === 1 && jt(e.key).includes(r[0]))
    return false;
  let i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((o) => r.includes(o));
  return r = r.filter((o) => !i.includes(o)), !(i.length > 0 && i.filter((a) => ((a === "cmd" || a === "super") && (a = "meta"), e[`${a}Key`])).length === i.length && jt(e.key).includes(r[0]));
}
function jt(e) {
  if (!e)
    return [];
  e = eo(e);
  let t = { ctrl: "control", slash: "/", space: "-", spacebar: "-", cmd: "meta", esc: "escape", up: "arrow-up", down: "arrow-down", left: "arrow-left", right: "arrow-right", period: ".", equal: "=" };
  return t[e] = e, Object.keys(t).map((r) => {
    if (t[r] === e)
      return r;
  }).filter((r) => r);
}
E("model", (e, { modifiers: t, expression: r }, { effect: n, cleanup: i }) => {
  let o = O(e, r), a = `${r} = rightSideOfExpression($event, ${r})`, s = O(e, a);
  var l = e.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(e.type) || t.includes("lazy") ? "change" : "input";
  let u = no(e, t, r), f = Xr(e, l, t, (m) => {
    s(() => {
    }, { scope: { $event: m, rightSideOfExpression: u } });
  });
  e._x_removeModelListeners || (e._x_removeModelListeners = {}), e._x_removeModelListeners.default = f, i(() => e._x_removeModelListeners.default());
  let _ = O(e, `${r} = __placeholder`);
  e._x_model = { get() {
    let m;
    return o((R) => m = R), m;
  }, set(m) {
    _(() => {
    }, { scope: { __placeholder: m } });
  } }, e._x_forceModelUpdate = () => {
    o((m) => {
      m === void 0 && r.match(/\./) && (m = ""), window.fromModel = true, A(() => mr(e, "value", m)), delete window.fromModel;
    });
  }, n(() => {
    t.includes("unintrusive") && document.activeElement.isSameNode(e) || e._x_forceModelUpdate();
  });
});
function no(e, t, r) {
  return e.type === "radio" && A(() => {
    e.hasAttribute("name") || e.setAttribute("name", r);
  }), (n, i) => A(() => {
    if (n instanceof CustomEvent && n.detail !== void 0)
      return n.detail || n.target.value;
    if (e.type === "checkbox")
      if (Array.isArray(i)) {
        let o = t.includes("number") ? We(n.target.value) : n.target.value;
        return n.target.checked ? i.concat([o]) : i.filter((a) => !io(a, o));
      } else
        return n.target.checked;
    else {
      if (e.tagName.toLowerCase() === "select" && e.multiple)
        return t.includes("number") ? Array.from(n.target.selectedOptions).map((o) => {
          let a = o.value || o.text;
          return We(a);
        }) : Array.from(n.target.selectedOptions).map((o) => o.value || o.text);
      {
        let o = n.target.value;
        return t.includes("number") ? We(o) : t.includes("trim") ? o.trim() : o;
      }
    }
  });
}
function We(e) {
  let t = e ? parseFloat(e) : null;
  return oo(t) ? t : e;
}
function io(e, t) {
  return e == t;
}
function oo(e) {
  return !Array.isArray(e) && !isNaN(e);
}
E("cloak", (e) => queueMicrotask(() => A(() => e.removeAttribute(re("cloak")))));
hr(() => `[${re("init")}]`);
E("init", Te((e, { expression: t }, { evaluate: r }) => typeof t == "string" ? !!t.trim() && r(t, {}, false) : r(t, {}, false)));
E("text", (e, { expression: t }, { effect: r, evaluateLater: n }) => {
  let i = n(t);
  r(() => {
    i((o) => {
      A(() => {
        e.textContent = o;
      });
    });
  });
});
E("html", (e, { expression: t }, { effect: r, evaluateLater: n }) => {
  let i = n(t);
  r(() => {
    i((o) => {
      A(() => {
        e.innerHTML = o, e._x_ignoreSelf = true, H(e), delete e._x_ignoreSelf;
      });
    });
  });
});
_t(ir(":", or(re("bind:"))));
E("bind", (e, { value: t, modifiers: r, expression: n, original: i }, { effect: o }) => {
  if (!t) {
    let s = {};
    _i(s), O(e, n)((u) => {
      Er(e, u, i);
    }, { scope: s });
    return;
  }
  if (t === "key")
    return ao(e, n);
  let a = O(e, n);
  o(() => a((s) => {
    s === void 0 && typeof n == "string" && n.match(/\./) && (s = ""), A(() => mr(e, t, s, r));
  }));
});
function ao(e, t) {
  e._x_keyExpression = t;
}
_r(() => `[${re("data")}]`);
E("data", Te((e, { expression: t }, { cleanup: r }) => {
  t = t === "" ? "{}" : t;
  let n = {};
  Je(n, e);
  let i = {};
  gi(i, n);
  let o = Z(e, t, { scope: i });
  o === void 0 && (o = {}), Je(o, e);
  let a = te(o);
  Gt(a);
  let s = pe(e, a);
  a.init && Z(e, a.init), r(() => {
    a.destroy && Z(e, a.destroy), s();
  });
}));
E("show", (e, { modifiers: t, expression: r }, { effect: n }) => {
  let i = O(e, r);
  e._x_doHide || (e._x_doHide = () => {
    A(() => {
      e.style.setProperty("display", "none", t.includes("important") ? "important" : void 0);
    });
  }), e._x_doShow || (e._x_doShow = () => {
    A(() => {
      e.style.length === 1 && e.style.display === "none" ? e.removeAttribute("style") : e.style.removeProperty("display");
    });
  });
  let o = () => {
    e._x_doHide(), e._x_isShown = false;
  }, a = () => {
    e._x_doShow(), e._x_isShown = true;
  }, s = () => setTimeout(a), l = tt((_) => _ ? a() : o(), (_) => {
    typeof e._x_toggleAndCascadeWithTransitions == "function" ? e._x_toggleAndCascadeWithTransitions(e, _, a, o) : _ ? s() : o();
  }), u, f = true;
  n(() => i((_) => {
    !f && _ === u || (t.includes("immediate") && (_ ? s() : o()), l(_), u = _, f = false);
  }));
});
E("for", (e, { expression: t }, { effect: r, cleanup: n }) => {
  let i = lo(t), o = O(e, i.items), a = O(e, e._x_keyExpression || "index");
  e._x_prevKeys = [], e._x_lookup = {}, r(() => so(e, i, o, a)), n(() => {
    Object.values(e._x_lookup).forEach((s) => s.remove()), delete e._x_prevKeys, delete e._x_lookup;
  });
});
function so(e, t, r, n) {
  let i = (a) => typeof a == "object" && !Array.isArray(a), o = e;
  r((a) => {
    uo(a) && a >= 0 && (a = Array.from(Array(a).keys(), (d) => d + 1)), a === void 0 && (a = []);
    let s = e._x_lookup, l = e._x_prevKeys, u = [], f = [];
    if (i(a))
      a = Object.entries(a).map(([d, v]) => {
        let y = Kt(t, v, d, a);
        n((T) => f.push(T), { scope: ie({ index: d }, y) }), u.push(y);
      });
    else
      for (let d = 0; d < a.length; d++) {
        let v = Kt(t, a[d], d, a);
        n((y) => f.push(y), { scope: ie({ index: d }, v) }), u.push(v);
      }
    let _ = [], m = [], R = [], w = [];
    for (let d = 0; d < l.length; d++) {
      let v = l[d];
      f.indexOf(v) === -1 && R.push(v);
    }
    l = l.filter((d) => !R.includes(d));
    let J = "template";
    for (let d = 0; d < f.length; d++) {
      let v = f[d], y = l.indexOf(v);
      if (y === -1)
        l.splice(d, 0, v), _.push([J, d]);
      else if (y !== d) {
        let T = l.splice(d, 1)[0], C = l.splice(y - 1, 1)[0];
        l.splice(d, 0, C), l.splice(y, 0, T), m.push([T, C]);
      } else
        w.push(v);
      J = v;
    }
    for (let d = 0; d < R.length; d++) {
      let v = R[d];
      s[v]._x_effects && s[v]._x_effects.forEach(Dt), s[v].remove(), s[v] = null, delete s[v];
    }
    for (let d = 0; d < m.length; d++) {
      let [v, y] = m[d], T = s[v], C = s[y], D = document.createElement("div");
      A(() => {
        C.after(D), T.after(C), C._x_currentIfEl && C.after(C._x_currentIfEl), D.before(T), T._x_currentIfEl && T.after(T._x_currentIfEl), D.remove();
      }), It(C, u[f.indexOf(y)]);
    }
    for (let d = 0; d < _.length; d++) {
      let [v, y] = _[d], T = v === "template" ? o : s[v];
      T._x_currentIfEl && (T = T._x_currentIfEl);
      let C = u[y], D = f[y], $ = document.importNode(o.content, true).firstElementChild;
      pe($, te(C), o), A(() => {
        T.after($), H($);
      }), typeof D == "object" && X("x-for key cannot be an object, it must be a string or an integer", o), s[D] = $;
    }
    for (let d = 0; d < w.length; d++)
      It(s[w[d]], u[f.indexOf(w[d])]);
    o._x_prevKeys = f;
  });
}
function lo(e) {
  let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, r = /^\s*\(|\)\s*$/g, n = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, i = e.match(n);
  if (!i)
    return;
  let o = {};
  o.items = i[2].trim();
  let a = i[1].replace(r, "").trim(), s = a.match(t);
  return s ? (o.item = a.replace(t, "").trim(), o.index = s[1].trim(), s[2] && (o.collection = s[2].trim())) : o.item = a, o;
}
function Kt(e, t, r, n) {
  let i = {};
  return /^\[.*\]$/.test(e.item) && Array.isArray(t) ? e.item.replace("[", "").replace("]", "").split(",").map((a) => a.trim()).forEach((a, s) => {
    i[a] = t[s];
  }) : /^\{.*\}$/.test(e.item) && !Array.isArray(t) && typeof t == "object" ? e.item.replace("{", "").replace("}", "").split(",").map((a) => a.trim()).forEach((a) => {
    i[a] = t[a];
  }) : i[e.item] = t, e.index && (i[e.index] = r), e.collection && (i[e.collection] = n), i;
}
function uo(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function en() {
}
en.inline = (e, { expression: t }, { cleanup: r }) => {
  let n = Ee(e);
  n._x_refs || (n._x_refs = {}), n._x_refs[t] = e, r(() => delete n._x_refs[t]);
};
E("ref", en);
E("if", (e, { expression: t }, { effect: r, cleanup: n }) => {
  let i = O(e, t), o = () => {
    if (e._x_currentIfEl)
      return e._x_currentIfEl;
    let s = e.content.cloneNode(true).firstElementChild;
    return pe(s, {}, e), A(() => {
      e.after(s), H(s);
    }), e._x_currentIfEl = s, e._x_undoIf = () => {
      G(s, (l) => {
        l._x_effects && l._x_effects.forEach(Dt);
      }), s.remove(), delete e._x_currentIfEl;
    }, s;
  }, a = () => {
    e._x_undoIf && (e._x_undoIf(), delete e._x_undoIf);
  };
  r(() => i((s) => {
    s ? o() : a();
  })), n(() => e._x_undoIf && e._x_undoIf());
});
E("id", (e, { expression: t }, { evaluate: r }) => {
  r(t).forEach((i) => Zi(e, i));
});
_t(ir("@", or(re("on:"))));
E("on", Te((e, { value: t, modifiers: r, expression: n }, { cleanup: i }) => {
  let o = n ? O(e, n) : () => {
  };
  e.tagName.toLowerCase() === "template" && (e._x_forwardEvents || (e._x_forwardEvents = []), e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
  let a = Xr(e, t, r, (s) => {
    o(() => {
    }, { scope: { $event: s }, params: [s] });
  });
  i(() => a());
}));
Fe("Collapse", "collapse", "collapse");
Fe("Intersect", "intersect", "intersect");
Fe("Focus", "trap", "focus");
Fe("Mask", "mask", "mask");
function Fe(e, t, r) {
  E(t, (n) => X(`You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${r}`, n));
}
he.setEvaluator(Xt);
he.setReactivityEngine({ reactive: At, effect: Ti, release: Oi, raw: x });
var co = he;
var St = co;
var fo = class {
  constructor(e) {
    Be(this, "el");
    Be(this, "traversals", { first: "firstElementChild", next: "nextElementSibling", parent: "parentElement" });
    this.el = e;
  }
  nodes() {
    return this.traversals = { first: "firstChild", next: "nextSibling", parent: "parentNode" }, this;
  }
  first() {
    return this.teleportTo(this.el[this.traversals.first]);
  }
  next() {
    return this.teleportTo(this.teleportBack(this.el[this.traversals.next]));
  }
  before(e) {
    return this.el[this.traversals.parent].insertBefore(e, this.el), e;
  }
  replace(e) {
    return this.el[this.traversals.parent].replaceChild(e, this.el), e;
  }
  append(e) {
    return this.el.appendChild(e), e;
  }
  teleportTo(e) {
    return e && (e._x_teleport ? e._x_teleport : e);
  }
  teleportBack(e) {
    return e && (e._x_teleportBack ? e._x_teleportBack : e);
  }
};
function S(e) {
  return new fo(e);
}
function po(e) {
  let t = document.createElement("template");
  return t.innerHTML = e, t.content.firstElementChild;
}
function _o(e) {
  return e.nodeType === 3 || e.nodeType === 8;
}
var tn = () => {
};
var rn = () => {
};
async function Tt(e, t, r) {
  let n, i, o, a, s, l, u, f, _, m, R;
  function w(c) {
    if (R)
      return rn((c || "").replace(`
`, "\\n"), n, i), new Promise((p) => tn = () => p());
  }
  function J(c = {}) {
    let p = (P) => P.getAttribute("key"), h = () => {
    };
    s = c.updating || h, l = c.updated || h, u = c.removing || h, f = c.removed || h, _ = c.adding || h, m = c.added || h, o = c.key || p, a = c.lookahead || false, R = c.debug || false;
  }
  async function d(c, p) {
    if (v(c, p)) {
      let P = y(c, p);
      return await w("Swap elements"), P;
    }
    let h = false;
    if (!ne(s, c, p, () => h = true)) {
      if (window.Alpine && ho(c, p, () => h = true), _o(p)) {
        await T(c, p), l(c, p);
        return;
      }
      h || await C(c, p), l(c, p), await D(c, p);
    }
  }
  function v(c, p) {
    return c.nodeType != p.nodeType || c.nodeName != p.nodeName || $(c) != $(p);
  }
  function y(c, p) {
    if (ne(u, c))
      return;
    let h = p.cloneNode(true);
    ne(_, h) || (S(c).replace(h), f(c), m(h));
  }
  async function T(c, p) {
    let h = p.nodeValue;
    c.nodeValue !== h && (c.nodeValue = h, await w("Change text node to: " + h));
  }
  async function C(c, p) {
    if (c._x_isShown && !p._x_isShown || !c._x_isShown && p._x_isShown)
      return;
    let h = Array.from(c.attributes), P = Array.from(p.attributes);
    for (let K = h.length - 1; K >= 0; K--) {
      let L = h[K].name;
      p.hasAttribute(L) || (c.removeAttribute(L), await w("Remove attribute"));
    }
    for (let K = P.length - 1; K >= 0; K--) {
      let L = P[K].name, b = P[K].value;
      c.getAttribute(L) !== b && (c.setAttribute(L, b), await w(`Set [${L}] attribute to: "${b}"`));
    }
  }
  async function D(c, p) {
    let h = c.childNodes, P = p.childNodes, K = Ct(P), L = Ct(h), b = S(p).nodes().first(), g = S(c).nodes().first(), q = {};
    for (; b; ) {
      let M = $(b), F = $(g);
      if (!g)
        if (M && q[M]) {
          let N = q[M];
          S(c).append(N), g = N, await w("Add element (from key)");
        } else {
          let N = an(b, c) || {};
          await w("Add element: " + (N.outerHTML || N.nodeValue)), b = S(b).nodes().next();
          continue;
        }
      if (a) {
        let N = S(b).next(), Mt = false;
        for (; !Mt && N; )
          g.isEqualNode(N) && (Mt = true, g = je(b, g), F = $(g), await w("Move element (lookahead)")), N = S(N).next();
      }
      if (M !== F) {
        if (!M && F) {
          q[F] = g, g = je(b, g), q[F].remove(), g = S(g).nodes().next(), b = S(b).nodes().next(), await w('No "to" key');
          continue;
        }
        if (M && !F && L[M] && (g = S(g).replace(L[M]), await w('No "from" key')), M && F) {
          q[F] = g;
          let N = L[M];
          if (N)
            g = S(g).replace(N), await w('Move "from" key');
          else {
            q[F] = g, g = je(b, g), q[F].remove(), g = S(g).next(), b = S(b).next(), await w("Swap elements with keys");
            continue;
          }
        }
      }
      let sn = g && S(g).nodes().next();
      await d(g, b), b = b && S(b).nodes().next(), g = sn;
    }
    let Ke = [];
    for (; g; )
      ne(u, g) || Ke.push(g), g = S(g).nodes().next();
    for (; Ke.length; ) {
      let M = Ke.shift();
      M.remove(), await w("remove el"), f(M);
    }
  }
  function $(c) {
    return c && c.nodeType === 1 && o(c);
  }
  function Ct(c) {
    let p = {};
    return c.forEach((h) => {
      let P = $(h);
      P && (p[P] = h);
    }), p;
  }
  function an(c, p) {
    if (!ne(_, c)) {
      let h = c.cloneNode(true);
      return S(p).append(h), m(h), h;
    }
    return null;
  }
  function je(c, p) {
    if (!ne(_, c)) {
      let h = c.cloneNode(true);
      return S(p).before(h), m(h), h;
    }
    return p;
  }
  return J(r), n = e, i = po(t), window.Alpine && window.Alpine.closestDataStack && !e._x_dataStack && (i._x_dataStack = window.Alpine.closestDataStack(e), i._x_dataStack && window.Alpine.clone(e, i)), await w(), await d(e, i), n = void 0, i = void 0, e;
}
Tt.step = () => tn();
Tt.log = (e) => {
  rn = e;
};
function ne(e, ...t) {
  let r = false;
  return e(...t, () => r = true), r;
}
function ho(e, t, r) {
  e.nodeType === 1 && e._x_dataStack && window.Alpine.clone(e, t);
}
function go(e) {
  e.morph = Tt;
}
var nn = go;
St.plugin(nn);
var vo = /INPUT/i;
var mo = /date|datetime-local|email|month|number|password|range|search|tel|text|time|url|week/i;
var xo = /TEXTAREA/i;
function yo(e, t, r, n) {
  if (e.nodeType !== Node.ELEMENT_NODE || e !== document.activeElement)
    return;
  if (e.tagName.match(xo) || e.tagName.match(vo) && e.getAttribute("type").match(mo))
    return n();
}
function bo(e, t) {
  e.forEach((r) => St.morph(r, t, { updating: yo }));
}
var on = bo;
function wo(e, t, r) {
  if (e.match(/^dispatch(Event)?$/))
    return Pt(r, t[0], t[1] || {});
  if (e.match(/^morph|mutate$/))
    return on(r, t[0]);
  if (e.endsWith("="))
    return r.forEach((n) => n[e.slice(0, -1).trim()] = t[0]);
  r.forEach((n) => n[e].apply(n, t));
}
function Eo() {
  let e = JSON.parse(this.templateContent.textContent), { id: t, selector: r, receiver: n, method: i, args: o } = e, a = [self];
  r && (a = Array.from(document.querySelectorAll(r))), n && (a = a.map((s) => {
    let l = s, u = n.split(".");
    for (; u.length > 0; )
      l = l[u.shift()];
    return l;
  })), wo(i, o, a);
}
var Ot = Eo;
if (!self.Turbo)
  throw new Error("`Turbo` is not defined! Be sure to import `@turbo-boost/streams` after `@hotwired/turbo` or `@hotwired/turbo-rails`.");
if (!Turbo.StreamActions)
  throw new Error("`Turbo.StreamActions` is not defined! Verify that you are running >= `7.2.0` of `@hotwired/turbo`.");
Turbo.StreamActions.invoke = Ot;
self.TurboBoost = self.TurboBoost || {};
self.TurboBoost.Streams = { invoke: Ot };
console.info("@turbo-boost/streams has initialized and registered new stream actions with Turbo.");

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
  options.detail = options.detail || {};
  target = target || document;
  const evt = new CustomEvent(name, __spreadProps(__spreadValues({}, options), { bubbles: true }));
  target.dispatchEvent(evt);
  return evt;
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
  event.detail.endedAt = new Date().getTime();
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
function findClosestFrame(element) {
  return element.closest("turbo-frame");
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
  findClosestFrame
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
  let frame = elements_default.findClosestFrame(element);
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

// app/javascript/index.js
function buildCommandPayload(id, element) {
  return {
    id,
    // uniquely identifies the command
    name: element.getAttribute(schema_default.commandAttribute),
    elementId: element.id.length > 0 ? element.id : null,
    elementAttributes: elements_default.buildAttributePayload(element),
    startedAt: new Date().getTime()
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
    const startEvent = dispatch(commandEvents.start, element, {
      cancelable: true,
      detail: payload2
    });
    if (startEvent.defaultPrevented)
      return dispatch(commandEvents.abort, element, {
        detail: {
          message: `An event handler for '${commandEvents.start}' prevented default behavior and blocked command invocation!`,
          source: startEvent
        }
      });
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
  } catch (error2) {
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
