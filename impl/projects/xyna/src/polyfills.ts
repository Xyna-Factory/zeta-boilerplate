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

/***************************************************************************************************
 * BROWSER POLYFILLS
 */

/***************************************************************************************************
* Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
*/
import '@angular/localize/init';

// import 'core-js/es/array';
// import 'core-js/es/date';
// import 'core-js/es/function';
// import 'core-js/es/map';
// import 'core-js/es/math';
// import 'core-js/es/number';
// import 'core-js/es/object';
// import 'core-js/es/parse-float';
// import 'core-js/es/parse-int';
/** IE10 and IE11 requires the following for NgClass support on SVG elements */
// import 'classlist.js';  // Run `npm install --save classlist.js`.
/** Evergreen browsers require these. **/
// import 'core-js/es/reflect';
// import 'core-js/es/regexp';
// import 'core-js/es/set';
// import 'core-js/es/string';
/** IE9, IE10 and IE11 requires all of the following polyfills. **/
// import 'core-js/es/symbol';
// import 'core-js/es/weak-map';
/**
 * Required to support Web Animations `@angular/animation`.
 * Needed for: All but Chrome, Firefox and Opera. http://caniuse.com/#feat=web-animation
 **/
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.
/***************************************************************************************************
 * Zone JS is required by Angular itself.
 */
import 'zone.js/dist/zone'; // Included with Angular CLI.


/***************************************************************************************************
 * APPLICATION IMPORTS
 */

/**
 * Date, currency, decimal and percent pipes.
 * Needed for: All but Chrome, Firefox, Edge, IE11 and Safari 10
 */
// import 'intl';  // Run `npm install --save intl`.
/**
 * Need to import at least one locale-data with intl.
 */
// import 'intl/locale-data/jsonp/en';
