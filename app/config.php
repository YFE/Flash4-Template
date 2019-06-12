<?php

    // 活动网站地址
    $websiteUrl = 'https://o.gumo.pro/brand/campaign/';
    // 活动网站标题
    $websiteTitle = '活动网站标题';

    // CDN静态地址设置
    $cdnUrl = "./release/test/";
    // 视频文件地址设置
    $mediaUrl = "./media/";
    
    // 如果是线上环境
    if( getenv(ENV) == 'production' ){
        $cdnUrl = "https://ts.o.gumo.pro/brand/campaign/release/v1234567890/";
        $mediaUrl = "https://ts.o.gumo.pro/brand/campaign/media/";
    }

    // 微信默认分享设置
    $wxData = [
        'link' => $websiteUrl,
        'imgUrl' => $cdnUrl."share.jpg",
        'desc' => '分享到朋友圈的文案',
        'title' => '分享到朋友的标题',
        'singleDesc' => '分享到朋友的描述'
    ];
?>
