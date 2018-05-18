(function () {
    function Slider(selector, time, nobtn) {
        var self = this;
        this.el = document.querySelector(selector);
        this.w = this.el.offsetWidth;
        this.mainContainer = this.el.querySelector('.main-container');
        this.items = this.el.querySelectorAll('.main-container li');
        this.ctlStep = document.createElement('ol');
        this.ctlStep.className = "ctl-step";
        for (var i = 0; i < this.items.length; i++) {
            var ctlStepPoint = document.createElement('li');
            ctlStepPoint.index = i;
            if (i === 0) {
                this.items[i].className += "active";
                ctlStepPoint.className = "active";
                this.index = 0;
                this.h = this.el.style.height = this.items[i].clientHeight + 'px'; // 初始化为第一个的高度
            }
            this.items[i].style.left = this.w * i + 'px';
            ctlStepPoint.onclick = function () {
                self.changeStep(this);
            };
            this.ctlStep.appendChild(ctlStepPoint);
        }
        this.el.appendChild(this.ctlStep);
        var left = document.createElement('button'),
            right = document.createElement('button');
        left.className = "ctl-btn left";
        right.className = "ctl-btn right";
        // left.innerHTML = "&lt;";
        // right.innerHTML = "&gt;";
        left.style.backgroundImage="url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkZCQURFRUYxQ0U4QTExRTdCRDU0RkNCREExRjVDREQ2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkZCQURFRUYyQ0U4QTExRTdCRDU0RkNCREExRjVDREQ2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkJBREVFRUZDRThBMTFFN0JENTRGQ0JEQTFGNUNERDYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkJBREVFRjBDRThBMTFFN0JENTRGQ0JEQTFGNUNERDYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz47nDQFAAACD0lEQVR42uyYPWvCUBSGYxuoDhFCQ4cMDoKuQVyKroLioJN70EFHf4A/wtVBd9HJQXSQDqK4RHDNIKVgwCoUldIgofS+lIBLoZpcuUIOBM4dEh7OzXu+fBzHvXA3YHfcjZgH6oF6oB4oZWs2m/JqtYorisKf8949edRrQQ4Gg3ChUAgLgvAgSZLV6XR2/33Xd63KNJlMoolEQoY/nU6NZDKpM3X1uGJd1xUbstvtLs+FpA4KyH6/r0QiERHnVqulk6t/Y0pM5XJZmM1mz7IsC6ZpWrVabVEqlYxLv8fTgqzX64rf7+cBWa1WF41G4+DkmzyN9FMsFqPwDcM4ZLPZBTGLqTx6CkngNm5BuhpRp+mHekSh7FPIS9MP1Yja6QfKttOPE2VTiWgulwvYkFB2pVLRaEFeHFFAttvtuJvph0pEe73e13w+f4cP2FQqJdIuxY6aEtpKd031AIOA4AMY4Of2mVdt82hVI9cbZ/LPHizL2pGoSqIoBojYxNFotFmv199MgcLG47G53W4/iLCeAKuqqoyzpmlHpkBhgAIc+XdFjBuAdguWyihCo2JRaZwhJAgKwsIZQoPgmIvoX7l2OBy+ZTKZJZNzPXItigH8dDodAjizCwjAov2zCwOmUmYXEFg2hEKhYywWeyQWOHcBcdVNCQpDMBj83O/3Zj6ff2VKTMyMIh6oB+qB/tqPAAMALokgw01nVsAAAAAASUVORK5CYII=)"
        right.style.backgroundImage="url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkY0OTgyQjgzQ0U4QTExRTdCNjNGRTA1Q0I1MzBBQTJCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkY0OTgyQjg0Q0U4QTExRTdCNjNGRTA1Q0I1MzBBQTJCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjQ5ODJCODFDRThBMTFFN0I2M0ZFMDVDQjUzMEFBMkIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjQ5ODJCODJDRThBMTFFN0I2M0ZFMDVDQjUzMEFBMkIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4HYV4CAAACRUlEQVR42uyYsYvaUBzHc62lOmQIbeGIJcOBLh0iOLTopIsOIgiKq+AguOqmo7N/grvoJA7q4iCKS8Cc3GCEGw7MohiKcCdHhuZ79BXHXsyz72geiL8MPj7I732+v5crjuPG3BtY77g3slxQF9QF/degg8HgJp1O+y4F+t76FF77o+l0GozFYl8zmcy19XiYTCZHJkF3u90jIL1erycej1+bpvmTNqwt0NVqZS6Xy20ymfzk8/k+AFaSpOder3egBXp1ToTKsuwZj8dhQRBeerXb7d7ncrkH5kDJ2mw2YVEUedTD4fDB+qfvmdST3+9XVFXdok4kEhIOG7MeDYVCd7PZTEcdiUTExWLxjVnhR6NRDX36u3+/oCWYTSYcJgKLvnUKlkqEArbZbN4R2P1+//3cFLPl0b9Zo9HoEUFg9etnnuc/IiDgXjiYKVAspBXgSIrh20o1Q1GUZ6ZAT1OMwKZSKdFO5F5kzLOi9anf7/9JrHK5fMPkPIqRMJvNvsAhGBAQr93DQxsS4odTUSMQ4FrmJnxN02QCCbfahaQGiqkK7gwEAgKeW62Wdu5U5TgoxD6fz3+Q0Q/iLxaLOlPJVCqV+Ha7HYaGjsejWa/X1UqlsnVib8cOU61WExqNhowakPl8XoGWnNrfEdBOpyMR/RiG8VQoFG6dhHQEFI7EsIxa1/WDHUdSBz115Hq9NoLBoEpLdbZB4UiiH6QNJnzm3pScQuIyRxvSNmi1WtVwspE2NG6c1K7Ll1jua0cX1AX930B/CTAAtmsSkek0bSsAAAAASUVORK5CYII=)"
        left.onclick = function () {
            self.left();
        };
        right.onclick = function () {
            self.right();
        };
        if(!nobtn){
            this.el.appendChild(left);
            this.el.appendChild(right);
        }

        if (time) {
            this.autorun(time);
        }
    }

    Slider.prototype = {
        left: function () {
            var index = this.index = Math.max(0, --this.index);
            this.ctlStep.querySelector('.active').className = '';
            this.ctlStep.querySelectorAll('li')[index].className = 'active';
            this.mainContainer.querySelector('.active').className = '';
            this.items[index].className = 'active';
            this.mainContainer.style.left = (-this.w * index) + 'px';
            this.h = this.items[index].clientHeight;
            this.el.style.height = this.h + 'px';
        },
        right: function () {
            var index = this.index = Math.min(this.items.length - 1, ++this.index);
            this.ctlStep.querySelector('.active').className = '';
            this.ctlStep.querySelectorAll('li')[index].className = 'active';
            this.mainContainer.querySelector('.active').className = '';
            this.items[index].className = 'active';
            this.mainContainer.style.left = (-this.w * index) + 'px';
            this.h = this.items[index].clientHeight;
            this.el.style.height = this.h + 'px';
        },
        changeStep: function (obj) {
            var self = this;
            if (this.index === obj.index) return;
            var index = this.index = obj.index;
            this.ctlStep.querySelector('.active').className = '';
            this.ctlStep.querySelectorAll('li')[index].className = 'active';
            this.mainContainer.querySelector('.active').className = '';
            this.items[index].className = 'active';
            this.mainContainer.style.left = (-this.w * index) + 'px';
            this.h = this.items[index].clientHeight;
            this.el.style.height = this.h + 'px';
        },
        autorun: function (t) {
            var self = this;
            self.timer = setInterval(_autorun, t * 1000);
            this.el.onmouseover = function () {
                clearInterval(self.timer);
            }
            this.el.onmouseout = function () {
                self.timer = setInterval(_autorun, t * 1000);
            }

            function _autorun() {
                var index = ++self.index;
                if (index > self.items.length - 1) {
                    index = 0;
                }
                self.index = index;
                self.ctlStep.querySelector('.active').className = '';
                self.ctlStep.querySelectorAll('li')[index].className = 'active';
                self.mainContainer.querySelector('.active').className = '';
                self.items[index].className = 'active';
                self.mainContainer.style.left = (-self.w * index) + 'px';
                self.h = self.items[index].clientHeight;
                self.el.style.height = self.h + 'px';
            }
        }
    };
    window.Slider = Slider;
})();