<?php
    include "app/config.php";
?>
<!DOCTYPE html>
<html class="landscape">
<head>
	<meta charset="UTF-8">
	<meta name="format-detection"content="telephone=no, email=no" />
	<meta itemprop="name" content="<?=$wxData['title']?>"/>
	<meta itemprop="image" content="<?=$wxData['imgUrl']?>" />
	<meta itemprop="description" name="description" content="<?=$wxData['singleDesc']?>" />
	<title><?=$websiteTitle?></title>
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,shrink-to-fit=no">
	<style> .hide { display:none; } </style>
	<link rel="stylesheet" href="<?=$cdnUrl?>app.css">
	<!-- <link rel="stylesheet" href="https://res.wx.qq.com/open/libs/weui/1.1.3/weui.min.css"> -->
   	<!-- <script src="https://res.wx.qq.com/open/libs/weuijs/1.1.4/weui.min.js"></script> -->
   	<script src="https://res.wx.qq.com/open/js/jweixin-1.4.0.js"></script>
   	<script src="<?=$cdnUrl?>base.js"></script>
   	<!-- <script src="<?=$cdnUrl?>plugin.js"></script> -->
   	<script>
        $(function(){
			FastClick.attach(document.body);
            $(document).on("touchmove", function(e) {
                e.preventDefault();
            });
            $("#app").on("touchmove","img video", function(e) {
                e.preventDefault();
                e.stopPropagation();
            });
            $(".scroller").on("touchmove", function(e) {
                e.stopPropagation();
			});
		});
	</script>
	<script>
		var	__cdnurl = "<?=$cdnUrl?>";
        var __mediaurl = "<?=$mediaUrl?>";

		var	__defaultWxData = {
			imgUrl : "<?=$wxData['imgUrl']?>",
			link : "<?=$wxData['link']?>",
			desc : "<?=$wxData['desc']?>",
			title : "<?=$wxData['title']?>",
			singleDesc : "<?=$wxData['singleDesc']?>"
		};
	</script>
</head>
<body>
<div id="app" class="container"></div>
<script src="<?=$cdnUrl?>app.js"></script>
<script>
	initAPP(function(app){
		
		app.loadStart();
		
		wx.ready(function(){
			gm.wxData.setDefault(__defaultWxData);
			gm.wxData.share();
		});
	});
</script>
</body>
</html>
