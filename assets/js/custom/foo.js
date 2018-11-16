if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");

function initScrollReveal() {
    jQuery(".scroll-reveal").length && (window.sr = ScrollReveal({
        origin: "bottom",
        distance: "75%",
        duration: 500,
        scale: 1,
        viewFactor: .9
    }), jQuery(".scroll-reveal").each(function() {
        sr.reveal(this, {
            delay: 450 * Math.random()
        })
    }))
}


function initRandomBlocks() {
    var i = 0;
    jQuery(".customer-logos-list li").each(function() {
        var t = jQuery(this);
        if (t.find("img").attr("height") > i) {
            i = t.find("img").attr("height");
            var e = parseInt(i) + 2 * parseInt(jQuery(".customer-logos-list li").css("padding-top"));
            jQuery(".customer-logos-list li").css("height", e)
        }
    });
}! 

function(g) {
    "use strict";
    var m = function(t, e) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", t, e)
    };
    m.VERSION = "3.3.6", m.TRANSITION_DURATION = 150, m.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, m.prototype.init = function(t, e, i) {
        if (this.enabled = !0, this.type = t, this.$element = g(e), this.options = this.getOptions(i), this.$viewport = this.options.viewport && g(g.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var s = this.options.trigger.split(" "), n = s.length; n--;) {
            var o = s[n];
            if ("click" == o) this.$element.on("click." + this.type, this.options.selector, g.proxy(this.toggle, this));
            else if ("manual" != o) {
                var r = "hover" == o ? "mouseenter" : "focusin",
                    a = "hover" == o ? "mouseleave" : "focusout";
                this.$element.on(r + "." + this.type, this.options.selector, g.proxy(this.enter, this)), this.$element.on(a + "." + this.type, this.options.selector, g.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = g.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, m.prototype.getDefaults = function() {
        return m.DEFAULTS
    }, m.prototype.getOptions = function(t) {
        return (t = g.extend({}, this.getDefaults(), this.$element.data(), t)).delay && "number" == typeof t.delay && (t.delay = {
            show: t.delay,
            hide: t.delay
        }), t
    }, m.prototype.getDelegateOptions = function() {
        var i = {},
            s = this.getDefaults();
        return this._options && g.each(this._options, function(t, e) {
            s[t] != e && (i[t] = e)
        }), i
    }, m.prototype.enter = function(t) {
        var e = t instanceof this.constructor ? t : g(t.currentTarget).data("bs." + this.type);
        return e || (e = new this.constructor(t.currentTarget, this.getDelegateOptions()), g(t.currentTarget).data("bs." + this.type, e)), t instanceof g.Event && (e.inState["focusin" == t.type ? "focus" : "hover"] = !0), e.tip().hasClass("in") || "in" == e.hoverState ? void(e.hoverState = "in") : (clearTimeout(e.timeout), e.hoverState = "in", e.options.delay && e.options.delay.show ? void(e.timeout = setTimeout(function() {
            "in" == e.hoverState && e.show()
        }, e.options.delay.show)) : e.show())
    }, m.prototype.isInStateTrue = function() {
        for (var t in this.inState)
            if (this.inState[t]) return !0;
        return !1
    }, m.prototype.leave = function(t) {
        var e = t instanceof this.constructor ? t : g(t.currentTarget).data("bs." + this.type);
        return e || (e = new this.constructor(t.currentTarget, this.getDelegateOptions()), g(t.currentTarget).data("bs." + this.type, e)), t instanceof g.Event && (e.inState["focusout" == t.type ? "focus" : "hover"] = !1), e.isInStateTrue() ? void 0 : (clearTimeout(e.timeout), e.hoverState = "out", e.options.delay && e.options.delay.hide ? void(e.timeout = setTimeout(function() {
            "out" == e.hoverState && e.hide()
        }, e.options.delay.hide)) : e.hide())
    }, m.prototype.show = function() {
        var t = g.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(t);
            var e = g.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (t.isDefaultPrevented() || !e) return;
            var i = this,
                s = this.tip(),
                n = this.getUID(this.type);
            this.setContent(), s.attr("id", n), this.$element.attr("aria-describedby", n), this.options.animation && s.addClass("fade");
            var o = "function" == typeof this.options.placement ? this.options.placement.call(this, s[0], this.$element[0]) : this.options.placement,
                r = /\s?auto?\s?/i,
                a = r.test(o);
            a && (o = o.replace(r, "") || "top"), s.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(o).data("bs." + this.type, this), this.options.container ? s.appendTo(this.options.container) : s.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var l = this.getPosition(),
                h = s[0].offsetWidth,
                c = s[0].offsetHeight;
            if (a) {
                var d = o,
                    u = this.getPosition(this.$viewport);
                o = "bottom" == o && l.bottom + c > u.bottom ? "top" : "top" == o && l.top - c < u.top ? "bottom" : "right" == o && l.right + h > u.width ? "left" : "left" == o && l.left - h < u.left ? "right" : o, s.removeClass(d).addClass(o)
            }
            var p = this.getCalculatedOffset(o, l, h, c);
            this.applyPlacement(p, o);
            var f = function() {
                var t = i.hoverState;
                i.$element.trigger("shown.bs." + i.type), i.hoverState = null, "out" == t && i.leave(i)
            };
            g.support.transition && this.$tip.hasClass("fade") ? s.one("bsTransitionEnd", f).emulateTransitionEnd(m.TRANSITION_DURATION) : f()
        }
    }, m.prototype.applyPlacement = function(t, e) {
        var i = this.tip(),
            s = i[0].offsetWidth,
            n = i[0].offsetHeight,
            o = parseInt(i.css("margin-top"), 10),
            r = parseInt(i.css("margin-left"), 10);
        isNaN(o) && (o = 0), isNaN(r) && (r = 0), t.top += o, t.left += r, g.offset.setOffset(i[0], g.extend({
            using: function(t) {
                i.css({
                    top: Math.round(t.top),
                    left: Math.round(t.left)
                })
            }
        }, t), 0), i.addClass("in");
        var a = i[0].offsetWidth,
            l = i[0].offsetHeight;
        "top" == e && l != n && (t.top = t.top + n - l);
        var h = this.getViewportAdjustedDelta(e, t, a, l);
        h.left ? t.left += h.left : t.top += h.top;
        var c = /top|bottom/.test(e),
            d = c ? 2 * h.left - s + a : 2 * h.top - n + l,
            u = c ? "offsetWidth" : "offsetHeight";
        i.offset(t), this.replaceArrow(d, i[0][u], c)
    }, m.prototype.replaceArrow = function(t, e, i) {
        this.arrow().css(i ? "left" : "top", 50 * (1 - t / e) + "%").css(i ? "top" : "left", "")
    }, m.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, m.prototype.hide = function(t) {
        function e() {
            "in" != i.hoverState && s.detach(), i.$element.removeAttr("aria-describedby").trigger("hidden.bs." + i.type), t && t()
        }
        var i = this,
            s = g(this.$tip),
            n = g.Event("hide.bs." + this.type);
        return this.$element.trigger(n), n.isDefaultPrevented() ? void 0 : (s.removeClass("in"), g.support.transition && s.hasClass("fade") ? s.one("bsTransitionEnd", e).emulateTransitionEnd(m.TRANSITION_DURATION) : e(), this.hoverState = null, this)
    }, m.prototype.fixTitle = function() {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, m.prototype.hasContent = function() {
        return this.getTitle()
    }, m.prototype.getPosition = function(t) {
        var e = (t = t || this.$element)[0],
            i = "BODY" == e.tagName,
            s = e.getBoundingClientRect();
        null == s.width && (s = g.extend({}, s, {
            width: s.right - s.left,
            height: s.bottom - s.top
        }));
        var n = i ? {
                top: 0,
                left: 0
            } : t.offset(),
            o = {
                scroll: i ? document.documentElement.scrollTop || document.body.scrollTop : t.scrollTop()
            },
            r = i ? {
                width: g(window).width(),
                height: g(window).height()
            } : null;
        return g.extend({}, s, o, r, n)
    }, m.prototype.getCalculatedOffset = function(t, e, i, s) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - i / 2
        } : "top" == t ? {
            top: e.top - s,
            left: e.left + e.width / 2 - i / 2
        } : "left" == t ? {
            top: e.top + e.height / 2 - s / 2,
            left: e.left - i
        } : {
            top: e.top + e.height / 2 - s / 2,
            left: e.left + e.width
        }
    }, m.prototype.getViewportAdjustedDelta = function(t, e, i, s) {
        var n = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return n;
        var o = this.options.viewport && this.options.viewport.padding || 0,
            r = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var a = e.top - o - r.scroll,
                l = e.top + o - r.scroll + s;
            a < r.top ? n.top = r.top - a : l > r.top + r.height && (n.top = r.top + r.height - l)
        } else {
            var h = e.left - o,
                c = e.left + o + i;
            h < r.left ? n.left = r.left - h : c > r.right && (n.left = r.left + r.width - c)
        }
        return n
    }, m.prototype.getTitle = function() {
        var t = this.$element,
            e = this.options;
        return t.attr("data-original-title") || ("function" == typeof e.title ? e.title.call(t[0]) : e.title)
    }, m.prototype.getUID = function(t) {
        for (; t += ~~(1e6 * Math.random()), document.getElementById(t););
        return t
    }, m.prototype.tip = function() {
        if (!this.$tip && (this.$tip = g(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }, m.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, m.prototype.enable = function() {
        this.enabled = !0
    }, m.prototype.disable = function() {
        this.enabled = !1
    }, m.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, m.prototype.toggle = function(t) {
        var e = this;
        t && ((e = g(t.currentTarget).data("bs." + this.type)) || (e = new this.constructor(t.currentTarget, this.getDelegateOptions()), g(t.currentTarget).data("bs." + this.type, e))), t ? (e.inState.click = !e.inState.click, e.isInStateTrue() ? e.enter(e) : e.leave(e)) : e.tip().hasClass("in") ? e.leave(e) : e.enter(e)
    }, m.prototype.destroy = function() {
        var t = this;
        clearTimeout(this.timeout), this.hide(function() {
            t.$element.off("." + t.type).removeData("bs." + t.type), t.$tip && t.$tip.detach(), t.$tip = null, t.$arrow = null, t.$viewport = null
        })
    };
    var t = g.fn.tooltip;
    g.fn.tooltip = function(s) {
        return this.each(function() {
            var t = g(this),
                e = t.data("bs.tooltip"),
                i = "object" == typeof s && s;
            (e || !/destroy|hide/.test(s)) && (e || t.data("bs.tooltip", e = new m(this, i)), "string" == typeof s && e[s]())
        })
    }, g.fn.tooltip.Constructor = m, g.fn.tooltip.noConflict = function() {
        return g.fn.tooltip = t, this
    }
}(jQuery),


function(a) {
    "use strict";

    function e(i) {
        return this.each(function() {
            var t = a(this),
                e = t.data("bs.tab");
            e || t.data("bs.tab", e = new r(this)), "string" == typeof i && e[i]()
        })
    }
    var r = function(t) {
        this.element = a(t)
    };
    r.VERSION = "3.3.6", r.TRANSITION_DURATION = 150, r.prototype.show = function() {
        var t = this.element,
            e = t.closest("ul:not(.dropdown-menu)"),
            i = t.data("target");
        if (i || (i = (i = t.attr("href")) && i.replace(/.*(?=#[^\s]*$)/, "")), !t.parent("li").hasClass("active")) {
            var s = e.find(".active:last a"),
                n = a.Event("hide.bs.tab", {
                    relatedTarget: t[0]
                }),
                o = a.Event("show.bs.tab", {
                    relatedTarget: s[0]
                });
            if (s.trigger(n), t.trigger(o), !o.isDefaultPrevented() && !n.isDefaultPrevented()) {
                var r = a(i);
                this.activate(t.closest("li"), e), this.activate(r, r.parent(), function() {
                    s.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: t[0]
                    }), t.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: s[0]
                    })
                })
            }
        }
    }, r.prototype.activate = function(t, e, i) {
        function s() {
            n.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), t.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), o ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"), t.parent(".dropdown-menu").length && t.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), i && i()
        }
        var n = e.find("> .active"),
            o = i && a.support.transition && (n.length && n.hasClass("fade") || !!e.find("> .fade").length);
        n.length && o ? n.one("bsTransitionEnd", s).emulateTransitionEnd(r.TRANSITION_DURATION) : s(), n.removeClass("in")
    };
    var t = a.fn.tab;
    a.fn.tab = e, a.fn.tab.Constructor = r, a.fn.tab.noConflict = function() {
        return a.fn.tab = t, this
    };
    var i = function(t) {
        t.preventDefault(), e.call(a(this), "show")
    };
    a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', i).on("click.bs.tab.data-api", '[data-toggle="pill"]', i)
}(jQuery),
function(l) {
    "use strict";

    function i(s) {
        return this.each(function() {
            var t = l(this),
                e = t.data("bs.affix"),
                i = "object" == typeof s && s;
            e || t.data("bs.affix", e = new h(this, i)), "string" == typeof s && e[s]()
        })
    }
    var h = function(t, e) {
        this.options = l.extend({}, h.DEFAULTS, e), this.$target = l(this.options.target).on("scroll.bs.affix.data-api", l.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", l.proxy(this.checkPositionWithEventLoop, this)), this.$element = l(t), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    h.VERSION = "3.3.6", h.RESET = "affix affix-top affix-bottom", h.DEFAULTS = {
        offset: 0,
        target: window
    }, h.prototype.getState = function(t, e, i, s) {
        var n = this.$target.scrollTop(),
            o = this.$element.offset(),
            r = this.$target.height();
        if (null != i && "top" == this.affixed) return n < i && "top";
        if ("bottom" == this.affixed) return null != i ? !(n + this.unpin <= o.top) && "bottom" : !(n + r <= t - s) && "bottom";
        var a = null == this.affixed,
            l = a ? n : o.top;
        return null != i && n <= i ? "top" : null != s && t - s <= l + (a ? r : e) && "bottom"
    }, h.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(h.RESET).addClass("affix");
        var t = this.$target.scrollTop(),
            e = this.$element.offset();
        return this.pinnedOffset = e.top - t
    }, h.prototype.checkPositionWithEventLoop = function() {
        setTimeout(l.proxy(this.checkPosition, this), 1)
    }, h.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var t = this.$element.height(),
                e = this.options.offset,
                i = e.top,
                s = e.bottom,
                n = Math.max(l(document).height(), l(document.body).height());
            "object" != typeof e && (s = i = e), "function" == typeof i && (i = e.top(this.$element)), "function" == typeof s && (s = e.bottom(this.$element));
            var o = this.getState(n, t, i, s);
            if (this.affixed != o) {
                null != this.unpin && this.$element.css("top", "");
                var r = "affix" + (o ? "-" + o : ""),
                    a = l.Event(r + ".bs.affix");
                if (this.$element.trigger(a), a.isDefaultPrevented()) return;
                this.affixed = o, this.unpin = "bottom" == o ? this.getPinnedOffset() : null, this.$element.removeClass(h.RESET).addClass(r).trigger(r.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == o && this.$element.offset({
                top: n - t - s
            })
        }
    };
    var t = l.fn.affix;
    l.fn.affix = i, l.fn.affix.Constructor = h, l.fn.affix.noConflict = function() {
        return l.fn.affix = t, this
    }, l(window).on("load", function() {
        l('[data-spy="affix"]').each(function() {
            var t = l(this),
                e = t.data();
            e.offset = e.offset || {}, null != e.offsetBottom && (e.offset.bottom = e.offsetBottom), null != e.offsetTop && (e.offset.top = e.offsetTop), i.call(t, e)
        })
    })
}(jQuery),
function(r) {
    "use strict";

    function n(t) {
        var e, i = t.attr("data-target") || (e = t.attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "");
        return r(i)
    }

    function a(s) {
        return this.each(function() {
            var t = r(this),
                e = t.data("bs.collapse"),
                i = r.extend({}, l.DEFAULTS, t.data(), "object" == typeof s && s);
            !e && i.toggle && /show|hide/.test(s) && (i.toggle = !1), e || t.data("bs.collapse", e = new l(this, i)), "string" == typeof s && e[s]()
        })
    }
    var l = function(t, e) {
        this.$element = r(t), this.options = r.extend({}, l.DEFAULTS, e), this.$trigger = r('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    l.VERSION = "3.3.6", l.TRANSITION_DURATION = 350, l.DEFAULTS = {
        toggle: !0
    }, l.prototype.dimension = function() {
        return this.$element.hasClass("width") ? "width" : "height"
    }, l.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var t, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(e && e.length && ((t = e.data("bs.collapse")) && t.transitioning))) {
                var i = r.Event("show.bs.collapse");
                if (this.$element.trigger(i), !i.isDefaultPrevented()) {
                    e && e.length && (a.call(e, "hide"), t || e.data("bs.collapse", null));
                    var s = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[s](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var n = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[s](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!r.support.transition) return n.call(this);
                    var o = r.camelCase(["scroll", s].join("-"));
                    this.$element.one("bsTransitionEnd", r.proxy(n, this)).emulateTransitionEnd(l.TRANSITION_DURATION)[s](this.$element[0][o])
                }
            }
        }
    }, l.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var t = r.Event("hide.bs.collapse");
            if (this.$element.trigger(t), !t.isDefaultPrevented()) {
                var e = this.dimension();
                this.$element[e](this.$element[e]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var i = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return r.support.transition ? void this.$element[e](0).one("bsTransitionEnd", r.proxy(i, this)).emulateTransitionEnd(l.TRANSITION_DURATION) : i.call(this)
            }
        }
    }, l.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, l.prototype.getParent = function() {
        return r(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(r.proxy(function(t, e) {
            var i = r(e);
            this.addAriaAndCollapsedClass(n(i), i)
        }, this)).end()
    }, l.prototype.addAriaAndCollapsedClass = function(t, e) {
        var i = t.hasClass("in");
        t.attr("aria-expanded", i), e.toggleClass("collapsed", !i).attr("aria-expanded", i)
    };
    var t = r.fn.collapse;
    r.fn.collapse = a, r.fn.collapse.Constructor = l, r.fn.collapse.noConflict = function() {
        return r.fn.collapse = t, this
    }, r(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(t) {
        var e = r(this);
        e.attr("data-target") || t.preventDefault();
        var i = n(e),
            s = i.data("bs.collapse") ? "toggle" : e.data();
        a.call(i, s)
    })
}(jQuery),
function(o) {
    "use strict";

    function n(t, e) {
        this.$body = o(document.body), this.$scrollElement = o(o(t).is(document.body) ? window : t), this.options = o.extend({}, n.DEFAULTS, e), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", o.proxy(this.process, this)), this.refresh(), this.process()
    }

    function e(s) {
        return this.each(function() {
            var t = o(this),
                e = t.data("bs.scrollspy"),
                i = "object" == typeof s && s;
            e || t.data("bs.scrollspy", e = new n(this, i)), "string" == typeof s && e[s]()
        })
    }
    n.VERSION = "3.3.6", n.DEFAULTS = {
        offset: 10
    }, n.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, n.prototype.refresh = function() {
        var t = this,
            s = "offset",
            n = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), o.isWindow(this.$scrollElement[0]) || (s = "position", n = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
            var t = o(this),
                e = t.data("target") || t.attr("href"),
                i = /^#./.test(e) && o(e);
            return i && i.length && i.is(":visible") && [
                [i[s]().top + n, e]
            ] || null
        }).sort(function(t, e) {
            return t[0] - e[0]
        }).each(function() {
            t.offsets.push(this[0]), t.targets.push(this[1])
        })
    }, n.prototype.process = function() {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset,
            i = this.getScrollHeight(),
            s = this.options.offset + i - this.$scrollElement.height(),
            n = this.offsets,
            o = this.targets,
            r = this.activeTarget;
        if (this.scrollHeight != i && this.refresh(), s <= e) return r != (t = o[o.length - 1]) && this.activate(t);
        if (r && e < n[0]) return this.activeTarget = null, this.clear();
        for (t = n.length; t--;) r != o[t] && e >= n[t] && (void 0 === n[t + 1] || e < n[t + 1]) && this.activate(o[t])
    }, n.prototype.activate = function(t) {
        this.activeTarget = t, this.clear();
        var e = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]',
            i = o(e).parents("li").addClass("active");
        i.parent(".dropdown-menu").length && (i = i.closest("li.dropdown").addClass("active")), i.trigger("activate.bs.scrollspy")
    }, n.prototype.clear = function() {
        o(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var t = o.fn.scrollspy;
    o.fn.scrollspy = e, o.fn.scrollspy.Constructor = n, o.fn.scrollspy.noConflict = function() {
        return o.fn.scrollspy = t, this
    }, o(window).on("load.bs.scrollspy.data-api", function() {
        o('[data-spy="scroll"]').each(function() {
            var t = o(this);
            e.call(t, t.data())
        })
    })
}(jQuery),
function(s) {
    "use strict";
    s.fn.emulateTransitionEnd = function(t) {
        var e = !1,
            i = this;
        s(this).one("bsTransitionEnd", function() {
            e = !0
        });
        return setTimeout(function() {
            e || s(i).trigger(s.support.transition.end)
        }, t), this
    }, s(function() {
        s.support.transition = function() {
            var t = document.createElement("bootstrap"),
                e = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
            for (var i in e)
                if (void 0 !== t.style[i]) return {
                    end: e[i]
                };
            return !1
        }(), s.support.transition && (s.event.special.bsTransitionEnd = {
            bindType: s.support.transition.end,
            delegateType: s.support.transition.end,
            handle: function(t) {
                return s(t.target).is(this) ? t.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery),
function() {
    var l, i, n, r, o = {}.hasOwnProperty;
    (r = function() {
        function t() {
            this.options_index = 0, this.parsed = []
        }
        return t.prototype.add_node = function(t) {
            return "OPTGROUP" === t.nodeName.toUpperCase() ? this.add_group(t) : this.add_option(t)
        }, t.prototype.add_group = function(t) {
            var e, i, s, n, o, r;
            for (e = this.parsed.length, this.parsed.push({
                    array_index: e,
                    group: !0,
                    label: this.escapeExpression(t.label),
                    title: t.title ? t.title : void 0,
                    children: 0,
                    disabled: t.disabled,
                    classes: t.className
                }), r = [], s = 0, n = (o = t.childNodes).length; s < n; s++) i = o[s], r.push(this.add_option(i, e, t.disabled));
            return r
        }, t.prototype.add_option = function(t, e, i) {
            return "OPTION" === t.nodeName.toUpperCase() ? ("" !== t.text ? (null != e && (this.parsed[e].children += 1), this.parsed.push({
                array_index: this.parsed.length,
                options_index: this.options_index,
                value: t.value,
                text: t.text,
                html: t.innerHTML,
                title: t.title ? t.title : void 0,
                selected: t.selected,
                disabled: !0 === i ? i : t.disabled,
                group_array_index: e,
                group_label: null != e ? this.parsed[e].label : null,
                classes: t.className,
                style: t.style.cssText
            })) : this.parsed.push({
                array_index: this.parsed.length,
                options_index: this.options_index,
                empty: !0
            }), this.options_index += 1) : void 0
        }, t.prototype.escapeExpression = function(t) {
            var e, i;
            return null == t || !1 === t ? "" : /[\&\<\>\"\'\`]/.test(t) ? (e = {
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            }, i = /&(?!\w+;)|[\<\>\"\'\`]/g, t.replace(i, function(t) {
                return e[t] || "&amp;"
            })) : t
        }, t
    }()).select_to_array = function(t) {
        var e, i, s, n, o;
        for (i = new r, s = 0, n = (o = t.childNodes).length; s < n; s++) e = o[s], i.add_node(e);
        return i.parsed
    }, i = function() {
        function n(t, e) {
            var i, s;
            this.form_field = t, this.options = null != e ? e : {}, this.label_click_handler = (i = this.label_click_handler, s = this, function() {
                return i.apply(s, arguments)
            }), n.browser_is_supported() && (this.is_multiple = this.form_field.multiple, this.set_default_text(), this.set_default_values(), this.setup(), this.set_up_html(), this.register_observers(), this.on_ready())
        }
        return n.prototype.set_default_values = function() {
            var e = this;
            return this.click_test_action = function(t) {
                return e.test_active_click(t)
            }, this.activate_action = function(t) {
                return e.activate_field(t)
            }, this.active_field = !1, this.mouse_on_container = !1, this.results_showing = !1, this.result_highlighted = null, this.is_rtl = this.options.rtl || /\bchosen-rtl\b/.test(this.form_field.className), this.allow_single_deselect = null != this.options.allow_single_deselect && null != this.form_field.options[0] && "" === this.form_field.options[0].text && this.options.allow_single_deselect, this.disable_search_threshold = this.options.disable_search_threshold || 0, this.disable_search = this.options.disable_search || !1, this.enable_split_word_search = null == this.options.enable_split_word_search || this.options.enable_split_word_search, this.group_search = null == this.options.group_search || this.options.group_search, this.search_contains = this.options.search_contains || !1, this.single_backstroke_delete = null == this.options.single_backstroke_delete || this.options.single_backstroke_delete, this.max_selected_options = this.options.max_selected_options || 1 / 0, this.inherit_select_classes = this.options.inherit_select_classes || !1, this.display_selected_options = null == this.options.display_selected_options || this.options.display_selected_options, this.display_disabled_options = null == this.options.display_disabled_options || this.options.display_disabled_options, this.include_group_label_in_selected = this.options.include_group_label_in_selected || !1, this.max_shown_results = this.options.max_shown_results || Number.POSITIVE_INFINITY, this.case_sensitive_search = this.options.case_sensitive_search || !1, this.hide_results_on_select = null == this.options.hide_results_on_select || this.options.hide_results_on_select
        }, n.prototype.set_default_text = function() {
            return this.form_field.getAttribute("data-placeholder") ? this.default_text = this.form_field.getAttribute("data-placeholder") : this.is_multiple ? this.default_text = this.options.placeholder_text_multiple || this.options.placeholder_text || n.default_multiple_text : this.default_text = this.options.placeholder_text_single || this.options.placeholder_text || n.default_single_text, this.default_text = this.escape_html(this.default_text), this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || n.default_no_result_text
        }, n.prototype.choice_label = function(t) {
            return this.include_group_label_in_selected && null != t.group_label ? "<b class='group-name'>" + t.group_label + "</b>" + t.html : t.html
        }, n.prototype.mouse_enter = function() {
            return this.mouse_on_container = !0
        }, n.prototype.mouse_leave = function() {
            return this.mouse_on_container = !1
        }, n.prototype.input_focus = function(t) {
            var e = this;
            if (this.is_multiple) {
                if (!this.active_field) return setTimeout(function() {
                    return e.container_mousedown()
                }, 50)
            } else if (!this.active_field) return this.activate_field()
        }, n.prototype.input_blur = function(t) {
            var e = this;
            return this.mouse_on_container ? void 0 : (this.active_field = !1, setTimeout(function() {
                return e.blur_test()
            }, 100))
        }, n.prototype.label_click_handler = function(t) {
            return this.is_multiple ? this.container_mousedown(t) : this.activate_field()
        }, n.prototype.results_option_build = function(t) {
            var e, i, s, n, o, r, a;
            for (e = "", o = n = 0, r = (a = this.results_data).length; o < r && ("" !== (s = (i = a[o]).group ? this.result_add_group(i) : this.result_add_option(i)) && (n++, e += s), (null != t ? t.first : void 0) && (i.selected && this.is_multiple ? this.choice_build(i) : i.selected && !this.is_multiple && this.single_set_selected_text(this.choice_label(i))), !(n >= this.max_shown_results)); o++);
            return e
        }, n.prototype.result_add_option = function(t) {
            var e, i;
            return t.search_match && this.include_option_in_results(t) ? (e = [], t.disabled || t.selected && this.is_multiple || e.push("active-result"), !t.disabled || t.selected && this.is_multiple || e.push("disabled-result"), t.selected && e.push("result-selected"), null != t.group_array_index && e.push("group-option"), "" !== t.classes && e.push(t.classes), (i = document.createElement("li")).className = e.join(" "), i.style.cssText = t.style, i.setAttribute("data-option-array-index", t.array_index), i.innerHTML = t.search_text, t.title && (i.title = t.title), this.outerHTML(i)) : ""
        }, n.prototype.result_add_group = function(t) {
            var e, i;
            return (t.search_match || t.group_match) && 0 < t.active_options ? ((e = []).push("group-result"), t.classes && e.push(t.classes), (i = document.createElement("li")).className = e.join(" "), i.innerHTML = t.search_text, t.title && (i.title = t.title), this.outerHTML(i)) : ""
        }, n.prototype.results_update_field = function() {
            return this.set_default_text(), this.is_multiple || this.results_reset_cleanup(), this.result_clear_highlight(), this.results_build(), this.results_showing ? this.winnow_results() : void 0
        }, n.prototype.reset_single_select_options = function() {
            var t, e, i, s, n;
            for (n = [], e = 0, i = (s = this.results_data).length; e < i; e++)(t = s[e]).selected ? n.push(t.selected = !1) : n.push(void 0);
            return n
        }, n.prototype.results_toggle = function() {
            return this.results_showing ? this.results_hide() : this.results_show()
        }, n.prototype.results_search = function(t) {
            return this.results_showing ? this.winnow_results() : this.results_show()
        }, n.prototype.winnow_results = function() {
            var t, e, i, s, n, o, r, a, l, h, c, d;
            for (this.no_results_clear(), n = 0, t = (r = this.get_search_text()).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), s = this.get_search_regex(t), e = this.get_highlight_regex(t), h = 0, c = (d = this.results_data).length; h < c; h++)(i = d[h]).search_match = !1, o = null, this.include_option_in_results(i) && (i.group && (i.group_match = !1, i.active_options = 0), null != i.group_array_index && this.results_data[i.group_array_index] && (0 === (o = this.results_data[i.group_array_index]).active_options && o.search_match && (n += 1), o.active_options += 1), i.search_text = i.group ? i.label : i.html, (!i.group || this.group_search) && (i.search_match = this.search_string_match(i.search_text, s), i.search_match && !i.group && (n += 1), i.search_match ? (r.length && (a = i.search_text.search(e), l = i.search_text.substr(0, a + r.length) + "</em>" + i.search_text.substr(a + r.length), i.search_text = l.substr(0, a) + "<em>" + l.substr(a)), null != o && (o.group_match = !0)) : null != i.group_array_index && this.results_data[i.group_array_index].search_match && (i.search_match = !0)));
            return this.result_clear_highlight(), n < 1 && r.length ? (this.update_results_content(""), this.no_results(r)) : (this.update_results_content(this.results_option_build()), this.winnow_results_set_highlight())
        }, n.prototype.get_search_regex = function(t) {
            var e, i;
            return e = this.search_contains ? "" : "^", i = this.case_sensitive_search ? "" : "i", new RegExp(e + t, i)
        }, n.prototype.get_highlight_regex = function(t) {
            var e, i;
            return e = this.search_contains ? "" : "\\b", i = this.case_sensitive_search ? "" : "i", new RegExp(e + t, i)
        }, n.prototype.search_string_match = function(t, e) {
            var i, s, n, o;
            if (e.test(t)) return !0;
            if (this.enable_split_word_search && (0 <= t.indexOf(" ") || 0 === t.indexOf("[")) && (s = t.replace(/\[|\]/g, "").split(" ")).length)
                for (n = 0, o = s.length; n < o; n++)
                    if (i = s[n], e.test(i)) return !0
        }, n.prototype.choices_count = function() {
            var t, e, i;
            if (null != this.selected_option_count) return this.selected_option_count;
            for (t = this.selected_option_count = 0, e = (i = this.form_field.options).length; t < e; t++) i[t].selected && (this.selected_option_count += 1);
            return this.selected_option_count
        }, n.prototype.choices_click = function(t) {
            return t.preventDefault(), this.activate_field(), this.results_showing || this.is_disabled ? void 0 : this.results_show()
        }, n.prototype.keydown_checker = function(t) {
            var e, i;
            switch (e = null != (i = t.which) ? i : t.keyCode, this.search_field_scale(), 8 !== e && this.pending_backstroke && this.clear_backstroke(), e) {
                case 8:
                    this.backstroke_length = this.get_search_field_value().length;
                    break;
                case 9:
                    this.results_showing && !this.is_multiple && this.result_select(t), this.mouse_on_container = !1;
                    break;
                case 13:
                case 27:
                    this.results_showing && t.preventDefault();
                    break;
                case 32:
                    this.disable_search && t.preventDefault();
                    break;
                case 38:
                    t.preventDefault(), this.keyup_arrow();
                    break;
                case 40:
                    t.preventDefault(), this.keydown_arrow()
            }
        }, n.prototype.keyup_checker = function(t) {
            var e, i;
            switch (e = null != (i = t.which) ? i : t.keyCode, this.search_field_scale(), e) {
                case 8:
                    this.is_multiple && this.backstroke_length < 1 && 0 < this.choices_count() ? this.keydown_backstroke() : this.pending_backstroke || (this.result_clear_highlight(), this.results_search());
                    break;
                case 13:
                    t.preventDefault(), this.results_showing && this.result_select(t);
                    break;
                case 27:
                    this.results_showing && this.results_hide();
                    break;
                case 9:
                case 16:
                case 17:
                case 18:
                case 38:
                case 40:
                case 91:
                    break;
                default:
                    this.results_search()
            }
        }, n.prototype.clipboard_event_checker = function(t) {
            var e = this;
            if (!this.is_disabled) return setTimeout(function() {
                return e.results_search()
            }, 50)
        }, n.prototype.container_width = function() {
            return null != this.options.width ? this.options.width : this.form_field.offsetWidth + "px"
        }, n.prototype.include_option_in_results = function(t) {
            return !(this.is_multiple && !this.display_selected_options && t.selected) && (!(!this.display_disabled_options && t.disabled) && !t.empty)
        }, n.prototype.search_results_touchstart = function(t) {
            return this.touch_started = !0, this.search_results_mouseover(t)
        }, n.prototype.search_results_touchmove = function(t) {
            return this.touch_started = !1, this.search_results_mouseout(t)
        }, n.prototype.search_results_touchend = function(t) {
            return this.touch_started ? this.search_results_mouseup(t) : void 0
        }, n.prototype.outerHTML = function(t) {
            var e;
            return t.outerHTML ? t.outerHTML : ((e = document.createElement("div")).appendChild(t), e.innerHTML)
        }, n.prototype.get_single_html = function() {
            return '<a class="chosen-single chosen-default">\n  <span>' + this.default_text + '</span>\n  <div><b></b></div>\n</a>\n<div class="chosen-drop">\n  <div class="chosen-search">\n    <input class="chosen-search-input" type="text" autocomplete="off" />\n  </div>\n  <ul class="chosen-results"></ul>\n</div>'
        }, n.prototype.get_multi_html = function() {
            return '<ul class="chosen-choices">\n  <li class="search-field">\n    <input class="chosen-search-input" type="text" autocomplete="off" value="' + this.default_text + '" />\n  </li>\n</ul>\n<div class="chosen-drop">\n  <ul class="chosen-results"></ul>\n</div>'
        }, n.prototype.get_no_results_html = function(t) {
            return '<li class="no-results">\n  ' + this.results_none_found + " <span>" + t + "</span>\n</li>"
        }, n.browser_is_supported = function() {
            return "Microsoft Internet Explorer" === window.navigator.appName ? 8 <= document.documentMode : !(/iP(od|hone)/i.test(window.navigator.userAgent) || /IEMobile/i.test(window.navigator.userAgent) || /Windows Phone/i.test(window.navigator.userAgent) || /BlackBerry/i.test(window.navigator.userAgent) || /BB10/i.test(window.navigator.userAgent) || /Android.*Mobile/i.test(window.navigator.userAgent))
        }, n.default_multiple_text = "Select Some Options", n.default_single_text = "Select an Option", n.default_no_result_text = "No results match", n
    }(), (l = jQuery).fn.extend({
        chosen: function(s) {
            return i.browser_is_supported() ? this.each(function(t) {
                var e, i;
                return i = (e = l(this)).data("chosen"), "destroy" === s ? void(i instanceof n && i.destroy()) : void(i instanceof n || e.data("chosen", new n(this, s)))
            }) : this
        }
    }), n = function(t) {
        function e() {
            return e.__super__.constructor.apply(this, arguments)
        }
        return function(t, e) {
            function i() {
                this.constructor = t
            }
            for (var s in e) o.call(e, s) && (t[s] = e[s]);
            i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype
        }(e, i), e.prototype.setup = function() {
            return this.form_field_jq = l(this.form_field), this.current_selectedIndex = this.form_field.selectedIndex
        }, e.prototype.set_up_html = function() {
            var t, e;
            return (t = ["chosen-container"]).push("chosen-container-" + (this.is_multiple ? "multi" : "single")), this.inherit_select_classes && this.form_field.className && t.push(this.form_field.className), this.is_rtl && t.push("chosen-rtl"), e = {
                class: t.join(" "),
                title: this.form_field.title
            }, this.form_field.id.length && (e.id = this.form_field.id.replace(/[^\w]/g, "_") + "_chosen"), this.container = l("<div />", e), this.container.width(this.container_width()), this.is_multiple ? this.container.html(this.get_multi_html()) : this.container.html(this.get_single_html()), this.form_field_jq.hide().after(this.container), this.dropdown = this.container.find("div.chosen-drop").first(), this.search_field = this.container.find("input").first(), this.search_results = this.container.find("ul.chosen-results").first(), this.search_field_scale(), this.search_no_results = this.container.find("li.no-results").first(), this.is_multiple ? (this.search_choices = this.container.find("ul.chosen-choices").first(), this.search_container = this.container.find("li.search-field").first()) : (this.search_container = this.container.find("div.chosen-search").first(), this.selected_item = this.container.find(".chosen-single").first()), this.results_build(), this.set_tab_index(), this.set_label_behavior()
        }, e.prototype.on_ready = function() {
            return this.form_field_jq.trigger("chosen:ready", {
                chosen: this
            })
        }, e.prototype.register_observers = function() {
            var e = this;
            return this.container.bind("touchstart.chosen", function(t) {
                e.container_mousedown(t)
            }), this.container.bind("touchend.chosen", function(t) {
                e.container_mouseup(t)
            }), this.container.bind("mousedown.chosen", function(t) {
                e.container_mousedown(t)
            }), this.container.bind("mouseup.chosen", function(t) {
                e.container_mouseup(t)
            }), this.container.bind("mouseenter.chosen", function(t) {
                e.mouse_enter(t)
            }), this.container.bind("mouseleave.chosen", function(t) {
                e.mouse_leave(t)
            }), this.search_results.bind("mouseup.chosen", function(t) {
                e.search_results_mouseup(t)
            }), this.search_results.bind("mouseover.chosen", function(t) {
                e.search_results_mouseover(t)
            }), this.search_results.bind("mouseout.chosen", function(t) {
                e.search_results_mouseout(t)
            }), this.search_results.bind("mousewheel.chosen DOMMouseScroll.chosen", function(t) {
                e.search_results_mousewheel(t)
            }), this.search_results.bind("touchstart.chosen", function(t) {
                e.search_results_touchstart(t)
            }), this.search_results.bind("touchmove.chosen", function(t) {
                e.search_results_touchmove(t)
            }), this.search_results.bind("touchend.chosen", function(t) {
                e.search_results_touchend(t)
            }), this.form_field_jq.bind("chosen:updated.chosen", function(t) {
                e.results_update_field(t)
            }), this.form_field_jq.bind("chosen:activate.chosen", function(t) {
                e.activate_field(t)
            }), this.form_field_jq.bind("chosen:open.chosen", function(t) {
                e.container_mousedown(t)
            }), this.form_field_jq.bind("chosen:close.chosen", function(t) {
                e.close_field(t)
            }), this.search_field.bind("blur.chosen", function(t) {
                e.input_blur(t)
            }), this.search_field.bind("keyup.chosen", function(t) {
                e.keyup_checker(t)
            }), this.search_field.bind("keydown.chosen", function(t) {
                e.keydown_checker(t)
            }), this.search_field.bind("focus.chosen", function(t) {
                e.input_focus(t)
            }), this.search_field.bind("cut.chosen", function(t) {
                e.clipboard_event_checker(t)
            }), this.search_field.bind("paste.chosen", function(t) {
                e.clipboard_event_checker(t)
            }), this.is_multiple ? this.search_choices.bind("click.chosen", function(t) {
                e.choices_click(t)
            }) : this.container.bind("click.chosen", function(t) {
                t.preventDefault()
            })
        }, e.prototype.destroy = function() {
            return l(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action), 0 < this.form_field_label.length && this.form_field_label.unbind("click.chosen"), this.search_field[0].tabIndex && (this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex), this.container.remove(), this.form_field_jq.removeData("chosen"), this.form_field_jq.show()
        }, e.prototype.search_field_disabled = function() {
            return this.is_disabled = this.form_field.disabled || this.form_field_jq.parents("fieldset").is(":disabled"), this.container.toggleClass("chosen-disabled", this.is_disabled), this.search_field[0].disabled = this.is_disabled, this.is_multiple || this.selected_item.unbind("focus.chosen", this.activate_field), this.is_disabled ? this.close_field() : this.is_multiple ? void 0 : this.selected_item.bind("focus.chosen", this.activate_field)
        }, e.prototype.container_mousedown = function(t) {
            var e;
            if (!this.is_disabled) return !t || "mousedown" !== (e = t.type) && "touchstart" !== e || this.results_showing || t.preventDefault(), null != t && l(t.target).hasClass("search-choice-close") ? void 0 : (this.active_field ? this.is_multiple || !t || l(t.target)[0] !== this.selected_item[0] && !l(t.target).parents("a.chosen-single").length || (t.preventDefault(), this.results_toggle()) : (this.is_multiple && this.search_field.val(""), l(this.container[0].ownerDocument).bind("click.chosen", this.click_test_action), this.results_show()), this.activate_field())
        }, e.prototype.container_mouseup = function(t) {
            return "ABBR" !== t.target.nodeName || this.is_disabled ? void 0 : this.results_reset(t)
        }, e.prototype.search_results_mousewheel = function(t) {
            var e;
            return t.originalEvent && (e = t.originalEvent.deltaY || -t.originalEvent.wheelDelta || t.originalEvent.detail), null != e ? (t.preventDefault(), "DOMMouseScroll" === t.type && (e *= 40), this.search_results.scrollTop(e + this.search_results.scrollTop())) : void 0
        }, e.prototype.blur_test = function(t) {
            return !this.active_field && this.container.hasClass("chosen-container-active") ? this.close_field() : void 0
        }, e.prototype.close_field = function() {
            return l(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action), this.active_field = !1, this.results_hide(), this.container.removeClass("chosen-container-active"), this.clear_backstroke(), this.show_search_field_default(), this.search_field_scale(), this.search_field.blur()
        }, e.prototype.activate_field = function() {
            return this.is_disabled ? void 0 : (this.container.addClass("chosen-container-active"), this.active_field = !0, this.search_field.val(this.search_field.val()), this.search_field.focus())
        }, e.prototype.test_active_click = function(t) {
            var e;
            return (e = l(t.target).closest(".chosen-container")).length && this.container[0] === e[0] ? this.active_field = !0 : this.close_field()
        }, e.prototype.results_build = function() {
            return this.parsing = !0, this.selected_option_count = null, this.results_data = r.select_to_array(this.form_field), this.is_multiple ? this.search_choices.find("li.search-choice").remove() : this.is_multiple || (this.single_set_selected_text(), this.disable_search || this.form_field.options.length <= this.disable_search_threshold ? (this.search_field[0].readOnly = !0, this.container.addClass("chosen-container-single-nosearch")) : (this.search_field[0].readOnly = !1, this.container.removeClass("chosen-container-single-nosearch"))), this.update_results_content(this.results_option_build({
                first: !0
            })), this.search_field_disabled(), this.show_search_field_default(), this.search_field_scale(), this.parsing = !1
        }, e.prototype.result_do_highlight = function(t) {
            var e, i, s, n;
            if (t.length) {
                if (this.result_clear_highlight(), this.result_highlight = t, this.result_highlight.addClass("highlighted"), (s = parseInt(this.search_results.css("maxHeight"), 10)) + (n = this.search_results.scrollTop()) <= (e = (i = this.result_highlight.position().top + this.search_results.scrollTop()) + this.result_highlight.outerHeight())) return this.search_results.scrollTop(0 < e - s ? e - s : 0);
                if (i < n) return this.search_results.scrollTop(i)
            }
        }, e.prototype.result_clear_highlight = function() {
            return this.result_highlight && this.result_highlight.removeClass("highlighted"), this.result_highlight = null
        }, e.prototype.results_show = function() {
            return this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {
                chosen: this
            }), !1) : (this.container.addClass("chosen-with-drop"), this.results_showing = !0, this.search_field.focus(), this.search_field.val(this.get_search_field_value()), this.winnow_results(), this.form_field_jq.trigger("chosen:showing_dropdown", {
                chosen: this
            }))
        }, e.prototype.update_results_content = function(t) {
            return this.search_results.html(t)
        }, e.prototype.results_hide = function() {
            return this.results_showing && (this.result_clear_highlight(), this.container.removeClass("chosen-with-drop"), this.form_field_jq.trigger("chosen:hiding_dropdown", {
                chosen: this
            })), this.results_showing = !1
        }, e.prototype.set_tab_index = function(t) {
            var e;
            return this.form_field.tabIndex ? (e = this.form_field.tabIndex, this.form_field.tabIndex = -1, this.search_field[0].tabIndex = e) : void 0
        }, e.prototype.set_label_behavior = function() {
            return this.form_field_label = this.form_field_jq.parents("label"), !this.form_field_label.length && this.form_field.id.length && (this.form_field_label = l("label[for='" + this.form_field.id + "']")), 0 < this.form_field_label.length ? this.form_field_label.bind("click.chosen", this.label_click_handler) : void 0
        }, e.prototype.show_search_field_default = function() {
            return this.is_multiple && this.choices_count() < 1 && !this.active_field ? (this.search_field.val(this.default_text), this.search_field.addClass("default")) : (this.search_field.val(""), this.search_field.removeClass("default"))
        }, e.prototype.search_results_mouseup = function(t) {
            var e;
            return (e = l(t.target).hasClass("active-result") ? l(t.target) : l(t.target).parents(".active-result").first()).length ? (this.result_highlight = e, this.result_select(t), this.search_field.focus()) : void 0
        }, e.prototype.search_results_mouseover = function(t) {
            var e;
            return (e = l(t.target).hasClass("active-result") ? l(t.target) : l(t.target).parents(".active-result").first()) ? this.result_do_highlight(e) : void 0
        }, e.prototype.search_results_mouseout = function(t) {
            return l(t.target).hasClass("active-result") ? this.result_clear_highlight() : void 0
        }, e.prototype.choice_build = function(t) {
            var e, i, s = this;
            return e = l("<li />", {
                class: "search-choice"
            }).html("<span>" + this.choice_label(t) + "</span>"), t.disabled ? e.addClass("search-choice-disabled") : ((i = l("<a />", {
                class: "search-choice-close",
                "data-option-array-index": t.array_index
            })).bind("click.chosen", function(t) {
                return s.choice_destroy_link_click(t)
            }), e.append(i)), this.search_container.before(e)
        }, e.prototype.choice_destroy_link_click = function(t) {
            return t.preventDefault(), t.stopPropagation(), this.is_disabled ? void 0 : this.choice_destroy(l(t.target))
        }, e.prototype.choice_destroy = function(t) {
            return this.result_deselect(t[0].getAttribute("data-option-array-index")) ? (this.active_field ? this.search_field.focus() : this.show_search_field_default(), this.is_multiple && 0 < this.choices_count() && this.get_search_field_value().length < 1 && this.results_hide(), t.parents("li").first().remove(), this.search_field_scale()) : void 0
        }, e.prototype.results_reset = function() {
            return this.reset_single_select_options(), this.form_field.options[0].selected = !0, this.single_set_selected_text(), this.show_search_field_default(), this.results_reset_cleanup(), this.trigger_form_field_change(), this.active_field ? this.results_hide() : void 0
        }, e.prototype.results_reset_cleanup = function() {
            return this.current_selectedIndex = this.form_field.selectedIndex, this.selected_item.find("abbr").remove()
        }, e.prototype.result_select = function(t) {
            var e, i;
            return this.result_highlight ? (e = this.result_highlight, this.result_clear_highlight(), this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {
                chosen: this
            }), !1) : (this.is_multiple ? e.removeClass("active-result") : this.reset_single_select_options(), e.addClass("result-selected"), (i = this.results_data[e[0].getAttribute("data-option-array-index")]).selected = !0, this.form_field.options[i.options_index].selected = !0, this.selected_option_count = null, this.is_multiple ? this.choice_build(i) : this.single_set_selected_text(this.choice_label(i)), (!this.is_multiple || this.hide_results_on_select && !t.metaKey && !t.ctrlKey) && (this.results_hide(), this.show_search_field_default()), (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) && this.trigger_form_field_change({
                selected: this.form_field.options[i.options_index].value
            }), this.current_selectedIndex = this.form_field.selectedIndex, t.preventDefault(), this.search_field_scale())) : void 0
        }, e.prototype.single_set_selected_text = function(t) {
            return null == t && (t = this.default_text), t === this.default_text ? this.selected_item.addClass("chosen-default") : (this.single_deselect_control_build(), this.selected_item.removeClass("chosen-default")), this.selected_item.find("span").html(t)
        }, e.prototype.result_deselect = function(t) {
            var e;
            return e = this.results_data[t], !this.form_field.options[e.options_index].disabled && (e.selected = !1, this.form_field.options[e.options_index].selected = !1, this.selected_option_count = null, this.result_clear_highlight(), this.results_showing && this.winnow_results(), this.trigger_form_field_change({
                deselected: this.form_field.options[e.options_index].value
            }), this.search_field_scale(), !0)
        }, e.prototype.single_deselect_control_build = function() {
            return this.allow_single_deselect ? (this.selected_item.find("abbr").length || this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>'), this.selected_item.addClass("chosen-single-with-deselect")) : void 0
        }, e.prototype.get_search_field_value = function() {
            return this.search_field.val()
        }, e.prototype.get_search_text = function() {
            return this.escape_html(l.trim(this.get_search_field_value()))
        }, e.prototype.escape_html = function(t) {
            return l("<div/>").text(t).html()
        }, e.prototype.winnow_results_set_highlight = function() {
            var t, e;
            return null != (t = (e = this.is_multiple ? [] : this.search_results.find(".result-selected.active-result")).length ? e.first() : this.search_results.find(".active-result").first()) ? this.result_do_highlight(t) : void 0
        }, e.prototype.no_results = function(t) {
            var e;
            return e = this.get_no_results_html(t), this.search_results.append(e), this.form_field_jq.trigger("chosen:no_results", {
                chosen: this
            })
        }, e.prototype.no_results_clear = function() {
            return this.search_results.find(".no-results").remove()
        }, e.prototype.keydown_arrow = function() {
            var t;
            return this.results_showing && this.result_highlight ? (t = this.result_highlight.nextAll("li.active-result").first()) ? this.result_do_highlight(t) : void 0 : this.results_show()
        }, e.prototype.keyup_arrow = function() {
            var t;
            return this.results_showing || this.is_multiple ? this.result_highlight ? (t = this.result_highlight.prevAll("li.active-result")).length ? this.result_do_highlight(t.first()) : (0 < this.choices_count() && this.results_hide(), this.result_clear_highlight()) : void 0 : this.results_show()
        }, e.prototype.keydown_backstroke = function() {
            var t;
            return this.pending_backstroke ? (this.choice_destroy(this.pending_backstroke.find("a").first()), this.clear_backstroke()) : (t = this.search_container.siblings("li.search-choice").last()).length && !t.hasClass("search-choice-disabled") ? (this.pending_backstroke = t, this.single_backstroke_delete ? this.keydown_backstroke() : this.pending_backstroke.addClass("search-choice-focus")) : void 0
        }, e.prototype.clear_backstroke = function() {
            return this.pending_backstroke && this.pending_backstroke.removeClass("search-choice-focus"), this.pending_backstroke = null
        }, e.prototype.search_field_scale = function() {
            var t, e, i, s, n, o, r, a;
            if (this.is_multiple) {
                for (s = {
                        position: "absolute",
                        left: "-1000px",
                        top: "-1000px",
                        display: "none",
                        whiteSpace: "pre"
                    }, r = 0, a = (n = ["fontSize", "fontStyle", "fontWeight", "fontFamily", "lineHeight", "textTransform", "letterSpacing"]).length; r < a; r++) s[i = n[r]] = this.search_field.css(i);
                return (e = l("<div />").css(s)).text(this.get_search_field_value()), l("body").append(e), o = e.width() + 25, e.remove(), t = this.container.outerWidth(), o = Math.min(t - 10, o), this.search_field.width(o)
            }
        }, e.prototype.trigger_form_field_change = function(t) {
            return this.form_field_jq.trigger("input", t), this.form_field_jq.trigger("change", t)
        }, e
    }()
}.call(this),
    function() {
        "use strict";

        function o(t, e, i) {
            "addEventListener" in window ? t.addEventListener(e, i, !1) : "attachEvent" in window && t.attachEvent("on" + e, i)
        }

        function e(t) {
            return R + "[" + z + "] " + t
        }

        function a(t) {
            N && "object" == typeof window.console && console.log(e(t))
        }

        function r(t) {
            "object" == typeof window.console && console.warn(e(t))
        }

        function i() {
            var t, e, i, s, n;
            a("Initialising iFrame"),
                function() {
                    function t(t) {
                        return "true" === t
                    }
                    var e = $.substr(P).split(":");
                    z = e[0], k = void 0 !== e[1] ? Number(e[1]) : k, S = void 0 !== e[2] ? t(e[2]) : S, N = void 0 !== e[3] ? t(e[3]) : N, O = void 0 !== e[4] ? Number(e[4]) : O, M = void 0 !== e[5] ? t(e[5]) : M, b = void 0 !== e[6] ? t(e[6]) : b, x = e[7], A = void 0 !== e[8] ? e[8] : A, C = e[9], T = e[10], q = void 0 !== e[11] ? Number(e[11]) : q
                }(), void 0 === x && (x = k + "px"), n = "margin", -1 !== x.indexOf("-") && r("Negative CSS value ignored for " + n), l("margin", x), l("background", C), l("padding", T), (s = document.createElement("div")).style.clear = "both", s.style.display = "block", document.body.appendChild(s), h(), document.documentElement.style.height = "", document.body.style.height = "", a('HTML & body height set to "auto"'), M && (a("Enable public methods"), window.parentIFrame = {
                    close: function() {
                        g("close", "parentIFrame.close()", 0, 0)
                    },
                    getId: function() {
                        return z
                    },
                    reset: function() {
                        y("parentIFrame.size")
                    },
                    scrollTo: function(t, e) {
                        _(e, t, "scrollTo")
                    },
                    scrollToOffset: function(t, e) {
                        _(e, t, "scrollToOffset")
                    },
                    sendMessage: function(t, e) {
                        _(0, 0, "message", JSON.stringify(t), e)
                    },
                    setHeightCalculationMethod: function(t) {
                        A = t, h()
                    },
                    setTargetOrigin: function(t) {
                        a("Set targetOrigin: " + t), W = t
                    },
                    size: function(t, e) {
                        var i = (t || "") + (e ? "," + e : "");
                        m(), g("size", "parentIFrame.size(" + i + ")", t, e)
                    }
                }), !0 === b ? (o(window, "resize", function() {
                    g("resize", "Window resized")
                }), o(window, "click", function() {
                    g("click", "Window clicked")
                }), (t = window.MutationObserver || window.WebKitMutationObserver) ? O < 0 ? c() : (e = document.querySelector("body"), i = new t(function(t) {
                    g("mutationObserver", "mutationObserver: " + t[0].target + " " + t[0].type),
                        function(t) {
                            function i(t) {
                                (void 0 === t.height || void 0 === t.width || 0 === t.height || 0 === t.width) && (a("Attach listerner to " + t.src), o(t, "load", function() {
                                    g("imageLoad", "Image loaded")
                                }))
                            }
                            t.forEach(function(t) {
                                if ("attributes" === t.type && "src" === t.attributeName) i(t.target);
                                else if ("childList" === t.type) {
                                    var e = t.target.querySelectorAll("img");
                                    Array.prototype.forEach.call(e, function(t) {
                                        i(t)
                                    })
                                }
                            })
                        }(t)
                }), a("Enable MutationObserver"), i.observe(e, {
                    attributes: !0,
                    attributeOldValue: !1,
                    characterData: !0,
                    characterDataOldValue: !1,
                    childList: !0,
                    subtree: !0
                })) : (r("MutationObserver not supported in this browser!"), c())) : a("Auto Resize disabled"), g("init", "Init message from host page")
        }

        function l(t, e) {
            void 0 !== e && "" !== e && "null" !== e && a("Body " + t + ' set to "' + (document.body.style[t] = e) + '"')
        }

        function h() {
            Q !== A && (A in Y || (r(A + " is not a valid option for heightCalculationMethod."), A = "bodyScroll"), a('Height calculation method set to "' + A + '"'))
        }

        function c() {
            0 !== O && (a("setInterval: " + O + "ms"), setInterval(function() {
                g("interval", "setInterval: " + O)
            }, Math.abs(O)))
        }

        function t() {
            function t(t) {
                var s = document.body,
                    e = 0;
                return "defaultView" in document && "getComputedStyle" in document.defaultView ? e = null !== (e = document.defaultView.getComputedStyle(s, null)) ? e[t] : 0 : e = function(t) {
                    if (/^\d+(px)?$/i.test(t)) return parseInt(t, w);
                    var e = s.style.left,
                        i = s.runtimeStyle.left;
                    return s.runtimeStyle.left = s.currentStyle.left, s.style.left = t || 0, t = s.style.pixelLeft, s.style.left = e, s.runtimeStyle.left = i, t
                }(s.currentStyle[t]), parseInt(e, w)
            }
            return document.body.offsetHeight + t("marginTop") + t("marginBottom")
        }

        function s() {
            return document.body.scrollHeight
        }

        function n() {
            return document.documentElement.offsetHeight
        }

        function d() {
            return document.documentElement.scrollHeight
        }

        function u() {
            return [t(), s(), n(), d()]
        }

        function p() {
            return Math.max.apply(null, u())
        }

        function f() {
            return Math.max(document.documentElement.scrollWidth, document.body.scrollWidth)
        }

        function g(t, e, i, s) {
            function n() {
                t in {
                    reset: 1,
                    resetPage: 1,
                    init: 1
                } || a("Trigger event: " + e)
            }
            var o, r;
            B && t in j ? a("Trigger event cancelled: " + t) : function() {
                function t(t, e) {
                    return !(Math.abs(t - e) <= q)
                }
                return o = void 0 !== i ? i : Y[A](), r = void 0 !== s ? s : f(), t(I, o) || S && t(V, r)
            }() ? (n(), m(), _(I = o, V = r, t)) : !(t in {
                init: 1,
                interval: 1,
                size: 1
            }) && A in L ? y(e) : t in {
                interval: 1
            } || (n(), a("No change in size detected"))
        }

        function m() {
            B || (B = !0, a("Trigger event lock on")), clearTimeout(U), U = setTimeout(function() {
                B = !1, a("Trigger event lock off"), a("--")
            }, E)
        }

        function v(t) {
            I = Y[A](), V = f(), _(I, V, t)
        }

        function y(t) {
            var e = A;
            A = Q, a("Reset trigger event: " + t), m(), v("reset"), A = e
        }

        function _(t, e, i, s, n) {
            var o;
            void 0 === n ? n = W : a("Message targetOrigin: " + n), a("Sending message to host page (" + (o = z + ":" + t + ":" + e + ":" + i + (void 0 !== s ? ":" + s : "")) + ")"), F.postMessage(R + o, n)
        }
        var b = !0,
            w = 10,
            C = "",
            k = 0,
            x = "",
            T = "",
            S = !1,
            j = {
                resize: 1,
                click: 1
            },
            E = 128,
            I = 1,
            D = !0,
            Q = "offset",
            A = Q,
            H = !0,
            $ = "",
            O = 32,
            N = !1,
            R = "[iFrameSizer]",
            P = R.length,
            z = "",
            M = !1,
            L = {
                max: 1,
                scroll: 1,
                bodyScroll: 1,
                documentElementScroll: 1
            },
            W = "*",
            F = window.parent,
            q = 0,
            B = !1,
            U = null,
            V = 1,
            Y = {
                offset: t,
                bodyOffset: t,
                bodyScroll: s,
                documentElementOffset: n,
                scroll: d,
                documentElementScroll: d,
                max: p,
                min: function() {
                    return Math.min.apply(null, u())
                },
                grow: p,
                lowestElement: function() {
                    return Math.max(t(), function() {
                        for (var t = document.querySelectorAll("body *"), e = t.length, i = 0, s = (new Date).getTime(), n = 0; n < e; n++) t[n].getBoundingClientRect().bottom > i && (i = t[n].getBoundingClientRect().bottom);
                        return s = (new Date).getTime() - s, a("Parsed " + e + " HTML elements"), a("LowestElement bottom position calculated in " + s + "ms"), i
                    }())
                }
            };
        o(window, "message", function(t) {
            R === ("" + t.data).substr(0, P) && (D && t.data.split(":")[2] in {
                true: 1,
                false: 1
            } ? ($ = t.data, F = t.source, i(), D = !1, setTimeout(function() {
                H = !1
            }, E)) : "reset" === t.data.split("]")[1] ? H ? a("Page reset ignored by init") : (a("Page size reset by host page"), v("resetPage")) : t.data === $ || "iFrameResize" in window || r("Unexpected message (" + t.data + ")"))
        })
    }(),
    function() {
        "use strict";

        function n(t, e, i) {
            "addEventListener" in window ? t.addEventListener(e, i, !1) : "attachEvent" in window && t.attachEvent("on" + e, i)
        }

        function l(t) {
            w.log && "object" == typeof console && console.log(m + "[Host page" + y + "]" + t)
        }

        function h() {
            null === _ && l(" Get position: " + (_ = {
                x: void 0 !== window.pageXOffset ? window.pageXOffset : document.documentElement.scrollLeft,
                y: void 0 !== window.pageYOffset ? window.pageYOffset : document.documentElement.scrollTop
            }).x + "," + _.y)
        }

        function c() {
            null !== _ && (window.scrollTo(_.x, _.y), l(" Set position: " + _.x + "," + _.y), _ = null)
        }

        function d(t) {
            l(" Size reset requested by " + ("init" === t.type ? "host page" : "iFrame")), h(), p(function() {
                u(t), o("reset", "reset", t.iframe)
            }, t, "init")
        }

        function u(e) {
            function t(t) {
                e.iframe.style[t] = e[t] + "px", l(" IFrame (" + e.iframe.id + ") " + t + " set to " + e[t] + "px")
            }
            w.sizeHeight && t("height"), w.sizeWidth && t("width")
        }

        function p(t, e, i) {
            i !== e.type && a ? (l(" Requesting animation frame"), a(t)) : t()
        }

        function o(t, e, i) {
            l("[" + t + "] Sending msg to iframe (" + e + ")"), i.contentWindow.postMessage(m + e, "*")
        }

        function e() {
            var t, e, i = this,
                s = ("" === (t = i.id) && (i.id = t = "iFrameResizer" + r++, l(" Added missing iframe ID: " + t + " (" + i.src + ")")), t);
            l(" IFrame scrolling " + (w.scrolling ? "enabled" : "disabled") + " for " + s), i.style.overflow = !1 === w.scrolling ? "hidden" : "auto", i.scrolling = !1 === w.scrolling ? "no" : "yes",
                function() {
                    function t(t) {
                        1 / 0 !== w[t] && 0 !== w[t] && (i.style[t] = w[t] + "px", l(" Set " + t + " = " + w[t] + "px"))
                    }
                    t("maxHeight"), t("minHeight"), t("maxWidth"), t("minWidth")
                }(), ("number" == typeof w.bodyMargin || "0" === w.bodyMargin) && (w.bodyMarginV1 = w.bodyMargin, w.bodyMargin = w.bodyMargin + "px"), e = s + ":" + w.bodyMarginV1 + ":" + w.sizeWidth + ":" + w.log + ":" + w.interval + ":" + w.enablePublicMethods + ":" + w.autoResize + ":" + w.bodyMargin + ":" + w.heightCalculationMethod + ":" + w.bodyBackground + ":" + w.bodyPadding + ":" + w.tolerance, n(i, "load", function() {
                    var t = f;
                    o("iFrame.onload", e, i), !t && w.heightCalculationMethod in b && d({
                        iframe: i,
                        height: 0,
                        width: 0,
                        type: "init"
                    })
                }), o("init", e, i)
        }

        function s(t) {
            if ("object" != typeof t) throw new TypeError("Options is not an object.")
        }

        function t() {
            function i(t) {
                if ("IFRAME" !== t.tagName.toUpperCase()) throw new TypeError("Expected <IFRAME> tag, found <" + t.tagName + ">.");
                e.call(t)
            }
            return function(t, e) {
                (function(t) {
                    for (var e in s(t = t || {}), C) C.hasOwnProperty(e) && (w[e] = t.hasOwnProperty(e) ? t[e] : C[e])
                })(t), Array.prototype.forEach.call(document.querySelectorAll(e || "iframe"), i)
            }
        }
        var i, r = 0,
            f = !0,
            g = "message".length,
            m = "[iFrameSizer]",
            v = m.length,
            y = "",
            _ = null,
            a = window.requestAnimationFrame,
            b = {
                max: 1,
                scroll: 1,
                bodyScroll: 1,
                documentElementScroll: 1
            },
            w = {},
            C = {
                autoResize: !0,
                bodyBackground: null,
                bodyMargin: null,
                bodyMarginV1: 8,
                bodyPadding: null,
                checkOrigin: !0,
                enablePublicMethods: !1,
                heightCalculationMethod: "offset",
                interval: 32,
                log: !1,
                maxHeight: 1 / 0,
                maxWidth: 1 / 0,
                minHeight: 0,
                minWidth: 0,
                scrolling: !1,
                sizeHeight: !0,
                sizeWidth: !1,
                tolerance: 0,
                closedCallback: function() {},
                initCallback: function() {},
                messageCallback: function() {},
                resizedCallback: function() {}
            };
        (function() {
            var t, e = ["moz", "webkit", "o", "ms"];
            for (t = 0; t < e.length && !a; t += 1) a = window[e[t] + "RequestAnimationFrame"];
            a || l(" RequestAnimationFrame not supported")
        })(), n(window, "message", function(i) {
            function s() {
                t("Height"), t("Width"), p(function() {
                    u(a), c(), w.resizedCallback(a)
                }, a, "resetPage")
            }

            function t(t) {
                var e = Number(w["max" + t]),
                    i = Number(w["min" + t]),
                    s = t.toLowerCase(),
                    n = Number(a[s]);
                if (e < i) throw new Error("Value for min" + t + " can not be greater than max" + t);
                l(" Checking " + s + " is in range " + i + "-" + e), n < i && (n = i, l(" Set " + s + " to min value")), e < n && (n = e, l(" Set " + s + " to max value")), a[s] = "" + n
            }

            function n(t) {
                var e, i = t ? (e = a.iframe.getBoundingClientRect(), h(), {
                    x: Number(e.left) + Number(_.x),
                    y: Number(e.top) + Number(_.y)
                }) : {
                    x: 0,
                    y: 0
                };
                l(" Reposition requested from iFrame (offset x:" + i.x + " y:" + i.y + ")"), _ = {
                    x: Number(a.width) + i.x,
                    y: Number(a.height) + i.y
                }, c()
            }
            var e, o, r = i.data,
                a = {};
            m === ("" + r).substr(0, v) && (l(" Received: " + r), o = r.substr(v).split(":"), a = {
                iframe: document.getElementById(o[0]),
                id: o[0],
                height: o[1],
                width: o[2],
                type: o[3]
            }, (e = a.type in {
                true: 1,
                false: 1
            }) && l(" Ignoring init message from meta parent page"), !e && function() {
                if (null === a.iframe) throw new Error("iFrame (" + a.id + ") does not exist on " + y);
                return !0
            }() && function() {
                var t = i.origin,
                    e = a.iframe.src.split("/").slice(0, 3).join("/");
                if (w.checkOrigin && (l(" Checking connection is from: " + e), "" + t != "null" && t !== e)) throw new Error("Unexpected message received from: " + t + " for " + a.iframe.id + ". Message was: " + i.data + ". This error can be disabled by adding the checkOrigin: false option.");
                return !0
            }() && (function() {
                switch (a.type) {
                    case "close":
                        e = a.iframe, l(" Removing iFrame: " + (i = e.id)), e.parentNode.removeChild(e), w.closedCallback(i), l(" --"), w.resizedCallback(a);
                        break;
                    case "message":
                        t = r.substr(r.indexOf(":") + g + 6), l(" MessageCallback passed: {iframe: " + a.iframe.id + ", message: " + t + "}"), w.messageCallback({
                            iframe: a.iframe,
                            message: JSON.parse(t)
                        }), l(" --");
                        break;
                    case "scrollTo":
                        n(!1);
                        break;
                    case "scrollToOffset":
                        n(!0);
                        break;
                    case "reset":
                        d(a);
                        break;
                    case "init":
                        s(), w.initCallback(a.iframe);
                        break;
                    default:
                        s()
                }
                var t, e, i
            }(), f = !1))
        }), window.jQuery && ((i = jQuery).fn.iFrameResize = function(t) {
            return s(t = t || {}), w = i.extend({}, C, t), this.filter("iframe").each(e).end()
        }), "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : window.iFrameResize = t()
    }(), window.isTouchDevice = /Windows Phone/.test(navigator.userAgent) || "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch, jQuery(function() {
        initSteps(), initOpenClose(), initNavHover(), initMobileNav(), initCycleCarousel(), initAccordion(), initFundingBanner(), initCookieBanner(), initFixedHeader(), initRetinaCover(), initVideoPopup(), initBackgroundResize(), initRandomBlocks(), initSearch(), initBlog(), initTimeline(), initLanguage(), initTinyFilter(), initSmoothScroll(), initEventsDropdown(), initSnapToBottom(), initScrollReveal()
    });
var GrayScaleFix = function() {
    function i(i) {
        var s = new Image;
        s.onload = function() {
            var t = document.createElement("span"),
                e = '<svg xmlns="http://www.w3.org/2000/svg" id="svgroot" viewBox="0 0 ' + s.width + " " + s.height + '" width="100%" height="100%"><defs><filter id="gray"><feColorMatrix type="matrix" values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0" /></filter></defs><image filter="url(&quot;#gray&quot;)" x="0" y="0" width="' + s.width + '" height="' + s.height + '" preserveAspectRatio="none" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="' + s.src + '" /></svg>';
            t.innerHTML = e, t.className = "grayscale-fix", i.parentNode.insertBefore(t, i), i.style.cssText += "visibility:hidden;display:block", t.querySelector("svg").style.position = "absolute", t.style.cssText = "display:inline-block;position:relative;", t.appendChild(i)
        }, s.src = i.src
    }

    function t() {
        for (var t = document.querySelectorAll("img.grayscale"), e = 0; e < t.length; e++) i(t[e])
    }
    return /(MSIE 10)|(Trident.*rv:11\.0)|( Edge\/[\d\.]+$)/.test(navigator.userAgent) && document.addEventListener("DOMContentLoaded", t), {
        replace: i,
        refresh: t
    }
}();

function initNavHover() {
    var i = "hover";
    window.isTouchDevice ? jQuery(document).on("click", ".main-menu > li > a", function(t) {
        var e = jQuery(this).closest("li");
        e.siblings().removeClass(i), !e.hasClass(i) && e.find(".sub-menu").length && (e.addClass(i), t.preventDefault())
    }) : jQuery(document).on("mouseenter", ".main-menu li", function() {
        jQuery(this).addClass(i)
    }).on("mouseleave", ".main-menu li", function() {
        jQuery(this).removeClass(i)
    })
}

function initRetinaCover() {
    jQuery(".bg-stretch").retinaCover()
}

function initVideoPopup() {
    jQuery(".btn-play").videoPopup()
}

function initSteps() {
    jQuery(".story-wrap").lineSVG({
        onceMode: !1
    })
}

function initFundingBanner() {
    if (jQuery("#funding-banner").length) {
        var t = jQuery("#funding-banner").attr("data-auto-close");
        setTimeout(function() {
            jQuery("#funding-banner").hide()
        }, t), jQuery("#funding-banner span#funding-banner-close").on("click", function() {
            jQuery("#funding-banner").hide()
        })
    }
}

function initCookieBanner() {
    if (jQuery("body").on("click", "a#CybotCookiebotDialogBodyButtonDetails", function() {
            jQuery(".CybotCookiebotDialogDetailBodyContentCookieContainerTypes, .CybotCookiebotDialogDetailBodyContentCookieContainerTypesSelected, #CybotCookiebotDialogDetailBodyContentCookieContainerNecessary").each(function() {
                var t = jQuery(this).html().split(" ")[0];
                jQuery(this).html(t)
            })
        }), jQuery("#cookie-banner").length) {
        -1 == document.cookie.indexOf("cookie_banner_closed=") && jQuery("#cookie-banner").addClass("new-visitor");
        var t, e = new Date;
        e.setTime(e.getTime() + 31536e6), t = "; expires=" + e.toGMTString(), jQuery("#cookie-banner span#cookie-banner-close").on("click", function() {
            document.cookie = "cookie_banner_closed=1" + t + ";path=/;", console.log("closed"), jQuery("#cookie-banner").hide()
        })
    }
}

function CookiebotCallback_OnAccept() {
    if (jQuery("#CybotCookiebotDialog").length) {
        var t, e = new Date;
        e.setTime(e.getTime() + 31536e6), t = "; expires=" + e.toGMTString(), document.cookie = "cookie_banner_closed=1" + t + ";path=/;", console.log("accept"), jQuery("#cookie-banner").hide()
    }
}

function CookiebotCallback_OnDecline() {
    if (jQuery("#CybotCookiebotDialog").length) {
        var t, e = new Date;
        e.setTime(e.getTime() + 31536e6), t = "; expires=" + e.toGMTString(), document.cookie = "cookie_banner_closed=1" + t + ";path=/;", console.log("decline"), jQuery("#cookie-banner").hide()
    }
}

function initFixedHeader() {
    var s = jQuery(window),
        n = "sticky-header",
        o = "fixed-position";
    jQuery(".header").each(function() {
        var t = jQuery(this),
            e = !t.hasClass(n),
            i = function() {
                0 < s.scrollTop() ? t.addClass(o) : t.removeClass(o), e && (768 < s.width() ? t.addClass(n) : t.removeClass(n))
            };
        i(), s.on("load resize orientationchange scroll", i)
    }), jQuery(".tag-section").each(function() {
        var e = jQuery(this),
            t = function() {
                var t;
                s.scrollTop() + (t = 0, jQuery(".sticky-header").each(function() {
                    t += jQuery(this).outerHeight()
                }), t) > e.offset().top ? e.addClass(o) : e.removeClass(o)
            };
        t(), s.on("load resize orientationchange scroll", t)
    })
}

function initOpenClose() {
    jQuery(".open-close").openClose({
        hideOnClickOutside: !1,
        activeClass: "active",
        opener: ".open-btn",
        slider: ".slide-content",
        animSpeed: 400,
        effect: "slide",
        onInit: function(e) {
            function t() {
                e.options.animSpeed = e.tabLink.is(":visible") ? 0 : 400
            }
            e.tabHolder = e.holder.closest("[id]"), e.toggleState = function() {
                e.holder.hasClass(e.options.activeClass) ? e.hideSlide() : e.showSlide()
            }, e.tabLink = jQuery('[href="#' + e.tabHolder.attr("id") + '"]'), e.tabLink.on("click tap", function(t) {
                t.preventDefault(), e.toggleState()
            }), e.holder.on("click tap", ".close-tab", function(t) {
                t.preventDefault(), e.hideSlide()
            }), t(), jQuery(window).on("resize orientationchange load", t)
        },
        animStart: function(t, e) {
            e ? (t.tabHolder.siblings().find(".open-close.active").each(function() {
                jQuery(this).data("OpenClose").hideSlide()
            }), t.tabLink.closest("li").addClass(t.options.activeClass)) : t.tabLink.closest("li").removeClass(t.options.activeClass)
        },
        animEnd: function(t, e) {
            var i, s;
            e && jQuery(window).width() < 768 && SmoothScroll.scrollTo((i = t.tabHolder, s = i.offset().top, jQuery(".sticky-header").each(function() {
                s -= jQuery(this).outerHeight(!0)
            }), s), 1e3)
        }
    })
}

function initMobileNav() {
    jQuery("html").mobileNav({
        hideOnClickOutside: !0,
        menuActiveClass: "nav-active",
        menuOpener: ".nav-opener",
        menuDrop: ".nav-drop"
    })
}

function initCycleCarousel() {
    jQuery(".carousel").scrollAbsoluteGallery({
        mask: ".mask",
        slider: ".slideset",
        slides: ".slide",
        btnPrev: "a.btn-prev",
        btnNext: "a.btn-next",
        generatePagination: ".pagination",
        stretchSlideToMask: !0,
        pauseOnHover: !0,
        maskAutoSize: !0,
        autoRotation: !1,
        switchTime: 3e3,
        animSpeed: 500,
        onChange: function(i) {
            i.slides.each(function(t) {
                var e = jQuery(this).data("YoutubePlayer");
                e && (t === i.currentIndex ? e.player.playVideo() : e.player.pauseVideo())
            })
        }
    })
}

function initAccordion() {
    jQuery(".tag-list").slideAccordion({
        opener: "a.opener",
        slider: "div.tag-submenu",
        collapsible: !1,
        animSpeed: 300,
        event: window.isTouchDevice ? "click" : "mouseenter"
    }), jQuery(".questions-list").slideAccordion({
        opener: "a.opener",
        addClassBeforeAnimation: !0,
        slider: ".answer-slide",
        animSpeed: 300,
        onShow: function(t) {
            var e;
            jQuery(window).width() < 768 && SmoothScroll.scrollTo((e = t.offset().top, jQuery(".sticky-header").each(function() {
                e -= jQuery(this).outerHeight(!0)
            }), e), 1e3)
        }
    })
}

function initBackgroundResize() {
    jQuery(".bg-holder-image").each(function() {
        ImageStretcher.add({
            container: this,
            image: "img"
        })
    })
}

function onYouTubeIframeAPIReady() {
    jQuery("[data-video]").youtubePlayer({
        onReady: function(t) {
            t.holder.hasClass("active") && t.player.playVideo()
        }
    })
}

function initBlog() {
    jQuery("#blog-listings, #blog-single-wrapper").length && (jQuery(".match-height").matchHeight(), jQuery(".match-height-2").matchHeight(), jQuery(".chosen").chosen(), jQuery(".chosen-container .chosen-search-input").on("keyup", function() {
        0 < jQuery(this).val().length ? jQuery("li.tag").removeClass("hide") : jQuery("li.tag").addClass("hide")
    }), jQuery("#blog-categories-dropdown").on("change", function() {
        var t = jQuery(this).val();
        "Select category" != t && ("category" == jQuery(this).find(":selected").data("type") ? window.location = location.protocol + "//" + location.hostname + "/blog/category/" + t : window.location = location.protocol + "//" + location.hostname + "/blog/tag/" + t)
    }), jQuery(document).on("ready scroll", function() {
        var t = jQuery(this).scrollTop();
        jQuery(".blog-item").each(function() {
            jQuery(this).position().top - jQuery(this).height() + jQuery(window).height() / 9 <= t && jQuery(this).addClass("fadeInUp")
        })
    }))
}

function initTimeline() {
    if (jQuery("#timeline-wrapper").length) {
        jQuery('[data-toggle="popover"]').popover({
            html: !0,
            placement: function(t, e) {
                return jQuery(window).width() < 991 ? "bottom" : "right"
            },
            content: function() {
                return jQuery(this).next(".line-event-content").html()
            }
        }).on("mouseenter", function() {
            jQuery(this).hasClass("active") || (jQuery(".line-event a").removeClass("active"), jQuery(".popover").popover("hide"), jQuery(this).addClass("active").popover("show"))
        }).on("mouseleave", function() {
            var t = this,
                e = jQuery(this).parent();
            setTimeout(function() {
                jQuery(".popover:hover").length || e.is(":hover") || jQuery(t).removeClass("active").popover("hide")
            }, 150)
        }).on("shown.bs.popover", function() {
            var t = jQuery(this).parent().find(".popover");
            if (window.isTouchDevice && !isElementInViewport(t)) {
                var e = jQuery(this).offset().top - 2 * jQuery("header.header").height();
                jQuery("html, body").animate({
                    scrollTop: e + "px"
                })
            }
        }), jQuery("a.event-0").addClass("active").popover("show"), jQuery('[data-toggle="popover"]:not(.event-0)').on("mouseover", function() {
            jQuery("a.event-0").removeClass("active").popover("hide")
        }), jQuery("html").on("click tap", function(t) {
            void 0 === jQuery(t.target).data("toggle") && jQuery('[data-toggle="popover"]').popover("hide")
        });
        var e = jQuery(".timeline.row").offset().top - jQuery("header.header").height(),
            i = jQuery(".timeline.row").offset().left;
        jQuery(document).on("ready scroll", function() {
            var t = jQuery(document).scrollTop();
            e <= t ? jQuery("#timeline-legend").addClass("sticky").css({
                top: "125px",
                left: i
            }) : t < e && jQuery("#timeline-legend").removeClass("sticky").css({
                top: 0,
                left: 0
            })
        })
    }
}! function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(l) {
    var s = -1,
        n = -1,
        h = function(t) {
            return parseFloat(t) || 0
        },
        c = function(t) {
            var e = l(t),
                s = null,
                n = [];
            return e.each(function() {
                var t = l(this),
                    e = t.offset().top - h(t.css("margin-top")),
                    i = 0 < n.length ? n[n.length - 1] : null;
                null === i ? n.push(t) : Math.floor(Math.abs(s - e)) <= 1 ? n[n.length - 1] = i.add(t) : n.push(t), s = e
            }), n
        },
        d = function(t) {
            var e = {
                byRow: !0,
                property: "height",
                target: null,
                remove: !1
            };
            return "object" == typeof t ? l.extend(e, t) : ("boolean" == typeof t ? e.byRow = t : "remove" === t && (e.remove = !0), e)
        },
        u = l.fn.matchHeight = function(t) {
            var e = d(t);
            if (e.remove) {
                var i = this;
                return this.css(e.property, ""), l.each(u._groups, function(t, e) {
                    e.elements = e.elements.not(i)
                }), this
            }
            return this.length <= 1 && !e.target || (u._groups.push({
                elements: this,
                options: e
            }), u._apply(this, e)), this
        };
    u.version = "master", u._groups = [], u._throttle = 80, u._maintainScroll = !1, u._beforeUpdate = null, u._afterUpdate = null, u._rows = c, u._parse = h, u._parseOptions = d, u._apply = function(t, e) {
        var o = d(e),
            i = l(t),
            s = [i],
            n = l(window).scrollTop(),
            r = l("html").outerHeight(!0),
            a = i.parents().filter(":hidden");
        return a.each(function() {
            var t = l(this);
            t.data("style-cache", t.attr("style"))
        }), a.css("display", "block"), o.byRow && !o.target && (i.each(function() {
            var t = l(this),
                e = t.css("display");
            "inline-block" !== e && "flex" !== e && "inline-flex" !== e && (e = "block"), t.data("style-cache", t.attr("style")), t.css({
                display: e,
                "padding-top": "0",
                "padding-bottom": "0",
                "margin-top": "0",
                "margin-bottom": "0",
                "border-top-width": "0",
                "border-bottom-width": "0",
                height: "100px",
                overflow: "hidden"
            })
        }), s = c(i), i.each(function() {
            var t = l(this);
            t.attr("style", t.data("style-cache") || "")
        })), l.each(s, function(t, e) {
            var i = l(e),
                n = 0;
            if (o.target) n = o.target.outerHeight(!1);
            else {
                if (o.byRow && i.length <= 1) return void i.css(o.property, "");
                i.each(function() {
                    var t = l(this),
                        e = t.attr("style"),
                        i = t.css("display");
                    "inline-block" !== i && "flex" !== i && "inline-flex" !== i && (i = "block");
                    var s = {
                        display: i
                    };
                    s[o.property] = "", t.css(s), t.outerHeight(!1) > n && (n = t.outerHeight(!1)), e ? t.attr("style", e) : t.css("display", "")
                })
            }
            i.each(function() {
                var t = l(this),
                    e = 0;
                o.target && t.is(o.target) || ("border-box" !== t.css("box-sizing") && (e += h(t.css("border-top-width")) + h(t.css("border-bottom-width")), e += h(t.css("padding-top")) + h(t.css("padding-bottom"))), t.css(o.property, n - e + "px"))
            })
        }), a.each(function() {
            var t = l(this);
            t.attr("style", t.data("style-cache") || null)
        }), u._maintainScroll && l(window).scrollTop(n / r * l("html").outerHeight(!0)), this
    }, u._applyDataApi = function() {
        var i = {};
        l("[data-match-height], [data-mh]").each(function() {
            var t = l(this),
                e = t.attr("data-mh") || t.attr("data-match-height");
            i[e] = e in i ? i[e].add(t) : t
        }), l.each(i, function() {
            this.matchHeight(!0)
        })
    };
    var o = function(t) {
        u._beforeUpdate && u._beforeUpdate(t, u._groups), l.each(u._groups, function() {
            u._apply(this.elements, this.options)
        }), u._afterUpdate && u._afterUpdate(t, u._groups)
    };
    u._update = function(t, e) {
        if (e && "resize" === e.type) {
            var i = l(window).width();
            if (i === s) return;
            s = i
        }
        t ? -1 === n && (n = setTimeout(function() {
            o(e), n = -1
        }, u._throttle)) : o(e)
    }, l(u._applyDataApi), l(window).bind("load", function(t) {
        u._update(!1, t)
    }), l(window).bind("resize orientationchange", function(t) {
        u._update(!0, t)
    })
}),
function(e, t) {
    "use strict";

    function i(t) {
        this.options = e.extend({
            closer: ".close-popup",
            loadingClass: "loading",
            activeClass: "popup-active",
            page: "html",
            popupHolder: ".popup-container",
            videoHolder: ".video",
            videoWidth: 1170,
            videoHeight: 660,
            animSpeed: 1e3
        }, t), this.init()
    }
    i.prototype = {
        init: function() {
            this.findElements(), this.attachEvents()
        },
        findElements: function() {
            this.opener = e(this.options.opener), this.videoSrc = this.opener.attr("href").replace(/^#/, ""), this.page = e(this.options.page), this.popupHolder = e(this.options.popupHolder), this.videoHolder = this.popupHolder.find(this.options.videoHolder), this.video = null
        },
        attachEvents: function() {
            var e = this;
            this.opener.on("click", function(t) {
                t.preventDefault(), e.showPopup()
            }), this.popupHolder.on("click", this.options.closer, function(t) {
                t.preventDefault(), e.hidePopup()
            }), t.on("resize orientationchange", function() {
                e.resizeHandler()
            })
        },
        resizeHandler: function() {
            var t = Math.min(this.options.videoHeight, this.popupHolder.height(), .5 * this.popupHolder.outerWidth());
            this.video && this.video.setSize("100%", t)
        },
        showPopup: function() {
            var e = this;
            this.page.addClass(this.options.activeClass), this.popupHolder.addClass(this.options.loadingClass);
            var i = new YT.Player("player", {
                height: e.options.videoHeight,
                width: "100%",
                videoId: this.videoSrc,
                playerVars: {
                    autoplay: 1,
                    cc_load_policy: 0
                },
                events: {
                    onReady: function(t) {
                        e.video = i, e.resizeHandler(), e.popupHolder.removeClass(e.options.loadingClass)
                    }
                }
            })
        },
        hidePopup: function() {
            null !== this.video && (this.video.pauseVideo(), this.video.destroy()), this.page.removeClass(this.options.activeClass), this.video = null, this.videoHolder.empty()
        },
        makeCallback: function(t) {
            if ("function" == typeof this.options[t]) {
                var e = Array.prototype.slice.call(arguments);
                e.shift(), this.options[t].apply(this, e)
            }
        },
        destroy: function() {}
    }, e.fn.videoPopup = function(t) {
        return this.each(function() {
            e(this).data("VideoPopup", new i(e.extend(t, {
                opener: this
            })))
        })
    }
}(jQuery, jQuery(window)),
function(o, i) {
    "use strict";

    function e(t) {
        this.options = o.extend({}, t), this.init()
    }
    e.prototype = {
        init: function() {
            this.findElements(), this.attachEvents()
        },
        findElements: function() {
            this.holder = o(this.options.holder), this.playerID = this.getRandomId(), this.playerHolder = o('<div id="' + this.playerID + '" class="bg-video" />').appendTo(this.holder), this.playerData = this.holder.data("video"), this.videoRatio = this.playerData.width / this.playerData.height, this.player = null
        },
        getRandomId: function() {
            var t = function() {
                return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
            };
            return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
        },
        resizeVideo: function() {
            var t, e, i, s = this,
                n = (t = {
                    ratio: this.videoRatio,
                    maskWidth: this.holder.outerWidth(),
                    maskHeight: this.holder.outerHeight()
                }, e = t.maskWidth, (i = e / s.videoRatio) < t.maskHeight && (e = (i = t.maskHeight) * s.videoRatio), {
                    width: e,
                    height: i
                });
            o(this.player.a).css(n)
        },
        attachEvents: function() {
            var e = this;
            this.player = new YT.Player(this.playerID, {
                height: "100%",
                width: "100%",
                playerVars: {
                    autoplay: 0,
                    controls: 0,
                    autohide: 1,
                    wmode: "opaque",
                    showinfo: 0,
                    loop: 1,
                    mute: 1,
                    start: this.playerData.start,
                    end: this.playerData.end,
                    playlist: this.playerData.id
                },
                videoId: this.playerData.id,
                events: {
                    onReady: function(t) {
                        e.player.mute(), e.resizeVideo(), i.on("resize", function() {
                            e.resizeVideo()
                        }), e.makeCallback("onReady", e)
                    },
                    onStateChange: function() {}
                }
            })
        },
        makeCallback: function(t) {
            if ("function" == typeof this.options[t]) {
                var e = Array.prototype.slice.call(arguments);
                e.shift(), this.options[t].apply(this, e)
            }
        },
        destroy: function() {}
    }, o.fn.youtubePlayer = function(t) {
        return this.each(function() {
            o(this).data("YoutubePlayer", new e(o.extend(t, {
                holder: this
            })))
        })
    }
}(jQuery, jQuery(window)),
function(e, o) {
    "use strict";

    function i(t) {
        this.options = e.extend({
            activeClass: "on-scroll",
            steps: ".steps",
            line: ".line",
            startItem: ".story-symbol",
            turnWidth: 50,
            onceMode: !1
        }, t), this.init()
    }
    i.prototype = {
        init: function() {
            this.findElements(), this.attachEvents()
        },
        findElements: function() {
            this.holder = e(this.options.holder), this.steps = this.holder.find(this.options.steps), this.startItem = this.holder.find(this.options.startItem), this.line = this.holder.find(this.options.line), this.path = this.line.children("path")
        },
        drawLine: function() {
            var h = this;
            this.holderData = {
                x: this.holder.offset().left,
                y: this.holder.offset().top,
                w: this.holder.outerWidth(),
                h: this.holder.outerHeight()
            };
            var c, d = function(t) {
                    return t.offset().left - h.holderData.x
                },
                u = function(t) {
                    return t.offset().top - h.holderData.y
                };
            this.line.attr("width", h.holderData.width).attr("height", h.holderData.height), this.path.attr("d", (c = "M" + (d(h.startItem) + h.startItem.outerWidth() / 2) + "," + (u(h.startItem) + h.startItem.outerHeight()), h.steps.each(function(t) {
                var e = jQuery(this),
                    i = 0 === t,
                    s = t === h.steps.length - 1,
                    n = t % 2,
                    o = e.outerWidth() - 2,
                    r = e.outerHeight(),
                    a = Math.ceil(d(e) + 1),
                    l = Math.ceil(u(e));
                i && (c += "L" + (a + o / 2) + "," + (l - h.options.turnWidth), c += "Q" + (a + o / 2) + "," + l + " " + (a + o / 2 - h.options.turnWidth) + "," + l, c += "L" + (a + h.options.turnWidth) + "," + l, c += "Q" + a + "," + l + " " + a + "," + (l + h.options.turnWidth)), n ? (c += "L" + (a + o) + "," + (l + r - h.options.turnWidth), c += "Q" + (a + o) + "," + (l + r) + "," + (a + o - h.options.turnWidth) + "," + (l + r), s || (c += "L" + (a + h.options.turnWidth) + "," + (l + r), c += "Q" + a + "," + (l + r) + " " + a + "," + (l + r + h.options.turnWidth))) : (c += "L" + a + "," + (l + r - h.options.turnWidth), c += "Q" + a + "," + (l + r) + " " + (a + h.options.turnWidth) + "," + (l + r), s || (c += "L" + (a + o - h.options.turnWidth) + "," + (l + r), c += "Q" + (a + o) + "," + (l + r) + " " + (a + o) + "," + (l + r + h.options.turnWidth))), s && (c += n ? "L" + (a + o / 2 + h.options.turnWidth) + "," + (l + r) : "L" + (a + o / 2 - h.options.turnWidth) + "," + (l + r), c += "Q" + (a + o / 2) + "," + (l + r) + "," + (a + o / 2) + "," + (l + r + h.options.turnWidth), c += "L" + (a + o / 2) + "," + h.holderData.h)
            }), c))
        },
        attachEvents: function() {
            var s = this,
                n = function() {
                    var t = e(this);
                    o.scrollTop() + .6 * o.height() > t.offset().top ? t.addClass(s.options.activeClass) : s.options.onceMode || t.removeClass(s.options.activeClass)
                };
            this.resizeHandler = function() {
                s.drawLine(), s.scrollHandler()
            }, this.scrollHandler = function() {
                s.steps.each(n), s.prevScrollPercentage || (s.prevScrollPercentage = 0);
                var t = s.path[0].getTotalLength();
                if (0 !== t) {
                    var e = Math.min(1, Math.max(0, o.scrollTop() + o.height() / 2 + 200 - s.holderData.y) / s.holderData.h),
                        i = t * e;
                    s.path[0].style.strokeDashoffset = t - i, s.options.onceMode && (e < s.prevScrollPercentage && (e = s.prevScrollPercentage), s.prevScrollPercentage = e), s.path[0].style.strokeDasharray = .99 <= e ? "none" : t + " " + t
                }
            }, this.resizeHandler(), o.on({
                scroll: s.scrollHandler,
                resize: s.resizeHandler,
                orientationchange: s.resizeHandler,
                load: s.resizeHandler
            })
        },
        makeCallback: function(t) {
            if ("function" == typeof this.options[t]) {
                var e = Array.prototype.slice.call(arguments);
                e.shift(), this.options[t].apply(this, e)
            }
        },
        destroy: function() {}
    }, e.fn.lineSVG = function(t) {
        return this.each(function() {
            e(this).data("LineSVG", new i(e.extend(t, {
                holder: this
            })))
        })
    }
}(jQuery, jQuery(window));
var ImageStretcher = {
    getDimensions: function(t) {
        var e = t.imageRatio || t.imageWidth / t.imageHeight,
            i = t.maskWidth,
            s = i / e;
        return s < t.maskHeight && (i = (s = t.maskHeight) * e), {
            width: i,
            height: s,
            top: (t.maskHeight - s) / 2,
            left: (t.maskWidth - i) / 2
        }
    },
    getRatio: function(t) {
        if (t.prop("naturalWidth")) return t.prop("naturalWidth") / t.prop("naturalHeight");
        var e = new Image;
        return e.src = t.prop("src"), e.width / e.height
    },
    imageLoaded: function(t, e) {
        var i = this,
            s = function() {
                e.call(i)
            };
        t.prop("complete") ? s() : t.one("load", s)
    },
    resizeHandler: function() {
        var i = this;
        jQuery.each(this.imgList, function(t, e) {
            e.image.prop("complete") && i.resizeImage(e.image, e.container)
        })
    },
    resizeImage: function(e, i) {
        this.imageLoaded(e, function() {
            var t = this.getDimensions({
                imageRatio: this.getRatio(e),
                maskWidth: i.width(),
                maskHeight: i.height()
            });
            e.css({
                width: t.width,
                height: t.height,
                marginTop: t.top,
                marginLeft: t.left
            })
        })
    },
    add: function(t) {
        var e = jQuery(t.container ? t.container : window),
            i = "string" == typeof t.image ? e.find(t.image) : jQuery(t.image);
        this.resizeImage(i, e), this.win || (this.resizeHandler = jQuery.proxy(this.resizeHandler, this), this.imgList = [], this.win = jQuery(window), this.win.on("resize orientationchange", this.resizeHandler)), this.imgList.push({
            container: e,
            image: i
        })
    }
};

function TinyFilter() {
    "use strict";
    jQuery.expr[":"].contains = jQuery.expr.createPseudo(function(e) {
        return function(t) {
            return 0 <= jQuery(t).text().toUpperCase().indexOf(e.toUpperCase())
        }
    });
    var n = this;
    this.filter = {}, this.default_options = {
        filter_class: "is-filter",
        content_class: "filter-content",
        search_type: "loose"
    }, this.init = function(t) {
        n.options = jQuery.extend({}, n.default_options, t), n.start()
    }, this.start = function() {
        jQuery("select." + n.options.filter_class + ", ." + n.options.filter_class + ":checkbox").change(n.refresh), jQuery("." + n.options.filter_class + ":input:not(:checkbox)").keyup(n.refresh)
    }, this.refresh = function() {
        jQuery("." + n.options.filter_class).each(function() {
            var t = "checkbox" != this.type.toLowerCase() || this.checked ? this.value.toLowerCase() : "";
            n.set_filter(this.id, t, this.tagName, this.type.toLowerCase())
        }), n.run()
    }, this.reset = function() {
        n.filter = {}, jQuery("." + n.options.filter_class + ":not(:checkbox)").val(""), jQuery("." + n.options.filter_class + ":checkbox").attr("checked", !1), jQuery("." + n.options.content_class).removeClass("hidden")
    }, this.set_filter = function(t, e, i, s) {
        e ? "SELECT" == i || "INPUT" == i && "checkbox" == s ? n.filter[t] = e : n.filter[i] = "loose" == n.options.search_type ? e.split(" ") : e : "SELECT" == i || "INPUT" == i && "checkbox" == s ? delete n.filter[t] : delete n.filter[i]
    }, this.run = function() {
        for (var t in jQuery("." + n.options.content_class).removeClass("hidden"), n.filter)
            if ("INPUT" != t && "TEXTAREA" != t) jQuery("." + n.options.content_class + ':not([data-target*="' + n.filter[t] + '"])').addClass("hidden");
            else if ("loose" == n.options.search_type)
            for (var e in n.filter[t]) jQuery("." + n.options.content_class + ':not(:contains("' + n.filter[t][e] + '"))').addClass("hidden");
        else jQuery("." + n.options.content_class + ':not(:contains("' + n.filter[t] + '"))').addClass("hidden")
    }
}! function(l) {
    "use strict";
    var o = {},
        r = {
            "2x": ["(-webkit-min-device-pixel-ratio: 1.5)", "(min-resolution: 192dpi)", "(min-device-pixel-ratio: 1.5)", "(min-resolution: 1.5dppx)"],
            "3x": ["(-webkit-min-device-pixel-ratio: 3)", "(min-resolution: 384dpi)", "(min-device-pixel-ratio: 3)", "(min-resolution: 3dppx)"]
        };

    function h(t, i, e) {
        var s = r[t[1]].slice(),
            n = s,
            o = c(e, t[0]);
        "default" !== i && (n = l.map(s, function(t, e) {
            return t + " and " + i
        })), d(i = n.join(","), o)
    }

    function c(t, e) {
        return "#" + t + '{background-image: url("' + e + '");}'
    }

    function d(t, e) {
        var i, s = o[t],
            n = "";
        n = "default" === t ? e + " " : "@media " + t + "{" + e + "}", s ? (i = (i = s.text()).substring(0, i.length - 2) + " }" + e + "}", s.text(i)) : o[t] = l("<style>").text(n).appendTo("head")
    }
    l.fn.retinaCover = function() {
        return this.each(function() {
            var t = l(this),
                e = t.children("[data-srcset]"),
                a = "bg-stretch" + Date.now() + (1e3 * Math.random()).toFixed(0);
            e.length && (t.attr("id", a), e.each(function() {
                var t, e, i, s = l(this),
                    n = s.data("srcset").split(", "),
                    o = s.data("media") || "default",
                    r = n.length;
                for (e = 0; e < r; e++) 1 === (t = n[e].split(" ")).length ? (i = t[0], d(o, c(a, i))) : h(t, o, a)
            })), e.detach()
        })
    }
}(jQuery),
function(e) {
    e.fn.slideAccordion = function(t) {
        var r = e.extend({
            addClassBeforeAnimation: !1,
            allowClickWhenExpanded: !1,
            activeClass: "active",
            opener: ".opener",
            slider: ".slide",
            animSpeed: 300,
            collapsible: !0,
            event: "click",
            onShow: function() {}
        }, t);
        return this.each(function() {
            var n = e(this),
                o = n.find(":has(" + r.slider + ")"),
                t = function(t) {
                    var e, i, s = jQuery(t.target);
                    s.is(n) || s.closest(n).length || (e = o.filter("." + r.activeClass), i = e.find(r.slider), e.length && e.hasClass(r.activeClass) && (e.removeClass(r.activeClass), i.slideUp(r.animSpeed, function() {
                        l(i)
                    })))
                };
            jQuery(document).on("click", t), jQuery(document).on("mousemove", t), o.each(function() {
                var s = e(this),
                    t = s.find(r.opener),
                    n = s.find(r.slider);
                t.bind(r.event, function(t) {
                    if (!n.is(":animated"))
                        if (s.hasClass(r.activeClass)) {
                            if (r.allowClickWhenExpanded) return;
                            r.collapsible && n.slideUp(r.animSpeed, function() {
                                l(n), s.removeClass(r.activeClass)
                            })
                        } else {
                            var e = s.siblings("." + r.activeClass),
                                i = e.find(r.slider);
                            s.addClass(r.activeClass), a(n).hide().slideDown(r.animSpeed, function() {
                                r.onShow(s)
                            }), i.slideUp(r.animSpeed, function() {
                                e.removeClass(r.activeClass), l(i)
                            })
                        }
                    t.preventDefault()
                }), s.hasClass(r.activeClass) ? a(n) : l(n)
            })
        })
    };
    var a = function(t) {
            return t.css({
                position: "",
                top: "",
                left: "",
                width: ""
            })
        },
        l = function(t) {
            return t.show().css({
                position: "absolute",
                top: -9999,
                left: -9999,
                width: t.width()
            })
        }
}(jQuery),
function(s) {
    function e(t) {
        this.options = s.extend({
            activeClass: "active",
            mask: "div.slides-mask",
            slider: ">ul",
            slides: ">li",
            btnPrev: ".btn-prev",
            btnNext: ".btn-next",
            pagerLinks: "ul.pager > li",
            generatePagination: !1,
            pagerList: "<ul>",
            pagerListItem: '<li><a href="#"></a></li>',
            pagerListItemText: "a",
            galleryReadyClass: "gallery-js-ready",
            currentNumber: "span.current-num",
            totalNumber: "span.total-num",
            maskAutoSize: !1,
            autoRotation: !1,
            pauseOnHover: !1,
            stretchSlideToMask: !1,
            switchTime: 3e3,
            animSpeed: 500,
            handleTouch: !0,
            swipeThreshold: 15,
            vertical: !1
        }, t), this.init()
    }
    e.prototype = {
        init: function() {
            this.options.holder && (this.findElements(), this.attachEvents(), this.makeCallback("onInit", this))
        },
        findElements: function() {
            this.holder = s(this.options.holder).addClass(this.options.galleryReadyClass), this.mask = this.holder.find(this.options.mask), this.slider = this.mask.find(this.options.slider), this.slides = this.slider.find(this.options.slides), this.btnPrev = this.holder.find(this.options.btnPrev), this.btnNext = this.holder.find(this.options.btnNext), this.currentNumber = this.holder.find(this.options.currentNumber), this.totalNumber = this.holder.find(this.options.totalNumber), "string" == typeof this.options.generatePagination ? this.pagerLinks = this.buildPagination() : this.pagerLinks = this.holder.find(this.options.pagerLinks), this.sizeProperty = this.options.vertical ? "height" : "width", this.positionProperty = this.options.vertical ? "top" : "left", this.animProperty = this.options.vertical ? "marginTop" : "marginLeft", this.slideSize = this.slides[this.sizeProperty](), this.currentIndex = 0, this.prevIndex = 0, this.options.maskAutoSize = !this.options.vertical && this.options.maskAutoSize, this.options.vertical && this.mask.css({
                height: this.slides.innerHeight()
            }), this.options.maskAutoSize && this.mask.css({
                height: this.slider.height()
            }), this.slider.css({
                position: "relative",
                height: this.options.vertical ? this.slideSize * this.slides.length : "100%"
            }), this.slides.css({
                position: "absolute"
            }).css(this.positionProperty, -9999).eq(this.currentIndex).css(this.positionProperty, 0), this.refreshState()
        },
        buildPagination: function() {
            var t = s();
            if (this.pagerHolder || (this.pagerHolder = this.holder.find(this.options.generatePagination)), this.pagerHolder.length) {
                this.pagerHolder.empty(), this.pagerList = s(this.options.pagerList).appendTo(this.pagerHolder);
                for (var e = 0; e < this.slides.length; e++) s(this.options.pagerListItem).appendTo(this.pagerList).find(this.options.pagerListItemText).text(e + 1);
                t = this.pagerList.children()
            }
            return t
        },
        attachEvents: function() {
            var i = this;
            this.btnPrev.length && (this.btnPrevHandler = function(t) {
                t.preventDefault(), i.prevSlide()
            }, this.btnPrev.click(this.btnPrevHandler)), this.btnNext.length && (this.btnNextHandler = function(t) {
                t.preventDefault(), i.nextSlide()
            }, this.btnNext.click(this.btnNextHandler)), this.pagerLinks.length && (this.pagerLinksHandler = function(t) {
                t.preventDefault(), i.numSlide(i.pagerLinks.index(t.currentTarget))
            }, this.pagerLinks.click(this.pagerLinksHandler)), this.options.pauseOnHover && (this.hoverHandler = function() {
                clearTimeout(i.timer)
            }, this.leaveHandler = function() {
                i.autoRotate()
            }, this.holder.bind({
                mouseenter: this.hoverHandler,
                mouseleave: this.leaveHandler
            })), this.resizeHandler = function() {
                i.animating || (i.options.stretchSlideToMask && i.resizeSlides(), i.resizeHolder(), i.setSlidesPosition(i.currentIndex))
            }, s(window).bind("load resize orientationchange", this.resizeHandler), i.options.stretchSlideToMask && i.resizeSlides(), this.options.handleTouch && window.Hammer && this.mask.length && 1 < this.slides.length && window.isTouchDevice && (this.swipeHandler = new Hammer.Manager(this.mask[0]), this.swipeHandler.add(new Hammer.Pan({
                direction: i.options.vertical ? Hammer.DIRECTION_VERTICAL : Hammer.DIRECTION_HORIZONTAL,
                threshold: i.options.swipeThreshold
            })), this.swipeHandler.on("panstart", function() {
                i.animating ? i.swipeHandler.stop() : clearTimeout(i.timer)
            }).on("panmove", function(t) {
                i.swipeOffset = -i.slideSize + t[i.options.vertical ? "deltaY" : "deltaX"], i.slider.css(i.animProperty, i.swipeOffset), clearTimeout(i.timer)
            }).on("panend", function(t) {
                if (t.distance > i.options.swipeThreshold) t.offsetDirection === Hammer.DIRECTION_RIGHT || t.offsetDirection === Hammer.DIRECTION_DOWN ? i.nextSlide() : i.prevSlide();
                else {
                    var e = {};
                    e[i.animProperty] = -i.slideSize, i.slider.animate(e, {
                        duration: i.options.animSpeed
                    }), i.autoRotate()
                }
                i.swipeOffset = 0
            })), this.autoRotate(), this.resizeHolder(), this.setSlidesPosition(this.currentIndex)
        },
        resizeSlides: function() {
            this.slideSize = this.mask[this.options.vertical ? "height" : "width"](), this.slides.css(this.sizeProperty, this.slideSize)
        },
        resizeHolder: function() {
            this.options.maskAutoSize && this.mask.css({
                height: this.slides.eq(this.currentIndex).outerHeight(!0)
            })
        },
        prevSlide: function() {
            !this.animating && 1 < this.slides.length && (this.direction = -1, this.prevIndex = this.currentIndex, 0 < this.currentIndex ? this.currentIndex-- : this.currentIndex = this.slides.length - 1, this.switchSlide())
        },
        nextSlide: function(t) {
            !this.animating && 1 < this.slides.length && (this.direction = 1, this.prevIndex = this.currentIndex, this.currentIndex < this.slides.length - 1 ? this.currentIndex++ : this.currentIndex = 0, this.switchSlide())
        },
        numSlide: function(t) {
            !this.animating && this.currentIndex !== t && 1 < this.slides.length && (this.direction = t > this.currentIndex ? 1 : -1, this.prevIndex = this.currentIndex, this.currentIndex = t, this.switchSlide())
        },
        preparePosition: function() {
            this.setSlidesPosition(this.prevIndex, this.direction < 0 ? this.currentIndex : null, 0 < this.direction ? this.currentIndex : null, this.direction)
        },
        setSlidesPosition: function(t, e, i, s) {
            if (1 < this.slides.length) {
                var n = "number" == typeof e ? e : 0 < t ? t - 1 : this.slides.length - 1,
                    o = "number" == typeof i ? i : t < this.slides.length - 1 ? t + 1 : 0;
                if (this.slider.css(this.animProperty, this.swipeOffset ? this.swipeOffset : -this.slideSize), this.slides.css(this.positionProperty, -9999).eq(t).css(this.positionProperty, this.slideSize), n === o && "number" == typeof s) {
                    var r = 0 < s ? 2 * this.slideSize : 0;
                    this.slides.eq(o).css(this.positionProperty, r)
                } else this.slides.eq(n).css(this.positionProperty, 0), this.slides.eq(o).css(this.positionProperty, 2 * this.slideSize)
            }
        },
        switchSlide: function() {
            var t = this,
                e = (this.slides.eq(this.prevIndex), this.slides.eq(this.currentIndex));
            this.animating = !0, this.options.maskAutoSize && this.mask.animate({
                height: e.outerHeight(!0)
            }, {
                duration: this.options.animSpeed
            });
            var i = {};
            i[this.animProperty] = 0 < this.direction ? 2 * -this.slideSize : 0, this.preparePosition(), this.slider.animate(i, {
                duration: this.options.animSpeed,
                complete: function() {
                    t.setSlidesPosition(t.currentIndex), t.animating = !1, t.autoRotate(), t.makeCallback("onChange", t)
                }
            }), this.refreshState(), this.makeCallback("onBeforeChange", this)
        },
        refreshState: function(t) {
            this.slides.removeClass(this.options.activeClass).eq(this.currentIndex).addClass(this.options.activeClass), this.pagerLinks.removeClass(this.options.activeClass).eq(this.currentIndex).addClass(this.options.activeClass), this.currentNumber.html(this.currentIndex + 1), this.totalNumber.html(this.slides.length), this.holder.toggleClass("not-enough-slides", 1 === this.slides.length)
        },
        autoRotate: function() {
            var t = this;
            clearTimeout(this.timer), this.options.autoRotation && (this.timer = setTimeout(function() {
                t.nextSlide()
            }, this.options.switchTime))
        },
        makeCallback: function(t) {
            if ("function" == typeof this.options[t]) {
                var e = Array.prototype.slice.call(arguments);
                e.shift(), this.options[t].apply(this, e)
            }
        },
        destroy: function() {
            this.btnPrev.unbind("click", this.btnPrevHandler), this.btnNext.unbind("click", this.btnNextHandler), this.pagerLinks.unbind("click", this.pagerLinksHandler), this.holder.unbind("mouseenter", this.hoverHandler), this.holder.unbind("mouseleave", this.leaveHandler), s(window).unbind("load resize orientationchange", this.resizeHandler), clearTimeout(this.timer), this.swipeHandler && this.swipeHandler.destroy(), this.holder.removeClass(this.options.galleryReadyClass), this.slider.add(this.slides).removeAttr("style"), "string" == typeof this.options.generatePagination && this.pagerHolder.empty()
        }
    }, s.fn.scrollAbsoluteGallery = function(t) {
        return this.each(function() {
            s(this).data("ScrollAbsoluteGallery", new e(s.extend(t, {
                holder: this
            })))
        })
    }
}(jQuery),
function(s) {
    function e(t) {
        this.options = s.extend({
            addClassBeforeAnimation: !0,
            hideOnClickOutside: !1,
            activeClass: "active",
            opener: ".opener",
            slider: ".slide",
            animSpeed: 400,
            effect: "fade",
            event: "click"
        }, t), this.init(this)
    }
    e.prototype = {
        init: function() {
            this.options.holder && (this.findElements(), this.attachEvents(), this.makeCallback("onInit", this))
        },
        findElements: function() {
            this.holder = s(this.options.holder), this.opener = this.holder.find(this.options.opener), this.slider = this.holder.find(this.options.slider)
        },
        attachEvents: function() {
            var i = this;
            this.eventHandler = function(t) {
                t.preventDefault(), i.slider.hasClass(n) ? i.showSlide() : i.hideSlide()
            }, i.opener.bind(i.options.event, this.eventHandler), "over" === i.options.event && (i.opener.bind("mouseenter", function() {
                i.holder.hasClass(i.options.activeClass) || i.showSlide()
            }), i.holder.bind("mouseleave", function() {
                i.hideSlide()
            })), i.outsideClickHandler = function(t) {
                if (i.options.hideOnClickOutside) {
                    var e = s(t.target);
                    e.is(i.holder) || e.closest(i.holder).length || i.hideSlide()
                }
            }, this.holder.hasClass(this.options.activeClass) ? s(document).bind("click touchstart", i.outsideClickHandler) : this.slider.addClass(n)
        },
        showSlide: function() {
            var t = this;
            t.options.addClassBeforeAnimation && t.holder.addClass(t.options.activeClass), t.slider.removeClass(n), s(document).bind("click touchstart", t.outsideClickHandler), t.makeCallback("animStart", t, !0), o[t.options.effect].show({
                box: t.slider,
                speed: t.options.animSpeed,
                complete: function() {
                    t.options.addClassBeforeAnimation || t.holder.addClass(t.options.activeClass), t.makeCallback("animEnd", t, !0)
                }
            })
        },
        hideSlide: function() {
            var t = this;
            t.options.addClassBeforeAnimation && t.holder.removeClass(t.options.activeClass), s(document).unbind("click touchstart", t.outsideClickHandler), t.makeCallback("animStart", t, !1), o[t.options.effect].hide({
                box: t.slider,
                speed: t.options.animSpeed,
                complete: function() {
                    t.options.addClassBeforeAnimation || t.holder.removeClass(t.options.activeClass), t.slider.addClass(n), t.makeCallback("animEnd", t, !1)
                }
            })
        },
        destroy: function() {
            this.slider.removeClass(n).css({
                display: ""
            }), this.opener.unbind(this.options.event, this.eventHandler), this.holder.removeClass(this.options.activeClass).removeData("OpenClose"), s(document).unbind("click touchstart", this.outsideClickHandler)
        },
        makeCallback: function(t) {
            if ("function" == typeof this.options[t]) {
                var e = Array.prototype.slice.call(arguments);
                e.shift(), this.options[t].apply(this, e)
            }
        }
    };
    var t, i, n = "js-slide-hidden";
    t = s('<style type="text/css">')[0], i = "." + n, i += "{position:absolute !important;left:-9999px !important;top:-9999px !important;display:block !important}", t.styleSheet ? t.styleSheet.cssText = i : t.appendChild(document.createTextNode(i)), s("head").append(t);
    var o = {
        slide: {
            show: function(t) {
                t.box.stop(!0).hide().slideDown(t.speed, t.complete)
            },
            hide: function(t) {
                t.box.stop(!0).slideUp(t.speed, t.complete)
            }
        },
        fade: {
            show: function(t) {
                t.box.stop(!0).hide().fadeIn(t.speed, t.complete)
            },
            hide: function(t) {
                t.box.stop(!0).fadeOut(t.speed, t.complete)
            }
        },
        none: {
            show: function(t) {
                t.box.hide().show(0, t.complete)
            },
            hide: function(t) {
                t.box.hide(0, t.complete)
            }
        }
    };
    s.fn.openClose = function(t) {
        return this.each(function() {
            jQuery(this).data("OpenClose", new e(s.extend(t, {
                holder: this
            })))
        })
    }
}(jQuery),
function(r) {
    function i(t) {
        this.options = r.extend({
            container: null,
            hideOnClickOutside: !1,
            menuActiveClass: "nav-active",
            menuOpener: ".nav-opener",
            menuDrop: ".nav-drop",
            toggleEvent: "click",
            outsideClickEvent: "click touchstart pointerdown MSPointerDown"
        }, t), this.initStructure(), this.attachEvents()
    }
    i.prototype = {
        initStructure: function() {
            this.page = r("html"), this.container = r(this.options.container), this.opener = this.container.find(this.options.menuOpener), this.drop = this.container.find(this.options.menuDrop)
        },
        attachEvents: function() {
            var i = this;
            t && (t(), t = null), this.outsideClickHandler = function(t) {
                if (i.isOpened()) {
                    var e = r(t.target);
                    e.closest(i.opener).length || e.closest(i.drop).length || i.hide()
                }
            }, this.openerClickHandler = function(t) {
                t.preventDefault(), i.toggle()
            }, this.opener.on(this.options.toggleEvent, this.openerClickHandler)
        },
        isOpened: function() {
            return this.container.hasClass(this.options.menuActiveClass)
        },
        show: function() {
            this.container.addClass(this.options.menuActiveClass), this.options.hideOnClickOutside && this.page.on(this.options.outsideClickEvent, this.outsideClickHandler)
        },
        hide: function() {
            this.container.removeClass(this.options.menuActiveClass), this.options.hideOnClickOutside && this.page.off(this.options.outsideClickEvent, this.outsideClickHandler)
        },
        toggle: function() {
            this.isOpened() ? this.hide() : this.show()
        },
        destroy: function() {
            this.container.removeClass(this.options.menuActiveClass), this.opener.off(this.options.toggleEvent, this.clickHandler), this.page.off(this.options.outsideClickEvent, this.outsideClickHandler)
        }
    };
    var t = function() {
        var t, e, i = r(window),
            s = r("html"),
            n = "resize-active",
            o = function() {
                t = !1, s.removeClass(n)
            };
        i.on("resize orientationchange", function() {
            t || (t = !0, s.addClass(n)), clearTimeout(e), e = setTimeout(o, 500)
        })
    };
    r.fn.mobileNav = function(e) {
        return this.each(function() {
            var t = new i(r.extend({}, e, {
                container: this
            }));
            r.data(this, "MobileNav", t)
        })
    }
}(jQuery),
function(c, t) {
    var n, o, r, d = c(window),
        a = "onwheel" in document || 9 <= document.documentMode ? "wheel" : "mousewheel DOMMouseScroll";

    function s(t, e, i) {
        var s;
        document.body && (e = "number" == typeof e ? {
            duration: e
        } : e || {}, n = n || c("html, body"), s = e.container || n, "number" == typeof t && (t = {
            top: t
        }), o && r && o.off(a, r), e.wheelBehavior && "none" !== e.wheelBehavior && (r = function(t) {
            "stop" === e.wheelBehavior ? (s.off(a, r), s.stop()) : "ignore" === e.wheelBehavior && t.preventDefault()
        }, o = s.on(a, r)), s.stop().animate({
            scrollLeft: t.left,
            scrollTop: t.top
        }, e.duration, function() {
            r && s.off(a, r), c.isFunction(i) && i()
        }))
    }

    function e(t) {
        this.options = c.extend({
            anchorLinks: 'a[href^="#"]',
            container: null,
            extraOffset: null,
            activeClasses: null,
            easing: "swing",
            animMode: "duration",
            animDuration: 800,
            animSpeed: 1500,
            anchorActiveClass: "anchor-active",
            sectionActiveClass: "section-active",
            wheelBehavior: "stop",
            useNativeAnchorScrolling: !1
        }, t), this.init()
    }
    e.prototype = {
        init: function() {
            this.initStructure(), this.attachEvents()
        },
        initStructure: function() {
            this.container = this.options.container ? c(this.options.container) : c("html,body"), this.scrollContainer = this.options.container ? this.container : d, this.anchorLinks = jQuery(this.options.anchorLinks).filter(function() {
                return document.getElementById(this.getAttribute("href").slice(1))
            })
        },
        getAnchorTarget: function(t) {
            var e = c(t).attr("href");
            return c(1 < e.length ? e : "html")
        },
        getTargetOffset: function(t) {
            var e = t.offset().top;
            return this.options.container && (e -= this.container.offset().top - this.container.prop("scrollTop")), "number" == typeof this.options.extraOffset ? e -= this.options.extraOffset : "function" == typeof this.options.extraOffset && (e -= this.options.extraOffset(t)), {
                top: e
            }
        },
        attachEvents: function() {
            var e = this;
            if (this.options.activeClasses && this.anchorLinks.length) {
                this.anchorData = [];
                for (var t = 0; t < this.anchorLinks.length; t++) {
                    var i, s = jQuery(this.anchorLinks[t]),
                        n = e.getAnchorTarget(s);
                    c.each(e.anchorData, function(t, e) {
                        e.block[0] === n[0] && (i = e)
                    }), i ? i.link = i.link.add(s) : e.anchorData.push({
                        link: s,
                        block: n
                    })
                }
                this.resizeHandler = function() {
                    e.recalculateOffsets()
                }, this.scrollHandler = function() {
                    e.refreshActiveClass()
                }, this.recalculateOffsets(), this.scrollContainer.on("scroll", this.scrollHandler), d.on("resize", this.resizeHandler)
            }
            this.clickHandler = function(t) {
                e.onClick(t)
            }, this.options.useNativeAnchorScrolling || this.anchorLinks.on("click", this.clickHandler)
        },
        recalculateOffsets: function() {
            var i = this;
            c.each(this.anchorData, function(t, e) {
                e.offset = i.getTargetOffset(e.block), e.height = e.block.outerHeight()
            }), this.refreshActiveClass()
        },
        refreshActiveClass: function() {
            var n = this,
                o = !1,
                r = this.container.prop("scrollHeight"),
                a = this.scrollContainer.height(),
                l = this.options.container ? this.container.prop("scrollTop") : d.scrollTop();

            function h(t, e, i) {
                t.toggleClass(n.options.anchorActiveClass, i), e.toggleClass(n.options.sectionActiveClass, i)
            }
            this.options.customScrollHandler ? this.options.customScrollHandler.call(this, l, this.anchorData) : (this.anchorData.sort(function(t, e) {
                return t.offset.top - e.offset.top
            }), c.each(this.anchorData, function(t) {
                var e = n.anchorData.length - t - 1,
                    i = n.anchorData[e],
                    s = "parent" === n.options.activeClasses ? i.link.parent() : i.link;
                r - a <= l ? e === n.anchorData.length - 1 ? h(s, i.block, !0) : h(s, i.block, !1) : !o && (l >= i.offset.top - 1 || 0 === e) ? (o = !0, h(s, i.block, !0)) : h(s, i.block, !1)
            }))
        },
        calculateScrollDuration: function(t) {
            return "speed" === this.options.animMode ? Math.abs(this.scrollContainer.scrollTop() - t.top) / this.options.animSpeed * 1e3 : this.options.animDuration
        },
        onClick: function(t) {
            var e = this.getAnchorTarget(t.currentTarget),
                i = this.getTargetOffset(e);
            t.preventDefault(), s(i, {
                container: this.container,
                wheelBehavior: this.options.wheelBehavior,
                duration: this.calculateScrollDuration(i)
            })
        },
        destroy: function() {
            this.options.activeClasses && (d.off("resize", this.resizeHandler), this.scrollContainer.off("scroll", this.scrollHandler)), this.anchorLinks.off("click", this.clickHandler)
        }
    }, c.extend(e, {
        scrollTo: function(t, e, i) {
            s(t, e, i)
        }
    }), t.SmoothScroll = e
}(jQuery, this), Object.create && function(t, a, e, b) {
    "use strict";

    function l(t, e, i) {
        return setTimeout(h(t, i), e)
    }

    function i(t, e, i) {
        return !!Array.isArray(t) && (n(t, i[e], i), !0)
    }

    function n(t, e, i) {
        var s;
        if (t)
            if (t.forEach) t.forEach(e, i);
            else if (t.length !== b)
            for (s = 0; s < t.length;) e.call(i, t[s], s, t), s++;
        else
            for (s in t) t.hasOwnProperty(s) && e.call(i, t[s], s, t)
    }

    function o(t, e, i) {
        for (var s = Object.keys(e), n = 0; n < s.length;)(!i || i && t[s[n]] === b) && (t[s[n]] = e[s[n]]), n++;
        return t
    }

    function s(t, e) {
        return o(t, e, !0)
    }

    function r(t, e, i) {
        var s, n = e.prototype;
        (s = t.prototype = Object.create(n)).constructor = t, s._super = n, i && o(s, i)
    }

    function h(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    }

    function c(t, e) {
        return typeof t == K ? t.apply(e && e[0] || b, e) : t
    }

    function d(t, e) {
        return t === b ? e : t
    }

    function u(e, t, i) {
        n(g(t), function(t) {
            e.addEventListener(t, i, !1)
        })
    }

    function p(e, t, i) {
        n(g(t), function(t) {
            e.removeEventListener(t, i, !1)
        })
    }

    function w(t, e) {
        for (; t;) {
            if (t == e) return !0;
            t = t.parentNode
        }
        return !1
    }

    function f(t, e) {
        return -1 < t.indexOf(e)
    }

    function g(t) {
        return t.trim().split(/\s+/g)
    }

    function m(t, e, i) {
        if (t.indexOf && !i) return t.indexOf(e);
        for (var s = 0; s < t.length;) {
            if (i && t[s][i] == e || !i && t[s] === e) return s;
            s++
        }
        return -1
    }

    function v(t) {
        return Array.prototype.slice.call(t, 0)
    }

    function y(t, i, e) {
        for (var s = [], n = [], o = 0; o < t.length;) {
            var r = i ? t[o][i] : t[o];
            m(n, r) < 0 && s.push(t[o]), n[o] = r, o++
        }
        return e && (s = i ? s.sort(function(t, e) {
            return t[i] > e[i]
        }) : s.sort()), s
    }

    function _(t, e) {
        for (var i, s, n = e[0].toUpperCase() + e.slice(1), o = 0; o < X.length;) {
            if ((s = (i = X[o]) ? i + n : e) in t) return s;
            o++
        }
        return b
    }

    function C(t) {
        var e = t.ownerDocument;
        return e.defaultView || e.parentWindow
    }

    function k(e, t) {
        var i = this;
        this.manager = e, this.callback = t, this.element = e.element, this.target = e.options.inputTarget, this.domHandler = function(t) {
            c(e.options.enable, [e]) && i.handler(t)
        }, this.init()
    }

    function x(t, e, i) {
        var s = i.pointers.length,
            n = i.changedPointers.length,
            o = e & lt && s - n == 0,
            r = e & (ht | ct) && s - n == 0;
        i.isFirst = !!o, i.isFinal = !!r, o && (t.session = {}), i.eventType = e,
            function(t, e) {
                var i = t.session,
                    s = e.pointers,
                    n = s.length;
                i.firstInput || (i.firstInput = T(e)), 1 < n && !i.firstMultiple ? i.firstMultiple = T(e) : 1 === n && (i.firstMultiple = !1);
                var o = i.firstInput,
                    r = i.firstMultiple,
                    a = r ? r.center : o.center,
                    l = e.center = S(s);
                e.timeStamp = tt(), e.deltaTime = e.timeStamp - o.timeStamp, e.angle = I(a, l), e.distance = E(a, l), p = i, f = e, g = f.center, m = p.offsetDelta || {}, v = p.prevDelta || {}, y = p.prevInput || {}, (f.eventType === lt || y.eventType === ht) && (v = p.prevDelta = {
                        x: y.deltaX || 0,
                        y: y.deltaY || 0
                    }, m = p.offsetDelta = {
                        x: g.x,
                        y: g.y
                    }), f.deltaX = v.x + (g.x - m.x), f.deltaY = v.y + (g.y - m.y), e.offsetDirection = j(e.deltaX, e.deltaY), e.scale = r ? (d = r.pointers, u = s, E(u[0], u[1], bt) / E(d[0], d[1], bt)) : 1, e.rotation = r ? (h = r.pointers, c = s, I(c[1], c[0], bt) - I(h[1], h[0], bt)) : 0,
                    function(t, e) {
                        var i, s, n, o, r = t.lastInterval || e,
                            a = e.timeStamp - r.timeStamp;
                        if (e.eventType != ct && (at < a || r.velocity === b)) {
                            var l = r.deltaX - e.deltaX,
                                h = r.deltaY - e.deltaY,
                                c = {
                                    x: l / (d = a) || 0,
                                    y: h / d || 0
                                };
                            s = c.x, n = c.y, i = Z(c.x) > Z(c.y) ? c.x : c.y, o = j(l, h), t.lastInterval = e
                        } else i = r.velocity, s = r.velocityX, n = r.velocityY, o = r.direction;
                        var d;
                        e.velocity = i, e.velocityX = s, e.velocityY = n, e.direction = o
                    }(i, e);
                var h, c;
                var d, u;
                var p, f, g, m, v, y;
                var _ = t.element;
                w(e.srcEvent.target, _) && (_ = e.srcEvent.target), e.target = _
            }(t, i), t.emit("hammer.input", i), t.recognize(i), t.session.prevInput = i
    }

    function T(t) {
        for (var e = [], i = 0; i < t.pointers.length;) e[i] = {
            clientX: J(t.pointers[i].clientX),
            clientY: J(t.pointers[i].clientY)
        }, i++;
        return {
            timeStamp: tt(),
            pointers: e,
            center: S(e),
            deltaX: t.deltaX,
            deltaY: t.deltaY
        }
    }

    function S(t) {
        var e = t.length;
        if (1 === e) return {
            x: J(t[0].clientX),
            y: J(t[0].clientY)
        };
        for (var i = 0, s = 0, n = 0; n < e;) i += t[n].clientX, s += t[n].clientY, n++;
        return {
            x: J(i / e),
            y: J(s / e)
        }
    }

    function j(t, e) {
        return t === e ? dt : Z(t) >= Z(e) ? 0 < t ? ut : pt : 0 < e ? ft : gt
    }

    function E(t, e, i) {
        i || (i = _t);
        var s = e[i[0]] - t[i[0]],
            n = e[i[1]] - t[i[1]];
        return Math.sqrt(s * s + n * n)
    }

    function I(t, e, i) {
        i || (i = _t);
        var s = e[i[0]] - t[i[0]],
            n = e[i[1]] - t[i[1]];
        return 180 * Math.atan2(n, s) / Math.PI
    }

    function D() {
        this.evEl = Ct, this.evWin = kt, this.allow = !0, this.pressed = !1, k.apply(this, arguments)
    }

    function Q() {
        this.evEl = St, this.evWin = jt, k.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
    }

    function A() {
        this.evTarget = "touchstart", this.evWin = "touchstart touchmove touchend touchcancel", this.started = !1, k.apply(this, arguments)
    }

    function H() {
        this.evTarget = Dt, this.targetIds = {}, k.apply(this, arguments)
    }

    function $() {
        k.apply(this, arguments);
        var t = h(this.handler, this);
        this.touch = new H(this.manager, t), this.mouse = new D(this.manager, t)
    }

    function O(t, e) {
        this.manager = t, this.set(e)
    }

    function N(t) {
        this.id = et++, this.manager = null, this.options = s(t || {}, this.defaults), this.options.enable = d(this.options.enable, !0), this.state = Pt, this.simultaneous = {}, this.requireFail = []
    }

    function R(t) {
        return t == gt ? "down" : t == ft ? "up" : t == ut ? "left" : t == pt ? "right" : ""
    }

    function P(t, e) {
        var i = e.manager;
        return i ? i.get(t) : t
    }

    function z() {
        N.apply(this, arguments)
    }

    function M() {
        z.apply(this, arguments), this.pX = null, this.pY = null
    }

    function L() {
        z.apply(this, arguments)
    }

    function W() {
        N.apply(this, arguments), this._timer = null, this._input = null
    }

    function F() {
        z.apply(this, arguments)
    }

    function q() {
        z.apply(this, arguments)
    }

    function B() {
        N.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0
    }

    function U(t, e) {
        return (e = e || {}).recognizers = d(e.recognizers, U.defaults.preset), new V(t, e)
    }

    function V(t, e) {
        var i;
        e = e || {}, this.options = s(e, U.defaults), this.options.inputTarget = this.options.inputTarget || t, this.handlers = {}, this.session = {}, this.recognizers = [], this.element = t, this.input = new((i = this).options.inputClass || (st ? Q : nt ? H : it ? $ : D))(i, x), this.touchAction = new O(this, this.options.touchAction), Y(this, !0), n(e.recognizers, function(t) {
            var e = this.add(new t[0](t[1]));
            t[2] && e.recognizeWith(t[2]), t[3] && e.requireFailure(t[3])
        }, this)
    }

    function Y(t, i) {
        var s = t.element;
        n(t.options.cssProps, function(t, e) {
            s.style[_(s.style, e)] = i ? t : ""
        })
    }
    var X = ["", "webkit", "moz", "MS", "ms", "o"],
        G = a.createElement("div"),
        K = "function",
        J = Math.round,
        Z = Math.abs,
        tt = Date.now,
        et = 1,
        it = "ontouchstart" in t,
        st = _(t, "PointerEvent") !== b,
        nt = it && /mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent),
        ot = "touch",
        rt = "mouse",
        at = 25,
        lt = 1,
        ht = 4,
        ct = 8,
        dt = 1,
        ut = 2,
        pt = 4,
        ft = 8,
        gt = 16,
        mt = ut | pt,
        vt = ft | gt,
        yt = mt | vt,
        _t = ["x", "y"],
        bt = ["clientX", "clientY"];
    k.prototype = {
        handler: function() {},
        init: function() {
            this.evEl && u(this.element, this.evEl, this.domHandler), this.evTarget && u(this.target, this.evTarget, this.domHandler), this.evWin && u(C(this.element), this.evWin, this.domHandler)
        },
        destroy: function() {
            this.evEl && p(this.element, this.evEl, this.domHandler), this.evTarget && p(this.target, this.evTarget, this.domHandler), this.evWin && p(C(this.element), this.evWin, this.domHandler)
        }
    };
    var wt = {
            mousedown: lt,
            mousemove: 2,
            mouseup: ht
        },
        Ct = "mousedown",
        kt = "mousemove mouseup";
    r(D, k, {
        handler: function(t) {
            var e = wt[t.type];
            e & lt && 0 === t.button && (this.pressed = !0), 2 & e && 1 !== t.which && (e = ht), this.pressed && this.allow && (e & ht && (this.pressed = !1), this.callback(this.manager, e, {
                pointers: [t],
                changedPointers: [t],
                pointerType: rt,
                srcEvent: t
            }))
        }
    });
    var xt = {
            pointerdown: lt,
            pointermove: 2,
            pointerup: ht,
            pointercancel: ct,
            pointerout: ct
        },
        Tt = {
            2: ot,
            3: "pen",
            4: rt,
            5: "kinect"
        },
        St = "pointerdown",
        jt = "pointermove pointerup pointercancel";
    t.MSPointerEvent && (St = "MSPointerDown", jt = "MSPointerMove MSPointerUp MSPointerCancel"), r(Q, k, {
        handler: function(t) {
            var e = this.store,
                i = !1,
                s = t.type.toLowerCase().replace("ms", ""),
                n = xt[s],
                o = Tt[t.pointerType] || t.pointerType,
                r = o == ot,
                a = m(e, t.pointerId, "pointerId");
            n & lt && (0 === t.button || r) ? a < 0 && (e.push(t), a = e.length - 1) : n & (ht | ct) && (i = !0), a < 0 || (e[a] = t, this.callback(this.manager, n, {
                pointers: e,
                changedPointers: [t],
                pointerType: o,
                srcEvent: t
            }), i && e.splice(a, 1))
        }
    });
    var Et = {
        touchstart: lt,
        touchmove: 2,
        touchend: ht,
        touchcancel: ct
    };
    r(A, k, {
        handler: function(t) {
            var e = Et[t.type];
            if (e === lt && (this.started = !0), this.started) {
                var i = function(t, e) {
                    var i = v(t.touches),
                        s = v(t.changedTouches);
                    return e & (ht | ct) && (i = y(i.concat(s), "identifier", !0)), [i, s]
                }.call(this, t, e);
                e & (ht | ct) && i[0].length - i[1].length == 0 && (this.started = !1), this.callback(this.manager, e, {
                    pointers: i[0],
                    changedPointers: i[1],
                    pointerType: ot,
                    srcEvent: t
                })
            }
        }
    });
    var It = {
            touchstart: lt,
            touchmove: 2,
            touchend: ht,
            touchcancel: ct
        },
        Dt = "touchstart touchmove touchend touchcancel";
    r(H, k, {
        handler: function(t) {
            var e = It[t.type],
                i = function(t, e) {
                    var i = v(t.touches),
                        s = this.targetIds;
                    if (e & (2 | lt) && 1 === i.length) return s[i[0].identifier] = !0, [i, i];
                    var n, o, r = v(t.changedTouches),
                        a = [],
                        l = this.target;
                    if (o = i.filter(function(t) {
                            return w(t.target, l)
                        }), e === lt)
                        for (n = 0; n < o.length;) s[o[n].identifier] = !0, n++;
                    for (n = 0; n < r.length;) s[r[n].identifier] && a.push(r[n]), e & (ht | ct) && delete s[r[n].identifier], n++;
                    return a.length ? [y(o.concat(a), "identifier", !0), a] : void 0
                }.call(this, t, e);
            i && this.callback(this.manager, e, {
                pointers: i[0],
                changedPointers: i[1],
                pointerType: ot,
                srcEvent: t
            })
        }
    }), r($, k, {
        handler: function(t, e, i) {
            var s = i.pointerType == ot,
                n = i.pointerType == rt;
            if (s) this.mouse.allow = !1;
            else if (n && !this.mouse.allow) return;
            e & (ht | ct) && (this.mouse.allow = !0), this.callback(t, e, i)
        },
        destroy: function() {
            this.touch.destroy(), this.mouse.destroy()
        }
    });
    var Qt = _(G.style, "touchAction"),
        At = Qt !== b,
        Ht = "compute",
        $t = "manipulation",
        Ot = "none",
        Nt = "pan-x",
        Rt = "pan-y";
    O.prototype = {
        set: function(t) {
            t == Ht && (t = this.compute()), At && (this.manager.element.style[Qt] = t), this.actions = t.toLowerCase().trim()
        },
        update: function() {
            this.set(this.manager.options.touchAction)
        },
        compute: function() {
            var e = [];
            return n(this.manager.recognizers, function(t) {
                    c(t.options.enable, [t]) && (e = e.concat(t.getTouchAction()))
                }),
                function(t) {
                    if (f(t, Ot)) return Ot;
                    var e = f(t, Nt),
                        i = f(t, Rt);
                    return e && i ? Nt + " " + Rt : e || i ? e ? Nt : Rt : f(t, $t) ? $t : "auto"
                }(e.join(" "))
        },
        preventDefaults: function(t) {
            if (!At) {
                var e = t.srcEvent,
                    i = t.offsetDirection;
                if (this.manager.session.prevented) return void e.preventDefault();
                var s = this.actions,
                    n = f(s, Ot),
                    o = f(s, Rt),
                    r = f(s, Nt);
                return n || o && i & mt || r && i & vt ? this.preventSrc(e) : void 0
            }
        },
        preventSrc: function(t) {
            this.manager.session.prevented = !0, t.preventDefault()
        }
    };
    var Pt = 1,
        zt = 2,
        Mt = 4,
        Lt = 8,
        Wt = Lt,
        Ft = 16;
    N.prototype = {
        defaults: {},
        set: function(t) {
            return o(this.options, t), this.manager && this.manager.touchAction.update(), this
        },
        recognizeWith: function(t) {
            if (i(t, "recognizeWith", this)) return this;
            var e = this.simultaneous;
            return e[(t = P(t, this)).id] || (e[t.id] = t).recognizeWith(this), this
        },
        dropRecognizeWith: function(t) {
            return i(t, "dropRecognizeWith", this) || (t = P(t, this), delete this.simultaneous[t.id]), this
        },
        requireFailure: function(t) {
            if (i(t, "requireFailure", this)) return this;
            var e = this.requireFail;
            return -1 === m(e, t = P(t, this)) && (e.push(t), t.requireFailure(this)), this
        },
        dropRequireFailure: function(t) {
            if (i(t, "dropRequireFailure", this)) return this;
            t = P(t, this);
            var e = m(this.requireFail, t);
            return -1 < e && this.requireFail.splice(e, 1), this
        },
        hasRequireFailures: function() {
            return 0 < this.requireFail.length
        },
        canRecognizeWith: function(t) {
            return !!this.simultaneous[t.id]
        },
        emit: function(i) {
            function t(t) {
                var e;
                s.manager.emit(s.options.event + (t ? (e = n) & Ft ? "cancel" : e & Lt ? "end" : e & Mt ? "move" : e & zt ? "start" : "" : ""), i)
            }
            var s = this,
                n = this.state;
            n < Lt && t(!0), t(), Lt <= n && t(!0)
        },
        tryEmit: function(t) {
            return this.canEmit() ? this.emit(t) : void(this.state = 32)
        },
        canEmit: function() {
            for (var t = 0; t < this.requireFail.length;) {
                if (!(this.requireFail[t].state & (32 | Pt))) return !1;
                t++
            }
            return !0
        },
        recognize: function(t) {
            var e = o({}, t);
            return c(this.options.enable, [this, e]) ? (this.state & (Wt | Ft | 32) && (this.state = Pt), this.state = this.process(e), void(this.state & (zt | Mt | Lt | Ft) && this.tryEmit(e))) : (this.reset(), void(this.state = 32))
        },
        process: function() {},
        getTouchAction: function() {},
        reset: function() {}
    }, r(z, N, {
        defaults: {
            pointers: 1
        },
        attrTest: function(t) {
            var e = this.options.pointers;
            return 0 === e || t.pointers.length === e
        },
        process: function(t) {
            var e = this.state,
                i = t.eventType,
                s = e & (zt | Mt),
                n = this.attrTest(t);
            return s && (i & ct || !n) ? e | Ft : s || n ? i & ht ? e | Lt : e & zt ? e | Mt : zt : 32
        }
    }), r(M, z, {
        defaults: {
            event: "pan",
            threshold: 10,
            pointers: 1,
            direction: yt
        },
        getTouchAction: function() {
            var t = this.options.direction,
                e = [];
            return t & mt && e.push(Rt), t & vt && e.push(Nt), e
        },
        directionTest: function(t) {
            var e = this.options,
                i = !0,
                s = t.distance,
                n = t.direction,
                o = t.deltaX,
                r = t.deltaY;
            return n & e.direction || (e.direction & mt ? (n = 0 === o ? dt : o < 0 ? ut : pt, i = o != this.pX, s = Math.abs(t.deltaX)) : (n = 0 === r ? dt : r < 0 ? ft : gt, i = r != this.pY, s = Math.abs(t.deltaY))), t.direction = n, i && s > e.threshold && n & e.direction
        },
        attrTest: function(t) {
            return z.prototype.attrTest.call(this, t) && (this.state & zt || !(this.state & zt) && this.directionTest(t))
        },
        emit: function(t) {
            this.pX = t.deltaX, this.pY = t.deltaY;
            var e = R(t.direction);
            e && this.manager.emit(this.options.event + e, t), this._super.emit.call(this, t)
        }
    }), r(L, z, {
        defaults: {
            event: "pinch",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function() {
            return [Ot]
        },
        attrTest: function(t) {
            return this._super.attrTest.call(this, t) && (Math.abs(t.scale - 1) > this.options.threshold || this.state & zt)
        },
        emit: function(t) {
            if (this._super.emit.call(this, t), 1 !== t.scale) {
                var e = t.scale < 1 ? "in" : "out";
                this.manager.emit(this.options.event + e, t)
            }
        }
    }), r(W, N, {
        defaults: {
            event: "press",
            pointers: 1,
            time: 500,
            threshold: 5
        },
        getTouchAction: function() {
            return ["auto"]
        },
        process: function(t) {
            var e = this.options,
                i = t.pointers.length === e.pointers,
                s = t.distance < e.threshold,
                n = t.deltaTime > e.time;
            if (this._input = t, !s || !i || t.eventType & (ht | ct) && !n) this.reset();
            else if (t.eventType & lt) this.reset(), this._timer = l(function() {
                this.state = Wt, this.tryEmit()
            }, e.time, this);
            else if (t.eventType & ht) return Wt;
            return 32
        },
        reset: function() {
            clearTimeout(this._timer)
        },
        emit: function(t) {
            this.state === Wt && (t && t.eventType & ht ? this.manager.emit(this.options.event + "up", t) : (this._input.timeStamp = tt(), this.manager.emit(this.options.event, this._input)))
        }
    }), r(F, z, {
        defaults: {
            event: "rotate",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function() {
            return [Ot]
        },
        attrTest: function(t) {
            return this._super.attrTest.call(this, t) && (Math.abs(t.rotation) > this.options.threshold || this.state & zt)
        }
    }), r(q, z, {
        defaults: {
            event: "swipe",
            threshold: 10,
            velocity: .65,
            direction: mt | vt,
            pointers: 1
        },
        getTouchAction: function() {
            return M.prototype.getTouchAction.call(this)
        },
        attrTest: function(t) {
            var e, i = this.options.direction;
            return i & (mt | vt) ? e = t.velocity : i & mt ? e = t.velocityX : i & vt && (e = t.velocityY), this._super.attrTest.call(this, t) && i & t.direction && t.distance > this.options.threshold && Z(e) > this.options.velocity && t.eventType & ht
        },
        emit: function(t) {
            var e = R(t.direction);
            e && this.manager.emit(this.options.event + e, t), this.manager.emit(this.options.event, t)
        }
    }), r(B, N, {
        defaults: {
            event: "tap",
            pointers: 1,
            taps: 1,
            interval: 300,
            time: 250,
            threshold: 2,
            posThreshold: 10
        },
        getTouchAction: function() {
            return [$t]
        },
        process: function(t) {
            var e = this.options,
                i = t.pointers.length === e.pointers,
                s = t.distance < e.threshold,
                n = t.deltaTime < e.time;
            if (this.reset(), t.eventType & lt && 0 === this.count) return this.failTimeout();
            if (s && n && i) {
                if (t.eventType != ht) return this.failTimeout();
                var o = !this.pTime || t.timeStamp - this.pTime < e.interval,
                    r = !this.pCenter || E(this.pCenter, t.center) < e.posThreshold;
                if (this.pTime = t.timeStamp, this.pCenter = t.center, r && o ? this.count += 1 : this.count = 1, this._input = t, 0 === this.count % e.taps) return this.hasRequireFailures() ? (this._timer = l(function() {
                    this.state = Wt, this.tryEmit()
                }, e.interval, this), zt) : Wt
            }
            return 32
        },
        failTimeout: function() {
            return this._timer = l(function() {
                this.state = 32
            }, this.options.interval, this), 32
        },
        reset: function() {
            clearTimeout(this._timer)
        },
        emit: function() {
            this.state == Wt && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
        }
    }), U.VERSION = "2.0.4", U.defaults = {
        domEvents: !1,
        touchAction: Ht,
        enable: !0,
        inputTarget: null,
        inputClass: null,
        preset: [
            [F, {
                enable: !1
            }],
            [L, {
                    enable: !1
                },
                ["rotate"]
            ],
            [q, {
                direction: mt
            }],
            [M, {
                    direction: mt
                },
                ["swipe"]
            ],
            [B],
            [B, {
                    event: "doubletap",
                    taps: 2
                },
                ["tap"]
            ],
            [W]
        ],
        cssProps: {
            userSelect: "none",
            touchSelect: "none",
            touchCallout: "none",
            contentZooming: "none",
            userDrag: "none",
            tapHighlightColor: "rgba(0,0,0,0)"
        }
    };
    V.prototype = {
        set: function(t) {
            return o(this.options, t), t.touchAction && this.touchAction.update(), t.inputTarget && (this.input.destroy(), this.input.target = t.inputTarget, this.input.init()), this
        },
        stop: function(t) {
            this.session.stopped = t ? 2 : 1
        },
        recognize: function(t) {
            var e = this.session;
            if (!e.stopped) {
                this.touchAction.preventDefaults(t);
                var i, s = this.recognizers,
                    n = e.curRecognizer;
                (!n || n && n.state & Wt) && (n = e.curRecognizer = null);
                for (var o = 0; o < s.length;) i = s[o], 2 === e.stopped || n && i != n && !i.canRecognizeWith(n) ? i.reset() : i.recognize(t), !n && i.state & (zt | Mt | Lt) && (n = e.curRecognizer = i), o++
            }
        },
        get: function(t) {
            if (t instanceof N) return t;
            for (var e = this.recognizers, i = 0; i < e.length; i++)
                if (e[i].options.event == t) return e[i];
            return null
        },
        add: function(t) {
            if (i(t, "add", this)) return this;
            var e = this.get(t.options.event);
            return e && this.remove(e), this.recognizers.push(t), (t.manager = this).touchAction.update(), t
        },
        remove: function(t) {
            if (i(t, "remove", this)) return this;
            var e = this.recognizers;
            return t = this.get(t), e.splice(m(e, t), 1), this.touchAction.update(), this
        },
        on: function(t, e) {
            var i = this.handlers;
            return n(g(t), function(t) {
                i[t] = i[t] || [], i[t].push(e)
            }), this
        },
        off: function(t, e) {
            var i = this.handlers;
            return n(g(t), function(t) {
                e ? i[t].splice(m(i[t], e), 1) : delete i[t]
            }), this
        },
        emit: function(t, e) {
            var i, s, n;
            this.options.domEvents && (i = t, s = e, (n = a.createEvent("Event")).initEvent(i, !0, !0), (n.gesture = s).target.dispatchEvent(n));
            var o = this.handlers[t] && this.handlers[t].slice();
            if (o && o.length) {
                e.type = t, e.preventDefault = function() {
                    e.srcEvent.preventDefault()
                };
                for (var r = 0; r < o.length;) o[r](e), r++
            }
        },
        destroy: function() {
            this.element && Y(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
        }
    }, o(U, {
        INPUT_START: lt,
        INPUT_MOVE: 2,
        INPUT_END: ht,
        INPUT_CANCEL: ct,
        STATE_POSSIBLE: Pt,
        STATE_BEGAN: zt,
        STATE_CHANGED: Mt,
        STATE_ENDED: Lt,
        STATE_RECOGNIZED: Wt,
        STATE_CANCELLED: Ft,
        STATE_FAILED: 32,
        DIRECTION_NONE: dt,
        DIRECTION_LEFT: ut,
        DIRECTION_RIGHT: pt,
        DIRECTION_UP: ft,
        DIRECTION_DOWN: gt,
        DIRECTION_HORIZONTAL: mt,
        DIRECTION_VERTICAL: vt,
        DIRECTION_ALL: yt,
        Manager: V,
        Input: k,
        TouchAction: O,
        TouchInput: H,
        MouseInput: D,
        PointerEventInput: Q,
        TouchMouseInput: $,
        SingleTouchInput: A,
        Recognizer: N,
        AttrRecognizer: z,
        Tap: B,
        Pan: M,
        Swipe: q,
        Pinch: L,
        Rotate: F,
        Press: W,
        on: u,
        off: p,
        each: n,
        merge: s,
        extend: o,
        inherit: r,
        bindFn: h,
        prefixed: _
    }), typeof define == K && define.amd ? define(function() {
        return U
    }) : "undefined" != typeof module && module.exports ? module.exports = U : t.Hammer = U
}(window, document);