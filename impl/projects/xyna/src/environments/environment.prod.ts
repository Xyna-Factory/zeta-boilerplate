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
import { ZetaEnvironment } from '@zeta/api';
import { RuntimeContext } from '@zeta/api/xo/xo-describer';


export const environment: ZetaEnvironment = {
    production: true,
    zeta: {
        url: location.origin + '/project-api/',
        xo: {
            runtimeContext: RuntimeContext.fromApplication('Vacation'),
            consistencyCheck: false
        },
        auth: {
            smartCardLogin: false,
            credentialsLogin: true,
            languages: [
                { label: 'English', languageKey: 'en-US' },
                { label: 'Deutsch', languageKey: 'de-DE' }
            ]
        }
    }
};
