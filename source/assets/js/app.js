;(function (global) {
	/*
	 * 添加事件管理器
	 * ems.on/one/off/trigger
	 */
	var ems = new gm.EM;

	var MyApp = function () {}
	MyApp.prototype = {
		loadStart: function () {
			var self = this;
			/*
			 * 添加事件别名
			 */
			gm.mt = annie.MouseEvent;
			gm.et = annie.Event;

			/*
			 * 全面屏 尺寸
			 * 设计尺寸 800 1280，安全范围 640 1040 居中
			 */
			$(window).on('resize', function () {
				var _selfBox = $("#app");
				// 当前屏幕宽高从低至高排序
				var _selfwh = _.sortBy([_selfBox.width(), _selfBox.height()]);
				// 当前屏幕长边换算长度
				var _screenHeight = _selfwh[1] / (_selfwh[0] / 640);
				//传入 stage 的 设计长边长度
				var _desHeight = _screenHeight <= 1040 ? 1040 : _screenHeight;
				//画面居中间距
				self.suitHeight = -(1280 - _desHeight > 0 ? 1280 - _desHeight : 0) / 2 + (_screenHeight > 1280 ? (_screenHeight - 1280) / 2 : 0);
				self.initHeight = _desHeight;

				ems.trigger('resize');
			}).trigger('resize');

			//单文件模式
			annie._isReleased="123";

			self.stage = new annie.Stage('app', 800, self.initHeight, 30, annie.StageScaleMode.FIXED_HEIGHT, 0);

			// 横屏设计
			// self.stage = new annie.Stage('app', self.initHeight, 800, 30, annie.StageScaleMode.FIXED_WIDTH, 0);

			self.stage.autoResize = false;
			self.stage.autoSteering = false;
			self.stage.addEventListener(annie.Event.ON_INIT_STAGE, function (e) {
				annie.loadScene(['cloading'], function (per) {
					self.loadProcess(per);
				}, function (result) {
					if (result.sceneId == result.sceneTotal) {
						
						self.page['cloading'] = gm.getFlaClass('cloading');
						// 全面屏 竖屏设计
						self.page['cloading'].y = self.suitHeight;

						// 全面屏 横屏设计
						// self.page['cloading'].x = self.suitHeight;

						ems.on('resize', function () {
							// 竖屏设计
							self.stage.desHeight = self.initHeight;
							self.page['cloading'].y = self.suitHeight;

							// 横屏设计
							// self.stage.desWidth = self.initHeight;
							// self.page['cloading'].x = self.suitHeight;

							self.stage.resize();
						})

						//font handlee
						self.page['cloading'].loadBox.loadText.loadNum.font = 'handlee';

						self.page['cloading'].loadBox.gotoAndPlay('in');
						self.page['cloading'].loadBox.addEventListener(gm.et.END_FRAME, function () {
							self.page['cloading'].loadBox.visible = false;
						})
						self.loadProcess = function (_per) {
							self.page['cloading'].loadBox.loadText.loadNum.text = _per + "%";
						}
						self.loadProcess(0);
						self.stage.addChild(self.page['cloading']);

						// 加载其他
						annie.loadScene(['cmain'], function (per) {
							self.loadProcess(per);
						}, function (result) {
							if (result.sceneId == result.sceneTotal) {
								self.loadProcess(100);

								self.page['cmain'] = gm.getFlaClass('cmain');
								self.page['cloading'].container.addChild(self.page['cmain']);
								self.page['cloading'].loadBox.gotoAndPlay('out');
								annie.Tween.to(self.page['cloading'].loadBox,0.3,{
									alpha: 0,
									onComplete : function(){
										self.page['cloading'].loadBox.visible = false;
									}
								})
								
								self.loadComplete();
								gm.load();
							}
						}, __cdnurl + "dist/");
					}
				}, __cdnurl + "dist/");
			});
		},
		loadProcess: function (_per) {},
		loadComplete: function () {
			this.listener();
			this.init();
		},
		page: {},
		init: function () {
			var self = this;

			
		},
		listener: function () {
			var self = this;
			
			
		}
	};
	var myapp = new MyApp;

	window.A2xExtend = function () {
		var _extend = {};
		try {
			if (__extends) {
				_extend = __extends;
			}
		} catch (error) {}
		return _extend;
	}();


	this.initAPP = function (cb) {
		cb(myapp);
	}
}(this));