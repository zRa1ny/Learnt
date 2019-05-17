define([
    'require',
    'vue',
    'jQuery',
    'arbor',
    'arborGraphics'
], function (require, Vue, $, arbor) {
    'use strict';
    var Parseur = function () {
        var strip = function (s) { return s.replace(/^[\s\t]+|[\s\t]+$/g, '') }
        var recognize = function (s) {
            var from = -1, to = -1, depth = 0;
            var sArr = s.split("");
            for (var i = 0; i < sArr.length; i++) {
                switch (sArr[i]) {
                    case '{':
                        if (depth == 0 && from == -1) from = i
                        depth++
                        break
                    case '}':
                        depth--
                        if (depth == 0 && to == -1) to = i + 1
                        break
                }
            }
            return s.substring(from, to)
        }
        var unpack = function (os) {
            if (!os) return {}
            var pairs = os.substring(1, os.length - 1).split(/\s*,\s*/)
            var kv_data = {}
            $.each(pairs, function (i, pair) {
                var kv = pair.split(':')
                if (kv[0] === undefined || kv[1] === undefined) return
                var key = strip(kv[0])
                var val = strip(kv.slice(1).join(":")) // put back any colons that are part of the value
                if (!isNaN(val)) val = parseFloat(val)
                if (val == 'true' || val == 'false') val = (val == 'true')
                kv_data[key] = val
            })
            return kv_data
        }
        var lechs = function (s) {
            var tokens = [];
            var buf = '', inObj = false, objBeg = -1, objEnd = -1;
            var flush = function () {
                var bufstr = strip(buf);
                if (bufstr.length > 0) tokens.push({ type: "ident", ident: bufstr });
                buf = "";
            }
            s = s.replace(/([ \t]*)?;.*$/, '');
            for (var i = 0, j = s.length; ;) {
                var c = s[i];
                if (c === undefined) break;
                if (c == '-') {
                    if (s[i + 1] == '>' || s[i + 1] == '-') {
                        flush();
                        var edge = s.substr(i, 2);
                        tokens.push({ type: "arrow", directed: (edge == '->') });
                        i += 2;
                    } /*else if(s[i + 1] == "{") {
                        i += 1;
                        var objStr = recognize(s.substr(i));
                        if (objStr.length == 0) {
                            buf += c
                            i++
                        } else {
                            var style = unpack(objStr)
                            if (!$.isEmptyObject(style)) {
                                flush()
                                tokens.push({ type: "arrow-style", style: style })
                            }
                            i += objStr.length
                        }
                    }*/ else {
                        buf += c;
                        i++;
                    }
                } else if (c == '{') {
                    var objStr = recognize(s.substr(i));
                    if (objStr.length == 0) {
                        buf += c
                        i++
                    } else {
                        var style = unpack(objStr)
                        if (!$.isEmptyObject(style)) {
                            flush()
                            tokens.push({ type: "style", style: style })
                        }
                        i += objStr.length
                    }
                } else {
                    buf += c
                    i++
                }
                if (i >= j) {
                    flush()
                    break
                }
            }
            return tokens
        }
        var yack = function (statements) {
            var nodes = {}
            var edges = {}
            var objmerge = arbor.etc.objmerge;
            var objcopy = arbor.etc.objcopy;
            var nodestyle = {}
            var edgestyle = {}
            $.each(statements, function (i, st) {
                var types = $.map(st, function (token) {
                    return token.type
                }).join('-');
                if (types.match(/ident-arrow-ident(-style)?/)) {
                    var edge = { src: st[0].ident, dst: st[2].ident, style: (st[3] && st[3].style || {}) }
                    edge.style.directed = st[1].directed;
                    if (nodes[edge.src] === undefined) nodes[edge.src] = ($.isEmptyObject(nodestyle)) ? -2600 : objcopy(nodestyle)
                    if (nodes[edge.dst] === undefined) nodes[edge.dst] = ($.isEmptyObject(nodestyle)) ? -2600 : objcopy(nodestyle)
                    edges[edge.src] = edges[edge.src] || {};
                    edges[edge.src][edge.dst] = objmerge(edgestyle, edge.style);
                } else if (types.match(/ident-arrow|ident(-style)?/)) {
                    var node = st[0].ident
                    if (st[1] && st[1].style) {
                        nodes[node] = objmerge(nodestyle, st[1].style)
                    } else {
                        nodes[node] = ($.isEmptyObject(nodestyle)) ? -2600 : objcopy(nodestyle) // use defaults
                    }
                } else if (types == 'style') {
                    nodestyle = objmerge(nodestyle, st[0].style);
                } else if (types == 'arrow-style') {
                    edgestyle = objmerge(edgestyle, st[1].style)
                }
            })
            $.each(nodes, function (name, data) {
                if (data === -2600) {
                    nodes[name] = objcopy(nodestyle)
                }
            })
            return { nodes: nodes, edges: edges }
        }
        var that = {
            lechs: lechs,
            yack: yack,
            parse: function (s) {
                var lines = s.split('\n')
                var statements = []
                $.each(lines, function (i, line) {
                    var tokens = lechs(line)
                    if (tokens.length > 0) statements.push(tokens)
                })
                return yack(statements)
            }
        }
        return that
    }
    var Renderer = function (canvas, option) {
        var ctx = canvas.getContext("2d");
        var gfx = arbor.Graphics(canvas)
        var particleSystem = null
        var intersect_line_line = function (p1, p2, p3, p4) {
            var denom = ((p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y));
            if (denom === 0) return false
            var ua = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / denom;
            var ub = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) / denom;
            if (ua < 0 || ua > 1 || ub < 0 || ub > 1) return false
            return arbor.Point(p1.x + ua * (p2.x - p1.x), p1.y + ua * (p2.y - p1.y));
        }
        var intersect_line_box = function (p1, p2, boxTuple) {
            var p3 = { x: boxTuple[0], y: boxTuple[1] },
                w = boxTuple[2],
                h = boxTuple[3]
            var tl = { x: p3.x, y: p3.y };
            var tr = { x: p3.x + w, y: p3.y };
            var bl = { x: p3.x, y: p3.y + h };
            var br = { x: p3.x + w, y: p3.y + h };
            return intersect_line_line(p1, p2, tl, tr) ||
                intersect_line_line(p1, p2, tr, br) ||
                intersect_line_line(p1, p2, br, bl) ||
                intersect_line_line(p1, p2, bl, tl) ||
                false
        }
        var that = {
            init: function (system) {
                particleSystem = system
                particleSystem.screenSize(canvas.width, canvas.height)
                that.initMouseHandling()
            },
            redraw: function () {
                if (!particleSystem) return;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                var nodeBoxes = {}
                particleSystem.eachNode(function (node, pt) {
                    var label = node.data.label || "";
                    var w = ctx.measureText("" + label).width + 10
                    if (node.data.size == 'big') {
                        w += 10;
                    }
                    if (!("" + label).match(/^[ \t]*$/)) {
                        pt.x = Math.floor(pt.x)
                        pt.y = Math.floor(pt.y)
                    } else {
                        label = null
                    }
                    if (node.data.color) ctx.fillStyle = node.data.color
                    else ctx.fillStyle = "rgba(0,0,0,.2)"
                    if (node.data.color == 'none') ctx.fillStyle = "white"
                    if (node.data.shape == 'dot') {
                        gfx.oval(pt.x - w / 2, pt.y - w / 2, w, w, { fill: ctx.fillStyle })
                        nodeBoxes[node.name] = [pt.x - w / 2, pt.y - w / 2, w, w]
                    } else {
                        if (node.data.size == 'big') {
                            gfx.oval(pt.x - 36, pt.y - 38, 73, 73, { fill: ctx.fillStyle });
                            //    ctx.arc(pt.x-w/2, pt.y-14, 28, 0, Math.PI * 2, true);  
                            //     gfx.rect(pt.x-w/2, pt.y-14, w,28, 4, {fill:ctx.fillStyle})
                            nodeBoxes[node.name] = [pt.x - w / 2, pt.y - 11, w, 22]
                        } else if(node.data.size=='bigCommon'){
                            gfx.rect(pt.x-w/2-40, pt.y-14, w+80,28, 4, {fill:ctx.fillStyle})
                            nodeBoxes[node.name] = [pt.x-w/2-40, pt.y-14, w+80, 28]
                        } else if (node.data.size == 'small') {
                            gfx.rect(pt.x - w / 2, pt.y - 12, w, 24, 4, { fill: ctx.fillStyle })
                            nodeBoxes[node.name] = [pt.x - w / 2, pt.y - 11, w, 22]
                        } else {
                            gfx.rect(pt.x - w / 2, pt.y - 10, w, 20, 4, { fill: ctx.fillStyle })
                            nodeBoxes[node.name] = [pt.x - w / 2, pt.y - 11, w, 22]
                        }

                    }
                    if (label) {
                        if (node.data.size == 'big' || 
                            node.data.size == 'bigCommon') {
                            ctx.font = "18px Microsoft YaHei"
                        } else if (node.data.size == 'small') {
                            ctx.font = "16px Microsoft YaHei"
                        } else {
                            ctx.font = "14px Microsoft YaHei"
                        }
                        ctx.textAlign = "center"
                        ctx.fillStyle = "white"
                        if (node.data.color == 'none') ctx.fillStyle = '#333333', ctx.font = '12px Microsoft YaHei'
                        //if (node.data.jump == '0') ctx.fillStyle = '#057ffa', ctx.font = '12px Microsoft YaHei'
                        if (node.data.jump == '0') ctx.fillStyle = 'white', ctx.font = '12px Microsoft YaHei'
                        ctx.fillText(label || "", pt.x, pt.y + 4)
                        ctx.fillText(label || "", pt.x, pt.y + 4)
                    }
                })
                ctx.strokeStyle = "#cccccc"
                ctx.lineWidth = 1
                ctx.beginPath();
                particleSystem.eachEdge(function (edge, pt1, pt2) {
                    var weight = edge.data.weight
                    var color = edge.data.color
                    if (!color || ("" + color).match(/^[ \t]*$/)) color = null;
                    var tail = intersect_line_box(pt1, pt2, nodeBoxes[edge.source.name]);
                    var head = intersect_line_box(tail, pt2, nodeBoxes[edge.target.name]);
                    ctx.save();
                    ctx.beginPath();
                    if (!isNaN(weight)) ctx.lineWidth = weight;
                    if (color) ctx.strokeStyle = color;
                    ctx.fillStyle = null;
                    ctx.moveTo(tail.x, tail.y);
                    ctx.lineTo(head.x, head.y);
                    ctx.stroke();
                    ctx.restore();
                    if (edge.data.directed) {
                        ctx.save()
                        var wt = !isNaN(weight) ? parseFloat(weight) : ctx.lineWidth
                        var arrowLength = 6 + wt
                        var arrowWidth = 2 + wt
                        ctx.fillStyle = (color) ? color : ctx.strokeStyle
                        ctx.translate(head.x, head.y);
                        ctx.rotate(Math.atan2(head.y - tail.y, head.x - tail.x));
                        ctx.clearRect(-arrowLength / 2, -wt / 2, arrowLength / 2, wt)
                        ctx.beginPath();
                        ctx.moveTo(-arrowLength, arrowWidth);
                        ctx.lineTo(0, 0);
                        ctx.lineTo(-arrowLength, -arrowWidth);
                        ctx.lineTo(-arrowLength * 0.8, -0);
                        ctx.closePath();
                        ctx.fill();
                        ctx.restore()
                    }
                })
            },
            initMouseHandling: function () {
                var selected = null;
                var nearest = null;
                var dragged = null;
                var _mouseP = null;
                var oldmass = 1
                var handler = {
                    clicked: function (e) {
                        var pos = $(canvas).offset();
                        _mouseP = arbor.Point(e.pageX - pos.left, e.pageY - pos.top)
                        selected = nearest = dragged = particleSystem.nearest(_mouseP);
                        if (dragged.node !== null) dragged.node.fixed = true
                        $(canvas).bind('mousemove', handler.dragged)
                        $(canvas).bind('mouseup', handler.itemclick);
                        $(window).bind('mouseup', handler.dropped)
                        return false
                    },
                    dragged: function (e) {
                        $(canvas).unbind('mouseup', handler.itemclick);
                        var old_nearest = nearest && nearest.node._id
                        var pos = $(canvas).offset();
                        var s = arbor.Point(e.pageX - pos.left, e.pageY - pos.top)
                        if (!nearest) return
                        if (dragged !== null && dragged.node !== null) {
                            var p = particleSystem.fromScreen(s)
                            dragged.node.p = p//{x:p.x, y:p.y}
                        }
                        return false
                    },
                    dropped: function (e) {
                        if (dragged === null || dragged.node === undefined) return;
                        if (dragged.node !== null) dragged.node.fixed = false;
                        dragged.node.tempMass = 1000;
                        dragged = null;
                        selected = null;
                        $(canvas).unbind('mousemove', handler.dragged);
                        $(window).unbind('mouseup', handler.dropped);
                        _mouseP = null;
                        return false;
                    },
                    itemclick: function (e){
                        var pos = $(canvas).offset();
                        _mouseP = arbor.Point(e.pageX - pos.left, e.pageY - pos.top)
                        selected = nearest = dragged = particleSystem.nearest(_mouseP);
                        if (option && option.onclick) option.onclick(selected.node.data);

                        $(canvas).unbind('mouseup', handler.itemclick);
                        $(canvas).unbind('mousemove', handler.dragged);
                        $(window).unbind('mouseup', handler.dropped);
                        return false;
                    }
                }
                $(canvas).mousedown(handler.clicked);
            },
        }
        return that;
    }
    Vue.component("cig-arbor", {
        props: {
            "value":{}, "width":{}, "height":{},
            psParam:{
                default:function(){
                    return {"repulsion":1000,"stiffness":600,"friction":0,"dt":0.02,"gravity":false,"precision":1,timeout:1};
                }
            },
            stopLayoutTimeout:{
                default:1000
            },
            stopLayoutPsParam:{
                default:function(){
                    return {"repulsion":0,"stiffness":0,"friction":0,"dt":0.02,"gravity":false,"precision":1,timeout:1};
                }
            }
        },
        template: "<canvas ref='canvas' :width='width' :height='height'></canvas>",
        data: function () {
            return {
                valueProxy: this.value,
                timer:null
            };
        },
        watch: {
            "value": function (newVal) {
                if (newVal != this.valueProxy) {
                    this.valueProxy = newVal;
                    this.update();
                }
            }
        },
        methods: {
            update: function () {
                var value = this.value;
                var sys = arbor.ParticleSystem();

                if(this.psParam){
                    sys.parameters(this.psParam);//设置 ParticleSystem ，这个默认的system会快速定位
                }
                if(this.stopLayoutTimeout){//定位确定后，将系统置为静止的，在stopLayoutTimeout结束后系统静止
                    if(this.timer) clearTimeout(this.timer);
                    this.timer = setTimeout((function(){
                        sys.parameters(this.stopLayoutPsParam);//这个默认的system会将系统设置为静止
                        this.timer = null;
                    }).bind(this),this.stopLayoutTimeout);
                }
                var _canvas = this.$refs.canvas;
                var self = this;
                sys.renderer = Renderer(_canvas, {
                    onclick: function (data) {
                        self.$emit("itemclick", data)
                    }
                });
                var parse = Parseur().parse;
                //var src_txt = "{color:none}\n张三 -> 精神病\n张三 -> 贫困户\n张三 -> 房屋\n张三 -> 车辆\n张三 -> 志愿者\n张三 -> 党员\n房屋 -> 金陵北路21号11号楼1单元201\n房屋 -> 龙山街道玄坛庙村25号\n金陵北路21号11号楼1单元201 -> 出租\n车辆 -> 浙E89883\n车辆 -> 浙E33234\n志愿者 -> 社区志愿者\n志愿者 -> 红十字会志愿者\n党员 -> 雉城街道党支部\n精神病 -> 2017年3月8日确诊\n贫困户 -> 因病致残\n因病致残->社会保障兜底\n张三 -> 军属\n张三 -> 残疾人 \n残疾人 -> 精神残疾2级\n张三 -> 已婚\n已婚 -> 李四\n张三 -> 已就业\n已就业 -> 煤山镇环卫所\n张三 {color:#95cde5}\n李四 {color:#db8e3c}\n志愿者 {color:#c6531e}\n雉城街道党支部 {color:#ffe35f}\n社会保障兜底 {color:#95cde5}\n龙山街道玄坛庙村25号 {color:#db8e3c}\n车辆 {color:#db8e3c}";
                var network = parse(value);
                $.each(network.nodes, function (nname, ndata) {
                    if (ndata.label === undefined) ndata.label = nname
                })
                sys.merge(network);
            },
        }
    })
});