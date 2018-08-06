/*!
 * better-normal-scroll v1.11.1
 * (c) 2016-2018 ustbhuangyi
 * Released under the MIT License.
 */
! function(t, i) { "object" == typeof exports && "undefined" != typeof module ? module.exports = i() : "function" == typeof define && define.amd ? define(i) : t.BScroll = i() }(this, function() {
    "use strict";
    var l = function(t, i) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return function(t, i) {
                var e = [],
                    s = !0,
                    o = !1,
                    r = void 0;
                try { for (var n, h = t[Symbol.iterator](); !(s = (n = h.next()).done) && (e.push(n.value), !i || e.length !== i); s = !0); } catch (t) { o = !0, r = t } finally { try {!s && h.return && h.return() } finally { if (o) throw r } }
                return e
            }(t, i);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        },
        c = function(t) { if (Array.isArray(t)) { for (var i = 0, e = Array(t.length); i < t.length; i++) e[i] = t[i]; return e } return Array.from(t) };
    var e = "undefined" != typeof window,
        t = e && navigator.userAgent.toLowerCase(),
        i = t && /wechatdevtools/.test(t),
        s = t && 0 < t.indexOf("android");

    function x() { return window.performance && window.performance.now ? window.performance.now() + window.performance.timing.navigationStart : +new Date }

    function a(t) { for (var i = arguments.length, e = Array(1 < i ? i - 1 : 0), s = 1; s < i; s++) e[s - 1] = arguments[s]; for (var o = 0; o < e.length; o++) { var r = e[o]; for (var n in r) t[n] = r[n] } return t }

    function h(t) { return null == t }

    function d(t, i) { return Math.sqrt(t * t + i * i) }
    var o = e && document.createElement("div").style,
        r = function() {
            if (!e) return !1;
            var t = { webkit: "webkitTransform", Moz: "MozTransform", O: "OTransform", ms: "msTransform", standard: "transform" };
            for (var i in t)
                if (void 0 !== o[t[i]]) return i;
            return !1
        }();

    function n(t) { return !1 !== r && ("standard" === r ? "transitionEnd" === t ? "transitionend" : t : r + t.charAt(0).toUpperCase() + t.substr(1)) }

    function p(t, i, e, s) { t.addEventListener(i, e, { passive: !1, capture: !!s }) }

    function u(t, i, e, s) { t.removeEventListener(i, e, { passive: !1, capture: !!s }) }

    function g(t) { for (var i = 0, e = 0; t;) i -= t.offsetLeft, e -= t.offsetTop, t = t.offsetParent; return { left: i, top: e } }

    function m(t) { var i = t.getBoundingClientRect(); return { left: -(i.left + window.pageXOffset), top: -(i.top + window.pageYOffset) } }
    var f = n("transform"),
        v = e && n("perspective") in o,
        y = e && ("ontouchstart" in window || i),
        w = !1 !== f,
        T = e && n("transition") in o,
        b = { transform: f, transitionTimingFunction: n("transitionTimingFunction"), transitionDuration: n("transitionDuration"), transitionProperty: n("transitionProperty"), transitionDelay: n("transitionDelay"), transformOrigin: n("transformOrigin"), transitionEnd: n("transitionEnd") },
        _ = 1,
        S = { touchstart: _, touchmove: _, touchend: _, mousedown: 2, mousemove: 2, mouseup: 2 };

    function M(t) { if (t instanceof window.SVGElement) { var i = t.getBoundingClientRect(); return { top: i.top, left: i.left, width: i.width, height: i.height } } return { top: t.offsetTop, left: t.offsetLeft, width: t.offsetWidth, height: t.offsetHeight } }

    function X(t, i) {
        for (var e in i)
            if (i[e].test(t[e])) return !0;
        return !1
    }

    function Y(t, i) { t.removeChild(i) }
    var P = { startX: 0, startY: 0, scrollX: !1, scrollY: !0, freeScroll: !1, directionLockThreshold: 5, eventPassthrough: "", click: !1, tap: !1, bounce: !0, bounceTime: 800, momentum: !0, momentumLimitTime: 300, momentumLimitDistance: 15, swipeTime: 2500, swipeBounceTime: 500, deceleration: .001, flickLimitTime: 200, flickLimitDistance: 100, resizePolling: 60, probeType: 0, preventDefault: !0, preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ }, HWCompositing: !0, useTransition: !0, useTransform: !0, bindToWrapper: !1, disableMouse: y, disableTouch: !y, observeDOM: !0, autoBlur: !0, wheel: !1, snap: !1, scrollbar: !1, pullDownRefresh: !1, pullUpLoad: !1, mouseWheel: !1, stopPropagation: !1, zoom: !1 };
    var D = { swipe: { style: "cubic-bezier(0.23, 1, 0.32, 1)", fn: function(t) { return 1 + --t * t * t * t * t } }, swipeBounce: { style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", fn: function(t) { return t * (2 - t) } }, bounce: { style: "cubic-bezier(0.165, 0.84, 0.44, 1)", fn: function(t) { return 1 - --t * t * t * t } } };

    function E(t, i, e, s, o, r) {
        var n = t - i,
            h = Math.abs(n) / e,
            a = r.deceleration,
            l = r.itemHeight,
            c = r.swipeBounceTime,
            p = r.wheel,
            d = r.swipeTime,
            u = p ? 4 : 15,
            g = t + h / a * (n < 0 ? -1 : 1);
        return p && l && (g = Math.round(g / l) * l), g < s ? (g = o ? Math.max(s - o / 4, s - o / u * h) : s, d = c) : 0 < g && (g = o ? Math.min(o / 4, o / u * h) : 0, d = c), { destination: Math.round(g), duration: d }
    }

    function k() {}
    var W = e ? window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || function(t) { return window.setTimeout(t, (t.interval || 100 / 60) / 2) } : k,
        z = e ? window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || function(t) { window.clearTimeout(t) } : k,
        H = 1,
        O = -1,
        L = 1,
        C = -1,
        I = 1,
        A = 3;

    function F(t) { console.error("[BScroll warn]: " + t) }
    var R, U, B, N, V, q, Z, j, G, $;

    function J(t) {
        var i = document.createElement("div"),
            e = document.createElement("div");
        return i.style.cssText = "position:absolute;z-index:9999;pointerEvents:none", e.style.cssText = "box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px;", e.className = "bscroll-indicator", "horizontal" === t ? (i.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", e.style.height = "100%", i.className = "bscroll-horizontal-scrollbar") : (i.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", e.style.width = "100%", i.className = "bscroll-vertical-scrollbar"), i.style.cssText += ";overflow:hidden", i.appendChild(e), i
    }

    function K(t, i) { this.wrapper = i.el, this.wrapperStyle = this.wrapper.style, this.indicator = this.wrapper.children[0], this.indicatorStyle = this.indicator.style, this.scroller = t, this.direction = i.direction, i.fade ? (this.visible = 0, this.wrapperStyle.opacity = "0") : this.visible = 1, this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.x = 0, this.y = 0, i.interactive && this._addDOMEvents() }

    function Q(t, i) { this.wrapper = "string" == typeof t ? document.querySelector(t) : t, this.wrapper || F("Can not resolve the wrapper DOM."), this.scroller = this.wrapper.children[0], this.scroller || F("The wrapper need at least one child element to be scroller."), this.scrollerStyle = this.scroller.style, this._init(t, i) }
    return K.prototype.handleEvent = function(t) {
        switch (t.type) {
            case "touchstart":
            case "mousedown":
                this._start(t);
                break;
            case "touchmove":
            case "mousemove":
                this._move(t);
                break;
            case "touchend":
            case "mouseup":
            case "touchcancel":
            case "mousecancel":
                this._end(t)
        }
    }, K.prototype.refresh = function() { this._shouldShow() && (this.transitionTime(), this._calculate(), this.updatePosition()) }, K.prototype.fade = function(t, i) {
        var e = this;
        if (!i || this.visible) {
            var s = t ? 250 : 500;
            t = t ? "1" : "0", this.wrapperStyle[b.transitionDuration] = s + "ms", clearTimeout(this.fadeTimeout), this.fadeTimeout = setTimeout(function() { e.wrapperStyle.opacity = t, e.visible = +t }, 0)
        }
    }, K.prototype.updatePosition = function() {
        if ("vertical" === this.direction) {
            var t = Math.round(this.sizeRatioY * this.scroller.y);
            if (t < 0) {
                this.transitionTime(500);
                var i = Math.max(this.indicatorHeight + 3 * t, 8);
                this.indicatorStyle.height = i + "px", t = 0
            } else if (t > this.maxPosY) {
                this.transitionTime(500);
                var e = Math.max(this.indicatorHeight - 3 * (t - this.maxPosY), 8);
                this.indicatorStyle.height = e + "px", t = this.maxPosY + this.indicatorHeight - e
            } else this.indicatorStyle.height = this.indicatorHeight + "px";
            this.y = t, this.scroller.options.useTransform ? this.indicatorStyle[b.transform] = "translateY(" + t + "px)" + this.scroller.translateZ : this.indicatorStyle.top = t + "px"
        } else {
            var s = Math.round(this.sizeRatioX * this.scroller.x);
            if (s < 0) {
                this.transitionTime(500);
                var o = Math.max(this.indicatorWidth + 3 * s, 8);
                this.indicatorStyle.width = o + "px", s = 0
            } else if (s > this.maxPosX) {
                this.transitionTime(500);
                var r = Math.max(this.indicatorWidth - 3 * (s - this.maxPosX), 8);
                this.indicatorStyle.width = r + "px", s = this.maxPosX + this.indicatorWidth - r
            } else this.indicatorStyle.width = this.indicatorWidth + "px";
            this.x = s, this.scroller.options.useTransform ? this.indicatorStyle[b.transform] = "translateX(" + s + "px)" + this.scroller.translateZ : this.indicatorStyle.left = s + "px"
        }
    }, K.prototype.transitionTime = function() {
        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0;
        this.indicatorStyle[b.transitionDuration] = t + "ms"
    }, K.prototype.transitionTimingFunction = function(t) { this.indicatorStyle[b.transitionTimingFunction] = t }, K.prototype.destroy = function() { this._removeDOMEvents(), this.wrapper.parentNode.removeChild(this.wrapper) }, K.prototype._start = function(t) {
        var i = t.touches ? t.touches[0] : t;
        t.preventDefault(), t.stopPropagation(), this.transitionTime(), this.initiated = !0, this.moved = !1, this.lastPointX = i.pageX, this.lastPointY = i.pageY, this.startTime = x(), this._handleMoveEvents(p), this.scroller.trigger("beforeScrollStart")
    }, K.prototype._move = function(t) {
        var i = t.touches ? t.touches[0] : t;
        t.preventDefault(), t.stopPropagation(), this.moved || this.scroller.trigger("scrollStart"), this.moved = !0;
        var e = i.pageX - this.lastPointX;
        this.lastPointX = i.pageX;
        var s = i.pageY - this.lastPointY;
        this.lastPointY = i.pageY;
        var o = this.x + e,
            r = this.y + s;
        this._pos(o, r)
    }, K.prototype._end = function(t) {
        if (this.initiated) {
            this.initiated = !1, t.preventDefault(), t.stopPropagation(), this._handleMoveEvents(u);
            var i = this.scroller.options.snap;
            if (i) {
                var e = i.speed,
                    s = i.easing,
                    o = void 0 === s ? D.bounce : s,
                    r = this.scroller._nearestSnap(this.scroller.x, this.scroller.y),
                    n = e || Math.max(Math.max(Math.min(Math.abs(this.scroller.x - r.x), 1e3), Math.min(Math.abs(this.scroller.y - r.y), 1e3)), 300);
                this.scroller.x === r.x && this.scroller.y === r.y || (this.scroller.directionX = 0, this.scroller.directionY = 0, this.scroller.currentPage = r, this.scroller.scrollTo(r.x, r.y, n, o))
            }
            this.moved && this.scroller.trigger("scrollEnd", { x: this.scroller.x, y: this.scroller.y })
        }
    }, K.prototype._pos = function(t, i) { t < 0 ? t = 0 : t > this.maxPosX && (t = this.maxPosX), i < 0 ? i = 0 : i > this.maxPosY && (i = this.maxPosY), t = Math.round(t / this.sizeRatioX), i = Math.round(i / this.sizeRatioY), this.scroller.scrollTo(t, i), this.scroller.trigger("scroll", { x: this.scroller.x, y: this.scroller.y }) }, K.prototype._shouldShow = function() { return "vertical" === this.direction && this.scroller.hasVerticalScroll || "horizontal" === this.direction && this.scroller.hasHorizontalScroll ? !(this.wrapper.style.display = "") : !(this.wrapper.style.display = "none") }, K.prototype._calculate = function() {
        if ("vertical" === this.direction) {
            var t = this.wrapper.clientHeight;
            this.indicatorHeight = Math.max(Math.round(t * t / (this.scroller.scrollerHeight || t || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px", this.maxPosY = t - this.indicatorHeight, this.sizeRatioY = this.maxPosY / this.scroller.maxScrollY
        } else {
            var i = this.wrapper.clientWidth;
            this.indicatorWidth = Math.max(Math.round(i * i / (this.scroller.scrollerWidth || i || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px", this.maxPosX = i - this.indicatorWidth, this.sizeRatioX = this.maxPosX / this.scroller.maxScrollX
        }
    }, K.prototype._addDOMEvents = function() {
        var t = p;
        this._handleDOMEvents(t)
    }, K.prototype._removeDOMEvents = function() {
        var t = u;
        this._handleDOMEvents(t), this._handleMoveEvents(t)
    }, K.prototype._handleMoveEvents = function(t) { this.scroller.options.disableTouch || t(window, "touchmove", this), this.scroller.options.disableMouse || t(window, "mousemove", this) }, K.prototype._handleDOMEvents = function(t) { this.scroller.options.disableTouch || (t(this.indicator, "touchstart", this), t(window, "touchend", this)), this.scroller.options.disableMouse || (t(this.indicator, "mousedown", this), t(window, "mouseup", this)) }, (R = Q).prototype._init = function(t, i) { this._handleOptions(i), this._events = {}, this.x = 0, this.y = 0, this.scale = 1, this.directionX = 0, this.directionY = 0, this._addDOMEvents(), this._initExtFeatures(), this._watchTransition(), this.options.observeDOM && this._initDOMObserver(), this.options.autoBlur && this._handleAutoBlur(), this.refresh(), this.options.snap || this.scrollTo(this.options.startX, this.options.startY), this.enable() }, R.prototype._handleOptions = function(t) { this.options = a({}, P, t), this.translateZ = this.options.HWCompositing && v ? " translateZ(0)" : "", this.options.useTransition = this.options.useTransition && T, this.options.useTransform = this.options.useTransform && w, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollX = "horizontal" !== this.options.eventPassthrough && this.options.scrollX, this.options.scrollY = "vertical" !== this.options.eventPassthrough && this.options.scrollY, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold, !0 === this.options.tap && (this.options.tap = "tap") }, R.prototype._addDOMEvents = function() {
        var t = p;
        this._handleDOMEvents(t)
    }, R.prototype._removeDOMEvents = function() {
        var t = u;
        this._handleDOMEvents(t)
    }, R.prototype._handleDOMEvents = function(t) {
        var i = this.options.bindToWrapper ? this.wrapper : window;
        t(window, "orientationchange", this), t(window, "resize", this), this.options.click && t(this.wrapper, "click", this, !0), this.options.disableMouse || (t(this.wrapper, "mousedown", this), t(i, "mousemove", this), t(i, "mousecancel", this), t(i, "mouseup", this)), y && !this.options.disableTouch && (t(this.wrapper, "touchstart", this), t(i, "touchmove", this), t(i, "touchcancel", this), t(i, "touchend", this)), t(this.scroller, b.transitionEnd, this)
    }, R.prototype._initExtFeatures = function() { this.options.snap && this._initSnap(), this.options.scrollbar && this._initScrollbar(), this.options.pullUpLoad && this._initPullUp(), this.options.pullDownRefresh && this._initPullDown(), this.options.wheel && this._initWheel(), this.options.mouseWheel && this._initMouseWheel(), this.options.zoom && this._initZoom() }, R.prototype._watchTransition = function() {
        if ("function" == typeof Object.defineProperty) {
            var o = this,
                r = !1;
            Object.defineProperty(this, "isInTransition", { get: function() { return r }, set: function(t) { r = t; for (var i = o.scroller.children.length ? o.scroller.children : [o.scroller], e = r && !o.pulling ? "none" : "auto", s = 0; s < i.length; s++) i[s].style.pointerEvents = e } })
        }
    }, R.prototype._handleAutoBlur = function() { this.on("scrollStart", function() { var t = document.activeElement;!t || "INPUT" !== t.tagName && "TEXTAREA" !== t.tagName || t.blur() }) }, R.prototype._initDOMObserver = function() {
        var r = this;
        if ("undefined" != typeof MutationObserver) {
            var n = void 0,
                t = new MutationObserver(function(t) {
                    if (!r._shouldNotRefresh()) {
                        for (var i = !1, e = !1, s = 0; s < t.length; s++) { var o = t[s]; if ("attributes" !== o.type) { i = !0; break } if (o.target !== r.scroller) { e = !0; break } }
                        i ? r.refresh() : e && (clearTimeout(n), n = setTimeout(function() { r._shouldNotRefresh() || r.refresh() }, 60))
                    }
                });
            t.observe(this.scroller, { attributes: !0, childList: !0, subtree: !0 }), this.on("destroy", function() { t.disconnect() })
        } else this._checkDOMUpdate()
    }, R.prototype._shouldNotRefresh = function() { var t = 0 < this.x || this.x < this.maxScrollX || 0 < this.y || this.y < this.maxScrollY; return this.isInTransition || this.stopFromTransition || t }, R.prototype._checkDOMUpdate = function() {
        var e = M(this.scroller),
            s = e.width,
            o = e.height;

        function r() {
            var t = this;
            setTimeout(function() {
                (function() {
                    if (!this.destroyed) {
                        var t = (e = M(this.scroller)).width,
                            i = e.height;
                        s === t && o === i || this.refresh(), s = t, o = i, r.call(this)
                    }
                }).call(t)
            }, 1e3)
        }
        r.call(this)
    }, R.prototype.handleEvent = function(t) {
        switch (t.type) {
            case "touchstart":
            case "mousedown":
                this._start(t), this.options.zoom && t.touches && 1 < t.touches.length && this._zoomStart(t);
                break;
            case "touchmove":
            case "mousemove":
                this.options.zoom && t.touches && 1 < t.touches.length ? this._zoom(t) : this._move(t);
                break;
            case "touchend":
            case "mouseup":
            case "touchcancel":
            case "mousecancel":
                this.scaled ? this._zoomEnd(t) : this._end(t);
                break;
            case "orientationchange":
            case "resize":
                this._resize();
                break;
            case "transitionend":
            case "webkitTransitionEnd":
            case "oTransitionEnd":
            case "MSTransitionEnd":
                this._transitionEnd(t);
                break;
            case "click":
                this.enabled && !t._constructed && (X(t.target, this.options.preventDefaultException) || (t.preventDefault(), t.stopPropagation()));
                break;
            case "wheel":
            case "DOMMouseScroll":
            case "mousewheel":
                this._onMouseWheel(t)
        }
    }, R.prototype.refresh = function() {
        var t = M(this.wrapper);
        this.wrapperWidth = t.width, this.wrapperHeight = t.height;
        var i = M(this.scroller);
        this.scrollerWidth = Math.round(i.width * this.scale), this.scrollerHeight = Math.round(i.height * this.scale);
        var e = this.options.wheel;
        e ? (this.items = this.scroller.children, this.options.itemHeight = this.itemHeight = this.items.length ? this.scrollerHeight / this.items.length : 0, void 0 === this.selectedIndex && (this.selectedIndex = e.selectedIndex || 0), this.options.startY = -this.selectedIndex * this.itemHeight, this.maxScrollX = 0, this.maxScrollY = -this.itemHeight * (this.items.length - 1)) : (this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.maxScrollY = this.wrapperHeight - this.scrollerHeight), this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this.directionX = 0, this.directionY = 0, this.wrapperOffset = g(this.wrapper), this.trigger("refresh"), this.resetPosition()
    }, R.prototype.enable = function() { this.enabled = !0 }, R.prototype.disable = function() { this.enabled = !1 }, (U = Q).prototype._start = function(t) {
        var i = S[t.type];
        if ((i === _ || 0 === t.button) && !(!this.enabled || this.destroyed || this.initiated && this.initiated !== i)) {
            this.initiated = i, this.options.preventDefault && !X(t.target, this.options.preventDefaultException) && t.preventDefault(), this.options.stopPropagation && t.stopPropagation(), this.moved = !1, this.distX = 0, this.distY = 0, this.directionX = 0, this.directionY = 0, this.movingDirectionX = 0, this.movingDirectionY = 0, this.directionLocked = 0, this._transitionTime(), this.startTime = x(), this.options.wheel && (this.target = t.target), this.stop();
            var e = t.touches ? t.touches[0] : t;
            this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = e.pageX, this.pointY = e.pageY, this.trigger("beforeScrollStart")
        }
    }, U.prototype._move = function(t) {
        if (this.enabled && !this.destroyed && S[t.type] === this.initiated) {
            this.options.preventDefault && t.preventDefault(), this.options.stopPropagation && t.stopPropagation();
            var i = t.touches ? t.touches[0] : t,
                e = i.pageX - this.pointX,
                s = i.pageY - this.pointY;
            this.pointX = i.pageX, this.pointY = i.pageY, this.distX += e, this.distY += s;
            var o = Math.abs(this.distX),
                r = Math.abs(this.distY),
                n = x();
            if (!(n - this.endTime > this.options.momentumLimitTime && r < this.options.momentumLimitDistance && o < this.options.momentumLimitDistance)) {
                if (this.directionLocked || this.options.freeScroll || (o > r + this.options.directionLockThreshold ? this.directionLocked = "h" : r >= o + this.options.directionLockThreshold ? this.directionLocked = "v" : this.directionLocked = "n"), "h" === this.directionLocked) {
                    if ("vertical" === this.options.eventPassthrough) t.preventDefault();
                    else if ("horizontal" === this.options.eventPassthrough) return void(this.initiated = !1);
                    s = 0
                } else if ("v" === this.directionLocked) {
                    if ("horizontal" === this.options.eventPassthrough) t.preventDefault();
                    else if ("vertical" === this.options.eventPassthrough) return void(this.initiated = !1);
                    e = 0
                }
                e = this.hasHorizontalScroll ? e : 0, s = this.hasVerticalScroll ? s : 0, this.movingDirectionX = 0 < e ? C : e < 0 ? L : 0, this.movingDirectionY = 0 < s ? O : s < 0 ? H : 0;
                var h = this.x + e,
                    a = this.y + s,
                    l = !1,
                    c = !1,
                    p = !1,
                    d = !1,
                    u = this.options.bounce;
                !1 !== u && (l = void 0 === u.top || u.top, c = void 0 === u.bottom || u.bottom, p = void 0 === u.left || u.left, d = void 0 === u.right || u.right), (0 < h || h < this.maxScrollX) && (h = 0 < h && p || h < this.maxScrollX && d ? this.x + e / 3 : 0 < h ? 0 : this.maxScrollX), (0 < a || a < this.maxScrollY) && (a = 0 < a && l || a < this.maxScrollY && c ? this.y + s / 3 : 0 < a ? 0 : this.maxScrollY), this.moved || (this.moved = !0, this.trigger("scrollStart")), this._translate(h, a), n - this.startTime > this.options.momentumLimitTime && (this.startTime = n, this.startX = this.x, this.startY = this.y, this.options.probeType === I && this.trigger("scroll", { x: this.x, y: this.y })), this.options.probeType > I && this.trigger("scroll", { x: this.x, y: this.y });
                var g = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft,
                    m = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
                    f = this.pointX - g,
                    v = this.pointY - m;
                (f > document.documentElement.clientWidth - this.options.momentumLimitDistance || f < this.options.momentumLimitDistance || v < this.options.momentumLimitDistance || v > document.documentElement.clientHeight - this.options.momentumLimitDistance) && this._end(t)
            }
        }
    }, U.prototype._end = function(t) {
        if (this.enabled && !this.destroyed && S[t.type] === this.initiated) {
            this.initiated = !1, this.options.preventDefault && !X(t.target, this.options.preventDefaultException) && t.preventDefault(), this.options.stopPropagation && t.stopPropagation(), this.trigger("touchEnd", { x: this.x, y: this.y }), this.isInTransition = !1;
            var i = Math.round(this.x),
                e = Math.round(this.y),
                s = i - this.absStartX,
                o = e - this.absStartY;
            if (this.directionX = 0 < s ? C : s < 0 ? L : 0, this.directionY = 0 < o ? O : o < 0 ? H : 0, !this.options.pullDownRefresh || !this._checkPullDown())
                if (this._checkClick(t)) this.trigger("scrollCancel");
                else if (!this.resetPosition(this.options.bounceTime, D.bounce)) {
                this.scrollTo(i, e), this.endTime = x();
                var r = this.endTime - this.startTime,
                    n = Math.abs(i - this.startX),
                    h = Math.abs(e - this.startY);
                if (this._events.flick && r < this.options.flickLimitTime && n < this.options.flickLimitDistance && h < this.options.flickLimitDistance) this.trigger("flick");
                else {
                    var a = 0;
                    if (this.options.momentum && r < this.options.momentumLimitTime && (h > this.options.momentumLimitDistance || n > this.options.momentumLimitDistance)) {
                        var l = !1,
                            c = !1,
                            p = !1,
                            d = !1,
                            u = this.options.bounce;
                        !1 !== u && (l = void 0 === u.top || u.top, c = void 0 === u.bottom || u.bottom, p = void 0 === u.left || u.left, d = void 0 === u.right || u.right);
                        var g = this.directionX === C && p || this.directionX === L && d ? this.wrapperWidth : 0,
                            m = this.directionY === O && l || this.directionY === H && c ? this.wrapperHeight : 0,
                            f = this.hasHorizontalScroll ? E(this.x, this.startX, r, this.maxScrollX, g, this.options) : { destination: i, duration: 0 },
                            v = this.hasVerticalScroll ? E(this.y, this.startY, r, this.maxScrollY, m, this.options) : { destination: e, duration: 0 };
                        i = f.destination, e = v.destination, a = Math.max(f.duration, v.duration), this.isInTransition = !0
                    } else this.options.wheel && (e = Math.round(e / this.itemHeight) * this.itemHeight, a = this.options.wheel.adjustTime || 400);
                    var y = D.swipe;
                    if (this.options.snap) {
                        var w = this._nearestSnap(i, e);
                        this.currentPage = w, a = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(i - w.x), 1e3), Math.min(Math.abs(e - w.y), 1e3)), 300), i = w.x, e = w.y, this.directionX = 0, this.directionY = 0, y = this.options.snap.easing || D.bounce
                    }
                    if (i !== this.x || e !== this.y) return (0 < i || i < this.maxScrollX || 0 < e || e < this.maxScrollY) && (y = D.swipeBounce), void this.scrollTo(i, e, a, y);
                    this.options.wheel && (this.selectedIndex = Math.round(Math.abs(this.y / this.itemHeight))), this.trigger("scrollEnd", { x: this.x, y: this.y })
                }
            }
        }
    }, U.prototype._checkClick = function(t) {
        var i, e, s, o = this.stopFromTransition && !this.pulling;
        if (this.stopFromTransition = !1, !this.moved) {
            if (this.options.wheel) {
                if (this.target && this.target.className === this.options.wheel.wheelWrapperClass) {
                    var r = Math.abs(Math.round(this.y / this.itemHeight)),
                        n = Math.round((this.pointY + m(this.wrapper).top - this.wrapperHeight / 2) / this.itemHeight);
                    this.target = this.items[r + n]
                }
                return this.scrollToElement(this.target, this.options.wheel.adjustTime || 400, !0, !0, D.swipe), !0
            }
            return !o && (this.options.tap && (i = t, e = this.options.tap, (s = document.createEvent("Event")).initEvent(e, !0, !0), s.pageX = i.pageX, s.pageY = i.pageY, i.target.dispatchEvent(s)), this.options.click && !X(t.target, this.options.preventDefaultException) && function(t) {
                var i = void 0;
                "mouseup" === t.type || "mousecancel" === t.type ? i = t : "touchend" !== t.type && "touchcancel" !== t.type || (i = t.changedTouches[0]);
                var e = {};
                i && (e.screenX = i.screenX || 0, e.screenY = i.screenY || 0, e.clientX = i.clientX || 0, e.clientY = i.clientY || 0);
                var s = void 0,
                    o = "click",
                    r = !0,
                    n = !0;
                if ("undefined" != typeof MouseEvent) try { s = new MouseEvent(o, a({ bubbles: r, cancelable: n }, e)) } catch (t) { h() } else h();

                function h() {
                    (s = document.createEvent("Event")).initEvent(o, r, n), a(s, e)
                }
                s.forwardedTouchEvent = !0, s._constructed = !0, t.target.dispatchEvent(s)
            }(t), !0)
        }
        return !1
    }, U.prototype._resize = function() {
        var t = this;
        this.enabled && (s && (this.wrapper.scrollTop = 0), clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() { t.refresh() }, this.options.resizePolling))
    }, U.prototype._startProbe = function() {
        z(this.probeTimer), this.probeTimer = W(function t() {
            var i = e.getComputedPosition();
            e.trigger("scroll", i), e.isInTransition ? e.probeTimer = W(t) : e.trigger("scrollEnd", i)
        });
        var e = this
    }, U.prototype._transitionProperty = function() {
        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "transform";
        this.scrollerStyle[b.transitionProperty] = t
    }, U.prototype._transitionTime = function() {
        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0;
        if (this.scrollerStyle[b.transitionDuration] = t + "ms", this.options.wheel)
            for (var i = 0; i < this.items.length; i++) this.items[i].style[b.transitionDuration] = t + "ms";
        if (this.indicators)
            for (var e = 0; e < this.indicators.length; e++) this.indicators[e].transitionTime(t)
    }, U.prototype._transitionTimingFunction = function(t) {
        if (this.scrollerStyle[b.transitionTimingFunction] = t, this.options.wheel)
            for (var i = 0; i < this.items.length; i++) this.items[i].style[b.transitionTimingFunction] = t;
        if (this.indicators)
            for (var e = 0; e < this.indicators.length; e++) this.indicators[e].transitionTimingFunction(t)
    }, U.prototype._transitionEnd = function(t) { t.target === this.scroller && this.isInTransition && (this._transitionTime(), (!this.pulling || this.movingDirectionY === H) && !this.resetPosition(this.options.bounceTime, D.bounce) && (this.isInTransition = !1, this.options.probeType !== A && this.trigger("scrollEnd", { x: this.x, y: this.y }))) }, U.prototype._translate = function(t, i) {
        if (function(t, i) { if (!t) throw new Error("[BScroll] " + i) }(!h(t) && !h(i), "Translate x or y is null or undefined."), this.options.useTransform ? this.scrollerStyle[b.transform] = "translate(" + t + "px," + i + "px) scale(" + this.scale + ")" + this.translateZ : (t = Math.round(t), i = Math.round(i), this.scrollerStyle.left = t + "px", this.scrollerStyle.top = i + "px"), this.options.wheel)
            for (var e = this.options.wheel.rotate, s = void 0 === e ? 25 : e, o = 0; o < this.items.length; o++) {
                var r = s * (i / this.itemHeight + o);
                this.items[o].style[b.transform] = "rotateX(" + r + "deg)"
            }
        if (this.x = t, this.y = i, this.indicators)
            for (var n = 0; n < this.indicators.length; n++) this.indicators[n].updatePosition()
    }, U.prototype._animate = function(r, n, h, a) {
        var l = this,
            c = this.x,
            p = this.y,
            d = x(),
            u = d + h;
        this.isAnimating = !0, z(this.animateTimer),
            function t() {
                var i = x();
                if (u <= i) return l.isAnimating = !1, l._translate(r, n), void(l.pulling || l.resetPosition(l.options.bounceTime) || l.trigger("scrollEnd", { x: l.x, y: l.y }));
                var e = a(i = (i - d) / h),
                    s = (r - c) * e + c,
                    o = (n - p) * e + p;
                l._translate(s, o), l.isAnimating && (l.animateTimer = W(t)), l.options.probeType === A && l.trigger("scroll", { x: l.x, y: l.y })
            }()
    }, U.prototype.scrollBy = function(t, i) {
        var e = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0,
            s = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : D.bounce;
        t = this.x + t, i = this.y + i, this.scrollTo(t, i, e, s)
    }, U.prototype.scrollTo = function(t, i) {
        var e = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0,
            s = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : D.bounce;
        this.isInTransition = this.options.useTransition && 0 < e && (t !== this.x || i !== this.y), !e || this.options.useTransition ? (this._transitionProperty(), this._transitionTimingFunction(s.style), this._transitionTime(e), this._translate(t, i), e && this.options.probeType === A && this._startProbe(), this.options.wheel && (0 < i ? this.selectedIndex = 0 : i < this.maxScrollY ? this.selectedIndex = this.items.length - 1 : this.selectedIndex = Math.round(Math.abs(i / this.itemHeight)))) : this._animate(t, i, e, s.fn)
    }, U.prototype.scrollToElement = function(t, i, e, s, o) {
        if (t && (t = t.nodeType ? t : this.scroller.querySelector(t), !this.options.wheel || t.className === this.options.wheel.wheelItemClass)) {
            var r = g(t);
            r.left -= this.wrapperOffset.left, r.top -= this.wrapperOffset.top, !0 === e && (e = Math.round(t.offsetWidth / 2 - this.wrapper.offsetWidth / 2)), !0 === s && (s = Math.round(t.offsetHeight / 2 - this.wrapper.offsetHeight / 2)), r.left -= e || 0, r.top -= s || 0, r.left = 0 < r.left ? 0 : r.left < this.maxScrollX ? this.maxScrollX : r.left, r.top = 0 < r.top ? 0 : r.top < this.maxScrollY ? this.maxScrollY : r.top, this.options.wheel && (r.top = Math.round(r.top / this.itemHeight) * this.itemHeight), this.scrollTo(r.left, r.top, i, o)
        }
    }, U.prototype.resetPosition = function() {
        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
            i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : D.bounce,
            e = this.x,
            s = Math.round(e);
        !this.hasHorizontalScroll || 0 < s ? e = 0 : s < this.maxScrollX && (e = this.maxScrollX);
        var o = this.y,
            r = Math.round(o);
        return !this.hasVerticalScroll || 0 < r ? o = 0 : r < this.maxScrollY && (o = this.maxScrollY), (e !== this.x || o !== this.y) && (this.scrollTo(e, o, t, i), !0)
    }, U.prototype.getComputedPosition = function() {
        var t = window.getComputedStyle(this.scroller, null),
            i = void 0,
            e = void 0;
        return this.options.useTransform ? (i = +((t = t[b.transform].split(")")[0].split(", "))[12] || t[4]), e = +(t[13] || t[5])) : (i = +t.left.replace(/[^-\d.]/g, ""), e = +t.top.replace(/[^-\d.]/g, "")), { x: i, y: e }
    }, U.prototype.stop = function() {
        if (this.options.useTransition && this.isInTransition) {
            this.isInTransition = !1;
            var t = this.getComputedPosition();
            this._translate(t.x, t.y), this.options.wheel ? this.target = this.items[Math.round(-t.y / this.itemHeight)] : this.trigger("scrollEnd", { x: this.x, y: this.y }), this.stopFromTransition = !0
        } else !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this.trigger("scrollEnd", { x: this.x, y: this.y }), this.stopFromTransition = !0)
    }, U.prototype.destroy = function() { this.destroyed = !0, this.trigger("destroy"), this._removeDOMEvents(), this._events = {} }, (B = Q).prototype.on = function(t, i) {
        var e = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : this;
        this._events[t] || (this._events[t] = []), this._events[t].push([i, e])
    }, B.prototype.once = function(t, i) {
        var e = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : this;

        function s() { this.off(t, s), i.apply(e, arguments) }
        s.fn = i, this.on(t, s)
    }, B.prototype.off = function(t, i) {
        var e = this._events[t];
        if (e)
            for (var s = e.length; s--;)(e[s][0] === i || e[s][0] && e[s][0].fn === i) && (e[s][0] = void 0)
    }, B.prototype.trigger = function(t) {
        var i = this._events[t];
        if (i)
            for (var e = i.length, s = [].concat(c(i)), o = 0; o < e; o++) {
                var r = s[o],
                    n = l(r, 2),
                    h = n[0],
                    a = n[1];
                h && h.apply(a, [].slice.call(arguments, 1))
            }
    }, (N = Q).prototype._initSnap = function() {
        var g = this;
        this.currentPage = {};
        var t, i, e, s, m = this.options.snap;
        if (m.loop) {
            var o = this.scroller.children;
            1 < o.length ? (t = o[o.length - 1].cloneNode(!0), (i = this.scroller).firstChild ? (e = t, (s = i.firstChild).parentNode.insertBefore(e, s)) : i.appendChild(t), this.scroller.appendChild(o[1].cloneNode(!0))) : m.loop = !1
        }
        var f = m.el;
        "string" == typeof f && (f = this.scroller.querySelectorAll(f)), this.on("refresh", function() {
            if (g.pages = [], g.wrapperWidth && g.wrapperHeight && g.scrollerWidth && g.scrollerHeight) {
                var t = m.stepX || g.wrapperWidth,
                    i = m.stepY || g.wrapperHeight,
                    e = 0,
                    s = void 0,
                    o = void 0,
                    r = void 0,
                    n = 0,
                    h = void 0,
                    a = 0,
                    l = void 0,
                    c = void 0;
                if (f)
                    for (h = f.length, l = -1; n < h; n++) c = M(f[n]), (0 === n || c.left <= M(f[n - 1]).left) && (a = 0, l++), g.pages[a] || (g.pages[a] = []), e = Math.max(-c.left, g.maxScrollX), s = Math.max(-c.top, g.maxScrollY), o = e - Math.round(c.width / 2), r = s - Math.round(c.height / 2), g.pages[a][l] = { x: e, y: s, width: c.width, height: c.height, cx: o, cy: r }, e > g.maxScrollX && a++;
                else
                    for (o = Math.round(t / 2), r = Math.round(i / 2); e > -g.scrollerWidth;) {
                        for (g.pages[n] = [], s = h = 0; s > -g.scrollerHeight;) g.pages[n][h] = { x: Math.max(e, g.maxScrollX), y: Math.max(s, g.maxScrollY), width: t, height: i, cx: e - o, cy: s - r }, s -= i, h++;
                        e -= t, n++
                    }
                g._checkSnapLoop();
                var p = m._loopX ? 1 : 0,
                    d = m._loopY ? 1 : 0;
                g._goToPage(g.currentPage.pageX || p, g.currentPage.pageY || d, 0);
                var u = m.threshold;
                u % 1 == 0 ? (g.snapThresholdX = u, g.snapThresholdY = u) : (g.snapThresholdX = Math.round(g.pages[g.currentPage.pageX][g.currentPage.pageY].width * u), g.snapThresholdY = Math.round(g.pages[g.currentPage.pageX][g.currentPage.pageY].height * u))
            }
        }), this.on("scrollEnd", function() { m.loop && (m._loopX ? (0 === g.currentPage.pageX && g._goToPage(g.pages.length - 2, g.currentPage.pageY, 0), g.currentPage.pageX === g.pages.length - 1 && g._goToPage(1, g.currentPage.pageY, 0)) : (0 === g.currentPage.pageY && g._goToPage(g.currentPage.pageX, g.pages[0].length - 2, 0), g.currentPage.pageY === g.pages[0].length - 1 && g._goToPage(g.currentPage.pageX, 1, 0))) }), !1 !== m.listenFlick && this.on("flick", function() {
            var t = m.speed || Math.max(Math.max(Math.min(Math.abs(g.x - g.startX), 1e3), Math.min(Math.abs(g.y - g.startY), 1e3)), 300);
            g._goToPage(g.currentPage.pageX + g.directionX, g.currentPage.pageY + g.directionY, t)
        }), this.on("destroy", function() {
            if (m.loop) {
                var t = g.scroller.children;
                2 < t.length && (Y(g.scroller, t[t.length - 1]), Y(g.scroller, t[0]))
            }
        })
    }, N.prototype._checkSnapLoop = function() {
        var t = this.options.snap;
        t.loop && this.pages && this.pages.length && (1 < this.pages.length && (t._loopX = !0), this.pages[0] && 1 < this.pages[0].length && (t._loopY = !0), t._loopX && t._loopY && F("Loop does not support two direction at the same time."))
    }, N.prototype._nearestSnap = function(t, i) {
        if (!this.pages.length) return { x: 0, y: 0, pageX: 0, pageY: 0 };
        var e = 0;
        if (Math.abs(t - this.absStartX) <= this.snapThresholdX && Math.abs(i - this.absStartY) <= this.snapThresholdY) return this.currentPage;
        0 < t ? t = 0 : t < this.maxScrollX && (t = this.maxScrollX), 0 < i ? i = 0 : i < this.maxScrollY && (i = this.maxScrollY);
        for (var s = this.pages.length; e < s; e++)
            if (t >= this.pages[e][0].cx) { t = this.pages[e][0].x; break }
        s = this.pages[e].length;
        for (var o = 0; o < s; o++)
            if (i >= this.pages[0][o].cy) { i = this.pages[0][o].y; break }
        return e === this.currentPage.pageX && ((e += this.directionX) < 0 ? e = 0 : e >= this.pages.length && (e = this.pages.length - 1), t = this.pages[e][0].x), o === this.currentPage.pageY && ((o += this.directionY) < 0 ? o = 0 : o >= this.pages[0].length && (o = this.pages[0].length - 1), i = this.pages[0][o].y), { x: t, y: i, pageX: e, pageY: o }
    }, N.prototype._goToPage = function(t) {
        var i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0,
            e = arguments[2],
            s = arguments[3],
            o = this.options.snap;
        if (o && this.pages && this.pages.length && (s = s || o.easing || D.bounce, t >= this.pages.length ? t = this.pages.length - 1 : t < 0 && (t = 0), this.pages[t])) {
            i >= this.pages[t].length ? i = this.pages[t].length - 1 : i < 0 && (i = 0);
            var r = this.pages[t][i].x,
                n = this.pages[t][i].y;
            e = void 0 === e ? o.speed || Math.max(Math.max(Math.min(Math.abs(r - this.x), 1e3), Math.min(Math.abs(n - this.y), 1e3)), 300) : e, this.currentPage = { x: r, y: n, pageX: t, pageY: i }, this.scrollTo(r, n, e, s)
        }
    }, N.prototype.goToPage = function(t, i, e, s) {
        var o = this.options.snap;
        if (o && this.pages && this.pages.length) {
            if (o.loop) {
                var r = void 0;
                o._loopX ? ((r = this.pages.length - 2) <= t ? t = r - 1 : t < 0 && (t = 0), t += 1) : ((r = this.pages[0].length - 2) <= i ? i = r - 1 : i < 0 && (i = 0), i += 1)
            }
            this._goToPage(t, i, e, s)
        }
    }, N.prototype.next = function(t, i) {
        if (this.options.snap) {
            var e = this.currentPage.pageX,
                s = this.currentPage.pageY;
            ++e >= this.pages.length && this.hasVerticalScroll && (e = 0, s++), this._goToPage(e, s, t, i)
        }
    }, N.prototype.prev = function(t, i) {
        if (this.options.snap) {
            var e = this.currentPage.pageX,
                s = this.currentPage.pageY;
            --e < 0 && this.hasVerticalScroll && (e = 0, s--), this._goToPage(e, s, t, i)
        }
    }, N.prototype.getCurrentPage = function() { var t = this.options.snap; return t ? t.loop ? t._loopX ? a({}, this.currentPage, { pageX: this.currentPage.pageX - 1 }) : a({}, this.currentPage, { pageY: this.currentPage.pageY - 1 }) : this.currentPage : null }, (V = Q).prototype.wheelTo = function() {
        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0;
        this.options.wheel && (this.y = -t * this.itemHeight, this.scrollTo(0, this.y))
    }, V.prototype.getSelectedIndex = function() { return this.options.wheel && this.selectedIndex }, V.prototype._initWheel = function() {
        var t = this.options.wheel;
        t.wheelWrapperClass || (t.wheelWrapperClass = "wheel-scroll"), t.wheelItemClass || (t.wheelItemClass = "wheel-item"), void 0 === t.selectedIndex && (t.selectedIndex = 0, F("wheel option selectedIndex is required!"))
    }, (q = Q).prototype._initScrollbar = function() {
        var i = this,
            t = this.options.scrollbar,
            e = t.fade,
            s = void 0 === e || e,
            o = t.interactive,
            r = void 0 !== o && o;
        this.indicators = [];
        var n = void 0;
        this.options.scrollX && (n = { el: J("horizontal"), direction: "horizontal", fade: s, interactive: r }, this._insertScrollBar(n.el), this.indicators.push(new K(this, n))), this.options.scrollY && (n = { el: J("vertical"), direction: "vertical", fade: s, interactive: r }, this._insertScrollBar(n.el), this.indicators.push(new K(this, n))), this.on("refresh", function() { for (var t = 0; t < i.indicators.length; t++) i.indicators[t].refresh() }), s && (this.on("scrollEnd", function() { for (var t = 0; t < i.indicators.length; t++) i.indicators[t].fade() }), this.on("scrollCancel", function() { for (var t = 0; t < i.indicators.length; t++) i.indicators[t].fade() }), this.on("scrollStart", function() { for (var t = 0; t < i.indicators.length; t++) i.indicators[t].fade(!0) }), this.on("beforeScrollStart", function() { for (var t = 0; t < i.indicators.length; t++) i.indicators[t].fade(!0, !0) })), this.on("destroy", function() { i._removeScrollBars() })
    }, q.prototype._insertScrollBar = function(t) { this.wrapper.appendChild(t) }, q.prototype._removeScrollBars = function() { for (var t = 0; t < this.indicators.length; t++) this.indicators[t].destroy() }, (Z = Q).prototype._initPullDown = function() { this.options.probeType = A }, Z.prototype._checkPullDown = function() {
        var t = this.options.pullDownRefresh,
            i = t.threshold,
            e = void 0 === i ? 90 : i,
            s = t.stop,
            o = void 0 === s ? 40 : s;
        return !(this.directionY !== O || this.y < e) && (this.pulling || (this.pulling = !0, this.trigger("pullingDown")), this.scrollTo(this.x, o, this.options.bounceTime, D.bounce), this.pulling)
    }, Z.prototype.finishPullDown = function() { this.pulling = !1, this.resetPosition(this.options.bounceTime, D.bounce) }, Z.prototype.openPullDown = function() {
        var t = !(0 < arguments.length && void 0 !== arguments[0]) || arguments[0];
        this.options.pullDownRefresh = t, this._initPullDown()
    }, Z.prototype.closePullDown = function() { this.options.pullDownRefresh = !1 }, (j = Q).prototype._initPullUp = function() { this.options.probeType = A, this.pullupWatching = !1, this._watchPullUp() }, j.prototype._watchPullUp = function() { this.pullupWatching || (this.pullupWatching = !0, this.on("scroll", this._checkToEnd)) }, j.prototype._checkToEnd = function(t) {
        var i = this,
            e = this.options.pullUpLoad.threshold,
            s = void 0 === e ? 0 : e;
        this.movingDirectionY === H && t.y <= this.maxScrollY + s && (this.once("scrollEnd", function() { i.pullupWatching = !1 }), this.trigger("pullingUp"), this.off("scroll", this._checkToEnd))
    }, j.prototype.finishPullUp = function() {
        var t = this;
        this.pullupWatching ? this.once("scrollEnd", function() { t._watchPullUp() }) : this._watchPullUp()
    }, j.prototype.openPullUp = function() {
        var t = !(0 < arguments.length && void 0 !== arguments[0]) || arguments[0];
        this.options.pullUpLoad = t, this._initPullUp()
    }, j.prototype.closePullUp = function() { this.options.pullUpLoad = !1, this.pullupWatching && (this.pullupWatching = !1, this.off("scroll", this._checkToEnd)) }, (G = Q).prototype._initMouseWheel = function() {
        var t = this;
        this._handleMouseWheelEvent(p), this.on("destroy", function() { clearTimeout(t.mouseWheelTimer), t._handleMouseWheelEvent(u) }), this.firstWheelOpreation = !0
    }, G.prototype._handleMouseWheelEvent = function(t) { t(this.wrapper, "wheel", this), t(this.wrapper, "mousewheel", this), t(this.wrapper, "DOMMouseScroll", this) }, G.prototype._onMouseWheel = function(t) {
        var i = this;
        if (this.enabled) {
            t.preventDefault(), this.firstWheelOpreation && this.trigger("scrollStart"), this.firstWheelOpreation = !1, clearTimeout(this.mouseWheelTimer), this.mouseWheelTimer = setTimeout(function() { i.options.snap || i.trigger("scrollEnd", { x: i.x, y: i.y }), i.firstWheelOpreation = !0 }, 400);
            var e = this.options.mouseWheel,
                s = e.speed,
                o = void 0 === s ? 20 : s,
                r = e.invert,
                n = void 0 !== r && r,
                h = e.easeTime,
                a = void 0 === h ? 300 : h,
                l = void 0,
                c = void 0;
            switch (!0) {
                case "deltaX" in t:
                    1 === t.deltaMode ? (l = -t.deltaX * o, c = -t.deltaY * o) : (l = -t.deltaX, c = -t.deltaY);
                    break;
                case "wheelDeltaX" in t:
                    l = t.wheelDeltaX / 120 * o, c = t.wheelDeltaY / 120 * o;
                    break;
                case "wheelDelta" in t:
                    l = c = t.wheelDelta / 120 * o;
                    break;
                case "detail" in t:
                    l = c = -t.detail / 3 * o;
                    break;
                default:
                    return
            }
            var p = n ? -1 : 1;
            l *= p, c *= p, this.hasVerticalScroll || (l = c, c = 0);
            var d = void 0,
                u = void 0;
            if (this.options.snap) return d = this.currentPage.pageX, u = this.currentPage.pageY, 0 < l ? d-- : l < 0 && d++, 0 < c ? u-- : c < 0 && u++, void this._goToPage(d, u);
            d = this.x + Math.round(this.hasHorizontalScroll ? l : 0), u = this.y + Math.round(this.hasVerticalScroll ? c : 0), this.movingDirectionX = this.directionX = 0 < l ? -1 : l < 0 ? 1 : 0, this.movingDirectionY = this.directionY = 0 < c ? -1 : c < 0 ? 1 : 0, 0 < d ? d = 0 : d < this.maxScrollX && (d = this.maxScrollX), 0 < u ? u = 0 : u < this.maxScrollY && (u = this.maxScrollY), this.scrollTo(d, u, a, D.swipe), this.trigger("scroll", { x: this.x, y: this.y })
        }
    }, ($ = Q).prototype._initZoom = function() {
        var t = this.options.zoom,
            i = t.start,
            e = void 0 === i ? 1 : i,
            s = t.min,
            o = void 0 === s ? 1 : s,
            r = t.max,
            n = void 0 === r ? 4 : r;
        this.scale = Math.min(Math.max(e, o), n), this.scrollerStyle[b.transformOrigin] = "0 0"
    }, $.prototype._zoomStart = function(t) {
        var i = t.touches[0],
            e = t.touches[1],
            s = Math.abs(i.pageX - e.pageX),
            o = Math.abs(i.pageY - e.pageY);
        this.startDistance = d(s, o), this.startScale = this.scale;
        var r = m(this.wrapper),
            n = r.left,
            h = r.top;
        this.originX = Math.abs(i.pageX + e.pageX) / 2 + n - this.x, this.originY = Math.abs(i.pageY + e.pageY) / 2 + h - this.y, this.trigger("zoomStart")
    }, $.prototype._zoom = function(t) {
        if (this.enabled && !this.destroyed && S[t.type] === this.initiated) {
            this.options.preventDefault && t.preventDefault();
            var i = t.touches[0],
                e = t.touches[1],
                s = d(Math.abs(i.pageX - e.pageX), Math.abs(i.pageY - e.pageY)) / this.startDistance * this.startScale;
            this.scaled = !0;
            var o = this.options.zoom,
                r = o.min,
                n = void 0 === r ? 1 : r,
                h = o.max,
                a = void 0 === h ? 4 : h;
            s < n ? s = .5 * n * Math.pow(2, s / n) : a < s && (s = 2 * a * Math.pow(.5, a / s));
            var l = s / this.startScale,
                c = this.originX - this.originX * l + this.startX,
                p = this.originY - this.originY * l + this.startY;
            this.scale = s, this.scrollTo(c, p, 0)
        }
    }, $.prototype._zoomEnd = function(t) {
        if (this.enabled && !this.destroyed && S[t.type] === this.initiated) {
            this.options.preventDefault && t.preventDefault(), this.isInTransition = !1, this.initiated = 0;
            var i = this.options.zoom,
                e = i.min,
                s = void 0 === e ? 1 : e,
                o = i.max,
                r = void 0 === o ? 4 : o;
            this.scale > r ? this.scale = r : this.scale < s && (this.scale = s), this.refresh();
            var n = this.scale / this.startScale,
                h = this.originX - this.originX * n + this.startX,
                a = this.originY - this.originY * n + this.startY;
            0 < h ? h = 0 : h < this.maxScrollX && (h = this.maxScrollX), 0 < a ? a = 0 : a < this.maxScrollY && (a = this.maxScrollY), this.x === h && this.y === a || this.scrollTo(h, a, this.options.bounceTime), this.scaled = !1, this.trigger("zoomEnd")
        }
    }, Q.Version = "1.11.1", Q
});