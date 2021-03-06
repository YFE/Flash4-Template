<?php
	include "app/config.php";
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="format-detection"content="telephone=no, email=no" />
	<meta itemprop="name" content="<?=$wxData['title']?>"/>
	<meta itemprop="image" content="<?=$wxData['imgUrl']?>" />
	<meta itemprop="description" name="description" content="<?=$wxData['singleDesc']?>" />
	<title><?=$websiteTitle?></title>
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,shrink-to-fit=no">
	<style> .hide { display:none; } </style>
	<link rel="stylesheet" href="<?=$cdnUrl?>app.css<?=$version?>">
    <!-- <link rel="stylesheet" href="https://res.wx.qq.com/open/libs/weui/2.1.3/weui.min.css" /> -->
	<!-- <script src="https://res.wx.qq.com/open/libs/weuijs/1.2.1/weui.min.js"></script> -->
	<script src="https://res.wx.qq.com/open/js/jweixin-1.4.0.js"></script>
   	<script src="<?=$cdnUrl?>base.js<?=$version?>"></script>
	<script>
		var	__cdnurl = "<?=$cdnUrl?>";
        var __mediaurl = "<?=$mediaUrl?>";
        var __version = "<?=$version?>";

		var	__defaultWxData = {
			imgUrl : "<?=$wxData['imgUrl']?>",
			link : "<?=$wxData['link']?>",
			desc : "<?=$wxData['desc']?>",
			title : "<?=$wxData['title']?>",
			singleDesc : "<?=$wxData['singleDesc']?>"
		};

		//设置默认分享及JSSDK
		gm.wxData.setDefault(__defaultWxData);
		gm.wxData.getConfig('wx27cab28ef198a2dd',function(_data){
			wx.config({
				debug: false,
				appId: _data.appId,
				timestamp: _data.timestamp,
				nonceStr: _data.nonceStr,
				signature: _data.signature,
				jsApiList: [
					'onMenuShareTimeline',
					'onMenuShareAppMessage',
					'hideMenuItems',
					'hideAllNonBaseMenuItem'
				]
			});
		});
		wx.ready(function(){
			gm.wxData.share();
		});
	</script>
</head>
<body>
<div id="app" class="container"></div>
<script src="<?=$cdnUrl?>app.js<?=$version?>"></script>
<script>
	initAPP(function(app){
		app.loadStart();

		//分享成功事件
		gm.ems.on('share_success',function(_app,_channel){
			
		})
	});
</script>
</body>
</html>
