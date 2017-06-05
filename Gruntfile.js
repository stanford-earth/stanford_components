/**
 * @file
 */
module.exports = function(grunt) {

  // This is where we configure each task that we'd like to run.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      // This is where we set up all the tasks we'd like grunt to watch for changes.
      images: {
        files: ['**/*.{png,jpg,gif}'],
        tasks: ['imagemin'],
        options: {
          spawn: false,
        }
      },
      vector: {
        files: ['**/*.svg'],
        tasks: ['svgmin'],
        options: {
          spawn: false,
        }
      },
      css: {
        files: ['**/*.scss'],
        tasks: ['sass'],
        options: {
          interrupt: true
        }
      },
      twig: {
        files: ['**/*.html.twig'],
        tasks: ['svgmin', 'imagemin', 'sass', 'drush:ccall']
      }
    },
    imagemin: {
      // This will optimize all of our images for the web.
      dynamic: {
        files: [{
          expand: true,
          cwd: 'img/source/',
          src: ['{,*/}*.{png,jpg,gif}' ],
          dest: 'img/optimized/'
        }]
      }
    },
    svgmin: {
      options: {
        plugins: [{
          removeViewBox: false
        }, {
          removeUselessStrokeAndFill: false
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'img/source/',
          src: ['{,*/}*.svg' ],
          dest: 'img/optimized/'
        }]
      }
    },
    sass: {
      // This will compile all of our sass files
      // Additional configuration options can be found at https://github.com/sindresorhus/grunt-sass
      options: {
        includePaths: [
          "node_modules/bourbon/core",
          "node_modules/bourbon-neat/core",
          "node_modules/neat-omega",
          "node_modules"
        ],
        sourceMap: true,
        // This controls the compiled css and can be changed to nested, compact or compressed.
        outputStyle: 'expanded',
        precision: 10
      },
      dist: {
        files: {
          // Atoms.
          'patterns/atoms/buttons/simple-cta/css/simple-cta.component.css':                   'patterns/atoms/buttons/simple-cta/scss/simple-cta.component.scss',
          'patterns/atoms/buttons/simple-cta/css/simple-cta.theme.css':                       'patterns/atoms/buttons/simple-cta/scss/simple-cta.theme.scss',
          'patterns/atoms/buttons/cta-with-image/css/cta-with-image.component.css':           'patterns/atoms/buttons/cta-with-image/scss/cta-with-image.component.scss',
          'patterns/atoms/buttons/cta-with-image/css/cta-with-image.theme.css':               'patterns/atoms/buttons/cta-with-image/scss/cta-with-image.theme.scss',
          // Molecules.
          'patterns/molecules/simple-card/css/simple-card.component.css':                     'patterns/molecules/simple-card/scss/simple-card.component.scss',
          'patterns/molecules/simple-card/css/simple-card.theme.css':                         'patterns/molecules/simple-card/scss/simple-card.theme.scss',
          'patterns/molecules/postcard/css/postcard.component.css':                           'patterns/molecules/postcard/scss/postcard.component.scss',
          'patterns/molecules/postcard/css/postcard.theme.css':                               'patterns/molecules/postcard/scss/postcard.theme.scss',
          'patterns/molecules/hero-banner/css/hero-banner.component.css':                     'patterns/molecules/hero-banner/scss/hero-banner.component.scss',
          'patterns/molecules/hero-with-overlay/css/hero-with-overlay.component.css':         'patterns/molecules/hero-with-overlay/scss/hero-with-overlay.component.scss',
          'patterns/molecules/hero-with-overlay/css/hero-with-overlay.theme.css':             'patterns/molecules/hero-with-overlay/scss/hero-with-overlay.theme.scss',
          'patterns/molecules/secondary-sidebar-nav/css/secondary-sidebar-nav.component.css': 'patterns/molecules/secondary-sidebar-nav/scss/secondary-sidebar-nav.component.scss',
          'patterns/molecules/secondary-sidebar-nav/css/secondary-sidebar-nav.theme.css':     'patterns/molecules/secondary-sidebar-nav/scss/secondary-sidebar-nav.theme.scss',
          'patterns/molecules/film-card/css/film-card.component.css':                         'patterns/molecules/film-card/scss/film-card.component.scss',
          'patterns/molecules/film-card/css/film-card.theme.css':                             'patterns/molecules/film-card/scss/film-card.theme.scss',
          'patterns/molecules/filmstrip/css/filmstrip.component.css':                         'patterns/molecules/filmstrip/scss/filmstrip.component.scss',
          'patterns/molecules/filmstrip/css/filmstrip.theme.css':                             'patterns/molecules/filmstrip/scss/filmstrip.theme.scss'
        }
      }
    },
    drush: {
      ccall: {
        args: ['cache-rebuild', 'all']
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'css/**/*.css',
            'templates/**/*.twig',
            'img/optimized/**/*.{png,jpg,gif,svg}',
            'js/build/**/*.js',
            '*.theme'
          ]
        },
        options: {
          watchTask: true,
          // reloadDelay: 1000,
          // reloadDebounce: 500,
          reloadOnRestart: true,
          logConnections: true,
          injectChanges: false // Depends on enabling the link_css module
        }
      }
    },
    availabletasks: {
      tasks: {
        options: {
          filter: "include",
          tasks: [
            'browserSync', 'imagemin', 'sass', 'svgmin', 'watch', 'devmode'
          ]
        }
      }
    }
  });

  // This is where we tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-available-tasks');
  grunt.loadNpmTasks('grunt-drush');

  // My tasks.
  grunt.registerTask('devmode', "Watch and BrowserSync all in one.", ['browserSync', 'watch']);

  // This is where we tell Grunt what to do when we type "grunt" into the terminal.
  // Note: if you'd like to run and of the tasks individually you can do so by typing 'grunt mytaskname' alternatively
  // you can type 'grunt watch' to automatically track your files for changes.
  grunt.registerTask('default', ['availabletasks']);
};
