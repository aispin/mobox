import e, { forwardRef as t, useCallback as n, useEffect as r, useImperativeHandle as i, useRef as a, useState as o } from "react";
import { createPortal as s } from "react-dom";
import { Mobox as c } from "@aifire/mobox-core";
//#region src/Mobox.tsx
var l = t(function(t, n) {
	let { open: l, defaultOpen: u = !1, onOpenChange: d, effect: f = "zoom", children: p, className: m, ...h } = t, g = a(null), _ = a(null), [v, y] = o(u), b = l !== void 0, x = b ? l : v;
	return r(() => {
		let e = g.current;
		if (e) return _.current = new c(e, {
			...h,
			effect: f,
			onOpened: (e) => h.onOpened?.(e),
			onClosed: (e) => {
				h.onClosed?.(e), d?.(!1), b || y(!1);
			}
		}), () => {
			_.current?.dispose(), _.current = null;
		};
	}, []), r(() => {
		let e = _.current;
		e && (x ? e.show() : e.hide());
	}, [x]), i(n, () => ({
		show: (e) => _.current?.show(e),
		hide: () => _.current?.hide(),
		toggle: () => _.current?.toggle(),
		get instance() {
			return _.current;
		}
	})), s(/* @__PURE__ */ e.createElement("div", {
		ref: g,
		className: m ? `mobox ${m}` : "mobox",
		"data-effect": f,
		inert: !x
	}, /* @__PURE__ */ e.createElement("div", { className: "mobox-overlay" }), /* @__PURE__ */ e.createElement("div", {
		className: "mobox-inner",
		role: "dialog",
		"aria-modal": "true"
	}, p, /* @__PURE__ */ e.createElement("button", {
		type: "button",
		className: "mobox-icon-close",
		"data-mobox-close": !0,
		"aria-label": "Close"
	}))), document.body);
});
//#endregion
//#region src/useMobox.ts
function u(e = {}) {
	let t = a(null), i = a(null), o = a(e);
	o.current = e;
	let s = n((e) => {
		e !== t.current && (i.current?.dispose(), i.current = e ? new c(e, o.current) : null, t.current = e);
	}, []);
	return r(() => () => {
		i.current?.dispose(), i.current = null;
	}, []), {
		ref: s,
		show: (e) => i.current?.show(e),
		hide: () => i.current?.hide(),
		toggle: () => i.current?.toggle(),
		get instance() {
			return i.current;
		}
	};
}
//#endregion
export { l as Mobox, u as useMobox };
