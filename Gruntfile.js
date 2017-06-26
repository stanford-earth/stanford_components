/**
 * @file
 */
module.exports = function(grunt) {

  // This is where we configure each task that we'd like to run.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      // This is where we set up all the tasks we'd like grunt to watch for changes.
      scripts: {
        files: ['js/source/**/*.js'],
        tasks: ['uglify', 'drush:ccall'],
        options: {
          spawn: false,
        },
      },
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
    yamllint: {
      all: {
        files: {
          src: ['**/*.yml', '**/*.yaml'],
        },
        options: {
          schema: 'DEFAULT_SAFE_SCHEMA'
        }
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
          'patterns/atoms/link-item/css/link-item.component.css':                             'patterns/atoms/link-item/scss/link-item.component.scss',
          'patterns/atoms/icon-item/css/icon-item.component.css':                             'patterns/atoms/icon-item/scss/icon-item.component.scss',
          // Molecules.
          'patterns/molecules/simple-card/css/simple-card.component.css':                     'patterns/molecules/simple-card/scss/simple-card.component.scss',
          'patterns/molecules/simple-card/css/simple-card.theme.css':                         'patterns/molecules/simple-card/scss/simple-card.theme.scss',
          'patterns/molecules/postcard/css/postcard.component.css':                           'patterns/molecules/postcard/scss/postcard.component.scss',
          'patterns/molecules/postcard/css/postcard.theme.css':                               'patterns/molecules/postcard/scss/postcard.theme.scss',
          'patterns/molecules/hero-banner/css/hero-banner.component.css':                     'patterns/molecules/hero-banner/scss/hero-banner.component.scss',
          'patterns/molecules/secondary-sidebar-nav/css/secondary-sidebar-nav.component.css': 'patterns/molecules/secondary-sidebar-nav/scss/secondary-sidebar-nav.component.scss',
          'patterns/molecules/secondary-sidebar-nav/css/secondary-sidebar-nav.theme.css':     'patterns/molecules/secondary-sidebar-nav/scss/secondary-sidebar-nav.theme.scss',
          'patterns/molecules/film-card/css/film-card.component.css':                         'patterns/molecules/film-card/scss/film-card.component.scss',
          'patterns/molecules/filmstrip/css/filmstrip.component.css':                         'patterns/molecules/filmstrip/scss/filmstrip.component.scss',
          'patterns/molecules/callout-block/css/callout-block.component.css':                 'patterns/molecules/callout-block/scss/callout-block.component.scss',
          'patterns/molecules/callout-card/css/callout-card.component.css':                   'patterns/molecules/callout-card/scss/callout-card.component.scss',
          'patterns/molecules/callout-blocks/css/callout-blocks.component.css':               'patterns/molecules/callout-blocks/scss/callout-blocks.component.scss',
          'patterns/molecules/callout-cards/css/callout-cards.component.css':                 'patterns/molecules/callout-cards/scss/callout-cards.component.scss',
          'patterns/molecules/section-header/css/section-header.component.css':               'patterns/molecules/section-header/scss/section-header.component.scss',
          'patterns/molecules/link-banner/css/link-banner.component.css':                     'patterns/molecules/link-banner/scss/link-banner.component.scss',
          'patterns/molecules/feature-card/css/feature-card.component.css':                   'patterns/molecules/feature-card/scss/feature-card.component.scss',
          'patterns/molecules/feature-cards/css/feature-cards.component.css':                 'patterns/molecules/feature-cards/scss/feature-cards.component.scss',
          'patterns/molecules/highlight-card/css/highlight-card.component.css':               'patterns/molecules/highlight-card/scss/highlight-card.component.scss',
          'patterns/molecules/highlight-cards/css/highlight-cards.component.css':             'patterns/molecules/highlight-cards/scss/highlight-cards.component.scss',
          'patterns/molecules/expandable-card/css/expandable-card.component.css':             'patterns/molecules/expandable-card/scss/expandable-card.component.scss',
          'patterns/molecules/expandable-card/css/expandable-card.states.css':                'patterns/molecules/expandable-card/scss/expandable-card.states.scss',
          'patterns/molecules/expandable-cards/css/expandable-cards.component.css':           'patterns/molecules/expandable-cards/scss/expandable-cards.component.scss',
          // Organisms.
          'patterns/organisms/section-callout-filmstrip/css/section-callout-filmstrip.component.css':   'patterns/organisms/section-callout-filmstrip/scss/section-callout-filmstrip.component.scss',
          'patterns/organisms/section-callout-cards/css/section-callout-cards.component.css':           'patterns/organisms/section-callout-cards/scss/section-callout-cards.component.scss',
          'patterns/organisms/section-callout-blocks/css/section-callout-blocks.component.css':         'patterns/organisms/section-callout-blocks/scss/section-callout-blocks.component.scss',
          'patterns/organisms/section-feature-cards/css/section-feature-cards.component.css':           'patterns/organisms/section-feature-cards/scss/section-feature-cards.component.scss',
          'patterns/organisms/section-highlight-banner/css/section-highlight-banner.component.css':     'patterns/organisms/section-highlight-banner/scss/section-highlight-banner.component.scss',
          'patterns/organisms/section-expandable-banner/css/section-expandable-banner.component.css':   'patterns/organisms/section-expandable-banner/scss/section-expandable-banner.component.scss',
          'patterns/organisms/section-expandable-banner/css/section-expandable-banner.states.css':      'patterns/organisms/section-expandable-banner/scss/section-expandable-banner.states.scss'
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
            'browserSync', 'imagemin', 'sass', 'svgmin', 'watch', 'devmode', 'yamllint'
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
  grunt.loadNpmTasks('grunt-yamllint');
  grunt.loadNpmTasks('grunt-drush');

  // My tasks.
  grunt.registerTask('devmode', "Watch and BrowserSync all in one.", ['browserSync', 'watch']);

  // This is where we tell Grunt what to do when we type "grunt" into the terminal.
  // Note: if you'd like to run and of the tasks individually you can do so by typing 'grunt mytaskname' alternatively
  // you can type 'grunt watch' to automatically track your files for changes.
  grunt.registerTask('default', ['availabletasks']);
};
