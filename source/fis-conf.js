//以下目录及文件不进入编译范围
fis.set('project.ignore', [
    'flash/**',
    'assets/css/reset.styl',
    'assets/css/weui.styl',
    'assets/css/font.styl',
    'dist/libs/**',
    'dist/src/Main.js',
    'dist/index.html',
    'fis-conf.js',
    '.DS_Store'
]);

fis.match('::package', {
    postpackager: fis.plugin('loader')
});


// packOrder为合并时的排序，数字越大越前
fis.match('assets/js/libs/jquery.min.js', {
    packOrder: -100
});
fis.match('assets/js/libs/gm.js', {
    packOrder: -80
});

// Libs JS打包为一个文件
fis.match('assets/js/libs/*.js', {
    packTo: 'base.js',
    release: ''
});

// PLugin 文件夹 JS打包为一个文件
fis.match('assets/js/plugin/*.js', {
    packTo: 'plugin.js'
});


fis.match('assets/js/(*.js)', {
    optimizer: fis.plugin('uglify-js'),
    release: '$1'
});


fis.match('dist/**/(*.{js,swf,json,zip,txt})', {
    release: '$1'
});


//stylus文件编译
fis.match('*.styl', {
    parser: 'stylus',
    rExt: '.css',
    isCssLike : false,
    optimizer: fis.plugin('clean-css'),
    packTo: 'app.css'
});
fis.match('*.css', {
    isCssLike : false
});

// 图片文件目录
fis.match('assets/images/(*.{png,jpg,gif})', {
    release: '$1'
});

//输出 test 目录
//fis3 release dev -d
//fis3 release dev -d -w 如在后面再加上-w 为实时检测变化
fis.media('dev').match('**', {
    deploy: [
        fis.plugin('replace', {
            from: /\"src\/\"\+C\[\_\]\+\"\/\"\+/,
            to: ''
        }),
        fis.plugin('skip-packed'),
        fis.plugin('local-deliver', {
            to: '../release/test'
        })
    ]
});

// 获取日期版本号
function getVersion(){
    var _now = new Date();
    return "v" + checkTime(_now.getDate()) + checkTime(_now.getHours()) + checkTime(_now.getMinutes()) + checkTime(_now.getSeconds());

    function checkTime(i) {
        if (i < 10) {
            i = "0" + i
        }
        return i
    }
}

var currVersion = getVersion();
//输出 版本号 目录
//fis3 release pro -d
fis.media('pro').match('**', {
    deploy: [
        fis.plugin('replace', {
            from: /\"src\/\"\+C\[\_\]\+\"\/\"\+/,
            to: ''
        }),
        fis.plugin('skip-packed'),
        fis.plugin('local-deliver', {
            to: '../release/' + currVersion
        })
    ]
});

//输出 版本号 目录 并删除其他版本目录
//fis3 release prod -d
fis.media('prod').match('**', {
    prepackager : function (content, file, settings) {
        var exec = require('child_process').exec,child;
        child = exec('rm -rf ../release/*',function(err,out) {
            console.log(out);
            err && console.log(err);
        });
        return true;
    },
    deploy: [
        fis.plugin('replace', {
            from: /\"src\/\"\+C\[\_\]\+\"\/\"\+/,
            to: ''
        }),
        fis.plugin('skip-packed'),
        fis.plugin('local-deliver', {
            to: '../release/' + currVersion
        })
    ]
});


//自动去除console.log等调试信息
fis.config.set('settings.optimizer.uglify-js', {
    compress : {
        // drop_console: true
    }
});

console.log("本次版本号为： "+ currVersion);
