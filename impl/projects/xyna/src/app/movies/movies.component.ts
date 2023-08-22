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
import { ApiService } from '@zeta/api';
import { I18nService } from '@zeta/i18n';
import { XcComponentTemplate } from '@zeta/xc';
import { XcStackDataSource } from '@zeta/xc/xc-stack/xc-stack-data-source';
import { XcStackItem } from '@zeta/xc/xc-stack/xc-stack-item/xc-stack-item';
import { MoviesOverviewComponent } from './movies-overview/movies-overview.component';


@Component({
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.scss']
})
export class MoviesComponent {

    stackDataSource: XcStackDataSource;

    constructor(readonly api: ApiService, readonly i18n: I18nService) {
        this.stackDataSource = new XcStackDataSource();

        const overview = new XcStackItem();
        overview.setTemplate(new XcComponentTemplate(MoviesOverviewComponent, { stackItem: overview }));
        this.stackDataSource.add(overview);
    }
}
