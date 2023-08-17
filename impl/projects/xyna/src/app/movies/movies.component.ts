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
import { Component } from '@angular/core';
import { environment } from '@environments/environment';
import { ApiService } from '@zeta/api';
import { I18nService } from '@zeta/i18n';
import { XcRemoteTableDataSource } from '@zeta/xc';


@Component({
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.scss']
})
export class MoviesComponent {

    datasource: XcRemoteTableDataSource;

    constructor(readonly api: ApiService, readonly i18n: I18nService) {
        this.datasource = new XcRemoteTableDataSource(api, i18n, environment.zeta.xo.runtimeContext, 'demo.movies.GetMoviesTable');
        this.refresh();
    }


    refresh() {
        this.datasource.refresh();
    }
}
