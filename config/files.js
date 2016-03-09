/* Exports a function which returns an object that overrides the default &
 *   plugin file patterns (used widely through the app configuration)
 *
 * To see the default definitions for Lineman's file paths and globs, see:
 *
 *   - https://github.com/linemanjs/lineman/blob/master/config/files.coffee
 */
module.exports = function(lineman) {
  //Override file patterns here
  return {
    js: {
      vendor: [
        "vendor/js/angular.js",
        "vendor/js/caman.js",
        "vendor/js/dropzone.js",
        "vendor/js/**/*.js"
      ],
      app: [
        "app/js/app.js",
        "app/js/commom/security/*.js",
        "app/js/commom/**/*.js",
        "app/js/mongolab.js",
        "app/js/vitrine/vitrine.js",
        "app/js/**/*.js"
      ]
    }/*,

    less: {
      compile: {
        options: {
          paths: ["vendor/css/normalize.css", "vendor/css//*.css", "app/css//*.less"]
        }
      }
    }*/
  };
};
