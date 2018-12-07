if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");

function initRandomBlocks() {
}(jQuery), 

function() {
    var l, i, n, r, o = {}.hasOwnProperty;
    (r = function() {
        function t() {
        }
        return t.prototype.add_node = function(t) {
        }, t
    }()).select_to_array = function(t) {
        
    }, i = function() {
        function n(t, e) {
            this.form_field = t, this.options = null != e ? e : {}, this.label_click_handler = (i = this.label_click_handler, s = this, function() {
            }), n.browser_is_supported() && (this.is_multiple = this.form_field.multiple, this.set_default_text(), this.set_default_values(), this.setup(), this.set_up_html(), this.register_observers(), this.on_ready())
        }
        return n.prototype.set_default_values = function() {
            var e = this;
            return this.click_test_action = function(t) {
                return e.test_active_click(t)
            }, this.active_field = !1, this.mouse_on_container = !1, this.results_showing = !1, this.result_highlighted = null, this.is_rtl = this.options.rtl || /\bchosen-rtl\b/.test(this.form_field.className), this.allow_single_deselect = null != this.options.allow_single_deselect && null != this.form_field.options[0] && "" === this.form_field.options[0].text && this.options.allow_single_deselect, this.disable_search_threshold = this.options.disable_search_threshold || 0, this.disable_search = this.options.disable_search || !1, this.enable_split_word_search = null == this.options.enable_split_word_search || this.options.enable_split_word_search, this.group_search = null == this.options.group_search || this.options.group_search, this.search_contains = this.options.search_contains || !1, this.single_backstroke_delete = null == this.options.single_backstroke_delete || this.options.single_backstroke_delete, this.max_selected_options = this.options.max_selected_options || 1 / 0, this.inherit_select_classes = this.options.inherit_select_classes || !1, this.display_selected_options = null == this.options.display_selected_options || this.options.display_selected_options, this.display_disabled_options = null == this.options.display_disabled_options || this.options.display_disabled_options, this.include_group_label_in_selected = this.options.include_group_label_in_selected || !1, this.max_shown_results = this.options.max_shown_results || Number.POSITIVE_INFINITY, this.case_sensitive_search = this.options.case_sensitive_search || !1, this.hide_results_on_select = null == this.options.hide_results_on_select || this.options.hide_results_on_select
        }, n.default_multiple_text = "Select Some Options", n.default_single_text = "Select an Option", n.default_no_result_text = "No results match", n
    }(), (l = jQuery).fn.extend({
      
    }), n = function(t) {
        function e() {
        }
        return function(t, e) {
        }, e
    }()
}.call(this),
    function() {
        "use strict";
        function o(t, e, i) {
            "addEventListener" in window ? t.addEventListener(e, i, !1) : "attachEvent" in window && t.attachEvent("on" + e, i)
        }
        function t() {
            function t(t) {
            }
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

        var Y = {
                min: function() {
                }
            };
        o(window, "message", function(t) {
        })
    }(),
    function() {
        "use strict";

        function n(t, e, i) {
        }

        function t() {
        }
        var i, 
            m = "[iFrameSizer]",
            v = m.length,
            a = window.requestAnimationFrame;
        (function() {
          
        })(), n(window, "message", function(i) {

            var e, o, r = i.data,
                a = {};
            m === ("" + r).substr(0, v) && (l(" Received: " + r), o = r.substr(v).split(":"), a = {
               
            }, (e = a.type in {

            }) && l(" Ignoring init message from meta parent page"), !e && function() {

            }() && function() {
                
            }() && (function() {
                
                var t, e, i
            }(), f = !1))
        }), "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : window.iFrameResize = t()
    }(), window.isTouchDevice = /Windows Phone/.test(navigator.userAgent) || "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch, jQuery(function() {
        initSteps()
    });





function initSteps() {
  jQuery(".story-wrap").lineSVG({
    onceMode: !1
  })
}


function initTimeline() {
  if (jQuery("#timeline-wrapper").length) {
    jQuery('[data-toggle="popover"]').popover({
        
    }).on("mouseenter", function() {
    }).on("mouseleave", function() {
    }).on("shown.bs.popover", function() {
    }), jQuery("html").on("click tap", function(t) {

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
}! 


function(e, t) {
  "use strict";
    
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

        destroy: function() {}
    }, e.fn.lineSVG = function(t) {
        return this.each(function() {
            e(this).data("LineSVG", new i(e.extend(t, {
                holder: this
            })))
        })
    }
}(jQuery, jQuery(window));

var ImageStretcher = {};
function TinyFilter() {

}(jQuery),
function(s) {
  function e(t) {
    this.options = s.extend({
      
    }, t), this.init()
  }

}(jQuery),
function(c, t) {

  function e(t) {
    this.options = c.extend({
    }, t), this.init()
  }
  e.prototype = {
    init: function() {
      this.initStructure(), this.attachEvents()
    }
  };

}(window, document);