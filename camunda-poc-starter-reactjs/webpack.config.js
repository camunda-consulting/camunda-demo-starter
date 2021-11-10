var path = require('path');
var webpack = require('webpack');
var Dotenv = require('dotenv-webpack');

module.exports = {
    entry: [
        'babel-polyfill',
	    'script!jquery/dist/jquery.min.js',
	    'script!foundation-sites/dist/foundation.min.js',
	    `./src/main/js/reactjs/application/damage-report-app.jsx`
	  ],
	externals: {
		jquery: 'jQuery'
	},
	plugins: [
	  new webpack.ProvidePlugin({
		  '$': 'jquery',
		  'jQuery': 'jquery'
	  }),
      new Dotenv()
    ],
    cache: false,
    debug: true,
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/bundle.js'
    },
    resolve: {
        root: __dirname,
        alias: {
            //Generic Reusable Components
            client: 'src/main/js/reactjs/application/components/client.jsx',
            follow: 'src/main/js/reactjs/application/components/follow.jsx',
            IFrame: 'src/main/js/reactjs/application/components/IFrame.jsx',
            UpdateNoteDialog: 'src/main/js/reactjs/application/components/note/UpdateNoteDialog.jsx',
            DisplayDate: 'src/main/js/reactjs/application/components/date/DisplayDate.jsx',
            DisplayDateTime: 'src/main/js/reactjs/application/components/date/DisplayDateTime.jsx',

            uriListConverter: 'src/main/js/api/uriListConverter.js',
            uriTemplateInterceptor: 'src/main/js/api/uriTemplateInterceptor.js',

            applicaitonStyles: 'src/main/resources/static/app.css',
            // END Generic Reusable Components

            //Order App Components
            Main: 'src/main/js/reactjs/application/usecase/damage-report/components/Main.jsx',
            MarketingBar: 'src/main/js/reactjs/application/usecase/damage-report/components/MarketingBar.jsx',
            StatusBar: 'src/main/js/reactjs/application/usecase/damage-report/components/StatusBar.jsx',
            FooterBar: 'src/main/js/reactjs/application/usecase/damage-report/components/FooterBar.jsx',

            Home: 'src/main/js/reactjs/application/usecase/damage-report/components/home/Home.jsx',
            Detail: 'src/main/js/reactjs/application/usecase/damage-report/components/home/Detail.jsx',
            StartForm: 'src/main/js/reactjs/application/usecase/damage-report/components/home/StartForm.jsx',
            DetailForm: 'src/main/js/reactjs/application/usecase/damage-report/components/home/DetailForm.jsx',
            ConfirmationForm: 'src/main/js/reactjs/application/usecase/damage-report/components/home/ConfirmationForm.jsx',
            Info: 'src/main/js/reactjs/application/usecase/damage-report/components/home/Info.jsx',
            FilterBar: 'src/main/js/reactjs/application/components/FilterBar.jsx',
            SaveActionBar: 'src/main/js/reactjs/application/usecase/damage-report/components/home/SaveActionBar.jsx',
            ConfirmActionBar: 'src/main/js/reactjs/application/usecase/damage-report/components/home/ConfirmActionBar.jsx',
            // END Use Case Components

            //Generic Task Componet
            TaskHome: 'src/main/js/reactjs/application/components/task/Home.jsx',
            TaskDetail: 'src/main/js/reactjs/application/components/task/Detail.jsx',
            TaskForm: 'src/main/js/reactjs/application/components/task/Form.jsx',
            TaskInfo: 'src/main/js/reactjs/application/components/task/Info.jsx',
            TaskFilterBar: 'src/main/js/reactjs/application/components/task/FilterBar.jsx',
            TaskAction: 'src/main/js/reactjs/application/components/task/ActionBar.jsx',
            TaskConfirmation: 'src/main/js/reactjs/application/components/task/Confirmation.jsx'

        },
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    cacheDirectory: false,
                    presets: ['es2015', 'react', 'stage-0']
                },
                test: path.join(__dirname, '.'),
                exclude: /(node_modules|bower_components)/,
            },
            {loaders: ['style', 'css', 'sass'], test: /\.scss$/ }
        ]
    },
    devtool: ['cheap-module-source-map', 'sourcemaps']
};
