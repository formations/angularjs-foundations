'use strict';

module.exports = function (grunt) {
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Automatically load required Grunt tasks
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  });

  grunt.loadNpmTasks('grunt-zip');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-runner');

  // Define the configuration for all the tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    karma: {  
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    
    protractor: {
	    options: {
	      configFile: "protractor.conf.js"
	    },
	    e2e: {}
	},
    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          'app/script/{,*/}*.js'
        ]
      }
    },
    copy: {
      dist: {
        files: [
          {
            cwd: 'app',
            src: '**',
            dest: 'dist',
            expand: true
          },
          {
            cwd: 'bower_components/angular',
            src: 'angular.min.js',
            dest: 'dist',
            expand: true
          },
          {
            cwd: 'bower_components/bootstrap/dist/css',
            src: 'bootstrap.min.css',
            dest: 'dist',
            expand: true
          }
        ]
      },
      fonts: {
          files:[
              {
                  //for bootstrap fonts
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/bootstrap/dist',
                    src: ['fonts/*.*'],
                    dest: 'dist'
                }, {
                    //for font-awesome
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/font-awesome',
                    src: ['fonts/*.*'],
                    dest: 'dist'
                }
          ]
        }
    },
    clean: {
        build:{
            src: [ 'dist/']
        }
    },
    useminPrepare: {
        html: 'app/**/*.html',
        options: {
            dest: 'dist'
        }
    },
      // Concat
    concat: {
        // dist configuration is provided by useminPrepare
        dist: {}
    },
      // Filerev
    filerev: {
        options: {
            encoding: 'utf8',
            algorithm: 'md5',
            length: 20
        },
        release: {
            // filerev:release hashes(md5) all assets (images, js and css )
            // in dist directory
            files: [{
                src: [
                    'dist/script/*.js',
                    'dist/style/*.css',
                ]
            }]
        }
    },
      // Usemin
      // Replaces all assets with their revved version in html and css files.
      // options.assetDirs contains the directories for finding the assets
      // according to their relative paths
    usemin: {
        html: ['dist/*.html'],
        css: ['dist/style/*.css'],
        options: {
            assetsDirs: ['dist', 'dist/style']
        }
    },
    watch: {
        copy: {
            files: [ 'app/**', '!app/**/*.css', '!app/**/*.js'],
            tasks: [ 'build' ]
        },
        scripts: {
            files: ['app/script/app.js'],
            tasks:[ 'build']
        },
        styles: {
            files: ['app/style/style.css'],
            tasks:['build']
        },
        livereload: {
            options: {
                livereload: '<%= connect.options.livereload %>'
            },
            files: [
                'app/{,*/}*.html',
                '.tmp/styles/{,*/}*.css',
                'app/image/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
            ]
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      dist: {
        options: {
          open: true,
          base:{
               path: 'dist',
            options: {
                index: 'store.html',
                maxAge: 300000
            }
          }
        }
      }
    },
    zip: {
      '<%= pkg.name %>-distribution.zip': ['dist/**/*.*']
    }
  });

  grunt.registerTask('build', [
    'clean',
    'jshint',
    'useminPrepare',
    'concat',
    'uglify',
    'copy',
    'filerev',
    'usemin'
  ]);

  grunt.registerTask('serve',['build','connect:dist','watch']);

  grunt.registerTask('default',['build']);  

  grunt.registerTask('distribution',['build','zip']);

  grunt.registerTask('test', ['karma', 'build', 'connect:dist', 'protractor:e2e']);
};
