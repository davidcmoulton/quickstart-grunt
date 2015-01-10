module.exports = function (grunt) {
  "use strict";
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    path: {
      src: {
        js: ['src/js/'],
        css: ['src/css/']
      },
      dist: {
        all: 'dist/',
        js: 'dist/js/',
        css: 'dist/css/'
      },
      tests: ['__tests__/'],
      temp: {
        all: ['temp/'],
        css: ['temp/css/']
      }
    },
    
    files: {
      src: {
        js: ['<%= path.src.js %>**/*.js'],
        css: ['<%= path.src.css %>**/*.css'],
      },
      me: ['Gruntfile.js'],
      tests: ['<%= path.tests %>*-test.js'],
      temp: {
        css: ['<%= path.temp.css %>*.css']
      }
    },
    
    // Packaging
    browserify: {
      dist: {
        files: {
          '<%= path.dist.js %><%= pkg.name %>.js': '<%= files.src.js %>'
        }
      },
      options: {
        banner: '/*  <%= pkg.name %> v.<%= pkg.version %> by <%= pkg.author %>\n    Built on <%= grunt.template.today("yyyy-mm-dd--HH:MM:ssZ") %> */'
      }
    },
    
    cssmin: {
      dist: {
        files: {
          'dist/css/<%= pkg.name %>.css': ['<%= files.temp.css %>']
        }
      },
    },
    
    // Code quality
    jshint: {
      beforebrowserify: ['<%= files.me %>', '<%= files.src.js %>', '<%= files.tests %>'],
      /* afterbrowserify jshint errors really badly. TODO: investigate. */
      options: {
        jshintrc: '<%= path.src.js %>.jshintrc'
      }
    },
    
    csslint: {
      src: ['<%= files.src.css %>'],
      options: {
        csslintrc: '<%= path.src.css %>.csslintrc'
      }
    },
    
    autoprefixer: {
      options: {
        browsers: ['last 6 versions', 'ie 8', 'ie 9'],
        remove: false
      },
      multipleFiles: {
        expand: true,
        flatten:  true,
        src: '<%= files.src.css %>',
        // Insists on a string for the value of dest, complains if a template
        //   dest: '<%= path.temp.css %>' doesn't work
        dest: 'temp/css'
      }
    },
    
    // Tests
    jest: {
      options: {
        testPathPattern: /.*-test.js/,
        coverage: true
      }
    },

    // Build process meta
    clean: {
      all: ['<%= path.dist.all %>', '<%= path.temp.all %>'],
      temp: ['<%= path.temp.all %>']
    },
    
    watch: {
      src: {
        files: ['<%= files.me %>', '<%= files.src.js %>', '<%= files.src.css %>', '<%= files.tests %>'],
        tasks: ['build']
      }
    }
  });

  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-jest');
  
  grunt.registerTask('test', ['jshint', 'csslint', 'jest']);
  grunt.registerTask('prepCss', ['autoprefixer', 'cssmin', 'clean:temp']);
  grunt.registerTask('build', ['clean:all', 'test', 'browserify', 'prepCss']);
  grunt.registerTask('default', ['test', 'watch']);
};
