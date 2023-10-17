/*
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Copyright 2023 Xyna GmbH, Germany
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */
/**
 * Build-Skripte zum Entwickeln, Testen und Liefern der Anwendung
 *
 * Parameter:
 * ==========
 *
 *   --buildDir
 *     Überschreibt das Verzeichnis, in dem Zwischenprodukte erzeugt und weiterverarbeitet werden. Standardwert: build
 *
 *   --releaseDir
 *     Überschreibt das Verzeichnis, in dem die fertigen Liefergegenstände abgelegt werden. Standardwert: release
 *
 *   --releaseVersion
 *     Versionsnummer des Releases; wird unter anderem als Bestandteil der Dateinamen von Liefergegenständen verwendet
 *
 *   --lang
 *     Sprache des Releases (z. B. de-DE); wird unter anderem als Bestandteil der Dateinamen von Liefergegenständen verwendet
 */
function Gruntfile(grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');

    var serverConfig = grunt.file.exists("server.json") ? grunt.file.readJSON("server.json"): {};

    var config = {
        pkg: grunt.file.readJSON("package.json"),

        //Titel der Anwendung
        appTitle: "Boilerplate",

        // name of the artifact archive
        appName: "boilerplate",

        //Language Argument
        langSuffix: ((grunt.option("lang") && !grunt.option("suppressLangSuffix")) ? "_" + grunt.option('lang') : ""),

        //URL, unter der die Application später gehostet werden soll. Diese sollte mit dem appName
        //übereinstimmen.
        baseUrl: "/<%= appName %><%= langSuffix %>/",

        //Build-Verzeichnis: Bei einem Build werden hier Zwischenprodukte erzeugt und weiterverarbeitet
        buildDir: grunt.option("buildDir") || ".",

        //Release-Verzeichnis: Hier werden die fertigen Liefergegenstände gesammelt
        releaseDir: grunt.option("releaseDir") || "../dist",

        //Versionsnummer des Releases
        releaseVersion: grunt.option("releaseVersion") || "<%= pkg.version %>",

        concat: {
          copyrightHeader: {
            src: ["./copyrightheader.js", "./_main.js"],
            dest: "./_main_w_copyright.js"
          }
        }
    };

    var htmlLang = 'en';
	if (grunt.option('lang') === 'de-DE') {
		htmlLang = 'de';
	}
    fullLangSuffix = 'en-US';
	if (grunt.option('lang')) {
	    fullLangSuffix = grunt.option('lang');
	}

    config["clean"] = {
        options: {
            force: !grunt.option("buildDir")
        },
        build: ["<%= buildDir %>/../impl/dist/xyna/"],
        release: ["<%= releaseDir %>"],
        mocks: ["<%= buildDir %>/../impl/dist/xyna/assets/mocks"]
    };

    config["replace"] = {
        "title": {
            options: {
                patterns: [
                    {match: "TEMPLATE_APP_TITLE", replacement: "<%= appTitle %>"},
                    {match: "TEMPLATE_APP_NAME",  replacement: "<%= appName %>"}
                ]
            },
            files: [
                {expand: true, flatten: true, src: ["<%= buildDir %>/../impl/dist/xyna/WEB-INF/web.xml"], dest: "<%= buildDir %>/../impl/dist/xyna/WEB-INF"}
            ]
        },
		"lang": {
			options: {
                patterns: [{match: /<html lang=\"en/g, replacement: "<html lang=\"" + htmlLang}]
            },
            files: [{expand: true, flatten: true, src: ["<%= buildDir %>/../impl/dist/xyna/index.html"], dest: "<%= buildDir %>/../impl/dist/xyna"}]
		},
        "baseurl": {
            options: {
                patterns: [{match: /<base href=\".*\">/g, replacement: "<base href=\"<%= baseUrl %>\">"}]
            },
            files: [{expand: true, flatten: true, src: ["<%= buildDir %>/../impl/dist/xyna/en-US/index.html"], dest: "<%= buildDir %>/../impl/dist/xyna/en-US"}]
        },
        "baseurl-dev": {
            options: {
                patterns: [{match: /<base href=\"\/\">/g, replacement: "<base href=\".\">"}]
            },
            files: [{expand: true, flatten: true, src: ["<%= buildDir %>/../impl/dist/xyna/index.html"], dest: "<%= buildDir %>/../impl/dist/xyna"}]
        }
    };

    config["compress"] = {
        "build-zip": {
            options: {
                mode: "zip",
                archive: "<%= releaseDir %>/<%= appName %><%= langSuffix %>.zip",
            },
            files: [{expand: true, cwd: "<%= buildDir %>/../impl/dist/xyna/en-US/", src: ["**"]}]
        }
    };

    grunt.initConfig(config);


    //Task-Abhängigkeiten laden
    //Hinweis: Es werden alle Abhängigkeiten in der Datei package.json automatisch geladen,
    //die auf das angegebene Pattern passen. Der dafür benötigte node_modules-Ordner kann sich auch
    //in einem Eltern-Verzeichnis befinden (falls requireResolution true ist).
    require("load-grunt-tasks")(grunt, {
        pattern: "grunt-*",
        config: "package.json",
        scope: "devDependencies",
        requireResolution: true
    });


    //Test-Tasks
    //----------

    grunt.registerTask("test-xyna-project", function() {
        var exec = require("child_process").exec;
        var cb = this.async();
        exec("npm run lint", {cwd: "../impl"}, function(err, stdout, stderr) {
            console.log(stdout);
            if (err) {
                console.error(`exec error: ${err}`);
                return;
            }
            cb();
        });
    });

    //Build-Tasks
    //-----------

    grunt.registerTask("rename-for-concat-copyright", () => {
      var origfileList = grunt.file.expand("../impl/dist/xyna/" + fullLangSuffix + "/main.*.js");
      var origfile = origfileList[0];
      config["main.js.origfile"] = origfile;
      grunt.file.copy(origfile, "./_main.js");
      //grunt.file.delete(origfile);
    });

    grunt.registerTask("finish-concat-copyright", () => {
      grunt.log.writeln("Adjusting " + config["main.js.origfile"]);

      grunt.file.copy("./_main_w_copyright.js", config["main.js.origfile"]);
      grunt.file.delete("./_main_w_copyright.js");
      grunt.file.delete("./_main.js");
    });

    grunt.registerTask("add-copyright-header", ["rename-for-concat-copyright", "concat:copyrightHeader", "finish-concat-copyright"]);


    grunt.registerTask("default", ["clean:build", "test-xyna-project", "build-xyna-project", "replace:baseurl-dev", "replace:title", "add-copyright-header"]);

    grunt.registerTask("release", [
        "clean:build", "clean:release",
        "test-xyna-project", "release-xyna-project" + (grunt.option("lang") ? "::" + grunt.option('lang') : ""),
        "replace:baseurl", "replace:title", "add-copyright-header", "clean:mocks"/*, "replace:lang"*/,
        "compress:build-zip"
    ]);

    grunt.registerTask("build-xyna-project", function() {
        var exec = require("child_process").exec;
        var cb = this.async();
        exec("npm run build", {cwd: "../impl"}, function(err, stdout, stderr) {
            console.log(stdout);
            if (err) {
                console.error(`exec error: ${err}`);
                return;
            }
            cb();
        });
    });


    grunt.registerTask("release-xyna-project", function(task, lang) {
        console.log("with args: " + task + ', ' + lang);
        var exec = require("child_process").exec;
        var cb = this.async();
        exec("npm run release" + (lang ? ":" + lang : ""), {maxBuffer : 500 * 1024, cwd: "../impl"}, function(err, stdout, stderr) {
            console.log(stdout);
            if (err) {
                console.error(`exec error: ${err}`);
                return;
            }
            cb();
        });
    });

};

module.exports = Gruntfile;
