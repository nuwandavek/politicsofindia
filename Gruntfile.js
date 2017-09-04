module.exports = function(grunt) {

	grunt.initConfig({
		clean: ['dist'],
		copy: {
			dist: {
				files: [{
					expand: true,
					src: ['index.html','jsmain.js','cssmain.css', 'res/add.html','res/data.js','res/india.topojson','res/graph-scroll.js'],
					dest: 'dist/'
				}]
			}
		},
				
		'gh-pages': {
			options: {
				base: 'dist'
			},
			src: ['**']
		}
	});

    grunt.registerTask('build', ['clean', 'copy:dist']);

	require('load-grunt-tasks')(grunt);
};
