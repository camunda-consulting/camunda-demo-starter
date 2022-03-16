var path = require('path');
var webpack = require('webpack');
var Dotenv = require('dotenv-webpack');

module.exports = {
    entry: [
        'babel-polyfill',
	    'script!jquery/dist/jquery.min.js',
	    'script!foundation-sites/dist/foundation.min.js',
	    `./src/main/js/reactjs/application/app.jsx`
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

            //App Components
            Main: 'src/main/js/reactjs/application/components/main/Main.jsx',
            Home: 'src/main/js/reactjs/application/components/main/Parent.jsx',

            //Use case Components
            UseCaseMain: 'src/main/js/reactjs/application/usecase/adhoc/components/Main.jsx',
            StartForm: 'src/main/js/reactjs/application/usecase/adhoc/components/StartForm.jsx',
            DetailForm: 'src/main/js/reactjs/application/usecase/adhoc/components/DetailForm.jsx',
            ConfirmationForm: 'src/main/js/reactjs/application/usecase/adhoc/components/ConfirmationForm.jsx',
            Info: 'src/main/js/reactjs/application/usecase/adhoc/components/Info.jsx',
            SaveActionBar: 'src/main/js/reactjs/application/usecase/adhoc/components/SaveActionBar.jsx',
            MarketingBar: 'src/main/js/reactjs/application/usecase/adhoc/components/MarketingBar.jsx',
            FooterBar: 'src/main/js/reactjs/application/usecase/adhoc/components/FooterBar.jsx',
            // END Use Case Components

            //Generic Task Componet
            TaskHome: 'src/main/js/reactjs/application/components/workflow/Home.jsx',
            TaskDetail: 'src/main/js/reactjs/application/components/workflow/Detail.jsx',
            TaskForm: 'src/main/js/reactjs/application/components/workflow/Form.jsx',
            TaskInfo: 'src/main/js/reactjs/application/components/workflow/Info.jsx',

            //Other components
            StatusBar: 'src/main/js/reactjs/application/components/status/StatusBar.jsx',
            FilterBar: 'src/main/js/reactjs/application/components/FilterBar.jsx',
            WorkflowActionBar: 'src/main/js/reactjs/application/components/workflow/ActionBar.jsx',
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
