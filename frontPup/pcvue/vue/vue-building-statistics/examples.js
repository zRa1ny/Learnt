define([
    'require'
], function (require, Vue) {
    'use strict';
    function randomHouseArray() {
        var randoms = [];
        //大于6
        randoms.push({
            CCPNum: 1,// 党员
            under14Num: 2,// 14岁以下儿童
            crimeIlegalNum: 1,// 违法/犯罪
            breakNum: 1,// 失信
            zdfuNum: 4,// 重点服务共计
            cjrNum: 1,// 残疾人
            nclsetNum: 1,// 农村留守儿童
            kclrNum: 1,// 空巢老人
            tkryNum: 0,// 特困人员
            lsjzNum: 0,// 临时救助
            dbryNum: 0,// 低保人员
            zdgkNum: 2,// 重点管控人员
            xmsfNum: 0,// 刑满释放
            sqjzNum: 0,// 社区矫正
            jsbNum: 1,// 精神障碍者
            xdryNum: 1,// 吸毒人员
            azbNum: 0,// 艾滋病危险人员
            zdsfNum: 0,// 重点上访人员
            zdqsnNum: 1,// 重点青少年
            xjryNum: 2// 邪教人员
        });
        //小于等于6（4）
        randoms.push({
            CCPNum: 1,// 党员
            under14Num: 1,// 14岁以下儿童
            crimeIlegalNum: 0,// 违法/犯罪
            breakNum: 0,// 失信
            zdfuNum: 1,// 重点服务共计
            cjrNum: 0,// 残疾人
            nclsetNum: 1,// 农村留守儿童
            kclrNum: 0,// 空巢老人
            tkryNum: 0,// 特困人员
            lsjzNum: 0,// 临时救助
            dbryNum: 0,// 低保人员
            zdgkNum: 1,// 重点管控人员
            xmsfNum: 0,// 刑满释放
            sqjzNum: 0,// 社区矫正
            jsbNum: 0,// 精神障碍者
            xdryNum: 0,// 吸毒人员
            azbNum: 0,// 艾滋病危险人员
            zdsfNum: 0,// 重点上访人员
            zdqsnNum: 0,// 重点青少年
            xjryNum: 1// 邪教人员
        });
        //小于等于6（5）
        randoms.push({
            CCPNum: 1,// 党员
            under14Num: 1,// 14岁以下儿童
            crimeIlegalNum: 0,// 违法/犯罪
            breakNum: 0,// 失信
            zdfuNum: 2,// 重点服务共计
            cjrNum: 0,// 残疾人
            nclsetNum: 1,// 农村留守儿童
            kclrNum: 1,// 空巢老人
            tkryNum: 0,// 特困人员
            lsjzNum: 0,// 临时救助
            dbryNum: 0,// 低保人员
            zdgkNum: 1,// 重点管控人员
            xmsfNum: 0,// 刑满释放
            sqjzNum: 0,// 社区矫正
            jsbNum: 0,// 精神障碍者
            xdryNum: 0,// 吸毒人员
            azbNum: 0,// 艾滋病危险人员
            zdsfNum: 0,// 重点上访人员
            zdqsnNum: 0,// 重点青少年
            xjryNum: 1// 邪教人员
        });
        //小于等于6（6）
        randoms.push({
            CCPNum: 1,// 党员
            under14Num: 1,// 14岁以下儿童
            crimeIlegalNum: 0,// 违法/犯罪
            breakNum: 0,// 失信
            zdfuNum: 2,// 重点服务共计
            cjrNum: 0,// 残疾人
            nclsetNum: 1,// 农村留守儿童
            kclrNum: 1,// 空巢老人
            tkryNum: 0,// 特困人员
            lsjzNum: 0,// 临时救助
            dbryNum: 0,// 低保人员
            zdgkNum: 2,// 重点管控人员
            xmsfNum: 1,// 刑满释放
            sqjzNum: 0,// 社区矫正
            jsbNum: 0,// 精神障碍者
            xdryNum: 0,// 吸毒人员
            azbNum: 0,// 艾滋病危险人员
            zdsfNum: 0,// 重点上访人员
            zdqsnNum: 0,// 重点青少年
            xjryNum: 1// 邪教人员
        });
        return randoms;
    }
    return randomHouseArray;
});