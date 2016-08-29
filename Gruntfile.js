module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Linting Tasks -------------------------------
    tslint: {
      options: {
        configuration: 'tslint.json'
      },
      files: {
        src: [
          'index.ts',
          'src/**/*.ts',
          '!src/**/*.d.ts',

        ]
      }
    },
    // Compile Tasks -------------------------------
    ts: {
      compile_es5_target: {
        tsconfig: './tsconfig-es5.json',
        options: {
          additionalFlags: "--lib es6,dom" // HACK: As these flags are currently not supported by grunt-ts
        }
      },
      compile_es6_target: {
        tsconfig: './tsconfig-es6.json'
      }

    }
  });

  // -----------------------------------------------------------------
  // Load Grunt Plugins
  // -----------------------------------------------------------------

  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-tslint');

  // -----------------------------------------------------------------
  // Transpile from Typescript to target format JS
  // -----------------------------------------------------------------

  grunt.registerTask('tsbuild', ['ts:compile_es5_target', 'ts:compile_es6_target', 'tslint']);


};
