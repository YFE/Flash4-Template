//以下目录及文件不进入编译范围
fis.set('project.ignore', [
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
    packager: fis.plugin('map', {
        useTrack : false
    }),
    postpackager: fis.plugin('loader')
});

fis.match('assets/js/libs/gm.js', {
    optimizer: fis.plugin('uglify-js'),
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
// fis.match('assets/js/plugin/*.js', {
//     packTo: 'plugin.js'
// });


fis.match('assets/js/(*.js)', {
    // 添加es6 转换支持
    parser: fis.plugin('babel-6.x'), 
    optimizer: fis.plugin('uglify-js'),
    release: '$1'
});


fis.match('dist/**/(*.{js,swf,json,zip,txt,mp4})', {
    release: '$1'
});


//stylus文件编译
fis.match('app.styl', {
    parser: 'stylus',
    rExt: '.css',
    isCssLike : false,
    optimizer: fis.plugin('clean-css'),
    packTo: 'app.css'
});


//px 2 rem 转换
fis.match('page.styl', {
    parser: 'stylus',
    rExt: '.css',
    postprocessor: fis.plugin('px2rem',    {
        baseDpr: 2,             // base device pixel ratio (default: 2)
        remVersion: true,       // whether to generate rem version (default: true)
        remUnit: 100,            // rem unit value (default: 75)
        remPrecision: 6         // rem precision (default: 6)
    }),
    isCssLike : false,
    optimizer: fis.plugin('clean-css'),
    packTo: 'page.css'
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
            from: /(\"src\/\"\+[a-zA-Z]+\[\_\]\+\"\/\"\+)|(\"use strict\")/g,
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
    return "" + checkTime(_now.getDate()) + checkTime(_now.getHours()) + checkTime(_now.getMinutes()) + checkTime(_now.getSeconds());

    function checkTime(i) {
        if (i < 10) {
            i = "0" + i
        }
        return i
    }
}

var currVersion = getVersion();

// 需要替换版本号的文件位置
var versionFilePath = '../app/config.php';

fis.media('pro').match('**', {
    prepackager : function (content, file, settings) {
        var fs = require('fs');
        fs.readFile(versionFilePath,'utf8',function(err,files){
            //console.log(files)
            var result = files.replace(/\?v=(\d+)('|")/g,"?v="+currVersion+"$2");

            result = result.replace(/\/release\/v(\d+)\//g,"/release/prod/");
            
            fs.writeFile(versionFilePath, result, 'utf8', function (err) {
                if (err) return console.log(err);
            });
    
        })
        return true;
    },
    deploy: [
        fis.plugin('replace', {
            from: /(\"src\/\"\+[a-zA-Z]+\[\_\]\+\"\/\"\+)|(\"use strict\")/g,
            to: ''
        }),
        fis.plugin('skip-packed'),
        fis.plugin('local-deliver', {
            to: '../release/prod/'
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
        var fs = require('fs');
        fs.readFile(versionFilePath,'utf8',function(err,files){
            var result = files.replace(/\/release\/(v(\d+)|prod)\//g,"/release/v"+currVersion+"/");

            result = result.replace(/\?v=(\d+)('|")/g,"?v="+currVersion+"$2"); 
    
            fs.writeFile(versionFilePath, result, 'utf8', function (err) {
                if (err) return console.log(err);
            });
    
        })
        return true;
    },
    deploy: [
        fis.plugin('replace', {
            from: /(\"src\/\"\+[a-zA-Z]+\[\_\]\+\"\/\"\+)|(\"use strict\")/g,
            to: ''
        }),
        fis.plugin('skip-packed'),
        fis.plugin('local-deliver', {
            to: '../release/' + "v" + currVersion
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
