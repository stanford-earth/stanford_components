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
          'patterns/atoms/photo-thumb/css/photo-thumb.component.css':                         'patterns/atoms/photo-thumb/scss/photo-thumb.component.scss',
          'patterns/atoms/icon-item/css/icon-item.component.css':                             'patterns/atoms/icon-item/scss/icon-item.component.scss',
          'patterns/atoms/link-item/css/link-item.component.css':                             'patterns/atoms/link-item/scss/link-item.component.scss',
          'patterns/atoms/nav-item/css/nav-item.component.css':                               'patterns/atoms/nav-item/scss/nav-item.component.scss',
          'patterns/atoms/tag-item/css/tag-item.component.css':                               'patterns/atoms/tag-item/scss/tag-item.component.scss',
          // Molecules.
          'patterns/molecules/calendar-block/css/calendar-block.component.css':               'patterns/molecules/calendar-block/scss/calendar-block.component.scss',
          'patterns/molecules/calendar-blocks/css/calendar-blocks.component.css':             'patterns/molecules/calendar-blocks/scss/calendar-blocks.component.scss',
          'patterns/molecules/callout-block/css/callout-block.component.css':                 'patterns/molecules/callout-block/scss/callout-block.component.scss',
          'patterns/molecules/callout-blocks/css/callout-blocks.component.css':               'patterns/molecules/callout-blocks/scss/callout-blocks.component.scss',
          'patterns/molecules/callout-card/css/callout-card.component.css':                   'patterns/molecules/callout-card/scss/callout-card.component.scss',
          'patterns/molecules/callout-cards/css/callout-cards.component.css':                 'patterns/molecules/callout-cards/scss/callout-cards.component.scss',
          'patterns/molecules/collapsible-menu/css/collapsible-menu.component.css':           'patterns/molecules/collapsible-menu/scss/collapsible-menu.component.scss',
          'patterns/molecules/collapsible-menu/css/collapsible-menu.states.css':              'patterns/molecules/collapsible-menu/scss/collapsible-menu.states.scss',
          'patterns/molecules/expandable-card/css/expandable-card.component.css':             'patterns/molecules/expandable-card/scss/expandable-card.component.scss',
          'patterns/molecules/expandable-card/css/expandable-card.states.css':                'patterns/molecules/expandable-card/scss/expandable-card.states.scss',
          'patterns/molecules/expandable-cards/css/expandable-cards.component.css':           'patterns/molecules/expandable-cards/scss/expandable-cards.component.scss',
          'patterns/molecules/feature-blocks/css/feature-blocks.component.css':               'patterns/molecules/feature-blocks/scss/feature-blocks.component.scss',
          'patterns/molecules/film-card/css/film-card.component.css':                         'patterns/molecules/film-card/scss/film-card.component.scss',
          'patterns/molecules/filmstrip/css/filmstrip.component.css':                         'patterns/molecules/filmstrip/scss/filmstrip.component.scss',
          'patterns/molecules/hero-banner/css/hero-banner.component.css':                     'patterns/molecules/hero-banner/scss/hero-banner.component.scss',
          'patterns/molecules/highlight-card/css/highlight-card.component.css':               'patterns/molecules/highlight-card/scss/highlight-card.component.scss',
          'patterns/molecules/highlight-cards/css/highlight-cards.component.css':             'patterns/molecules/highlight-cards/scss/highlight-cards.component.scss',
          'patterns/molecules/link-banner/css/link-banner.component.css':                     'patterns/molecules/link-banner/scss/link-banner.component.scss',
          'patterns/molecules/masonry-block/css/masonry-block.component.css':                 'patterns/molecules/masonry-block/scss/masonry-block.component.scss',
          'patterns/molecules/masonry-blocks/css/masonry-blocks.component.css':               'patterns/molecules/masonry-blocks/scss/masonry-blocks.component.scss',
          'patterns/molecules/postcard/css/postcard.component.css':                           'patterns/molecules/postcard/scss/postcard.component.scss',
          'patterns/molecules/postcard/css/postcard.theme.css':                               'patterns/molecules/postcard/scss/postcard.theme.scss',
          'patterns/molecules/section-header/css/section-header.component.css':               'patterns/molecules/section-header/scss/section-header.component.scss',
          'patterns/molecules/photo-tile/css/photo-tile.component.css':                       'patterns/molecules/photo-tile/scss/photo-tile.component.scss',
          'patterns/molecules/photo-tiles/css/photo-tiles.component.css':                     'patterns/molecules/photo-tiles/scss/photo-tiles.component.scss',
          'patterns/molecules/simple-block/css/simple-block.component.css':                   'patterns/molecules/simple-block/scss/simple-block.component.scss',
          'patterns/molecules/simple-blocks/css/simple-blocks.component.css':                 'patterns/molecules/simple-blocks/scss/simple-blocks.component.scss',
          'patterns/molecules/simple-slat/css/simple-slat.component.css':                     'patterns/molecules/simple-slat/scss/simple-slat.component.scss',
          'patterns/molecules/simple-slats/css/simple-slats.component.css':                   'patterns/molecules/simple-slats/scss/simple-slats.component.scss',
          'patterns/molecules/photo-banner/css/photo-banner.component.css':                   'patterns/molecules/photo-banner/scss/photo-banner.component.scss',
          'patterns/molecules/quote-card/css/quote-card.component.css':                       'patterns/molecules/quote-card/scss/quote-card.component.scss',
          // Organisms.
          'patterns/organisms/section-calendar-blocks/css/section-calendar-blocks.component.css':       'patterns/organisms/section-calendar-blocks/scss/section-calendar-blocks.component.scss',
          'patterns/organisms/section-callout-blocks/css/section-callout-blocks.component.css':         'patterns/organisms/section-callout-blocks/scss/section-callout-blocks.component.scss',
          'patterns/organisms/section-callout-cards/css/section-callout-cards.component.css':           'patterns/organisms/section-callout-cards/scss/section-callout-cards.component.scss',
          'patterns/organisms/section-callout-filmstrip/css/section-callout-filmstrip.component.css':   'patterns/organisms/section-callout-filmstrip/scss/section-callout-filmstrip.component.scss',
          'patterns/organisms/section-double-filmstrip/css/section-double-filmstrip.component.css':     'patterns/organisms/section-double-filmstrip/scss/section-double-filmstrip.component.scss',
          'patterns/organisms/section-tall-filmstrip/css/section-tall-filmstrip.component.css':         'patterns/organisms/section-tall-filmstrip/scss/section-tall-filmstrip.component.scss',
          'patterns/organisms/section-tall-filmstrip/css/section-tall-filmstrip.state.css':             'patterns/organisms/section-tall-filmstrip/scss/section-tall-filmstrip.state.scss',
          'patterns/organisms/section-expandable-banner/css/section-expandable-banner.component.css':   'patterns/organisms/section-expandable-banner/scss/section-expandable-banner.component.scss',
          'patterns/organisms/section-expandable-banner/css/section-expandable-banner.states.css':      'patterns/organisms/section-expandable-banner/scss/section-expandable-banner.states.scss',
          'patterns/organisms/section-feature-blocks/css/section-feature-blocks.component.css':         'patterns/organisms/section-feature-blocks/scss/section-feature-blocks.component.scss',
          'patterns/organisms/section-highlight-banner/css/section-highlight-banner.component.css':     'patterns/organisms/section-highlight-banner/scss/section-highlight-banner.component.scss',
          'patterns/organisms/section-masonry-blocks/css/section-masonry-blocks.component.css':         'patterns/organisms/section-masonry-blocks/scss/section-masonry-blocks.component.scss',
          'patterns/organisms/section-photo-mosaic/css/section-photo-mosaic.component.css':             'patterns/organisms/section-photo-mosaic/scss/section-photo-mosaic.component.scss',
          'patterns/organisms/section-photo-mosaic-quotes/css/section-photo-mosaic-quotes.component.css':      'patterns/organisms/section-photo-mosaic-quotes/scss/section-photo-mosaic-quotes.component.scss',
          'patterns/organisms/section-quote-banner/css/section-quote-banner.component.css':             'patterns/organisms/section-quote-banner/scss/section-quote-banner.component.scss',
          // Templates.
          'patterns/templates/paragraph-filmstrip/css/paragraph-filmstrip.component.css':       'patterns/templates/paragraph-filmstrip/scss/paragraph-filmstrip.component.scss'
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
