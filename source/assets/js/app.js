;(function on_init() {
	/*
	 * 添加事件管理器
	 * ems.on/one/off/trigger
	 */
	var ems = new gm.EM;
	

	var MyApp = function () {}
	var __MyAppPrototype =  {
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
			$(window).on('resize', function on_resize() {
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
			annie._isReleased= __version.replace('?v=','');
			annie.suffixName = '.swf';

			self.stage = new annie.Stage('app', 800, self.initHeight, 30, annie.StageScaleMode.FIXED_HEIGHT, 0);

			// 横屏设计
			// self.stage = new annie.Stage('app', self.initHeight, 800, 30, annie.StageScaleMode.FIXED_WIDTH, 0);

			self.stage.autoSteering = false;
			// self.stage.autoResize = false;

			self.stage.addEventListener(annie.Event.ON_INIT_STAGE, function on_init_stage(e) {
				annie.loadScene(['cloading'], function (per) {
					self.loadProcess(per);
				}, function (result) {
					if (result.sceneId == result.sceneTotal) {
						
						var ploading = self.page['cloading'] = gm.fla.getClass('cloading');
						// 全面屏 竖屏设计
						ploading.y = self.suitHeight;

						// 全面屏 横屏设计
						// ploading.x = self.suitHeight;

						ems.on('resize', _.throttle(function ems_resize(){
							// 竖屏设计
							self.stage.desHeight = self.initHeight;
							ploading.y = self.suitHeight;

							// 横屏设计
							// self.stage.desWidth = self.initHeight;
							// ploading.x = self.suitHeight;

							// self.stage.autoResize = true;
							// _.delay(function(){
							// 	self.stage.autoResize = false;
							// },150)
						}, 16, {
							trailing : false
						}));

						//font handlee
						ploading.loadBox.loadText.loadNum.font = 'handlee';

						ploading.loadBox.gotoAndPlay(2);
						self.loadProcess = function (_per) {
							ploading.loadBox.loadText.loadNum.text = _per + "%";
						}
						self.loadProcess(0);
						self.stage.addChild(ploading);

						// 加载其他
						annie.loadScene(['cmain'], function (per) {
							self.loadProcess(per);
						}, function (result) {
							if (result.sceneId == result.sceneTotal) {
								self.loadProcess(100);
								
								self.page['cmain'] = gm.fla.getClass('cmain');
								ploading.container.addChild(self.page['cmain']);
								annie.Tween.to(ploading.loadBox,0.3,{
									alpha: 0,
									onComplete : function(){
										ploading.loadBox.visible = false;
									}
								})
								
								self.loadComplete();
								gm.load();
							}
						}, __cdnurl);
					}
				}, __cdnurl);
			});
		},
		loadProcess: function (_per) {},
		loadComplete: function () {
			this.init();
		},
		page: {},
		init: function () {
			var self = this;

			
		}
	};
	
	MyApp.prototype = __MyAppPrototype;
	var myapp = new MyApp;

	window.initAPP = function (cb) {
		if( myapp.isInited ) return;
		myapp.isInited = true;
		cb(myapp);
	}
}());