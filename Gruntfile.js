module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            development: {
                options: {
                    paths: ['./app/less', './app/*/less'],
                    yuicompress: true,
                    compress: true
                },
                files: {
                    "./app/css/style.css": "./app/less/style.less"
                }
            }
        },
        watch: {
          css: {
            files: ['./app/less/*.less', './app/less/*/*.less'],
            tasks: ['less', 'cssmin']
          },
          uglify: {
            files: ['./app/app.js', './app/*/*.js'],
            tasks: ['uglify']
          }
        },
        uglify: {
          my_target: {
            files: {
              './app/app.min.js': ['./app/app.js', './app/controllers/*.js', './app/services/*.js', './app/directives/*.js']
            }
          }
        },
        cssmin: {
          target: {
            files: [{
              expand: true,
              cwd: 'app/css',
              src: ['*.css', '!*.min.css'],
              dest: 'app/css',
              ext: '.min.css'
            }]
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default','watch');
};
