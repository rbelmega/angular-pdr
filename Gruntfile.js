'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    clean: {
      build: {
        src: ["dist/"]
      }
    },

    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: [{
            'dist/js//app.min.js': ['js/app.js', 'js/controllers.js', 'js/factory.js',
              'js/filter.js']
        },
          {
            'dist/js/lib.min.js': [
              'js_libs/jquery-1.11.0.min.js',
              'js_libs/bootstrap.min.js',
              'bower_components/angular/angular.min.js',
              'js_libs/angular-route.js']
          }]
      }
    },

    copy: {
      main: {
        files: [
          // includes css
          {expand: true, src: ['css/*.css'], dest: 'dist/'},

          // includes data
          {expand: true, src: ['data/**'], dest: 'dist/'},

          // makes all src relative to cwd
          {expand: true, src: ['fonts/*'], dest: 'dist/'},

          // makes all src relative to cwd
          {expand: true, src: ['view/*'], dest: 'dist/'},

          // makes all src relative to cwd
          {expand: true, src: ['img/**'], dest: 'dist/'},

          // makes all src relative to cwd
          {expand: true, src: ['index.html'], dest: 'dist/'}
        ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');


  grunt.registerTask('default', ['copy']);
  grunt.registerTask('cleanDir', ['clean']);
  grunt.registerTask('build', ['uglify', 'copy']);

};
