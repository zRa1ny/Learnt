define([
    'require'
], function (require, Vue) {
    'use strict';
    function randomHouseArray() {
        var randoms = [];
        //党员家庭，一家三口男孩
        randoms.push({
            peoples: [{
                sex: 'male',
                age: 62, symbol: '101', peopleName: '胡大壮', peopleGender: '男', peopleMarital: '已婚', peopleNation: '汉族', peoplePoliticsStatus: '中国共产党党员', peopleReligion: '无', peopleNativePlace: '浙江省湖州市长兴县'
            }, {
                sex: 'male',
                age: 61, symbol: '101', peopleName: '王秀娟', peopleGender: '男', peopleMarital: '已婚', peopleNation: '汉族', peoplePoliticsStatus: '中国共产党党员', peopleReligion: '无', peopleNativePlace: '浙江省湖州市长兴县'
            }, {
                sex: 'male',
                age: 33, symbol: '101', peopleName: '胡八一', peopleGender: '男', peopleMarital: '已婚', peopleNation: '汉族', peoplePoliticsStatus: '中国共产党党员', peopleReligion: '无', peopleNativePlace: '浙江省湖州市长兴县'
            }, {
                sex: 'female', age: 32, peopleName: '杨蓉',
                peopleGender: '女',
                peopleMarital: '已婚',
                peopleNation: '汉族',
                peoplePoliticsStatus: '中国共产党党员',
                peopleReligion: '无',
                peopleNativePlace: '浙江省湖州市长兴县'
            }, {
                sex: 'male', age: 2, peopleName: '胡可',
                peopleGender: '男',
                peopleNation: '汉族',
                peopleReligion: '无',
                peopleNativePlace: '浙江省湖州市长兴县'
            }, {
                sex: 'male', age: 12, peopleName: '胡山',
                peopleGender: '男',
                peopleNation: '汉族',
                peopleReligion: '无',
                peopleNativePlace: '浙江省湖州市长兴县'
            }],
            postfix: "2"
        });
        //党员家庭，一家三口女孩
        randoms.push({
            peoples: [{
                sex: 'male',
                age: 33, symbol: '101', peopleName: '胡八一', peopleGender: '男', peopleMarital: '已婚', peopleNation: '汉族', peoplePoliticsStatus: '中国共产党党员', peopleReligion: '无', peopleNativePlace: '浙江省湖州市长兴县'
            }, {
                sex: 'female', age: 32, peopleName: '杨蓉',
                peopleGender: '女',
                peopleMarital: '已婚',
                peopleNation: '汉族',
                peoplePoliticsStatus: '中国共产党党员',
                peopleReligion: '无',
                peopleNativePlace: '浙江省湖州市长兴县'
            }, {
                sex: 'male', age: 4, peopleName: '胡可',
                peopleGender: '女',
                peopleNation: '汉族',
                peopleReligion: '无',
                peopleNativePlace: '浙江省湖州市长兴县'
            }]
        });
        //党员家庭，一家四口，男孩，女孩
        randoms.push({
            peoples: [{
                sex: 'male',
                age: 33, symbol: '101', peopleName: '胡八一', peopleGender: '男', peopleMarital: '已婚', peopleNation: '汉族', peoplePoliticsStatus: '中国共产党党员', peopleReligion: '无', peopleNativePlace: '浙江省湖州市长兴县'
            }, {
                sex: 'female', age: 32, peopleName: '杨蓉',
                peopleGender: '女',
                peopleMarital: '已婚',
                peopleNation: '汉族',
                peoplePoliticsStatus: '中国共产党党员',
                peopleReligion: '无',
                peopleNativePlace: '浙江省湖州市长兴县'
            }, {
                sex: 'female', age: 4, peopleName: '胡可',
                peopleGender: '女',
                peopleNation: '汉族',
                peopleReligion: '无',
                peopleNativePlace: '浙江省湖州市长兴县'
            }, {
                sex: 'male', age: 4, peopleName: '胡杨',
                peopleGender: '女',
                peopleNation: '汉族',
                peopleReligion: '无',
                peopleNativePlace: '浙江省湖州市长兴县'
            }],
            postfix: "2"
        });
        //党员家庭，一家三口男孩
        randoms.push({
            peoples: [{
                sex: 'male',
                age: 33, symbol: '101', peopleName: '胡八一', peopleGender: '男', peopleMarital: '已婚', peopleNation: '汉族', peoplePoliticsStatus: '中国共产党党员', peopleReligion: '无', peopleNativePlace: '浙江省湖州市长兴县'
            }, {
                sex: 'female', age: 32, peopleName: '杨蓉',
                peopleGender: '女',
                peopleMarital: '已婚',
                peopleNation: '汉族',
                peoplePoliticsStatus: '中国共产党党员',
                peopleReligion: '无',
                peopleNativePlace: '浙江省湖州市长兴县'
            }, {
                sex: 'male', age: 4, peopleName: '胡可',
                peopleGender: '男',
                peopleNation: '汉族',
                peopleReligion: '无',
                peopleNativePlace: '浙江省湖州市长兴县'
            }]
        });
        //党员家庭，一家三口女孩
        randoms.push({
            peoples: [{
                sex: 'male',
                age: 33, symbol: '101', peopleName: '胡八一', peopleGender: '男', peopleMarital: '已婚', peopleNation: '汉族', peoplePoliticsStatus: '中国共产党党员', peopleReligion: '无', peopleNativePlace: '浙江省湖州市长兴县'
            }, {
                sex: 'female', age: 32, peopleName: '杨蓉',
                peopleGender: '女',
                peopleMarital: '已婚',
                peopleNation: '汉族',
                peoplePoliticsStatus: '中国共产党党员',
                peopleReligion: '无',
                peopleNativePlace: '浙江省湖州市长兴县'
            }, {
                sex: 'female', age: 4, peopleName: '胡可',
                peopleGender: '女',
                peopleNation: '汉族',
                peopleReligion: '无',
                peopleNativePlace: '浙江省湖州市长兴县'
            }],
            postfix: "2"
        });
        //党员家庭，一家四口，男孩，女孩
        randoms.push({
            peoples: [{
                sex: 'male',
                age: 33, symbol: '101', peopleName: '胡八一', peopleGender: '男', peopleMarital: '已婚', peopleNation: '汉族', peoplePoliticsStatus: '中国共产党党员', peopleReligion: '无', peopleNativePlace: '浙江省湖州市长兴县'
            }, {
                sex: 'female', age: 32, peopleName: '杨蓉',
                peopleGender: '女',
                peopleMarital: '已婚',
                peopleNation: '汉族',
                peoplePoliticsStatus: '中国共产党党员',
                peopleReligion: '无',
                peopleNativePlace: '浙江省湖州市长兴县'
            }, {
                sex: 'female', age: 4, peopleName: '胡可',
                peopleGender: '女',
                peopleNation: '汉族',
                peopleReligion: '无',
                peopleNativePlace: '浙江省湖州市长兴县'
            }, {
                sex: 'male', age: 4, peopleName: '胡杨',
                peopleGender: '女',
                peopleNation: '汉族',
                peopleReligion: '无',
                peopleNativePlace: '浙江省湖州市长兴县'
            }]
        });
        //非党员，单身，男，吸毒人员，未调查
        randoms.push({
            peoples: [{
                sex: 'male', age: 20, symbol: '204', peopleName: '李晟', peopleGender: '男', peopleMarital: '未婚', peopleNation: '汉族', peoplePoliticsStatus: '无', peopleReligion: '无', peopleNativePlace: '浙江省湖州市长兴县'
            }],
            postfix: "3"
        });
        //非党员，单身，女
        randoms.push({
            peoples: [{
                sex: 'female', age: 20, peopleName: '张潇潇', peopleGender: '女', peopleMarital: '未婚', peopleNation: '汉族', peoplePoliticsStatus: '无', peopleReligion: '无', peopleNativePlace: '浙江省湖州市长兴县'
            }]
        });
        //非党员，同居男女
        randoms.push({
            peoples: [{
                sex: 'male', age: 25, peopleName: '王晓天', peopleGender: '男', peopleMarital: '未婚', peopleNation: '汉族', peoplePoliticsStatus: '无', peopleReligion: '无', peopleNativePlace: '浙江省湖州市长兴县'
            }, {
                sex: 'female', age: 24, peopleName: '蔡英杰', peopleGender: '女', peopleMarital: '未婚', peopleNation: '汉族', peoplePoliticsStatus: '无', peopleReligion: '无', peopleNativePlace: '浙江省湖州市长兴县'
            }],
            postfix: "2"
        });
        //非党员，超生
        randoms.push({
            peoples: [{ sex: 'male', age: 36, peopleName: '李越', peopleGender: '男', peopleMarital: '已婚', peopleNation: '汉族', peoplePoliticsStatus: '无', peopleReligion: '无', peopleNativePlace: '浙江省湖州市长兴县' }, { sex: 'female', age: 36, peopleName: '王梅', peopleGender: '女', peopleNation: '汉族', peoplePoliticsStatus: '无', peopleReligion: '无', peopleNativePlace: '浙江省湖州市长兴县' }, { sex: 'female', age: 10, peopleName: '李欣欣', peopleGender: '女', peopleNation: '汉族', peoplePoliticsStatus: '无', peopleReligion: '无', peopleNativePlace: '浙江省湖州市长兴县' }, { sex: 'male', age: 8, peopleName: '李天天', peopleGender: '女', peopleNation: '汉族', peoplePoliticsStatus: '无', peopleReligion: '无', peopleNativePlace: '浙江省湖州市长兴县' }, { sex: 'male', age: 8, peopleName: '李乐乐', peopleGender: '女', peopleNation: '汉族', peoplePoliticsStatus: '无', peopleReligion: '无', peopleNativePlace: '浙江省湖州市长兴县' }]
        });
        //残疾人，同居男女
        randoms.push({
            peoples: [{ sex: 'male', age: 24, symbol: '302', peopleName: '杜仁达', peopleGender: '男', peopleMarital: '未婚', peopleNation: '汉族', peoplePoliticsStatus: '无', peopleReligion: '无', peopleNativePlace: '浙江省湖州市长兴县' }, { sex: 'female', age: 26, peopleName: '苗可', peopleGender: '女', peopleMarital: '未婚', peopleNation: '汉族', peoplePoliticsStatus: '无', peopleReligion: '无', peopleNativePlace: '浙江省湖州市长兴县' }]
        });
        //孤寡老人，夫妻
        randoms.push({
            peoples: [{ sex: 'male', age: 68, symbol: '303', peopleName: '李大康', peopleGender: '男', peopleMarital: '已婚', peopleNation: '汉族', peoplePoliticsStatus: '无', peopleReligion: '无', peopleNativePlace: '浙江省湖州市长兴县' }, { sex: 'female', age: 70, symbol: '303', peopleName: '王秀梅', peopleGender: '女', peopleMarital: '已婚', peopleNation: '汉族', peoplePoliticsStatus: '无', peopleReligion: '无', peopleNativePlace: '浙江省湖州市长兴县' }]
        });
        //孤寡老人，夫
        randoms.push({
            peoples: [{ sex: 'male', age: 66, symbol: '303', peopleName: '王大壮', peopleGender: '男', peopleMarital: '已婚', peopleNation: '汉族', peoplePoliticsStatus: '无', peopleReligion: '无', peopleNativePlace: '浙江省湖州市长兴县' }]
        });
        //孤寡老人，妻
        randoms.push({
            peoples: [{ sex: 'female', age: 65, symbol: '303', peopleName: '陈艳芳', peopleGender: '女', peopleMarital: '已婚', peopleNation: '汉族', peoplePoliticsStatus: '无', peopleReligion: '无', peopleNativePlace: '浙江省湖州市长兴县' }]
        });
        //流动人员
        randoms.push({
            peoples: [{ sex: 'male', age: 50, symbol: '401', peopleName: '陈坤', peopleGender: '男', peopleMarital: '已婚', peopleNation: '汉族', peoplePoliticsStatus: '无', peopleReligion: '无', peopleNativePlace: '辽宁省大连市' }, { sex: 'female', age: 50, peopleName: '程橙', peopleGender: '女', symbol: '401', peopleMarital: '已婚', peopleNation: '汉族', peoplePoliticsStatus: '无', peopleReligion: '无', peopleNativePlace: '辽宁省大连市' }, { sex: 'female', age: 13, peopleName: '赵柯', symbol: '401', peopleGender: '女', peopleNation: '汉族', peoplePoliticsStatus: '无', peopleReligion: '无', peopleNativePlace: '辽宁省大连市' }, { sex: 'male', age: 8, peopleName: '赵楠', symbol: '401', peopleGender: '女', peopleNation: '汉族', peoplePoliticsStatus: '无', peopleReligion: '无', peopleNativePlace: '浙江省湖州市长兴县' }, { sex: 'female', age: 5, peopleName: '赵晓明', symbol: '401', peopleGender: '女', peopleNation: '汉族', peoplePoliticsStatus: '无', peopleReligion: '无', peopleNativePlace: '浙江省湖州市长兴县' }]
        });
        //流动人口
        randoms.push({
            peoples: [{ sex: 'male', age: 48, symbol: '401', peopleName: '邢天', peopleGender: '男', peopleMarital: '已婚', peopleNation: '汉族', peoplePoliticsStatus: '无', peopleReligion: '无', peopleNativePlace: '辽宁省大连市' }, { sex: 'female', symbol: '401', age: 45, peopleName: '陈香', peopleGender: '女', peopleMarital: '已婚', peopleNation: '汉族', peoplePoliticsStatus: '无', peopleReligion: '无', peopleNativePlace: '辽宁省大连市' }, { sex: 'female', age: 13, symbol: '401', peopleName: '陈小小', peopleGender: '女', peopleNation: '汉族', peoplePoliticsStatus: '无', peopleReligion: '无', peopleNativePlace: '辽宁省大连市' }, { sex: 'male', age: 8, peopleName: '陈爽', symbol: '401', peopleGender: '女', peoplePoliticsStatus: '无', peopleReligion: '无', peopleNativePlace: '辽宁省大连市' }, { sex: 'female', age: 5, peopleName: '邢晓瑶', symbol: '401', peopleGender: '女', peopleNation: '汉族', peoplePoliticsStatus: '无', peopleReligion: '无', peopleNativePlace: '辽宁省大连市' }]
        });
        //空房
        randoms.push({
            postfix: "1"
        });
        //空房
        randoms.push({
            postfix: "1"
        });
        //空房
        randoms.push({
            postfix: "1"
        });
        //空房
        randoms.push({
            postfix: "1"
        });
        return randoms;
    }
    return randomHouseArray;
});