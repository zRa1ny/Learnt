define([
    'require',
    'vue',
    'jQuery',
    'systemConfig',
    'echarts',
    "vueChart"
], function (require, Vue, $, systemConfig, echarts) {
    'use strict';

    var chart1Vm = new Vue({
        el: "#chart1",
        data: {
            colors: [
                ["#7B42CC", "#3AA8EB", "#3C72DD", "#8DC354", "#3BA072", "#F37D30", "#ED3B3A", "red", "blue", "greed", ],
                ["#FF89C9", "#FF527E", "#C64EFF", "red", "blue", "greed",]
            ],
            databar: {
                labels: ["小浦镇", "画溪镇", "虹星桥镇", "和平镇", "太湖街道", "洪桥镇", "夹浦镇"],
                datasets: [
                    [221, 332, 443, 554, 565, 376, 887],
                    [111, 233, 355, 466, 577, 688, 799]
                ]
            },
            datapie: {
                labels: [
                    ["18岁以下", "19-29岁", "30-39岁", "40-49岁", "50-59岁", "60-69岁", "70岁以上"],
                    ["青少年", "中年", "老年"]
                ],
                datasets: [
                    [100, 200, 334, 544, 112, 334, 55],
                    [100, 200, 334]
                ]
            },
            datachartpie: {
                datasets: [{
                    data: [221, 332, 443, 554, 565, 376, 887],
                    backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#7FAA95', '#C59647']
                }],
                labels: ["18岁以下", "19-29岁", "30-39岁", "40-49岁", "50-59岁", "60-69岁", "70岁以上"]
            },
            datachartbar: {
                labels: ["乡镇", "村", "网格"],
                datasets: [{
                        label: '户籍人口',
                        backgroundColor: '#46BFBD',
                        data: [221, 332, 443]
                    },
                    {
                        label: '流入人口',
                        backgroundColor: '#F7464A',
                        data: [100, 200, 334]
                    },
                    {
                        label: '常住人口',
                        backgroundColor: 'orange',
                        data: [20, 234, 314]
                    },
                ]
            },
            selectArea: "长兴县",
            optionspie: {
                title: {
                    display: true,
                    text: "人口年龄统计"
                },
                tooltips: {
                    mode: "label"
                },
                responsive: true,
                scales: {}
            },
            optionsbar: {
                title: {
                    display: true,
                    text: "人口信息统计"
                },
                tooltips: {
                    mode: "label"
                },
                responsive: true,
                scales: {
                    xAxes: [{
                        stacked: true,
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                }
            }

        },
        mounted: function () {},
        watch: {

        },
        methods: {

        },
        computed: {}
    })
});