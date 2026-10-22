import { Teleport as e, defineComponent as t, h as n, onBeforeUnmount as r, onMounted as i, ref as a, watch as o } from "vue";
import { Mobox as s } from "@aifire/mobox-core";
//#region src/Mobox.ts
var c = t({
	name: "Mobox",
	props: {
		open: {
			type: Boolean,
			default: !1
		},
		effect: {
			type: String,
			default: "zoom"
		},
		closeOnOverlay: {
			type: Boolean,
			default: void 0
		},
		closeOnEsc: {
			type: Boolean,
			default: void 0
		},
		lockScroll: {
			type: Boolean,
			default: void 0
		},
		trapFocus: {
			type: Boolean,
			default: void 0
		},
		autoDestroy: {
			type: Boolean,
			default: void 0
		},
		hideNullValues: {
			type: Boolean,
			default: void 0
		}
	},
	emits: [
		"update:open",
		"opened",
		"closed"
	],
	setup(t, { emit: c, slots: l }) {
		let u = a(), d = null;
		return i(() => {
			if (!u.value) return;
			let { closeOnOverlay: e, closeOnEsc: n, lockScroll: r, trapFocus: i, autoDestroy: a, hideNullValues: o } = t, l = {
				...e !== void 0 && { closeOnOverlay: e },
				...n !== void 0 && { closeOnEsc: n },
				...r !== void 0 && { lockScroll: r },
				...i !== void 0 && { trapFocus: i },
				...a !== void 0 && { autoDestroy: a },
				...o !== void 0 && { hideNullValues: o }
			};
			d = new s(u.value, {
				...l,
				effect: t.effect,
				onOpened: () => c("opened"),
				onClosed: () => {
					c("closed"), c("update:open", !1);
				}
			}), t.open && d.show();
		}), o(() => t.open, (e) => {
			e ? d?.show() : d?.hide();
		}), r(() => {
			d?.dispose(), d = null;
		}), () => n(e, { to: "body" }, [n("div", {
			ref: u,
			class: "mobox",
			"data-effect": t.effect,
			inert: !t.open
		}, [n("div", { class: "mobox-overlay" }), n("div", {
			class: "mobox-inner",
			role: "dialog",
			"aria-modal": "true"
		}, [l.default?.(), n("button", {
			type: "button",
			class: "mobox-icon-close",
			"data-mobox-close": !0,
			"aria-label": "Close"
		})])])]);
	}
});
//#endregion
//#region src/useMobox.ts
function l(e = {}) {
	let t = a(null), n = null;
	return i(() => {
		t.value && (n = new s(t.value, e));
	}), r(() => {
		n?.destroy(), n = null;
	}), {
		el: t,
		show: (e) => n?.show(e),
		hide: () => n?.hide(),
		toggle: () => n?.toggle(),
		get instance() {
			return n;
		}
	};
}
//#endregion
export { c as Mobox, l as useMobox };
