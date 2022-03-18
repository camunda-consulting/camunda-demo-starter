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
            MarketingBar: 'src/main/js/reactjs/application/components/MarketingBar.jsx',
            FooterBar: 'src/main/js/reactjs/application/components/FooterBar.jsx',

            uriListConverter: 'src/main/js/api/uriListConverter.js',
            uriTemplateInterceptor: 'src/main/js/api/uriTemplateInterceptor.js',

            applicaitonStyles: 'src/main/resources/static/app.css',
            // END Generic Reusable Components

            //Form Components
            StartForm: 'src/main/js/reactjs/application/components/form/StartForm.jsx',
            ConfirmationForm: 'src/main/js/reactjs/application/components/form/ConfirmationForm.jsx',
            //Form Actions
            SaveActionBar: 'src/main/js/reactjs/application/components/form/action/SaveActionBar.jsx',
            ConfirmActionBar: 'src/main/js/reactjs/application/components/form/action/ConfirmActionBar.jsx',

            //Filters Components
            StatusBar: 'src/main/js/reactjs/application/components/filter/StatusBar.jsx',
            FilterBar: 'src/main/js/reactjs/application/components/filter/FilterBar.jsx',

            //App Components
            Main: 'src/main/js/reactjs/application/components/main/Main.jsx',
            Home: 'src/main/js/reactjs/application/components/main/Parent.jsx',

            //Use case Components
            UseCaseMain: 'src/main/js/reactjs/application/usecase/adhoc/components/Main.jsx',
            DetailForm: 'src/main/js/reactjs/application/usecase/adhoc/components/DetailForm.jsx',
            Info: 'src/main/js/reactjs/application/usecase/adhoc/components/Info.jsx',
            // END Use Case Components

            //Workflow Components
            WorkflowMain: 'src/main/js/reactjs/application/components/workflow/Main.jsx',
            WorkflowForm: 'src/main/js/reactjs/application/components/workflow/Form.jsx',
            WorkflowInfo: 'src/main/js/reactjs/application/components/workflow/Info.jsx',
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
