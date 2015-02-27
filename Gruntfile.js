module.exports = function( grunt ) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		setup: true,
		paths: {
			src: {
				watch: ['source/index.html'],
				watchmap : {'source/index.html': 'target/index.html'},
				js: 'source/**/*.js',
				watchSCSS: 'source/**/*.scss',
				scss: 'source/styles/style.scss'
			},
			dest: {
				root: 'target',
				styles: 'target/styles',
				scripts: 'target/scripts',
				watch: ['target/**/*'],
				js: 'target/scripts/main.js',
				jsmin: 'target/scripts/main.min.js',
				css: 'target/styles/main.css'
			}
		},
		connect: {
			server: {
				options: {
					port : 8000,
					base : '<%= paths.dest.root %>',
					debug: true,
					livereload: true,
					open: true
				}
			}
		},
		watch: {
			sass: {
				files: ['<%= paths.src.watchSCSS %>'],
				tasks: ['sass'],
				options: { livereload: true }
			},
			js: {
				files: ['<%= paths.src.js %>'],
				tasks: ['concat:js', 'uglify'],
				options: { livereload: true }
			},
			html: {
				files: '<%= paths.src.watch %>',
				tasks: ['mv'],
				options: { livereload: true }
			}
		},
		sass: {
			dist: {
				options: { style: "expanded" },
				files: {'<%= paths.dest.css %>': '<%= paths.src.scss %>'}
			}
		},
		concat: {
			js: {
				options: { separator: ';' },
				src: '<%= paths.src.js %>',
				dest: '<%= paths.dest.js %>'
			}
		},
		uglify: {
			options: {
				compress: true,
				mangle: true,
				sourceMap: false,
				sourceMapIncludesSources: false,
				sourceMapIn: '<%= paths.dest.js %>.map'
			},
			target:{
				src: '<%= paths.dest.js %>',
				dest: '<%= paths.dest.jsmin %>'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('mv', 'Move files from one location to another', function() {
		grunt.config.get('paths.src.watch').forEach( function( file ) {
			console.log( file );
			console.log( grunt.config.get('paths.src.watchmap')[file] );
			
			require('fs').writeFileSync( grunt.config.get('paths.src.watchmap')[file], require('fs').readFileSync( file ) );
		});

		
	});

	grunt.registerTask('sanity', 'Check for valid filesystem structure or abort', function() {
		var target = require('fs').existsSync( grunt.config.get('paths.dest.root') )
		  , scripts = require('fs').existsSync(grunt.config.get('paths.dest.scripts') )
		  , styles = require('fs').existsSync(grunt.config.get('paths.dest.styles'));

		if ( target && scripts && styles ) return true;

		if ( !target ) {
			var r = grunt.config.get('paths.dest.root');
			if ( grunt.config.get('setup')  ) {
				require('fs').mkdirSync( r );
			} else { 
				console.log('Please create a destination directory: '+r );
				return false;
			}
		} 

		if ( !scripts ) {
			var s = grunt.config.get('paths.dest.scripts');
			if ( grunt.config.get('setup') ) {
				require('fs').mkdirSync( s );
			} else { 
				console.log('Please create a destination directory for scripts: ' + s );
			}
		}	

		if ( !styles ) {
			var s = grunt.config.get('paths.dest.styles');
			if ( grunt.config.get('setup')  ) {
				require('fs').mkdirSync( s );
			} else { 
				console.log('Please create a destination directory for styles: '+s+'\n');
			}
		}

		return grunt.config.get('setup');
	});

	grunt.registerTask('default', ['sanity', 'connect', 'watch']);
};

