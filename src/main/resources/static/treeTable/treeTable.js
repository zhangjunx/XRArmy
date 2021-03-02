/** 树形表格3.x Created by wangfan on 2020-05-12 https://gitee.com/whvse/treetable-lay */
layui.define(["laytpl", "form", "util"], function(s) {
	var g = layui.jquery;
	var d = layui.laytpl;
	var c = layui.form;
	var b = layui.util;
	var o = layui.device();
	var h = "treeTable";
	var k = {};
	var e = {
		elem: undefined,
		cols: undefined,
		url: undefined,
		method: undefined,
		where: undefined,
		contentType: undefined,
		headers: undefined,
		parseData: undefined,
		request: {
			pidName: "pid"
		},
		toolbar: undefined,
		defaultToolbar: undefined,
		width: undefined,
		height: undefined,
		cellMinWidth: 90,
		done: undefined,
		data: undefined,
		title: undefined,
		skin: undefined,
		even: undefined,
		size: undefined,
		text: {
			none: "无数据"
		},
		reqData: undefined,
		useAdmin: false,
		tree: {
			idName: "id",
			pidName: "pid",
			childName: "children",
			haveChildName: "haveChild",
			openName: "open",
			iconIndex: 0,
			arrowType: undefined,
			onlyIconControl: undefined,
			getIcon: function(u) {
				var t = u[this.haveChildName];
				if (t !== undefined) {
					t = t === true || t === "true"
				} else {
					if (u[this.childName]) {
						t = u[this.childName].length > 0
					}
				}
				if (t) {
					return '<i class="ew-tree-icon layui-icon layui-icon-layer"></i>'
				} else {
					return '<i class="ew-tree-icon layui-icon layui-icon-file"></i>'
				}
			}
		}
	};
	var r = {
		field: undefined,
		title: undefined,
		width: undefined,
		minWidth: undefined,
		type: "normal",
		fixed: undefined,
		hide: undefined,
		unresize: undefined,
		style: undefined,
		align: undefined,
		colspan: undefined,
		rowspan: undefined,
		templet: undefined,
		toolbar: undefined,
		"class": undefined,
		singleLine: undefined
	};
	var p = function(t) {
		k[t.elem.substring(1)] = this;
		this.reload(t)
	};
	p.prototype.initOptions = function(t) {
		var D = this;

		function B(J) {
			if (!J.INIT_OK) {
				J = g.extend({
					INIT_OK: true
				}, r, J)
			}
			if (J.type === "space") {
				if (!J.width) {
					J.width = 15
				}
				J.minWidth = J.width
			} else {
				if (J.type === "numbers") {
					if (!J.width) {
						J.width = 40
					}
					J.minWidth = J.width;
					if (!J.singleLine) {
						J.singleLine = false
					}
					if (!J.unresize) {
						J.unresize = true
					}
					if (!J.align) {
						J.align = "center"
					}
				} else {
					if (J.type === "checkbox" || J.type === "radio") {
						if (!J.width) {
							J.width = 48
						}
						J.minWidth = J.width;
						if (!J.singleLine) {
							J.singleLine = false
						}
						if (!J.unresize) {
							J.unresize = true
						}
						if (!J.align) {
							J.align = "center"
						}
					}
				}
			}
			if (J.toolbar) {
				J.type = "tool"
			}
			return J
		}
		if ("Array" !== l(t.cols[0])) {
			t.cols = [t.cols]
		}
		for (var w = 0; w < t.cols.length; w++) {
			for (var u = 0; u < t.cols[w].length; u++) {
				t.cols[w][u].INIT_OK = undefined;
				t.cols[w][u].key = undefined;
				t.cols[w][u].colGroup = undefined;
				t.cols[w][u].HAS_PARENT = undefined;
				t.cols[w][u].parentKey = undefined;
				t.cols[w][u].PARENT_COL_INDEX = undefined
			}
		}
		var F = [],
			G = 0;
		for (var y = 0; y < t.cols.length; y++) {
			var C = t.cols[y];
			for (var x = 0; x < C.length; x++) {
				var A = C[x];
				if (!A) {
					C.splice(x, 1);
					continue
				}
				A = B(A);
				A.key = y + "-" + x;
				var I = undefined;
				if (A.colGroup || A.colspan > 1) {
					A.colGroup = true;
					A.type = "group";
					I = [];
					G++;
					var z = 0;
					for (var v = 0; v < t.cols[y + 1].length; v++) {
						var H = g.extend({
							INIT_OK: true
						}, r, t.cols[y + 1][v]);
						if (H.HAS_PARENT || (z > 1 && z == A.colspan)) {
							t.cols[y + 1][v] = H;
							continue
						}
						H.HAS_PARENT = true;
						H.parentKey = y + "-" + x;
						H.key = (y + 1) + "-" + v;
						H.PARENT_COL_INDEX = G;
						H = B(H);
						I.push(H);
						z = z + parseInt(H.colspan > 1 ? H.colspan : 1);
						t.cols[y + 1][v] = H
					}
				}
				A.CHILD_COLS = I;
				if (!A.PARENT_COL_INDEX) {
					F.push(A)
				}
				t.cols[y][x] = A
			}
		}
		this.options = g.extend(true, {}, e, t);
		this.options.colArrays = F;
		if (this.options.url) {
			this.options.reqData = function(J, K) {
				if (!D.options.where) {
					D.options.where = {}
				}
				if (J) {
					D.options.where[D.options.request.pidName] = J[D.options.tree.idName]
				}(D.options.useAdmin ? layui.admin : g).ajax({
					url: D.options.url,
					data: D.options.contentType && D.options.contentType.indexOf("application/json") === 0 ? JSON.stringify(D.options
						.where) : D.options.where,
					headers: D.options.headers,
					type: D.options.method,
					dataType: "json",
					contentType: D.options.contentType,
					success: function(L) {
						if (D.options.parseData) {
							L = D.options.parseData(L)
						}
						if (L.code == 0) {
							K(L.data)
						} else {
							K(L.msg || "加载失败")
						}
					},
					error: function(L) {
						K(L.status + " - " + L.statusText)
					}
				})
			}
		} else {
			if (this.options.data && this.options.data.length > 0 && this.options.tree.isPidData) {
				this.options.data = a.pidToChildren(this.options.data, this.options.tree.idName, this.options.tree.pidName, this
					.options.tree.childName)
			}
		}
		if ("default" === this.options.toolbar) {
			this.options.toolbar = ["<div>", '   <div class="ew-tree-table-tool-item" title="添加" lay-event="add">',
				'      <i class="layui-icon layui-icon-add-1"></i>', "   </div>",
				'   <div class="ew-tree-table-tool-item" title="修改" lay-event="update">',
				'      <i class="layui-icon layui-icon-edit"></i>', "   </div>",
				'   <div class="ew-tree-table-tool-item" title="删除" lay-event="delete">',
				'      <i class="layui-icon layui-icon-delete"></i>', "   </div>", "</div>"
			].join("")
		}
		if (this.options.defaultToolbar === undefined) {
			this.options.defaultToolbar = ["filter", "exports", "print"]
		}
		if (typeof this.options.tree.getIcon === "string") {
			var E = this.options.tree.getIcon;
			this.options.tree.getIcon = function(K) {
				if (E !== "ew-tree-icon-style2") {
					return E
				}
				var J = K[this.haveChildName];
				if (J !== undefined) {
					J = J === true || J === "true"
				} else {
					if (K[this.childName]) {
						J = K[this.childName].length > 0
					}
				}
				if (J) {
					return '<i class="ew-tree-icon ew-tree-icon-folder"></i>'
				} else {
					return '<i class="ew-tree-icon ew-tree-icon-file"></i>'
				}
			}
		}
	};
	p.prototype.init = function() {
		var E = this.options;
		var u = g(E.elem);
		var B = E.elem.substring(1);
		u.removeAttr("lay-filter");
		if (u.next(".ew-tree-table").length === 0) {
			u.css("display", "none");
			u.after(['<div class="layui-form ew-tree-table" lay-filter="', B, '" style="', E.style || "", '">',
				'   <div class="ew-tree-table-tool" style="display: none;"></div>', '   <div class="ew-tree-table-head">',
				'      <table class="layui-table"></table>', "   </div>", '   <div class="ew-tree-table-box">',
				'      <table class="layui-table"></table>', '      <div class="ew-tree-table-loading">',
				'         <i class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></i>',
				"      </div>", '      <div class="ew-tree-table-empty">', E.text.none || "", "</div>", "   </div>", "</div>"
			].join(""))
		}
		var A = this.getComponents();
		if (E.skin) {
			A.$table.attr("lay-skin", E.skin)
		}
		if (E.size) {
			A.$table.attr("lay-size", E.size)
		}
		if (E.even) {
			A.$table.attr("lay-even", E.even)
		}
		A.$toolbar.empty();
		if (E.toolbar === false || E.toolbar === undefined) {
			A.$toolbar.hide()
		} else {
			A.$toolbar.show();
			if (typeof E.toolbar === "string") {
				d(g(E.toolbar).html()).render({}, function(F) {
					A.$toolbar.html('<div style="display: inline-block;">' + F + "</div>")
				})
			}
			var C = ['<div class="ew-tree-table-tool-right">'];
			for (var y = 0; y < E.defaultToolbar.length; y++) {
				var w;
				if ("filter" === E.defaultToolbar[y]) {
					w = {
						title: "筛选",
						layEvent: "LAYTABLE_COLS",
						icon: "layui-icon-cols"
					}
				} else {
					if ("exports" === E.defaultToolbar[y]) {
						w = {
							title: "导出",
							layEvent: "LAYTABLE_EXPORT",
							icon: "layui-icon-export"
						}
					} else {
						if ("print" === E.defaultToolbar[y]) {
							w = {
								title: "打印",
								layEvent: "LAYTABLE_PRINT",
								icon: "layui-icon-print"
							}
						} else {
							w = E.defaultToolbar[y]
						}
					}
				}
				if (w) {
					C.push('<div class="ew-tree-table-tool-item"');
					C.push(' title="' + w.title + '"');
					C.push(' lay-event="' + w.layEvent + '">');
					C.push('<i class="layui-icon ' + w.icon + '"></i></div>')
				}
			}
			A.$toolbar.append(C.join("") + "</div>")
		}
		if (E.width) {
			A.$view.css("width", E.width);
			A.$tHeadGroup.css("width", E.width);
			A.$tBodyGroup.css("width", E.width)
		}
		var v = this.resize(true);
		var D = "<thead>" + this.renderBodyTh() + "</thead>";
		A.$tBodyGroup.children("style").remove();
		if (E.height) {
			A.$tHead.html(v + D);
			A.$tBody.html(v + "<tbody></tbody>");
			if (E.height.indexOf("full-") === 0) {
				var z = parseFloat(E.height.substring(5)) + A.$toolbar.outerHeight() + A.$tHeadGroup.outerHeight() + 1;
				A.$tBodyGroup.append(['<style>[lay-filter="', B, '"] .ew-tree-table-box {', "   height: ", m() - z, "px;",
					"   height: -moz-calc(100vh - ", z, "px);", "   height: -webkit-calc(100vh - ", z, "px);",
					"   height: calc(100vh - ", z, "px);", "}</style>"
				].join(""));
				A.$tBodyGroup.data("full", z);
				A.$tBodyGroup.css("height", "")
			} else {
				A.$tBodyGroup.css("height", E.height);
				A.$tBodyGroup.data("full", "")
			}
			A.$tHeadGroup.show()
		} else {
			A.$tHeadGroup.hide();
			var x = {
				lg: 50,
				sm: 30,
				md: 38
			};
			A.$tBodyGroup.append(['<style>[lay-filter="', B, '"] .ew-tree-table-box:before {', '   content: "";',
				"   position: absolute;", "   top: 0; left: 0; right: 0;", "   height: " + (x[E.size || "md"] * E.cols.length) +
				"px;", "   background-color: #f2f2f2;", "   border-bottom: 1px solid #e6e6e6;", "}</style>"
			].join(""));
			A.$tBody.html(v + D + "<tbody></tbody>")
		}
		c.render("checkbox", B);

		function t(H) {
			var F = H.data("parent"),
				G;
			if (!F) {
				return
			}
			var I = A.$table.children("thead").children("tr").children('[data-key="' + F + '"]');
			var J = I.attr("colspan") - 1;
			I.attr("colspan", J);
			if (J === 0) {
				I.addClass("layui-hide")
			}
			t(I)
		}
		A.$table.children("thead").children("tr").children("th.layui-hide").each(function() {
			t(g(this))
		});
		if (E.reqData) {
			this.options.data = undefined;
			this.renderBodyAsync()
		} else {
			if (E.data && E.data.length > 0) {
				this.renderBodyData(E.data)
			} else {
				A.$loading.hide();
				A.$empty.show()
			}
		}
	};
	p.prototype.bindEvents = function() {
		var v = this;
		var t = this.options;
		var u = this.getComponents();
		var w = u.$table.children("tbody");
		var x = function(y) {
			var z = g(this);
			if (!z.is("tr")) {
				var C = z.parent("tr");
				if (C.length > 0) {
					z = C
				} else {
					z = z.parentsUntil("tr").last().parent()
				}
			}
			var A = v.getDataByTr(z);
			var B = {
				tr: z,
				data: A,
				del: function() {
					var F = z.data("index");
					var D = parseInt(z.data("indent"));
					z.nextAll("tr").each(function() {
						if (parseInt(g(this).data("indent")) <= D) {
							return false
						}
						g(this).remove()
					});
					var G = (typeof F === "number" ? 1 : F.split("-").length);
					z.nextAll("tr").each(function() {
						var H = g(this);
						if (parseInt(H.data("indent")) < D) {
							return false
						}
						var I = H.data("index").toString().split("-");
						I[G - 1] = parseInt(I[G - 1]) - 1;
						H.data("index", I.join("-"))
					});
					var E = z.prevAll("tr");
					v.del(undefined, F);
					z.remove();
					v.renderNumberCol();
					E.each(function() {
						var H = parseInt(g(this).data("indent"));
						if (H >= D) {
							return true
						}
						v.checkParentCB(g(this));
						D = H
					});
					v.checkChooseAllCB();
					if (t.data.length === 0) {
						u.$empty.show()
					}
					f(u.$view)
				},
				update: function(E) {
					A = g.extend(true, A, E);
					var D = parseInt(z.data("indent"));
					v.renderBodyTr(A, D, undefined, z);
					c.render(null, u.filter);
					v.renderNumberCol();
					z.prevAll("tr").each(function() {
						var F = parseInt(g(this).data("indent"));
						if (F >= D) {
							return true
						}
						v.checkParentCB(g(this));
						D = F
					});
					v.checkChooseAllCB()
				}
			};
			return g.extend(B, y)
		};
		w.off("click.fold").on("click.fold", ".ew-tree-pack", function(C) {
			layui.stope(C);
			var A = g(this).parentsUntil("tr").last().parent();
			if (A.hasClass("ew-tree-table-loading")) {
				return
			}
			var y = A.data("have-child");
			if (y !== true && y !== "true") {
				return
			}
			var z = A.hasClass("ew-tree-table-open");
			var B = v.getDataByTr(A);
			if (!z && !B[t.tree.childName]) {
				v.renderBodyAsync(B, A)
			} else {
				B[t.tree.openName] = i(A)
			}
		});
		w.off("click.tool").on("click.tool", "*[lay-event]", function(z) {
			layui.stope(z);
			var y = g(this);
			layui.event.call(this, h, "tool(" + u.filter + ")", x.call(this, {
				event: y.attr("lay-event")
			}))
		});
		c.on("radio(" + u.radioFilter + ")", function(y) {
			var z = v.getDataByTr(g(y.elem).parentsUntil("tr").last().parent());
			v.removeAllChecked();
			z.LAY_CHECKED = true;
			z.LAY_INDETERMINATE = false;
			layui.event.call(this, h, "checkbox(" + u.filter + ")", {
				checked: true,
				data: z,
				type: "one"
			})
		});
		c.on("checkbox(" + u.checkboxFilter + ")", function(C) {
			var B = C.elem.checked;
			var E = g(C.elem);
			var z = E.next(".layui-form-checkbox");
			if (!B && E.hasClass("ew-form-indeterminate")) {
				B = true;
				E.prop("checked", B);
				z.addClass("layui-form-checked");
				E.removeClass("ew-form-indeterminate")
			}
			var A = E.parentsUntil("tr").last().parent();
			var D = v.getDataByTr(A);
			D.LAY_CHECKED = B;
			D.LAY_INDETERMINATE = false;
			if (D[t.tree.childName] && D[t.tree.childName].length > 0) {
				v.checkSubCB(A, B)
			}
			var y = parseInt(A.data("indent"));
			A.prevAll("tr").each(function() {
				var F = parseInt(g(this).data("indent"));
				if (F < y) {
					v.checkParentCB(g(this));
					y = F
				}
			});
			v.checkChooseAllCB();
			layui.event.call(this, h, "checkbox(" + u.filter + ")", {
				checked: B,
				data: D,
				type: "more"
			})
		});
		c.on("checkbox(" + u.chooseAllFilter + ")", function(A) {
			var z = A.elem.checked;
			var B = g(A.elem);
			var y = B.next(".layui-form-checkbox");
			if (!t.data || t.data.length === 0) {
				B.prop("checked", false);
				y.removeClass("layui-form-checked");
				B.removeClass("ew-form-indeterminate");
				return
			}
			if (!z && B.hasClass("ew-form-indeterminate")) {
				z = true;
				B.prop("checked", z);
				y.addClass("layui-form-checked");
				B.removeClass("ew-form-indeterminate")
			}
			layui.event.call(this, h, "checkbox(" + u.filter + ")", {
				checked: z,
				type: "all"
			});
			v.checkSubCB(u.$tBody.children("tbody"), z)
		});
		w.off("click.row").on("click.row", "tr", function() {
			layui.event.call(this, h, "row(" + u.filter + ")", x.call(this, {}))
		});
		w.off("dblclick.rowDouble").on("dblclick.rowDouble", "tr", function() {
			layui.event.call(this, h, "rowDouble(" + u.filter + ")", x.call(this, {}))
		});
		w.off("click.cell").on("click.cell", "td", function(C) {
			var y = g(this);
			var E = y.data("type");
			if (E === "checkbox" || E === "radio") {
				return layui.stope(C)
			}
			var H = y.data("edit");
			var G = y.data("field");
			if (H) {
				layui.stope(C);
				if (w.find(".ew-tree-table-edit").length > 0) {
					return
				}
				var B = y.data("index");
				var z = y.find(".ew-tree-table-indent").length;
				var D = v.getDataByTr(y.parent());
				if ("text" === H || "number" === H) {
					var F = g('<input type="' + H + '" class="layui-input ew-tree-table-edit"/>');
					F[0].value = D[G];
					y.append(F);
					F.focus();
					F.blur(function() {
						var K = g(this).val();
						if (K == D[G]) {
							return g(this).remove()
						}
						var I = layui.event.call(this, h, "edit(" + u.filter + ")", x.call(this, {
							value: K,
							field: G
						}));
						if (I === false) {
							g(this).addClass("layui-form-danger");
							g(this).focus()
						} else {
							D[G] = K;
							var J = y.data("key").split("-");
							v.renderBodyTd(D, z, B, y, t.cols[J[0]][J[1]])
						}
					})
				} else {
					console.error("不支持的单元格编辑类型:" + H)
				}
			} else {
				var A = layui.event.call(this, h, "cell(" + u.filter + ")", x.call(this, {
					td: y,
					field: G
				}));
				if (A === false) {
					layui.stope(C)
				}
			}
		});
		w.off("dblclick.cellDouble").on("dblclick.cellDouble", "td", function(C) {
			var D = g(this);
			var z = D.data("type");
			if (z === "checkbox" || z === "radio") {
				return layui.stope(C)
			}
			var A = D.data("edit");
			var B = D.data("field");
			if (A) {
				return layui.stope(C)
			}
			var y = layui.event.call(this, h, "cellDouble(" + u.filter + ")", x.call(this, {
				td: D,
				field: B
			}));
			if (y === false) {
				layui.stope(C)
			}
		});
		u.$toolbar.off("click.toolbar").on("click.toolbar", "*[lay-event]", function(A) {
			layui.stope(A);
			var z = g(this);
			var y = z.attr("lay-event");
			if ("LAYTABLE_COLS" === y) {
				v.toggleCol()
			} else {
				if ("LAYTABLE_EXPORT" === y) {
					v.exportData("show")
				} else {
					if ("LAYTABLE_PRINT" === y) {
						v.printTable()
					} else {
						layui.event.call(this, h, "toolbar(" + u.filter + ")", {
							event: y,
							elem: z
						})
					}
				}
			}
		});
		u.$tBodyGroup.on("scroll", function() {
			var y = g(this);
			u.$tHeadGroup.scrollLeft(y.scrollLeft())
		});
		u.$toolbar.off("click.export").on("click.export", ".layui-table-tool-panel>[data-type]", function() {
			var y = g(this).data("type");
			if ("csv" === y || "xls" === y) {
				v.exportData(y)
			}
		});
		u.$toolbar.off("click.panel").on("click.panel", ".layui-table-tool-panel", function(y) {
			layui.stope(y)
		});
		c.on("checkbox(" + u.colsToggleFilter + ")", function(y) {
			v.toggleCol(y.elem.checked, undefined, y.value)
		})
	};
	p.prototype.getComponents = function() {
		var v = g(this.options.elem).next(".ew-tree-table");
		var t = v.attr("lay-filter");
		var w = v.children(".ew-tree-table-head");
		var u = v.children(".ew-tree-table-box");
		return {
			$view: v,
			filter: t,
			$tHeadGroup: w,
			$tBodyGroup: u,
			$tHead: w.children(".layui-table"),
			$tBody: u.children(".layui-table"),
			$table: v.find(".layui-table"),
			$toolbar: v.children(".ew-tree-table-tool"),
			$empty: u.children(".ew-tree-table-empty"),
			$loading: u.children(".ew-tree-table-loading"),
			checkboxFilter: "ew_tb_checkbox_" + t,
			radioFilter: "ew_tb_radio_" + t,
			chooseAllFilter: "ew_tb_choose_all_" + t,
			colsToggleFilter: "ew_tb_toggle_cols" + t
		}
	};
	p.prototype.eachCols = function(w, v) {
		if (!v) {
			v = this.options.colArrays
		}
		for (var t = 0; t < v.length; t++) {
			var u = v[t];
			w && w(t, u);
			if (u.CHILD_COLS) {
				this.eachCols(w, u.CHILD_COLS)
			}
		}
	};
	p.prototype.eachData = function(w, v) {
		if (!v) {
			v = this.options.data
		}
		for (var t = 0; t < v.length; t++) {
			var u = v[t];
			w && w(t, u);
			if (u[this.options.tree.childName]) {
				this.eachData(w, u[this.options.tree.childName])
			}
		}
	};
	p.prototype.renderBodyAsync = function(x, w) {
		var v = this;
		var t = this.options;
		var u = this.getComponents();
		if (w) {
			w.addClass("ew-tree-table-loading");
			w.find(".ew-tree-pack").children(".ew-tree-table-arrow").addClass("layui-anim layui-anim-rotate layui-anim-loop")
		} else {
			u.$empty.hide();
			if (t.data && t.data.length > 0) {
				u.$loading.addClass("ew-loading-float")
			}
			u.$loading.show()
		}
		t.reqData(x, function(y) {
			if (typeof y !== "string" && y && y.length > 0 && t.tree.isPidData) {
				y = a.pidToChildren(y, t.tree.idName, t.tree.pidName, t.tree.childName)
			}
			v.renderBodyData(y, x, w)
		})
	};
	p.prototype.renderBodyData = function(w, A, x) {
		var u;
		if (typeof w === "string") {
			u = w;
			w = []
		}
		var z = this;
		var C = this.options;
		var y = this.getComponents();
		if (A === undefined) {
			C.data = w
		} else {
			A[C.tree.childName] = w
		}
		var v;
		if (x) {
			v = parseInt(x.data("indent")) + 1;
			A[C.tree.openName] = true
		}
		var t = this.renderBody(w, v, A);
		if (x) {
			x.nextAll("tr").each(function() {
				if (parseInt(g(this).data("indent")) <= (v - 1)) {
					return false
				}
				g(this).remove()
			});
			x.after(t).addClass("ew-tree-table-open")
		} else {
			y.$tBody.children("tbody").html(t)
		}
		c.render(null, y.filter);
		this.renderNumberCol();
		if (x) {
			this.checkParentCB(x);
			x.prevAll("tr").each(function() {
				var D = parseInt(g(this).data("indent"));
				if (D < (v - 1)) {
					z.checkParentCB(g(this));
					v = D + 1
				}
			});
			x.removeClass("ew-tree-table-loading");
			var B = x.find(".ew-tree-pack").children(".ew-tree-table-arrow");
			B.removeClass("layui-anim layui-anim-rotate layui-anim-loop");
			if (u) {
				x.removeClass("ew-tree-table-open")
			} else {
				if (w && w.length === 0) {
					A[C.tree.haveChildName] = false;
					x.data("have-child", false);
					B.addClass("ew-tree-table-arrow-hide");
					B.next(".ew-tree-icon").after(C.tree.getIcon(A)).remove()
				}
			}
		} else {
			y.$loading.hide();
			y.$loading.removeClass("ew-loading-float");
			if (w && w.length > 0) {
				y.$empty.hide()
			} else {
				y.$empty.show();
				if (u) {
					y.$empty.text(u)
				} else {
					y.$empty.html(C.text.none)
				}
			}
		}
		this.checkChooseAllCB();
		f(y.$view);
		C.done && C.done(w)
	};
	p.prototype.renderBody = function(z, t, y) {
		var u = this.options;
		if (!t) {
			t = 0
		}
		var x = "";
		if (!z || z.length === 0) {
			return x
		}
		var w = y ? !y[u.tree.openName] : undefined;
		for (var v = 0; v < z.length; v++) {
			var A = z[v];
			A.LAY_INDEX = (y ? y.LAY_INDEX + "-" : "") + v;
			x += this.renderBodyTr(A, t, w);
			x += this.renderBody(A[u.tree.childName], t + 1, A)
		}
		return x
	};
	p.prototype.renderBodyTr = function(B, u, x, w) {
		var z = this;
		var C = this.options;
		if (!u) {
			u = 0
		}
		var A = B[C.tree.haveChildName];
		if (A === undefined) {
			A = B[C.tree.childName] && B[C.tree.childName].length > 0
		}
		if (w) {
			w.data("have-child", A ? "true" : "false");
			w.data("indent", u);
			w.removeClass("ew-tree-table-loading")
		}
		var v = "<tr";
		var t = "";
		if (A && B[C.tree.openName]) {
			t += "ew-tree-table-open"
		}
		if (x) {
			t += "ew-tree-tb-hide"
		}
		v += (' class="' + t + '"');
		if (A) {
			v += (' data-have-child="' + A + '"')
		}
		v += (' data-index="' + B.LAY_INDEX + '"');
		v += (' data-indent="' + u + '">');
		var y = 0;
		this.eachCols(function(E, D) {
			if (D.colGroup) {
				return
			}
			v += z.renderBodyTd(B, u, y, w ? w.children("td").eq(y) : undefined, D);
			y++
		});
		v += "</tr>";
		return v
	};
	p.prototype.renderBodyTd = function(C, v, A, t, u) {
		if (u.colGroup) {
			return ""
		}
		var F = this.options;
		var y = this.getComponents();
		if (!v) {
			v = 0
		}
		var B = "",
			E = "",
			D = "";
		if (u.type === "numbers") {
			B = '<span class="ew-tree-table-numbers"></span>'
		} else {
			if (u.type === "checkbox") {
				B = ['<input type="checkbox"', C.LAY_CHECKED ? ' checked="checked"' : "", ' lay-filter="', y.checkboxFilter, '"',
					' lay-skin="primary" class="ew-tree-table-checkbox', C.LAY_INDETERMINATE ? " ew-form-indeterminate" : "",
					'" />'
				].join("")
			} else {
				if (u.type === "radio") {
					B = ['<input type="radio"', C.LAY_CHECKED ? ' checked="checked"' : "", ' lay-filter="', y.radioFilter, '"',
						' name="', y.radioFilter, '"', ' class="ew-tree-table-radio" />'
					].join("")
				} else {
					if (u.templet) {
						if (typeof u.templet === "function") {
							B = u.templet(C)
						} else {
							if (typeof u.templet === "string") {
								d(g(u.templet).html()).render(C, function(G) {
									B = G
								})
							}
						}
					} else {
						if (u.toolbar) {
							if (typeof u.toolbar === "function") {
								B = u.toolbar(C)
							} else {
								if (typeof u.toolbar === "string") {
									d(g(u.toolbar).html()).render(C, function(G) {
										B = G
									})
								}
							}
						} else {
							if (u.field && C[u.field] !== undefined && C[u.field] !== null) {
								B = b.escape(C[u.field] === 0 ? "0" : C[u.field])
							}
						}
					}
				}
			}
		}
		if (A === F.tree.iconIndex) {
			for (var w = 0; w < v; w++) {
				D += '<span class="ew-tree-table-indent"></span>'
			}
			D += '<span class="ew-tree-pack">';
			var z = C[F.tree.haveChildName];
			if (z === undefined) {
				z = C[F.tree.childName] && C[F.tree.childName].length > 0
			}
			D += ('<i class="ew-tree-table-arrow layui-icon' + (z ? "" : " ew-tree-table-arrow-hide"));
			D += (" " + (F.tree.arrowType || "") + '"></i>');
			D += F.tree.getIcon(C);
			B = "<span>" + B + "</span>";
			if (F.tree.onlyIconControl) {
				B = D + "</span>" + B
			} else {
				B = D + B + "</span>"
			}
		}
		E = ['<div class="ew-tree-table-cell', u.singleLine === undefined || u.singleLine ? " single-line" : "", '"', u.align ?
			' align="' + u.align + '"' : "", ">", '   <div class="ew-tree-table-cell-content">', B, "</div>",
			'   <i class="layui-icon layui-icon-close ew-tree-tips-c"></i>',
			'   <div class="layui-table-grid-down" style="display: none;"><i class="layui-icon layui-icon-down"></i></div>',
			"</div>"
		].join("");
		if (t) {
			t.html(E)
		}
		var x = "<td";
		if (u.field) {
			x += (' data-field="' + u.field + '"')
		}
		if (u.edit) {
			x += (' data-edit="' + u.edit + '"')
		}
		if (u.type) {
			x += (' data-type="' + u.type + '"')
		}
		if (u.key) {
			x += (' data-key="' + u.key + '"')
		}
		if (u.style) {
			x += (' style="' + u.style + '"')
		}
		if (u["class"]) {
			x += (' class="' + u["class"] + (u.hide ? " layui-hide" : "") + '"')
		} else {
			if (u.hide) {
				x += (' class="layui-hide"')
			}
		}
		x += (">" + E + "</td>");
		return x
	};
	p.prototype.renderBodyTh = function() {
		var t = this.options;
		var v = this.getComponents();
		var u = [];
		g.each(t.cols, function(x, w) {
			u.push("<tr>");
			g.each(w, function(A, z) {
				u.push("<th");
				if (z.colspan) {
					u.push(' colspan="' + z.colspan + '"')
				}
				if (z.rowspan) {
					u.push(' rowspan="' + z.rowspan + '"')
				}
				if (z.type) {
					u.push(' data-type="' + z.type + '"')
				}
				if (z.key) {
					u.push(' data-key="' + z.key + '"')
				}
				if (z.parentKey) {
					u.push(' data-parent="' + z.parentKey + '"')
				}
				if (z.hide) {
					u.push(' class="layui-hide"')
				}
				u.push(">");
				u.push('<div class="ew-tree-table-cell' + (z.singleLine === undefined || z.singleLine ? " single-line" : "") +
					'"');
				if (z.thAlign || z.align) {
					u.push(' align="' + (z.thAlign || z.align) + '"')
				}
				u.push(">");
				u.push('<div class="ew-tree-table-cell-content">');
				var y = '<input type="checkbox" lay-filter="' + v.chooseAllFilter +
					'" lay-skin="primary" class="ew-tree-table-checkbox"/>';
				if (z.type === "checkbox") {
					u.push(y)
				} else {
					u.push(z.title || "")
				}
				u.push('</div><i class="layui-icon layui-icon-close ew-tree-tips-c"></i>');
				u.push(
					'<div class="layui-table-grid-down" style="display: none;"><i class="layui-icon layui-icon-down"></i></div></div>'
				);
				if (!z.colGroup && !z.unresize) {
					u.push('<span class="ew-tb-resize"></span>')
				}
				u.push("</th>")
			});
			u.push("</tr>")
		});
		return u.join("")
	};
	p.prototype.resize = function(z) {
		var t = this.options;
		var x = this.getComponents();
		var v = 1,
			u = 1,
			A = true,
			w = 0;
		this.eachCols(function(B, C) {
			if (C.colGroup || C.hide) {
				return
			}
			if (C.width) {
				u += (C.width + 1);
				if (C.minWidth) {
					if (C.width < C.minWidth) {
						C.width = C.minWidth
					}
				} else {
					if (C.width < t.cellMinWidth) {
						C.width = t.cellMinWidth
					}
				}
			} else {
				A = false
			}
			if (C.width) {
				v += (C.width + 1)
			} else {
				if (C.minWidth) {
					v += (C.minWidth + 1);
					w += C.minWidth
				} else {
					v += (t.cellMinWidth + 1);
					w += t.cellMinWidth
				}
			}
		});
		if (v) {
			x.$tHead.css("min-width", v);
			x.$tBody.css("min-width", v)
		} else {
			x.$tHead.css("min-width", "auto");
			x.$tBody.css("min-width", "auto")
		}
		if (A) {
			x.$tHead.css("width", u);
			x.$tBody.css("width", u)
		} else {
			x.$tHead.css("width", "100%");
			x.$tBody.css("width", "100%")
		}
		var y = [];
		this.eachCols(function(B, C) {
			if (C.colGroup || C.hide) {
				return
			}
			y.push("<col");
			if (C.width) {
				y.push(' width="' + C.width + '"')
			} else {
				if (C.minWidth) {
					y.push(' width="' + (C.minWidth / w * 100).toFixed(2) + '%"')
				} else {
					y.push(' width="' + (t.cellMinWidth / w * 100).toFixed(2) + '%"')
				}
			}
			if (C.type) {
				y.push(' data-type="' + C.type + '"')
			}
			if (C.key) {
				y.push(' data-key="' + C.key + '"')
			}
			y.push("/>")
		});
		y = y.join("");
		if (z) {
			return "<colgroup>" + y + "</colgroup>"
		}
		x.$table.children("colgroup").html(y)
	};
	p.prototype.getDataByTr = function(v) {
		var w, t;
		if (typeof v !== "string" && typeof v !== "number") {
			if (v) {
				t = v.data("index")
			}
		} else {
			t = v
		}
		if (t === undefined) {
			return
		}
		if (typeof t === "number") {
			t = [t]
		} else {
			t = t.split("-")
		}
		for (var u = 0; u < t.length; u++) {
			if (w) {
				w = w[this.options.tree.childName][t[u]]
			} else {
				w = this.options.data[t[u]]
			}
		}
		return w
	};
	p.prototype.checkSubCB = function(y, x) {
		var w = this;
		var v = this.getComponents();
		var t = -1,
			u;
		if (y.is("tbody")) {
			u = y.children("tr")
		} else {
			t = parseInt(y.data("indent"));
			u = y.nextAll("tr")
		}
		u.each(function() {
			if (parseInt(g(this).data("indent")) <= t) {
				return false
			}
			var A = g(this).children("td").find('input[lay-filter="' + v.checkboxFilter + '"]');
			A.prop("checked", x);
			A.removeClass("ew-form-indeterminate");
			if (x) {
				A.next(".layui-form-checkbox").addClass("layui-form-checked")
			} else {
				A.next(".layui-form-checkbox").removeClass("layui-form-checked")
			}
			var z = w.getDataByTr(g(this));
			z.LAY_CHECKED = x;
			z.LAY_INDETERMINATE = false
		})
	};
	p.prototype.checkParentCB = function(x) {
		var u = this.options;
		var w = this.getComponents();
		var z = this.getDataByTr(x);
		var y = 0,
			v = 0;
		if (z[u.tree.childName]) {
			function t(C) {
				for (var B = 0; B < C.length; B++) {
					if (C[B].LAY_CHECKED) {
						y++
					} else {
						v++
					}
					if (C[B][u.tree.childName]) {
						t(C[B][u.tree.childName])
					}
				}
			}
			t(z[u.tree.childName])
		}
		var A = x.children("td").find('input[lay-filter="' + w.checkboxFilter + '"]');
		if (y > 0 && v === 0) {
			A.prop("checked", true);
			A.removeClass("ew-form-indeterminate");
			A.next(".layui-form-checkbox").addClass("layui-form-checked");
			z.LAY_CHECKED = true;
			z.LAY_INDETERMINATE = false
		} else {
			if (y === 0 && v > 0) {
				A.prop("checked", false);
				A.removeClass("ew-form-indeterminate");
				A.next(".layui-form-checkbox").removeClass("layui-form-checked");
				z.LAY_CHECKED = false;
				z.LAY_INDETERMINATE = false
			} else {
				if (y > 0 && v > 0) {
					A.prop("checked", true);
					A.data("indeterminate", "true");
					A.addClass("ew-form-indeterminate");
					A.next(".layui-form-checkbox").addClass("layui-form-checked");
					z.LAY_CHECKED = true;
					z.LAY_INDETERMINATE = true
				}
			}
		}
	};
	p.prototype.checkChooseAllCB = function() {
		var u = this.options;
		var w = this.getComponents();
		var x = 0,
			v = 0;

		function t(A) {
			for (var z = 0; z < A.length; z++) {
				if (A[z].LAY_CHECKED) {
					x++
				} else {
					v++
				}
				if (A[z][u.tree.childName]) {
					t(A[z][u.tree.childName])
				}
			}
		}
		t(u.data);
		var y = w.$view.find('input[lay-filter="' + w.chooseAllFilter + '"]');
		if (x > 0 && v === 0) {
			y.prop("checked", true);
			y.removeClass("ew-form-indeterminate");
			y.next(".layui-form-checkbox").addClass("layui-form-checked")
		} else {
			if ((x === 0 && v > 0) || (x === 0 && v === 0)) {
				y.prop("checked", false);
				y.removeClass("ew-form-indeterminate");
				y.next(".layui-form-checkbox").removeClass("layui-form-checked")
			} else {
				if (x > 0 && v > 0) {
					y.prop("checked", true);
					y.addClass("ew-form-indeterminate");
					y.next(".layui-form-checkbox").addClass("layui-form-checked")
				}
			}
		}
	};
	p.prototype.renderNumberCol = function() {
		this.getComponents().$tBody.children("tbody").children("tr").each(function(t) {
			g(this).children("td").find(".ew-tree-table-numbers").text(t + 1)
		})
	};
	p.prototype.getIndexById = function(v) {
		var t = this.options;

		function u(x, y) {
			for (var w = 0; w < x.length; w++) {
				if (x[w][t.tree.idName] == v) {
					return y !== undefined ? y + "-" + w : w
				}
				if (x[w][t.tree.childName]) {
					return u(x[w][t.tree.childName], y !== undefined ? y + "-" + w : w)
				}
			}
		}
		return u(t.data)
	};
	p.prototype.expand = function(x, u) {
		var w = this.getComponents();
		var v = w.$table.children("tbody").children('tr[data-index="' + this.getIndexById(x) + '"]');
		if (!v.hasClass("ew-tree-table-open")) {
			v.children("td").find(".ew-tree-pack").trigger("click")
		}
		if (u === false) {
			return
		}
		var t = parseInt(v.data("indent"));
		v.prevAll("tr").each(function() {
			var y = parseInt(g(this).data("indent"));
			if (y < t) {
				if (!g(this).hasClass("ew-tree-table-open")) {
					g(this).children("td").find(".ew-tree-pack").trigger("click")
				}
				t = y
			}
		})
	};
	p.prototype.fold = function(v) {
		var u = this.getComponents();
		var t = u.$table.children("tbody").children('tr[data-index="' + this.getIndexById(v) + '"]');
		if (t.hasClass("ew-tree-table-open")) {
			t.children("td").find(".ew-tree-pack").trigger("click")
		}
	};
	p.prototype.expandAll = function() {
		this.getComponents().$table.children("tbody").children("tr").each(function() {
			if (!g(this).hasClass("ew-tree-table-open")) {
				g(this).children("td").find(".ew-tree-pack").trigger("click")
			}
		})
	};
	p.prototype.foldAll = function() {
		this.getComponents().$table.children("tbody").children("tr").each(function() {
			if (g(this).hasClass("ew-tree-table-open")) {
				g(this).children("td").find(".ew-tree-pack").trigger("click")
			}
		})
	};
	p.prototype.getData = function() {
		return this.options.data
	};
	p.prototype.reload = function(t) {
		this.initOptions(this.options ? g.extend(true, this.options, t) : t);
		this.init();
		this.bindEvents()
	};
	p.prototype.checkStatus = function(t) {
		if (t === undefined) {
			t = true
		}
		var u = [];
		this.eachData(function(v, w) {
			if ((t || !w.LAY_INDETERMINATE) && w.LAY_CHECKED) {
				u.push(g.extend({
					isIndeterminate: w.LAY_INDETERMINATE
				}, w))
			}
		});
		return u
	};
	p.prototype.setChecked = function(u) {
		var w = this;
		var v = this.getComponents();
		var t = v.$table.find('input[lay-filter="' + v.radioFilter + '"]');
		if (t.length > 0) {
			t.each(function() {
				var x = w.getDataByTr(g(this).parentsUntil("tr").parent());
				if (x && u[u.length - 1] == x[w.options.tree.idName]) {
					g(this).next(".layui-form-radio").trigger("click");
					return false
				}
			})
		} else {
			v.$table.find('input[lay-filter="' + v.checkboxFilter + '"]').each(function() {
				var C = g(this);
				var y = C.next(".layui-form-checkbox");
				var z = C.prop("checked");
				var B = C.hasClass("ew-form-indeterminate");
				var A = w.getDataByTr(C.parentsUntil("tr").parent());
				for (var x = 0; x < u.length; x++) {
					if (A && u[x] == A[w.options.tree.idName]) {
						if (A[w.options.tree.childName] && A[w.options.tree.childName].length > 0) {
							continue
						}
						if (!z || B) {
							y.trigger("click")
						}
					}
				}
			})
		}
	};
	p.prototype.removeAllChecked = function() {
		this.checkSubCB(this.getComponents().$table.children("tbody"), false)
	};
	p.prototype.exportData = function(w) {
		var y = this.getComponents();
		if ("show" === w) {
			y.$toolbar.find(".layui-table-tool-panel").remove();
			y.$toolbar.find('[lay-event="LAYTABLE_EXPORT"]').append(['<ul class="layui-table-tool-panel">',
				'   <li data-type="csv">导出到 Csv 文件</li>', '   <li data-type="xls">导出到 Excel 文件</li>', "</ul>"
			].join(""))
		} else {
			if (o.ie) {
				return layer.msg("不支持ie导出")
			}
			if (!w) {
				w = "xls"
			}
			var u = [],
				t = [];
			this.eachCols(function(A, B) {
				if (B.type !== "normal" || B.hide) {
					return
				}
				u.push(B.title || "")
			});
			y.$tBody.children("tbody").children("tr").each(function() {
				var A = [];
				g(this).children("td").each(function() {
					var B = g(this);
					if (B.data("type") !== "normal" || B.hasClass("layui-hide")) {
						return true
					}
					A.push(B.text().trim().replace(/,/g, "，"))
				});
				t.push(A.join(","))
			});
			var v = document.createElement("a");
			var x = encodeURIComponent(u.join(",") + "\r\n" + t.join("\r\n"));
			var z = ({
				csv: "text/csv",
				xls: "application/vnd.ms-excel"
			})[w];
			v.href = "data:" + z + ";charset=utf-8,\ufeff" + x;
			v.download = (this.options.title || "table") + "." + w;
			document.body.appendChild(v);
			v.click();
			document.body.removeChild(v)
		}
	};
	p.prototype.printTable = function() {
		var w = this.getComponents();
		var z = w.$tHead.children("thead").html();
		if (!z) {
			z = w.$tBody.children("thead").html()
		}
		var x = w.$tBody.children("tbody").html();
		var v = w.$tBody.children("colgroup").html();
		var u = g(['<table class="ew-tree-table-print">', "   <colgroup>", v, "</colgroup>", "   <thead>", z, "</thead>",
			"   <tbody>", x, "</tbody>", "</table>"
		].join(""));
		u.find('col[data-type="checkbox"],col[data-type="radio"],col[data-type="tool"]').remove();
		u.find('td[data-type="checkbox"],td[data-type="radio"],td[data-type="tool"],.layui-hide').remove();

		function A(F) {
			var C = F.data("parent"),
				D;
			if (!C) {
				return
			}
			var E = u.children("thead").children("tr").children('[data-key="' + C + '"]');
			var G = parseInt(E.attr("colspan")) - 1;
			E.attr("colspan", G);
			if (G === 0) {
				E.remove()
			}
			A(E)
		}
		u.find('th[data-type="checkbox"],th[data-type="radio"],th[data-type="tool"]').each(function() {
			A(g(this))
		}).remove();
		var t = ["<style>", "   /* 打印表格样式 */", "   .ew-tree-table-print {", "      border: none;",
			"      border-collapse: collapse;", "      width: 100%;", "      table-layout: fixed;", "   }",
			"   .ew-tree-table-print td, .ew-tree-table-print th {", "      color: #555;", "      font-size: 14px;",
			"      padding: 9px 15px;", "      word-break: break-all;", "      border: 1px solid #888;",
			"      text-align: left;", "   }", "   .ew-tree-table-print .ew-tree-table-cell {", "      min-height: 20px;",
			"   }", "   /* 序号列样式 */",
			'   .ew-tree-table-print td[data-type="numbers"], .ew-tree-table-print th[data-type="numbers"] {',
			"      padding-left: 0;", "      padding-right: 0;", "   }", "   /* 单/复选框列样式 */",
			'   .ew-tree-table-print td[data-type="tool"], .ew-tree-table-print th[data-type="tool"], ',
			'   .ew-tree-table-print td[data-type="checkbox"], .ew-tree-table-print th[data-type="checkbox"], ',
			'   .ew-tree-table-print td[data-type="radio"], .ew-tree-table-print th[data-type="radio"] {',
			"      border: none;", "   }",
			"   .ew-tree-table-print td.layui-hide + td, .ew-tree-table-print th.layui-hide + th, ",
			'   .ew-tree-table-print td[data-type="tool"] + td, .ew-tree-table-print th[data-type="tool"] + th, ',
			'   .ew-tree-table-print td[data-type="checkbox"] + td, .ew-tree-table-print th[data-type="checkbox"] + th, ',
			'   .ew-tree-table-print td[data-type="radio"] + td, .ew-tree-table-print th[data-type="radio"] + th {',
			"      border-left: none;", "   }", "  /* 不显示的元素 */", "   .layui-hide, ",
			'   .ew-tree-table-print td[data-type="tool"] *, .ew-tree-table-print th[data-type="tool"] *, ',
			'   .ew-tree-table-print td[data-type="checkbox"] *, .ew-tree-table-print th[data-type="checkbox"] *, ',
			'   .ew-tree-table-print td[data-type="radio"] *, .ew-tree-table-print th[data-type="radio"] *, ',
			"   .layui-table-grid-down, .ew-tree-tips-c, .ew-tree-icon, .ew-tree-table-arrow.ew-tree-table-arrow-hide {",
			"      display: none;", "   }", "   /* tree缩进 */", "   .ew-tree-table-indent {", "      padding-left: 13px;",
			"   }", "   /* 箭头 */", "   .ew-tree-table-arrow {", "      position: relative;", "      padding-left: 13px;",
			"   }", "   .ew-tree-table-arrow:before {", '      content: "";', "      border: 5px solid transparent;",
			"      border-top-color: #666;", "      position: absolute;", "      left: 0;", "      top: 6px;", "   }",
			"</style>"
		].join("");
		var y = window.open("", "_blank");
		y.focus();
		var B = y.document;
		B.open();
		B.write(u[0].outerHTML + t);
		B.close();
		y.print();
		y.close()
	};
	p.prototype.toggleCol = function(A, z, B) {
		var w = this.getComponents();
		if (A === undefined) {
			w.$toolbar.find(".layui-table-tool-panel").remove();
			var x = ['<ul class="layui-table-tool-panel">'];
			this.eachCols(function(D, E) {
				if (E.type !== "normal") {
					return
				}
				x.push('<li><input type="checkbox" lay-skin="primary"');
				x.push(' lay-filter="' + w.colsToggleFilter + '"');
				x.push(' value="' + E.key + '" title="' + b.escape(E.title || "") + '"');
				x.push((E.hide ? "" : " checked") + "></li>")
			});
			w.$toolbar.find('[lay-event="LAYTABLE_COLS"]').append(x.join("") + "</ul>");
			c.render("checkbox", w.filter)
		} else {
			if (B) {
				var u = w.$table.children("tbody").children("tr").children('[data-key="' + B + '"]');
				var C = w.$table.children("thead").children("tr").children('[data-key="' + B + '"]');
				if (A) {
					u.removeClass("layui-hide");
					C.removeClass("layui-hide")
				} else {
					u.addClass("layui-hide");
					C.addClass("layui-hide")
				}
				var y = B.split("-");
				var v = this.options.cols[y[0]][y[1]];
				v.hide = !A;

				function t(G) {
					var D = G.data("parent"),
						E;
					if (!D) {
						return
					}
					var F = w.$table.children("thead").children("tr").children('[data-key="' + D + '"]');
					var H = F.attr("colspan");
					A ? H++ : H--;
					F.attr("colspan", H);
					if (H === 0) {
						F.addClass("layui-hide")
					} else {
						F.removeClass("layui-hide")
					}
					t(F)
				}
				t(C);
				this.eachCols(function(D, E) {
					if (E.key === B) {
						E.hide = v.hide
					}
				});
				this.resize()
			}
		}
	};
	p.prototype.filterData = function(y) {
		var A = this.getComponents();
		A.$loading.show();
		if (this.options.data.length > 0) {
			A.$loading.addClass("ew-loading-float")
		}
		var x = A.$table.children("tbody").children("tr");
		var u = [];
		if (typeof y === "string") {
			x.each(function() {
				var B = g(this).data("index");
				g(this).children("td").each(function() {
					if (g(this).text().indexOf(y) !== -1) {
						u.push(B);
						return false
					}
				})
			})
		} else {
			for (var w = 0; w < y.length; w++) {
				u.push(this.getIndexById(y[w]))
			}
		}
		x.addClass("ew-tree-table-filter-hide");
		for (var v = 0; v < u.length; v++) {
			var z = x.filter('[data-index="' + u[v] + '"]');
			z.removeClass("ew-tree-table-filter-hide");
			var t = parseInt(z.data("indent"));
			z.nextAll("tr").each(function() {
				if (parseInt(g(this).data("indent")) <= t) {
					return false
				}
				g(this).removeClass("ew-tree-table-filter-hide")
			});
			if (z.hasClass("ew-tree-table-open")) {
				i(z)
			}
			z.prevAll("tr").each(function() {
				var B = parseInt(g(this).data("indent"));
				if (B < t) {
					g(this).removeClass("ew-tree-table-filter-hide");
					if (!g(this).hasClass("ew-tree-table-open")) {
						i(g(this))
					}
					t = B
				}
			})
		}
		A.$loading.hide();
		A.$loading.removeClass("ew-loading-float");
		if (u.length === 0) {
			A.$empty.show()
		}
		f(A.$view)
	};
	p.prototype.clearFilter = function() {
		var t = this.getComponents();
		t.$table.children("tbody").children("tr").removeClass("ew-tree-table-filter-hide");
		if (this.options.data.length > 0) {
			t.$empty.hide()
		}
		f(t.$view)
	};
	p.prototype.refresh = function(x, v) {
		if (l(x) === "Array") {
			v = x;
			x = undefined
		}
		var u = this.getComponents();
		var w, t;
		if (x !== undefined) {
			t = u.$table.children("tbody").children('tr[data-index="' + this.getIndexById(x) + '"]');
			w = this.getDataByTr(t)
		}
		if (v) {
			if (this.data.length > 0) {
				u.$loading.addClass("ew-loading-float")
			}
			u.$loading.show();
			if (v.length > 0 && this.options.tree.isPidData) {
				this.renderBodyData(a.pidToChildren(v, this.options.tree.idName, this.options.tree.pidName, this.options.tree.childName),
					w, t)
			} else {
				this.renderBodyData(v, w, t)
			}
		} else {
			this.renderBodyAsync(w, t)
		}
	};
	p.prototype.del = function(x, u) {
		if (u === undefined) {
			u = this.getIndexById(x)
		}
		var t = (typeof u === "number" ? [u] : u.split("-"));
		var w = this.options.data;
		if (t.length > 1) {
			for (var v = 0; v < t.length - 1; v++) {
				w = w[parseInt(t[v])][this.options.tree.childName]
			}
		}
		w.splice(t[t.length - 1], 1)
	};
	p.prototype.update = function(u, t) {
		g.extend(true, this.getDataByTr(this.getIndexById(u)), t)
	};

	function i(v) {
		var t = parseInt(v.data("indent"));
		var u = v.hasClass("ew-tree-table-open");
		if (u) {
			v.removeClass("ew-tree-table-open");
			v.nextAll("tr").each(function() {
				if (parseInt(g(this).data("indent")) <= t) {
					return false
				}
				g(this).addClass("ew-tree-tb-hide")
			})
		} else {
			v.addClass("ew-tree-table-open");
			var w;
			v.nextAll("tr").each(function() {
				var x = parseInt(g(this).data("indent"));
				if (x <= t) {
					return false
				}
				if (w !== undefined && x > w) {
					return true
				}
				g(this).removeClass("ew-tree-tb-hide");
				if (!g(this).hasClass("ew-tree-table-open")) {
					w = parseInt(g(this).data("indent"))
				} else {
					w = undefined
				}
			})
		}
		f(v.parentsUntil(".ew-tree-table").last().parent());
		return u
	}

	function f(w) {
		var t = w.children(".ew-tree-table-head");
		var u = w.children(".ew-tree-table-box");
		var v = u.width() - u.prop("clientWidth");
		t.css("border-right", (v > 0 ? v : 0) + "px solid #f2f2f2")
	}
	g(window).resize(function() {
		g(".ew-tree-table").each(function() {
			f(g(this));
			var u = g(this).children(".ew-tree-table-box");
			var t = u.data("full");
			if (t && o.ie && o.ie < 10) {
				u.css("height", m() - t)
			}
		})
	});
	g(document).on("mouseenter", ".ew-tree-table-cell.single-line", function() {
		var t = g(this).children(".ew-tree-table-cell-content");
		if (t.prop("scrollWidth") > t.outerWidth()) {
			g(this).children(".layui-table-grid-down").show()
		}
	}).on("mouseleave", ".ew-tree-table-cell.single-line", function() {
		g(this).children(".layui-table-grid-down").hide()
	});
	g(document).on("click", ".ew-tree-table-cell>.layui-table-grid-down", function(w) {
		w.stopPropagation();
		j();
		var u = g(this).parent();
		u.addClass("ew-tree-tips-open");
		u.children(".layui-table-grid-down").hide();
		var t = u.parent().outerWidth() + 4;
		if (u.outerWidth() < t) {
			u.children(".ew-tree-table-cell-content").css({
				"width": t,
				"max-width": t
			})
		}
		var v = u.parents().filter(".ew-tree-table-box");
		if (v.length === 0) {
			v = u.parents().filter(".ew-tree-table-head")
		}
		if (v.length === 0) {
			return
		}
		if ((u.outerWidth() + u.offset().left) + 20 > v.offset().left + v.outerWidth()) {
			u.addClass("ew-show-left")
		}
		if ((u.outerHeight() + u.offset().top + 10) > v.offset().top + v.outerHeight()) {
			u.addClass("ew-show-bottom")
		}
	});
	g(document).on("click", ".ew-tree-table-cell>.ew-tree-tips-c", function() {
		j()
	});
	g(document).on("click", function() {
		j();
		g(".ew-tree-table .layui-table-tool-panel").remove()
	});
	g(document).on("click", ".ew-tree-table-cell.ew-tree-tips-open", function(t) {
		t.stopPropagation()
	});

	function j() {
		g(".ew-tree-table-cell").removeClass("ew-tree-tips-open ew-show-left ew-show-bottom");
		g(".ew-tree-table-cell>.ew-tree-table-cell-content").css({
			"width": "",
			"max-width": ""
		})
	}
	g(document).on("mousedown", ".ew-tb-resize", function(x) {
		layui.stope(x);
		var v = g(this);
		v.attr("move", "true");
		var u = v.parent().data("key");
		v.data("x", x.clientX);
		var t = v.parent().parent().parent().parent().children("colgroup").children('col[data-key="' + u + '"]').attr(
			"width");
		if (!t || t.toString().indexOf("%") !== -1) {
			t = v.parent().outerWidth()
		}
		v.data("width", t);
		g("body").addClass("ew-tree-table-resizing")
	}).on("mousemove", function(B) {
		var y = g('.ew-tree-table .ew-tb-resize[move="true"]');
		if (y.length === 0) {
			return
		}
		layui.stope(B);
		var t = y.data("x");
		var v = y.data("width");
		var u = parseFloat(v) + B.clientX - parseFloat(t);
		if (u <= 0) {
			u = 1
		}
		var z = k[y.parentsUntil(".ew-tree-table").last().parent().attr("lay-filter")];
		var A = y.parent().data("key");
		var C = A.split("-");
		z.options.cols[C[0]][C[1]].width = u;
		z.eachCols(function(w, x) {
			if (x.key === A) {
				x.width = u
			}
		});
		z.resize()
	}).on("mouseup", function(t) {
		g('.ew-tree-table .ew-tb-resize[move="true"]').attr("move", "false");
		g("body").removeClass("ew-tree-table-resizing")
	}).on("mouseleave", function(t) {
		g('.ew-tree-table .ew-tb-resize[move="true"]').attr("move", "false");
		g("body").removeClass("ew-tree-table-resizing")
	});

	function q(x, u, z) {
		var y = [];
		for (var w = 0; w < x.length; w++) {
			var t = false;
			for (var v = 0; v < x.length; v++) {
				if (x[w][z] == x[v][u]) {
					t = true;
					break
				}
			}
			if (!t) {
				y.push(x[w][z])
			}
		}
		return y
	}

	function n(u, v) {
		if (l(v) === "Array") {
			for (var t = 0; t < v.length; t++) {
				if (u == v[t]) {
					return true
				}
			}
		}
		return u == v
	}

	function l(t) {
		if (t === null) {
			return "Null"
		}
		if (t === undefined) {
			return "Undefined"
		}
		return Object.prototype.toString.call(t).slice(8, -1)
	}

	function m() {
		return document.documentElement.clientHeight || document.body.clientHeight
	}
	var a = {
		render: function(t) {
			return new p(t)
		},
		reload: function(u, t) {
			k[u].reload(t)
		},
		on: function(t, u) {
			return layui.onevent.call(this, h, t, u)
		},
		pidToChildren: function(z, u, A, t, x) {
			if (!t) {
				t = "children"
			}
			var y = [];
			for (var w = 0; w < z.length; w++) {
				if (z[w][u] == z[w][A]) {
					return console.error("第" + w + "条数据的" + u + "与" + A + "相同", z[w])
				}
				if (x === undefined) {
					x = q(z, u, A)
				}
				if (n(z[w][A], x)) {
					var v = this.pidToChildren(z, u, A, t, z[w][u]);
					if (v.length > 0) {
						z[w][t] = v
					}
					y.push(z[w])
				}
			}
			return y
		}
	};
	g("head").append(['<style id="ew-tree-table-css">', "/** 最外层容器 */", ".ew-tree-table {", "    margin: 10px 0;",
		"    position: relative;", "    border: 1px solid #e6e6e6;", "    border-bottom: none;",
		"    border-right: none;", "}",
		".ew-tree-table:before, .ew-tree-table:after, .ew-tree-table .ew-tree-table-head:after {", '    content: "";',
		"    background-color: #e6e6e6;", "    position: absolute;", "    right: 0;", "    bottom: 0;", "}",
		".ew-tree-table:before {", "    width: 1px;", "    top: 0;", "    z-index: 1;", "}",
		".ew-tree-table:after, .ew-tree-table .ew-tree-table-head:after {", "    height: 1px;", "    left: 0;", "}",
		".ew-tree-table .layui-table {", "    width:100% !important;", "    margin: 0;", "    position: relative;", "    table-layout: fixed;", "}",
		"/** 表格 */", ".ew-tree-table .layui-table td, .ew-tree-table .layui-table th {", "    border-top: none;",
		"    border-left: none;", "    padding: 0 !important;", "}", ".ew-tree-table .ew-tree-table-box {",
		"    overflow: auto;", "    position: relative;", "}", ".ew-tree-table .ew-tree-table-head {",
		"    overflow: hidden;", "    box-sizing: border-box;", "    background-color: #f2f2f2;",
		"    position: relative;", "}", "/** loading */", ".ew-tree-table div.ew-tree-table-loading {",
		"    padding: 10px 0;", "    text-align: center;", "}", ".ew-tree-table div.ew-tree-table-loading > i {",
		"    color: #999;", "    font-size: 30px;", "}", ".ew-tree-table div.ew-tree-table-loading.ew-loading-float {",
		"    position: absolute;", "    top: 0;", "    left: 0;", "    right: 0;", "}", "/** 空数据 */",
		".ew-tree-table .ew-tree-table-empty {", "    color: #666;", "    font-size: 14px;", "    padding: 18px 0;",
		"    text-align: center;", "    display: none;", "}", "/** 单元格 */", ".ew-tree-table-cell.ew-tree-tips-open {",
		"    position: absolute;", "    top: 0;", "    left: 0;", "    padding: 0;", "    z-index: 9999;",
		"    background-color: #fff;", "    box-shadow: 3px 3px 8px rgba(0, 0, 0, .15);", "}",
		"thead .ew-tree-table-cell.ew-tree-tips-open {", "    background-color: #f2f2f2;", "}",
		".ew-tree-table-cell.ew-tree-tips-open.ew-show-left {", "    right: 0;", "    left: auto;",
		"    box-shadow: -3px 3px 8px rgba(0, 0, 0, .15);", "}", ".ew-tree-table-cell.ew-tree-tips-open.ew-show-bottom {",
		"    bottom: 0;", "    top: auto;", "    box-shadow: 3px -3px 8px rgba(0, 0, 0, .15);", "}",
		".ew-tree-table-cell.ew-tree-tips-open.ew-show-left.ew-show-bottom {",
		"    box-shadow: -3px -3px 8px rgba(0, 0, 0, .15);", "}", ".ew-tree-table-cell > .ew-tree-tips-c {",
		"    position: absolute;", "    right: -6px;", "    top: -3px;", "    width: 22px;", "    height: 22px;",
		"    line-height: 22px;", "    font-size: 16px;", "    color: #fff;", "    background-color: #666;",
		"    border-radius: 50%;", "    text-align: center;", "    cursor: pointer;", "    display: none;", "}",
		"table tr:first-child .ew-tree-table-cell > .ew-tree-tips-c {", "    top: 0;", "}",
		".ew-tree-table-cell.ew-tree-tips-open > .ew-tree-tips-c {", "    display: block;", "}",
		".ew-tree-table-cell.ew-tree-tips-open.ew-show-left > .ew-tree-tips-c {", "    left: -6px;", "    right: auto;",
		"}", ".ew-tree-table-cell > .ew-tree-table-cell-content {", "    padding: 5px 15px;", "    line-height: 28px;",
		"}", '[lay-size="lg"] .ew-tree-table-cell > .ew-tree-table-cell-content {', "    line-height: 40px;", "}",
		'[lay-size="sm"] .ew-tree-table-cell > .ew-tree-table-cell-content {', "    padding: 1px 15px;", "}",
		".ew-tree-table-cell.single-line > .ew-tree-table-cell-content {", "    overflow: hidden;",
		"    white-space: nowrap;", "    text-overflow: ellipsis;", "}",
		".ew-tree-table-cell.ew-tree-tips-open > .ew-tree-table-cell-content {", "    overflow: auto;",
		"    padding: 9px 15px;", "    height: auto;", "    min-height: 100%;", "    max-height: 110px;",
		"    line-height: inherit;", "    max-width: 260px;", "    width: 200px;", "    width: max-content;",
		"    width: -moz-max-content;", "    box-sizing: border-box;", "    white-space: normal;", "}",
		".ew-tree-table-cell > .layui-table-grid-down {", "    box-sizing: border-box;", "}", "/** 图标列 */",
		".ew-tree-table .ew-tree-pack {", "    cursor: pointer;", "    line-height: 16px;", "}",
		".ew-tree-table .ew-tree-pack > .layui-icon, .ew-tree-table .ew-tree-pack > .ew-tree-icon {",
		"    margin-right: 5px;", "}", ".ew-tree-table .ew-tree-pack > * {", "    vertical-align: middle;", "}",
		"/* 缩进 */", ".ew-tree-table .ew-tree-table-indent {", "    margin-right: 5px;", "    padding-left: 16px;", "}",
		"/* 箭头 */", ".ew-tree-table .ew-tree-table-arrow:before {", '    content: "\\e623";', "}",
		".ew-tree-table .ew-tree-table-open .ew-tree-table-arrow:before {", '    content: "\\e625";', "}",
		".ew-tree-table .ew-tree-table-arrow.arrow2 {", "    font-size: 12px;", "    font-weight: 600;",
		"    line-height: 16px;", "    height: 16px;", "    width: 16px;", "    display: inline-block;",
		"    text-align: center;", "    color: #888;", "}", ".ew-tree-table .ew-tree-table-arrow.arrow2:before {",
		'    content: "\\e602";', "}", ".ew-tree-table .ew-tree-table-open .ew-tree-table-arrow.arrow2:before {",
		'    content: "\\e61a";', "}", ".ew-tree-table-arrow.ew-tree-table-arrow-hide {", "    visibility: hidden;", "}",
		"/* 箭头变加载中状态 */", ".ew-tree-table tr.ew-tree-table-loading > td .ew-tree-table-arrow:before {",
		'    content: "\\e63d" !important;', "}", ".ew-tree-table tr.ew-tree-table-loading > td .ew-tree-table-arrow {",
		"    margin-right: 0;", "}", ".ew-tree-table tr.ew-tree-table-loading > td .ew-tree-table-arrow + * {",
		"    margin-left: 5px;", "}", ".ew-tree-table tr.ew-tree-table-loading * {",
		"    pointer-events: none !important;", "}", "/** 折叠行 */", ".ew-tree-table .ew-tree-tb-hide {",
		"    display: none;", "}", "/** 特殊列调整 */", '.ew-tree-table td[data-type="numbers"] > .ew-tree-table-cell,',
		'.ew-tree-table th[data-type="numbers"] > .ew-tree-table-cell,',
		'.ew-tree-table td[data-type="checkbox"] > .ew-tree-table-cell,',
		'.ew-tree-table th[data-type="checkbox"] > .ew-tree-table-cell,',
		'.ew-tree-table td[data-type="radio"] > .ew-tree-table-cell,',
		'.ew-tree-table th[data-type="radio"] > .ew-tree-table-cell,',
		'.ew-tree-table td[data-type="space"] > .ew-tree-table-cell,',
		'.ew-tree-table th[data-type="space"] > .ew-tree-table-cell {', "    padding-left: 0;", "    padding-right: 0;",
		"}", "/* 单元格内表单元素样式调整 */", ".ew-tree-table .layui-form-switch", ".ew-tree-table .layui-form-radio {",
		"    margin: 0;", "}", "/* checkbox列调整 */", ".ew-tree-table-checkbox + .layui-form-checkbox {", "    padding: 0;",
		"}", ".ew-tree-table-checkbox + .layui-form-checkbox > .layui-icon {", "    font-weight: 600;",
		"    color: transparent;", "    transition: background-color .1s linear;",
		"    -webkit-transition: background-color .1s linear;", "}",
		".ew-tree-table-checkbox + .layui-form-checkbox.layui-form-checked > .layui-icon {", "    color: #fff;", "}",
		"/* checkbox半选状态 */", ".ew-form-indeterminate + .layui-form-checkbox .layui-icon:before {", '    content: "";',
		"    width: 10px;", "    height: 2px;", "    background-color: #f1f1f1;", "    position: absolute;",
		"    top: 50%;", "    left: 50%;", "    margin: -1px 0 0 -5px;", "}", "/* radio列调整 */",
		".ew-tree-table-radio + .layui-form-radio {", "    margin: 0;", "    padding: 0;", "    height: 20px;",
		"    line-height: 20px;", "}", ".ew-tree-table-radio + .layui-form-radio > i {", "    margin: 0;",
		"    height: 20px;", "    font-size: 20px;", "    line-height: 20px;", "}", "/** 单元格编辑 */",
		".ew-tree-table .layui-table td[data-edit] {", "    cursor: text;", "}", ".ew-tree-table .ew-tree-table-edit {",
		"    position: absolute;", "    left: 0;", "    top: 0;", "    width: 100%;", "    height: 100%;",
		"    border-radius: 0;", "    box-shadow: 1px 1px 20px rgba(0, 0, 0, .15);", "}",
		".ew-tree-table .ew-tree-table-edit:focus {", "    border-color: #5FB878 !important;", "}",
		".ew-tree-table .ew-tree-table-edit.layui-form-danger {", "    border-color: #FF5722 !important;", "}",
		"/** 搜索数据隐藏行 */", ".ew-tree-table tr.ew-tree-table-filter-hide {", "    display: none !important;", "}",
		"/** 头部工具栏 */", ".ew-tree-table .ew-tree-table-tool {", "    min-height: 50px;", "    line-height: 30px;",
		"    padding: 10px 15px;", "    box-sizing: border-box;", "    background-color: #f2f2f2;",
		"    border-bottom: 1px solid #e6e6e6;", "}", ".ew-tree-table .ew-tree-table-tool .ew-tree-table-tool-right {",
		"    float: right;", "}", ".ew-tree-table .ew-tree-table-tool .ew-tree-table-tool-item {",
		"    position: relative;", "    color: #333;", "    width: 26px;", "    height: 26px;", "    line-height: 26px;",
		"    text-align: center;", "    margin-left: 10px;", "    display: inline-block;", "    border: 1px solid #ccc;",
		"    box-sizing: border-box;", "    vertical-align: middle;", "    -webkit-transition: .3s all;",
		"    transition: .3s all;", "    cursor: pointer;", "}",
		".ew-tree-table .ew-tree-table-tool .ew-tree-table-tool-item:first-child {", "    margin-left: 0;", "}",
		".ew-tree-table .ew-tree-table-tool .ew-tree-table-tool-item:hover {", "    border-color: #999;", "}",
		".ew-tree-table .ew-tree-table-tool-right .layui-table-tool-panel {", "    left: auto;", "    right: -1px;",
		"    z-index: 9999;", "}", "/* 列宽拖拽调整 */", ".ew-tree-table .ew-tb-resize {", "    position: absolute;",
		"    right: 0;", "    top: 0;", "    bottom: 0;", "    width: 10px;", "    cursor: col-resize;", "}",
		".ew-tree-table-resizing {", "    cursor: col-resize;", "    -ms-user-select: none;",
		"    -moz-user-select: none;", "    -webkit-user-select: none;", "    user-select: none;", "}", "/* 辅助样式 */",
		".ew-tree-table .layui-form-switch {", "    margin: 0;", "}", ".ew-tree-table .pd-tb-0 {",
		"    padding-top: 0 !important;", "    padding-bottom: 0 !important;", "}", ".ew-tree-table .break-all {",
		"    word-break: break-all !important;", "}", "/** 扩展图标 */",
		".ew-tree-table .ew-tree-icon-folder:after, .ew-tree-table .ew-tree-icon-file:after {", '    content: "";',
		"    padding: 2px 10px;", "    -webkit-background-size: cover;", "    -moz-background-size: cover;",
		"    -o-background-size: cover;", "    background-size: cover;", "    background-repeat: no-repeat;",
		'    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAE6UlEQVR4Xu2ZPYhcVRiGny9hC0FsTEBCGkFTWIQE/IlpgmKpWAiLyR0XLbYTxEKxkCAEhRCxEOwsjJnJioKIYClWKgqiskIIaCoLYyASVJT87JGspN37LrOXvec777Tzzrnvz7Nn2dnAr6YbiKbTOzwGoHEIDIABaLyBxuP7BjAAjTfQeHzfAAag8QYaj+8bwAA03kDj8X0DGIDGG2g8/lw3QFlhD9fZN7oOF7gYT3NudL5GaGjTAJQP2c1VXgIOExyGkf4/oXCe4I3oeH+EvY/G0qYAKFOWCV4Hdo8mQb+RL7jBE7HE3/3S9hQyAGXGCeDVSiv6lqscief4t1L/g9mWAChTHiD4ZrTXvVbPu9GxrEnbUWkAzPgeOJCglsXo+ChBji2L0AtAmfEgrP/0Z3hdZoF7Y5HLGcJsRQYFgLeAF7fiYSM540x0LI3Ey7bb6AdgytcEh7bd6VYa2MGhOJrmVpurmX4AZlwCds31lPF9+AI32O8/DYUvccqUKwR3jG/DuR29Gd36F1pNv/pvgKwAFK5RuC+e4eeWCWgXgJurFz6LCY8bgA0aSPwr4P/UhVNc43ir3xK2fQPcAr/wO/AewU/Ar6xRqroVdvAnC6zGIlc369sAbLax8er/ofAJOzkVR9e/uZVeBkCqqTrRyeh4RXFtAJSWatQUno0Jp/usG4C+hup9/yJ72BuPcH2jCAag3oEV50vRccYAKFXl1LwdHS8YgJzj9qcqfBoTnjQA/VVlVXwXHfcbgKzz9uf6IToOGoD+orIqDEDWZcVcBkAsKqvMAGRdVsxlAMSissoMQNZlxVwGQCwqq8wAZF1WzGUAxKKyygxA1mXFXAZALCqrzABkXVbMZQDEorLKDEDWZcVcBkAsKqvMAGRdVsxlAMSissoMQNZlxVwGQCwqq8wAZF1WzGUAxKKyygxA1mXFXAZALCqrzABkXVbMZQDEorLKDEDWZcVcBkAsKqvMAGRdVsxlAMSissoMQNZlxVwGQCwqq8wAZF1WzGUAxKKyygxA1mXFXAZALCqrzABkXVbMZQDEorLKDEDWZcVcBkAsKqvMAGRdVsxlAMSissoMQNZlxVwGQCwqq8wAZF1WzGUAxKKyygxA1mXFXAZALCqrzABkXVbMZQDEorLKDEDWZcVcBkAsKqvMAGRdVsxlAMSissoMQNZlxVwGQCwqq8wAZF1WzGUAxKKyygxA1mXFXAZALCqrzABkXVbMZQDEorLKDEDWZcVcBkAsKqvMAGRdVsxlAMSissoMQNZlxVwGQCwqq8wAZF1WzLUFAMy4BOwSH2jZmBoorMaE/RtZij6/ZcoFgrv7dH5/lA38Eh33zAfAjM+BR0cZz6Y2bqDwY0w4MB8AU04SvOyuq2zg4+h4aj4AzvIwha+qjN+66cLzMeGduQC4+eEy4zywr/U+K8t/hQX2xiJ/zQ/ACgdZ40vgtspKaNducCyOsdJXQO9fAbcOKGc5whofENzVd6jf3/YGTkTHccWFDMD6r4LT3MlOloHHCB4CblceYs3gDfxB4TeCcxReiwmr6hM3BYB6qHX1NGAA6tlqEKcGYJBa6znUANSz1SBODcAgtdZzqAGoZ6tBnBqAQWqt51ADUM9Wgzg1AIPUWs+hBqCerQZxagAGqbWeQw1APVsN4tQADFJrPYcagHq2GsTpf+KxwJB5Cd5mAAAAAElFTkSuQmCC");',
		"}", ".ew-tree-table tr.ew-tree-table-open > td .ew-tree-icon-folder:after {",
		'    background-image: url("data:image/png;base64,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");',
		"}", ".ew-tree-table .ew-tree-icon-file:after {",
		'    background-image: url("data:image/png;base64,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");',
		"}", "</style>"
	].join(""));
	s("treeTable", a)
});
