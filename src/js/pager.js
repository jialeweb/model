(function () {
    /**
     * js 分页插件
     * @param selector 存放分页的目标元素
     * @param {Object} 配置选项
     * option {
     * count 记录总条数
     * linkList 每页显示链接数
     * preSize 每页展示记录数
     * currPage 当前页数
     * pageParamKey 分页传参值
     * }
     * @returns {Pager}
     * @constructor
     */
    function Pager(selector, options) {
        if (!(this instanceof Pager)) {
            return new Pager(selector, options);
        }
        // 根据当前 url 获取
        this.el = document.querySelector(selector);
        this.param = window.location.search.substr(1) || "";
        this.hash = window.location.hash.substr || "";
        this.pageParamKey = options.pageParamKey || "page";
        this.currPage = options.currPage || 1;
        if (this.param) {

            if (this.param.indexOf(this.pageParamKey) > -1) {
                var o = this.paramStrToObj(this.param);
                this.currPage = o[this.pageParamKey] * 1;
            } else {
                this.param += "&" + this.pageParamKey + "=" + this.currPage;
            }

        } else {
            this.param = this.pageParamKey + "=" + this.currPage;
        }

        this.count = options.count * 1;
        this.linkList = options.linkList * 1 || 5;
        this.preSize = options.preSize * 1 || 5;

        var self = this;

        // 计算总页数
        this.countPages = Math.ceil(this.count / this.preSize);
        var leftPage_num = Math.floor(this.linkList / 2);
        var left = Math.max(1, (this.currPage - leftPage_num));
        var right = Math.min((left + this.linkList - 1), this.countPages);
        left = Math.max((right - this.linkList + 1), 1);
        this.paramArr = [];
        for (var i = left; i <= right; i++) {
            var o = this.paramStrToObj(this.param);
            o[this.pageParamKey] = i;
            this.paramArr.push(this.objToParamStr(o));
        }
    }


    Pager.prototype = {
        pageStyle: function () {

            var self = this;
            var pageStr = "";
            var o = this.paramStrToObj(this.param);
            // 上一页
            var prePage = ""
            if (this.currPage > 1) {
                o[this.pageParamKey] = this.currPage - 1;
                prePage = this.objToParamStr(o);
                pageStr += "<a href='?" + prePage + "'>上一页</a>\r\n";
            }


            var pageLinks = "";
            for (var i = 0; i < this.paramArr.length; i++) {
                var _a = this.paramStrToObj(this.paramArr[i]);
                var a;
                if (_a.page == 1 || _a.page == this.countPages) {
                    a = "<a class='c'>" + _a.page + "</a>\r\n";
                } if(_a.page  == this.currPage){
                    a = "<a class='c'>" + _a.page + "</a>\r\n";
                }else {
                    a = "<a href='?" + this.paramArr[i] + "'>" + _a.page + "</a>\r\n";
                }
                pageLinks += a;
            }
            pageStr += pageLinks;


            // 下一页
            var nextPage = "";
            if (this.currPage < this.countPages) {
                o[this.pageParamKey] = this.currPage * 1 + 1;
                nextPage = this.objToParamStr(o);
                pageStr += "<a href='?" + nextPage + "'>下一页</a>\r\n";
            }
            pageStr += " 共 <span>" + this.countPages + "</span> 页 "
            pageStr += " 到 <input type='number' id='page' min='1' max='" + this.countPages + "' value='1' /> 页";
            pageStr += "<button type='button'>确定</button>";

            this.el.innerHTML = pageStr;
            this.el.querySelector("button").onclick = function () {
                var page = document.querySelector("#page").value * 1 || 1;
                if (isNaN(page)) {
                    page = 1;
                }
                o[self.pageParamKey] = page;
                var req = self.objToParamStr(o);
                location.search = req;
            }
        },
        reserve2: function (_obj) {
            if (typeof _obj === 'string') {
                return this.paramStrToObj(_obj);
            } else if (_obj instanceof Object) {
                return this.objToParamStr(_obj);
            }
        },
        paramStrToObj: function (str) {
            var param = Array.prototype.slice.call(str.split('&'));
            var o = {};
            for (var i = 0; i < param.length; i++) {
                o[param[i].split('=')[0]] = param[i].split('=')[1];
            }
            return o;
        },

        objToParamStr: function (obj) {
            var str = "";
            for (var x in obj) {
                // str += x + "=" + encodeURI(obj[x]) + "&";
                str += x + "=" + obj[x] + "&";
            }
            str = str.substr(0, str.length - 1);
            return str;
        }
    }
    window.Pager = Pager;
})()