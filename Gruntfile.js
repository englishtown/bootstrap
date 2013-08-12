/* jshint node: true */

module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/**\n' +
              '* <%= pkg.name %>.js v<%= pkg.version %> by @fat and @mdo\n' +
              '* Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
              '* <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
              '*/\n',
    jqueryCheck: 'if (!jQuery) { throw new Error(\"Bootstrap requires jQuery\") }\n\n',

    // Task configuration.
    clean: {
      dist: ['dist']
    },

    jshint: {
      options: {
        jshintrc: 'js/.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['js/*.js']
      },
      test: {
        src: ['js/tests/unit/*.js']
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          flatten: true,
          src: [ "font/*", "bower_components/fontawesome/font/*" ],
          dest: 'dist/font/'
        }]
      }
    },
    concat: {
      options: {
        banner: '<%= banner %><%= jqueryCheck %>',
        stripBanners: false
      },
      bootstrap: {
        src: [
          'js/transition.js',
          'js/alert.js',
          'js/button.js',
          'js/carousel.js',
          'js/collapse.js',
          'js/dropdown.js',
          'js/modal.js',
          'js/tooltip.js',
          'js/popover.js',
          'js/scrollspy.js',
          'js/tab.js',
          'js/affix.js',
          'js/toggle-btn-group-ef.js'
        ],
        dest: 'dist/js/bootstrap.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      bootstrap: {
        files: {
          'dist/js/bootstrap.min.js': ['<%= concat.bootstrap.dest %>']
        }
      }
    },

    recess: {
      options: {
        compile: true
      },
      bootstrap: {
        files: {
          'dist/css/bootstrap.css': ['less/bootstrap.less'],
          'dist/css/bootstrap-ef.css': ['less/bootstrap-ef.less']
        }
      },
      min: {
        options: {
          compress: true
        },
        files: {
          'dist/css/bootstrap.min.css': ['less/bootstrap.less'],
          'dist/css/bootstrap-ef.min.css': ['less/bootstrap-ef.less']
        }
      }
    },

    qunit: {
      options: {
        inject: 'js/tests/unit/phantom.js'
      },
      files: ['js/tests/*.html']
    },

    connect: {
      server: {
        options: {
          port: 3000,
          base: '.'
        }
      }
    },

    watch: {
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'qunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      },
      recess: {
        files: 'less/*.less',
        tasks: ['recess']
      }
    }
  });


  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Test task.
  var testSubtasks = ['jshint', 'qunit'];
  // Only run BrowserStack tests under Travis
  if (process.env.TRAVIS) {
    // Only run BrowserStack tests if this is a mainline commit in twbs/bootstrap, or you have your own BrowserStack key
    if ((process.env.TRAVIS_REPO_SLUG === 'twbs/bootstrap' && process.env.TRAVIS_PULL_REQUEST === 'false') || process.env.TWBS_HAVE_OWN_BROWSERSTACK_KEY) {
      testSubtasks.push('browserstack_runner');
    }
  }
  grunt.registerTask('test', testSubtasks);

  // JS distribution task.
  grunt.registerTask('dist-js', ['concat', 'uglify']);

  // CSS distribution task.
  grunt.registerTask('dist-css', ['recess']);

  // Font distribution task.
  grunt.registerTask('dist-font', ['copy']);

  // Full distribution task.
  grunt.registerTask('dist', ['clean', 'dist-font', 'dist-css', 'dist-js']);

  // Default task.
  grunt.registerTask('default', ['test', 'dist']);

  // task for building customizer
  grunt.registerTask('build-customizer', 'Add scripts/less files to customizer.', function () {
    var fs = require('fs')

    function getFiles(type) {
      var files = {}
      fs.readdirSync(type)
        .filter(function (path) {
          return new RegExp('\\.' + type + '$').test(path)
        })
        .forEach(function (path) {
          return files[path] = fs.readFileSync(type + '/' + path, 'utf8')
        })
      return 'var __' + type + ' = ' + JSON.stringify(files) + '\n'
    }

    var customize = fs.readFileSync('customize.html', 'utf-8')
    var files = '<!-- generated -->\n<script id="files">\n' + getFiles('js') + getFiles('less') + '<\/script>\n<!-- /generated -->'
    fs.writeFileSync('customize.html', customize.replace(/<!-- generated -->(.|[\n\r])*<!-- \/generated -->/, files))
  });
};
