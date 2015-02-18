(function() {
  function e() {
    return d.length !== 0
  }

  function f(a, b) {
    return a.classList ? a.classList.add(b) : h(a, b) || (a.className = a.className + " " + b), a
  }

  function g(a, b) {
    return h(b) && (a.classList ? a.classList.remove(b) : a.className = (" " + a.className + " ").replace(" " + b + " ", " ").trim()), a
  }

  function h(a, b) {
    return a.classList ? a.classList.contains(b) : (" " + a.className + " ").indexOf(" " + b + " ") > -1
  }
  var a = React.addons.TransitionGroup,
    b = 17,
    c = {
      transitionend: {
        transition: "transitionend",
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "mozTransitionEnd",
        OTransition: "oTransitionEnd",
        msTransition: "MSTransitionEnd"
      },
      animationend: {
        animation: "animationend",
        WebkitAnimation: "webkitAnimationEnd",
        MozAnimation: "mozAnimationEnd",
        OAnimation: "oAnimationEnd",
        msAnimation: "MSAnimationEnd"
      }
    },
    d = [];
  (function() {
    if (typeof window == "undefined") return;
    var b = document.createElement("div"),
      e = b.style;
    "AnimationEvent" in window || delete c.animationend.animation, "TransitionEvent" in window || delete c.transitionend.transition;
    for (var f in c)
      if (c.hasOwnProperty(f)) {
        var g = c[f];
        for (var h in g)
          if (h in e) {
            d.push(g[h]);
            break
          }
      }
  })();
  var i = React.createClass({
      displayName: "TimeoutTransitionGroupChild",
      transition: function(a, b) {
        var c = this.getDOMNode(),
          d = this.props.name + "-" + a,
          h = d + "-active",
          i = function() {
            g(c, d), g(c, h), b && b()
          };
        e() ? a === "enter" ? this.animationTimeout = setTimeout(i, this.props.enterTimeout) : a === "leave" && (this.animationTimeout = setTimeout(i, this.props.leaveTimeout)) : i(), f(c, d), this.queueClass(h)
      },
      queueClass: function(a) {
        this.classNameQueue.push(a), this.timeout || (this.timeout = setTimeout(this.flushClassNameQueue, b))
      },
      flushClassNameQueue: function() {
        this.isMounted() && this.classNameQueue.forEach(function(a) {
          f(this.getDOMNode(), a)
        }.bind(this)), this.classNameQueue.length = 0, this.timeout = null
      },
      componentWillMount: function() {
        this.classNameQueue = []
      },
      componentWillUnmount: function() {
        this.timeout && clearTimeout(this.timeout), this.animationTimeout && clearTimeout(this.animationTimeout)
      },
      componentWillEnter: function(a) {
        this.props.enter ? this.transition("enter", a) : a()
      },
      componentWillLeave: function(a) {
        this.props.leave ? this.transition("leave", a) : a()
      },
      render: function() {
        return React.Children.only(this.props.children)
      }
    }),
    j = React.createClass({
      displayName: "TimeoutTransitionGroup",
      propTypes: {
        enterTimeout: React.PropTypes.number.isRequired,
        leaveTimeout: React.PropTypes.number.isRequired,
        transitionName: React.PropTypes.string.isRequired,
        transitionEnter: React.PropTypes.bool,
        transitionLeave: React.PropTypes.bool
      },
      getDefaultProps: function() {
        return {
          transitionEnter: !0,
          transitionLeave: !0
        }
      },
      _wrapChild: function(a) {
        return React.createElement(i, {
          enterTimeout: this.props.enterTimeout,
          leaveTimeout: this.props.leaveTimeout,
          name: this.props.transitionName,
          enter: this.props.transitionEnter,
          leave: this.props.transitionLeave
        }, a)
      },
      render: function() {
        return React.createElement(a, React.__spread({}, this.props, {
          childFactory: this._wrapChild
        }))
      }
    });
  cryptowatch.components.TimeoutTransitionGroup = j
})(),
function() {
  cryptowatch.components.Alerts = React.createClass({
    displayName: "Alerts",
    render: function() {
      return this.props.alerts.length === 0 ? React.createElement("div", {
        className: "alerts--empty"
      }, "Click on the y-axis to set alerts") : React.createElement("div", null, React.createElement("div", {
        id: "alerts__scroll-screen"
      }, this.props.alerts.map(function(a, b) {
        return cryptowatch.components.Alert({
          alert: a,
          notificationsAllowed: this.props.notificationsAllowed,
          audioSupported: this.props.audioSupported
        })
      }.bind(this))), React.createElement("div", {
        id: "alerts__fake-border-top"
      }), React.createElement("div", {
        id: "alerts__fake-border-bottom"
      }))
    }
  }), cryptowatch.components.Alert = React.createClass({
    displayName: "Alert",
    getInitialState: function() {
      return {
        options: this.props.alert.options
      }
    },
    _mouseout: function() {
      delete cryptowatch.chart.alertHovered, cryptowatch.chart.refresh.axes()
    },
    _mouseover: function() {
      cryptowatch.chart.alertHovered = this.props.alert, cryptowatch.chart.refresh.axes()
    },
    _toggleOption: function(a) {
      this.props.alert.options[a] = this.state.options[a] = !this.props.alert.options[a], this.setState({
        options: this.state.options
      }), cryptowatch.alerts.cache()
    },
    _delete: function() {
      this.props.alert.destroy(), delete cryptowatch.chart.alertHovered
    },
    render: function() {
      return this.props.alert.triggered ? React.createElement("div", {
        className: "alert-entry",
        "data-alert-id": this.props.alert.id,
        onMouseOver: this._mouseover,
        onMouseOut: this._mouseout
      }, React.createElement("table", null, React.createElement("tr", null, React.createElement("td", {
        className: "alert-entry__description"
      }, this.props.alert.declaration(), " ", React.createElement("strong", null, this.props.alert.formattedY())), React.createElement("td", {
        className: "alert-entry__silence",
        height: "40"
      }, React.createElement("a", {
        onClick: this._delete,
        className: "button"
      }, this.props.alert.options.noise ? "Silence Alarm" : "OK"))))) : React.createElement("div", {
        className: "alert-entry",
        "data-alert-id": this.props.alert.id,
        onMouseOver: this._mouseover,
        onMouseOut: this._mouseout
      }, React.createElement("table", null, React.createElement("tr", null, React.createElement("td", {
        className: "alert-entry__description"
      }, "If ", this.props.alert.description(), " ", React.createElement("strong", null, this.props.alert.formattedY()), ","), React.createElement("td", null, React.createElement("div", {
        className: "alert-entry__options"
      }, React.createElement("div", {
        className: "alert-entry__option"
      }, React.createElement("input", {
        type: "checkbox",
        id: "alert-entry-" + this.props.alert.id + "__option--notification",
        checked: this.props.notificationsAllowed && this.state.options.notification,
        onChange: this._toggleOption.bind(this, "notification"),
        disabled: !this.props.notificationsAllowed
      }), React.createElement("label", {
        htmlFor: "alert-entry-" + this.props.alert.id + "__option--notification"
      }, "show notification")), React.createElement("div", {
        className: "alert-entry__option"
      }, React.createElement("input", {
        type: "checkbox",
        id: "alert-entry-" + this.props.alert.id + "__option--noise",
        checked: this.props.audioSupported && this.state.options.noise,
        onChange: this._toggleOption.bind(this, "noise"),
        disabled: !this.props.audioSupported
      }), React.createElement("label", {
        htmlFor: "alert-entry-" + this.props.alert.id + "__option--noise"
      }, "make noise")))), React.createElement("td", null, React.createElement("div", {
        className: "alert-entry__delete icon-ex",
        onClick: this._delete
      })))))
    }
  })
}(),
function() {
  cryptowatch.components.PeriodsMenu = React.createClass({
    displayName: "PeriodsMenu",
    getInitialState: function() {
      return {
        currentPeriod: cryptowatch.period
      }
    },
    render: function() {
      return React.createElement("div", null, this.props.periods.map(function(a) {
        var b = React.addons.classSet({
          option: !0,
          current: this.state.currentPeriod === a
        });
        return React.createElement("a", {
          href: "/" + cryptowatch.exchange.slug + "/" + cryptowatch.currencyPair.slug + "/" + a,
          className: b,
          "data-period": a,
          "data-period-int": cryptowatch.intervalPeriods[a],
          rel: "nofollow",
          onClick: this._onclick
        }, cryptowatch.i18n[a])
      }.bind(this)))
    },
    _onclick: function(a) {
      if (cryptowatch.data.readyForHotLoad) {
        var b = a.target.getAttribute("data-period"),
          c = parseInt(a.target.getAttribute("data-period-int"));
        a.preventDefault(), cryptowatch.periodInt = c, cryptowatch.chart.setPeriod(c, b), cryptowatch.utils.savePreferenceInCookie("timePeriod", b), $("#current-period-name").text(cryptowatch.i18n[b]), this.setState({
          currentPeriod: b
        });
        var d = "/" + [cryptowatch.exchange.slug, cryptowatch.currencyPair.slug, b].join("/");
        window.history.replaceState({}, "", d), ga("send", "pageview", d)
      }
    }
  })
}(),
function() {
  cryptowatch.components.OrderBook = React.createClass({
    displayName: "OrderBook",
    getInitialState: function() {
      return {
        initialized: !1,
        fiatPreference: cryptowatch.currency.fiatPreference
      }
    },
    generateOrderList: function(a, b) {
      var c = [];
      for (var d = 0; d < a.length; d++) {
        var e = a[d],
          f = b === "asks" ? a[d + 1] : a[d - 1],
          g = !1;
        if (f) {
          var h = cryptowatch.currency.convert(f.Price, cryptowatch.currencyPair.quote, this.state.fiatPreference),
            i = cryptowatch.currency.convert(e.Price, cryptowatch.currencyPair.quote, this.state.fiatPreference);
          g = Math.floor(h) !== Math.floor(i)
        } else g = !0;
        var j = cryptowatch.currency.fmt(e.Price, cryptowatch.currencyPair.quote, {
          label: !1
        }).split(".");
        c.push(React.createElement("div", {
          key: b + ":" + e.Price,
          className: React.addons.classSet({
            "order-list-entry": !0,
            "in-shadow": !g
          })
        }, React.createElement("li", null, React.createElement("data", {
          className: "order-price",
          "data-quotecurrency": cryptowatch.currencyPair.quote,
          "data-displaycurrency": this.state.fiatPreference
        }, React.createElement("span", {
          className: "order-price-left"
        }, j[0] + "."), React.createElement("span", {
          className: "order-price-right"
        }, j[1])), React.createElement("div", {
          className: "order-amount"
        }, cryptowatch.utils.amountToString(e.Amount)))))
      }
      return this.shouldAnimate() ? React.createElement(cryptowatch.components.TimeoutTransitionGroup, {
        component: "div",
        transitionName: "order-list-entry",
        enterTimeout: 500,
        leaveTimeout: 1500
      }, c) : React.createElement("div", null, c)
    },
    shouldAnimate: function() {
      return this.state.initialized && cryptowatch.config.config.performance.animateFeeds
    },
    render: function() {
      var a = this.generateOrderList(this.props.bids.slice(0, 50), "bids"),
        b = this.generateOrderList(this.props.asks.slice(0).reverse().slice(-50), "asks");
      return React.createElement("div", null, React.createElement("div", {
        className: "orders-list",
        id: "asks-list"
      }, React.createElement("ul", null, b)), React.createElement("data", {
        "data-market": "{{ $.Market.Slug }}",
        "data-label": "true",
        "data-quotecurrency": "{{ $.Quote.Symbol }}",
        id: "price-ticker"
      }, cryptowatch.currency.fmt(cryptowatch.currency.convert(this.props.lastPrice, cryptowatch.currencyPair.quote, this.state.fiatPreference), this.state.fiatPreference)), React.createElement("div", {
        className: "orders-list",
        id: "bids-list"
      }, React.createElement("ul", null, a)))
    }
  })
}(),
function() {
  var a = cryptowatch.utils = {
    midPoint: function(a, b) {
      return b > a ? a + (b - a) / 2 : a > b ? b + (a - b) / 2 : a
    },
    timeAgo: function(a) {
      var b = Math.round((new Date).valueOf() / 1e3);
      return b - a < 60 ? "now" : b - a < 3600 ? Math.floor((b - a) / 60) + "m" : b - a < 86400 ? Math.floor((b - a) / 3600) + "hr" : b - a < 2592e3 ? Math.floor((b - a) / 86400) + "d" : b - a < 31536e3 ? Math.floor((b - a) / 2592e3) + "mo" : Math.floor((b - a) / 94608e4) + "yr"
    },
    sharpen: function(a) {
      return Math.floor(a) + .5
    },
    percentageAsString: function(a) {
      return Math.abs(a * 100).toFixed(2) + "%"
    },
    amountToString: function(a) {
      return a > 1e4 ? (a / 1e3).toFixed(1) + "K" : a.toFixed(4)
    },
    profitToString: function(a) {
      return (a > 0 ? "+" : "") + (a * 100).toFixed(2) + "%"
    },
    _doubleDigits: function(a) {
      return a == 0 ? "00" : "" + (a < 10 ? "0" : "") + a
    },
    date: {
      formatters: {},
      setupFormatters: function() {
        window.Intl !== undefined && (cryptowatch.utils.date.formatters.monthAndDate = new Intl.DateTimeFormat(cryptowatch.locale, {
          month: "short",
          day: "2-digit"
        }), cryptowatch.utils.date.formatters.time = new Intl.DateTimeFormat(cryptowatch.locale, {
          hour: "2-digit",
          hour12: !1,
          minute: "2-digit"
        }), cryptowatch.utils.date.formatters.monthDateAndTime = new Intl.DateTimeFormat(cryptowatch.locale, {
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          hour12: !1,
          minute: "2-digit"
        }), cryptowatch.utils.date.formatters.yearMonthDateAndTime = new Intl.DateTimeFormat(cryptowatch.locale, {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          hour12: !1,
          minute: "2-digit"
        }), cryptowatch.utils.date.formatters.yearMonthDateAndTimeWithSeconds = new Intl.DateTimeFormat(cryptowatch.locale, {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          hour12: !1,
          minute: "2-digit",
          second: "2-digit"
        }))
      },
      printMonthAndDate: function(a) {
        return window.Intl !== undefined ? cryptowatch.utils.date.formatters.monthAndDate.format(a) : ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"][a.getMonth()] + " " + a.getDate()
      },
      printTime: function(a) {
        return window.Intl !== undefined ? cryptowatch.utils.date.formatters.time.format(a) : a.getHours() + ":" + cryptowatch.utils._doubleDigits(a.getMinutes())
      },
      printMonthDateAndTime: function(a) {
        return window.Intl !== undefined ? cryptowatch.utils.date.formatters.monthDateAndTime.format(a) : cryptowatch.utils.date.printMonthAndDate(a) + " " + cryptowatch.utils.date.printTime(a)
      },
      printYearMonthDateAndTime: function(a) {
        if (window.Intl !== undefined) return cryptowatch.utils.date.formatters.yearMonthDateAndTime.format(a);
        var b = a.getHours(),
          c = a.getMinutes();
        return a.toDateString().split(" ").slice(1).join(" ") + " " + (b < 10 ? "0" : "") + b + ":" + cryptowatch.utils._doubleDigits(c)
      },
      printYearMonthDateAndTimeWithSeconds: function(a) {
        if (window.Intl !== undefined) return cryptowatch.utils.date.formatters.yearMonthDateAndTimeWithSeconds.format(a);
        var b = a.getHours(),
          c = a.getMinutes(),
          d = a.getSeconds();
        return a.toDateString().split(" ").slice(1).join(" ") + " " + (b < 10 ? "0" : "") + b + ":" + cryptowatch.utils._doubleDigits(c) + ":" + cryptowatch.utils._doubleDigits(d)
      }
    },
    savePreferenceInCookie: function(a, b) {
      document.cookie = a + "=" + b + "; expires=" + new Date((new Date).valueOf() + 63072e7) + "; path=/"
    },
    nextFrame: function(a) {
      if (a === undefined) {
        console.trace();
        return
      }
      window.requestAnimationFrame === undefined || window.cancelAnimationFrame === undefined ? a() : window.requestAnimationFrame(function() {
        a()
      })
    },
    onScroll: function(a, b) {
      var c = /Firefox/.test(navigator.userAgent),
        d = c ? "DOMMouseScroll" : "mousewheel";
      document.querySelector(a).addEventListener(d, function(a) {
        c ? a.detail < 0 ? b.down() : b.up() : Math.abs(a.wheelDeltaX) > Math.abs(a.wheelDeltaY) ? b.horizontal && b.horizontal(a.wheelDeltaX) : a.wheelDeltaY > 0 ? b.down() : b.up(), a.preventDefault()
      })
    },
    calculateOffsetForTarget: function(a, b) {
      rect = b.getBoundingClientRect(), a.offsetX = a.clientX - rect.left, a.offsetY = a.clientY - rect.top
    }
  };
  cryptowatch.utils.date.setupFormatters(), setInterval(function() {
    $(".live-timestamp").each(function(b, c) {
      var d = $(c),
        e = a.timeAgo(parseInt(d.attr("value"), 10));
      d.text(e)
    })
  }, 3e4)
}(), $.fn.scrollTo = function(a, b, c) {
  typeof b == "function" && arguments.length == 2 && (c = b, b = a);
  var d = $.extend({
    scrollTarget: a,
    offsetTop: 50,
    duration: 500,
    easing: "swing"
  }, b);
  return this.each(function() {
    var a = $(this),
      b = typeof d.scrollTarget == "number" ? d.scrollTarget : $(d.scrollTarget),
      e = typeof b == "number" ? b : b.offset().top + a.scrollTop() - parseInt(d.offsetTop);
    a.animate({
      scrollTop: e
    }, parseInt(d.duration), d.easing, function() {
      typeof c == "function" && c.call(this)
    })
  })
},
function() {
  function a(a, b, c, d) {
    return this.r = a, this.g = b, this.b = c, this.a = d || 1, this
  }
  a.fromRGBA = function(a) {
    var b, c = a.replace(/rgba?\(/, "").replace(")", "").split(",").filter(function(a) {
      return /^[0-9]{1,3}\s*/.test(a)
    }).map(parseFloat);
    if (c.length < 3) throw new Error("Can't parse as rgba: " + a);
    return c.length === 3 && c.push(1), new this(c[0], c[1], c[2], c[3])
  }, a.fromHex = function(a, b) {
    return a = a.replace("#", ""), new this(this._hexToVal(a.substring(0, 2)), this._hexToVal(a.substring(2, 4)), this._hexToVal(a.substring(4, 6)), b || 1)
  }, a.parse = function(b) {
    return /#?[0-9a-f]{6}/i.test(b) ? a.fromHex(b) : a.fromRGBA(b)
  }, a._hexToVal = function(a) {
    return a = a.toLowerCase(), chars = "0123456789abcdef", chars.indexOf(a.charAt(0)) * 16 + chars.indexOf(a.charAt(1))
  }, a.prototype.toString = function(a, b, c) {
    return this._asString !== undefined ? this._asString : (this._asString = "rgba(" + [this.r, this.g, this.b, this.a].join(",") + ")", this._asString)
  }, window.Color = a;
  var b = cryptowatch.colors = {
    setTheme: function(a) {
      $("body").attr("color-scheme", a), b.theme = b.themes[a], document.cookie = "theme=" + a + "; expires=" + new Date((new Date).valueOf() + 31536e6) + "; path=/", b._theme = a, cryptowatch.chart && cryptowatch.chart.refresh.all(), cryptowatch.depth && cryptowatch.depth.refresh()
    },
    themes: {},
    registerTheme: function(a, c) {
      b.themes[a] = b._parseColors(c)
    },
    _parseColors: function(c) {
      for (var d in c) {
        var e = c[d];
        e instanceof Array ? c[d] = e.map(function(b) {
          return a.parse(b)
        }) : e instanceof Object ? c[d] = b._parseColors(e) : c[d] = a.parse(e)
      }
      return c
    }
  };
  b.registerTheme("classic", {
    background: "#0F0F10",
    text: "rgba(255,255,255,0.7)",
    textStrong: "rgba(255,255,255,0.9)",
    crosshair: "rgba(255,255,255,0.25)",
    guide: "rgba(255,255,255,0.1)",
    alert: "#FFD506",
    "short": {
      fill: "#8b1212",
      stroke: "#c51c1c"
    },
    "long": {
      fill: "#18191B",
      stroke: "rgba(255,255,255,0.94)"
    },
    indicators: {
      ema: ["#aca46f", "#85c7d3", "#6B3E4D", "#689D61", "#415481"],
      channel: "#283947",
      ichimoku: {
        tenkanSen: "#3CB6B5",
        kijunSen: "#9C34A2",
        chikouSpan: "rgba(255,255,255,0.2)",
        senkouSpanA: "#3E814B",
        senkouSpanB: "#711F2D",
        cloud: "#171A21"
      }
    }
  }), b.registerTheme("standard", {
    background: "#050505",
    text: "rgba(255,255,255,0.7)",
    textStrong: "rgba(255,255,255,0.9)",
    crosshair: "rgba(255,255,255,0.27)",
    guide: "rgba(255,255,255,0.15)",
    alert: "#FFD506",
    "short": {
      fill: "#9C0004",
      stroke: "#CC000F"
    },
    "long": {
      fill: "#050505",
      stroke: "#00B909"
    },
    indicators: {
      ema: ["#E09951", "#78DDE4", "#7E3154", "#689D61", "#415481"],
      channel: "#596A83",
      ichimoku: {
        tenkanSen: "#3CB6B5",
        kijunSen: "#9C34A2",
        chikouSpan: "rgba(255,255,255,0.2)",
        senkouSpanA: "#3E814B",
        senkouSpanB: "#711F2D",
        cloud: "#171A21"
      },
      zigzag: "#D2CCE8"
    }
  }), b.registerTheme("delek", {
    background: "#0C0C11",
    text: "#0BB2A0",
    textStrong: "#0FE8C9",
    crosshair: "rgba(35,153,87,0.45)",
    guide: "rgba(35,153,87,0.15)",
    alert: "#D9FF21",
    "short": {
      fill: "#c51c1c",
      stroke: "#c51c1c"
    },
    "long": {
      fill: "#0D0C1B",
      stroke: "#0FEF33"
    },
    indicators: {
      ema: ["#FF1480", "#8E0CFF", "#0AF3FF", "#3FD379", "#FFF74F"],
      channel: "#3B82E6",
      ichimoku: {
        tenkanSen: "#3CB6B5",
        kijunSen: "#CA0088",
        chikouSpan: "#3F5700",
        senkouSpanA: "#047D1C",
        senkouSpanB: "#620512",
        cloud: "#0D1628"
      }
    }
  }), b.registerTheme("albuquerque", {
    background: "#EFE7D2",
    text: "#46405A",
    textStrong: "#1A182C",
    crosshair: "rgba(58,53,75,0.4)",
    guide: "rgba(58,53,75,0.25)",
    alert: "#0058AD",
    "short": {
      fill: "#c51c1c",
      stroke: "#841912"
    },
    "long": {
      fill: "#2EA35F",
      stroke: "#217542"
    },
    indicators: {
      ema: ["#C34F53", "#8A3CB2", "#5D87C8", "#57C674", "#988521"],
      channel: "#788D50",
      ichimoku: {
        tenkanSen: "#5BA6B3",
        kijunSen: "#CD66A9",
        chikouSpan: "#626174",
        senkouSpanA: "#6CB57E",
        senkouSpanB: "#C86C64",
        cloud: "#E4E0CB"
      }
    }
  }), b.setTheme($("body").attr("color-scheme"))
}(),
function() {
  function b(a, b) {
    this.layers = {}, this.fields = {}, b = b || {}, this._layersOrder = [], this.DOMElement = document.querySelector(a), this.cursor = new c(this.DOMElement, b.cursor), this.cursor.on("mousemove", function(a, b) {
      for (var c in this.fields) {
        var d = this.fields[c];
        d.unpaddedRange.bottom >= b.y && d.unpaddedRange.top <= b.y && d.name !== "yaxis" && d.name !== "priceConverted" && (this.cursor.state.activeFieldY = d), d.unpaddedRange.right >= b.x && d.unpaddedRange.left <= b.x && (this.cursor.state.activeFieldX = d), d.unpaddedRange.bottom >= b.y && d.unpaddedRange.top <= b.y && d.unpaddedRange.right >= b.x && d.unpaddedRange.left <= b.x && (this.cursor.state.activeField = d)
      }
    }.bind(this)).on("mousedown", function() {
      for (var a in this.layers) {
        var b = this.layers[a];
        b.hoverareaState.hover !== undefined && (b.hoverareaState.active = b.hoverareaState.hover, b.hoverareaState.active.active())
      }
    }.bind(this)).on("mouseup", function() {
      this.unactivateHoverarea()
    }.bind(this)).on("mousemove", function() {
      this.scanHoverareas()
    }.bind(this)).on("mouseenter", function() {
      this.setCursorType("crosshair")
    }.bind(this)).on("mouseleave", function() {
      this.unhoverHoverarea(), this.setCursorType("crosshair")
    }.bind(this)).on("click", function() {
      var a = this.activeHoverarea();
      a && a.click(this.cursor.state.posn)
    }.bind(this)).on("drag", function(a, b, c) {
      var d = this.activeHoverarea();
      if (d) return d.drag(this.cursor.state.posn, b, c), !1
    }.bind(this))
  }

  function c(a, b) {
    this.state = {
      down: !1,
      dragging: !1,
      posn: new Posn(0, 0),
      lastEvent: null,
      lastDownEvent: null,
      mousemoveAccum: {
        x: 0,
        y: 0
      },
      activeField: null
    }, this._callbacks = {}, this.opts = b || {}, this.DOMElement = a, $(a).on("mouseenter", function(a) {
      this.mouseenter(a)
    }.bind(this)).on("mousemove", function(a) {
      this.mousemove(a)
    }.bind(this)).on("mousedown", function(a) {
      this.mousedown(a)
    }.bind(this)).on("contextmenu", function(a) {
      a.preventDefault()
    }.bind(this)).on("mouseleave", function(a) {
      this.mouseleave(a)
    }.bind(this)), $(document).on("mouseup", function(a) {
      this.state.down && this.mouseup(a)
    }.bind(this))
  }
  var a = function(a) {
    var b = this;
    this.DOMElement = document.querySelector(a), this.context = this.DOMElement.getContext("2d"), this.context.font = "11px 'Droid Sans Mono', monospace", this.setCursorType("crosshair")
  };
  a.prototype = {
    clear: function() {
      this.context.clearRect(0, 0, this.width, this.height)
    },
    drawLine: function(a, b, c, d) {
      d = d || {}, this.context.strokeStyle = c, this.context.beginPath();
      for (var e = 0; e < a.length; e++) {
        var f = a[e],
          g = b(f, e);
        e === 0 ? this.context.moveTo(g.x, g.y) : this.context.lineTo(g.x, g.y)
      }
      d.alpha && (this.context.globalAlpha = d.alpha), this.context.stroke(), d.alpha && (this.context.globalAlpha = 1), this.context.closePath()
    },
    drawDashedLine: function(a, b, c, d) {
      d = d || {}, d.evenOddOffset || (d.evenOddOffset = 0), this.context.strokeStyle = c, this.context.beginPath();
      for (var e = 0; e < a.length; e++) {
        var f = a[e],
          g = b(f, e);
        (e + d.evenOddOffset) % 2 == 0 ? (this.context.beginPath(), this.context.moveTo(g.x, g.y)) : (this.context.lineTo(g.x, g.y), this.context.stroke(), this.context.closePath())
      }
    },
    drawLineSegment: function(a, b, c) {
      c || (c = {}), c = $.extend({
        color: cryptowatch.colors.theme.text.toString(),
        alpha: 1
      }, c), this.context.globalAlpha = c.alpha, this.context.strokeStyle = c.color, this.context.beginPath(), this.context.moveTo(a.x, a.y), this.context.lineTo(b.x, b.y), this.context.stroke(), this.context.closePath(), this.context.globalAlpha = 1
    },
    drawDashedHorizontalLineSegment: function(a, b, c, d, e) {
      c = Math.floor(c) + .5, e = e || {}, e.alpha = e.alpha || .5, this.context.globalAlpha = e.alpha;
      var f = Math.min(cryptowatch.chart.utils.roundUpTo(a, 4), cryptowatch.chart.utils.roundUpTo(b, 4)),
        g = Math.max(cryptowatch.chart.utils.roundUpTo(a, 4), cryptowatch.chart.utils.roundUpTo(b, 4));
      this.context.strokeStyle = d;
      for (var h = f; h + 4 <= g; h += 4) this.context.beginPath(), this.context.moveTo(h, c), this.context.lineTo(h + 2, c), this.context.stroke(), this.context.closePath();
      this.context.globalAlpha = 1
    },
    drawDashedVerticalLineSegment: function(a, b, c, d) {
      c = Math.floor(c) + .5;
      var e = Math.min(cryptowatch.chart.utils.roundTo(a, 4), cryptowatch.chart.utils.roundTo(b, 4)),
        f = Math.max(cryptowatch.chart.utils.roundTo(a, 4), cryptowatch.chart.utils.roundTo(b, 4));
      this.context.globalAlpha = .5, this.context.strokeStyle = d;
      for (var g = e; g + 4 <= f; g += 4) this.context.beginPath(), this.context.moveTo(c, g), this.context.lineTo(c, g + 2), this.context.stroke(), this.context.closePath();
      this.context.globalAlpha = 1
    },
    drawRectangle: function(a, b, c, d) {
      this.context.strokeStyle = c, this.context.fillStyle = d, d && this.context.fillRect(a.x, a.y, Math.abs(b.x - a.x), Math.abs(b.y - a.y)), c && this.context.strokeRect(a.x, a.y, Math.abs(b.x - a.x), Math.abs(b.y - a.y))
    },
    drawCircle: function(a, b, c, d, e) {
      e = e || {}, this.context.beginPath(), d && (this.context.fillStyle = d), c && (this.context.strokeStyle = c), this.context.arc(a.x, a.y, b, 0, Math.PI * 2, !0), e.fillAlpha !== undefined && (this.context.globalAlpha = e.fillAlpha), d && this.context.fill(), e.fillAlpha !== undefined && (this.context.globalAlpha = 1), e.strokeAlpha !== undefined && (this.context.globalAlpha = e.strokeAlpha), c && this.context.stroke(), e.strokeAlpha !== undefined && (this.context.globalAlpha = 1), this.context.closePath()
    },
    drawTriangle: function(a, b, c) {
      var d = a.x,
        e = a.y;
      switch (c) {
        case "left":
          this.context.fillStyle = b, this.context.globalAlpha = 1, this.context.beginPath(), this.context.moveTo(d, e), this.context.lineTo(d + 6, e - 3), this.context.lineTo(d + 6, e + 3), this.context.fill(), this.context.closePath();
          break;
        case "right":
          this.context.fillStyle = b, this.context.globalAlpha = 1, this.context.beginPath(), this.context.moveTo(d, e), this.context.lineTo(d - 6, e - 3), this.context.lineTo(d - 6, e + 3), this.context.fill(), this.context.closePath()
      }
    },
    drawEye: function(a, b, c) {
      c = c || {};
      var d = c.width || 20,
        e = c.height || 10;
      this.context.moveTo(a.x, a.y), this.context.bezierCurveTo(a.x, a.y, a.x + d / 4, a.y - e / 2, a.x + d / 2, a.y - e / 2), this.context.bezierCurveTo(a.x + d / 4 * 3, a.y - e / 2, a.x + d, a.y, a.x + d, a.y), this.context.bezierCurveTo(a.x + d, a.y, a.x + d / 4 * 3, a.y + e / 2, a.x + d / 2, a.y + e / 2), this.context.bezierCurveTo(a.x + d / 4, a.y + e / 2, a.x, a.y, a.x, a.y), this.context.closePath(), this.context.stroke(), this.drawCircle({
        x: a.x + d / 3,
        y: a.y
      }, e / 4), this.context.stroke()
    },
    drawArea: function(a, b, c, d, e) {
      e.fill && (this.context.fillStyle = e.fill), e.stroke && (this.context.strokeStyle = e.stroke), this.context.beginPath(), a.forEach(function(a, c) {
        var d = b(a);
        this.context[c == 0 ? "moveTo" : "lineTo"](d.x, d.y)
      }.bind(this)), c.slice(0).reverse().forEach(function(a, b) {
        var c = d(a);
        this.context.lineTo(c.x, c.y)
      }.bind(this)), e.fillAlpha && (this.context.globalAlpha = e.fillAlpha), e.fill && this.context.fill(), e.fillAlpha && (this.context.globalAlpha = 1), e.strokeAlpha && (this.context.globalAlpha = e.strokeAlpha), e.stroke && this.context.stroke(), e.strokeAlpha && (this.context.globalAlpha = 1), this.context.closePath()
    },
    _sharpenCoords: function(a) {
      return {
        x: Math.floor(a.x),
        y: Math.floor(a.y)
      }
    },
    drawText: function(a, b, c, d) {
      d = d || {}, this.context.font = "11px 'Droid Sans Mono', monospace", this.context.textAlign = d.align || "start", this.context.globalAlpha = d.opacity || 1, this.context.fillStyle = c, a = this._sharpenCoords(a), this.context.fillText(b, a.x, a.y + 4), this.context.globalAlpha = 1
    },
    fields: {},
    hoverareas: [],
    hoverareasIndex: {},
    hoverareaState: {
      hover: undefined,
      active: undefined
    },
    registerHoverarea: function(a) {
      this.hoverareas.push(a), this.hoverareasIndex[a.name] = a, a.canvas = this
    },
    resetHoverareas: function() {
      this.hoverareas = [], this.hoverareasIndex = {}
    },
    hoverareaActiveRelease: function() {
      this.hoverareaState.active && (this.hoverareaState.active.inactive(), delete this.hoverareaState.active)
    },
    _scanForHoverarea: function(a) {
      var b = this.hoverareas.slice(0).reverse();
      for (var c = 0; c < b.length; c++) {
        var d = b[c];
        if (d.opts.compatibleTools && d.opts.compatibleTools.indexOf(cryptowatch.chart.tool) === -1) continue;
        if (d.opts.incompatibleTools && d.opts.incompatibleTools.indexOf(cryptowatch.chart.tool) !== -1) continue;
        if (d.overlaps(a)) {
          var e = this.hoverareaState.hover;
          if (d === e) return !0;
          this.hoverareaState.hover = d, e && e.leave();
          var f = d.hover() !== !1;
          return f && d.opts.cursor && this.setCursorType(d.opts.cursor), !0
        }
      }
      return this.hoverareaState.hover !== undefined && (this.hoverareaState.hover.leave(), delete this.hoverareaState.hover, this.setCursorType("crosshair")), !1
    },
    setCursorType: function(a) {
      this.DOMElement.parentNode.setAttribute("cursor", a)
    },
    refreshSize: function() {
      var a = window.devicePixelRatio;
      a === undefined && (a = 1);
      var b = Math.floor(this.DOMElement.offsetWidth),
        c = Math.floor(this.DOMElement.offsetHeight);
      if (b === 0 && c === 0) return;
      this.DOMElement.width = b * a, this.DOMElement.height = c * a, this.width = b, this.height = c, this.context.scale(a, a), this.resize !== undefined && this.resize()
    }
  }, b.prototype.registerLayer = function(b, c) {
    var d = new a(c);
    return this.layers[b] = d, this._layersOrder.push(b), d.refreshSize(), $(window).on("resize.canvas-" + b, d.refreshSize.bind(d)), this
  }, b.prototype.scanHoverareas = function() {
    for (var a in this.layers) {
      var b = this.layers[a];
      if (b._scanForHoverarea(this.cursor.state.posn)) break
    }
  }, b.prototype.hoverHoverarea = function() {
    for (var a in this.layers) {
      var b = this.layers[a];
      if (b.hoverareaState.hover !== undefined) return b.hoverareaState.hover
    }
  }, b.prototype.activeHoverarea = function() {
    for (var a in this.layers) {
      var b = this.layers[a];
      if (b.hoverareaState.active !== undefined) return b.hoverareaState.active
    }
  }, b.prototype.unhoverHoverarea = function() {
    for (var a in this.layers) {
      var b = this.layers[a];
      b.hoverareaState.hover && (b.hoverareaState.hover.leave(), delete b.hoverareaState.hover)
    }
  }, b.prototype.unactivateHoverarea = function() {
    for (var a in this.layers) {
      var b = this.layers[a];
      b.hoverareaState.active && delete b.hoverareaState.active
    }
  }, b.prototype.registerHoverarea = function(a) {
    this.hoverareas.push(a), this.hoverareasIndex[a.name] = a, a.canvas = this
  }, b.prototype.setCursorType = function(a) {
    this.DOMElement.setAttribute("cursor", a)
  }, c.prototype = {
    on: function(a, b) {
      return this._callbacks[a] === undefined ? this._callbacks[a] = [b] : this._callbacks[a].push(b), this
    },
    trigger: function(a) {
      var b = this._callbacks[a],
        c = Array.prototype.slice.call(arguments, 1);
      if (b !== undefined)
        for (var d = 0; d < b.length; d++) {
          var e = b[d].apply(this, c) !== !1;
          if (!e) break
        }
      return this
    },
    drag: function(a) {
      this.state.dragging = !0;
      var b = {
          x: a.pageX - this.state.lastEvent.pageX,
          y: a.pageY - this.state.lastEvent.pageY
        },
        c = {
          x: 0,
          y: 0
        };
      if (this.opts.dragSnap && this.opts.dragSnap.x) {
        this.state.mousemoveAccum.x += b.x;
        var d = Math.abs(this.state.mousemoveAccum.x);
        d >= this.opts.dragSnap.x && (c.x = Math.floor(this.state.mousemoveAccum.x / this.opts.dragSnap.x) * this.opts.dragSnap.x, this.state.mousemoveAccum.x -= c.x)
      } else c.x = b.x; if (this.opts.dragSnap && this.opts.dragSnap.y) {
        this.state.mousemoveAccum.y += b.y;
        var d = Math.abs(this.state.mousemoveAccum.y);
        d >= this.opts.dragSnap.y && (c.y = Math.floor(d / this.opts.dragSnap.y) * this.opts.dragSnap.y, this.state.mousemoveAccum.y -= c.y)
      } else c.y = b.y;
      this.trigger("drag", a, this.state.posn, b, c)
    },
    setDragSnapping: function(a) {
      a = a || {}, a.x && (this.opts.dragSnap.x = a.x), a.y && (this.opts.dragSnap.y = a.y)
    },
    mouseenter: function(a) {
      this.trigger("mouseenter", a, this.state.posn)
    },
    mousemove: function(a) {
      cryptowatch.utils.calculateOffsetForTarget(a, this.DOMElement), this.state.posn = new Posn(a.offsetX, a.offsetY), this.state.lastEvent !== null && (this.state.down ? this.drag(a) : this.trigger("mousemove", a, this.state.posn)), this.state.lastEvent = a
    },
    mouseleave: function(a) {
      this.state.posn.x = -1e3, this.state.posn.y = -1e3, this.trigger("mouseleave", a, this.state.posn), delete this.state.activeField, delete this.state.activeFieldY, delete this.state.activeFieldX
    },
    mouseup: function(a) {
      if (this.state.lastDownEvent)
        if (Math.abs(a.pageX - this.state.lastDownEvent.pageX) < 5) {
          if (a.which == 3 || a.which < 2 && a.ctrlKey) this.trigger("rightclick", a, this.state.posn);
          else if (a.which == 1 || a.which == 0) this.trigger("click", a, this.state.posn), this.state.down = !1
        } else this.trigger("stopDrag", a, this.state.posn);
      this.trigger("mouseup", a, this.state.posn), this.state.mousemoveAccum.x = 0, this.state.mousemoveAccum.y = 0, this.state.down = !1, this.state.lastEvent = null, this.state.dragging = !1
    },
    mousedown: function(a) {
      cryptowatch.utils.calculateOffsetForTarget(a, this.DOMElement), this.state.down = !0, this.state.lastDownEvent = a, this.state.posn = new Posn(a.offsetX, a.offsetY), this.trigger("mousedown", a, this.state.posn)
    }
  }, window.MultiLayerCanvas = b, window.CursorTracking = c
}(),
function() {
  function c(a, b) {
    this.root = a, this.$root = $(a), this.which = b, this.initialize()
  }
  var a = .01,
    b = cryptowatch.trading = {
      initialize: function() {
        this.enabled = $("body").attr("trading") === "enabled";
        if (!this.enabled) return;
        b.overlay = $("body").attr("trading-overlay") === "enabled", b.asksModule = new c("#ask-placement", "ask"), b.bidsModule = new c("#bid-placement", "bid"), b.$container = $("#order-placement"), b.$orderTypeSelector = $("#order-type"), b.$orderTypeContainer = $("#order-placement-info--order-type"), b.$orderTypeSelector.change(function(a) {
          var c = a.target.value;
          b.setOrderType(c), cryptowatch.utils.savePreferenceInCookie("selected-order-type", c)
        }), b.selectedOrderType = $("#order-placement").attr("selected-order-type")
      },
      setOrderType: function(a) {
        b.$container.attr("selected-order-type", a), b.selectedOrderType = a, b.asksModule.updatePrice(), b.bidsModule.updatePrice()
      },
      _placingOrder: !1,
      placeOrder: function(a) {
        if (b._placingOrder) return;
        b._placingOrder = !0, a.type = b.selectedOrderType, cryptowatch.socket.send({
          action: "placeOrder",
          data: a
        })
      },
      disableOrderTypeSelector: function() {
        b.$orderTypeContainer.attr("disabled", !0)
      },
      enableOrderTypeSelector: function() {
        b.$orderTypeContainer.removeAttr("disabled")
      },
      resetToDefault: function() {
        b.asksModule.enable().showForm(), b.bidsModule.enable().showForm(), b.enableOrderTypeSelector(), b.$container.removeAttr("pending")
      },
      status: function(a) {
        b.$status.text(a)
      },
      handleTradeCompletion: function(a) {
        b.$container.removeAttr("pending"), b._placingOrder = !1, b.resetToDefault()
      }
    };
  c.prototype = {
    initialize: function() {
      this.$mainButton = this.$root.find(".place-button--main"), this.$confirmButton = this.$root.find(".place-button--confirm"), this.$cancelbutton = this.$root.find(".place-button--cancel"), this.$range = this.$root.find('input[type="range"]'), this.$vwap = this.$root.find(".place-vwap"), this.$finalp = this.$root.find(".place-finalp"), this.$confirmPrice = this.$root.find(".place-price-confirm"), this.$confirmAmount = this.$root.find(".place-amount-confirm"), this.$confirmTotal = this.$root.find(".place-total-confirm"), this.$confirmType = this.$root.find(".place-order-type-confirm"), this.$opposingVwap = this.$root.find(".place-opposing-vwap"), this.$publcOrderContainer = $("#" + (this.which === "ask" ? "asks" : "bids") + "-list"), this.$status = $(".place-status-message"), this.$amount = this.$root.find("input.place-amount"), this.$price = this.$root.find("input.place-price"), this.$total = this.$root.find(".place-total"), this._hasAlteredPrice = !1, this.price = 0, this.amount = 0, this.$range.on("input", this.updateAmount.bind(this));
      var a = localStorage.getItem("trading:range:" + this.which + ":val");
      a !== undefined && this.$range.val(a), this.$mainButton.on("click", function() {
        b.$status = this.$status, this.disableOthers(), this.confirm()
      }.bind(this)), this.$confirmButton.on("click", function() {
        this.place()
      }.bind(this)), this.$cancelbutton.on("click", this.cancel.bind(this)), this.$amount.on("keyup", function(a) {
        var b = parseFloat(a.target.value),
          c;
        if (isNaN(b)) return;
        this.amount = b;
        if (this.which === "ask") this.$range.val(cryptowatch.account.balanceScales.base.invert(b));
        else {
          var d = cryptowatch.depth.pricesForAmount(b, "Asks");
          this.$range.val(cryptowatch.account.balanceScales.quote.invert(d.sum))
        }
        this.updatePrice()
      }.bind(this)), this.$price.on("keyup", function(a) {
        var b = parseFloat(a.target.value);
        this._hasAlteredPrice = !0, this.handlePriceChange(b), this.updatePrice()
      }.bind(this))
    },
    confirm: function() {
      this.$root.attr("confirmation", !0), this.confirming = !0
    },
    showForm: function() {
      return this.$root.removeAttr("confirmation").removeAttr("working"), delete this.confirming, this
    },
    cancel: function() {
      return this.showForm(), b.resetToDefault(), this
    },
    place: function() {
      this.$root.attr("working", !0), b.status("Initializing order"), b.placeOrder({
        side: this.which === "ask" ? 0 : 1,
        amount: this.amount,
        price: this.price
      })
    },
    disableOthers: function() {
      this.which === "ask" ? b.bidsModule.disable() : b.asksModule.disable(), b.disableOrderTypeSelector(), b.$container.attr("pending", !0)
    },
    handlePriceChange: function(a) {
      this.price = a, this.updateAmount()
    },
    updateAmount: function() {
      if (this.$amount.is(":focus")) return;
      var c = parseFloat(this.$range.val());
      localStorage.setItem("trading:range:" + this.which + ":val", c);
      switch (this.which) {
        case "ask":
          this.hasEnoughBalance() ? b.bidsModule.confirming || this.enable() : this.disable();
          break;
        case "bid":
          this.hasEnoughBalance() ? b.asksModule.confirming || this.enable() : this.disable()
      }
      if (cryptowatch.account.balanceScales) {
        if (this.which === "ask") this.amount = cryptowatch.account.balanceScales.base(c);
        else if (b.selectedOrderType === "market") {
          var d = cryptowatch.depth.orders.Asks[0].Price,
            e = a * d;
          this.amount = cryptowatch.depth.depthForTotalCost(e + (cryptowatch.account.balance.quote - e) * c, "Asks")
        } else this.amount = a + this.$range.val() * (cryptowatch.account.balance.quote / this.price - a);
        this.$amount.val(cryptowatch.currency.fmt(this.amount, cryptowatch.currencyPair.base, {
          label: !1
        }))
      }
      this._clipAmount(), this.updatePrice()
    },
    _clipAmount: function() {
      this.amount = parseFloat(cryptowatch.currency.fmt(this.amount, cryptowatch.currencyPair.base, {
        label: !1
      }))
    },
    disable: function() {
      this.$root.attr("disabled", !0)
    },
    enable: function() {
      if (!this.hasEnoughBalance()) return;
      return this.$root.removeAttr("disabled"), this
    },
    handleFairMarketPrice: function(a) {
      if (this._hasAlteredPrice) return;
      if (this.$price.is(":focus")) return;
      if (this.confirming === !0) return;
      this.price = a, this.updatePrice()
    },
    hasEnoughBalance: function() {
      switch (this.which) {
        case "ask":
          return cryptowatch.account.balance.base >= a;
        case "bid":
          return cryptowatch.account.balance.quote >= a * cryptowatch.depth.orders.Asks[0].Price
      }
    },
    updatePrice: function() {
      if (!this.confirming)
        if (b.selectedOrderType === "market") {
          var a, c, d = cryptowatch.depth.pricesForAmount(this.amount, this.which == "ask" ? "Bids" : "Asks");
          this.total = d.sum, this.$vwap.text(cryptowatch.currency.fmt(d.vwap, cryptowatch.currencyPair.quote, {
            label: !1
          })), this.$confirmPrice.text(cryptowatch.currency.fmt(d.vwap, cryptowatch.currencyPair.quote, {
            label: !0
          })), this.$finalp.text(cryptowatch.currency.fmt(d.finalp, cryptowatch.currencyPair.quote, {
            label: !1
          }))
        } else b.selectedOrderType === "limit" && (this.$confirmPrice.text(cryptowatch.currency.fmt(this.price, undefined, {
          label: !1
        })), this.$price.is(":focus") || this.$price.val(cryptowatch.currency.fmt(this.price, undefined, {
          label: !1
        })), this.total = this.price * this.amount, this.$confirmPrice.text(cryptowatch.currency.fmt(this.price, cryptowatch.currencyPair.quote, {
          label: !0
        })));
      this.$confirmAmount.text(cryptowatch.currency.fmt(this.amount, cryptowatch.currencyPair.base, {
        label: !0
      })), this.$total.text(cryptowatch.currency.fmt(this.total, cryptowatch.currencyPair.quote, {
        label: !1
      })), this.$confirmTotal.text(cryptowatch.currency.fmt(this.total, cryptowatch.currencyPair.quote, {
        label: !0
      })), this.$confirmType.text(b.selectedOrderType)
    }
  }, b.initialize()
}(),
function() {
  function b(b, c, d, e) {
    this.slug = d, e.side && (this.side = e.side), this.reposition = e.reposition === !0, this.$button = $(b), this.$dropdown = $(c), a.dropdowns[d] = this, a.open[d] = !1, [this.$button, this.$dropdown].forEach(function(b) {
      b.mousemove(function(b) {
        if (a.currentlyOpen && a.currentlyOpen !== this && a.currentlyOpen.posnInsideTriangle({
          x: b.pageX,
          y: b.pageY
        })) {
          a.hovering = this;
          return
        }
        for (var c in a.dropdowns) c !== d && a.dropdowns[c].close();
        this.open()
      }.bind(this)).mouseleave(function() {
        delete a.hovering, a.open[d] = !1, setTimeout(function() {
          a.open[d] === !1 && this.close()
        }.bind(this), 250)
      }.bind(this))
    }.bind(this))
  }
  var a = cryptowatch.nav = {
    dropdowns: {},
    open: {
      orderBook: $("body").attr("order-book-open") === "true"
    },
    refreshDropdowns: function() {
      for (var b in a.dropdowns) a.open[b] && a.dropdowns[b].updatePosition()
    },
    toggleOrderBook: function() {
      var b = $("body");
      b.attr("order-book-open") == "true" ? (a.open.orderBook = !1, b.attr("order-book-open", "false"), cryptowatch.utils.savePreferenceInCookie("order-book-open", "false")) : (a.open.orderBook = !0, b.attr("order-book-open", "true"), cryptowatch.utils.savePreferenceInCookie("order-book-open", "true")), cryptowatch.chart._viewportChange(), cryptowatch.chart.refresh.all(), cryptowatch.chart.canvas.layers.axes.refreshSize(), cryptowatch.chart.canvas.layers.chart.refreshSize(), cryptowatch.chart.canvas.layers.drawing.refreshSize(), setTimeout(function() {
        cryptowatch.depth.canvas.layers.depth.refreshSize(), cryptowatch.depth.canvas.layers.axis.refreshSize(), cryptowatch.depth.refresh()
      }, 1), cryptowatch.nav.refreshDropdowns()
    }
  };
  b.prototype.close = function() {
    a.currentlyOpen === this && delete a.currentlyOpen, a.hovering && a.hovering.open(), a.open[this.slug] = !1, this.$dropdown.hide(), this.$button.removeClass("is-open")
  }, b.prototype.updatePosition = function() {
    if (!this.reposition) return;
    var a = {},
      b = this.$button.offset();
    this.side === "left" ? a.left = b.left : this.side === "right" && (a.right = window.innerWidth - (b.left + this.$button.outerWidth()));
    var c = this.$button.outerWidth(),
      d = this.$dropdown.outerWidth();
    c > d && (a.width = c), a.top = b.top + this.$button.outerHeight() - 1, this.$dropdown.css(a)
  }, b.prototype.calculateTriangle = function() {
    var a = this.$button.offset(),
      b = this.$button.outerHeight(),
      c = this.$button.outerWidth(),
      d = this.$dropdown.offset(),
      e = this.$dropdown.outerWidth(),
      f = this.triangle = {};
    this.side === "left" ? (f.posn1 = {
      x: a.left + c,
      y: a.top
    }, f.posn2 = {
      x: d.left + e,
      y: d.top
    }) : this.side === "right" && (f.posn1 = {
      x: a.left,
      y: a.top
    }, f.posn2 = {
      x: d.left,
      y: d.top
    }), f.min = {
      x: Math.min(f.posn1.x, f.posn2.x),
      y: Math.min(f.posn1.y, f.posn2.y)
    }, f.max = {
      x: Math.max(f.posn1.x, f.posn2.x),
      y: Math.max(f.posn1.y, f.posn2.y)
    }, f.slope = (f.posn2.y - f.posn1.y) / (f.posn2.x - f.posn1.x)
  }, b.prototype.posnInsideTriangle = function(a) {
    if (a.x < this.triangle.min.x) return !1;
    if (a.x > this.triangle.max.x) return !1;
    if (a.y > this.triangle.max.y) return !1;
    var b = (a.x - this.triangle.posn1.x) * this.triangle.slope;
    return a.y > b
  }, b.prototype.open = function() {
    a.currentlyOpen = this, a.open[this.slug] = !0, this.$button.addClass("is-open"), this.updatePosition(), this.$dropdown.show(), this.$button.addClass("is-open"), this.calculateTriangle()
  }, b.prototype.toggle = function() {
    a.open[this.slug] ? this.close() : this.open()
  }, new b("#market", "#markets-dropdown", "market", {
    side: "left",
    reposition: !0
  }), new b("#interval", "#intervals-dropdown", "interval", {
    side: "left",
    reposition: !0
  }), new b("#contract-period", "#contract-periods-dropdown", "contract-period", {
    side: "left",
    reposition: !0
  }), new b("#open-settings", "#settings", "settings", {
    side: "right",
    reposition: !0
  }), new b("#open-shortcuts", "#shortcuts", "shortcuts", {
    side: "right",
    reposition: !0
  }), new b("#open-alerts", "#alerts", "alerts", {
    side: "right",
    reposition: !0
  }), new b("#open-update-client", "#update-client", "update-client", {
    side: "right",
    reposition: !0
  }), a.periodMenu = React.render(cryptowatch.components.PeriodsMenu({
    periods: cryptowatch.intervalPeriodsInOrder
  }), document.getElementById("intervals-dropdown")), $("#right-column-reveal-left").click(function() {
    cryptowatch.nav.toggleOrderBook()
  }), $("[data-tool]").click(function(a) {
    var b = $(a.target).closest("[data-tool]").data("tool");
    cryptowatch.chart.selectTool(b)
  })
}(),
function() {
  var a = .01,
    b = cryptowatch.account = {
      initialize: function() {
        cryptowatch.apiAccess && setInterval(function() {
          b.updateBalanceBars()
        }, 3e4), this.$tradesUl = $("#my-trade-history ul"), this.$tradesUl.mouseleave(function() {
          delete cryptowatch.chart.tradeHovered, cryptowatch.chart.refresh.all()
        })
      },
      balance: {},
      handleBalances: function(c) {
        var d = c[cryptowatch.currencyPair.base],
          e = c[cryptowatch.currencyPair.quote];
        b.balance.base = d, b.balance.quote = e, $(".balance--base .balance__amount").text(cryptowatch.currency.fmt(b.balance.base, cryptowatch.currencyPair.base, {
          label: !1
        })), $(".balance--quote .balance__amount").text(cryptowatch.currency.fmt(b.balance.quote, cryptowatch.currencyPair.quote, {
          label: !1
        })), b.balanceScales = {
          base: d3.scale.linear().domain([0, 1]).range([a, Math.max(d, a)]),
          quote: d3.scale.linear().domain([0, 1])
        }, b.updateBalanceBars(), cryptowatch.trading.enabled && (cryptowatch.trading.asksModule.updateAmount(), cryptowatch.trading.bidsModule.updateAmount(), b.recalibrateQuoteScale())
      },
      recalibrateQuoteScale: function() {
        if (!b.balance.quote) return;
        var c = cryptowatch.depth.depthForTotalCost(b.balance.quote, "Asks");
        b.balanceScales.quote.range([a, Math.max(c, a)])
      },
      updateBalanceBars: function() {
        var a = b.balance.base + b.balance.quote / cryptowatch.ticker.lastPrice,
          c = b.balance.base / a;
        $(".balance__bar--base .balance__bar__filling").css({
          height: c * 100 + "%"
        }), $(".balance__bar--quote .balance__bar__filling").css({
          height: (1 - c) * 100 + "%"
        })
      },
      trades: [],
      handleTrades: function(a) {
        if (a === null || a.length == 0) return;
        a = a.sort(function(a, b) {
          return a.Timestamp - b.Timestamp
        });
        var c = b.trades.length === 0,
          d;
        if (!c) {
          var e = b.trades[b.trades.length - 1].Timestamp;
          d = a.filter(function(a) {
            return a.Timestamp > e
          });
          if (d.length === 0) return
        }
        if (c)
          for (var f = 0; f < a.length; f++) b.handleTrade(a[f], {
            animate: !1,
            idx: f
          });
        else {
          var g = d[0],
            h = d.slice(1);
          b.handleTrade(g, {
            animate: !0,
            idx: b.trades.length
          }), h.length > 0 && setTimeout(b.handleTrades.bind(b, h), Math.random() * 100 + 10)
        }
        cryptowatch.apiAccess && (cryptowatch.chart.refresh.chart(), cryptowatch.chart.refresh.axes())
      },
      handleTrade: function(a, c) {
        a._idx = c.idx;
        var d = a.ProfitPercentage > 0,
          e = a.Timestamp >= cryptowatch.chart.candles[0].Time,
          f = $('<li class="my-trade" clickable="' + (e ? "true" : "false") + '" data-trade-index="' + a._idx + '" data-trade-type="' + (a.Type === 1 ? "buy" : "sell") + '">' + '<div class="my-trade-time-ago live-timestamp" value="' + a.Timestamp + '" title="' + (new Date(a.Timestamp * 1e3)).toString() + '">' + cryptowatch.utils.timeAgo(a.Timestamp) + "</div>" + '<data class="my-trade-price ' + (a.Type === 1 ? "buy" : "sell") + '" data-label="false" ' + 'data-quotecurrency="' + cryptowatch.currencyPair.quote + '"' + 'value="' + a.Price + '">' + cryptowatch.currency.fmt(a.Price, cryptowatch.currencyPair.quote, {
            label: !1
          }) + "</data>" + '<div class="my-trade-amount">' + cryptowatch.currency.fmt(a.Amount, cryptowatch.currencyPair.base, {
            label: !1
          }) + "</div>" + "</li>");
        f.mouseover(function(b) {
          cryptowatch.chart.tradeHovered = a, cryptowatch.chart.refresh.all()
        }), f.click(cryptowatch.chart.jumpToTrade.bind(cryptowatch.chart, a)), b.$tradesUl.prepend(f), c.animate && (f.addClass("new"), b.$tradesUl.removeClass("zeroed").css({
          top: "-15px"
        }), setTimeout(function() {
          b.$tradesUl.addClass("zeroed"), b.$tradesUl.css({
            top: 0
          })
        }, 1), setTimeout(function() {
          f.removeClass("new")
        }, 1e3)), b.trades.push(a)
      },
      ordersIndex: {},
      _indexOrders: function() {
        if (!b.orders) return;
        b.ordersIndex = {}, b.orders.forEach(function(a) {
          b.ordersIndex[a.Price] === undefined ? b.ordersIndex[a.Price] = [a] : b.ordersIndex[a.Price].push(a)
        })
      },
      forgetOrdersAtPrice: function(a) {
        b.orders = b.orders.filter(function(b) {
          return b.Price !== a
        }), b._indexOrders()
      },
      handleOrders: function(a) {
        b.orders = a, cryptowatch.chart.refresh.axes(), cryptowatch.depth.refresh(), b._indexOrders()
      },
      pingForLatestState: function() {
        console.log("Pinging for update"), cryptowatch.socket.conn.send(JSON.stringify({
          action: "updateTradingState"
        }))
      },
      showFakeBalances: function() {
        var a = {};
        a[cryptowatch.currencyPair.base] = Math.random() * 10, a[cryptowatch.currencyPair.quote] = Math.random() * 10 * cryptowatch.ticker.lastPrice, b.handleBalances(a)
      },
      showFakeTrades: function() {
        var a = [];
        for (var c = 0; c < cryptowatch.chart.candles.length; c += Math.round(Math.random() * 20)) {
          var d = cryptowatch.chart.candles[c],
            e = d.Candle.Low + Math.random() * (d.Candle.High - d.Candle.Low),
            f = Math.random() * 10,
            g = d.Time + Math.round(Math.random() * cryptowatch.periodInt);
          a.push({
            Timestamp: g,
            Price: e,
            Amount: f,
            ProfitPercentage: -0.1 + Math.random() * .2,
            ProfitAlreadyCalculated: !0,
            Type: Math.round(Math.random() * 1),
            TotalAccountedFor: 0,
            Total: e * f
          })
        }
        b.handleTrades(a), b.showFakeBalances()
      }
    }
}(),
function() {
  var a = cryptowatch.currency = {
    exchangeRates: undefined,
    convert: function(b, c, d) {
      return c === d ? b : a.fiat.indexOf(c) === -1 ? b : a.exchangeRates === undefined ? b : c === undefined || d === undefined ? b : c === "USD" ? b * a.exchangeRates[d] : d === "USD" ? b / a.exchangeRates[c] : a.convert(a.convert(b, c, "USD"), "USD", d)
    },
    fmts: {
      BTC: "{!} BTC",
      LTC: "{!} LTC",
      DOGE: "{!} DGE",
      USD: "${!}",
      GBP: "£{!}",
      CNY: "¥{!}",
      EUR: "€{!}",
      CAD: "C${!}",
      ZAR: "R{!}"
    },
    decimals: {
      BTC: 5,
      LTC: 5,
      NMC: 5,
      PPC: 5,
      DOGE: 8,
      CAD: 3,
      USD: 3,
      GBP: 3,
      CNY: 2,
      EUR: 2,
      ZAR: 2
    },
    fmt: function(b, c, d) {
      d = $.extend({
        label: !0,
        stripTrailingZeros: !1
      }, d), c === undefined && (c = cryptowatch.currencyPair.quote), a.fiatPreference !== undefined && a.fiat.indexOf(c) > -1 && (b = a.convert(b, c, a.fiatPreference), c = a.fiatPreference);
      var e = a.toFixedSmart(b, c);
      d.stripTrailingZeros && (e = e.replace(/\.?0*$/, ""));
      if (!d.label) return e;
      var f = a.fmts[c];
      return typeof f == "function" ? f(e) : f.replace("{!}", e)
    },
    toFixedSmart: function(b, c) {
      var d = a.decimals[c],
        e = b.toFixed(d);
      if (parseFloat(e) > b) {
        var f = Math.max(0, b - Math.pow(10, -d));
        return f.toFixed(d)
      }
      return e
    },
    quoteCurrencyForPair: function(a) {
      return /doge/i.test(a) ? "DOGE" : a.substring(a.length - 3).toUpperCase()
    },
    fiatPreference: undefined,
    setFiatPreference: function(b) {
      a.fiatPreference = b, $("[data-quotecurrency]").each(function() {
        var c = $(this),
          d = parseFloat(c.attr("value")),
          e = c.attr("data-quotecurrency"),
          f = c.attr("data-label") === "true";
        if (isNaN(d)) return;
        if (b === undefined) c.text(a.fmt(d, e, {
          label: f
        }));
        else if (a.fiat.indexOf(e) > -1) {
          var g = a.convert(d, e, b);
          c.text(a.fmt(g, b, {
            label: f
          }))
        }
      });
      var c = b || "actual";
      $("#currency-dropdown").attr("data-selected", c), $("#currency-dropdown").find("a").show(), $("#currency-dropdown").find('a[data-option="' + c + '"]').hide();
      var d = b || cryptowatch.i18n["actual-currency"];
      $("#currency-preference-selected").text(d), cryptowatch.utils.savePreferenceInCookie("fiat-display", c), cryptowatch.chart.initialized && (cryptowatch.chart._viewportChange(), cryptowatch.chart.refresh.all()), cryptowatch.depth && (cryptowatch.depth.refresh(), cryptowatch.depth.orderBookInterface && (c === "actual" ? cryptowatch.depth.orderBookInterface.setState({
        fiatPreference: cryptowatch.currencyPair.quote
      }) : cryptowatch.depth.orderBookInterface.setState({
        fiatPreference: c
      }))), cryptowatch.alerts.redrawInterface()
    },
    fiat: ["USD", "CNY", "EUR", "CAD", "ZAR", "GBP"]
  }
}(),
function() {
  var a = cryptowatch.statsd = {
    _send: function(a) {
      return
    },
    increment: function(b) {
      a._send({
        action: "increment",
        series: b
      })
    },
    decrement: function(b) {
      a._send({
        action: "decrement",
        series: b
      })
    },
    timing: function(b, c) {
      a._send({
        action: "timing",
        series: b,
        duration: c
      })
    }
  }
}(),
function() {
  var a = cryptowatch.config = {
    initialize: function() {
      this._getCached(), this._setupListeners(), this.writeConfigToDom(), localStorage.setItem("lastRevision", cryptowatch.revision)
    },
    bottomIndicators: ["rsi", "aroon", "macd", "obv", "volume"],
    defaultConfig: {
      candleWidth: 5,
      depthZoomLevel: .015,
      indicators: {
        ema: {
          periods: [10, 21, 100, null, null],
          show: !0
        },
        sar: {
          step: .025,
          maxStep: .05,
          show: !0
        },
        bollingerBands: {
          show: !1,
          period: 20,
          stddevs: 2
        },
        keltnerChannel: {
          show: !1,
          atrPeriod: 14,
          atrs: 2
        },
        volume: {
          show: !0,
          height: 90
        },
        macd: {
          show: !0,
          periods: [10, 26],
          lag: 9,
          height: 150
        },
        rsi: {
          show: !1,
          periods: 14,
          height: 100
        },
        obv: {
          show: !1,
          maPeriods: 21,
          height: 100
        },
        aroon: {
          show: !1,
          periods: 25,
          height: 100
        },
        ichimoku: {
          show: !1,
          tenkanPeriod: 9,
          kijunPeriod: 26
        },
        chandelierExit: {
          show: !1,
          periods: 22,
          atrs: 1
        },
        zigzag: {
          show: !1,
          threshold: 7
        }
      },
      mouse: {
        scrollX: !0,
        scrollY: !0
      },
      showTrades: !0,
      showOrders: !0,
      grid: !1,
      chartStyle: "OHLC",
      yAxis: "linear",
      yaxis: {
        depth: !1
      },
      performance: {
        animateFeeds: !0
      }
    },
    _getCached: function() {
      var b = JSON.parse(localStorage.getItem("config"));
      if (b === null || b.indicators === undefined || b.yAxis === undefined) b = $.extend(!0, {}, a.defaultConfig);
      else {
        b = $.extend({}, a.defaultConfig, b);
        for (var c in a.defaultConfig.indicators) b.indicators[c] = $.extend({}, a.defaultConfig.indicators[c], b.indicators[c])
      }
      a.config = b, a.config.candleWidth % 2 == 0 && (a.config.candleWidth = 5), a.config.depthZoomLevel || (a.config.depthZoomLevel = a.defaultConfig.depthZoomLevel), a.cache()
    },
    cache: function() {
      localStorage.setItem("config", JSON.stringify(a.config))
    },
    shouldDraw: {
      ema: function() {
        return a.config.indicators.ema.show
      },
      sar: function() {
        return a.config.indicators.sar.show && !!a.config.indicators.sar.step && !!a.config.indicators.sar.maxStep
      },
      bollingerBands: function() {
        return a.config.indicators.bollingerBands.show && !!a.config.indicators.bollingerBands.period && !!a.config.indicators.bollingerBands.stddevs
      },
      keltnerChannel: function() {
        return a.config.indicators.keltnerChannel.show && !!a.config.indicators.keltnerChannel.atrPeriod && !!a.config.indicators.keltnerChannel.atrs
      },
      volume: function() {
        return a.config.indicators.volume.show
      },
      macd: function() {
        return a.config.indicators.macd.show && !!a.config.indicators.macd.periods[0] && !!a.config.indicators.macd.periods[1] && !!a.config.indicators.macd.lag
      },
      rsi: function() {
        return a.config.indicators.rsi.show && !!a.config.indicators.rsi.periods
      },
      obv: function() {
        return a.config.indicators.obv.show && !!a.config.indicators.obv.maPeriods
      },
      aroon: function() {
        return a.config.indicators.aroon.show && !!a.config.indicators.aroon.periods
      },
      ichimoku: function() {
        return a.config.indicators.ichimoku.show && !!a.config.indicators.ichimoku.tenkanPeriod && !!a.config.indicators.ichimoku.kijunPeriod
      },
      chandelierExit: function() {
        return a.config.indicators.chandelierExit.show && !!a.config.indicators.chandelierExit.atrs && !!a.config.indicators.chandelierExit.periods
      },
      zigzag: function() {
        return a.config.indicators.zigzag.threshold && a.config.indicators.zigzag.show
      },
      trades: function() {
        return a.config.showTrades
      },
      orders: function() {
        return a.config.showOrders
      },
      grid: function() {
        return a.config.grid
      },
      yAxisDepth: function() {
        return a.config.yaxis.depth
      }
    },
    _handleChange: function(b, c) {
      var d = a._bindings.numerics[b];
      d !== undefined && (a._setVal(d.key, c), d.callback && c !== null && d.callback.call(a, c)), a.cache(), cryptowatch.chart._viewportChange(), cryptowatch.utils.nextFrame(cryptowatch.chart.refresh.all)
    },
    _handleCheckboxToggle: function(b, c) {
      var d = a._bindings.booleans[b.id];
      d !== undefined && (a._setVal(d.key, c), a.cache(), cryptowatch.chart._viewportChange(), cryptowatch.utils.nextFrame(cryptowatch.chart.refresh.all))
    },
    _handleRadioSelect: function(b) {
      var c = a._bindings.radios[b.getAttribute("name")];
      if (c !== undefined) {
        var d = c.mapping[b.id];
        a._setVal(c.key, d)
      }
      a.cache(), cryptowatch.chart._viewportChange(), cryptowatch.utils.nextFrame(cryptowatch.chart.refresh.all)
    },
    _handleDefault: function(b) {
      switch (b) {
        case "settings__default__macd":
          a.config.indicators.macd.periods = a.defaultConfig.indicators.macd.periods.slice(0), a.config.indicators.macd.lag = a.defaultConfig.indicators.macd.lag, cryptowatch.chart._calculate("ema", {
            periods: a.config.indicators.macd.periods[0]
          }), cryptowatch.chart._calculate("ema", {
            periods: a.config.indicators.macd.periods[1]
          }), cryptowatch.chart._calculate("macd");
          break;
        case "settings__default__obv":
          a.config.indicators.obv.maPeriods = a.defaultConfig.indicators.obv.maPeriods, cryptowatch.chart._calculate("obvma", {
            periods: a.defaultConfig.indicators.obv.maPeriods
          });
          break;
        case "settings__default__rsi":
          a.config.indicators.rsi.periods = a.defaultConfig.indicators.rsi.periods, cryptowatch.chart._calculate("rsi");
          break;
        case "settings__default__aroon":
          a.config.indicators.aroon.periods = a.defaultConfig.indicators.aroon.periods, cryptowatch.chart._calculate("aroon");
          break;
        case "settings__default__ema":
          a.config.indicators.ema.periods = a.defaultConfig.indicators.ema.periods.slice(0), cryptowatch.chart._calculate("ema", {
            periods: a.config.indicators.ema.periods[0]
          }), cryptowatch.chart._calculate("ema", {
            periods: a.config.indicators.ema.periods[1]
          }), cryptowatch.chart._calculate("ema", {
            periods: a.config.indicators.ema.periods[2]
          });
          break;
        case "settings__default__sar":
          a.config.indicators.sar.step = a.defaultConfig.indicators.sar.step, a.config.indicators.sar.maxStep = a.defaultConfig.indicators.sar.maxStep, cryptowatch.chart._calculate("sar");
          break;
        case "settings__default__bollinger":
          a.config.indicators.bollingerBands.period = a.defaultConfig.indicators.bollingerBands.period, a.config.indicators.bollingerBands.stddevs = a.defaultConfig.indicators.bollingerBands.stddevs, cryptowatch.chart._calculate("sma", {
            periods: a.defaultConfig.indicators.bollingerBands.period
          }), cryptowatch.chart._calculate("stdDeviation", {
            periods: a.defaultConfig.indicators.bollingerBands.period
          });
          break;
        case "settings__default__keltner":
          a.config.indicators.keltnerChannel.atrPeriod = a.defaultConfig.indicators.keltnerChannel.atrPeriod, a.config.indicators.keltnerChannel.atrs = a.defaultConfig.indicators.keltnerChannel.atrs, cryptowatch.chart._calculate("atr", {
            periods: a.defaultConfig.indicators.keltnerChannel.atrPeriod
          });
          break;
        case "settings__default__ichimoku":
          a.config.indicators.ichimoku.tenkanPeriod = a.defaultConfig.indicators.ichimoku.tenkanPeriod, a.config.indicators.ichimoku.kijunPeriod = a.defaultConfig.indicators.ichimoku.kijunPeriod, cryptowatch.chart._calculate("ichimoku");
          break;
        case "settings__default__chandelier-exit":
          a.config.indicators.chandelierExit.periods = a.defaultConfig.indicators.chandelierExit.periods, a.config.indicators.chandelierExit.atrs = a.defaultConfig.indicators.chandelierExit.atrs, cryptowatch.chart._calculate("atr", {
            periods: a.defaultConfig.indicators.chandelierExit.periods
          }), cryptowatch.chart._calculate("chandelierExit", {
            periods: a.defaultConfig.indicators.chandelierExit.periods
          });
          break;
        case "settings__default__zigzag":
          a.config.indicators.zigzag.threshold = a.defaultConfig.indicators.zigzag.threshold, cryptowatch.chart._calculateZigZagPoints(a.defaultConfig.indicators.zigzag.threshold)
      }
      a.cache(), a.writeConfigToDom(), cryptowatch.chart._viewportChange(), cryptowatch.utils.nextFrame(cryptowatch.chart.refresh.all)
    },
    _setupListeners: function() {
      $('#settings input[type="text"]').keydown(function(a) {
        a.stopPropagation();
        var b = a.which,
          c = $(a.target);
        if (b == 190 && /\./.test($(a.target).val())) return !1;
        if (b == 38 || b == 40) {
          var d = parseFloat(c.val()),
            e = parseFloat(c.attr("increment")),
            f = parseFloat(c.attr("places"));
          b == 38 && (d += e), b == 40 && (d -= e), isNaN(d) && (d = e), d = Math.max(d, e), d = d.toFixed(f), c.val(d)
        }
      }).keyup(function(b) {
        val = parseFloat($(b.target).val()), isNaN(val) && (val = null), b.which != 9 && a._handleChange(b.target.id, val)
      }), $('[data-contains-settings] input[type="checkbox"]').change(function(b) {
        a._handleCheckboxToggle(b.target, b.target.checked)
      }), $('#settings input[type="radio"]').change(function(b) {
        a._handleRadioSelect(b.target)
      }), $("#settings .settings__default").click(function(b) {
        a._handleDefault(b.target.id)
      })
    },
    writeConfigToDom: function() {
      for (var b in a._bindings.booleans) {
        var c = a._getVal(a._bindings.booleans[b].key),
          d = $("#" + b);
        d.attr("disabled") || (c ? d.attr("checked", "checked") : d.removeAttr("checked"))
      }
      for (var e in a._bindings.radios) {
        var f = a._bindings.radios[e],
          c = a._getVal(f.key) || a._getDefaultVal(f.key),
          b = f.reverseMapping[c];
        $("#" + b).attr("checked", "checked")
      }
      for (var b in a._bindings.numerics) {
        var f = a._bindings.numerics[b],
          c = a._getVal(f.key);
        $("#" + b).val(c)
      }
    },
    _bindings: {
      booleans: {},
      radios: {},
      numerics: {}
    },
    _getVal: function(b, c) {
      c === undefined && (c = a.config);
      var d = b.split("."),
        e = d[0],
        f = d.slice(1).join("."),
        g = c[e];
      return g === undefined ? undefined : d.length > 1 ? a._getVal(f, g) : g
    },
    _getDefaultVal: function(b) {
      return a._getVal(b, a.defaultConfig)
    },
    _setVal: function(b, c, d) {
      d === undefined && (d = a.config);
      var e = b.split("."),
        f = e[0],
        g = e.slice(1).join("."),
        h = d[f];
      if (h === undefined) throw new Error("Can't find key " + f + " in config (rest is " + g + ")");
      e.length > 1 ? a._setVal(g, c, h) : d[f] = c
    },
    _setCheckBox: function(a, b) {
      b ? a.attr("checked", "checked") : a.removeAttr("checked")
    },
    bindCheckboxField: function(b, c) {
      a._bindings.booleans[b] = {
        key: c
      }
    },
    bindRadioField: function(b, c, d) {
      var e = {};
      for (var f in c) e[c[f]] = f;
      a._bindings.radios[b] = {
        mapping: c,
        reverseMapping: e,
        key: d
      }
    },
    bindNumericInputField: function(b, c, d) {
      a._bindings.numerics[b] = {
        key: c,
        callback: d
      }
    }
  };
  a.bindCheckboxField("settings__overlay__ema", "indicators.ema.show"), a.bindCheckboxField("settings__overlay__sar", "indicators.sar.show"), a.bindCheckboxField("settings__overlay__keltner", "indicators.keltnerChannel.show"), a.bindCheckboxField("settings__overlay__bollinger", "indicators.bollingerBands.show"), a.bindCheckboxField("settings__overlay__ichimoku", "indicators.ichimoku.show"), a.bindCheckboxField("settings__overlay__chandelier-exit", "indicators.chandelierExit.show"), a.bindCheckboxField("settings__overlay__zigzag", "indicators.zigzag.show"), a.bindCheckboxField("settings__indicator__volume", "indicators.volume.show"), a.bindCheckboxField("settings__indicator__rsi", "indicators.rsi.show"), a.bindCheckboxField("settings__indicator__obv", "indicators.obv.show"), a.bindCheckboxField("settings__indicator__macd", "indicators.macd.show"), a.bindCheckboxField("settings__indicator__aroon", "indicators.aroon.show"), a.bindCheckboxField("settings__trades", "showTrades"), a.bindCheckboxField("settings__orders", "showOrders"), a.bindCheckboxField("settings__grid", "grid"), a.bindCheckboxField("settings__yaxis__depth", "yaxis.depth"), a.bindCheckboxField("settings__animate-feeds", "performance.animateFeeds"), a.bindCheckboxField("settings__scroll-x", "mouse.scrollX"), a.bindCheckboxField("settings__scroll-y", "mouse.scrollY"), a.bindRadioField("settings__chart-style", {
    settings__chart__ohlc: "OHLC",
    "settings__chart__heiken-ashi": "heikenAshi",
    settings__chart__bar: "bar",
    settings__chart__line: "line"
  }, "chartStyle"), a.bindRadioField("settings__yaxis", {
    settings__yaxis__lin: "linear",
    settings__yaxis__log: "log"
  }, "yAxis"), a.bindNumericInputField("settings__overlay__ema1", "indicators.ema.periods.0", function(a) {
    cryptowatch.chart._calculate("ema", {
      periods: a
    })
  }), a.bindNumericInputField("settings__overlay__ema2", "indicators.ema.periods.1", function(a) {
    cryptowatch.chart._calculate("ema", {
      periods: a
    })
  }), a.bindNumericInputField("settings__overlay__ema3", "indicators.ema.periods.2", function(a) {
    cryptowatch.chart._calculate("ema", {
      periods: a
    })
  }), a.bindNumericInputField("settings__overlay__ema4", "indicators.ema.periods.3", function(a) {
    cryptowatch.chart._calculate("ema", {
      periods: a
    })
  }), a.bindNumericInputField("settings__overlay__ema5", "indicators.ema.periods.4", function(a) {
    cryptowatch.chart._calculate("ema", {
      periods: a
    })
  }), a.bindNumericInputField("settings__overlay__sar-step", "indicators.sar.step", function(a) {
    cryptowatch.chart._calculate("sar")
  }), a.bindNumericInputField("settings__overlay__sar-max-step", "indicators.sar.maxStep", function(a) {
    cryptowatch.chart._calculate("sar")
  }), a.bindNumericInputField("settings__overlay__bollinger-stddevs", "indicators.bollingerBands.stddevs"), a.bindNumericInputField("settings__overlay__bollinger-period", "indicators.bollingerBands.period", function(a) {
    cryptowatch.chart._calculate("sma", {
      periods: a
    }), cryptowatch.chart._calculate("stdDeviation", {
      periods: a
    })
  }), a.bindNumericInputField("settings__overlay__keltner-atrs", "indicators.keltnerChannel.atrs"), a.bindNumericInputField("settings__overlay__keltner-period", "indicators.keltnerChannel.atrPeriod", function(a) {
    cryptowatch.chart._calculate("atr", {
      periods: a
    })
  }), a.bindNumericInputField("settings__overlay__ichimoku-tenkan-periods", "indicators.ichimoku.tenkanPeriod", function(a) {
    cryptowatch.chart._calculate("ichimoku")
  }), a.bindNumericInputField("settings__overlay__ichimoku-kijun-periods", "indicators.ichimoku.kijunPeriod", function(a) {
    cryptowatch.chart._calculate("ichimoku")
  }), a.bindNumericInputField("settings__overlay__chandelier-exit-periods", "indicators.chandelierExit.periods", function(a) {
    cryptowatch.chart._calculate("atr", {
      periods: a
    }), cryptowatch.chart._calculate("chandelierExit", {
      periods: a
    })
  }), a.bindNumericInputField("settings__overlay__chandelier-exit-atrs", "indicators.chandelierExit.atrs"), a.bindNumericInputField("settings__overlay__zigzag-threshold", "indicators.zigzag.threshold", function(a) {
    cryptowatch.chart._calculateZigZagPoints(a)
  }), a.bindNumericInputField("settings__overlay__rsi-periods", "indicators.rsi.periods", function(a) {
    cryptowatch.chart._calculate("rsi")
  }), a.bindNumericInputField("settings__overlay__obv-ma-periods", "indicators.obv.maPeriods", function(a) {
    cryptowatch.chart._calculate("obvma", {
      periods: a
    })
  }), a.bindNumericInputField("settings__overlay__aroon-periods", "indicators.aroon.periods", function(a) {
    cryptowatch.chart._calculate("aroon")
  }), a.bindNumericInputField("settings__overlay__macd-ema1", "indicators.macd.periods.0", function(a) {
    cryptowatch.chart._calculate("ema", {
      periods: a
    }), cryptowatch.chart._calculate("macd", {})
  }), a.bindNumericInputField("settings__overlay__macd-ema2", "indicators.macd.periods.1", function(a) {
    cryptowatch.chart._calculate("ema", {
      periods: a
    }), cryptowatch.chart._calculate("macd", {})
  }), a.bindNumericInputField("settings__overlay__macd-lag", "indicators.macd.lag", function(a) {
    cryptowatch.chart._calculate("macd", {})
  }), $(document).ready(function() {
    a.initialize(), cryptowatch.chart.initialize()
  })
}(),
function() {
  var a = cryptowatch.data = {
    loadImmediateIntervals: function() {
      a.intervals = {}, a.intervals[cryptowatch.periodInt] = a.parseStringIntervals(cryptowatch.intervals, cryptowatch.periodInt)
    },
    loadAllIntervals: function(b) {
      $.ajax({
        type: "GET",
        url: "/" + cryptowatch.exchange.slug + "/" + cryptowatch.currencyPair.slug + ".json",
        success: function(c) {
          c = JSON.parse(c);
          for (var d in c) c[d] = a.parseStringIntervals(c[d], parseInt(d, 10));
          a.intervals = c, a.readyForHotLoad = !0, b()
        },
        error: function(a) {
          console.log(a)
        }
      })
    },
    updateInterval: function(b, c) {
      if (b.Candle.Open === 0 && b.Candle.Close === 0) return !1;
      var d = a.intervals[c];
      if (d === undefined) return;
      var e;
      for (e = 0; e < d.length; e++) {
        var f = d[e];
        if (f.Time === b.Time) return f.Candle = $.extend({}, b.Candle), f.Volume = b.Volume, f.i = e, f
      }
      return b.i = e, d.push(b), b
    },
    parseStringIntervals: function(b, c) {
      return b = b.map(function(a) {
        var b = a.split(" ").map(parseFloat);
        return {
          Time: b[0],
          Candle: {
            Open: b[1],
            High: b[2],
            Low: b[3],
            Close: b[4]
          },
          Volume: b[5]
        }
      }), b = a.sanitizeData(b), b = a.filterOutBadData(b, c), b
    },
    getCache: function() {
      return JSON.parse(localStorage.getItem(this._cacheKey()))
    },
    setCache: function(a) {
      try {
        localStorage.setItem(this._cacheKey(), JSON.stringify(a))
      } catch (b) {
        console.warn("quota exceeded, shit")
      }
    },
    _cacheKey: function() {
      return cryptowatch.exchange.slug + ":" + cryptowatch.pair + ":" + cryptowatch.period
    },
    sanitizeData: function(a) {
      var b, c = [];
      return a.forEach(function(a) {
        var d = Math.max(a.Candle.Open, a.Candle.Close),
          e = Math.min(a.Candle.Open, a.Candle.Close),
          f = d - e;
        !(a.Candle.High - d > f * 10), !(a.Candle.Low > e);
        if (b && a.Time < b.Time) {
          console.warn("Backwards interval:", a);
          return
        }
        c.push(a), b = a
      }), c
    },
    filterOutBadData: function(a, b) {
      var c = 0;
      return a = a.filter(function(a) {
        var d = [a.Candle.Low, a.Candle.High, a.Candle.Open, a.Candle.Close].indexOf(0) == -1,
          e = a.Time % b === 0;
        return e || c++, d && e
      }), c > 0 && console.warn("Ignored", c, "bad intervals because of their close time"), a
    }
  }
}(),
function() {
  function b(a) {
    this.posn1 = a, this.posn2 = undefined, this.stage = 1, this.done = !1
  }

  function c(a) {
    this.posn1 = a, this.posn2 = undefined, this.stage = 1, this.done = !1
  }

  function d(a) {
    this.posn1 = a, this.posn2 = undefined, this.stage = 1, this.done = !1
  }

  function e(a) {
    this.posn1 = a, this.posn2 = undefined, this.stage = 1, this.done = !1
  }

  function f(a) {
    this.posn1 = a, this.posn2 = undefined, this.stage = 1, this.done = !1
  }

  function g(a) {
    this.posn1 = a, this.posn2 = undefined, this.stage = 1, this.done = !1
  }

  function k(a) {
    var b = cryptowatch.drawing.typeMappings[a.type];
    return b.fromJSON(a)
  }

  function l() {
    return cryptowatch.chart.canvas.fields[this.field]
  }
  var a = cryptowatch.drawing = {
    elements: [],
    pending: undefined,
    refresh: function() {
      cryptowatch.chart.canvas.layers.drawing.clear(), a.elements.forEach(function(b, c) {
        b.field = b.field || "price";
        if (b.getField() === undefined) return;
        b.getField().withClipMask(cryptowatch.chart.canvas.layers.drawing, function(a) {
          b.draw(cryptowatch.chart)
        });
        var d = "drawing:" + c;
        b.posns().forEach(function(d, e) {
          a.elemHovered === b && cryptowatch.chart.canvas.layers.drawing.drawCircle(a.domainPosnToScreenPosn(d, b.getField()), 3, cryptowatch.colors.theme.text.toString(), cryptowatch.colors.theme.background);
          var f = "drawing-posn:" + c + ":" + e,
            g = new Hoverarea(f, {
              type: "circle",
              center: a.domainPosnToScreenPosn(d, b.getField()),
              radius: 4
            }, {
              cursor: "pointer",
              incompatibleTools: ["crosshair"],
              callbacks: {
                hover: function() {
                  if (a.pending) return !1;
                  a.elemHovered = b, a.refresh()
                },
                leave: function() {
                  delete a.elemHovered, a.refresh()
                },
                active: function() {},
                inactive: function() {},
                drag: function(c) {
                  var e = a.screenPosnToDomainPosn(c, b.getField());
                  d.x = e.x, d.y = e.y, cryptowatch.chart.canvas.layers.drawing.resetHoverareas(), a.elemHovered.recalculateAfterUpdate && a.elemHovered.recalculateAfterUpdate(), a.persist(), a.refresh()
                }
              }
            });
          cryptowatch.chart.canvas.layers.drawing.registerHoverarea(g)
        })
      }), a.pending && a.pending.getField().withClipMask(cryptowatch.chart.canvas.layers.drawing, function(b) {
        a.pending.draw(cryptowatch.chart)
      })
    },
    typeMappings: {
      line: b,
      fibonnaciRetracement: c,
      fibonnaciFan: d,
      fibonnaciArc: e,
      circle: g,
      arrow: f
    },
    toJSON: function() {
      return a.elements.map(function(a) {
        return a.toJSON()
      })
    },
    fromJSON: function(a) {
      var a = JSON.parse(a);
      return a.field = a.field || "price", a.map(k)
    },
    key: function() {
      return ["drawing", cryptowatch.exchange.slug, cryptowatch.pair].join(":")
    },
    persist: function() {
      localStorage.setItem(a.key(), JSON.stringify(a.toJSON()))
    },
    load: function() {
      var b = localStorage.getItem(a.key());
      if (b) try {
        a.elements = a.fromJSON(b)
      } catch (c) {
        throw a.elements = [], c
      }
      a.refresh()
    },
    domainPosnToScreenPosn: function(a, b, c) {
      var d;
      return b = b || cryptowatch.chart.canvas.fields.price, c ? d = b.ySharp(a.y) : d = b.y(a.y), {
        x: b.x(a.x),
        y: d
      }
    },
    screenPosnToDomainPosn: function(a, b) {
      return b = b || cryptowatch.chart.canvas.fields
        .price, {
          x: b.x.invert(a.x),
          y: b.y.invert(a.y)
        }
    },
    pointsForLine: function(b, c, d) {
      var e = [],
        f, g;
      d.field = d.field || cryptowatch.chart.canvas.fields.price;
      var h = a.domainPosnToScreenPosn(b, d.field),
        i = a.domainPosnToScreenPosn(c, d.field);
      if (d.log == (cryptowatch.config.config.yAxis === "log") || d.field.name !== "price") {
        if (!d.overshoot) return [h, i];
        var j = (h.y - i.y) / (i.x - h.x);
        return [h, {
          x: h.x + (i.x - h.x) * d.overshoot,
          y: h.y + (i.y - h.y) * d.overshoot
        }]
      }
      g = Math.sqrt(Math.pow(i.x - h.x, 2) + Math.pow(i.y - h.y, 2));
      var k = Math.round(g / 5);
      d.log ? f = d3.scale.log().base(10).domain(d.field.y.domain()).range([0, 100]) : f = d3.scale.linear().domain(d.field.y.domain()).range([0, 100]);
      var l = f(b.y),
        m = f(c.y),
        n = k + 1 + (d.overshoot || 0) * k;
      return d3.range(n).forEach(function(g) {
        var h = g / k,
          i = b.x + (c.x - b.x) * h,
          j = l + (m - l) * h,
          n = f.invert(j);
        e.push(a.domainPosnToScreenPosn({
          x: i,
          y: n
        }, d.field))
      }), e
    },
    rotatePosn: function(a, b, c) {
      if (a.x == b.x && a.y == b.y) return a;
      c *= Math.PI / 180;
      var d = a.x - b.x,
        e = a.y - b.y,
        f = d * Math.cos(c) - e * Math.sin(c),
        g = d * Math.sin(c) + e * Math.cos(c);
      return {
        x: f + b.x,
        y: g + b.y
      }
    },
    advance: function(h) {
      var i = a.pending ? a.pending.getField() : cryptowatch.chart.canvas.cursor.state.activeField,
        j = a.screenPosnToDomainPosn({
          x: h.pageX,
          y: h.pageY
        }, i);
      if (a.pending !== undefined) a.pending.advance(j), a.pending.done && (a.elements.push(a.pending), a.persist(), delete a.pending, a.refresh());
      else {
        switch (cryptowatch.chart.tool) {
          case "line":
            a.pending = new b(j);
            break;
          case "fibonnaciRetracement":
            a.pending = new c(j);
            break;
          case "fibonnaciFan":
            a.pending = new d(j);
            break;
          case "fibonnaciArc":
            a.pending = new e(j);
            break;
          case "circle":
            a.pending = new g(j);
            break;
          case "arrow":
            a.pending = new f(j)
        }
        a.pending.field = cryptowatch.chart.canvas.cursor.state.activeField.name, a.pending.log = cryptowatch.config.config.yAxis === "log"
      }
    },
    removeElemHovered: function() {
      a.elements = a.elements.filter(function(b) {
        return b !== a.elemHovered
      }), a.refresh(), a.persist()
    },
    cancelPending: function() {
      delete a.pending, a.refresh()
    },
    pop: function() {
      a.pending ? a.cancelPending() : (a.elements.pop(), a.refresh(), a.persist())
    }
  };
  b.prototype.draw = function(b) {
    var c, d;
    switch (this.stage) {
      case 0:
        return;
      case 1:
        c = this.posn1, d = a.screenPosnToDomainPosn(b.canvas.cursor.state.posn, this.getField());
        break;
      case 2:
        c = this.posn1, d = this.posn2
    }
    b.canvas.layers.drawing.drawLine(a.pointsForLine(c, d, {
      log: this.log,
      field: this.getField()
    }), function(a) {
      return a
    }, cryptowatch.colors.theme.text.toString())
  }, b.prototype.posns = function() {
    return [this.posn1, this.posn2]
  }, b.prototype.advance = function(a) {
    switch (this.stage) {
      case 0:
        this.posn1 = a, this.stage = 1;
        break;
      case 1:
        this.posn2 = a, this.stage = 2, this.done = !0
    }
  }, b.fromJSON = function(a) {
    var c = new b;
    return c.posn1 = a.posn1, c.posn2 = a.posn2, c.field = a.field, c.done = !0, c.log = a.log, c.stage = 2, c
  }, c.prototype.posns = function() {
    return [this.posn1, this.posn2]
  }, c.prototype.draw = function(b) {
    var c, d;
    switch (this.stage) {
      case 0:
        return;
      case 1:
        c = this.posn1, d = a.screenPosnToDomainPosn(b.canvas.cursor.state.posn, this.getField());
        break;
      case 2:
        c = this.posn1, d = this.posn2
    }
    var e = [0, .236, .382, .5, .618, .786, 1, 1.272, 1.618];
    e.forEach(function(e) {
      var f;
      f = d.y - (d.y - c.y) * e;
      var g = a.domainPosnToScreenPosn({
          x: c.x,
          y: f
        }, this.getField(), !0),
        h = a.domainPosnToScreenPosn({
          x: d.x,
          y: f
        }, this.getField(), !0),
        i = Math.max(h.x, g.x);
      b.canvas.layers.drawing.drawLineSegment(g, h), b.canvas.layers.drawing.drawText({
        x: i + 18,
        y: h.y
      }, cryptowatch.utils.percentageAsString(e) + "  " + cryptowatch.currency.fmt(f, undefined, {
        label: !1
      }), cryptowatch.colors.theme.text.toString())
    }.bind(this))
  }, c.prototype.advance = function(a) {
    switch (this.stage) {
      case 0:
        this.posn1 = a, this.stage = 1;
        break;
      case 1:
        this.posn2 = a, this.stage = 2, this.done = !0
    }
  }, c.fromJSON = function(a) {
    var b = new c;
    return b.posn1 = a.posn1, b.posn2 = a.posn2, b.field = a.field, b.done = !0, b.stage = 2, b
  }, d.prototype.posns = function() {
    return [this.posn1, this.posn2]
  }, d.prototype._calculateIntersectionPoints = function() {
    var b, c;
    switch (this.stage) {
      case 0:
        return;
      case 1:
        b = this.posn1, c = a.screenPosnToDomainPosn(cryptowatch.chart.canvas.cursor.state.posn, this.getField());
        break;
      case 2:
        b = this.posn1, c = this.posn2
    }
    this._interPoints = {};
    var d = [, .382, .5, .618];
    d.forEach(function(d) {
      var e = a.domainPosnToScreenPosn(b, this.getField()),
        f = a.domainPosnToScreenPosn(c, this.getField()),
        g = {
          x: f.x,
          y: f.y + (e.y - f.y) * d
        };
      this._interPoints[d] = a.screenPosnToDomainPosn(g, this.getField())
    }.bind(this))
  }, d.prototype.recalculateAfterUpdate = function() {
    this._calculateIntersectionPoints()
  }, d.prototype.draw = function(b) {
    var c, d;
    switch (this.stage) {
      case 0:
        return;
      case 1:
        c = this.posn1, d = a.screenPosnToDomainPosn(b.canvas.cursor.state.posn, this.getField()), this._calculateIntersectionPoints();
        break;
      case 2:
        c = this.posn1, d = this.posn2
    }
    var e, f;
    c.y < d.y ? (e = d, f = c) : (e = c, f = d), b.canvas.layers.drawing.drawLine(a.pointsForLine(c, d, {
      log: this.log,
      field: this.getField()
    }), function(a) {
      return a
    }, cryptowatch.colors.theme.text.toString());
    var g = this.getField();
    b.canvas.layers.drawing.drawLineSegment({
      x: g.x(c.x),
      y: g.ySharp(c.y)
    }, {
      x: g.x(d.x),
      y: g.ySharp(c.y)
    }, {
      color: cryptowatch.colors.theme.guide.toString()
    }), b.canvas.layers.drawing.drawLineSegment({
      x: g.xSharp(d.x),
      y: g.y(c.y)
    }, {
      x: g.xSharp(d.x),
      y: g.y(d.y)
    }, {
      color: cryptowatch.colors.theme.guide.toString()
    });
    for (var h in this._interPoints) {
      h = parseFloat(h);
      var i = this._interPoints[h];
      b.canvas.layers.drawing.drawLine(a.pointsForLine(c, i, {
        log: this.log,
        overshoot: 10,
        field: this.getField()
      }), function(a) {
        return a
      }, cryptowatch.colors.theme.text.toString())
    }
  }, d.prototype.advance = function(a) {
    switch (this.stage) {
      case 0:
        this.posn1 = a, this.stage = 1;
        break;
      case 1:
        this.posn2 = a, this.stage = 2, this.done = !0
    }
  }, d.prototype.toJSON = function(a) {
    return {
      type: "fibonnaciFan",
      posn1: this.posn1,
      posn2: this.posn2,
      field: this.field,
      log: this.log,
      _interPoints: this._interPoints
    }
  }, d.fromJSON = function(a) {
    var b = new d;
    return b.posn1 = a.posn1, b.posn2 = a.posn2, b.field = a.field, b.log = a.log, b.done = !0, b.stage = 2, b._interPoints = a._interPoints, b
  }, e.prototype.posns = function() {
    return [this.posn1, this.posn2]
  }, e.prototype.draw = function(b) {
    var c, d;
    switch (this.stage) {
      case 0:
        return;
      case 1:
        c = this.posn1, d = a.screenPosnToDomainPosn(b.canvas.cursor.state.posn, this.getField());
        break;
      case 2:
        c = this.posn1, d = this.posn2
    }
    var e = a.domainPosnToScreenPosn(c, this.getField()),
      f = a.domainPosnToScreenPosn(d, this.getField());
    b.canvas.layers.drawing.drawLine(a.pointsForLine(c, d, {
      log: this.log,
      field: this.getField()
    }), function(a) {
      return a
    }, cryptowatch.colors.theme.text.toString());
    var g = [, .382, .5, .618];
    g.forEach(function(a) {
      var c = {
          x: e.x + (f.x - e.x) * a,
          y: e.y + (f.y - e.y) * a
        },
        d = Math.sqrt(Math.pow(e.x - c.x, 2) + Math.pow(e.y - c.y, 2)),
        g = b.canvas.layers.drawing.context;
      g.beginPath(), g.strokeStyle = cryptowatch.colors.theme.text.toString(), f.y > e.y ? g.arc(e.x, e.y, d, -Math.PI, 0, !0) : g.arc(e.x, e.y, d, 0, Math.PI, !0), g.stroke(), g.closePath()
    })
  }, e.prototype.advance = function(a) {
    switch (this.stage) {
      case 0:
        this.posn1 = a, this.stage = 1;
        break;
      case 1:
        this.posn2 = a, this.stage = 2, this.done = !0
    }
  }, e.fromJSON = function(a) {
    var b = new e;
    return b.posn1 = a.posn1, b.posn2 = a.posn2, b.field = a.field, b.log = a.log, b.done = !0, b.stage = 2, b
  }, f.prototype.draw = function(b) {
    var c = this.posn1,
      d;
    switch (this.stage) {
      case 0:
        return;
      case 1:
        d = a.screenPosnToDomainPosn(b.canvas.cursor.state.posn, this.getField());
        break;
      case 2:
        d = this.posn2
    }
    tipPointScreen = a.domainPosnToScreenPosn(d, this.getField(), !0), startPointScreen = a.domainPosnToScreenPosn(c, this.getField(), !0);
    var e = a.pointsForLine(c, d, {
      log: this.log,
      field: this.getField()
    });
    b.canvas.layers.drawing.drawLine(e, function(a) {
      return a
    }, cryptowatch.colors.theme.text.toString());
    var f = 10,
      g = (startPointScreen.y - tipPointScreen.y) / (tipPointScreen.x - startPointScreen.x),
      h = Math.atan(g) / (Math.PI / 180),
      i = Math.sqrt(Math.pow(tipPointScreen.x - startPointScreen.x, 2) + Math.pow(tipPointScreen.y - startPointScreen.y, 2)),
      j = {
        x: tipPointScreen.x - (tipPointScreen.x - startPointScreen.x) * (f / i),
        y: tipPointScreen.y - (tipPointScreen.y - startPointScreen.y) * (f / i)
      },
      k = cryptowatch.drawing.rotatePosn(j, tipPointScreen, 22),
      l = cryptowatch.drawing.rotatePosn(j, tipPointScreen, -22);
    b.canvas.layers.drawing.context.fillStyle = "white", b.canvas.layers.drawing.context.beginPath(), b.canvas.layers.drawing.context.moveTo(tipPointScreen.x, tipPointScreen.y), b.canvas.layers.drawing.context.lineTo(k.x, k.y), b.canvas.layers.drawing.context.lineTo(l.x, l.y), b.canvas.layers.drawing.context.fill(), b.canvas.layers.drawing.context.closePath()
  }, f.prototype.posns = function() {
    return [this.posn1, this.posn2]
  }, f.prototype.advance = function(a) {
    switch (this.stage) {
      case 0:
        this.posn1 = a, this.stage = 1;
        break;
      case 1:
        this.posn2 = a, this.stage = 2, this.done = !0
    }
  }, f.fromJSON = function(a) {
    var b = new f;
    return b.posn1 = a.posn1, b.posn2 = a.posn2, b.field = a.field, b.done = !0, b.stage = 2, b
  }, g.prototype.posns = function() {
    return [this.posn1, this.posn2]
  }, g.prototype.draw = function(b) {
    var c, d;
    switch (this.stage) {
      case 0:
        return;
      case 1:
        c = a.domainPosnToScreenPosn(this.posn1, this.getField(), !0), d = b.canvas.cursor.state.posn;
        break;
      case 2:
        c = a.domainPosnToScreenPosn(this.posn1, this.getField(), !0), d = a.domainPosnToScreenPosn(this.posn2, this.getField(), !0)
    }
    var e = Math.sqrt(Math.pow(d.x - c.x, 2) + Math.pow(d.y - c.y, 2));
    b.canvas.layers.drawing.drawCircle(a.domainPosnToScreenPosn(this.posn1, this.getField(), !0), e, cryptowatch.colors.theme.text.toString(), undefined)
  }, g.prototype.advance = function(a) {
    switch (this.stage) {
      case 0:
        this.posn1 = a, this.stage = 1;
        break;
      case 1:
        this.posn2 = a, this.stage = 2, this.done = !0
    }
  }, g.fromJSON = function(a) {
    var b = new g;
    return b.posn1 = a.posn1, b.posn2 = a.posn2, b.field = a.field, b.done = !0, b.stage = 2, b
  };
  var h = function(a) {
    return function() {
      return {
        type: a,
        posn1: this.posn1,
        posn2: this.posn2,
        log: this.log,
        field: this.field
      }
    }
  };
  for (var i in cryptowatch.drawing.typeMappings) {
    var j = cryptowatch.drawing.typeMappings[i];
    j.prototype.toJSON === undefined && (j.prototype.toJSON = h(i))
  }
  for (var i in cryptowatch.drawing.typeMappings) cryptowatch.drawing.typeMappings[i].prototype.getField = l
}(),
function() {
  window.Posn = function(a, b) {
    this.x = a, this.y = b
  }, Posn.prototype.distanceFrom = function(a) {
    return Math.sqrt(Math.pow(this.x - a.x, 2) + Math.pow(this.y - a.y, 2))
  }
}(),
function() {
  window.Field = function(a, b, c, d, e) {
    var f = cryptowatch.chart;
    e = e || {}, e.padding = $.extend({
      top: 0,
      bottom: 0
    }, e.padding), c.left === undefined && c.right === undefined && (c.left = f._timeBounds.start, c.right = f._timeBounds.end + cryptowatch.periodInt);
    if (e.padding.left === undefined || e.padding.right === undefined) {
      var g = f.config.fullCandleWidth() - f._widthForIntervals() % f.config.fullCandleWidth(),
        h = -(g + f.config.fullCandleWidth()),
        i = (c.right - c.left) / cryptowatch.periodInt * cryptowatch.chart.config.fullCandleWidth();
      g === f.config.fullCandleWidth() && (h = -f.config.fullCandleWidth()), e.padding = $.extend({
        left: h,
        right: d.right - d.left - i - h
      }, e.padding)
    }
    this.name = b, this.opts = e, this.unpaddedRange = d, this.domain = c, d = $.extend({
      top: 0,
      bottom: 0
    }, d), this.range = {
      top: d.top + e.padding.top,
      bottom: d.bottom - e.padding.bottom,
      left: d.left + e.padding.left,
      right: d.right - e.padding.right
    }, this.range.top < 0 && (this.range.top = f._height() + this.range.top), this.range.bottom < 0 && (this.range.bottom = f._height() + this.range.bottom), a.fields[b] = this, this.x = d3.scale.linear().domain([c.left, c.right]).range([this.range.left, this.range.right]);
    var j = e.optIntoLogScale ? cryptowatch.config.config.yAxis : "linear";
    this.y = d3.scale[j]().domain([c.bottom, c.top]).range([this.range.bottom, this.range.top]), this.yUnpadded = d3.scale[j]().domain([c.bottom, c.top]).range([this.unpaddedRange.bottom, this.unpaddedRange.top]), this.xSharp = function(a) {
      return this.x(a) + .5
    }, this.ySharp = function(a) {
      return Math.floor(this.y(a)) + .5
    }, this.snapScreenX = function(a) {
      return this.x(cryptowatch.chart.utils.roundDownTo(this.x.invert(a), cryptowatch.periodInt))
    }.bind(this), this.includes = {
      domain: {
        x: function(a) {
          return a >= c.left && a <= c.right
        },
        y: function(a) {
          return a >= c.bottom && a <= c.top
        }
      },
      range: {
        x: function(a) {
          return a >= this.range.left && a <= this.range.right
        },
        y: function(a) {
          return a >= this.range.bottom && a <= this.range.top
        }
      }
    }, this.hoverarea = new Hoverarea(b, {
      type: "rect",
      left: this.unpaddedRange.left,
      right: this.unpaddedRange.right,
      top: this.unpaddedRange.top,
      bottom: this.unpaddedRange.bottom
    }, {})
  }, Field.prototype.width = function() {
    return Math.abs(this.range.left - this.range.right)
  }, Field.prototype.height = function() {
    return Math.abs(this.range.bottom - this.range.top)
  }, Field.prototype.tickSize = function(a) {
    var b = this.domain.top - this.domain.bottom,
      c = this.height() / a,
      d = 1e-8;
    for (;;)
      if (d < b / 10) d *= 10;
      else break;
    return b / d < c / 2 ? d /= 2 : b / d > c / 2 && (d *= 2), d
  }, Field.prototype.withClipMask = function(a, b) {
    a.context.save(), a.context.beginPath(), a.context.moveTo(this.unpaddedRange.left, this.unpaddedRange.top), a.context.lineTo(this.unpaddedRange.right, this.unpaddedRange.top), a.context.lineTo(this.unpaddedRange.right, this.unpaddedRange.bottom), a.context.lineTo(this.unpaddedRange.left, this.unpaddedRange.bottom), a.context.closePath(), a.context.clip(), b(), a.context.restore()
  }, window.Hoverarea = function(a, b, c) {
    this.name = a, this.geometry = b, this.opts = $.extend({
      callbacks: {}
    }, c)
  }, Hoverarea.prototype.overlaps = function(a) {
    switch (this.geometry.type) {
      case "rect":
        return a.x >= this.geometry.left && a.x <= this.geometry.right && a.y >= this.geometry.top && a.y <= this.geometry.bottom;
      case "circle":
        return a.distanceFrom(this.geometry.center) <= this.geometry.radius
    }
  }, Hoverarea.prototype.draw = function(a) {
    switch (this.geometry.type) {
      case "rect":
        this.canvas.drawRectangle({
          x: this.geometry.left,
          y: this.geometry.top
        }, {
          x: this.geometry.right,
          y: this.geometry.bottom
        }, "blue")
    }
  }, Hoverarea.prototype.hover = function() {
    if (this.opts.callbacks.hover) return this.opts.callbacks.hover()
  }, Hoverarea.prototype.leave = function() {
    this.opts.callbacks.leave && this.opts.callbacks.leave()
  }, Hoverarea.prototype.active = function() {
    this.opts.callbacks.active && this.opts.callbacks.active()
  }, Hoverarea.prototype.inactive = function() {
    this.opts.callbacks.inactive && this.opts.callbacks.inactive()
  }, Hoverarea.prototype.click = function() {
    this.opts.callbacks.click && this.opts.callbacks.click.apply(this, arguments)
  }, Hoverarea.prototype.drag = function() {
    this.opts.callbacks.drag && this.opts.callbacks.drag.apply(this, arguments)
  }
}(),
function() {
  var a = cryptowatch.chart = {
    config: {
      candleMargin: 2,
      indicatorMargin: 10,
      padding: {
        top: 150,
        bottom: 100
      },
      headerHeight: 70,
      pricePadding: 25,
      xAxisHeight: 30,
      yAxisWidth: 70,
      fullCandleWidth: function() {
        return cryptowatch.config.config.candleWidth + this.candleMargin
      },
      halfCandleWidth: function() {
        return cryptowatch.config.config.candleWidth / 2
      },
      defaultPosition: function() {
        var a = sessionStorage.getItem("chart:position");
        return a ? (sessionStorage.removeItem("chart:position"), parseInt(a, 10)) : cryptowatch.config.shouldDraw.ichimoku() ? -5 - cryptowatch.config.config.indicators.ichimoku.kijunPeriod : -5
      },
      yAxisLeftBoundary: function() {
        return a._width() - a.config.yAxisWidth
      },
      width: 0
    },
    initialize: function() {
      console.time && console.time("Draw"), a.canvas = (new MultiLayerCanvas("#price-chart-container", {
        cursor: {
          dragSnap: {
            x: a.config.fullCandleWidth()
          }
        }
      })).registerLayer("chart", "#chart").registerLayer("drawing", "#drawing").registerLayer("depth", "#depth").registerLayer("axes", "#axes"), a.POSITION = a.config.defaultPosition(), cryptowatch.data.loadImmediateIntervals(), a.setCandles(cryptowatch.data.intervals[cryptowatch.periodInt]), a.canvas.cursor.on("mouseenter", function(b, c) {
        a.hideCrosshairDepthInfo(), a._focused = !0
      }).on("mousemove", function(b, c) {
        c.x > a.canvas.fields.yaxis.x(0) ? (a._crosshairVisible.y = !1, a._crosshairVisible.x = !1, a.hideCrosshairIntervalInfo()) : a.showCrosshair(), cryptowatch.utils.nextFrame(a.updateCursor.bind(a))
      }).on("mousedown", function(a, b) {}).on("mouseleave", function(b, c) {
        a.hideCrosshair(), a.hideCrosshairInfo(), a._focused = !1, delete cryptowatch.alerts.pending
      }).on("click", function(b, c) {
        a.tool !== "crosshair" && !this.state.dragging && cryptowatch.drawing.advance(b)
      }).on("rightclick", function(a, b) {
        cryptowatch.drawing.elemHovered ? cryptowatch.drawing.removeElemHovered() : cryptowatch.drawing.pop()
      }).on("drag", function(b, c, d, e) {
        a.hideCrosshair(), a.hideCrosshairInfo(), a.nudge(e.x / a.config.fullCandleWidth())
      }).on("stopDrag", function(b, c) {
        a.refresh.chart()
      }), a.canvas.layers.axes.context.font = "11px 'Droid Sans Mono', monospace", a.canvas.layers.chart.context.font = "11px 'Droid Sans Mono', monospace", a.canvas.layers.chart.resize = function() {
        cryptowatch.chart._viewportChange(), cryptowatch.utils.nextFrame(cryptowatch.chart.refresh.all)
      }, a._viewportChange(), a._saveRefsToCrosshairInfo(), a._tzoffset = (new Date).getTimezoneOffset() * 60;
      var b = localStorage.getItem("tool") || "crosshair";
      a.selectTool(b), cryptowatch.drawing.load(), window.onblur = function() {
        a._blurred = !0
      }, window.onfocus = function() {
        a._blurred = !1
      }, cryptowatch.alerts.load(), a.initialized = !0, a.refresh.all(), console.timeEnd && (console.timeEnd("Draw"), console.timeEnd("TTG")), setTimeout(function() {
        cryptowatch.data.loadAllIntervals(function() {
          a.setCandles(cryptowatch.data.intervals[cryptowatch.periodInt])
        })
      }, 1)
    },
    setCandles: function(b) {
      a.candles = b, a._indexCandles(a.candles), a._cacheCandleIndexes(), a._setupCandles(a.candles), a._analyzeCandles(a.candles)
    },
    setPeriod: function(b, c) {
      cryptowatch.periodInt = b, a.setCandles(cryptowatch.data.intervals[b]), a.setPosition(a.config.defaultPosition()), a._viewportChange(), a.refresh.all()
    },
    _candleIndex: {},
    _indexCandles: function(b) {
      b.forEach(function(b) {
        a._candleIndex[b.Time] = b
      })
    },
    _indicatorsHeight: function() {
      var b = 0;
      return cryptowatch.config.bottomIndicators.forEach(function(c) {
        cryptowatch.config.shouldDraw[c]() && (b += cryptowatch.config.config.indicators[c].height, b += a.config.indicatorMargin)
      }), b > 0 && (b += a.config.indicatorMargin), b
    },
    _priceChartHeight: function() {
      return a.canvas.layers.chart.height - a._indicatorsHeight() - a.config.pricePadding * 2 - a.config.headerHeight - a.config.xAxisHeight
    },
    _clipIndicatorHeights: function() {
      var b = a._priceChartHeight();
      if (b < 100) {
        var c = 100 - b,
          d = cryptowatch.config.bottomIndicators.slice(0).sort(function(a, b) {
            return cryptowatch.config.config.indicators[b].height - cryptowatch.config.config.indicators[a].height
          }).filter(function(a) {
            return cryptowatch.config.shouldDraw[a]()
          }),
          e = d[0];
        cryptowatch.config.config.indicators[e].height - c < 50 ? cryptowatch.config.config.indicators[e].show = !1 : cryptowatch.config.config.indicators[e].height -= c, cryptowatch.config.cache()
      }
    },
    _viewportChange: function() {
      a._clipPosition(), a.scales = {}, a.canvas.fields = {}, a.canvas.layers.chart.resetHoverareas(), a.canvas.layers.drawing.resetHoverareas(), a._timeBounds = a._calculateTimeBounds(), a._visibleCandles = a._candlesBetweenTimes(a._timeBounds.start, a._timeBounds.end), a._clipIndicatorHeights(), a.numIndicators = 0, cryptowatch.config.bottomIndicators.forEach(function(b) {
        cryptowatch.config.shouldDraw[b]() && a.numIndicators++
      });
      var b = a.config.xAxisHeight,
        c = cryptowatch.config.config.indicatorHeight;
      cryptowatch.config.shouldDraw.aroon() && (new Field(a.canvas, "aroon", {
        top: 100,
        bottom: 0
      }, {
        top: a.canvas.layers.chart.height - (b + cryptowatch.config.config.indicators.aroon.height),
        bottom: a.canvas.layers.chart.height - b,
        left: 0,
        right: a.canvas.layers.chart.width - a.config.yAxisWidth
      }), b += cryptowatch.config.config.indicators.aroon.height + a.config.indicatorMargin, a._registerIndicatorHeightAdjustment("aroon", b)), cryptowatch.config.shouldDraw.rsi() && (new Field(a.canvas, "rsi", {
        top: 100,
        bottom: 0
      }, {
        top: a.canvas.layers.chart.height - (b + cryptowatch.config.config.indicators.rsi.height),
        bottom: a.canvas.layers.chart.height - b,
        left: 0,
        right: a.canvas.layers.chart.width - a.config.yAxisWidth
      }), b += cryptowatch.config.config.indicators.rsi.height + a.config.indicatorMargin, a._registerIndicatorHeightAdjustment("rsi", b)), cryptowatch.config.shouldDraw.obv() && (new Field(a.canvas, "obv", {
        top: d3.max(a._visibleCandles.map(function(a) {
          return Math.max(a.analysis.OBV, a.analysis.OBVMA[cryptowatch.config.config.indicators.obv.maPeriods])
        })),
        bottom: d3.min(a._visibleCandles.map(function(a) {
          return Math.min(a.analysis.OBV, a.analysis.OBVMA[cryptowatch.config.config.indicators.obv.maPeriods])
        }))
      }, {
        top: a.canvas.layers.chart.height - (b + cryptowatch.config.config.indicators.obv.height),
        bottom: a.canvas.layers.chart.height - b,
        left: 0,
        right: a.canvas.layers.chart.width - a.config.yAxisWidth
      }), b += cryptowatch.config.config.indicators.obv.height + a.config.indicatorMargin, a._registerIndicatorHeightAdjustment("obv", b));
      if (cryptowatch.config.shouldDraw.macd()) {
        var d = Math.abs(Math.max(d3.max(a._visibleCandles.map(function(a) {
            return a.analysis.MACD.mainLine
          })), d3.max(a._visibleCandles.map(function(a) {
            return a.analysis.MACD.signalLine
          })))),
          e = Math.abs(Math.min(d3.min(a._visibleCandles.map(function(a) {
            return a.analysis.MACD.mainLine
          })), d3.min(a._visibleCandles.map(function(a) {
            return a.analysis.MACD.signalLine
          })))),
          f = Math.max(d, e);
        new Field(a.canvas, "macd", {
          top: f,
          bottom: -f
        }, {
          top: a.canvas.layers.chart.height - (b + cryptowatch.config.config.indicators.macd.height),
          bottom: a.canvas.layers.chart.height - b,
          left: 0,
          right: a.canvas.layers.chart.width - a.config.yAxisWidth
        }), new Field(a.canvas, "macdHistogram", {
          top: f,
          bottom: -f
        }, {
          top: a.canvas.layers.chart.height - (b + cryptowatch.config.config.indicators.macd.height),
          bottom: a.canvas.layers.chart.height - b,
          left: 0,
          right: a.canvas.layers.chart.width - a.config.yAxisWidth
        }), b += cryptowatch.config.config.indicators.macd.height + a.config.indicatorMargin, a._registerIndicatorHeightAdjustment("macd", b)
      }
      cryptowatch.config.shouldDraw.volume() && (new Field(a.canvas, "volume", {
        top: d3.max(a._visibleCandles.map(function(a) {
          return a.Volume
        })),
        bottom: 0
      }, {
        top: a.canvas.layers.chart.height - (b + cryptowatch.config.config.indicators.volume.height),
        bottom: a.canvas.layers.chart.height - b,
        left: 0,
        right: a.canvas.layers.chart.width - a.config.yAxisWidth
      }, {}), b += cryptowatch.config.config.indicators.volume.height + a.config.indicatorMargin, a._registerIndicatorHeightAdjustment("volume", b)), a.indicatorTop = b;
      var g = a.config.pricePadding,
        h = d3.max(a._visibleCandles.map(function(a) {
          return a.Candle.High
        })),
        i = Math.max(0, d3.min(a._visibleCandles.map(function(a) {
          return a.Candle.Low
        }))),
        j = h - i,
        k = upperBoundConverted = h,
        l = lowerBoundConverted = Math.max(0, i);
      cryptowatch.currency.fiatPreference && cryptowatch.currency.fiat.indexOf(cryptowatch.currencyPair.quote) > -1 ? (upperBoundConverted = cryptowatch.currency.convert(k, cryptowatch.currencyPair.quote, cryptowatch.currency.fiatPreference), lowerBoundConverted = cryptowatch.currency.convert(l, cryptowatch.currencyPair.quote, cryptowatch.currency.fiatPreference), a._priceAxisCurrency = cryptowatch.currency.fiatPreference) : a._priceAxisCurrency = cryptowatch.currencyPair.quote, new Field(a.canvas, "price", {
        top: k,
        bottom: l
      }, {
        top: 0,
        bottom: a.canvas.layers.chart.height - b,
        left: 0,
        right: a.canvas.layers.chart.width - a.config.yAxisWidth
      }, {
        padding: {
          top: a.config.headerHeight + g,
          bottom: g
        },
        optIntoLogScale: !0
      }), new Field(a.canvas, "priceConverted", {
        top: upperBoundConverted,
        bottom: lowerBoundConverted
      }, {
        top: 0,
        bottom: a.canvas.layers.chart.height - b,
        left: 0,
        right: a.canvas.layers.chart.width - a.config.yAxisWidth
      }, {
        padding: {
          top: a.config.headerHeight + g,
          bottom: g
        },
        optIntoLogScale: !0
      }), new Field(a.canvas, "yaxis", {
        top: upperBoundConverted,
        bottom: lowerBoundConverted,
        left: 0,
        right: a.config.yAxisWidth
      }, {
        top: 0,
        bottom: a.canvas.layers.chart.height,
        left: a.canvas.layers.chart.width - a.config.yAxisWidth,
        right: a.canvas.layers.chart.width
      }, {
        optIntoLogScale: !0,
        padding: {
          top: a.config.headerHeight + g,
          bottom: g,
          left: 0,
          right: 0
        }
      }), a._calculateXAxisTicks()
    },
    _calculateXAxisTicks: function() {
      var b = a._getTimeSpan(),
        c = [900, 1800, 3600, 21600, 43200, 86400, 259200, 604800, 1209600, 2419200, 7257600, 14515200],
        d = c[0],
        e = a.canvas.layers.chart.width / 120;
      while (b / e > d) {
        c = c.slice(1);
        if (c.length === 0) break;
        d = c[0]
      }
      a._xAxisTicks = {
        start: a.utils.roundDownTo(a._timeBounds.start, d) + a._tzoffset - d - 86400,
        end: a._visibleCandles[a._visibleCandles.length - 1].Time + b,
        size: d
      }
    },
    _registerIndicatorHeightAdjustment: function(b, c) {
      a.canvas.layers.chart.registerHoverarea(new Hoverarea("heightAdjustment:" + b, {
        type: "rect",
        left: 0,
        right: a.canvas.layers.chart.width,
        top: a.canvas.layers.chart.height - c,
        bottom: a.canvas.layers.chart.height - c + a.config.indicatorMargin
      }, {
        cursor: "resize-y",
        disableCrosshair: !0,
        callbacks: {
          drag: function(c, d, e) {
            var f = a._priceChartHeight();
            if (e.y > 0 || f + e.y > 100) cryptowatch.config.config.indicators[b].height -= e.y, cryptowatch.config.config.indicators[b].height = Math.max(cryptowatch.config.config.indicators[b].height, 50), cryptowatch.config.cache();
            a._viewportChange(), a.refresh.all()
          }
        }
      }))
    },
    _clearIndicatorMargin: function(b) {
      cryptowatch.config.shouldDraw[b]() && a.canvas.layers.axes.context.clearRect(a.config.yAxisLeftBoundary() - 1, a.canvas.fields[b].range.top - a.config.indicatorMargin, a.canvas.layers.chart.width, a.config.indicatorMargin + 1)
    },
    _timeIsVisible: function(b) {
      return b >= a._timeBounds.start && b <= a._visibleCandles[a._visibleCandles.length - 1].Time
    },
    _cacheCandleIndexes: function() {
      a.candles.forEach(function(a, b) {
        a.i = b
      })
    },
    _candleWidthWithMargin: function() {
      return cryptowatch.config === undefined ? 5 : cryptowatch.config.config.candleWidth + a.config.candleMargin
    },
    decreaseCandleWidth: function() {
      if (cryptowatch.config.config.candleWidth <= 1) return;
      a._modifyCandleWidth(-2)
    },
    increaseCandleWidth: function() {
      if (cryptowatch.config.config.candleWidth >= 31) return;
      a._modifyCandleWidth(2)
    },
    defaultCandleWidth: function() {
      a._modifyCandleWidth(5 - cryptowatch.config.config.candleWidth)
    },
    _modifyCandleWidth: function(b) {
      cryptowatch.config.config.candleWidth += b, cryptowatch.config.cache(), a._viewportChange(), cryptowatch.utils.nextFrame(function() {
        a.refresh.all()
      }), a.canvas.cursor.setDragSnapping({
        x: a.config.fullCandleWidth()
      })
    },
    _setupCandles: function(a) {
      a.forEach(function(a) {
        a.analysis = {
          EMA: {},
          SMA: {},
          stdDeviation: {},
          MACD: {},
          TR: 0,
          ATR: {},
          SAR: {},
          OBV: 0,
          OBVMA: {},
          chandelierExit: {}
        }
      })
    },
    setInterval: function(b) {
      if (!a.initialized) return;
      var c;
      for (c = 0; c < a.candles.length; c++) {
        var d = a.candles[c];
        if (d.Time === b.Time) return d.Candle = Object.create(b.Candle), d.Volume = b.Volume, d
      }
      return a.candles.push(b), a._indexCandles([b]), b.i = c, b
    },
    _analyzeCandles: function(b) {
      var c = a.candles[0];
      this._calculate("ema", {
        periods: cryptowatch.config.config.indicators.ema.periods[0]
      }, b), this._calculate("ema", {
        periods: cryptowatch.config.config.indicators.ema.periods[1]
      }, b), this._calculate("ema", {
        periods: cryptowatch.config.config.indicators.ema.periods[2]
      }, b), this._calculate("ema", {
        periods: cryptowatch.config.config.indicators.ema.periods[3]
      }, b), this._calculate("ema", {
        periods: cryptowatch.config.config.indicators.ema.periods[4]
      }, b), this._calculate("ema", {
        periods: cryptowatch.config.config.indicators.macd.periods[0]
      }, b), this._calculate("ema", {
        periods: cryptowatch.config.config.indicators.macd.periods[1]
      }, b), this._calculate("sma", {
        periods: cryptowatch.config.config.indicators.bollingerBands.period
      }, b), this._calculate("stdDeviation", {
        periods: cryptowatch.config.config.indicators.bollingerBands.period
      }, b), this._calculate("heikenAshi", {}, b), this._calculate("macd", {}, b), this._calculate("aroon", {}, b), this._calculate("atr", {
        periods: cryptowatch.config.config.indicators.keltnerChannel.atrPeriod
      }, b), this._calculate("sar", {}, b), this._calculate("rsi", {}, b), this._calculate("obv", {}, b), this._calculate("obvma", {
        periods: cryptowatch.config.config.indicators.obv.maPeriods
      }, b), this._calculate("ichimoku", {}, b), this._calculate("atr", {
        periods: cryptowatch.config.config.indicators.chandelierExit.periods
      }, b), this._calculate("chandelierExit", {
        periods: cryptowatch.config.config.indicators.chandelierExit.periods
      }, b), this._calculateZigZagPoints(cryptowatch.config.config.indicators.zigzag.threshold)
    },
    candleSliceEndingAt: function(b, c) {
      return a.candles.slice(b - (c - 1), b + 1)
    },
    _calculate: function(b, c, d) {
      d === undefined && (d = a.candles), d.forEach(function(d) {
        a._calculations[b](d, d.i, c)
      })
    },
    _calculations: {
      ema: function(b, c, d) {
        if (c < d.periods) b.analysis.EMA[d.periods] = b.Candle.Close;
        else {
          var e = 2 / (d.periods + 1),
            f = a.candles[c - 1];
          f ? prevEMA = f.analysis.EMA[d.periods] : prevEMA = 0, b.analysis.EMA[d.periods] = (b.Candle.Close - prevEMA) * e + prevEMA
        }
      },
      sma: function(b, c, d) {
        var e = d.periods;
        if (c < d.periods) {
          b.analysis.SMA[d.periods] = b.Candle.Close;
          return
        }
        var f = a.candleSliceEndingAt(c, d.periods),
          g = 0;
        for (var c = 0; c < f.length; c++) g += f[c].Candle.Close;
        g /= e, b.analysis.SMA[d.periods] = g
      },
      stdDeviation: function(b, c, d) {
        if (b.analysis.SMA[d.periods] === undefined) throw new Error("Ordering error: SMA not calculated yet");
        if (c < d.periods) return;
        var e = a.candleSliceEndingAt(c, d.periods),
          f = d3.mean(e.map(function(a) {
            return a.Candle.Close
          })),
          g = 0;
        for (var c = 0; c < e.length; c++) {
          var h = e[c];
          g += Math.pow(h.Candle.Close - f, 2)
        }
        g /= d.periods, b.analysis.stdDeviation[d.periods] = Math.sqrt(g)
      },
      macd: function(b, c) {
        var d = a.candles[c - 1],
          e = b.analysis.EMA[cryptowatch.config.config.indicators.macd.periods[0]] - b.analysis.EMA[cryptowatch.config.config.indicators.macd.periods[1]],
          f = 2 / (cryptowatch.config.config.indicators.macd.lag + 1),
          g = d === undefined ? e : (e - d.analysis.MACD.signalLine) * f + d.analysis.MACD.signalLine;
        b.analysis.MACD = {
          mainLine: e,
          signalLine: g
        }
      },
      atr: function(b, c, d) {
        if (c == 0) return 0;
        var e = d.periods,
          f = a.candles[c - 1],
          g = b.Candle.High - b.Candle.Low,
          h = Math.abs(b.Candle.High - f.Candle.Close),
          i = Math.abs(b.Candle.Low - f.Candle.Close);
        b.analysis.TR = Math.max(g, h, i), c === e ? b.analysis.ATR[e] = a.candles.slice(c - e - 1, c - 1).reduce(function(a, b) {
          return a + b.analysis.TR
        }, 0) / e : c > e && (b.analysis.ATR[e] = (f.analysis.ATR[e] * (e - 1) + b.analysis.TR) / e)
      },
      chandelierExit: function(b, c, d) {
        var e = d.periods,
          f = a.candles.slice(c - e, c),
          g = Math.max.apply(Math, f.map(function(a) {
            return a.Candle.High
          })),
          h = Math.min.apply(Math, f.map(function(a) {
            return a.Candle.Low
          })),
          i = b.analysis.ATR[e];
        if (c < e) return;
        if (i === undefined) throw new Error("ATR not calculated yet for chandelier exit");
        b.analysis.chandelierExit[e] = {
          hi: g,
          lo: h
        }
      },
      sar: function(b, c) {
        var d = cryptowatch.config.config.indicators.sar.step,
          e = cryptowatch.config.config.indicators.sar.maxStep;
        if (c < 2) {
          b.analysis.SAR = {
            position: "long",
            value: 0,
            acc: d,
            accd: 0
          };
          return
        }
        var f = {},
          g = a.candles[c - 1],
          h = a.candles[c - 2],
          i, j;
        f.acc = g.analysis.SAR.acc, f.position = g.analysis.SAR.position, f.position == "long" ? (i = Math.max(b.Candle.High, g.Candle.High), j = Math.max(g.Candle.High, h.Candle.High), i > j && (f.acc += d, f.acc = Math.min(f.acc, e))) : (i = Math.min(b.Candle.Low, g.Candle.Low), j = Math.min(g.Candle.Low, h.Candle.Low), i < j && (f.acc += d, f.acc = Math.min(f.acc, e))), f.accd = f.acc * Math.abs(i - g.analysis.SAR.value), g.analysis.SAR.position == "long" ? g.analysis.SAR.value + g.analysis.SAR.accd > b.Candle.Low ? (f.position = "short", f.value = j, f.acc = d) : (f.position = "long", f.value = Math.min(g.analysis.SAR.value + g.analysis.SAR.accd, g.Candle.Low, h.Candle.Low)) : g.analysis.SAR.value - g.analysis.SAR.accd < b.Candle.High ? (f.position = "long", f.value = j, f.acc = d) : (f.position = "short", f.value = Math.max(g.analysis.SAR.value - g.analysis.SAR.accd, g.Candle.High, h.Candle.High)), b.analysis.SAR = f
      },
      rsi: function(b, c) {
        if (c == 0) return b.analysis.change = b.analysis.rs = b.analysis.rsi = 0;
        var d = cryptowatch.config.config.indicators.rsi.periods,
          e = a.candles[c - 1];
        b.analysis.change = b.Candle.Close - b.Candle.Open;
        if (c == d) {
          var f = [],
            g = [];
          a.candles.slice(0, d).forEach(function(a) {
            a.analysis.change >= 0 ? f.push(a.analysis.change) : g.push(-a.analysis.change)
          }), b.analysis.rsAvgGain = f.reduce(function(a, b) {
            return a + b
          }, 0) / d, b.analysis.rsAvgLoss = g.reduce(function(a, b) {
            return a + b
          }, 0) / d
        } else c > d && (b.analysis.change > 0 ? (b.analysis.rsAvgLoss = (e.analysis.rsAvgLoss * (d - 1) + 0) / d, b.analysis.rsAvgGain = (e.analysis.rsAvgGain * (d - 1) + b.analysis.change) / d) : (b.analysis.rsAvgLoss = (e.analysis.rsAvgLoss * (d - 1) + -b.analysis.change) / d, b.analysis.rsAvgGain = (e.analysis.rsAvgGain * (d - 1) + 0) / d));
        b.analysis.rs = b.analysis.rsAvgGain / b.analysis.rsAvgLoss, b.analysis.rsi = 100 - 100 / (1 + b.analysis.rs)
      },
      obv: function(b, c) {
        if (c === 0) b.analysis.OBV = 0;
        else {
          var d = a.candles[c - 1];
          b.Candle.Close === d.Candle.Close ? b.analysis.OBV = d.analysis.OBV : b.Candle.Close < d.Candle.Close ? b.analysis.OBV = d.analysis.OBV - b.Volume : b.Candle.Close > d.Candle.Close && (b.analysis.OBV = d.analysis.OBV + b.Volume)
        }
      },
      obvma: function(b, c, d) {
        var e = a.candleSliceEndingAt(c, d.periods),
          f = 0;
        for (var c = 0; c < e.length; c++) f += e[c].analysis.OBV;
        f /= d.periods, b.analysis.OBVMA[d.periods] = f
      },
      ichimoku: function(b, c) {
        var d = b.analysis.ichimoku = {},
          e = cryptowatch.config.config.indicators.ichimoku.tenkanPeriod,
          f = cryptowatch.config.config.indicators.ichimoku.kijunPeriod;
        if (c < f * 2) return;
        var g = a.candleSliceEndingAt(c, e),
          h = a.candleSliceEndingAt(c, f),
          i = a.candleSliceEndingAt(c, f * 2);
        d.tenkanSen = a._calculations.ichimokuHighLowAvg(g), d.kijunSen = a._calculations.ichimokuHighLowAvg(h), d.senkouSpanA = (d.tenkanSen + d.kijunSen) / 2, d.senkouSpanB = a._calculations.ichimokuHighLowAvg(i);
        var j = a.candles[c + 26];
        j !== undefined ? d.chikouSpan = j.Candle.Close : d.chikouSpan = undefined
      },
      ichimokuHighLowAvg: function(a) {
        var b = d3.max(a.map(function(a) {
            return a.Candle.High
          })),
          c = d3.min(a.map(function(a) {
            return a.Candle.Low
          }));
        return (b + c) / 2
      },
      heikenAshi: function(b, c) {
        if (c == 0) {
          b.analysis.heikenAshi = b.Candle;
          return
        }
        var d = a.candles[c - 1],
          e = (b.Candle.Open + b.Candle.Close + b.Candle.High + b.Candle.Low) / 4,
          f = (d.analysis.heikenAshi.Open + d.analysis.heikenAshi.Close) / 2;
        b.analysis.heikenAshi = {
          Close: e,
          Open: f,
          High: Math.max(b.Candle.High, f, e),
          Low: Math.min(b.Candle.Low, f, e)
        }
      },
      aroon: function(b, c) {
        var d = cryptowatch.config.config.indicators.aroon.periods,
          e = a.candles.slice(c - d, c).map(function(a) {
            return a.Candle.Close
          }),
          f = Math.min.apply(Math, e),
          g = Math.max.apply(Math, e),
          h = d - e.indexOf(f),
          i = d - e.indexOf(g);
        b.analysis.aroon = {
          down: (d - h) / d * 100,
          up: (d - i) / d * 100
        }
      }
    },
    _analysis: {
      zigzag: {}
    },
    _calculateZigZagPoints: function(b) {
      var c = !1,
        d = {
          time: a.candles[0].Time,
          price: a.candles[0].Candle.Close
        },
        e = [$.extend({}, d)];
      for (var f = 0; f < a.candles.length; f++) {
        var g = a.candles[f],
          h = c ? g.Candle.Low : g.Candle.High;
        c ? g.Candle.High > d.price ? (d.time = g.Time, d.price = g.Candle.High) : (d.price - g.Candle.Low) / d.price > b / 100 && (e.push(d), d = $.extend({}, d), c = !c) : g.Candle.Low < d.price ? (d.time = g.Time, d.price = g.Candle.Low) : (g.Candle.High - d.price) / d.price > b / 100 && (e.push(d), d = $.extend({}, d), c = !c)
      }
      a._analysis.zigzag[b] = e
    },
    _clear: function(b) {
      b.clearRect(0, 0, a.canvas.layers.chart.width, a._height())
    },
    refresh: {
      chart: function() {
        if (!a.initialized) return;
        a._clear(a.canvas.layers.chart.context), a.canvas.layers.axes.context.font = "11px 'Droid Sans Mono', monospace", a.canvas.layers.chart.context.font = "11px 'Droid Sans Mono', monospace", a.canvas.fields.price.withClipMask(a.canvas.layers.chart, function() {
          cryptowatch.config.shouldDraw.grid() && a._drawGrid({
            y: a.canvas.fields.priceConverted,
            spacing: 50
          }), a._drawCandles(), cryptowatch.config.shouldDraw.bollingerBands() && a._drawBollingerBands(), cryptowatch.config.shouldDraw.keltnerChannel() && a._drawKeltnerChannel(), cryptowatch.config.shouldDraw.ichimoku() && a._drawIchimokuCloud(), cryptowatch.config.shouldDraw.zigzag() && a._drawZigZag(), cryptowatch.config.shouldDraw.chandelierExit() && a._drawChandelierExit(), cryptowatch.config.shouldDraw.sar() && a._drawSAR(), a._labelViewportHighLow(), cryptowatch.config.shouldDraw.ema() && a._drawEMAs(), cryptowatch.config.shouldDraw.trades() && a._drawOwnTrades()
        }), cryptowatch.config.shouldDraw.macd() && (cryptowatch.config.shouldDraw.grid() && a.canvas.fields.macd.withClipMask(a.canvas.layers.chart, a._drawGrid.bind(a)), a._drawMACD()), cryptowatch.config.shouldDraw.rsi() && (cryptowatch.config.shouldDraw.grid() && a.canvas.fields.rsi.withClipMask(a.canvas.layers.chart, a._drawGrid.bind(a)), a._drawRSI()), cryptowatch.config.shouldDraw.obv() && (cryptowatch.config.shouldDraw.grid() && a.canvas.fields.obv.withClipMask(a.canvas.layers.chart, a._drawGrid.bind(a)), a._drawOBV()), cryptowatch.config.shouldDraw.aroon() && (cryptowatch.config.shouldDraw.grid() && a.canvas.fields.aroon.withClipMask(a.canvas.layers.chart, a._drawGrid.bind(a)), a._drawAroon()), cryptowatch.config.shouldDraw.volume() && (cryptowatch.config.shouldDraw.grid() && a.canvas.fields.volume.withClipMask(a.canvas.layers.chart, function() {
          a._drawGrid({
            y: a.canvas.fields.volume,
            spacing: 25
          })
        }), a._drawVolume()), a.drawDepthMirror(), a._drawHorizontalLine(a.canvas.layers.chart.context, a.canvas.fields.price.range.bottom + a.config.pricePadding, cryptowatch.colors.theme.guide.toString())
      },
      axes: function() {
        a._clear(a.canvas.layers.axes.context), a.canvas.layers.axes.resetHoverareas(), a._setupYAxisHoverarea(), a._drawXAxis(), a._drawCrosshair(), a._drawYAxis()
      },
      all: function() {
        a.refresh.chart(), a.refresh.axes(), cryptowatch.drawing.refresh(a)
      }
    },
    _candleCapacity: function() {
      return Math.floor(a._widthForIntervals() / a.config.fullCandleWidth())
    },
    _calculateTimeBounds: function() {
      var b = a._candleCapacity(),
        c = a.POSITION * cryptowatch.periodInt,
        d = a.candles[a.candles.length - 1].Time - c;
      return d = a.utils.roundDownTo(d, cryptowatch.periodInt), startTime = d - a._widthForIntervals() / a.config.fullCandleWidth() * cryptowatch.periodInt, startTime = a.utils.roundDownTo(startTime, cryptowatch.periodInt), {
        start: startTime,
        end: d
      }
    },
    _currentCandle: function() {
      return a.candles[a.candles.length - 1]
    },
    _currentCandleVisible: function() {
      return a._currentCandle().i === a._visibleCandles[a._visibleCandles.length - 1].i
    },
    _candlesBetweenTimes: function(b, c) {
      var d = [];
      return a.candles.forEach(function(a) {
        a.Time > b - cryptowatch.periodInt && a.Time <= c && d.push(a)
      }), d.length === 0 ? [] : d
    },
    _width: function() {
      return a.canvas.layers.chart.width
    },
    _widthForIntervals: function() {
      return a._width() - a.config.yAxisWidth
    },
    _height: function() {
      return a.canvas.layers.chart.height
    },
    _selectedCandle: undefined,
    _drawGrid: function(b) {
      if (b && b.y) {
        var c = b.y.tickSize(b.spacing),
          d = {
            start: a.utils.roundDownTo(b.y.domain.bottom, c),
            end: a.utils.roundUpTo(b.y.domain.top, c),
            size: c
          };
        for (var e = d.start; e <= d.end; e += d.size) {
          var f = b.y.ySharp(e);
          a.canvas.layers.chart.drawLineSegment({
            x: 0,
            y: f
          }, {
            x: a.canvas.layers.chart.width,
            y: f
          }, {
            color: cryptowatch.colors.theme.guide.toString(),
            alpha: .6
          })
        }
      }
      for (var g = a._xAxisTicks.start; g <= a._xAxisTicks.end; g += a._xAxisTicks.size) {
        var h = cryptowatch.utils.sharpen(a.canvas.fields.price.x(g) + a.config.halfCandleWidth());
        a.canvas.layers.chart.drawLineSegment({
          x: h,
          y: 0
        }, {
          x: h,
          y: a.canvas.layers.chart.height
        }, {
          color: cryptowatch.colors.theme.guide.toString(),
          alpha: .6
        })
      }
    },
    _drawCandles: function() {
      var b = cryptowatch.config.config.chartStyle;
      b === "OHLC" || b === "heikenAshi" ? a._visibleCandles.forEach(function(c) {
        var d;
        b === "OHLC" ? d = c.Candle : b === "heikenAshi" && (d = c.analysis.heikenAshi);
        var e = d.Open < d.Close;
        a.canvas.layers.chart.context.fillStyle = e ? cryptowatch.colors.theme.long.fill.toString() : cryptowatch.colors.theme.short.fill.toString(), a.canvas.layers.chart.context.strokeStyle = e ? cryptowatch.colors.theme.long.stroke.toString() : cryptowatch.colors.theme.short.stroke.toString().toString(), a.canvas.layers.chart.context.globalAlpha = .7;
        var f = a.config.halfCandleWidth(),
          g = a.canvas.fields.price.x(c.Time) + f;
        a.canvas.layers.chart.context.beginPath(), a.canvas.layers.chart.context.moveTo(g, a.canvas.fields.price.ySharp(d.Low)), a.canvas.layers.chart.context.lineTo(g, a.canvas.fields.price.ySharp(d.High)), a.canvas.layers.chart.context.stroke(), a.canvas.layers.chart.context.closePath(), a.canvas.layers.chart.context.globalAlpha = 1;
        var h = [a.canvas.fields.price.xSharp(c.Time), a.canvas.fields.price.ySharp(Math.min(d.Open, d.Close)), cryptowatch.config.config.candleWidth - 1, Math.round(a.canvas.fields.price.ySharp(Math.max(d.Open, d.Close)) - a.canvas.fields.price.ySharp(Math.min(d.Open, d.Close)))];
        a.canvas.layers.chart.context.fillRect.apply(a.canvas.layers.chart.context, h), a.canvas.layers.chart.context.strokeRect.apply(a.canvas.layers.chart.context, h)
      }) : b === "bar" ? a._visibleCandles.forEach(function(b) {
        var c = b.Candle.Open < b.Candle.Close;
        a.canvas.layers.chart.context.strokeStyle = c ? cryptowatch.colors.theme.long.stroke.toString() : cryptowatch.colors.theme.short.stroke.toString().toString();
        var d = a.canvas.fields.price.x(b.Time),
          e = d + a.config.halfCandleWidth(),
          f = d + cryptowatch.config.config.candleWidth;
        a.canvas.layers.chart.context.beginPath(), a.canvas.layers.chart.context.moveTo(e, a.canvas.fields.price.ySharp(b.Candle.Low)), a.canvas.layers.chart.context.lineTo(e, a.canvas.fields.price.ySharp(b.Candle.High)), a.canvas.layers.chart.context.closePath(), a.canvas.layers.chart.context.stroke(), a.canvas.layers.chart.context.beginPath(), a.canvas.layers.chart.context.moveTo(d, a.canvas.fields.price.ySharp(b.Candle.Open)), a.canvas.layers.chart.context.lineTo(e, a.canvas.fields.price.ySharp(b.Candle.Open)), a.canvas.layers.chart.context.closePath(), a.canvas.layers.chart.context.stroke(), a.canvas.layers.chart.context.beginPath(), a.canvas.layers.chart.context.moveTo(e, a.canvas.fields.price.ySharp(b.Candle.Close)), a.canvas.layers.chart.context.lineTo(f, a.canvas.fields.price.ySharp(b.Candle.Close)), a.canvas.layers.chart.context.closePath(), a.canvas.layers.chart.context.stroke()
      }) : b === "line" && (a._drawLine(function(b) {
        return {
          x: a.canvas.fields.price.x(b.Time) + a.config.halfCandleWidth(),
          y: a.canvas.fields.price.ySharp(b.Candle.Close)
        }
      }, cryptowatch.colors.theme.textStrong.toString()), a._fillArea(a._visibleCandles, function(b) {
        return {
          x: a.canvas.fields.price.x(b.Time) + a.config.halfCandleWidth(),
          y: a.canvas.fields.price.ySharp(b.Candle.Low)
        }
      }, function(b) {
        return {
          x: a.canvas.fields.price.x(b.Time) + a.config.halfCandleWidth(),
          y: a.canvas.fields.price.ySharp(b.Candle.Close)
        }
      }, cryptowatch.colors.theme.short.stroke.toString().toString(), null, null, .3), a._fillArea(a._visibleCandles, function(b) {
        return {
          x: a.canvas.fields.price.x(b.Time) + a.config.halfCandleWidth(),
          y: a.canvas.fields.price.ySharp(b.Candle.High)
        }
      }, function(b) {
        return {
          x: a.canvas.fields.price.x(b.Time) + a.config.halfCandleWidth(),
          y: a.canvas.fields.price.ySharp(b.Candle.Close)
        }
      }, cryptowatch.colors.theme.long.stroke.toString(), null, null, .3))
    },
    _labelViewportHighLow: function() {
      var b = {
          val: -Infinity
        },
        c = {
          val: Infinity
        };
      a._visibleCandles.forEach(function(a) {
        a.Candle.High > b.val && (b.val = a.Candle.High, b.time = a.Time), a.Candle.Low < c.val && (c.val = a.Candle.Low, c.time = a.Time)
      }), a._labelPricePoint(b.time, b.val), a._labelPricePoint(c.time, c.val)
    },
    _labelPricePoint: function(b, c) {
      var d = a._timeBounds.start + (a._timeBounds.end - a._timeBounds.start) / 2,
        e = b >= d ? "right" : "left";
      a.canvas.layers.chart.context.fillStyle = cryptowatch.colors.theme.text.toString(), a.canvas.layers.chart.context.textAlign = e == "right" ? "end" : "start";
      var f = a.canvas.fields.price.xSharp(b),
        g = a.canvas.fields.price.ySharp(c);
      a.canvas.layers.chart.context.fillText(cryptowatch.currency.fmt(c, cryptowatch.currencyPair.quote, {
        label: !1
      }), e === "left" ? f + a.config.fullCandleWidth() - 1 : f - 1, a.canvas.fields.price.ySharp(c) + 3), a.canvas.layers.chart.context.textAlign = "start", a.canvas.layers.chart.context.strokeStyle = cryptowatch.colors.theme.text.toString()
    },
    _tradesDrawn: [],
    _tradeClusters: [],
    _posnForTrade: function(b) {
      var c = a.config.fullCandleWidth(),
        d = Math.round(c / 2),
        e = cryptowatch.chart.utils.roundUpTo(b.Timestamp, cryptowatch.periodInt);
      return {
        x: a.canvas.fields.price.xSharp(e) - a.config.candleMargin + d,
        y: a.canvas.fields.price.ySharp(b.Price)
      }
    },
    _tradeIndexHighlighted: undefined,
    _drawOwnTrades: function() {
      if (cryptowatch.account.trades === undefined) return;
      if (cryptowatch.trading.overlay === !0) return;
      if (a._visibleCandles.length === 0) return;
      var b = [],
        c = a._timeBounds.start,
        d = a._visibleCandles[a._visibleCandles.length - 1].Time,
        e = 10;
      for (var f = 0; f < cryptowatch.account.trades.length; f++) {
        var g = cryptowatch.account.trades[f];
        if (g.Timestamp < a._timeBounds.start || g.Timestamp > a._timeBounds.end) continue;
        var h = a._posnForTrade(g),
          i = !1;
        for (var j = 0; j < b.length; j++) {
          var k = b[j];
          if (h.x === k.origin.x && Math.abs(h.y - k.origin.y) < e) {
            b[j].trades.push(g), i = !0;
            break
          }
        }
        i || b.push({
          origin: h,
          trades: [g]
        })
      }
      for (var j = 0; j < b.length; j++) {
        var l = b[j].trades;
        l.length === 1 ? a._drawTrade(a._posnForTrade(l[0]), l[0].Type, l[0]._idx) : a._drawTrade(a._posnForTrade(l[0]), l[0].Type, l[0]._idx)
      }
      a.tradeHovered && a._drawTrade(a._posnForTrade(a.tradeHovered), a.tradeHovered.Type, a.tradeHovered._idx)
    },
    _drawTrade: function(b, c, d) {
      a.canvas.layers.chart.context.lineWidth = .8;
      var e = a.tradeHovered && d === a.tradeHovered._idx ? 10 : 8;
      a.canvas.layers.chart.drawCircle(b, e + 2, undefined, cryptowatch.colors.theme.background.toString()), a.canvas.layers.chart.drawCircle(b, 4, undefined, c == 0 ? cryptowatch.colors.theme.short.stroke.toString().toString() : cryptowatch.colors.theme.long.stroke.toString()), a.canvas.layers.chart.drawCircle(b, e, cryptowatch.colors.theme.text.toString()), a.canvas.layers.chart.registerHoverarea(new Hoverarea("trade:" + d, {
        type: "circle",
        center: new Posn(b.x, b.y),
        radius: 8
      }, {
        cursor: "pointer",
        compatibleTools: ["crosshair"],
        callbacks: {
          hover: function() {
            a.tradeHovered = cryptowatch.account.trades[d], cryptowatch.chart.refresh.all()
          },
          leave: function() {
            delete a.tradeHovered, cryptowatch.chart.refresh.all()
          }
        }
      })), a.canvas.layers.chart.context.lineWidth = 1
    },
    _drawSAR: function() {
      a.canvas.layers.chart.context.fillStyle = cryptowatch.colors.theme.text.toString(), a._visibleCandles.forEach(function(b) {
        a.canvas.layers.chart.context.fillRect(Math.round(a.canvas.fields.price.x(b.Time) + a.config.halfCandleWidth() - 1), Math.round(a.canvas.fields.price.y(b.analysis.SAR.value)), 1, 1)
      })
    },
    _drawVolume: function() {
      a._drawHorizontalLine(a.canvas.layers.chart.context, a.canvas.fields.volume.y.range()[0], cryptowatch.colors.theme.guide.toString()), a._drawHorizontalLine(a.canvas.layers.chart.context, a.canvas.fields.volume.y.range()[1], cryptowatch.colors.theme.guide.toString()), a._visibleCandles.forEach(function(b) {
        var c = b.Candle.Open < b.Candle.Close;
        a.canvas.layers.chart.context.fillStyle = c ? cryptowatch.colors.theme.long.fill.toString() : cryptowatch.colors.theme.short.fill.toString(), a.canvas.layers.chart.context.strokeStyle = c ? cryptowatch.colors.theme.long.stroke.toString() : cryptowatch.colors.theme.short.stroke.toString().toString();
        var d = [a.canvas.fields.volume.xSharp(b.Time), a.canvas.fields.volume.ySharp(0), cryptowatch.config.config.candleWidth - 1, a.canvas.fields.volume.ySharp(b.Volume) - a.canvas.fields.volume.ySharp(0)];
        a.canvas.layers.chart.context.fillRect.apply(a.canvas.layers.chart.context, d), a.canvas.layers.chart.context.strokeRect.apply(a.canvas.layers.chart.context, d)
      }), a.canvas.layers.chart.context.fillStyle = cryptowatch.colors.theme.text.toString(), a.canvas.layers.chart.context.fillText(cryptowatch.i18n.volume, 10, a.canvas.fields.volume.range.top + 20)
    },
    _drawRSI: function() {
      a._drawHorizontalLine(a.canvas.layers.chart.context, a.canvas.fields.rsi.ySharp(100), cryptowatch.colors.theme.guide.toString()), a._drawHorizontalLine(a.canvas.layers.chart.context, a.canvas.fields.rsi.ySharp(35), cryptowatch.colors.theme.guide.toString()), a._drawHorizontalLine(a.canvas.layers.chart.context, a.canvas.fields.rsi.ySharp(65), cryptowatch.colors.theme.guide.toString()), a._drawHorizontalLine(a.canvas.layers.chart.context, a.canvas.fields.rsi.ySharp(0), cryptowatch.colors.theme.guide.toString()), a._drawLine(function(b) {
        return {
          x: a.canvas.fields.rsi.xSharp(b.Time) + a.config.halfCandleWidth(),
          y: a.canvas.fields.rsi.ySharp(b.analysis.rsi)
        }
      }, cryptowatch.colors.theme.textStrong.toString()), a.canvas.layers.chart.context.fillStyle = cryptowatch.colors.theme.text.toString(), a.canvas.layers.chart.context.fillText("RSI(" + cryptowatch.config.config.indicators.rsi.periods + ")", 10, a.canvas.fields.rsi.range.top + 20), a.canvas.layers.chart.context.globalAlpha = .7, a.canvas.layers.chart.context.fillStyle = cryptowatch.colors.theme.background.toString(), a.canvas.layers.chart.context.fillRect(0, a.canvas.fields.rsi.ySharp(36), a.canvas.layers.chart.context.canvas.width, a.canvas.fields.rsi.ySharp(64) - a.canvas.fields.rsi.ySharp(36)), a.canvas.layers.chart.context.globalAlpha = 1
    },
    _drawOBV: function() {
      a._drawHorizontalLine(a.canvas.layers.chart.context, a.canvas.fields.obv.y.range()[0], cryptowatch.colors.theme.guide.toString()), a._drawHorizontalLine(a.canvas.layers.chart.context, a.canvas.fields.obv.y.range()[1], cryptowatch.colors.theme.guide.toString()), a.canvas.layers.chart.drawLine(a._visibleCandles, function(b) {
        return {
          x: a.canvas.fields.obv.xSharp(b.Time) + a.config.halfCandleWidth(),
          y: a.canvas.fields.obv.ySharp(b.analysis.OBV)
        }
      }, cryptowatch.colors.theme.text.toString()), a.canvas.layers.chart.drawLine(a._visibleCandles, function(b) {
        return {
          x: a.canvas.fields.obv.xSharp(b.Time) + a.config.halfCandleWidth(),
          y: a.canvas.fields.obv.ySharp(b.analysis.OBVMA[cryptowatch.config.config.indicators.obv.maPeriods])
        }
      }, cryptowatch.colors.theme.indicators.ema[2].toString()), a.canvas.layers.chart.drawText({
        x: 10,
        y: a.canvas.fields.obv.range.top + 16
      }, "OBV(" + cryptowatch.config.config.indicators.obv.maPeriods + ")", cryptowatch.colors.theme.text.toString())
    },
    _drawAroon: function() {
      a._drawHorizontalLine(a.canvas.layers.chart.context, a.canvas.fields.aroon.ySharp(0), cryptowatch.colors.theme.guide.toString()), a._drawHorizontalLine(a.canvas.layers.chart.context, a.canvas.fields.aroon.ySharp(30), cryptowatch.colors.theme.guide.toString()), a._drawHorizontalLine(a.canvas.layers.chart.context, a.canvas.fields.aroon.ySharp(50), cryptowatch.colors.theme.guide.toString()), a._drawHorizontalLine(a.canvas.layers.chart.context, a.canvas.fields.aroon.ySharp(70), cryptowatch.colors.theme.guide.toString()), a._drawHorizontalLine(a.canvas.layers.chart.context, a.canvas.fields.aroon.ySharp(100), cryptowatch.colors.theme.guide.toString()), a._drawLine(function(b) {
        return {
          x: a.canvas.fields.aroon.xSharp(b.Time) + a.config.halfCandleWidth(),
          y: a.canvas.fields.aroon.ySharp(b.analysis.aroon.down)
        }
      }, cryptowatch.colors.theme.short.stroke.toString().toString()), a._drawLine(function(b) {
        return {
          x: a.canvas.fields.aroon.xSharp(b.Time) + a.config.halfCandleWidth(),
          y: a.canvas.fields.aroon.ySharp(b.analysis.aroon.up)
        }
      }, cryptowatch.colors.theme.long.stroke.toString()), a.canvas.layers.chart.context.globalAlpha = .5, a.canvas.layers.chart.context.fillStyle = cryptowatch.colors.theme.background.toString(), a.canvas.layers.chart.context.fillRect(0, a.canvas.fields.aroon.ySharp(30), a.canvas.layers.chart.context.canvas.width, a.canvas.fields.aroon.ySharp(70) - a.canvas.fields.aroon.ySharp(30)), a.canvas.layers.chart.context.globalAlpha = 1, a.canvas.layers.chart.context.fillStyle = cryptowatch.colors.theme.text.toString(), a.canvas.layers.chart.context.fillText("Aroon(" + cryptowatch.config.config.indicators.aroon.periods + ")", 10, a.canvas.fields.aroon.range.top + 20)
    },
    _drawMACD: function() {
      a._drawHorizontalLine(a.canvas.layers.chart.context, a.canvas.fields.macd.range.top, cryptowatch.colors.theme.guide.toString()), a._drawHorizontalLine(a.canvas.layers.chart.context, a.canvas.fields.macd.range.bottom, cryptowatch.colors.theme.guide.toString());
      var b = 0;
      a._visibleCandles.forEach(function(c) {
        var d = c.analysis.MACD.mainLine - c.analysis.MACD.signalLine,
          e = [a.canvas.fields.macdHistogram.xSharp(c.Time), a.canvas.fields.macdHistogram.range.top - .5 + Math.round(cryptowatch.config.config.indicators.macd.height / 2), cryptowatch.config.config.candleWidth - 1, a.canvas.fields.macdHistogram.ySharp(d) - a.canvas.fields.macdHistogram.ySharp(0)],
          f = d >= 0;
        f ? d > b ? a.canvas.layers.chart.context.fillStyle = cryptowatch.colors.theme.long.stroke.toString() : a.canvas.layers.chart.context.fillStyle = cryptowatch.colors.theme.background.toString() : d < b ? a.canvas.layers.chart.context.fillStyle = cryptowatch.colors.theme.short.stroke.toString().toString() : a.canvas.layers.chart.context.fillStyle = cryptowatch.colors.theme.background.toString(), a.canvas.layers.chart.context.strokeStyle = d < 0 ? cryptowatch.colors.theme.short.stroke.toString().toString() : cryptowatch.colors.theme.long.stroke.toString(), a.canvas.layers.chart.context.fillRect.apply(a.canvas.layers.chart.context, e), a.canvas.layers.chart.context.strokeRect.apply(a.canvas.layers.chart.context, e), b = d
      });
      var c = cryptowatch.config.config.indicators.macd;
      a.canvas.layers.chart.context.fillStyle = cryptowatch.colors.theme.text.toString(), a.canvas.layers.chart.context.fillText("MACD(" + c.periods[0] + "," + c.periods[1] + "," + c.lag + ")", 10, a.canvas.fields.macd.range.top + 20), a._drawLine(function(b) {
        return {
          x: a.canvas.fields.macd.xSharp(b.Time) + a.config.halfCandleWidth(),
          y: a.canvas.fields.macd.ySharp(b.analysis.MACD.mainLine)
        }
      }, cryptowatch.colors.theme.indicators.ema[1].toString()), a._drawLine(function(b) {
        return {
          x: a.canvas.fields.macd.xSharp(b.Time) + a.config.halfCandleWidth(),
          y: a.canvas.fields.macd.ySharp(b.analysis.MACD.signalLine)
        }
      }, cryptowatch.colors.theme.text.toString())
    },
    _drawEMAs: function() {
      [cryptowatch.config.config.indicators.ema.periods[0], cryptowatch.config.config.indicators.ema.periods[1], cryptowatch.config.config.indicators.ema.periods[2], cryptowatch.config.config.indicators.ema.periods[3], cryptowatch.config.config.indicators.ema.periods[4]].forEach(function(b, c) {
        b && a._drawLine(function(c) {
          return {
            x: a.canvas.fields.price.xSharp(c.Time) + a.config.halfCandleWidth(),
            y: a.canvas.fields.price.ySharp(c.analysis.EMA[b])
          }
        }, cryptowatch.colors.theme.indicators.ema[c].toString())
      })
    },
    _drawIchimokuCloud: function() {
      var b = cryptowatch.periodInt * cryptowatch.config.config.indicators.ichimoku.kijunPeriod,
        c = a._candlesBetweenTimes(a._timeBounds.start - b * 10, a._timeBounds.end);
      a.canvas.layers.chart.drawLine(c, function(b) {
        return {
          x: a.canvas.fields.price.xSharp(b.Time) + a.config.halfCandleWidth() + a.config.fullCandleWidth() * cryptowatch.config.config.indicators.ichimoku.kijunPeriod,
          y: a.canvas.fields.price.ySharp(b.analysis.ichimoku.senkouSpanA)
        }
      }, cryptowatch.colors.theme.indicators.ichimoku.senkouSpanA.toString()), a.canvas.layers.chart.drawLine(c, function(b) {
        return {
          x: a.canvas.fields.price.xSharp(b.Time) + a.config.halfCandleWidth() + a.config.fullCandleWidth() * cryptowatch.config.config.indicators.ichimoku.kijunPeriod,
          y: a.canvas.fields.price.ySharp(b.analysis.ichimoku.senkouSpanB)
        }
      }, cryptowatch.colors.theme.indicators.ichimoku.senkouSpanB.toString());
      var d = 8,
        e = 4,
        f = {},
        g = [];
      c.forEach(function(b) {
        var c = Math.min(b.analysis.ichimoku.senkouSpanA, b.analysis.ichimoku.senkouSpanB),
          d = Math.max(b.analysis.ichimoku.senkouSpanA, b.analysis.ichimoku.senkouSpanB),
          h = a.canvas.fields.price.x(b.Time) + a.config.halfCandleWidth() + a.config.fullCandleWidth() * cryptowatch.config.config.indicators.ichimoku.kijunPeriod;
        if (h < 0) return;
        if (Math.floor(h) % e !== 0) return;
        c = a.canvas.fields.price.ySharp(c), d = a.canvas.fields.price.ySharp(d);
        var i = b.analysis.ichimoku.senkouSpanA > b.analysis.ichimoku.senkouSpanB,
          j = i ? cryptowatch.colors.theme.indicators.ichimoku.senkouSpanA.toString() : cryptowatch.colors.theme.indicators.ichimoku.senkouSpanB.toString();
        if (b.Time - f.time > cryptowatch.periodInt) {
          var k = f.top - c,
            l = f.bottom - d,
            m = (b.Time - f.time - cryptowatch.periodInt) / cryptowatch.periodInt,
            n = 0;
          for (var o = f.time + cryptowatch.periodInt; o < b.Time; o += cryptowatch.periodInt) {
            var p = f.top - k * n,
              q = f.bottom - l * n,
              r;
            p > q && i || q > p && !i ? r = cryptowatch.colors.theme.indicators.ichimoku.senkouSpanA.toString() : r = cryptowatch.colors.theme.indicators.ichimoku.senkouSpanB.toString(), g.push({
              time: o,
              top: p,
              bottom: q,
              color: r
            }), n += 1 / m
          }
        }
        a.canvas.layers.chart.drawLineSegment({
          x: h,
          y: d
        }, {
          x: h,
          y: c
        }, {
          color: j,
          alpha: .4
        }), f.x = h, f.time = b.Time, f.top = c, f.bottom = d
      }), g.forEach(function(b) {
        var c = a.canvas.fields.price.x(b.time) + a.config.halfCandleWidth() + a.config.fullCandleWidth() * cryptowatch.config.config.indicators.ichimoku.kijunPeriod;
        Math.floor(c) % e === 0 && a.canvas.layers.chart.drawLineSegment({
          x: c,
          y: b.bottom
        }, {
          x: c,
          y: b.top
        }, {
          color: b.color,
          alpha: .4
        })
      }), ["tenkanSen", "kijunSen", "chikouSpan"].forEach(function(b) {
        a._drawLine(function(c) {
          return {
            x: a.canvas.fields.price.xSharp(c.Time) + a.config.halfCandleWidth(),
            y: a.canvas.fields.price.ySharp(c.analysis.ichimoku[b])
          }
        }, cryptowatch.colors.theme.indicators.ichimoku[b].toString())
      })
    },
    _drawZigZag: function() {
      var b = a._analysis.zigzag[cryptowatch.config.config.indicators.zigzag.threshold],
        c = b[b.length - 1],
        d = a.candles[a.candles.length - 1];
      a.canvas.layers.chart.drawLine(b, function(b) {
        return {
          x: a.canvas.fields.price.x(b.time) + a.config.halfCandleWidth(),
          y: a.canvas.fields.price.y(b.price)
        }
      }, cryptowatch.colors.theme.text.toString())
    },
    _drawChandelierExit: function() {
      var b = a._visibleCandles[a._visibleCandles.length - 1],
        c = b.analysis.chandelierExit.long > b.Candle.High,
        d = cryptowatch.config.config.indicators.chandelierExit.periods,
        e = cryptowatch.config.config.indicators.chandelierExit.atrs;
      a.canvas.layers.chart.context.beginPath();
      for (var f = 0; f < a._visibleCandles.length; f++) {
        var g = a._visibleCandles[f],
          h = g.analysis.chandelierExit[d],
          i = g.analysis.ATR[d];
        if (h === undefined) continue;
        h.long = h.hi - e * i, h.short = h.lo + e * i;
        if (h === undefined) continue;
        a.canvas.layers.chart.context.strokeStyle = cryptowatch.colors.theme.indicators.channel.toString();
        var j = {
            x: a.canvas.fields.price.x(g.Time) + a.config.halfCandleWidth(),
            y: a.canvas.fields.price.ySharp(h.short)
          },
          k = {
            x: a.canvas.fields.price.x(g.Time) + a.config.halfCandleWidth(),
            y: a.canvas.fields.price.ySharp(h.long)
          };
        c ? h.long > g.Candle.Close ? a.canvas.layers.chart.context.lineTo(k.x, k.y) : (a.canvas.layers.chart.context.stroke(), a.canvas.layers.chart.context.closePath(), a.canvas.layers.chart.context.beginPath(), a.canvas.layers.chart.context.moveTo(j.x, j.y), c = !1) : h.short < g.Candle.Close ? a.canvas.layers.chart.context.lineTo(j.x, j.y) : (a.canvas.layers.chart.context.stroke(), a.canvas.layers.chart.context.closePath(), a.canvas.layers.chart.context.beginPath(), a.canvas.layers.chart.context.moveTo(k.x, k.y), c = !0)
      }
      a.canvas.layers.chart.context.stroke(), a.canvas.layers.chart.context.closePath()
    },
    _drawKeltnerChannel: function() {
      var b = cryptowatch.config.config.indicators.ema.periods[0],
        c = function(c) {
          return {
            x: a.canvas.fields.price.xSharp(c.Time) + a.config.halfCandleWidth(),
            y: a.canvas.fields.price.ySharp(c.analysis.EMA[b] + c.analysis.ATR[cryptowatch.config.config.indicators.keltnerChannel.atrPeriod] * cryptowatch.config.config.indicators.keltnerChannel.atrs)
          }
        },
        d = function(c) {
          return {
            x: a.canvas.fields.price.xSharp(c.Time) + a.config.halfCandleWidth(),
            y: a.canvas.fields.price.ySharp(c.analysis.EMA[b])
          }
        },
        e = function(c) {
          return {
            x: a.canvas.fields.price.xSharp(c.Time) + a.config.halfCandleWidth(),
            y: a.canvas.fields.price.ySharp(c.analysis.EMA[b] - c.analysis.ATR[cryptowatch.config.config.indicators.keltnerChannel.atrPeriod] * cryptowatch.config.config.indicators.keltnerChannel.atrs)
          }
        };
      a.canvas.layers.chart.drawDashedLine(a._visibleCandles, d, cryptowatch.colors.theme.indicators.channel.toString(), {
        evenOddOffset: a._visibleCandles[0].i
      }), a._drawLine(c, cryptowatch.colors.theme.indicators.channel.toString()), a._drawLine(e, cryptowatch.colors.theme.indicators.channel.toString())
    },
    _drawBollingerBands: function() {
      var b = cryptowatch.config.config.indicators.bollingerBands.period,
        c = cryptowatch.config.config.indicators.bollingerBands.stddevs;
      a.canvas.layers.chart.drawDashedLine(a._visibleCandles, function(c) {
        return {
          x: a.canvas.fields.price.xSharp(c.Time) + a.config.halfCandleWidth(),
          y: a.canvas.fields.price.ySharp(c.analysis.SMA[b])
        }
      }, cryptowatch.colors.theme.indicators.channel.toString(), {
        evenOddOffset: a._visibleCandles[0].i
      }), a.canvas.layers.chart.drawLine(a._visibleCandles, function(d) {
        return {
          x: a.canvas.fields.price.xSharp(d.Time) + a.config.halfCandleWidth(),
          y: a.canvas.fields.price.ySharp(d.analysis.SMA[b] + d.analysis.stdDeviation[b] * c)
        }
      }, cryptowatch.colors.theme.indicators.channel.toString()), a.canvas.layers.chart.drawLine(a._visibleCandles, function(d) {
        return {
          x: a.canvas.fields.price.xSharp(d.Time) + a.config.halfCandleWidth(),
          y: a.canvas.fields.price.ySharp(d.analysis.SMA[b] + d.analysis.stdDeviation[b] * -c)
        }
      }, cryptowatch.colors.theme.indicators.channel.toString())
    },
    _saveRefsToCrosshairInfo: function() {
      var b = a._crosshairInfoDOMElements;
      b.container = document.querySelector("#crosshair-info"), b.date = document.querySelector("#crosshair-info-date"), b.intervalInfo = document.querySelector("#crosshair-interval-info"), b.tradeInfo = document.querySelector("#crosshair-trade-info"), b.orderInfo = document.querySelector("#crosshair-order-info"), b.depthInfo = document.querySelector("#crosshair-depth-info"), b.open = document.querySelector("#crosshair-info-open strong"), b.close = document.querySelector("#crosshair-info-close strong"), b.high = document.querySelector("#crosshair-info-high strong"), b.low = document.querySelector("#crosshair-info-low strong"), b.volume = document.querySelector("#crosshair-info-volume strong"), b.change = document.querySelector("#crosshair-info-change strong"), b.changeSymbol = document.querySelector("#crosshair-info-change-symbol"), b.tradeType = document.querySelector("#crosshair-info-trade-type"), b.tradeAmount = document.querySelector("#crosshair-info-trade-amount strong"), b.tradePrice = document.querySelector("#crosshair-info-trade-price strong"), b.tradeTotal = document.querySelector("#crosshair-info-trade-total strong"), b.orderType = document.querySelector("#crosshair-info-order-type"), b.orderAmount = document.querySelector("#crosshair-info-order-amount strong"), b.orderPrice = document.querySelector("#crosshair-info-order-price strong"), b.orderTotal = document.querySelector("#crosshair-info-order-total strong"), b.depthBuyAmount = document.querySelector("#crosshair-info-depth-buy-amount strong"), b.depthBuyPriceChange = document.querySelector("#crosshair-info-depth-buy-price-change strong"), b.depthBuyPrice = document.querySelector("#crosshair-info-depth-buy-price strong"), b.depthBuyCost = document.querySelector("#crosshair-info-depth-buy-cost strong"), b.depthSellAmount = document.querySelector("#crosshair-info-depth-sell-amount strong"), b.depthSellPriceChange = document.querySelector("#crosshair-info-depth-sell-price-change strong"), b.depthSellPrice = document.querySelector("#crosshair-info-depth-sell-price strong"), b.depthSellCost = document.querySelector("#crosshair-info-depth-sell-cost strong"), b.createAlertInfo = document.querySelector("#crosshair-create-alert-info"), b.createAlertCondition = document.querySelector("#crosshair-info-create-alert-condition strong"), b.alertInfo = document.querySelector("#crosshair-alert-info"), b.alertCondition = document.querySelector("#crosshair-info-alert-condition strong")
    },
    _crosshairInfoDOMElements: {},
    hideCrosshairInfo: function() {
      a.hideCrosshairDate(), a.hideCrosshairIntervalInfo(), a.hideCrosshairTradeInfo(), a.hideCrosshairOrderInfo(), a.hideCrosshairDepthInfo(), a.hideCrosshairAlertInfo(), a.hideCrosshairCreateAlertInfo()
    },
    hideCrosshairDate: function() {
      a._crosshairInfoDOMElements.date.style.display = "none"
    },
    showCrosshairDate: function() {
      a._crosshairInfoDOMElements.date.style.display = "inline-block"
    },
    hideCrosshairIntervalInfo: function() {
      a._crosshairInfoDOMElements.intervalInfo.style.display = "none"
    },
    showCrosshairIntervalInfo: function() {
      a._crosshairInfoDOMElements.intervalInfo.style.display = "inline-block"
    },
    hideCrosshairTradeInfo: function() {
      a._crosshairInfoDOMElements.tradeInfo.style.display = "none"
    },
    showCrosshairTradeInfo: function() {
      a._crosshairInfoDOMElements.tradeInfo.style.display = "inline-block"
    },
    hideCrosshairOrderInfo: function() {
      a._crosshairInfoDOMElements.orderInfo.style.display = "none"
    },
    showCrosshairOrderInfo: function() {
      a._crosshairInfoDOMElements.orderInfo.style.display = "inline-block"
    },
    hideCrosshairDepthInfo: function() {
      a._crosshairInfoDOMElements.depthInfo.style.display = "none"
    },
    showCrosshairDepthInfo: function() {
      a._crosshairInfoDOMElements.depthInfo.style.display = "inline-block"
    },
    hideCrosshairAlertInfo: function() {
      a._crosshairInfoDOMElements.alertInfo.style.display = "none"
    },
    showCrosshairAlertInfo: function() {
      a._crosshairInfoDOMElements.alertInfo.style.display = "inline-block"
    },
    hideCrosshairCreateAlertInfo: function() {
      a._crosshairInfoDOMElements.createAlertInfo.style.display = "none"
    },
    showCrosshairCreateAlertInfo: function() {
      a._crosshairInfoDOMElements.createAlertInfo.style.display = "inline-block"
    },
    updateCursor: function() {
      if (!a.initialized) return;
      a.refresh.axes();
      var b = a._crosshairInfoDOMElements;
      if (a.tradeHovered) {
        var c = new Date(a.tradeHovered.Timestamp * 1e3);
        b.date.innerHTML = cryptowatch.utils.date.printYearMonthDateAndTimeWithSeconds(c), a.showCrosshairDate(), a.hideCrosshairDepthInfo(), a.hideCrosshairIntervalInfo(), a.hideCrosshairOrderInfo(), a.hideCrosshairCreateAlertInfo(), a.hideCrosshairAlertInfo(), a.showCrosshairTradeInfo(), b.tradeType.innerHTML = a.tradeHovered.Type === 0 ? "Sell" : "Buy", b.tradeType.setAttribute("side", a.tradeHovered.Type === 0 ? "sell" : "buy"), b.tradeAmount.innerHTML = cryptowatch.currency.fmt(a.tradeHovered.Amount, cryptowatch.currencyPair.base), b.tradePrice.innerHTML = cryptowatch.currency.fmt(a.tradeHovered.Price, cryptowatch.currencyPair.quote), b.tradeTotal.innerHTML = cryptowatch.currency.fmt(a.tradeHovered.Price * a.tradeHovered.Amount, cryptowatch.currencyPair.quote)
      } else if (a.orderHovered) {
        var c = new Date(a.orderHovered.Timestamp * 1e3);
        b.date.innerHTML = cryptowatch.utils.date.printYearMonthDateAndTimeWithSeconds(c), a.showCrosshairDate(), a.hideCrosshairIntervalInfo(), a.showCrosshairOrderInfo(), a.hideCrosshairTradeInfo(), a.hideCrosshairCreateAlertInfo(), a.hideCrosshairAlertInfo(), a.hideCrosshairDepthInfo(), b.orderType.innerHTML = a.orderHovered.Side === 0 ? "Ask" : "Bid", b.orderType.setAttribute("side", a.orderHovered.Side === 0 ? "sell" : "buy"), b.orderAmount.innerHTML = cryptowatch.currency.fmt(a.orderHovered.Amount, cryptowatch.currencyPair.base), b.orderPrice.innerHTML = cryptowatch.currency.fmt(a.orderHovered.Price, cryptowatch.currencyPair.quote), b.orderTotal.innerHTML = cryptowatch.currency.fmt(a.orderHovered.Price * a.orderHovered.Amount, cryptowatch.currencyPair.quote)
      } else if (cryptowatch.chart.alertHovered && !cryptowatch.nav.open.alerts) a.hideCrosshairDate(), a.hideCrosshairIntervalInfo(), a.hideCrosshairOrderInfo(), a.hideCrosshairTradeInfo(), a.hideCrosshairDepthInfo(), a.hideCrosshairCreateAlertInfo(), a.showCrosshairAlertInfo(), b.alertCondition.innerHTML = a.alertHovered.description() + " " + a.alertHovered.formattedY();
      else if (cryptowatch.alerts.pending) a.hideCrosshairDate(), a.hideCrosshairIntervalInfo(), a.hideCrosshairOrderInfo(), a.hideCrosshairTradeInfo(), a.hideCrosshairDepthInfo(), a.showCrosshairCreateAlertInfo(), a.hideCrosshairAlertInfo(), b.createAlertCondition.innerHTML = cryptowatch.alerts.pending.description() + " " + cryptowatch.alerts.pending.formattedY();
      else if (a._focused) {
        a.hideCrosshairOrderInfo(), a.hideCrosshairTradeInfo(), a.hideCrosshairDepthInfo(), a.hideCrosshairCreateAlertInfo(), a.hideCrosshairAlertInfo();
        var d = a.utils.roundDownTo(a.canvas.fields.price.x.invert(a.canvas.cursor.state.posn.x), cryptowatch.periodInt);
        a.selectedCandle = a._candleIndex[d];
        var c = new Date(parseInt(d, 10) * 1e3);
        b.date.innerHTML = cryptowatch.utils.date.printYearMonthDateAndTime(c), a.showCrosshairDate();
        if (a.tool !== "crosshair" || a.selectedCandle === undefined) a.hideCrosshairIntervalInfo();
        else {
          a.showCrosshairIntervalInfo();
          var e = a.selectedCandle.Candle,
            f = cryptowatch.currency.fmt;
          b.open.innerHTML = f(e.Open), b.high.innerHTML = f(e.High), b.low.innerHTML = f(e.Low), b.close.innerHTML = f(e.Close), b.volume.innerHTML = cryptowatch.currency.fmt(a.selectedCandle.Volume, cryptowatch.currencyPair.base, {
            label: !1
          });
          var g = ((e.Close - e.Open) / e.Open * 100).toFixed(3),
            h;
          g > 0 && (h = "+"), g < 0 && (h = "-"), g == 0 && (h = ""), b.changeSymbol.innerHTML = h, b.change.innerHTML = Math.abs(g) + "%"
        }
      }
      cryptowatch.drawing.pending && cryptowatch.drawing.refresh()
    },
    _drawCrosshair: function() {
      if (a.canvas.layers.chart.hoverareaState.hover && a.canvas.layers.chart.hoverareaState.hover.opts.disableCrosshair) return;
      if (a.tool === "crosshair") {
        var b, c;
        a.orderHovered ? b = a.canvas.fields.price.x(a.utils.roundUpTo(a.orderHovered.Timestamp, cryptowatch.periodInt)) : a.tradeHovered ? b = a._posnForTrade(a.tradeHovered).x - a.config.halfCandleWidth() : (b = a.canvas.fields.price.snapScreenX(a.canvas.cursor.state.posn.x), c = Math.floor(a.canvas.cursor.state.posn.y) + .5), a._crosshairVisible.y && c && c < a.canvas.layers.chart.height - a.config.xAxisHeight && a.canvas.layers.axes.drawLineSegment({
          x: 0,
          y: c
        }, {
          x: a.canvas.fields.price.range.right,
          y: c
        }, {
          color: cryptowatch.colors.theme.crosshair.toString()
        }), a._crosshairVisible.x && b && (cryptowatch.config.config.candleWidth > 1 && (a.canvas.layers.axes.context.globalAlpha = .5), a.canvas.layers.axes.drawRectangle({
          x: b,
          y: 0
        }, {
          x: b + cryptowatch.config.config.candleWidth,
          y: a._height() - a.config.xAxisHeight
        }, undefined, cryptowatch.colors.theme.crosshair.toString()), a.canvas.layers.axes.context.globalAlpha = 1)
      }
    },
    _valueInScaleDomain: function(a, b, c) {
      return c = c || 0, a <= Math.max.apply(Math, b.domain()) + c && a >= Math.min.apply(Math, b.domain()) - c
    },
    _valueInScaleRange: function(a, b, c) {
      return c = c || 0, a <= Math.max.apply(Math, b.range()) + c && a >= Math.min.apply(Math, b.range()) - c
    },
    _yAxisLeftBoundary: function() {
      return a._width() - a.config.yAxisWidth
    },
    _drawYAxisLabel: function(b, c, d) {
      a.canvas.layers.axes.context.fillStyle = d || cryptowatch.colors.theme.text.toString(), a.canvas.layers.axes.context.fillText(b, a._yAxisLeftBoundary() + 12, c + 4)
    },
    _drawYAxisTick: function(b, c) {
      var d = a._yAxisLeftBoundary();
      a.canvas.layers.axes.context.strokeStyle = c || cryptowatch.colors.theme.text.toString(), a.canvas.layers.axes.context.beginPath(), a.canvas.layers.axes.context.moveTo(d, b), a.canvas.layers.axes.context.lineTo(d + 6, b), a.canvas.layers.axes.context.stroke(), a.canvas.layers.axes.context.closePath()
    },
    _drawYAxisDashedLine: function(b, c) {
      a._drawDashedLine(a.canvas.layers.axes.context, a.canvas.fields.price.x(a._currentCandle().Time) + a.config.halfCandleWidth(), a.config.yAxisLeftBoundary(), b, c || cryptowatch.colors.theme.text.toString())
    },
    _drawOrdersOnYAxis: function(b) {
      var c = [];
      a.canvas.layers.chart.context.lineWidth = .8, b.forEach(function(b) {
        var d = a.orderHovered && a.orderHovered.Id === b.Id,
          e = {
            x: a.canvas.fields.yaxis.xSharp(3),
            y: a.canvas.fields.price.ySharp(b.Price)
          },
          f = b.Side == 0 ? cryptowatch.colors.theme.short.stroke.toString() : cryptowatch.colors.theme.long.stroke.toString();
        if (e.y > a.canvas.fields.price.unpaddedRange.bottom || e.y < a.canvas.fields.price.unpaddedRange.top) return;
        if (d && a.orderHovered.Timestamp <= a._timeBounds.end) {
          var g = a.canvas.fields.price.x(cryptowatch.chart.utils.roundUpTo(a.orderHovered.Timestamp, cryptowatch.periodInt)) + a.config.halfCandleWidth();
          a._drawDashedLine(a.canvas.layers.axes.context, g, a.canvas.fields.yaxis.x(0), e.y, a.orderHovered.Side == 1 ? cryptowatch.colors.theme.long.stroke.toString() : cryptowatch.colors.theme.short.stroke.toString().toString()), a.canvas.layers.axes.drawCircle({
            x: g,
            y: e.y
          }, 12, undefined, cryptowatch.colors.theme.background.toString()), a.canvas.layers.axes.drawCircle({
            x: g,
            y: e.y
          }, 10, cryptowatch.colors.theme.text.toString(), cryptowatch.colors.theme.background.toString()), a.canvas.layers.axes.drawCircle({
            x: g,
            y: e.y
          }, 4, f, cryptowatch.colors.theme.background.toString()), a.canvas.layers.axes.drawLineSegment({
            x: a.canvas.fields.yaxis.x(0),
            y: e.y
          }, {
            x: a.canvas.fields.yaxis.x(6),
            y: e.y
          }, {
            color: f
          })
        } else a.canvas.layers.axes.drawCircle(e, 3, f, cryptowatch.colors.theme.background.toString()); if (a._roomForYAxisTick(e.y) || d || a.tool !== "crosshair") {
          a._yAxisTicksDrawn.push(e.y);
          var h = a.orderHovered === b ? cryptowatch.colors.theme.textStrong.toString() : cryptowatch.colors.theme.text.toString();
          a.canvas.layers.axes.drawText({
            x: a.canvas.fields.yaxis.x(12),
            y: e.y
          }, cryptowatch.currency.fmt(b.Price, undefined, {
            label: !1
          }), h)
        }
        c.push(e.y), a.canvas.layers.axes.registerHoverarea(new Hoverarea("order:" + b.Id, {
          type: "rect",
          left: a.canvas.fields.yaxis.x(0),
          top: e.y - 10,
          right: e.x + a.config.yAxisWidth,
          bottom: e.y + 10,
          radius: 9
        }, {
          cursor: "pointer",
          compatibleTools: ["crosshair"],
          callbacks: {
            hover: function() {
              a.orderHovered = b, cryptowatch.chart.refresh.axes(), cryptowatch.depth.refresh()
            },
            leave: function() {
              a.hideCrosshairInfo(), delete a.orderHovered, cryptowatch.chart.refresh.axes(), cryptowatch.depth.refresh()
            }
          }
        }))
      }), a.canvas.layers.chart.context.lineWidth = 1
    },
    _drawAlertDash: function(b, c) {
      a.canvas.layers.axes.drawDashedHorizontalLineSegment(0, a.canvas.fields.yaxis.x(0), b, cryptowatch.colors.theme.alert.toString(), {
        alpha: c
      })
    },
    _drawAlerts: function() {
      cryptowatch.alerts.alerts.forEach(function(b) {
        var c = a.alertHovered === b,
          d = b.triggered && cryptowatch.alerts.flashState;
        a.canvas.layers.axes.drawTriangle({
          x: cryptowatch.utils.sharpen(a.canvas.fields.yaxis.range.left),
          y: cryptowatch.utils.sharpen(b.y())
        }, cryptowatch.colors.theme.alert.toString(), "left");
        if (c || a._roomForYAxisTick(b.y())) a.canvas.layers.axes.drawText({
          x: a.canvas.fields.yaxis.x(12),
          y: b.y()
        }, b.formattedY(), c ? cryptowatch.colors.theme.textStrong.toString() : cryptowatch.colors.theme.text.toString()), a._yAxisTicksDrawn.push(b.y());
        (c || d) && a._drawAlertDash(b.y(), .5);
        if (d) {
          var e = a.canvas.fields.price.x(a.utils.roundUpTo(b.triggeredTime, cryptowatch.periodInt)) + a.config.halfCandleWidth();
          a.canvas.layers.axes.drawCircle({
            x: e,
            y: b.y()
          }, Math.round(a.config.halfCandleWidth() + 4), cryptowatch.colors.theme.alert.toString())
        }
        a.canvas.layers.axes.registerHoverarea(new Hoverarea("alert:" + b.field + ":" + b.threshold, {
          type: "rect",
          left: a.canvas.fields.yaxis.range.left,
          top: b.y() - 14,
          bottom: b.y() + 14,
          right: a.canvas.fields.yaxis.range.right
        }, {
          cursor: "pointer",
          callbacks: {
            hover: function() {
              a.alertHovered = b
            },
            leave: function() {
              delete a.alertHovered
            },
            click: function() {
              delete a.alertHovered, b.destroy(), a.canvas.scanHoverareas()
            }
          }
        }))
      })
    },
    _tzoffset: undefined,
    _getTimeSpan: function() {
      return cryptowatch.periodInt * a._candleCapacity()
    },
    _formatXAxisTime: function(a, b) {
      var c = new Date(a * 1e3),
        d = c.getHours(),
        e = c.getMinutes();
      switch (b) {
        case 300:
        case 900:
        case 1800:
        case 3600:
        case 21600:
        case 43200:
          return d === 0 && e === 0 ? cryptowatch.utils.date.printMonthAndDate(c) : c.getHours() + ":" + cryptowatch.utils._doubleDigits(c.getMinutes());
        default:
          return cryptowatch.utils.date.printMonthAndDate(c)
      }
    },
    _setupYAxisHoverarea: function() {
      var b = a.canvas.fields.yaxis.hoverarea;
      b.opts.callbacks.click = function(b) {
        var c = cryptowatch.alerts.savePending();
        a.alertHovered = c, a.refresh.axes(), a.updateCursor(), a.canvas.scanHoverareas()
      }, b.opts.callbacks.leave = function() {
        delete cryptowatch.alerts.pending
      }, a.canvas.layers.axes.registerHoverarea(b)
    },
    _drawXAxis: function() {
      var b = a._xAxisTicks.size,
        c = a._getTimeSpan();
      a.canvas.layers.axes.context.fillStyle = cryptowatch.colors.theme.text.toString(), a.canvas.layers.axes.context.strokeStyle = cryptowatch.colors.theme.guide.toString(), a.canvas.layers.axes.context.textAlign = "center";
      var d = new Date(a._xAxisTicks.start * 1e3);
      if (a._crosshairVisible.x && a.tool === "crosshair") {
        var e, f = 0,
          g = -10,
          h;
        a.tradeHovered ? (e = a.utils.roundUpTo(a.tradeHovered.Timestamp, cryptowatch.periodInt), h = a.tradeHovered.Timestamp) : a.orderHovered ? (e = a.utils.roundUpTo(a.orderHovered.Timestamp, cryptowatch.periodInt), h = a.orderHovered.Timestamp) : (e = a.utils.roundDownTo(a.canvas.fields.price.x.invert(a.canvas.cursor.state.posn.x), cryptowatch.periodInt), h = e);
        if (e) {
          var i, j = new Date(h * 1e3),
            k = new Date(e * 1e3);
          g = a.canvas.fields.price.x(e) + a.config.halfCandleWidth(), f = 40, b >= 86400 ? cryptowatch.periodInt >= 86400 ? i = cryptowatch.utils.date.printMonthAndDate(j) : (i = cryptowatch.utils.date.printMonthDateAndTime(j), f = 70) : i = cryptowatch.utils.date.printTime(j);
          if (!a.canvas.layers.chart.hoverareaState.hover || !a.canvas.layers.chart.hoverareaState.hover.opts.disableCrosshair) a.canvas.layers.axes.context.fillText(i, g, a._height() - 10), a.canvas.layers.axes.context.beginPath(), a.canvas.layers.axes.context.moveTo(g, a.canvas.layers.axes.height), a.canvas.layers.axes.context.lineTo(g, a.canvas.layers.axes.height - 3), a.canvas.layers.axes.context.closePath(), a.canvas.layers.axes.context.stroke()
        }
      }
      if (a._visibleCandles.length > 0)
        for (var l = a._xAxisTicks.start; l < a._xAxisTicks.end; l += cryptowatch.periodInt) {
          var m = new Date(l * 1e3),
            n = undefined,
            o;
          if (m.valueOf() - d.valueOf() >= b * 1e3)
            if (m.getDate() !== d.getDate()) {
              n = cryptowatch.utils.date.printMonthAndDate(m);
              var p = a.utils.roundUpTo(l, cryptowatch.periodInt),
                q = a.utils.roundDownTo(l, cryptowatch.periodInt),
                o;
              (new Date(q * 1e3)).getDate() !== m.getDate() ? o = p : o = q
            } else n = cryptowatch.utils.date.printTime(m), o = l;
          if (n) {
            var r = a.canvas.fields.price.x(o) + a.config.halfCandleWidth();
            (!a._crosshairEnabled() || a.tool !== "crosshair" || !a._crosshairVisible.x || Math.abs(r - g) > f) && a.canvas.layers.axes.context.fillText(n, r, a._height() - 10), a.canvas.layers.axes.context.beginPath(), a.canvas.layers.axes.context.moveTo(r, a._height()), a.canvas.layers.axes.context.lineTo(r, a._height() - 3), a.canvas.layers.axes.context.closePath(), a.canvas.layers.axes.context.stroke(), d = m
          }
        }
      a.canvas.layers.axes.context.textAlign = "start"
    },
    highlightingPrice: undefined,
    tradeHovered: undefined,
    _drawYAxisForFieldManually: function(b, c, d) {
      d = d || {};
      var e = a._yAxisTicksDrawn;
      a: for (var f = 0; f < c.length; f++) {
        var g = c[f],
          h = g.field || b,
          i = h.ySharp(g.y);
        if (i < h.unpaddedRange.top || i > h.unpaddedRange.bottom) continue;
        a._drawYAxisTick(i, g.color), g.dashedLine && a._currentCandleVisible() && a._drawYAxisDashedLine(i, g.color);
        for (var j = 0; j < e.length; j++)
          if (Math.abs(i - e[j]) < 14) continue a;
        var k = g.y;
        d.formatter && (k = d.formatter(k)), a._drawYAxisLabel(k, i), e.push(i)
      }
    },
    _drawYAxisForFieldAutomatically: function(b, c) {
      c = c || {};
      var d = b.domain.bottom,
        e = b.domain.top,
        f = b.tickSize(c.spacing || 50),
        g = a.utils.roundTo(d, f),
        h = a.utils.roundUpTo(e, f),
        i = a.config.yAxisLeftBoundary(),
        j = c.extraTicks || [];
      for (var k = g; k <= h; k += f) j.push({
        y: k
      });
      a._drawYAxisForFieldManually(b, j, c)
    },
    _roomForYAxisTick: function(b) {
      for (var c = 0; c < a._yAxisTicksDrawn.length; c++) {
        var d = a._yAxisTicksDrawn[c];
        if (Math.abs(d - b) < 14) return !1
      }
      return !0
    },
    _drawYAxis: function() {
      var b = a.config.yAxisLeftBoundary();
      a._yAxisTicksDrawn = [], a.canvas.layers.axes.context.fillStyle = cryptowatch.colors.theme.background.toString(), a.canvas.layers.axes.context.fillRect(b, a._height() - a.config.xAxisHeight + 1, a.config.yAxisWidth, a.config.xAxisHeight), a._drawVerticalLine(a.canvas.layers.axes.context, b - .5, cryptowatch.colors.theme.guide.toString()), a.canvas.layers.axes.context.fillStyle = cryptowatch.colors.theme.text.toString(), cryptowatch.config.bottomIndicators.forEach(function(b) {
        a._clearIndicatorMargin(b)
      });
      var c = a._currentCandle(),
        d = cryptowatch.currency.convert(c.Candle.Close, cryptowatch.currencyPair.quote, cryptowatch.currency.fiatPreference),
        e = c.Candle.Close < c.Candle.Open;
      a.currentPriceOnAxis = a.canvas.fields.priceConverted.ySharp(d);
      if (a._visibleCandles.length > 0 && !a.orderHovered && !a.tradeHovered && a.tool === "crosshair" && a._crosshairEnabled() && a.canvas.cursor.state.activeField && a.canvas.cursor.state.posn.y < a.canvas.layers.chart.height - a.config.xAxisHeight) {
        var f = a.canvas.cursor.state.posn.y,
          g, h, i;
        a.canvas.cursor.state.activeFieldY.name === "price" ? (i = a.canvas.fields.priceConverted, h = i.y.invert(a.canvas.cursor.state.posn.y), h = cryptowatch.currency.fmt(h, a._priceAxisCurrency, {
          label: !1
        }), g = a.canvas.fields.price.y.invert(f)) : (i = a.canvas.cursor.state.activeFieldY, h = i.y.invert(a.canvas.cursor.state.posn.y), g = a.canvas.cursor.state.activeFieldY.y.invert(f));
        var j;
        a.canvas.cursor.state.activeFieldY.name === "price" ? j = cryptowatch.currency.fmt(a.canvas.fields.price.y.invert(f), undefined, {
          label: !1
        }) : j = a.canvas.cursor.state.activeFieldY.y.invert(f);
        if (a.canvas.cursor.state.activeFieldX.name === "yaxis" && Alert.supportedFields.indexOf(a.canvas.cursor.state.activeFieldY.name) > -1) {
          if (a.alertHovered === undefined) {
            var k = cryptowatch.utils.sharpen(a.canvas.fields.yaxis.x(0)),
              l = cryptowatch.utils.sharpen(a.canvas.cursor.state.posn.y);
            a.canvas.layers.axes.drawTriangle({
              x: k,
              y: l
            }, cryptowatch.colors.theme.alert.toString(), "left"), a._drawAlertDash(a.canvas.cursor.state.posn.y, .3), cryptowatch.alerts.pending = new Alert(a.canvas.cursor.state.activeFieldY.name, parseFloat(g)), a._drawYAxisLabel(j, a.canvas.cursor.state.posn.y, cryptowatch.colors.theme.textStrong.toString()), a._yAxisTicksDrawn.push(a.canvas.cursor.state.posn.y)
          }
        } else a._crosshairVisible.y && (a._drawYAxisTick(a.canvas.cursor.state.posn.y + .5), a._drawYAxisLabel(j, a.canvas.cursor.state.posn.y, cryptowatch.colors.theme.textStrong.toString()), a._yAxisTicksDrawn.push(a.canvas.cursor.state.posn.y))
      }
      a._drawAlerts(), cryptowatch.account.orders && cryptowatch.config.config.showOrders && a._drawOrdersOnYAxis(cryptowatch.account.orders);
      if (cryptowatch.config.shouldDraw.volume()) {
        var m = a.canvas.fields.volume.ySharp(c.Volume);
        a._drawYAxisForFieldAutomatically(a.canvas.fields.volume, {
          spacing: 25,
          extraTicks: [{
            y: c.Volume,
            dashedLine: !0,
            color: e ? cryptowatch.colors.theme.short.stroke.toString().toString() : cryptowatch.colors.theme.long.stroke.toString()
          }]
        })
      }
      cryptowatch.config.shouldDraw.rsi() && cryptowatch.config.shouldDraw.rsi() && a._drawYAxisForFieldManually(a.canvas.fields.rsi, [{
        y: c.analysis.rsi,
        dashedLine: !0,
        color: cryptowatch.colors.theme.text.toString()
      }, {
        y: 35
      }, {
        y: 65
      }]);
      if (cryptowatch.config.shouldDraw.obv()) {
        var n = c.analysis.OBVMA[cryptowatch.config.config.indicators.obv.maPeriods];
        a._drawYAxisForFieldAutomatically(a.canvas.fields.obv, {
          spacing: 25,
          extraTicks: [{
            y: c.analysis.OBV,
            dashedLine: !0
          }, {
            y: n,
            dashedLine: !0,
            color: cryptowatch.colors.theme.indicators.ema[2].toString()
          }]
        })
      }
      if (cryptowatch.config.shouldDraw.macd()) {
        var o = c.analysis.MACD.mainLine - c.analysis.MACD.signalLine,
          p = a.canvas.fields.macdHistogram.ySharp(0) - a.canvas.fields.macdHistogram.ySharp(o);
        a._drawYAxisForFieldAutomatically(a.canvas.fields.macd, {
          spacing: 25,
          extraTicks: [{
            y: c.analysis.MACD.mainLine,
            dashedLine: !0,
            color: cryptowatch.colors.theme.indicators.ema[1].toString().toString()
          }, {
            y: c.analysis.MACD.signalLine,
            dashedLine: !0,
            color: cryptowatch.colors.theme.text.toString()
          }, {
            y: o,
            field: a.canvas.fields.macdHistogram,
            dashedLine: !0,
            color: o > 0 ? cryptowatch.colors.theme.long.stroke.toString() : cryptowatch.colors.theme.short.stroke.toString()
          }]
        })
      }
      cryptowatch.config.shouldDraw.aroon() && a._drawYAxisForFieldManually(a.canvas.fields.aroon, [{
        y: c.analysis.aroon.up,
        dashedLine: !0,
        color: cryptowatch.colors.theme.long.stroke.toString()
      }, {
        y: c.analysis.aroon.down,
        dashedLine: !0,
        color: cryptowatch.colors.theme.short.stroke.toString().toString()
      }, {
        y: 30
      }, {
        y: 50
      }, {
        y: 70
      }]);
      if (a.tradeHovered) {
        var q = a.canvas.fields.price.ySharp(a.tradeHovered.Price);
        a.canvas.layers.axes.context.fillStyle = cryptowatch.colors.theme.text.toString(), a.canvas.layers.axes.context.fillText(cryptowatch.currency.fmt(a.tradeHovered.Price, undefined, {
          label: !1
        }), a.config.yAxisLeftBoundary() + 12, q + 4), a.canvas.layers.axes.context.fillStyle = [cryptowatch.colors.theme.short.stroke.toString().toString(), cryptowatch.colors.theme.long.stroke.toString()][a.tradeHovered.Type];
        var r = [cryptowatch.colors.theme.short.stroke.toString().toString(), cryptowatch.colors.theme.long.stroke.toString()][a.tradeHovered.Type];
        a.canvas.layers.axes.drawLineSegment({
          x: a.canvas.fields.yaxis.x(0),
          y: q
        }, {
          x: a.canvas.fields.yaxis.x(6),
          y: q
        }, {
          color: r
        }), a._yAxisTicksDrawn.push(q), a._drawDashedLine(a.canvas.layers.axes.context, a.canvas.fields.price.x(a.tradeHovered.Timestamp) + a.config.fullCandleWidth(), b, a.canvas.fields.price.ySharp(a.tradeHovered.Price), a.tradeHovered.Type == 1 ? cryptowatch.colors.theme.long.stroke.toString() : cryptowatch.colors.theme.short.stroke.toString().toString())
      }
      if (a.canvas.fields.price.includes.domain.y(c.Candle.Close)) {
        a.canvas.layers.axes.context.fillStyle = cryptowatch.colors.theme.text.toString(), (a.tool !== "crosshair" || a._roomForYAxisTick(a.currentPriceOnAxis)) && a.canvas.layers.axes.context.fillText(cryptowatch.currency.fmt(d, a._priceAxisCurrency, {
          label: !1
        }), a.config.yAxisLeftBoundary() + 12, a.currentPriceOnAxis + 4);
        var r = e ? cryptowatch.colors.theme.short.stroke.toString().toString() : cryptowatch.colors.theme.long.stroke.toString();
        a._currentCandleVisible() && cryptowatch.config.config.chartStyle !== "heikenAshi" && a._drawDashedLine(a.canvas.layers.axes.context, a.canvas.fields.price.x(c.Time) + a.config.fullCandleWidth(), b, a.currentPriceOnAxis, r), a._yAxisTicksDrawn.push(a.currentPriceOnAxis), a.canvas.layers.axes.drawLineSegment({
          x: a.canvas.fields.yaxis.x(0),
          y: a.currentPriceOnAxis
        }, {
          x: a.canvas.fields.yaxis.x(6),
          y: a.currentPriceOnAxis
        }, {
          color: r
        })
      }
      a._drawYAxisForFieldAutomatically(a.canvas.fields.priceConverted, {
        spacing: 50,
        ticksDrawn: a._yAxisTicksDrawn,
        formatter: function(a) {
          return cryptowatch.currency.fmt(a, cryptowatch.currency.fiatPreference, {
            label: !1,
            stripTrailingZeros: !0
          })
        }
      })
    },
    _drawHorizontalLine: function(b, c, d) {
      c = Math.floor(c) + .5, b.strokeStyle = d, b.beginPath(), b.moveTo(0, c), b.lineTo(a.canvas.layers.chart.width, c), b.stroke(), b.closePath()
    },
    _drawVerticalLine: function(b, c, d) {
      b.strokeStyle = d, b.beginPath(), b.moveTo(c, 0), b.lineTo(c, a._height()), b.stroke(), b.closePath()
    },
    _drawLine: function(b, c) {
      a.canvas.layers.chart.context.strokeStyle = c, a.canvas.layers.chart.context.beginPath(), a._visibleCandles.forEach(function(c, d) {
        var e = b(c, d);
        a.canvas.layers.chart.context[d == 0 ? "moveTo" : "lineTo"](e.x, e.y)
      }), a.canvas.layers.chart.context.stroke(), a.canvas.layers.chart.context.closePath()
    },
    _fillArea: function(b, c, d, e, f, g, h) {
      e && (a.canvas.layers.chart.context.fillStyle = e), a.canvas.layers.chart.context.beginPath(), b.forEach(function(b, d) {
        var e = c(b, d);
        d === 0 ? a.canvas.layers.chart.context.moveTo(e.x, e.y) : a.canvas.layers.chart.context.lineTo(e.x, e.y)
      }), b.slice(0).reverse().forEach(function(b, c) {
        var e = d(b, c);
        a.canvas.layers.chart.context.lineTo(e.x, e.y)
      }), a.canvas.layers.chart.context.closePath(), h && (a.canvas.layers.chart.context.globalAlpha = h), a.canvas.layers.chart.context.fill(), a.canvas.layers.chart.context.globalAlpha = 1, f && (a.canvas.layers.chart.context.beginPath(), a.canvas.layers.chart.context.strokeStyle = f, b.forEach(function(b, d) {
        var e = c(b, d);
        d === 0 ? a.canvas.layers.chart.context.moveTo(e.x, e.y) : a.canvas.layers.chart.context.lineTo(e.x, e.y)
      }), a.canvas.layers.chart.context.stroke()), g && (a.canvas.layers.chart.context.beginPath(), a.canvas.layers.chart.context.strokeStyle = g, b.slice(0).reverse().forEach(function(b, c) {
        var e = d(b, c);
        c === 0 ? a.canvas.layers.chart.context.moveTo(e.x, e.y) : a.canvas.layers.chart.context.lineTo(e.x, e.y)
      }), a.canvas.layers.chart.context.stroke()), (f || g) && a.canvas.layers.chart.context.stroke()
    },
    _drawDashedLine: function(b, c, d, e, f) {
      var g = Math.min(a.utils.roundTo(c, 4), a.utils.roundTo(d, 4)),
        h = Math.max(a.utils.roundTo(c, 4), a.utils.roundTo(d, 4));
      b.globalAlpha = .5, b.strokeStyle = f;
      for (var i = g; i <= h; i += 4) b.beginPath(), b.moveTo(i, e), b.lineTo(i + 2, e), b.stroke(), b.closePath();
      b.globalAlpha = 1
    },
    calculateDepthScales: function(b) {
      a._yAxisDepthScaleY = d3.scale.linear().domain([0, b]).range([a.canvas.fields.yaxis.range.left, a.canvas.fields.yaxis.range.right])
    },
    depthStairstepLine: function(b) {
      var c = [],
        d = 0;
      return b.forEach(function(b) {
        var e = cryptowatch.depth.accumulatedValues[b.Price];
        c.push({
          x: Math.floor(a._yAxisDepthScaleY(d)) + .5,
          y: Math.floor(a.canvas.fields.price.y(b.Price)) + .5
        }), c.push({
          x: Math.floor(a._yAxisDepthScaleY(e)) + .5,
          y: Math.floor(a.canvas.fields.price.y(b.Price)) + .5
        }), d = e
      }), c
    },
    drawDepthMirror: function() {
      if (!cryptowatch.depth || !cryptowatch.depth.ordersToDraw) return;
      var b = Math.max(cryptowatch.depth.accumulatedValues[cryptowatch.depth.ordersToDraw.Bids[cryptowatch.depth.ordersToDraw.Bids.length - 1].Price], cryptowatch.depth.accumulatedValues[cryptowatch.depth.ordersToDraw.Asks[cryptowatch.depth.ordersToDraw.Asks.length - 1].Price]);
      a.canvas.layers.depth.clear(), cryptowatch.config.shouldDraw.yAxisDepth() && cryptowatch.periodInt <= 3600 && a.canvas.fields.yaxis.withClipMask(a.canvas.layers.depth, function() {
        a.calculateDepthScales(b), a.drawYAxisDepthLine(a.depthStairstepLine(cryptowatch.depth.accumSlice(cryptowatch.depth.orders.Asks, b)), cryptowatch.colors.theme.short.stroke.toString()), a.drawYAxisDepthLine(a.depthStairstepLine(cryptowatch.depth.accumSlice(cryptowatch.depth.orders.Bids, b)), cryptowatch.colors.theme.long.stroke.toString())
      }), a.canvas.layers.depth.context.clearRect(0, a.canvas.fields.price.unpaddedRange.bottom, a.canvas.layers.chart.width, a.canvas.layers.chart.height)
    },
    drawYAxisDepthLine: function(b, c) {
      a.canvas.layers.depth.drawLine(b, function(a) {
        return a
      }, c, {
        alpha: .8
      })
    },
    handleIntervalUpdate: function(b, c) {
      c === cryptowatch.periodInt && (a._indexCandles([b]), a._setupCandles([b]), a._analyzeCandles([b]), a._viewportChange(), a.refresh.all(), a.updateCursor(), cryptowatch.alerts.scan())
    },
    _crosshairVisible: {
      x: !1,
      y: !1
    },
    _crosshairEnabled: function() {
      return !a.canvas.layers.chart.hoverareaState.hover || !a.canvas.layers.chart.hoverareaState.hover.opts.disableCrosshair
    },
    hideCrosshair: function() {
      a._crosshairVisible.x = !1, a._crosshairVisible.y = !1, a.refresh.axes()
    },
    showCrosshair: function() {
      a._crosshairVisible.x = !0, a._crosshairVisible.y = !0
    },
    utils: {
      roundTo: function(a, b) {
        var c = a % b;
        return c <= Math.floor(b / 2) ? a - c : a + (b - c)
      },
      roundDownTo: function(a, b) {
        var c = a % b;
        return a - c
      },
      roundUpTo: function(a, b) {
        var c = a % b;
        return a + (b - c)
      }
    },
    _minPosition: function() {
      return Math.round(-(a._widthForIntervals() - 100) / a.config.fullCandleWidth())
    },
    _maxPosition: function() {
      return Math.round(a.candles.length - a._candleCapacity())
    },
    jumpToTrade: function(b) {
      var c = a.utils.roundUpTo(b.Timestamp, cryptowatch.periodInt);
      if (c < a.candles[0].Time || c > a.candles[a.candles.length - 1].Time) console.warn("out of range");
      else {
        var d = (a._currentCandle().Time - c) / cryptowatch.periodInt;
        a.setPosition(d - a._candleCapacity() / 2)
      }
    },
    setPosition: function(b) {
      b = Math.round(b), a.POSITION = b, a._clipPosition(), a._viewportChange(), cryptowatch.utils.nextFrame(a.refresh.all)
    },
    cachePosition: function() {
      sessionStorage.setItem("chart:position", a.POSITION)
    },
    nudge: function(b) {
      a.setPosition(a.POSITION + b)
    },
    _clipPosition: function() {
      a.POSITION = Math.max(a._minPosition(), a.POSITION), a.POSITION = Math.min(a._maxPosition(), a.POSITION)
    },
    tool: null,
    selectTool: function(b) {
      if (a.tool === b) return;
      a.tool = b, $("[data-tool]").removeClass("selected"), $('[data-tool="' + b + '"]').addClass("selected"), delete cryptowatch.drawing.pending, cryptowatch.drawing.refresh(), localStorage.setItem("tool", b), a.canvas.setCursorType("crosshair"), a.refresh.axes()
    }
  };
  $("#request-fullscreen").on("click", function(a) {
    var b = document.querySelector("body");
    b.requestFullscreen ? b.requestFullscreen() : b.msRequestFullscreen ? b.msRequestFullscreen() : b.mozRequestFullScreen ? b.mozRequestFullScreen() : b.webkitRequestFullscreen && b.webkitRequestFullscreen()
  }), $("#exit-fullscreen").on("click", function(a) {
    document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen()
  }), $(document).on("webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange", function() {
    $(window).trigger("resize")
  }), cryptowatch.utils.onScroll("#price-chart-container", {
    up: function() {
      cryptowatch.config.config.mouse.scrollY && a.decreaseCandleWidth()
    },
    down: function() {
      cryptowatch.config.config.mouse.scrollY && a.increaseCandleWidth()
    },
    horizontal: function(b) {
      cryptowatch.config.config.mouse.scrollX && a.nudge(b / a.config.fullCandleWidth())
    }
  })
}(),
function() {
  var a = 0;
  window.Alert = function(a, b) {
    this.field = a, this.threshold = b, this.options = {
      notification: !0,
      noise: !0
    };
    switch (a) {
      case "price":
        var c = this.getCurrentValue();
        c < b ? this.side = "above" : this.side = "below"
    }
  }, Alert.fromJSON = function(a) {
    var b = new Alert(a.field, a.threshold);
    return b.options = a.options, b.side = a.side, b.id = a.id, b
  }, Alert.supportedFields = ["price", "volume"], Alert.prototype = {
    description: function() {
      switch (this.field) {
        case "price":
          return "price reaches";
        case "volume":
          return "volume exceeds"
      }
    },
    declaration: function() {
      switch (this.field) {
        case "price":
          return "Price has reached";
        case "volume":
          return "Volume has exceeded"
      }
    },
    getCurrentValue: function() {
      var a = cryptowatch.chart._currentCandle();
      switch (this.field) {
        case "price":
          return a.Candle.Close;
        case "volume":
          return a.Volume
      }
    },
    y: function() {
      return cryptowatch.chart.canvas.fields[this.field].y(this.threshold)
    },
    formattedY: function() {
      switch (this.field) {
        case "price":
          return cryptowatch.currency.fmt(this.threshold, undefined, {
            label: !1
          });
        case "volume":
          return cryptowatch.utils.amountToString(this.threshold);
        default:
          return this.threshold
      }
    },
    conditionMet: function() {
      if (this.side === undefined) return this.getCurrentValue() > this.threshold;
      switch (this.side) {
        case "above":
          return this.getCurrentValue() > this.threshold;
        case "below":
          return this.getCurrentValue() < this.threshold
      }
    },
    trigger: function() {
      this.triggered = !0, this.triggeredTime = Math.floor((new Date).valueOf() / 1e3), this.options.noise && (cryptowatch.alerts.startBeeping(), cryptowatch.nav.dropdowns.alerts.open()), this.options.notification && cryptowatch.chart._blurred && window.Notification && (this.notif = new Notification(this.declaration() + " " + this.formattedY(), {
        body: cryptowatch.exchange.name + " " + cryptowatch.currencyPair.name,
        icon: "/assets/images/cryptowatch.png"
      }), this.notif.onclick = function() {
        window.focus()
      }, this.notif.onclose = function() {
        this.destroy()
      }.bind(this)), ga("send", "event", "alerts", "trigger"), $("#alerts__scroll-screen").scrollTo($('[data-alert-id="' + this.id + '"]'))
    },
    destroy: function() {
      b.deleteAlert(this.id), b.scan(), this.notif !== undefined && this.notif.close(), cryptowatch.chart.refresh.axes(), cryptowatch.chart.updateCursor()
    }
  };
  var b = cryptowatch.alerts = {
    initialize: function() {
      b.notificationsAllowed = window.Notification && Notification.permission === "granted", b.interface = React.render(cryptowatch.components.Alerts({
        alerts: b.alerts
      }), document.getElementById("alerts"));
      var a = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext;
      a !== undefined ? (b.audioSupported = !0, b.audioContext = new a, b.oscillator = b.audioContext.createOscillator(), b.oscillator.type = "sine", b.oscillator.start = b.oscillator.start || b.oscillator.noteOn, b.oscillator.stop = b.oscillator.stop || b.oscillator.noteOff, b.amp = b.audioContext.createGain(), b.amp.gain.value = 0, b.oscillator.connect(b.amp), b.amp.connect(b.audioContext.destination), b.oscillator.start(0)) : b.audioSupported = !1, b.interface.setProps({
        notificationsAllowed: b.notificationsAllowed,
        audioSupported: b.audioSupported
      })
    },
    alerts: [],
    redrawInterface: function() {
      b.interface.forceUpdate()
    },
    triggeredAlerts: function() {
      return b.alerts.filter(function(a) {
        return a.triggered
      })
    },
    key: function() {
      return ["alerts", cryptowatch.exchange.slug, cryptowatch.pair].join(":")
    },
    cache: function() {
      sessionStorage.setItem(b.key(), JSON.stringify(b.alerts.filter(function(a) {
        return !a.triggered
      })))
    },
    load: function() {
      var c = sessionStorage.getItem(b.key());
      c && (c = JSON.parse(c).map(function(a) {
        return Alert.fromJSON(a)
      }), c = c.filter(function(a) {
        return !a.conditionMet()
      }), b.alerts = c, c.length > 0 && (a = c[c.length - 1].id + 1), b.interface.setProps({
        alerts: b.alerts
      }))
    },
    savePending: function() {
      if (b.pending === undefined) return;
      return b.pending.id = a, a++, b.pending && b.alerts.push(b.pending), b.ensureNotificationPermissions(), b.interface.setProps({
        alerts: b.alerts
      }), delete b.pending, b.cache(), b.alerts[b.alerts.length - 1]
    },
    deleteAlert: function(a) {
      b.alerts = b.alerts.filter(function(b) {
        return b.id !== a
      }), b.interface.setProps({
        alerts: b.alerts
      }), b.cache()
    },
    scan: function() {
      b.alerts.forEach(function(a) {
        var b = a.conditionMet();
        !a.triggered && b && a.trigger()
      }), b.interface.setProps({
        alerts: b.alerts
      }), b.triggeredAlerts().length === 0 && b.stopBeeping(), b.cache()
    },
    ensureNotificationPermissions: function() {
      if (!window.Notification) return;
      Notification.permission !== "granted" && Notification.requestPermission(this._onPermissionResponse)
    },
    _onPermissionResponse: function(a) {
      b.notificationsAllowed = a === "granted", b.interface.setProps({
        notificationsAllowed: b.notificationsAllowed
      })
    },
    startBeeping: function() {
      if (b.beepInterval !== undefined) return;
      b.beepInterval = setInterval(b._beepThreeTimes, 1e3)
    },
    stopBeeping: function() {
      b.beepInterval !== undefined && (clearInterval(b.beepInterval), delete b.beepInterval)
    },
    _beepThreeTimes: function() {
      var a = 700,
        c = b.audioContext.currentTime;
      b.oscillator.frequency.setValueAtTime(a, c), b.amp.gain.cancelScheduledValues(c), b.triggeredAlerts().forEach(function(a) {
        var b = $("[data-alert-id=" + a.id + "]");
        b.attr("alert-flash", !0), b.is(":last-child") && $("#alerts__fake-border-bottom").attr("alert-flash", !0), b.is(":first-child") && $("#alerts__fake-border-top").attr("alert-flash", !0)
      }), cryptowatch.nav.open.alerts || $("#open-alerts").attr("alert-flash", !0), b.flashState = !0, cryptowatch.chart.refresh.axes(), setTimeout(function() {
        $(".alert-entry").attr("alert-flash", !1), $("#alerts__fake-border-bottom").attr("alert-flash", !1), $("#alerts__fake-border-top").attr("alert-flash", !1), $("#open-alerts").attr("alert-flash", !1), b.flashState = !1, cryptowatch.chart.refresh.axes()
      }, 500);
      for (var d = 0; d < 3; d++) b.amp.gain.setValueAtTime(b.amp.gain.value, c), b.amp.gain.linearRampToValueAtTime(.01, c + .015), b.amp.gain.linearRampToValueAtTime(.02, c + .03), b.amp.gain.linearRampToValueAtTime(.05, c + .05), b.amp.gain.linearRampToValueAtTime(.2, c + .1), b.amp.gain.linearRampToValueAtTime(b.amp.gain.value, c + .15), b.amp.gain.linearRampToValueAtTime(0, c + .2), c += .2
    }
  };
  b.initialize()
}(),
function() {
  var a = document.querySelector("#price-chart-container"),
    b = null;
  a.addEventListener("touchstart", function(a) {
    a.touches.length == 1 && (a.clientX = a.touches[0].clientX, a.clientY = a.touches[0].clientY, cryptowatch.chart.canvas.cursor.state.lastEvent = a, cryptowatch.chart.canvas.cursor.mousemove(a), cryptowatch.chart.canvas.cursor.mousedown(a)), b = setTimeout(function() {
      cryptowatch.chart.canvas.cursor.mouseup(a)
    }, 800)
  }), document.addEventListener("touchmove", function(a) {
    var b = $(a.target),
      c = b.parents("[data-touch-allow-scroll]");
    b.attr("[data-touch-allow-scroll]") || c.length > 0 || a.preventDefault()
  }), a.addEventListener("touchmove", function(a) {
    a.preventDefault(), a.touches.length == 1 && (cryptowatch.chart.canvas.cursor.mousemove(a), clearTimeout(b))
  });
  var c = 1,
    d = 0,
    e = 10;
  a.addEventListener("gesturechange", function(a) {
    var b = a.scale - c;
    c = a.scale, b > 0 ? (d < 0 && (d = 0), d++) : (d > 0 && (d = 0), d--), d >= e ? (cryptowatch.chart.increaseCandleWidth(), d = 0) : d <= -e && (cryptowatch.chart.decreaseCandleWidth(), d = 0)
  }), a.addEventListener("gestureend", function(a) {
    c = 1, d = 0
  }), $(document).ready(function() {
    if (navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i) && window.innerHeight != document.documentElement.clientHeight) {
      var a = function() {
        document.documentElement.style.height = window.innerHeight + "px", document.body.scrollTop !== 0 && window.scrollTo(0, 0), $("footer").hide(), setTimeout(function() {
          $("footer").show()
        }, 1), $("#price-chart-container").css({
          height: $("#right-column").height()
        }), document.body.style.webkitTransform = "translate3d(0,0,0)", cryptowatch.chart._updateDimensions(), cryptowatch.chart._viewportChange(), cryptowatch.chart.refresh.all()
      };
      window.addEventListener("orientationchange", a, !1), a()
    }
  })
}(),
function() {
  var a = cryptowatch.socket = {
    initialize: function() {
      a.connect()
    },
    _initialized: !1,
    _reconnectWait: 1e3,
    connect: function() {
      a.conn = new WebSocket(cryptowatch.stream + "/" + cryptowatch.exchange.slug + "/" + cryptowatch.pair + "/" + cryptowatch.period), a.conn.onclose = function(b) {
        a.respondToDisconnect(), cryptowatch.statsd.increment("sockets.disconnected")
      }, a.conn.onopen = function() {
        a.respondToConnect()
      }, a.conn.onmessage = function(a) {
        if (a.data.length == 0) {
          cryptowatch.statsd.increment("socket.emptyMessage");
          return
        }
        var b = JSON.parse(a.data);
        if (b.Interval !== undefined) {
          var c = b.Period || cryptowatch.periodInt,
            d = cryptowatch.data.updateInterval(b.Interval, c);
          d && cryptowatch.chart.handleIntervalUpdate(d, c)
        } else if (b.Intervals !== undefined) b.Intervals.forEach(function(a) {
          var b = cryptowatch.data.updateInterval(a.Interval, a.Period);
          b && cryptowatch.chart.handleIntervalUpdate(b, a.Period)
        });
        else if (b.UpdateClient !== undefined) b.UpdateClient !== cryptowatch.revision && cryptowatch.updater.handleUpdate();
        else if (b.FiatExchangeRates !== undefined) {
          var e = cryptowatch.currency.exchangeRates === undefined;
          cryptowatch.currency.exchangeRates = b.FiatExchangeRates, e && cryptowatch.currency.setFiatPreference(cryptowatch.currencyPreference)
        } else b.Balances !== undefined ? ($("#user__balances").show(), cryptowatch.account.handleBalances(b.Balances)) : b.PrivateTrades !== undefined ? cryptowatch.account.handleTrades(b.PrivateTrades) : b.PrivateOrders !== undefined ? cryptowatch.trading && cryptowatch.account.handleOrders(b.PrivateOrders) : b.OrderBook !== undefined ? cryptowatch.depth && cryptowatch.depth.handleOrderBook(b) : b.OrderBookDiff !== undefined ? cryptowatch.depth && cryptowatch.depth.handleOrderBookDiff(b) : b.UserCount !== undefined ? cryptowatch.ticker && cryptowatch.ticker.handleUserCount(b.UserCount) : b.Ticker !== undefined ? cryptowatch.ticker && cryptowatch.ticker.handleNavTicker(b.Ticker) : b.PublicTrades !== undefined ? cryptowatch.feed && (cryptowatch.feed.initialized || cryptowatch.feed.initialize(), cryptowatch.feed.handleNewTrades(b.PublicTrades), cryptowatch.feed.initialized = !0) : b.TradeExecutionProgress !== undefined ? cryptowatch.trading.status(b.TradeExecutionProgress) : b.TradeExecutionComplete !== undefined && cryptowatch.trading.handleTradeCompletion()
      }
    },
    respondToDisconnect: function() {
      setTimeout(function() {
        a.connect(), cryptowatch.statsd.increment("sockets.reconnectionAttempt")
      }, a._reconnectWait), a._reconnectWait *= 1.1
    },
    respondToConnect: function() {
      a._reconnectWait = 1e3, a.conn.send(JSON.stringify({
        action: "session",
        data: cryptowatch.sessionToken
      })), cryptowatch.account.initialize();
      var b;
      navigator && navigator.userAgent ? b = navigator.userAgent : b = "Unknown user-agent", a.conn.send(JSON.stringify({
        action: "useragent",
        data: b
      })), a.conn.send(JSON.stringify({
        action: "revision",
        data: cryptowatch.revision
      })), a.conn.send(JSON.stringify({
        action: "locale",
        data: cryptowatch.locale
      }))
    },
    send: function(b) {
      a.conn.send(JSON.stringify({
        action: b.action,
        data: JSON.stringify(b.data)
      }))
    }
  };
  cryptowatch.socket.initialize(), window.onoffline = function() {
    a.conn.close()
  }
}(),
function() {
  var a = cryptowatch.ticker = {
    initialize: function() {
      a.defaultTitle = document.title, a.$ownNavTickerPrice = $('[data-exchange="' + cryptowatch.exchange.slug + '"][data-currencypair="' + cryptowatch.pair + '"] .ticker__price')
    },
    handlePrice: function(b) {
      if (b === 0) return;
      var c = cryptowatch.currency.fmt(b, cryptowatch.currencyPair.quote);
      cryptowatch.depth.orderBookInterface && cryptowatch.depth.orderBookInterface.setProps({
        lastPrice: b
      }), a.lastPrice = b, document.title = c + " - " + a.defaultTitle, a.$ownNavTickerPrice.text(c).attr("value", b)
    },
    handleUserCount: function(a) {
      $("#user-count").text(a)
    },
    handleNavTicker: function(a) {
      var b = $('nav [data-market="' + a.Market + '"]'),
        c = a.Direction ? "long" : "short";
      if (b.text() === d) return;
      if (a.Price === 0) return;
      cryptowatch.nav.open.market && (a.Direction === !1 ? b.addClass("short") : b.removeClass("short")), a.Exchange == cryptowatch.exchange.slug && a.CurrencyPair == cryptowatch.currencyPair.slug && $("#price-ticker").attr("direction", c);
      if (b.text() == "") {
        var d = cryptowatch.currency.fmt(a.Price, a.QuoteCurrency);
        b.text(d).attr("direction", c)
      } else {
        var d = cryptowatch.currency.fmt(a.Price, a.QuoteCurrency);
        cryptowatch.nav.open.market ? (b.addClass("emphasis").attr("direction", c), setTimeout(function() {
          b.text(d)
        }, 600), setTimeout(function() {
          b.removeClass("emphasis").removeClass("short")
        }, 800)) : b.text(d)
      }
      b.attr("value", a.Price)
    }
  };
  a.initialize()
}(),
function() {
  var a = 80,
    b = 50;
  window.BENCH = function() {
    window.__BENCH__ = !window.__BENCH__
  };
  var c = cryptowatch.depth = {
    initialize: function() {
      return c.canvas = (new MultiLayerCanvas("#depth-chart-container")).registerLayer("depth", "#depth-chart").registerLayer("axis", "#depth-axis-chart"), c.canvas.cursor.on("mousemove", function(a) {
        c.updateCrosshair(a)
      }).on("mouseleave", function(a) {
        c.hideCrosshair(), cryptowatch.chart.hideCrosshairDepthInfo()
      }), c.$container = $("#depth-chart-container"), c.$bidsList = $("#bids-list ul"), c.$asksList = $("#asks-list ul"), c._offsetTop = $("#depth-chart").offset().top, cryptowatch.utils.onScroll("#depth-chart-container", {
        up: c.zoomOut.bind(c),
        down: c.zoomIn.bind(c)
      }), this
    },
    initialized: !1,
    handleOrderBook: function(a) {
      var b = !c.orders;
      c.orders = a.OrderBook;
      if (c.orders.Asks === null && c.orders.Bids === null) return;
      c.orders.Asks = c._parseOrders(c.orders.Asks), c.orders.Bids = c._parseOrders(c.orders.Bids), c.orders.Asks = c._squishOrders(c.orders.Asks), c.orders.Bids = c._squishOrders(c.orders.Bids), c.sortOrderBook(), c.orders.Asks = c._trimOrders(c.orders.Asks), c.orders.Bids = c._trimOrders(c.orders.Bids), c._updatePriceFieldsIfNecessary(), c.refresh(), c.indexOrders(a.OrderBook.Asks, a.OrderBook.Bids), c.index === undefined && (c.determineScale(), c.determineLargeOrderThreshold()), c.orderBookInterface === undefined ? c.orderBookInterface = React.render(cryptowatch.components.OrderBook({
        bids: c.orders.Bids,
        asks: c.orders.Asks,
        lastPrice: parseFloat(cryptowatch.intervals.slice(-1)[0].split(" ")[4])
      }), document.getElementById("orders-container")) : c.orderBookInterface.setProps({
        asks: c.orders.Asks,
        bids: c.orders.Bids
      }), cryptowatch.trading.enabled && (cryptowatch.account.recalibrateQuoteScale(), cryptowatch.trading.bidsModule.updateAmount(), cryptowatch.trading.asksModule.updateAmount(), b && cryptowatch.trading.overlay && cryptowatch.account.showFakeTrades())
    },
    _lastDiffSequence: undefined,
    handleOrderBookDiff: function(a) {
      if (c.index === undefined) return;
      c._ownOrderWasAffected = !1;
      var b = a.Sequence,
        d = !1;
      c._lastDiffSequence === undefined ? c._lastDiffSequence = b : c._lastDiffSequence + 1 !== b && (d = !0), c.handleOrderDiffs(a.OrderBookDiff.Asks, c.index.asks, "ask"), c.handleOrderDiffs(a.OrderBookDiff.Bids, c.index.bids, "bid"), c.sortOrderBook(), c.orderBookInterface.setState({
        initialized: !0
      }), c.orderBookInterface.setProps({
        asks: c.orders.Asks,
        bids: c.orders.Bids
      }), c.refresh(), c._lastDiffSequence = b, c.indexOrders(c.orders.Asks, c.orders.Bids), d && (console.info("Resyncing due to skipped sequence number"), c.resync()), c._ownOrderWasAffected && cryptowatch.account.pingForLatestState()
    },
    resync: function() {
      cryptowatch.socket.conn.send(JSON.stringify({
        action: "orderBookSync"
      }))
    },
    handleOrderDiffs: function(a, b, d) {
      var e = d === "ask" ? c.orders.Asks : c.orders.Bids,
        f = c._parseOrders(a.Remove);
      f.forEach(function(a) {
        e = e.filter(function(b) {
          return b.Price !== a.Price
        })
      }), c._parseOrders(a.Delta).forEach(function(a) {
        a.Amount += b[a.Price];
        for (var c = 0; c < e.length; c++)
          if (e[c].Price === a.Price) {
            e[c].Amount = a.Amount;
            break
          }
      }), c._parseOrders(a.Set).forEach(function(a) {
        if (b[a.Price] === undefined) e.push(a);
        else
          for (var c = 0; c < e.length; c++)
            if (e[c].Price === a.Price) {
              e[c].Amount = a.Amount;
              break
            }
      }), d === "ask" ? c.orders.Asks = e : c.orders.Bids = e
    },
    zoomIn: function() {
      c._modifyZoom(-0.00025)
    },
    zoomOut: function() {
      c._modifyZoom(25e-5)
    },
    _modifyZoom: function(a) {
      var b = cryptowatch.config.config.depthZoomLevel + a;
      b = Math.max(.001, Math.min(c._maxZoomLevel(), b)), cryptowatch.config.config.depthZoomLevel = b, cryptowatch.config.cache(), cryptowatch.utils.nextFrame(function() {
        c.refresh()
      })
    },
    _center: function() {},
    _maxZoomLevel: function() {
      var a = Math.min(c.orders.Asks[c.orders.Asks.length - 1].Price - c.orders.Asks[0].Price, c.orders.Bids[0].Price - c.orders.Bids[c.orders.Bids.length - 1].Price);
      return a / c._fairMarketPrice()
    },
    _parseOrders: function(a) {
      return a === null ? [] : a.length === 0 ? [] : a[0] instanceof Array ? a.map(function(a) {
        return {
          Price: a[0],
          Amount: a[1]
        }
      }) : a
    },
    _squishOrders: function(a) {
      var b = [],
        c = null;
      return a.forEach(function(a) {
        var d = cryptowatch.currency.fmt(a.Price, cryptowatch.currencyPair.quote, {
          label: !1
        });
        d === c ? b[b.length - 1].Amount += a.Amount : b.push(a), c = d
      }), b
    },
    _trimOrders: function(a) {
      var b = [],
        c = a[0].Price;
      for (var d = 0; d < a.length; d++) {
        var e = a[d];
        if (Math.abs(e.Price - c) <= c * .2) b.push(e);
        else break
      }
      return b
    },
    determineLargeOrderThreshold: function() {
      var a = c.ordersToDraw.Asks.map(function(a) {
        return a.Amount
      }).concat(c.ordersToDraw.Bids.map(function(a) {
        return a.Amount
      })).sort(d3.ascending);
      c.largeOrderThreshold = d3.quantile(a, .97)
    },
    indexOrders: function(a, b) {
      c.index = {
        asks: c.indexList(a),
        bids: c.indexList(b)
      }
    },
    indexList: function(a) {
      var b = {};
      return a.forEach(function(a) {
        b[a.Price] = a.Amount
      }), b
    },
    sortOrderBook: function() {
      c.orders.Asks = c.orders.Asks.sort(function(a, b) {
        return a.Price - b.Price
      }), c.orders.Bids = c.orders.Bids.sort(function(a, b) {
        return b.Price - a.Price
      })
    },
    priceSlice: function(a, b) {
      var c = [],
        d = a[0].Price;
      for (var e = 0; e < a.length; e++) {
        var f = a[e];
        if (Math.abs(f.Price - d) > b) break;
        c.push(f)
      }
      return c
    },
    accumSlice: function(a, b) {
      var d = [];
      for (var e = 0; e < a.length; e++) {
        var f = a[e];
        if (c.accumulatedValues[f.Price] > b) break;
        d.push(f)
      }
      return d
    },
    _fairMarketPrice: function() {
      return c.bestAsk = c.orders.Asks[0].Price, c.bestBid = c.orders.Bids[0].Price, c.bestBid + (c.bestAsk - c.bestBid) / 2
    },
    determineScale: function() {
      c.sortOrderBook(), c.depthLines !== undefined && c.depthLines.remove();
      var b = Math.min(c.orders.Asks[c.orders.Asks.length - 1].Price - c.orders.Asks[0].Price, c.orders.Bids[0].Price - c.orders.Bids[c.orders.Bids.length - 1].Price),
        d = c._fairMarketPrice(),
        e = c._maxZoomLevel();
      cryptowatch.config.config && (e = Math.min(cryptowatch.config.config.depthZoomLevel, e));
      var f = d * e,
        g = d * e;
      c.ordersToDraw = {}, c.ordersToDraw.Asks = c.priceSlice(c.orders.Asks, f), c.ordersToDraw.Bids = c.priceSlice(c.orders.Bids, g);
      var h = Math.min.apply(Math, c.orders.Bids.map(function(a) {
          return a.Price
        })),
        i = Math.max.apply(Math, c.orders.Asks.map(function(a) {
          return a.Price
        })),
        j = Math.max(d - h, i - d);
      c.x = d3.scale.linear().domain([d - g, d + f]).range([0, c.canvas.layers.depth.height]), c.middle = c.x(d);
      var k = c.canvas.layers.depth.height / 2 - c.middle;
      c.verticalOffset = k, c.accumulatedValues = {}, c.accumulatedValuesInOrder = {
        bids: [],
        asks: []
      };
      var l = 0,
        m = 0;
      c.orders.Bids.forEach(function(a) {
        m += a.Amount, c.accumulatedValuesInOrder.bids.push({
          price: a.Price,
          amount: m
        }), c.accumulatedValues[a.Price] = m
      }), c.orders.Asks.forEach(function(a) {
        l += a.Amount, c.accumulatedValuesInOrder.asks.push({
          price: a.Price,
          amount: l
        }), c.accumulatedValues[a.Price] = l
      });
      var n = c.accumulatedValues[c.ordersToDraw.Asks[c.ordersToDraw.Asks.length - 1].Price],
        o = c.accumulatedValues[c.ordersToDraw.Bids[c.ordersToDraw.Bids.length - 1].Price],
        p = Math.max(o, n);
      c.y = d3.scale.linear().domain([0, p]).range([0, a]), c.determineLargeOrderThreshold()
    },
    refresh: function() {
      if (c.orders === undefined) return;
      if (!cryptowatch.config.config) return;
      window.__BENCH__ && console.time("depth:refresh"), c.determineScale(), c.drawChart(), c.drawAxis(), window.__BENCH__ && console.timeEnd("depth:refresh")
    },
    highlightingPrice: undefined,
    drawChart: function() {
      window.__BENCH__ && console.time("depth:draw"), c.canvas.layers.depth.clear();
      var a = c._stairstepLine(c.ordersToDraw.Asks, c.canvas.layers.depth.width, c.canvas.layers.depth.height, c.x, c.y, c.verticalOffset),
        b = c._stairstepLine(c.ordersToDraw.Bids, c.canvas.layers.depth.width, c.canvas.layers.depth.height, c.x, c.y, c.verticalOffset);
      c.canvas.layers.depth.drawArea(b, function(a) {
        return a
      }, [{
        x: c.canvas.layers.depth.width + 1,
        y: c.canvas.layers.depth.height + 1
      }, {
        x: b[b.length - 1].x,
        y: c.canvas.layers.depth.height + 1
      }], function(a) {
        return a
      }, {
        fill: cryptowatch.colors.theme.long.stroke.toString(),
        stroke: cryptowatch.colors.theme.long.stroke.toString(),
        fillAlpha: .1
      }), c.canvas.layers.depth.drawArea(a, function(a) {
        return a
      }, [{
        x: c.canvas.layers.depth.width + 1,
        y: -1
      }, {
        x: a[a.length - 1].x,
        y: -1
      }], function(a) {
        return a
      }, {
        fill: cryptowatch.colors.theme.short.stroke.toString(),
        stroke: cryptowatch.colors.theme.short.stroke.toString(),
        fillAlpha: .1
      }), cryptowatch.chart.drawDepthMirror(), window.__BENCH__ && console.timeEnd("depth:draw")
    },
    _stairstepLine: function(a, b, d, e, f, g) {
      var h = [],
        i = 0;
      return a.forEach(function(a) {
        var j = c.accumulatedValues[a.Price];
        h.push({
          x: Math.floor(b - f(i)) + .5,
          y: Math.floor(d - e(a.Price) - g) + .5
        }), h.push({
          x: Math.floor(b - f(j)) + .5,
          y: Math.floor(d - e(a.Price) - g) + .5
        }), i = j
      }), h
    },
    fmtPriceForAxis: function(a) {
      return cryptowatch.currency.fmt(a, cryptowatch.currencyPair.quote, {
        label: !1,
        stripTrailingZeros: !1
      })
    },
    drawAxis: function() {
      if (!c.orders) return;
      c.canvas.layers.axis.clear(), c.canvas.layers.axis.drawLineSegment({
        x: 69.5,
        y: 0
      }, {
        x: 69.5,
        y: c.canvas.layers.axis.height
      }, {
        color: cryptowatch.colors.theme.guide.toString()
      }), c.midPoint = c.canvas.layers.depth.height / 2, c.labelsDrawn = [];
      if (c.drawCrosshair) {
        var a, b;
        c.crosshairY > c.midPoint ? (b = c.crosshairY, a = c.crosshairY - (c.crosshairY - c.midPoint) * 2) : (a = c.crosshairY, b = c.crosshairY + (c.midPoint - c.crosshairY) * 2);
        var d = c.farthestOrderAtPrice(c.x.invert(c.canvas.layers.axis.height - b)),
          e = c.farthestOrderAtPrice(c.x.invert(c.canvas.layers.axis.height - a));
        $(".order-list-entry li").removeClass("highlight"), b >= c.canvas.layers.axis.height - c.x(c.orders.Bids[0].Price) ? ($bidEntry = $('[data-key="' + d.Price + '"] li'), $bidEntry.length && $bidEntry.addClass("highlight"), $askEntry = $('[data-key="' + e.Price + '"] li'), $askEntry.length && $askEntry.addClass("highlight"), c._drawCrosshairLabel(e, d, c.x.invert(c.canvas.layers.axis.height - a), "ask", c.crosshairY <= c.midPoint), c._drawCrosshairLabel(d, e, c.x.invert(c.canvas.layers.axis.height - b), "bid", c.crosshairY > c.midPoint)) : cryptowatch.chart.hideCrosshairDepthInfo()
      }
      if (c.hoveringOverOrder) {
        var f = c.hoveringOverOrder,
          g = f.Price <= c.orders.Bids[0].Price ? cryptowatch.colors.theme.long.stroke.toString() : cryptowatch.colors.theme.short.stroke.toString();
        c.canvas.layers.axis.drawCircle({
          x: Math.floor(c.canvas.layers.axis.width - c.y(c.accumulatedValues[f.Price])),
          y: Math.floor(c.canvas.layers.axis.height - c.x(f.Price)) + .5
        }, 3, undefined, g)
      }
      c.canvas.layers.axis.resetHoverareas(), cryptowatch.account.orders && cryptowatch.account.orders.forEach(function(a) {
        var b = Math.floor(c.canvas.layers.axis.height - c.x(a.Price)) + .5,
          d = c.accumulatedValues[a.Price],
          e = Math.floor(c.canvas.layers.axis.width - c.y(d)) + .5,
          f = a.Side === 0 ? cryptowatch.colors.theme.short.stroke.toString() : cryptowatch.colors.theme.long.stroke.toString(),
          g = cryptowatch.chart.orderHovered === a ? 10 : 8;
        c.canvas.layers.axis.drawCircle({
          x: e,
          y: b
        }, g + 2, undefined, cryptowatch.colors.theme.background.toString()), c.canvas.layers.axis.drawCircle({
          x: e,
          y: b
        }, 4, f, cryptowatch.colors.theme.background.toString()), c.canvas.layers.axis.drawCircle({
          x: e,
          y: b
        }, g, cryptowatch.colors.theme.text.toString()), c._drawAxisLabel(a.Price, cryptowatch.currency.fmt(a.Price, undefined, {
          label: !1
        }), f, a === cryptowatch.chart.orderHovered ? cryptowatch.colors.theme.textStrong.toString() : cryptowatch.colors.theme.text.toString()), c.canvas.layers.axis.registerHoverarea(new Hoverarea("depth:trade:" + a.Id, {
          type: "rect",
          left: 0,
          top: b - 6,
          bottom: b + 6,
          right: c.canvas.layers.depth.width
        }, {
          cursor: "pointer",
          callbacks: {
            hover: function() {
              cryptowatch.chart._crosshairVisible.x = !0, cryptowatch.chart.orderHovered = a, cryptowatch.chart.updateCursor(), cryptowatch.chart.refresh.all()
            },
            leave: function() {
              cryptowatch.chart._crosshairVisible.x = !1, delete cryptowatch.chart.orderHovered, cryptowatch.chart.updateCursor(), cryptowatch.chart.refresh.all()
            }
          }
        }))
      }), $(".order-list-entry li").removeClass("emphasis"), c.ordersToDraw.Bids.filter(function(a) {
        return c.isSignificantOrder(a.Amount)
      }).sort(function(a, b) {
        return b.Amount - a.Amount
      }).slice(0, 7).forEach(function(a) {
        c._drawAxisLabel(a.Price, c.fmtPriceForAxis(a.Price), cryptowatch.colors.theme.long.stroke.toString());
        var b = c.getListEntry(a.Price);
        b && b.find("li").addClass("emphasis")
      }), c.ordersToDraw.Asks.filter(function(a) {
        return c.isSignificantOrder(a.Amount)
      }).sort(function(a, b) {
        return b.Amount - a.Amount
      }).slice(0, 7).forEach(function(a) {
        if (c.isSignificantOrder(a.Amount)) {
          c._drawAxisLabel(a.Price, c.fmtPriceForAxis(a.Price), cryptowatch.colors.theme.short.stroke.toString());
          var b = c.getListEntry(a.Price);
          b && b.find("li").addClass("emphasis")
        }
      }), c.canvas.layers.axis.drawLineSegment({
        x: 65,
        y: c.midPoint
      }, {
        x: 70,
        y: c.midPoint
      }, {
        color: cryptowatch.colors.theme.text.toString()
      }), c.canvas.layers.axis.drawLineSegment({
        x: 69.5,
        y: c.midPoint
      }, {
        x: 180,
        y: c.midPoint
      }, {
        color: cryptowatch.colors.theme.guide.toString()
      }), c._roomForLabel(c.midPoint) && c.canvas.layers.axis.drawText({
        x: 60,
        y: c.midPoint
      }, c.fmtPriceForAxis(c._fairMarketPrice()), cryptowatch.colors.theme.text.toString(), {
        align: "end"
      })
    },
    _updatePriceFieldsIfNecessary: function() {
      cryptowatch.trading.enabled && (cryptowatch.trading.asksModule.handleFairMarketPrice(c._fairMarketPrice()), cryptowatch.trading.bidsModule.handleFairMarketPrice(c._fairMarketPrice()))
    },
    _roomForLabel: function(a) {
      return c.labelsDrawn.filter(function(b) {
        return Math.abs(b - a) < 12
      }).length == 0
    },
    _drawAxisLabel: function(a, b, d, e) {
      var f = Math.floor(c.canvas.layers.axis.height - c.x(a)) + .5;
      b || (b = c.fmtPriceForAxis(a)), e = e || cryptowatch.colors.theme.text.toString(), c.canvas.layers.axis.drawLineSegment({
        x: 65,
        y: f
      }, {
        x: 70,
        y: f
      }, {
        color: d
      });
      var g = c.accumulatedValues[c.farthestOrderAtPrice(a).Price];
      c.canvas.layers.axis.drawDashedHorizontalLineSegment(71, c.canvas.layers.axis.width - c.y(g), f, d), c._roomForLabel(f) && (c.canvas.layers.axis.drawText({
        x: 60,
        y: f
      }, b, e, {
        align: "end"
      }), c.labelsDrawn.push(f))
    },
    _drawCrosshairLabel: function(a, b, d, e, f) {
      var g = Math.floor(c.canvas.layers.axis.height - c.x(d)) + .5,
        h, i = c.accumulatedValues[a.Price],
        j = c.fmtPriceForAxis(a.Price),
        k = Math.floor(c.canvas.layers.axis.width - c.y(i)),
        l = Math.floor(c.canvas.layers.axis.width - c.y(c.accumulatedValues[b.Price])),
        m = e === "ask" ? cryptowatch.colors.theme.short.stroke.toString() : cryptowatch.colors.theme.long.stroke.toString(),
        n = e === "ask" ? cryptowatch.colors.theme.long.stroke.toString() : cryptowatch.colors.theme.short.stroke.toString();
      switch (e) {
        case "ask":
          h = Math.max(Math.min(c.midPoint - 15, g), 10);
          break;
        case "bid":
          h = Math.min(Math.max(c.midPoint + 15, g), c.canvas.layers.axis.height - 10)
      }
      var o = 2,
        p = 1;
      c.canvas.layers.axis.drawLineSegment({
        x: 69.5,
        y: g
      }, {
        x: 180.5,
        y: g
      }, {
        color: cryptowatch.colors.theme.guide.toString()
      }), c.canvas.layers.axis.drawLineSegment({
        x: 65,
        y: g
      }, {
        x: 70,
        y: g
      }, {
        color: cryptowatch.colors.theme.text.toString()
      }), f ? (c.canvas.layers.axis.drawCircle({
        x: k,
        y: g
      }, 3, undefined, m), c.canvas.layers.axis.drawCircle({
        x: l,
        y: g
      }, 3, undefined, n)) : (c.canvas.layers.axis.drawCircle({
        x: k,
        y: g
      }, 3, undefined, m), c.canvas.layers.axis.drawCircle({
        x: l,
        y: g
      }, 3, undefined, n)), c.canvas.layers.axis.drawText({
        x: 60,
        y: h
      }, j, cryptowatch.colors.theme.textStrong.toString(), {
        align: "end"
      });
      if (cryptowatch.chart.orderHovered === undefined) {
        var q = cryptowatch.chart._crosshairInfoDOMElements,
          r = cryptowatch.ticker.lastPrice,
          s = cryptowatch.utils.percentageAsString(Math.abs((r - a.Price) / r)),
          t = c.priceForDepth(i, {
            ask: "Asks",
            bid: "Bids"
          }[e]);
        switch (e) {
          case "ask":
            q.depthBuyAmount.innerHTML = cryptowatch.currency.fmt(i, cryptowatch.currencyPair.base), q.depthBuyPriceChange.innerHTML = s, q.depthBuyPrice.innerHTML = cryptowatch.currency.fmt(a.Price, cryptowatch.currencyPair.quote), q.depthBuyCost.innerHTML = cryptowatch.currency.fmt(t, cryptowatch.currencyPair.quote);
            break;
          case "bid":
            q.depthSellAmount.innerHTML = cryptowatch.currency.fmt(i, cryptowatch.currencyPair.base), q.depthSellPriceChange.innerHTML = s, q.depthSellPrice.innerHTML = cryptowatch.currency.fmt(a.Price, cryptowatch.currencyPair.quote), q.depthSellCost.innerHTML = cryptowatch.currency.fmt(t, cryptowatch.currencyPair.quote)
        }
        cryptowatch.chart.hideCrosshairInfo(), cryptowatch.chart.showCrosshairDepthInfo()
      }
      c.labelsDrawn.push(h)
    },
    priceForDepth: function(a, b) {
      var d = 0,
        e = 0,
        f = c.orders[b];
      for (var g = 0; g < f.length; g++) {
        var h = f[g];
        if (e == a) return d;
        if (h.Amount > a - e) return d += (a - e) * h.Price, d;
        d += h.Amount * h.Price, e += h.Amount
      }
      return d
    },
    orderCountDepthForAmount: function(a, b) {
      var d = 0,
        e = c.orders[b];
      for (var f = 0; f < e.length; f++) {
        d += e[f].Amount;
        if (d >= a) return f + 1
      }
      return e.length + 1
    },
    pricesForAmount: function(a, b) {
      var d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = c.orders[b];
      for (var i = 0; i < h.length; i++) {
        var j = h[i];
        f = j.Price;
        if (g + j.Amount > a) {
          var k = a - g;
          d += j.Price * (k / a), e += j.Price * k, g += k
        } else d += j.Price * (j.Amount / a), e += j.Price * j.Amount, g += j.Amount; if (g == a) return {
          vwap: d,
          sum: e,
          finalp: j.Price
        }
      }
      return {
        vwap: d * (a / g),
        finalp: f
      }
    },
    depthForTotalCost: function(a, b) {
      var d = 0,
        e = 0,
        f = c.orders[b];
      for (var g = 0; g < f.length; g++) {
        var h = f[g],
          i = h.Price * h.Amount;
        if (e == a) return d;
        if (i > a - e) return d += h.Amount * ((a - e) / i), d;
        e += i, d += h.Amount
      }
      return d
    },
    farthestOrderAtPrice: function(a) {
      if (a <= c.orders.Bids[0].Price) {
        for (var b = 0; b < c.orders.Bids.length - 1; b++) {
          var d = c.orders.Bids[b + 1];
          if (d.Price < a) return c.orders.Bids[b]
        }
        return c.orders.Bids[c.orders.Bids.length - 1]
      }
      for (var b = 0; b < c.orders.Asks.length - 1; b++) {
        var d = c.orders.Asks[b + 1];
        if (d.Price > a) return c.orders.Asks[b]
      }
      return c.orders.Asks[c.orders.Asks.length - 1]
    },
    getUpdatesBetweenIndexes: function(a, b) {
      var c = [];
      for (var d in b) a[d] !== undefined && a[d] !== b[d] && c.push({
        Price: parseFloat(d),
        Amount: parseFloat(b[d])
      });
      return c
    },
    getDiffOfIndexes: function(a, b) {
      var c = [];
      for (var d in b) a[d] === undefined && c.push({
        Price: parseFloat(d),
        Amount: parseFloat(b[d])
      });
      return c
    },
    updateOrders: function(a) {
      a.forEach(function(a) {
        var b = c.getListEntry(a.Price);
        cryptowatch.account.ordersIndex[a.Price] !== undefined && (c._ownOrderWasAffected = !0), b && function(a, b) {
          var c = a.find(".order-amount"),
            d = c.text(),
            e = cryptowatch.utils.amountToString(b),
            f = parseFloat(e) > parseFloat(d) ? "increase" : "decrease";
          if (d == e) return;
          cryptowatch.config.config.performance.animateFeeds && cryptowatch.nav.open.orderBook ? (c.addClass("emphasis").addClass(f), setTimeout(function() {
            c.text(cryptowatch.utils.amountToString(b))
          }, 300), setTimeout(function() {
            c.removeClass("emphasis").removeClass(f)
          }, 600)) : c.text(cryptowatch.utils.amountToString(b))
        }(b, a.Amount)
      })
    },
    sumOfIndex: function(a) {
      var b = 0;
      for (var c in a) b += a[c];
      return b
    },
    bestBidAfter: function(a) {
      var b = c.orders.Bids.map(function(a) {
        return a.Price
      }).filter(function(b) {
        return b < parseFloat(a.Price)
      });
      return b.sort(d3.descending)[0]
    },
    bestAskAfter: function(a) {
      var b = c.orders.Asks.map(function(a) {
        return a.Price
      }).filter(function(b) {
        return b > a.Price
      });
      return b.sort(d3.ascending)[0]
    },
    updateCrosshair: function(a) {
      a.offsetX === undefined && (rect = a.target.getBoundingClientRect(), a.offsetX = a.clientX - rect.left, a.offsetY = a.clientY - rect.top), a.offsetX > 70 && !cryptowatch.chart.orderHovered ? (c.drawCrosshair = !0, c.crosshairY = a.offsetY, c.drawAxis()) : c.hideCrosshair()
    },
    hideCrosshair: function() {
      c.drawCrosshair = !1, c.drawAxis(), $(".order-list-entry li").removeClass("highlight")
    },
    setCrosshairInfo: function() {},
    _buildListEntries: function(a, d, e) {
      a.empty(), d.slice(0, b).forEach(function(b) {
        var d = c.$listEntry(b);
        e == "long" ? (a.append(d), c.$listEntries[b.Price] = d) : e == "short" && (a.prepend(d), c.$listEntries[b.Price] = d)
      })
    },
    $listEntries: {},
    $listEntry: function(a) {
      var b = cryptowatch.currency.fmt(a.Price, cryptowatch.currencyPair.quote, {
          label: !1
        }).split("."),
        c = $('<div data-key="' + a.Price + '" data-amount="' + cryptowatch.utils.amountToString(a.Amount) + '" class="order-list-entry">' + "<li>" + '<data class="order-price" data-quotecurrency="' + cryptowatch.currencyPair.quote + '" data-label="false" value="' + a.Price + '">' + '<span class="order-price-left">' + b[0] + ".</span>" + '<span class="order-price-right">' + b[1] + "</span>" + "</data>" + '<div class="order-amount">' + cryptowatch.currency.fmt(a.Amount, cryptowatch.currencyPair.base, {
          label: !1
        }) + "</div>" + "</li>" + "</div>");
      return c
    },
    itemMouseover: function(a) {
      c.hoveringOverOrder = a, c.drawAxis()
    },
    itemMouseleave: function(a) {
      delete c.hoveringOverOrder
    },
    isSignificantOrder: function(a) {
      return a > c.largeOrderThreshold
    },
    getListEntry: function(a) {
      return $('#orders-container [data-key="' + a + '"]')
    },
    latestOrder: function(a, b) {
      var d;
      if (a === "bids")
        for (var e = 0; e < c.orders.Bids.length; e++) {
          var f = c.orders.Bids[e];
          if (f.Price < b) break;
          d = f
        } else
          for (var e = 0; e < c.orders.Asks.length; e++) {
            var f = c.orders.Asks[e];
            if (f.Price > b) break;
            d = f
          }
      return d
    }
  };
  jQuery.fn.reverse = [].reverse, cryptowatch.depth.initialize(), $(window).on("resize", function() {
    c.refresh()
  })
}(),
function() {
  var a = cryptowatch.feed = {
    initialize: function() {
      a.$ul = $("#trades-feed ul")
    },
    lastTime: null,
    lastPrice: null,
    lastTrade: null,
    initialized: !1,
    _doubleDigits: function(a) {
      return a == 0 ? "00" : "" + (a < 10 ? "0" : "") + a
    },
    handleNewTrades: function(b) {
      if (b === null) return;
      if (b.length == 0) return;
      if (a.initialized) {
        var c = b[0],
          d = b.slice(1);
        a.handleNewTrade(c, {
          animate: !0
        }), d.length > 0 && cryptowatch.utils.nextFrame(a.handleNewTrades.bind(a, d))
      } else b.forEach(function(b) {
        a.handleNewTrade(b, {
          animate: !1
        })
      })
    },
    handleNewTrade: function(b, c) {
      if (a.lastTime && b.Timestamp * 1e3 < a.lastTime.unix) return;
      b.Timestamp > 1e11 && (b.Timestamp /= 1e3, console.warn("Getting timestamps in millis"));
      if (a.lastTrade && a.lastTrade.Timestamp === b.Timestamp && a.lastTrade.High === b.High && a.lastTrade.Low === b.Low && a.lastTrade.Amount === b.Amount) return;
      a.lastTrade = b;
      var d = 16;
      cryptowatch.ticker.handlePrice(b.Price);
      var e = new Date(b.Timestamp * 1e3),
        f = e.getHours(),
        g = e.getMinutes(),
        h = e.getSeconds(),
        i = e.valueOf(),
        j = $('<span class="trade-time-hour">' + f + "</span>"),
        k = $('<span class="trade-time-minute">:' + cryptowatch.utils._doubleDigits(g) + "</span>"),
        l = $('<span class="trade-time-second">:' + cryptowatch.utils._doubleDigits(h) + "</span>"),
        m = $('<div class="trade-time"></div>');
      f > 12 && (f -= 12), m.append(j).append(k).append(l), a.lastTime !== null && (f === a.lastTime.hour && j.addClass("invisible"), g === a.lastTime.minute && k.addClass("invisible"), h === a.lastTime.second && l.addClass("invisible")), a.lastTime = {
        hour: f,
        minute: g,
        second: h,
        unix: i
      };
      var n;
      a.lastPosition === null ? n = "long" : b.Price === a.lastPrice ? n = a.lastPosition : b.Price < a.lastPrice ? n = "short" : n = "long";
      var o = $('<li class="trade ' + n + '">' + '<data class="trade-price" data-label="false" ' + 'data-quotecurrency="' + cryptowatch.currencyPair.quote + '"' + 'value="' + b.Price + '">' + cryptowatch.currency.fmt(b.Price, cryptowatch.currencyPair.quote, {
        label: !1
      }) + "</data> " + '<div class="trade-amount">' + cryptowatch.currency.fmt(b.Amount, cryptowatch.currencyPair.base, {
        label: !1
      }) + "</div>" + "</li>");
      a.lastPrice = b.Price, a.lastPosition = n, o.prepend(m), a.$ul.prepend(o), c.animate && cryptowatch.config.config.performance.animateFeeds && cryptowatch.nav.open.orderBook && (a.$ul.removeClass("zeroed").css({
        top: "-" + d + "px"
      }), cryptowatch.utils.nextFrame(function() {
        a.$ul.addClass("zeroed"), a.$ul.css({
          top: 0
        }), a.clearOutOldTrades()
      }))
    },
    clearOutOldTrades: function() {
      a.$ul.find(".trade").slice(150).remove()
    }
  };
  $(document).ready(function() {
    cryptowatch.feed.initialize()
  })
}(),
function() {
  var a = cryptowatch.hotkeys = {
    initialize: function() {},
    keypress: function(b) {
      var c = String.fromCharCode(b.which);
      a._down[c] !== undefined && a._down[c](b)
    },
    _down: {
      "+": function(a) {
        cryptowatch.chart.increaseCandleWidth()
      },
      "=": function(a) {
        cryptowatch.chart.increaseCandleWidth()
      },
      "-": function(a) {
        cryptowatch.chart.decreaseCandleWidth()
      },
      1: function(a) {
        cryptowatch.chart.defaultCandleWidth()
      },
      o: function(a) {
        cryptowatch.nav.toggleOrderBook()
      },
      " ": function(a) {
        cryptowatch.chart.POSITION = cryptowatch.chart.config.defaultPosition(), cryptowatch.chart.nudge(0), cryptowatch.chart.refresh.all()
      },
      m: function(a) {
        cryptowatch.nav.dropdowns.market.toggle()
      },
      l: function(a) {
        cryptowatch.chart.selectTool("line")
      },
      j: function(a) {
        cryptowatch.chart.selectTool("crosshair")
      },
      r: function(a) {
        cryptowatch.chart.selectTool("fibonnaciRetracement")
      },
      f: function(a) {
        cryptowatch.chart.selectTool("fibonnaciFan")
      },
      a: function(a) {
        cryptowatch.chart.selectTool("fibonnaciArc")
      },
      w: function(a) {
        cryptowatch.chart.selectTool("arrow")
      },
      c: function(a) {
        cryptowatch.chart.selectTool("circle")
      },
      t: function(a) {
        $("#settings__trades").trigger("click")
      },
      y: function(a) {
        $("#settings__orders").trigger("click")
      }
    }
  };
  $(document).on("keydown", function(a) {
    if (a.metaKey || a.ctrlKey || a.altKey) return;
    console.log(a.which), $('[data-key-code="' + a.which + '"]').addClass("pushed"), a.which === 9 && a.preventDefault()
  }), $(document).on("keyup", function(a) {
    $('[data-key-code="' + a.which + '"]').removeClass("pushed")
  }), $(document).on("keypress", function(b) {
    a.keypress(b)
  }), $('input[type="text"], input[type="password"]').keydown(function(a) {
    a.stopPropagation()
  }), $('input[type="text"], input[type="password"]').keypress(function(a) {
    a.stopPropagation()
  })
}(),
function() {
  var a = cryptowatch.updater = {
    initialize: function() {
      a.$button = $("#open-update-client"), a.$countdown = $("#update-client-countdown"), a.$cancel = $("#update-client-cancel"), a.$cancel.click(a._cancel)
    },
    _writeCountdown: function() {
      a.$countdown.text(a._countdown)
    },
    _count: function() {
      a._countdown--, a._writeCountdown(), a._countdown === 0 && (clearInterval(a._countdownInterval), a._refresh())
    },
    handleUpdate: function() {
      if (cryptowatch.chart._blurred) {
        a._refresh();
        return
      }
      a._countdown = 60 + Math.round(Math.random() * 20), a.$button.show(), a._writeCountdown(), a._countdownInterval = setInterval(a._count, 1e3)
    },
    _cancel: function() {
      clearInterval(a._countdownInterval), a.$button.hide(), cryptowatch.nav.dropdowns["update-client"].close()
    },
    _refresh: function() {
      cryptowatch.chart.cachePosition(), window.location = window.location
    }
  };
  a.initialize()
}();