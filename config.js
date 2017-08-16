module.exports = {
    paths: function() {
        var config = {
            env: 'development',
            source: 'assets/',
            dest: 'build/',
            js: [
                'assets/js/**/*.js'
            ],
        };

        return config;
    },
    vendor: function() {
        var assets = {
            css: [
                "bower_components/lightcase/src/css/lightcase.css",
                "bower_components/owl.carousel/dist/assets/owl.carousel.min.css"
            ],
            js: [
                "bower_components/jquery/dist/jquery.min.js",
                "bower_components/bootstrap/dist/js/bootstrap.min.js",
                "bower_components/typed.js/dist/typed.min.js",
                "bower_components/lightcase/src/js/lightcase.js",
                "bower_components/owl.carousel/dist/owl.carousel.min.js"
            ],
            fonts:[
                "bower_components/lightcase/src/fonts/**/*",
                "assets/fonts/**/*"
            ]
        }

        return assets;
    },
    styleOptions: function() {
        var opts = {
            /*SASS Options*/
            sassOpt: {
                outputStyle: 'compressed',
                precision: 3
            },
            /*Pleeease.io Options*/
            pleeeaseOpt: {
                autoprefixer: { browsers: ['last 2 versions', '> 1%', 'Firefox ESR'] },
                rem: ['16px'],
                pseudoElements: true,
                mqpacker: true
            }

        }

        return opts;
    }
}