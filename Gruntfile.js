module.exports = function(grunt) {
  grunt.initConfig({
    //Path to static files/
    staticPath: 'appengine_content/static/',
    //Path to Javscript/Coffeescript files to compile, minify and combine
    jsFilepath: '<%=staticPath%>js/',
    //Path to Css/less files to compile, minify and combine
    cssFilepath: '<%=staticPath%>css/',
    //Path to bootstrap less files
    booLess: '<%=staticPath%>bootstrap/less/',
    booCss: '<%=staticPath%>bootstrap/css/',

    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      compile: {
        files: {
          '<%=jsFilepath%>app.js': '<%=jsFilepath%>app.coffee', // 1:1 compile
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
    less: {
      debugCss: {
        files: {
          '<%=cssFilepath%>site.css': '<%=cssFilepath%>site.less'
        }
      },
      css: {
        options: {
          yuicompress: true
        },
        files: {
          '<%=cssFilepath%>site.css': '<%=cssFilepath%>site.less'
        }
      },
      boo: {
        options: {
          yuicompress: true
        },
        files: {
          '<%=booCss%>bootstrap.min.css': '<%=booLess%>bootstrap.less'
        }
      }
    },
    concat: {
      options: {
        stripBanners: true
      },
      js: {
        src: ['<%=jsFilepath%>modernizr-2.6.2.min.js', '<%=jsFilepath%>app.js'],
        dest: '<%=jsFilepath%>app.js'
      },
      boo: {
        src: ['<%=booCss%>bootstrap.min.css', '<%=booCss%>bootstrap-responsive.min.css'],
        dest: '<%=booCss%>boo.min.css'
      }
    },
    watch: {
      js: {
        files: '<%=jsFilepath%>app.coffee',
        tasks: ['js'],
        options: {
          debounceDelay: 250,
          interrupt: true
        }
      },
      css: {
        files: '<%=cssFilepath%>site.less',
        tasks: ['css'],
        options: {
          debounceDelay: 250,
          interrupt: true
        }
      }
    }
  });

  // Load the required plugins
  grunt.loadNpmTasks('grunt-contrib-coffee'); //Compile .coffee to .js
  grunt.loadNpmTasks('grunt-contrib-uglify'); //Minify js and css files
  grunt.loadNpmTasks('grunt-contrib-concat'); //concatenate files
  grunt.loadNpmTasks('grunt-contrib-less');   //Compile .less to .css
  grunt.loadNpmTasks('grunt-contrib-watch');  //Listen to file changes and run grunt task

  // Shortcut tasks that can be invoked via grunt <command>. E.g. grunt js
  grunt.registerTask('js', ['coffee', 'concat:js']);
  grunt.registerTask('boo',['less:boo', 'concat:boo']);
  grunt.registerTask('css',['less:debugCss']);
  grunt.registerTask('default', ['coffee','uglify','less:boo','less:css','concat']);

};