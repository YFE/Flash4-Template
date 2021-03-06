;(function(global, undefined) {
    var gm = global.gm = {
        version: "1.2.0"
    };


    var eventManager = function() {
        if (!(this instanceof eventManager)) {
            return new eventManager();
        }
        var self = this,
            keys = function(dict) {
                var keyList = [];
                for (var i in dict) {
                    if (dict.hasOwnProperty(i)) {
                        keyList.push(i);
                    }
                }
                return keyList;
            };
        self._events = {};
        self.on = function(events, callback, context, times) {
            events.split(/\s+/).forEach(function(event) {
                var callList = self._events[event],
                    callObj = {
                        callback: callback,
                        context: context,
                        times: times
                    };
                if (!callList) {
                    callList = self._events[event] = [];
                }
                callList.push(callObj);
            });
            return self;
        }
        self.off = function(events, callback, context) {
            var eventList, i, n;
            if (!arguments.length) {
                self._events = {};
            } else {
                eventList = events ? events.split(/\s+/) : keys(self._events);
                for (i in eventList) {
                    var event = eventList[i],
                        callList = self._events[event];
                    if (callList) {
                        var newList = [];
                        for (var n in callList) {
                            if (callback) {
                                if (callList[n].callback.toString() == callback.toString()) {
                                    if (context && callList[n].context != context) {
                                        newList.push(callList[n]);
                                    } else if (context === null && callList[n].context) {
                                        newList.push(callList[n]);
                                    }
                                } else {
                                    newList.push(callList[n]);
                                }
                            } else if (context && callList[n].context != context) {
                                newList.push(callList[n]);
                            }
                        }
                        self._events[event] = newList;
                    }
                }
            }
            return self;
        }
        self.once = function(events, callback, context) {
            self.on(events, callback, context, 1);
            return self;
        }
        self.trigger = function(events) {
            var args = Array.prototype.slice.call(arguments, 1);
            events.split(/\s+/).forEach(function(event) {
                var callList = self._events[event];
                if (callList) {
                    callList.forEach(function(callObj) {
                        if (callObj.times) {
                            callObj.times -= 1;
                            if (callObj.times == 0) {
                                self.off(event, callObj.callback, callObj.context);
                            }
                        }
                        callObj.callback.apply(callObj.context || this, args);
                    });
                }
            });
            return self;
        }
    }
    gm.EM = eventManager;
    gm.ems = new gm.EM;

    gm.loadImg = function(imgUrl, loadComplete, setLoadingInfo, isReturnImgObj) {
        var _imgOBJ = [];
        var len = imgUrl.length;
        var num = 0;
        var checkLoad = function() {
            num++;
            !!setLoadingInfo && setLoadingInfo(parseInt(num / len * 100));
            if (num == len) {
                !!loadComplete && loadComplete(_imgOBJ);
            }
        }
        var _loadImg = function(url, _i) {
            var val = url;
            var img = new Image();
            img.onload = function() {
                checkLoad();
            }
            img.crossOrigin = 'Anonymous';
            img.src = val;
            if (isReturnImgObj) {
                _imgOBJ[_i] = img;
            }
            if (_i == len - 1) return;
            _loadImg(imgUrl[_i + 1], _i + 1);
        }
        if (len == 0) {
            return !!loadComplete && loadComplete();
        }

        _loadImg(imgUrl[0], 0);
    }

    function animate($element, $self) {
        $element.css({
            '-webkit-animation': 'none',
            'display': 'none'
        });

        $element.each(function(index, element) {
            var $element = $(element),
                $animation = $element.data(),
                $name = $animation.animation,
                $duration = $animation.duration || 1000,
                $ease = $animation.ease || 'ease',
                $delay = $animation.delay || 0,
                $count = $animation.count ? ($animation.count == "infinite" ? "infinite" : parseInt($animation.count)) : 1;
            $element.css({
                'display': 'block',
                '-webkit-animation-name': $name,
                '-webkit-animation-duration': $duration + 'ms',
                '-webkit-animation-timing-function': 'ease',
                '-webkit-animation-timing-function': $ease,
                '-webkit-animation-delay': $delay + 'ms',
                '-webkit-animation-iteration-count': $count,
                'animation-iteration-count': $count,
                '-webkit-animation-fill-mode': 'both'
            });
        });

        return $self || $element;
    }

    gm.animate = {
        list : function(_listBox) {
            var $self = $(_listBox);
            return animate($self.find('[data-animation]'), $self);
        },
        show : function(_mc) {
            var $self = $(_mc);
            return animate($self);
        }
    };

    gm.tracker = {
        page: function(_page) {
            try {
                _hmt.push(['_trackPageview', '/page/' + _page]);
            } catch (e) {}
            try {
                if( typeof MtaH5 == 'object'){
                    // window.history.pushState(null,null,'#/page/' + _page);
                    setTimeout(function(){
                        MtaH5.pgv();
                    },16);
                }
            } catch (e) {}
        },
        event: function(_category, _event, _opt_label, _opt_value) {
            try {
                _hmt.push(['_trackEvent', _category, _event, _opt_label, _opt_value]);
            } catch (e) {}
            try {
                var _data  = {};
                if( typeof MtaH5 == 'object'){
                    if( _opt_label ){
                        _data[_opt_label] = _opt_value || 'true'
                    }
                    MtaH5.clickStat(_event,_data);
                }
            } catch (e) {}
        },
        link: function(_href, _category,_event) {
            setTimeout(function() {
                window.location.href = _href;
            }, 300);
            try {
                gm.tracker.event(_category, _event);
            } catch (e) {}
        }
    }

    gm.wxData = global.wxData = {
        imgUrl: "",
        link: "",
        desc: "",
        title: "",
        singleDesc: "",
        share: function() {
            if (!gm.wxData.singleDesc) gm.wxData.singleDesc = gm.wxData.desc;
            wx.onMenuShareTimeline({
                title: wxData.desc,
                link: wxData.link + (wxData.link.indexOf("?") > -1 ? "&" : "?") + "hmsr=share.wechat&hmpl=share.wechat.moments",
                imgUrl: wxData.imgUrl,
                success: function() {
                    gm.wxData.callback('timeline');
                    
                    gm.tracker.event("share", 'wx_share_timeline');
                },
                cancel: function() {
                    gm.tracker.event("share", 'timeline/cancel');
                }
            });
            wx.onMenuShareAppMessage({
                title: wxData.title,
                desc: wxData.singleDesc,
                link: wxData.link + (wxData.link.indexOf("?") > -1 ? "&" : "?") + "hmsr=share.wechat&hmpl=share.wechat.friend",
                imgUrl: wxData.imgUrl,
                type: '',
                dataUrl: '',
                success: function() {
                    gm.wxData.callback('appmessage');
                    
                    gm.tracker.event("share", 'wx_share_appmessage');
                },
                cancel: function() {
                    gm.tracker.event("share", 'appmessage/cancel');
                }
            });

            // 随手补充QQ分享信息
            $('meta[itemprop="name"]').attr('content', wxData.title);
            $('meta[itemprop="image"]').attr('content', wxData.imgUrl);
            $('meta[itemprop="description"]').attr('content', wxData.singleDesc);
        },
        callback: function(_channel) {
            gm.ems.trigger('share_success','wechat',_channel);
        },
        setDefault: function (_defaultWxData) {
            try {
                gm.wxData.imgUrl = _defaultWxData.imgUrl;
                gm.wxData.link = _defaultWxData.link;
                gm.wxData.desc = _defaultWxData.desc;
                gm.wxData.title = _defaultWxData.title;
                gm.wxData.singleDesc = _defaultWxData.singleDesc || _defaultWxData.desc;
            } catch (e) {}
        },
        fire: function (cb) {
            if ( gm.env.isWechat && gm.env.os == 'ios' ) {
                if (typeof WeixinJSBridge == "object") {
                    WeixinJSBridge.invoke('getNetworkType', {}, cb);
                } else {
                    document.addEventListener('WeixinJSBridgeReady', function () {
                        WeixinJSBridge.invoke("getNetworkType", {}, cb);
                    },false)
                }
            }else {
                cb();
            }
        },
        getConfig : function(_wxid,_callback){
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "https://we.igumo.cc/jsconfig.php?appid="+_wxid,
                data: {
                    url: location.href.split('#')[0]
                },
                success: function(_data) {
                    if (_data.status == 1) {
                        _callback(_data.data);
                    }
                }
            });
        }
    };

    gm.env = function(){
        var ua = window.navigator.userAgent.toLocaleLowerCase(),
        version = window.navigator.appVersion;

        return {
            os : function () {
                var t = ua,
                    e = /android/,
                    n = /iphone|ipod|ipad/;
                return e.test(t) ? "android" : n.test(t) ? "ios" : "pc"
            }(),
            isWechat: function () {
                return /micromessenger/.test(ua);
            }()
        }
    }();

    gm.uri = {
        query : function(t) {
            var e = new RegExp("(^|&)" + t + "=([^&]*)(&|$)", "i"),
                n = window.location.search.substr(1).match(e);
            return null != n ? decodeURIComponent(n[2]) : null
        }
    }

    gm.calc = {
        worker : function(f)  {
            var blob = new Blob(['(' + f.toString() +')()']);
            var url = window.URL.createObjectURL(blob);
            var worker = new Worker(url);
            return worker;
        }
    }

    gm.vld = {
        isEmpty : function(_txt){
            return _txt == '';
        },
        isPhone : function(_txt){
            return /^1[3-9][0-9]{9}$/.test(_txt)
        },
        isEmail : function(_txt){
            return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(_txt);
        },
        isHText : function(_txt){
            return /^[\u4e00-\u9fa5]+$/.test(_txt);
        },
        isNotSymNum : function(_txt){
            return /[^\a-zA-Z\s\u4E00-\u9FA5]/g.test(_txt);
        },
        transName : function(str,_maxlen,_etra) {
            // 将名称拆分为数组,注意: 这样会将表情拆分为两项,其值为代理对.
            // 并且因为,代理对无法被浏览器识别,所以它们的值可能会被转化为 U+feff
            var strArr = str.split(""),
                result = "",
                totalLen = 0,
                isSub = false;

            for (var idx = 0; idx < strArr.length; idx++) {
                // 超出长度,退出程序
                if (_maxlen && totalLen >= _maxlen) {
                    isSub = true;
                    break;
                };
                var val = strArr[idx];
                // 英文,增加长度1
                if (/[a-zA-Z0-9]/.test(val)) {
                    totalLen = 1 + (+totalLen);
                    result += val;
                }
                // 中文,增加长度2
                else if (/[\u4e00-\u9fa5]/.test(val) || /[\uff00-\uffff]/.test(val)) {
                    totalLen = 2 + (+totalLen);
                    result += val;
                }
                // 遇到代理字符,将其转换为 "口", 不增加长度
                else if (/[\ud800-\udfff]/.test(val)) {
                    // 代理对长度为2,
                    result += strArr[idx];
                    if (/[\ud800-\udfff]/.test(strArr[idx + 1])) {
                        // 跳过下一个
                        idx++;
                    }
                    // 将代理对替换为 "口"
                    result += strArr[idx];
                    totalLen = 2 + (+totalLen);
                }
            };
            if (_etra && isSub) {
                result += _etra;
            }

            return [result,totalLen];
        }
    }

    gm.fla = {
        getClass : function (_name) {
            if (window[_name]) {
                return new window[_name][_name.replace(/(\w)/, function (v) { return v.toUpperCase() })]
            }else{
                console.error('no this class');
            }
        },
        setTouch : function(_movieClip, _type, _cb) {
            var _startX = 0,
                _startY = 0,
                _endX = 0,
                _endY = 0,
                _dict = 80;
            var isEventMatch = function (_sx, _sy, _ex, _ey) {
                if (_sx == 0 && _sy == 0) {
                    return false;
                }
                if (_type == "tap") {
                    if (Math.abs(_ex) < 10 && Math.abs(_ey) < 10) {
                        return true;
                    }
                    return false;
                }
                if (_type.indexOf("swipe") > -1) {
                    if (Math.abs(_ex) <= _dict && Math.abs(_ey) <= _dict) {
                        return false;
                    }
                    if (_type == "swipeup") {
                        return _ey < -_dict && _ey < _ex;
                    }
                    if (_type == "swipedown") {
                        return _ey > _dict && _ey > _ex
                    }
                    if (_type == "swipeleft") {
                        return _ex < -_dict && _ex < _ey
                    }
                    if (_type == "swiperight") {
                        return _ex > _dict && _ex > _ey
                    }
                }
            }
    
            _movieClip.on(gm.mt.MOUSE_DOWN, function (e) {
                _startX = e.stageX;
                _startY = e.stageY;
            });
    
            _movieClip.on(gm.mt.MOUSE_UP, function (e) {
                _endX = e.stageX - _startX;
                _endY = e.stageY - _startY;
                isEventMatch(_startX, _startY, _endX, _endY) && _cb(e);
                _startY = 0;
                _startX = 0;
            });

            return _movieClip
        },
        setButton : function(_movieClip){
            _movieClip.anchorX = _movieClip.getWH().width/2;
            _movieClip.anchorY = _movieClip.getWH().height/2;
    
            _movieClip.mouseChildren = false;
            _movieClip.on(gm.mt.MOUSE_DOWN,function(){
                _movieClip.scaleX = _movieClip.scaleY = 0.95;
            })
            _movieClip.on(gm.mt.MOUSE_UP,function(){
                _movieClip.scaleX = _movieClip.scaleY = 1
            })
            _movieClip.on(gm.mt.MOUSE_OUT,function(){
                _movieClip.scaleX = _movieClip.scaleY = 1
            })

            return _movieClip;
        }
    }

    gm.isLoadEnd = false;
    gm.load = function() {
        gm.ems.trigger('load');
        gm.isLoadEnd = true;
    }
    gm.onload = function(_fn) {
        if (gm.isLoadEnd) {
            return _fn();
        }
        gm.ems.on('load',_fn);
    }


}(this));
