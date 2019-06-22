<?php

    // 活动网站地址
    $websiteUrl = 'https://o.gumo.pro/brand/campaign/';
    // 活动网站标题
    $websiteTitle = '活动网站标题';

    // CDN静态地址设置
    $cdnUrl = "./release/test/";
    
    // 固定图片、二维码图片、视频文件等资源地址设置
    $mediaUrl = "./media/";
    
    // 如果是线上环境
    if( getenv(ENV) == 'production' ){
        $cdnUrl = "https://ts.o.gumo.pro/brand/campaign/release/v1234567890/";
        $mediaUrl = "https://ts.o.gumo.pro/brand/campaign/media/";
    }

    $version = '?v=123';

    // 微信默认分享设置
    $wxData = [
        'link' => $websiteUrl,
        'imgUrl' => $mediaUrl."share.jpg".$version,
        'desc' => '分享到朋友圈的文案',
        'title' => '分享到朋友的标题',
        'singleDesc' => '分享到朋友的描述'
    ];
?>
