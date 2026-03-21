import { defineComponent as m, openBlock as l, createElementBlock as i, normalizeClass as h, createVNode as y, unref as f, createElementVNode as o, toDisplayString as p, useSlots as H, computed as E, renderSlot as A, createCommentVNode as d, resolveComponent as G, createBlock as q, withCtx as T, Fragment as $, ref as O, createTextVNode as U, watch as F, renderList as Y } from "vue";
import { InformationCircleIcon as j, ExclamationCircleIcon as D, CheckCircleIcon as X, ExclamationTriangleIcon as K, XMarkIcon as V, ArrowDownIcon as Q, ArrowUpIcon as Z } from "@heroicons/vue/24/outline";
var w = /* @__PURE__ */ ((e) => (e.WARNING = "WARNING", e.ERROR = "ERROR", e.SUCCESS = "SUCCESS", e.INFROM = "INFROM", e))(w || {}), b = /* @__PURE__ */ ((e) => (e.NONE = "NONE", e.RED = "RED", e.YELLOW = "YELLOW", e.BLACK = "BLACK", e.GRAY = "GRAY", e.GREEN = "GREEN", e.BLUE = "BLUE", e))(b || {});
function J(e) {
  let t = "red";
  switch (e) {
    case w.ERROR:
      t = "red";
      break;
    case w.SUCCESS:
      t = "green";
      break;
    case w.INFROM:
      t = "gray";
      break;
    case w.WARNING:
      t = "yellow";
      break;
  }
  return t;
}
function ee(e) {
  let t = "red";
  switch (e) {
    case b.GREEN: {
      t = "green";
      break;
    }
    case b.RED: {
      t = "red";
      break;
    }
    case b.BLUE: {
      t = "blue";
      break;
    }
    case b.YELLOW: {
      t = "yellow";
      break;
    }
    case b.NONE: {
      t = "";
      break;
    }
  }
  return t;
}
const te = { class: "font-medium pl-1" }, Be = /* @__PURE__ */ m({
  __name: "BaseAlert",
  props: {
    title: {
      type: String,
      required: !1,
      default: w.ERROR
    },
    color: {
      type: Object,
      required: !1
    }
  },
  setup(e) {
    const t = e;
    function a() {
      let n = J(t.color);
      return "flex items-center p-4 mb-4 text-sm text-" + n + "-800 border border-" + n + "-300 rounded-lg bg-" + n + "-50 dark:bg-gray-800 dark:text-" + n + "-400 dark:border-" + n + "-800";
    }
    return (n, r) => (l(), i("div", {
      class: h(a()),
      role: "alert"
    }, [
      y(f(j), { class: "w-6 h-6 text-gray-400" }),
      o("div", null, [
        o("span", te, p(e.title), 1)
      ])
    ], 2));
  }
}), B = /* @__PURE__ */ m({
  __name: "BaseBadge",
  props: {
    color: {
      type: String,
      required: !1
    }
  },
  setup(e) {
    const t = H(), a = E(() => !!t.default), n = e;
    function r() {
      let s = ee(n.color);
      return "font-bold bg-" + s + "-100 text-" + s + "-800 text-xs mr-2 px-2.5 py-0.5 rounded-full";
    }
    return (s, c) => a.value ? (l(), i("span", {
      key: 0,
      class: h(r())
    }, [
      A(s.$slots, "default")
    ], 2)) : d("", !0);
  }
});
var v = /* @__PURE__ */ ((e) => (e.RED = "RED", e.BLUE = "BLUE", e.WHITE = "WHITE", e.DARK = "DARK", e.GREEN = "GREEN", e.YELLOW = "YELLOW", e.PURPLE = "PURPLE", e))(v || {}), R = /* @__PURE__ */ ((e) => (e.EXTRA_SMALL = "EXTRA SMALL", e.SMALL = "SMALL", e.BASE = "BASE", e.LARGE = "LARGE", e.EXTRA_LARGE = "EXTRA_LARGE", e))(R || {});
const re = ["type", "disabled"], se = { key: 0 }, oe = { key: 1 }, ae = ["type", "disabled"], ne = { key: 0 }, le = { key: 1 }, ie = { key: 2 }, qe = /* @__PURE__ */ m({
  __name: "BaseButton",
  props: {
    description: {
      type: String,
      required: !0
    },
    color: {
      type: String,
      required: !1,
      default: v.BLUE
    },
    to: {
      type: String,
      required: !1
    },
    type: {
      type: String,
      required: !1,
      default: "button"
    },
    icon: {
      type: String,
      required: !1
    },
    iconSize: {
      type: String,
      required: !1
    },
    iconLeft: {
      type: String,
      required: !1
    },
    isRounded: {
      type: Boolean,
      required: !1
    },
    isDisable: {
      type: Boolean,
      required: !1
    },
    size: {
      type: String,
      required: !1
    },
    isLoading: {
      type: Boolean,
      required: !1
    }
  },
  setup(e) {
    const t = e;
    function a() {
      let n = "inline-flex items-center", r;
      switch (t.color) {
        case v.BLUE: {
          r = "focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300", t.isDisable && (r += " bg-blue-400");
          break;
        }
        case v.WHITE: {
          r = "focus:outline-none text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200", t.isDisable && (r += " bg-gray-400");
          break;
        }
        case v.DARK: {
          r = "focus:outline-none text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 ", t.isDisable && (r += " bg-gray-400");
          break;
        }
        case v.GREEN: {
          r = "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300", t.isDisable && (r += " bg-green-400");
          break;
        }
        case v.RED: {
          r = "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300", t.isDisable && (r += " bg-red-400");
          break;
        }
        case v.YELLOW: {
          r = "focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300", t.isDisable && (r += " bg-yellow-400");
          break;
        }
        case v.PURPLE: {
          r = "focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 px-5 py-2.5 mb-2", t.isDisable && (r += " bg-purple-400");
          break;
        }
      }
      let s = "px-5 py-2.5 mr-2 mb-2 text-sm";
      switch (t.size) {
        case R.EXTRA_SMALL: {
          s = "px-3 py-2 text-xs";
          break;
        }
        case R.SMALL: {
          s = "px-3 py-2 text-sm";
          break;
        }
        case R.BASE: {
          s = "px-5 py-2.5 text-sm";
          break;
        }
        case R.LARGE: {
          s = "px-5 py-3 text-base";
          break;
        }
        case R.EXTRA_LARGE: {
          s = "px-6 py-3.5 text-base";
          break;
        }
      }
      let c = "rounded-lg";
      return t.isRounded && (c = "rounded-full"), t.isDisable && (r += " cursor-not-allowed"), n + " " + s + " " + r + " " + "font-medium" + " " + c;
    }
    return (n, r) => {
      const s = G("router-link");
      return e.to ? (l(), q(s, {
        key: 0,
        to: e.to
      }, {
        default: T(() => [
          o("button", {
            type: t.type,
            class: h(a()),
            disabled: e.isDisable
          }, [
            e.iconLeft ? d("", !0) : (l(), i("span", se, p(e.description), 1)),
            A(n.$slots, "default"),
            e.iconLeft ? (l(), i("span", oe, p(e.description), 1)) : d("", !0)
          ], 10, re)
        ]),
        _: 3
      }, 8, ["to"])) : (l(), i("button", {
        key: 1,
        type: t.type,
        class: h(a()),
        disabled: e.isDisable
      }, [
        e.isLoading ? (l(), i("div", ne, [...r[0] || (r[0] = [
          o("svg", {
            "aria-hidden": "true",
            role: "status",
            class: "inline w-4 h-4 me-3 text-white animate-spin",
            viewBox: "0 0 100 101",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg"
          }, [
            o("path", {
              d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
              fill: "#E5E7EB"
            }),
            o("path", {
              d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
              fill: "currentColor"
            })
          ], -1)
        ])])) : d("", !0),
        e.iconLeft ? d("", !0) : (l(), i("span", le, p(e.description), 1)),
        A(n.$slots, "default"),
        e.iconLeft ? (l(), i("span", ie, p(e.description), 1)) : d("", !0)
      ], 10, ae));
    };
  }
});
var _ = /* @__PURE__ */ ((e) => (e.BASE = "BASE", e.BASE_SHORTER = "BASE_SHORTER", e.SQUARE = "SQUARE", e))(_ || {});
const ce = {
  key: 0,
  class: "h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"
}, ue = {
  key: 1,
  class: "w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"
}, de = {
  key: 2,
  class: "w-8 h-8 mx-auto my-8 bg-gray-200 border-0 rounded md:my-12 dark:bg-gray-700"
}, De = /* @__PURE__ */ m({
  __name: "BaseLine",
  props: {
    mode: {
      type: String,
      required: !1,
      default: _.BASE
    }
  },
  setup(e) {
    return (t, a) => (l(), i($, null, [
      e.mode === f(_).BASE ? (l(), i("hr", ce)) : d("", !0),
      e.mode === f(_).BASE_SHORTER ? (l(), i("hr", ue)) : d("", !0),
      e.mode === f(_).SQUARE ? (l(), i("hr", de)) : d("", !0)
    ], 64));
  }
});
var C = /* @__PURE__ */ ((e) => (e.SMALL = "SMALL", e.MEDIUM = "MEDIUM", e.LARGE = "LARGE", e))(C || {});
const fe = ["height", "width"], ze = /* @__PURE__ */ m({
  __name: "BaseLogo",
  props: {
    size: {
      type: String,
      required: !1,
      default: C.MEDIUM
    }
  },
  setup(e) {
    const t = e;
    function a() {
      let n = "";
      switch (t.size) {
        case C.SMALL: {
          n = "50px";
          break;
        }
        case C.MEDIUM: {
          n = "100px";
          break;
        }
        case C.LARGE: {
          n = "150px";
          break;
        }
      }
      return n;
    }
    return (n, r) => {
      const s = G("router-link");
      return l(), q(s, {
        to: "/",
        class: "flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      }, {
        default: T(() => [
          (l(), i("svg", {
            height: a(),
            width: a(),
            viewBox: "33.6 130.6 499.7 242.9",
            xmlns: "http://www.w3.org/2000/svg",
            "xmlns:xlink": "http://www.w3.org/1999/xlink"
          }, [...r[0] || (r[0] = [
            o("linearGradient", { id: "a" }, [
              o("stop", {
                offset: ".085",
                "stop-color": "#469e43"
              }),
              o("stop", {
                offset: "1",
                "stop-color": "#132d13"
              })
            ], -1),
            o("linearGradient", {
              id: "b",
              gradientUnits: "userSpaceOnUse",
              x1: "64.863",
              x2: "64.863",
              "xlink:href": "#a",
              y1: "288.291",
              y2: "369.4"
            }, null, -1),
            o("linearGradient", {
              id: "c",
              gradientUnits: "userSpaceOnUse",
              x1: "138.367",
              x2: "138.367",
              "xlink:href": "#a",
              y1: "308.454",
              y2: "370.601"
            }, null, -1),
            o("linearGradient", {
              id: "d",
              gradientUnits: "userSpaceOnUse",
              x1: "195.475",
              x2: "195.475",
              "xlink:href": "#a",
              y1: "288.291",
              y2: "369.85"
            }, null, -1),
            o("linearGradient", {
              id: "e",
              gradientUnits: "userSpaceOnUse",
              x1: "249.634",
              x2: "249.634",
              "xlink:href": "#a",
              y1: "307.312",
              y2: "369.511"
            }, null, -1),
            o("linearGradient", {
              id: "f",
              gradientUnits: "userSpaceOnUse",
              x1: "302.884",
              x2: "302.884",
              "xlink:href": "#a",
              y1: "288.291",
              y2: "367.857"
            }, null, -1),
            o("linearGradient", {
              id: "g",
              gradientUnits: "userSpaceOnUse",
              x1: "354.118",
              x2: "354.118",
              "xlink:href": "#a",
              y1: "307.312",
              y2: "369.511"
            }, null, -1),
            o("linearGradient", {
              id: "h",
              gradientUnits: "userSpaceOnUse",
              x1: "428.02",
              x2: "428.02",
              "xlink:href": "#a",
              y1: "306.156",
              y2: "367.742"
            }, null, -1),
            o("linearGradient", {
              id: "i",
              gradientUnits: "userSpaceOnUse",
              x1: "502.066",
              x2: "502.066",
              "xlink:href": "#a",
              y1: "288.291",
              y2: "369.4"
            }, null, -1),
            o("linearGradient", {
              id: "j",
              gradientUnits: "userSpaceOnUse",
              x1: "283.264",
              x2: "283.264",
              "xlink:href": "#a",
              y1: "131.629",
              y2: "232.559"
            }, null, -1),
            o("linearGradient", {
              id: "k",
              gradientUnits: "userSpaceOnUse",
              x1: "283.46",
              x2: "283.46",
              y1: "202.275",
              y2: "183.785"
            }, [
              o("stop", {
                offset: "0",
                "stop-color": "#969799",
                "stop-opacity": "0"
              }),
              o("stop", {
                offset: "1",
                "stop-color": "#808183"
              })
            ], -1),
            o("path", {
              d: "m65 307.2c-6.8 0-13.1 2.2-18.2 5.9v-24.8h-13.2v81.1h31.4c17.2 0 31.1-13.9 31.1-31.1s-13.9-31.1-31.1-31.1zm0 49.3h-18.2v-18.2c0-10.1 8.2-18.2 18.2-18.2 10.1 0 18.2 8.2 18.2 18.2.1 10.1-8.1 18.2-18.2 18.2z",
              fill: "url(#b)"
            }, null, -1),
            o("path", {
              d: "m168.8 343.9h-46.7c1.4 7.1 6.6 12 14.1 12.7 6.4.6 12.9.1 19.9.1v11.9c-15.2 4.9-33.3.5-42.1-10.4-3.8-4.7-17.3-34.7 11.5-47.4 39-11.4 45.3 22.4 43.3 33.1zm-14.2-12.7c-1.7-8.1-8.8-12.9-17.9-12.3-7.6.5-14 5.8-14.5 12.3z",
              fill: "url(#c)"
            }, null, -1),
            o("path", {
              d: "m195.5 320.2c0 10.5-.2 20 .1 29.6.2 5.8 4.4 8.4 13.2 8.6v10.5c-13.8 3.9-26.2-4.5-26.4-18-.2-18.7-.1-43.9-.1-62.6h14.1l-.3 18.5 12.7-.1v13.4h-13.3z",
              fill: "url(#d)"
            }, null, -1),
            o("path", {
              d: "m249.6 307.3c-17.2 0-31.1 13.9-31.1 31.1s13.9 31.1 31.1 31.1h31.1v-31.1c0-17.2-13.9-31.1-31.1-31.1zm18.6 49.7h-18.5c-10.2 0-18.5-8.3-18.5-18.5s8.3-18.5 18.5-18.5 18.5 8.3 18.5 18.5z",
              fill: "url(#e)"
            }, null, -1),
            o("path", {
              d: "m296.4 288.3h13v79.6h-13z",
              fill: "url(#f)"
            }, null, -1),
            o("path", {
              d: "m354.1 307.3c-17.2 0-31.1 13.9-31.1 31.1s13.9 31.1 31.1 31.1h31.1v-31.1c0-17.2-13.9-31.1-31.1-31.1zm18.6 49.7h-18.5c-10.2 0-18.5-8.3-18.5-18.5s8.3-18.5 18.5-18.5 18.5 8.3 18.5 18.5z",
              fill: "url(#g)"
            }, null, -1),
            o("path", {
              d: "m442.2 367.7c0-12.3.2-23.6 0-34.9-.2-3.4-3.6-13.8-14.1-13.4-10.3-.3-14.4 10-14.3 12.7.1 10.2.5 35.1.5 35.1l-13.6.1s-.3-25.7.2-36.2c.6-14.1 12.7-25 27.5-25 14.7 0 26.2 10.4 26.7 24.9.4 10.4.5 36.3.5 36.3z",
              fill: "url(#h)"
            }, null, -1),
            o("path", {
              d: "m501.9 307.2c6.8 0 13.1 2.2 18.2 5.9v-24.8h13.2v81.1h-31.4c-17.2 0-31.1-13.9-31.1-31.1s13.9-31.1 31.1-31.1zm0 49.3h18.2v-18.2c0-10.1-8.2-18.2-18.2-18.2-10.1 0-18.2 8.2-18.2 18.2 0 10.1 8.1 18.2 18.2 18.2z",
              fill: "url(#i)"
            }, null, -1),
            o("path", {
              d: "m309.2 180.6h-24v-24c0-12.6 10.2-24.1 22.8-25 14.8-1 27.1 11.3 26.1 26.1-.8 12.7-12.3 22.9-24.9 22.9zm-50.7-48.9c-14.8-1-27.1 11.3-26.1 26.1.8 12.6 12.4 22.8 25 22.8h23.9v-24c0-12.6-10.3-24.1-22.8-24.9zm50.7 51.9h-24v23.9c0 12.6 10.2 24.1 22.8 25 14.8 1 27.1-11.3 26.1-26.1-.8-12.6-12.3-22.8-24.9-22.8zm-52.4 0c-14 0-25.3 11.8-24.4 26 .8 12.2 10.7 22.1 22.9 22.9 14.2.9 26-10.4 26-24.4v-24.5z",
              fill: "url(#j)"
            }, null, -1),
            o("path", {
              d: "m281.7 183.8h3.6v18.5h-3.6z",
              fill: "url(#k)"
            }, null, -1)
          ])], 8, fe))
        ]),
        _: 1
      });
    };
  }
});
var z = /* @__PURE__ */ ((e) => (e.DELETE = "DELETE", e.SUCCESS = "SUCCESS", e))(z || {});
const ge = { class: "dialog relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" }, pe = {
  key: 0,
  class: "p-6 text-center"
}, be = { class: "mb-5 text-lg font-normal text-gray-500 dark:text-gray-400" }, he = { class: "flex justify-center" }, ye = /* @__PURE__ */ m({
  __name: "BaseModal",
  props: {
    title: {
      type: String,
      required: !0
    },
    description: {
      type: String,
      required: !1
    },
    to: {
      type: String,
      required: !1,
      default: "/"
    },
    mode: {
      type: String,
      required: !1,
      default: "SUCCESS"
    }
  },
  emits: ["closeModal", "confirmModal"],
  setup(e) {
    return (t, a) => {
      const n = G("base-button");
      return l(), i($, null, [
        o("div", {
          class: "outside",
          onClick: a[0] || (a[0] = (r) => t.$emit("closeModal"))
        }),
        o("div", ge, [
          e.mode === f(z).DELETE ? (l(), i("div", pe, [
            y(f(D), { class: "w-12 h-12 text-gray-400 mx-auto mb-4" }),
            o("h3", be, " Are you sure you want to delete this " + p(e.title) + "? ", 1),
            o("div", he, [
              y(n, {
                color: f(v).RED,
                onClick: a[1] || (a[1] = (r) => t.$emit("confirmModal")),
                description: "Yes, I'm sure"
              }, null, 8, ["color"]),
              y(n, {
                color: f(v).WHITE,
                onClick: a[2] || (a[2] = (r) => t.$emit("closeModal")),
                description: "No, cancel"
              }, null, 8, ["color"])
            ])
          ])) : d("", !0)
        ])
      ], 64);
    };
  }
}), I = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [n, r] of t)
    a[n] = r;
  return a;
}, Pe = /* @__PURE__ */ I(ye, [["__scopeId", "data-v-492169b3"]]), We = /* @__PURE__ */ m({
  __name: "BaseRow",
  props: {
    bgColor: {
      type: String,
      required: !1,
      default: "white"
    }
  },
  setup(e) {
    const t = e;
    function a() {
      return "block p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 global " + t.bgColor;
    }
    return (n, r) => (l(), i("div", {
      class: h(a())
    }, [
      A(n.$slots, "default")
    ], 2));
  }
}), me = {}, xe = { class: "w-4 h-4 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" };
function ve(e, t) {
  return l(), i("div", xe);
}
const He = /* @__PURE__ */ I(me, [["render", ve]]);
var S = /* @__PURE__ */ ((e) => (e.SUCCESS = "SUCCESS", e.WARNING = "WARNING", e.ERROR = "ERROR", e))(S || {}), L = /* @__PURE__ */ ((e) => (e.TOP_LEFT = "TOP_LEFT", e.TOP_RIGHT = "TOP_RIGHT", e.BOTTOM_LEFT = "BOTTOM_LEFT", e.BOTTOM_RIGHT = "BOTTOM_RIGHT", e))(L || {});
const ke = { class: "flex items-center w-full max-w-md p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" }, Ee = { class: "ml-3 text-sm font-normal" }, Se = {
  key: 3,
  type: "button",
  class: "ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700",
  "data-dismiss-target": "#toast-danger",
  "aria-label": "Close"
}, Fe = /* @__PURE__ */ m({
  __name: "BaseToast",
  props: {
    mode: {
      type: Object,
      required: !0
    },
    description: {
      type: String,
      required: !0
    },
    hasCloseIcon: {
      type: Boolean,
      required: !1,
      default: !0
    },
    positioning: {
      type: String,
      required: !1,
      default: "right"
    }
  },
  setup(e) {
    const t = e;
    function a() {
      let c = "";
      switch (t.mode) {
        case S.ERROR:
          c = "text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200";
          break;
        case S.SUCCESS:
          c = "text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200";
          break;
        case S.WARNING:
          c = "text-orange-500 bg-orange-100 dark:bg-orange-700 dark:text-orange-200";
          break;
      }
      return "inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg " + c;
    }
    function n() {
      let c = "top-5 right-5";
      switch (t.positioning) {
        case L.BOTTOM_LEFT:
          c = "bottom-5";
          break;
        case L.TOP_LEFT:
          c = "top-5";
          break;
        case L.TOP_RIGHT:
          c = "top-5 right-5";
          break;
        case L.BOTTOM_RIGHT:
          c = "bottom-5 right-5";
          break;
      }
      return "fixed flex items-center w-full max-w-md p-4 space-x-4 divide-x rounded-lg " + c + " space-x";
    }
    const r = O(!0);
    function s() {
      setTimeout(() => r.value = !1, 1e6);
    }
    return s(), (c, g) => r.value ? (l(), i("div", {
      key: 0,
      id: "toast-top-right",
      class: h(n()),
      role: "alert"
    }, [
      o("div", ke, [
        e.mode == f(S).ERROR ? (l(), i("div", {
          key: 0,
          class: h(a())
        }, [
          y(f(D), { class: "h-6 w-6 text-red-500" }),
          g[1] || (g[1] = o("span", { class: "sr-only" }, "Error icon", -1))
        ], 2)) : e.mode == f(S).SUCCESS ? (l(), i("div", {
          key: 1,
          class: h(a())
        }, [
          y(f(X), { class: "h-6 w-6 text-green-500" }),
          g[2] || (g[2] = o("span", { class: "sr-only" }, "Check icon", -1))
        ], 2)) : e.mode == f(S).WARNING ? (l(), i("div", {
          key: 2,
          class: h(a())
        }, [
          y(f(K), { class: "h-6 w-6 text-yellow-500" }),
          g[3] || (g[3] = o("span", { class: "sr-only" }, "Warning icon", -1))
        ], 2)) : d("", !0),
        o("div", Ee, p(e.description), 1),
        e.hasCloseIcon ? (l(), i("button", Se, [
          g[4] || (g[4] = o("span", { class: "sr-only" }, "Close", -1)),
          y(f(V), {
            class: "h-6 w-6 text-gray-500 cursor-pointer",
            onClick: g[0] || (g[0] = (u) => r.value = !r.value)
          })
        ])) : d("", !0)
      ])
    ], 2)) : d("", !0);
  }
}), Re = { class: "w-13" }, Ye = /* @__PURE__ */ m({
  __name: "ColoredSquares",
  props: {
    color: {
      type: String,
      required: !1
    }
  },
  setup(e) {
    const t = e, a = [
      "bg-slate-300",
      "bg-zinc-300",
      "bg-neutral-300",
      "bg-stone-300",
      "bg-blue-300",
      "bg-green-300",
      "bg-yellow-300",
      "bg-purple-300",
      "bg-pink-300"
    ], n = E(() => a[Math.floor(Math.random() * a.length)]);
    function r() {
      let s = "gray";
      switch (t.color) {
        case b.GREEN: {
          s = "green";
          break;
        }
        case b.RED: {
          s = "red";
          break;
        }
        case b.BLUE: {
          s = "blue";
          break;
        }
        case b.YELLOW: {
          s = "yellow";
          break;
        }
        case b.NONE: {
          s = "";
          break;
        }
      }
      return "font-bold bg-" + s + "-100 text-" + s + "-800 text-xs mr-2 px-2.5 py-0.5 rounded-full";
    }
    return (s, c) => (l(), i("div", Re, [
      o("div", {
        class: h(["border border-gray-300 relative aspect-square rounded-lg bg-white shadow-sm overflow-hidden flex items-center justify-center text-center", r()])
      }, [
        A(s.$slots, "default"),
        o("div", {
          class: h(["absolute bottom-0 left-0 h-1 w-full", n.value])
        }, null, 2)
      ], 2)
    ]));
  }
}), we = {
  key: 0,
  class: "font-bold text-green-800"
}, _e = { key: 0 }, Ce = { key: 0 }, Le = "font-bold", je = /* @__PURE__ */ m({
  __name: "EuroAmount",
  props: {
    amount: {
      type: Number,
      required: !1
    },
    beforeAmount: {
      type: Number,
      default: null,
      required: !1
    },
    showCurrency: {
      type: Boolean,
      default: !0,
      required: !1
    }
  },
  setup(e) {
    const t = e, a = E(() => t.amount !== null && t.amount !== void 0), n = E(() => a.value && t.amount < 0), r = E(() => t.beforeAmount === null || t.beforeAmount === void 0 ? !1 : t.amount < t.beforeAmount), s = E(() => n.value || r.value), c = E(() => !n.value && !r.value && !(t.beforeAmount === null || t.beforeAmount === void 0));
    return (g, u) => (l(), i($, null, [
      a.value && c.value ? (l(), i("span", we, [
        U(p(e.amount) + " ", 1),
        e.showCurrency ? (l(), i("span", _e, "€")) : d("", !0)
      ])) : d("", !0),
      a.value && !c.value ? (l(), i("span", {
        key: 1,
        class: h([Le, s.value ? "text-red-800" : "text-gray-800"])
      }, [
        U(p(e.amount) + " ", 1),
        e.showCurrency ? (l(), i("span", Ce, "€")) : d("", !0)
      ], 2)) : d("", !0)
    ], 64));
  }
}), Ae = ["onClick"], Oe = {
  key: 1,
  style: { cursor: "not-allowed" }
}, Te = /* @__PURE__ */ m({
  __name: "Pagination",
  props: {
    totalItems: {
      type: Number,
      required: !0,
      default: 10
    },
    itemsPerPage: {
      type: Number,
      default: 20
    }
  },
  emits: ["page-changed"],
  setup(e, { emit: t }) {
    const a = e, n = O(1), r = O(0), s = O([]), c = t;
    function g(u) {
      if (u !== n.value && u >= 1 && u <= r.value && (n.value = u), r.value > 5) {
        s.value = [], u - 3 > 0 && (s.value.push(1), s.value.push(0));
        for (let x = 2; x >= 1; x--) {
          let N = u - x;
          N > 0 && s.value.push(N);
        }
        s.value.push(n.value);
        let k = r.value - u, M = k > 2, W = 2;
        if (M) {
          for (let x = 1; x <= W; x++)
            s.value.push(u + x);
          s.value.push(0), s.value.push(r.value);
        } else
          for (let x = 1; x <= k; x++)
            s.value.push(u + x);
      }
      c("page-changed", u);
    }
    return F(() => a.totalItems, () => {
      if (r.value = Math.ceil(a.totalItems / a.itemsPerPage), s.value = [], r.value > 5) {
        for (let u = 1; u < 5; u++)
          s.value.push(u);
        s.value.push(0), s.value.push(r.value);
      } else
        for (let u = 1; u <= r.value; u++)
          s.value.push(u);
    }), (u, P) => (l(), i("div", null, [
      o("ul", null, [
        (l(!0), i($, null, Y(s.value, (k) => (l(), i("li", { key: k }, [
          k !== 0 ? (l(), i("a", {
            key: 0,
            onClick: (M) => g(k),
            class: h({ active: k === n.value })
          }, p(k), 11, Ae)) : d("", !0),
          k === 0 ? (l(), i("span", Oe, "...")) : d("", !0)
        ]))), 128))
      ])
    ]));
  }
}), Xe = /* @__PURE__ */ I(Te, [["__scopeId", "data-v-248e09af"]]), Ue = { key: 0 }, $e = {
  key: 0,
  class: "flex items-center space-x-2"
}, Ge = {
  key: 1,
  class: "flex items-center space-x-2"
}, Ke = /* @__PURE__ */ m({
  __name: "TrendArrow",
  props: {
    number: {
      type: Number,
      required: !1
    },
    icon: {
      type: String,
      required: !1
    }
  },
  setup(e) {
    const t = e, a = E(() => t.number !== null && t.number !== void 0 && t.number < 0);
    return (n, r) => e.number ? (l(), i("div", Ue, [
      a.value ? (l(), i("span", $e, [
        y(B, {
          color: f(b).RED
        }, {
          default: T(() => [
            U(p(e.number) + p(t.icon), 1)
          ]),
          _: 1
        }, 8, ["color"]),
        y(f(Q), { class: "h-5 w-5 text-red-500" })
      ])) : (l(), i("span", Ge, [
        y(B, {
          color: f(b).GREEN
        }, {
          default: T(() => [
            U(p(e.number) + p(t.icon), 1)
          ]),
          _: 1
        }, 8, ["color"]),
        y(f(Z), { class: "h-5 w-5 text-green-500" })
      ]))
    ])) : d("", !0);
  }
});
var Ie = /* @__PURE__ */ ((e) => (e.WIN = "WIN", e.LOSE = "LOSE", e))(Ie || {});
export {
  w as AlertEnum,
  Be as BaseAlert,
  B as BaseBadge,
  Ie as BaseBadgeEnum,
  qe as BaseButton,
  v as BaseButtonEnum,
  R as BaseButtonSizeEnum,
  De as BaseLine,
  C as BaseLoginEnum,
  ze as BaseLogo,
  Pe as BaseModal,
  z as BaseModalEnum,
  We as BaseRow,
  He as BaseSpinner,
  Fe as BaseToast,
  S as BaseToastEnum,
  Ye as ColoredSquares,
  b as ColorsEnums,
  je as EuroAmount,
  _ as LineEnum,
  Xe as Pagination,
  L as PositioningEnum,
  Ke as TrendArrow,
  J as getBaseColor,
  ee as getBaseColorOf
};
