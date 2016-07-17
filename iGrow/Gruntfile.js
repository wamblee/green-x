module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options:{
        separator: ';',
      },
      dist: {
        src:['public/client/**/*.js'],
        dest:'public/dist/<%= pkg.name %>.js',
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      dist: {
        files:{
          'public/dist/<%= pkg.name %>.min.js':['<%= concat.dist.dest %>']
        },
      },
    },
    
    jshint: {
      files: [
        'Gruntfile.js', 
        'public/**/*.js',
        'app/**/*.js',
        'lib/**/*.js',
        './*.js',
        'spec/**/*.js'
      ],
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish'),
        ignores: [
          'public/lib/**/*.js',
          'public/dist/**/*.js'
        ]
      }
    },

    cssmin: {
      options: {
        keepSpecialComments: 0
      },
      build: {
        files:{
          'public/dist/style.min.css': [ 'public/*.css' ],
        },
      },
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js'
        ],
        tasks: [
          'jshint',
          'concat',
          'uglify'
        ]
      },
      build: {
        files: ['Gruntfile'],
        tasks: ['jshint']
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        command: 'git push heroku master',
        options: {
          stdout: true,
          stderr: true,
          failOnError: true
        }
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('heroku:production', [
    'build'
  ]);
  
  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
      cmd: 'grunt',
      grunt: true,
      args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });


  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      grunt.task.run( ['shell:prodServer'] )
    } else{
      grunt.task.run([ 'server-dev' ]);
    }
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'jshint',
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'concat',
    'uglify',
    'cssmin'
  ]);


  grunt.registerTask('deploy', [
      'test',
      'build',
      'upload'
  ]);

};
