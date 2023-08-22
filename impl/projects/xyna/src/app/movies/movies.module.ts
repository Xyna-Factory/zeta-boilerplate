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
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ZetaModule } from '@zeta/zeta.module';
import { MoviesComponent } from './movies.component';
import { MoviesOverviewComponent } from './movies-overview/movies-overview.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ZetaModule
    ],
    declarations: [
        MoviesComponent,
        MovieDetailsComponent,
        MoviesOverviewComponent
    ]
})
export class MoviesModule {
}
