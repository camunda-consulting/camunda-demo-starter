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
            NoteDialog: 'src/main/js/reactjs/application/components/note/NoteDialog.jsx',
            DisplayDate: 'src/main/js/reactjs/application/components/date/DisplayDate.jsx',
            DisplayDateTime: 'src/main/js/reactjs/application/components/date/DisplayDateTime.jsx',

            //App Main Components
            Main: 'src/main/js/reactjs/application/components/main/Main.jsx',
            Parent: 'src/main/js/reactjs/application/components/main/Parent.jsx',
            MarketingBar: 'src/main/js/reactjs/application/components/main/MarketingBar.jsx',
            NavigationBar: 'src/main/js/reactjs/application/components/main/NavigationBar.jsx',
            FooterBar: 'src/main/js/reactjs/application/components/main/FooterBar.jsx',

            uriListConverter: 'src/main/js/api/uriListConverter.js',
            uriTemplateInterceptor: 'src/main/js/api/uriTemplateInterceptor.js',

            applicaitonStyles: 'src/main/resources/static/app.css',
            // END Generic Reusable Components

            //Form Components
            StartForm: 'src/main/js/reactjs/application/components/form/StartForm.jsx',
            ConfirmationForm: 'src/main/js/reactjs/application/components/form/ConfirmationForm.jsx',
            //Form Actions
            SaveAction: 'src/main/js/reactjs/application/components/form/action/Save.jsx',
            ConfirmAction: 'src/main/js/reactjs/application/components/form/action/Confirm.jsx',
            SubmitAction: 'src/main/js/reactjs/application/components/form/action/Submit.jsx',

            //Form Info
            FormInfo: 'src/main/js/reactjs/application/components/form/Info.jsx',

            //Filters Components
            StatusBar: 'src/main/js/reactjs/application/components/filter/StatusBar.jsx',
            FilterBar: 'src/main/js/reactjs/application/components/filter/FilterBar.jsx',

            //Workflow Components
            WorkflowMain: 'src/main/js/reactjs/application/components/workflow/Main.jsx',
            WorkflowInfo: 'src/main/js/reactjs/application/components/workflow/Info.jsx',
            WorkflowStartAction: 'src/main/js/reactjs/application/components/workflow/action/Start.jsx',

            //Task Components
            TaskMain: 'src/main/js/reactjs/application/components/task/Main.jsx',
            TaskList: 'src/main/js/reactjs/application/components/task/List.jsx',
            TaskLine: 'src/main/js/reactjs/application/components/task/Line.jsx',
            TaskDetail: 'src/main/js/reactjs/application/components/task/Detail.jsx',
            TaskInfo: 'src/main/js/reactjs/application/components/task/Info.jsx',
            TaskFilterBar: 'src/main/js/reactjs/application/components/task/FilterBar.jsx',
            TaskSearchForm: 'src/main/js/reactjs/application/components/task/form/SearchForm.jsx',
            TaskActionApprove: 'src/main/js/reactjs/application/components/task/action/Approve.jsx',

            //Use-case Components
            UseCaseMain: 'src/main/js/reactjs/application/usecase/adhoc/components/Main.jsx',
            DetailForm: 'src/main/js/reactjs/application/usecase/adhoc/components/DetailForm.jsx',

            CaseInfo: 'src/main/js/reactjs/application/usecase/case/components/Info.jsx',

            UserInfo: 'src/main/js/reactjs/application/components/user/Info.jsx',
            // END Use Case Components

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
