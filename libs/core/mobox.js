//#region src/bind.ts
function e(e) {
	return typeof e == "object" && !!e && "attrs" in e;
}
function t(t, n, r) {
	if (n == null) r && (t.hidden = !0);
	else if (t.hidden = !1, e(n)) for (let [e, r] of Object.entries(n.attrs)) t.setAttribute(e, r);
	else t instanceof HTMLInputElement && (t.type === "checkbox" || t.type === "radio") ? t.checked = !!n : t instanceof HTMLButtonElement ? t.innerHTML = String(n) : "value" in t ? t.value = String(n) : t.innerHTML = String(n);
}
function n(e, n, r) {
	for (let i of Object.keys(n)) {
		let a = n[i], o = [...e.querySelectorAll(`.mobox-${i}`), ...e.querySelectorAll(`[data-${i}]`)];
		for (let e of o) t(e, a, r);
	}
}
//#endregion
//#region src/dom.ts
function r(e, t = document) {
	return t.querySelector(e);
}
function i(e, t, n) {
	return e.addEventListener(t, n), () => e.removeEventListener(t, n);
}
var a = typeof window < "u" && window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
function o() {
	return a?.matches ?? !1;
}
var s = "a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex=\"-1\"])";
function c(e) {
	return [...e.querySelectorAll(s)].filter((e) => e.offsetParent !== null || e === document.activeElement);
}
//#endregion
//#region src/effects/blur.ts
var l = {
	name: "blur",
	enter: ({ inner: e, overlay: t }) => [e.animate([{
		opacity: 0,
		filter: "blur(16px)",
		transform: "scale(1.06)"
	}, {
		opacity: 1,
		filter: "blur(0px)",
		transform: "scale(1)"
	}], {
		duration: 460,
		easing: "cubic-bezier(0.22, 1, 0.36, 1)",
		fill: "both"
	}), t.animate([{ backdropFilter: "blur(0px)" }, { backdropFilter: "blur(12px)" }], {
		duration: 460,
		easing: "ease-out",
		fill: "both"
	})],
	exit: ({ inner: e, overlay: t }) => [e.animate([{
		opacity: 1,
		filter: "blur(0px)",
		transform: "scale(1)"
	}, {
		opacity: 0,
		filter: "blur(12px)",
		transform: "scale(1.04)"
	}], {
		duration: 260,
		easing: "ease-in",
		fill: "both"
	}), t.animate([{ backdropFilter: "blur(12px)" }, { backdropFilter: "blur(0px)" }], {
		duration: 260,
		easing: "ease-in",
		fill: "both"
	})]
}, u = {
	name: "elastic",
	enter: ({ inner: e }) => e.animate([
		{
			opacity: 0,
			transform: "scale(0.3)"
		},
		{
			opacity: 1,
			transform: "scale(1.14)",
			offset: .55
		},
		{
			opacity: 1,
			transform: "scale(0.94)",
			offset: .78
		},
		{
			opacity: 1,
			transform: "scale(1.03)",
			offset: .92
		},
		{
			opacity: 1,
			transform: "scale(1)"
		}
	], {
		duration: 720,
		easing: "cubic-bezier(0.22, 1, 0.36, 1)",
		fill: "both"
	}),
	exit: ({ inner: e }) => e.animate([{
		opacity: 1,
		transform: "scale(1)"
	}, {
		opacity: 0,
		transform: "scale(0.4)"
	}], {
		duration: 260,
		easing: "cubic-bezier(0.55, 0, 1, 0.45)",
		fill: "both"
	})
}, d = {
	name: "fade",
	enter: ({ inner: e }) => e.animate([{
		opacity: 0,
		transform: "translateY(14px)"
	}, {
		opacity: 1,
		transform: "translateY(0)"
	}], {
		duration: 320,
		easing: "cubic-bezier(0.22, 1, 0.36, 1)",
		fill: "both"
	}),
	exit: ({ inner: e }) => e.animate([{
		opacity: 1,
		transform: "translateY(0)"
	}, {
		opacity: 0,
		transform: "translateY(10px)"
	}], {
		duration: 220,
		easing: "cubic-bezier(0.4, 0, 1, 1)",
		fill: "both"
	})
}, f = {
	name: "flip",
	enter: ({ inner: e }) => (e.style.transformOrigin = "50% 50%", e.animate([{
		opacity: 0,
		transform: "perspective(1200px) rotateY(-72deg)"
	}, {
		opacity: 1,
		transform: "perspective(1200px) rotateY(0deg)"
	}], {
		duration: 520,
		easing: "cubic-bezier(0.22, 1, 0.36, 1)",
		fill: "both"
	})),
	exit: ({ inner: e }) => e.animate([{
		opacity: 1,
		transform: "perspective(1200px) rotateY(0deg)"
	}, {
		opacity: 0,
		transform: "perspective(1200px) rotateY(56deg)"
	}], {
		duration: 320,
		easing: "cubic-bezier(0.55, 0, 1, 0.45)",
		fill: "both"
	})
}, p = {
	name: "glitch",
	enter: ({ inner: e }) => e.animate([
		{
			opacity: 0,
			transform: "translateX(-18px)",
			filter: "hue-rotate(120deg) saturate(3)",
			clipPath: "inset(0 0 0 0)"
		},
		{
			opacity: 1,
			transform: "translateX(10px)",
			filter: "hue-rotate(60deg) saturate(2)",
			clipPath: "inset(18% 0 52% 0)",
			offset: .25
		},
		{
			opacity: 1,
			transform: "translateX(-6px)",
			filter: "hue-rotate(-40deg) saturate(1.5)",
			clipPath: "inset(58% 0 12% 0)",
			offset: .55
		},
		{
			opacity: 1,
			transform: "translateX(3px)",
			filter: "none",
			clipPath: "inset(30% 0 40% 0)",
			offset: .8
		},
		{
			opacity: 1,
			transform: "translateX(0)",
			filter: "none",
			clipPath: "inset(0 0 0 0)"
		}
	], {
		duration: 460,
		easing: "linear",
		fill: "both"
	}),
	exit: ({ inner: e }) => e.animate([{
		opacity: 1,
		transform: "translateX(0)"
	}, {
		opacity: 0,
		transform: "translateX(14px)",
		filter: "hue-rotate(90deg)",
		clipPath: "inset(40% 0 30% 0)"
	}], {
		duration: 220,
		easing: "steps(4, end)",
		fill: "both"
	})
}, m = {
	name: "liquid",
	enter: ({ inner: e }) => (e.style.borderRadius = "28px", e.animate([
		{
			opacity: 0,
			transform: "scale(0.55)",
			borderRadius: "50%"
		},
		{
			opacity: 1,
			transform: "scale(1.09)",
			borderRadius: "42% 58% 55% 45% / 48% 52% 55% 45%",
			offset: .65
		},
		{
			opacity: 1,
			transform: "scale(0.98)",
			borderRadius: "24px",
			offset: .85
		},
		{
			opacity: 1,
			transform: "scale(1)",
			borderRadius: "20px"
		}
	], {
		duration: 640,
		easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
		fill: "both"
	})),
	exit: ({ inner: e }) => e.animate([{
		opacity: 1,
		transform: "scale(1)",
		borderRadius: "20px"
	}, {
		opacity: 0,
		transform: "scale(0.6)",
		borderRadius: "50%"
	}], {
		duration: 320,
		easing: "cubic-bezier(0.55, 0, 1, 0.45)",
		fill: "both"
	})
}, h = {
	name: "slide",
	enter: ({ inner: e }) => e.animate([{
		opacity: .4,
		transform: "translateY(100%)"
	}, {
		opacity: 1,
		transform: "translateY(0)"
	}], {
		duration: 480,
		easing: "cubic-bezier(0.22, 1, 0.36, 1)",
		fill: "both"
	}),
	exit: ({ inner: e }) => e.animate([{
		opacity: 1,
		transform: "translateY(0)"
	}, {
		opacity: .4,
		transform: "translateY(100%)"
	}], {
		duration: 300,
		easing: "cubic-bezier(0.55, 0, 1, 0.45)",
		fill: "both"
	})
}, g = [
	"#7c5cff",
	"#22d3ee",
	"#f472b6",
	"#fbbf24"
];
function _(e, t) {
	if (o()) return;
	let n = e.getBoundingClientRect(), r = t.offsetWidth || 560, i = t.offsetHeight || 200, a = t.offsetParent, s = a ? a.getBoundingClientRect() : n, c = a ? s.left + t.offsetLeft : n.left + (n.width - r) / 2, l = a ? s.top + t.offsetTop : n.top + (n.height - i) / 2, u = document.createElement("canvas"), d = Math.min(window.devicePixelRatio || 1, 2);
	u.width = window.innerWidth * d, u.height = window.innerHeight * d, Object.assign(u.style, {
		position: "fixed",
		inset: 0,
		zIndex: "9998",
		pointerEvents: "none"
	}), document.body.appendChild(u);
	let f = u.getContext("2d");
	if (!f) {
		u.remove();
		return;
	}
	f.scale(d, d);
	let p = Array.from({ length: 110 }, () => ({
		x: c + 16 + Math.random() * Math.max(r - 32, 1),
		y: l - 2 + Math.random() * 8,
		vx: Math.cos(-Math.PI / 2 + (Math.random() - .5) * 1.8) * (2 + Math.random() * 5),
		vy: Math.sin(-Math.PI / 2 + (Math.random() - .5) * 1.8) * (2 + Math.random() * 5),
		size: 1.5 + Math.random() * 3,
		color: g[Math.floor(Math.random() * g.length)],
		life: 1
	})), m = () => {
		f.clearRect(0, 0, window.innerWidth, window.innerHeight);
		let e = !1;
		for (let t of p) t.life <= 0 || (e = !0, t.x += t.vx, t.y += t.vy, t.vy += .05, t.vx *= .985, t.vy *= .99, t.life -= .012, f.globalAlpha = Math.max(t.life, 0), f.fillStyle = t.color, f.beginPath(), f.arc(t.x, t.y, t.size, 0, Math.PI * 2), f.fill());
		e ? requestAnimationFrame(m) : u.remove();
	};
	requestAnimationFrame(m);
}
var v = {
	name: "sparkle",
	enter: (e) => {
		let t = e.inner.animate([{
			opacity: 0,
			transform: "scale(0.7)"
		}, {
			opacity: 1,
			transform: "scale(1)"
		}], {
			duration: 420,
			easing: "cubic-bezier(0.22, 1, 0.36, 1)",
			fill: "both"
		});
		return _(e.root, e.inner), t;
	},
	exit: ({ inner: e }) => e.animate([{
		opacity: 1,
		transform: "scale(1)"
	}, {
		opacity: 0,
		transform: "scale(0.72)"
	}], {
		duration: 260,
		easing: "cubic-bezier(0.55, 0, 1, 0.45)",
		fill: "both"
	})
}, y = {
	name: "warp",
	enter: ({ inner: e }) => (e.style.transformOrigin = "50% 100%", e.animate([{
		opacity: 0,
		transform: "perspective(1000px) rotateX(42deg) translateZ(-280px)"
	}, {
		opacity: 1,
		transform: "perspective(1000px) rotateX(0deg) translateZ(0)"
	}], {
		duration: 560,
		easing: "cubic-bezier(0.22, 1, 0.36, 1)",
		fill: "both"
	})),
	exit: ({ inner: e }) => e.animate([{
		opacity: 1,
		transform: "perspective(1000px) rotateX(0deg) translateZ(0)"
	}, {
		opacity: 0,
		transform: "perspective(1000px) rotateX(-32deg) translateZ(-200px)"
	}], {
		duration: 340,
		easing: "cubic-bezier(0.55, 0, 1, 0.45)",
		fill: "both"
	})
}, b = {
	name: "zoom",
	enter: ({ inner: e }) => e.animate([{
		opacity: 0,
		transform: "scale(0.82) rotate(-1.5deg)"
	}, {
		opacity: 1,
		transform: "scale(1) rotate(0deg)"
	}], {
		duration: 380,
		easing: "cubic-bezier(0.22, 1, 0.36, 1)",
		fill: "both"
	}),
	exit: ({ inner: e }) => e.animate([{
		opacity: 1,
		transform: "scale(1) rotate(0deg)"
	}, {
		opacity: 0,
		transform: "scale(0.86) rotate(1deg)"
	}], {
		duration: 240,
		easing: "cubic-bezier(0.4, 0, 1, 1)",
		fill: "both"
	})
}, x = /* @__PURE__ */ new Map();
function S(e) {
	x.set(e.name, e);
}
function C(e) {
	return x.get(e);
}
function w() {
	return [...x.keys()];
}
[
	d,
	b,
	f,
	h,
	l,
	p,
	m,
	y,
	u,
	v
].forEach(S);
//#endregion
//#region src/mobox.ts
var T = "mobox-open", E = "mobox-scene", D = "mobox-scene-active", O = 0, k = !1;
function A() {
	k || (k = !0, document.body.dataset.moboxOverflow = document.body.style.overflow, document.body.style.overflow = "hidden");
}
function j() {
	k && (k = !1, document.body.style.overflow = document.body.dataset.moboxOverflow ?? "", delete document.body.dataset.moboxOverflow);
}
function M(e) {
	return e ? typeof e == "string" ? document.getElementById(e) : e : null;
}
function N(e) {
	let t = document.createElement("div");
	t.innerHTML = e.trim();
	let n = t.firstElementChild;
	return n ? (document.body.appendChild(n), n) : null;
}
function P(e) {
	if (typeof e != "string") return e instanceof HTMLScriptElement ? N(e.innerHTML) : null;
	if (e.includes("<")) return N(e);
	let t = document.getElementById(e);
	return t ? N(t.innerHTML) : null;
}
function F(e) {
	if (e.classList.add("mobox"), !r(".mobox-overlay", e)) {
		let t = document.createElement("div");
		t.className = "mobox-overlay", e.prepend(t);
	}
	if (!r(".mobox-inner", e)) {
		let t = document.createElement("div");
		t.className = "mobox-inner";
		for (let n of [...e.children]) n.classList.contains("mobox-overlay") || t.appendChild(n);
		e.appendChild(t);
	}
	let t = r(".mobox-inner", e);
	t && (t.tabIndex = -1);
}
var I = class e {
	static create(t = {}, n) {
		let { el: r, tpl: i, autoShow: a = !0, ...o } = t, s = M(r), c = !s;
		if (!s && i !== void 0 && (s = P(i)), !s) return console.error("[mobox] Mobox.create() requires a valid \"el\" or \"tpl\" option"), null;
		let l = new e(s, {
			...o,
			autoDestroy: o.autoDestroy ?? c
		});
		return a ? l.show(n) : l;
	}
	static registerEffect(e) {
		S(e);
	}
	static effectNames() {
		return w();
	}
	el;
	effect;
	options;
	overlay;
	inner;
	teardown = [];
	anims = [];
	_isOpen = !1;
	_cycle = 0;
	constructor(e, t = {}) {
		F(e), this.el = e, this.effect = t.effect ?? e.dataset.effect ?? "zoom", this.options = {
			closeOnOverlay: !0,
			closeOnEsc: !0,
			lockScroll: !0,
			trapFocus: !0,
			autoDestroy: !1,
			hideNullValues: !0,
			...t,
			effect: this.effect
		}, this.overlay = r(".mobox-overlay", e), this.inner = r(".mobox-inner", e), this.teardown.push(i(this.overlay, "click", () => {
			this.options.closeOnOverlay && this.hide();
		}), i(document, "keydown", (e) => this._onKeydown(e)));
		for (let t of e.querySelectorAll("[data-mobox-close]")) this.teardown.push(i(t, "click", () => this.hide()));
	}
	get isOpen() {
		return this._isOpen;
	}
	show(e) {
		if (e && n(this.el, e, this.options.hideNullValues), this._isOpen) return this;
		this._isOpen = !0, this.anims.forEach((e) => e.cancel()), this.anims = [], this.options.lockScroll && A(), O++, this.el.classList.add(T), this.options.onOpen?.(this);
		let t = ++this._cycle;
		return this._play("enter").then(() => {
			t === this._cycle && this._isOpen && this.options.onOpened?.(this);
		}), this;
	}
	hide() {
		if (!this._isOpen) return this;
		this._isOpen = !1, this.options.onClose?.(this);
		let e = ++this._cycle;
		return this._play("exit").then(() => {
			e === this._cycle && (this.el.classList.remove(T), O = Math.max(O - 1, 0), O === 0 && j(), this.options.autoDestroy && this.destroy(), this.options.onClosed?.(this));
		}), this;
	}
	toggle() {
		return this._isOpen ? this.hide() : this.show();
	}
	showScene(e, t) {
		let r = `${E}-${e || "default"}`, i;
		for (let e of this.el.querySelectorAll(`.${E}`)) e.classList.remove(D), !i && e.classList.contains(r) && (i = e);
		return i && (t && n(i, t, this.options.hideNullValues), i.classList.add(D)), this;
	}
	dispose() {
		this.anims.forEach((e) => e.cancel()), this.anims = [], this.teardown.forEach((e) => e()), this.teardown.length = 0, this._isOpen && (this._isOpen = !1, O = Math.max(O - 1, 0), O === 0 && j());
	}
	destroy() {
		this.dispose(), this.el.remove();
	}
	_play(e) {
		if (o()) return Promise.resolve();
		let t = C(this.effect);
		if (!t) return Promise.resolve();
		let n = t[e]({
			root: this.el,
			overlay: this.overlay,
			inner: this.inner
		}), r = n == null ? [] : Array.isArray(n) ? n : [n], i = r.filter((e) => e instanceof Animation), a = r.filter((e) => e instanceof Promise);
		return this.anims = i, Promise.all([...i.map((e) => e.finished.catch(() => void 0)), ...a]).then(() => void 0);
	}
	_onKeydown(e) {
		if (!this._isOpen) return;
		if (e.key === "Escape" && this.options.closeOnEsc) {
			this.hide();
			return;
		}
		if (e.key !== "Tab" || !this.options.trapFocus) return;
		let t = c(this.inner);
		if (t.length === 0) {
			e.preventDefault(), this.inner.focus();
			return;
		}
		let n = t[0], r = t[t.length - 1];
		e.shiftKey && document.activeElement === n ? (e.preventDefault(), r.focus()) : !e.shiftKey && document.activeElement === r && (e.preventDefault(), n.focus());
	}
};
//#endregion
export { I as Mobox, w as effectNames, C as getEffect, S as registerEffect };
