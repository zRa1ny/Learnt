define([
    'require',
    'vue',
    'jQuery',
    'echarts',
    'echartsExtBmap'
], function (require, Vue, $, echarts) {
    'use strict';

    function getMapName(map) {
        var name = "";
        if (typeof (map) == "string") {
            if (map.indexOf("system:") == 0) {
                name = map.replace("system:", "");
            }
            else {
                name = map.split("/").pop().split(".").shift();
            }
        }
        else if (typeof (map) == "object") {
            for (var key in map) {
                if (map.hasOwnProperty(key)) {
                    name = key;
                    break;
                }
            }
        }
        return name;
    };
    function registerMap(map, callback) {
        var mapType = typeof (map);
        var name = getMapName(map);
        var m = echarts.getMap(name);
        if (m) {
            callback();
        }
        else {
            switch (mapType) {
                case "string":
                    if (map.indexOf("system:") == 0) {
                        var url = require.toUrl("../../components/echarts/map/json/" + name + ".json");
                        require(["json!" + url], function (mapData) {
                            echarts.registerMap(name, mapData);
                            setTimeout(callback, 1);
                        });
                        break;
                    }
                    else if (map.indexOf("json!") == 0) {
                        require([map], function (mapData) {
                            echarts.registerMap(name, mapData);
                            setTimeout(callback, 1);
                        });
                        break;
                    }
                    else {
                        mapType = "object";
                        var mapObj = {
                        };
                        mapObj[name] = {
                            url: map,
                            type: "get"
                        };
                        map = mapObj;
                    }
                case "object":
                    var ajaxOption = map[name];
                    $.extend({
                        success: function (res) {
                            if (res.success) {
                                echarts.registerMap(map, res.ata);
                            }
                            setTimeout(callback, 1);
                        }
                    }, ajaxOption);
                    $.ajax(ajaxOption);
                    break;
            }
        }
    }
    Vue.component("cig-dep-map", {
        props: {
            map: {},
            randomColor: {
                default: true
            },
            roam: {
                default: true
            }
        },
        template: "<div style='height:100%;' ref='container' class='cig-dep-map'></div>",
        data: function () {
            return {
                _chart: false
            }
        },
        watch: {
            map: function () {
                this.update();
            }
        },
        mounted: function () {
            this.update();
        },
        methods: {
            mapClick: function (params) {
                if (params.componentType == "series" && params.name) {
                    this.$emit("itemclick", params.name);
                }
            },
            resize: function () {
                if (this._chart) {
                    this._chart.resize();
                }
            },
            resetSelect: function () {
                this.update();
            },
            update: function () {
                registerMap(this.map, (function () {
                    var labelSerie = null;
                    if (!this._chart) {
                        var dom = this.$refs.container;
                        var chart = echarts.init(dom);
                        this._chart = chart;
                        this._chart.on("click", this.mapClick.bind(this));

                        var selName = null;
                        var highlights = {};
                        function highlight(params) {
                            if (labelSerie &&
                                params.componentType == 'series' &&
                                params.seriesName == "dep") {
                                var name = params.name;
                                if (!highlights[name]) {
                                    highlights[name] = 1;
                                    // console.log("highlight"+name);
                                    this._chart.dispatchAction({
                                        type: "highlight",
                                        seriesName: "label",
                                        name: name
                                    })
                                }
                            }
                            if (params.type == "geoselectchanged") {
                                // if (params.selected[params.name]) {
                                if (params.batch[0].selected[params.name]) {
                                    // var name = params.name;
                                    var name = params.batch[0].name;
                                    selName = name;
                                    this._chart.dispatchAction({
                                        type: "downplay",
                                        seriesName: "label",
                                        name: name
                                    })
                                    setTimeout((function () {
                                        console.log("highlight" + name);
                                        this._chart.dispatchAction({
                                            type: "highlight",
                                            seriesName: "label",
                                            name: name
                                        })
                                    }).bind(this), 1);
                                }
                                else {
                                    // var name = params.name;
                                    var name = params.batch[0].name;
                                    selName = null;
                                    if (!highlights[name]) {
                                        console.log("downplay" + name);
                                        highlights[name] = 0;
                                        this._chart.dispatchAction({
                                            type: "downplay",
                                            seriesName: "label",
                                            name: name
                                        })
                                    }
                                }
                            }
                        }
                        function downplay(params) {
                            if (labelSerie &&
                                params.componentType == 'series' &&
                                params.seriesName == "dep" &&
                                params.name != selName) {
                                var name = params.name;
                                // console.log("downplay"+name);
                                highlights[name] = 0;
                                this._chart.dispatchAction({
                                    type: "downplay",
                                    seriesName: "label",
                                    name: name
                                })
                            }
                        }
                        this._chart.on("mouseover", highlight, this);
                        this._chart.on("mouseout", downplay, this);
                        this._chart.on("geoselectchanged", highlight, this);
                    }
                    var mapName = getMapName(this.map);

                    var mapColorData = [];
                    var mapColor = [
                        '#53a9c4',
                        '#7bc0f8',
                        '#dfea6e',
                        '#fffaaf',
                        '#f9c3d3',
                        '#f9b697',
                        '#ffde72',
                    ];
                    var mapColorCategory = [1, 2, 3, 4, 5, 6, 7];
                    var categoryCustom = [1, 2, 3, 4, 5, 6, 7, 1, 7, 6, 5, 4, 3, 2, 1, 2];
                    var data = echarts.getMap(mapName);
                    var features = data.geoJson && data.geoJson.features;
                    if (this.randomColor) {
                        var totalColor = categoryCustom.length;
                        if (features) {
                            var spacial = {
                                "雉城街道": 5,
                                "龙山街道": 1,
                                "太湖街道": 7,
                                "水木花都社区": 3,
                                "古城居委会": 5,
                                "北门社区": 2,
                            }
                            mapColorData = features.map(function (item, index) {
                                var res = { name: item.properties.name, value: categoryCustom[index % totalColor] };
                                if (spacial[res.name]) {
                                    res.value = spacial[res.name];
                                }
                                return res;
                            });
                        }
                    }
                    else {

                    }
                    if (typeof (features[0].properties.labelX) != "undefined") {
                        labelSerie = {
                            type: 'scatter',
                            name: 'label',
                            coordinateSystem: 'geo',
                            data: features.map(function (feature) {
                                return {
                                    name: feature.properties.name,
                                    value: [feature.properties.labelX, feature.properties.labelY]
                                }
                            }),
                            symbolSize: 35,
                            symbol: 'path://M',
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'inside',
                                    textStyle: {
                                        color: "#000000",
                                        // fontSize:14
                                    },
                                    show: true
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        color: "#640000",
                                        fontSize: 14
                                    }
                                }
                            }
                        }
                    }
                    var mapSerie =
                    {
                        name: 'dep',
                        type: 'map',
                        geoIndex: 0,
                        roam: this.roam,
                        data: mapColorData
                    };
                    var option = {
                        geo: {
                            map: mapName,
                            roam: this.roam,
                            label: {
                                normal: {
                                    show: labelSerie ? false : true
                                },
                                emphasis: {
                                    show: labelSerie ? false : true,
                                    textStyle: {
                                        color: "#640000",
                                        fontSize: 14
                                    }
                                }
                            },
                            selectedMode: "single",
                            itemStyle: {
                                normal: {
                                    areaColor: "transparent",
                                    borderColor: "#198eb1"
                                },
                                emphasis: {
                                    areaColor: null,
                                    borderColor: "#ffffff",//"#9cd5e0",
                                }
                            }
                        },
                        series: labelSerie ? [mapSerie, labelSerie] : [mapSerie],
                        visualMap: [
                            {
                                left: -9999,
                                type: "piecewise",
                                categories: mapColorCategory,
                                inRange: {
                                    color: mapColor
                                }
                            }
                        ]
                    };
                    this._chart.setOption(option, true);
                }).bind(this));
            }
        }
    });

});