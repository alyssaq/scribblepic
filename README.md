scribblepic
===========

HTML5 canvas in python google app engine

Libraries and tools: coffeescript for javascript, less for css, gruntjs, bootstrap

http://www.scribblepic.appspot.com

## Running Google App Engine dev webserver ##
You can run the development web server either via GoogleAppEngineLauncher or command line.

Command Line to start at port 8000:    
*Note: Assumes that GoogleAppEngineLauncher has created a symlink to dev_appserver.py* 

	dev_appserver.py appengine_content/ --skip_sdk_update_check=yes --port=8000 --admin_port=8009

    
## Compiling coffeescript, less and minimising with Gruntjs ##
For productivity, coffeescript and less have been choosen and 
must be compiled into their respective js and css files for deployment.
We use grunt to perform the repetitive tasks to compile coffee, less, minify and combine.

Firstly, install nodejs: http://nodejs.org/download/

Once nodejs has been installed, we need grunt command line tools to be installed.
Currently, the local version does not work well, as such, install it globally:
> sudo npm install -g grunt-cli

Next, we will automatically download the required plugins
listed in our package.json. To do this, where package.json resides, run:
> npm install

  
Yay! By default, the minified and comined js and css files are included.   
DO NOT edit site.css or app.*.js, it will be overridden by grunt's compile/build step.   
Say you made a change in site.less, to compile to css:
> grunt css

Should you wish to make changes to app.coffee or would like to 
debug the non-minified js files in the browser, run:  
> grunt js

For deployment, we want all javascript files to be minfied, compressed and combined.     
We also want css files to be minified, compressed and combined.   
To do so, simply run the default grunt command:
> grunt

To see all grunt commands, look in Gruntfile.js   
If there is a task you would like to run and it is not in grunt.registerTask(), 
you may call the individual task directly.     
For example, with the following Gruntfile.js:

    coffee: {
      compile: {
        files: {
          '<%=jsFilepath%>app.js': '<%=jsFilepath%>app.coffee', 
        }
      }
    },
    uglify: {
      build: {
        files: {
          '<%=jsFilepath%>app.js': '<%=jsFilepath%>app.js'
        }
      },
    },

Some example tasks: 
> grunt coffee:compile    
> grunt uglify:build    
> grunt less:debugCss    

We can watch for coffee and less file changes and automatically compile them.   
I have only set up to watch changes on app.coffee and site.less, but other files can be added as needed:
> grunt watch   
