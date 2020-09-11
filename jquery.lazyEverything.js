(function (root, factory)
{
	if (typeof exports === "object") module.exports = factory(root);
	else if (typeof define === "function" && define.amd) define([], factory);
	else root.LazyLoadElement = factory(root);
})(typeof global !== "undefined" ? global : this.window || this.global, function (root)
{
	"use strict";
	if (typeof define === "function" && define.amd) root = window;
	const defaults = { root: null, rootMargin: "0px", threshold: 0 };
	function LazyLoadElement(elements, options)
	{
		if (elements == null || elements.length == 0) return;

		this.settings = $.extend(defaults, options || {}, true);
		this.elements = elements;

		this.init = function ()
		{
			/* Without observers load everything and bail out early. */
			if (!root.IntersectionObserver) { this.load(); return; };
			var $this = this;
			let observerConfig = {
				root: this.settings.root,
				rootMargin: this.settings.rootMargin,
				threshold: [this.settings.threshold]
			};

			this.observer = new IntersectionObserver(function (entries)
			{
				Array.prototype.forEach.call(entries, function (entry)
				{
					if (entry.isIntersecting)
					{
						$this.observer.unobserve(entry.target);
						$this.loadHelper(entry.target);
					}
				});
			}, observerConfig);

			Array.prototype.forEach.call(this.elements, function (element) { $this.observer.observe(element); });
		}

		this.load = function () { var $this = this; Array.prototype.forEach.call(this.elements, function (element) { $this.loadHelper(element); }); };
		this.loadHelper = function (element) { if (this.settings.onLazy != null) this.settings.onLazy($(element)); };
		this.destroy = function () { this.observer.disconnect(); this.settings = null; };
		this.loadAndDestroy = function () { this.load(); this.destroy(); };
		this.observer = null;
		this.init();
	}
	root.lazyLoadElement = function (elements, options) { return new LazyLoadElement(elements, options); };
	if (root.jQuery) {
		const $ = root.jQuery;
		$.fn.lazyLoadElement = function (options) {
			options = options || {};
			return new LazyLoadElement($.makeArray(this), options);
		};
	}
	return LazyLoadElement;
});
function PageLazy()
{
	this.start = function ()
	{
		var $this = this;
		$("[data-lazy]").lazyLoadElement({
			onLazy: function (element)
			{
				var func = element.attr("data-lazy");				
				if (func != null && func != "") $this[func](element);
			}
		});
	}
}
