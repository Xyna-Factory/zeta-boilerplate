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
import { Component, Injector } from '@angular/core';
import { XcStackItemComponent, XcStackItemComponentData } from '@zeta/xc';
import { XoMovie } from '../xo/movie.model';
import { ApiService } from '@zeta/api';
import { environment } from '@environments/environment';


export interface MovieDetailsData extends XcStackItemComponentData {
    selectedMovie: XoMovie;
}


@Component({
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent extends XcStackItemComponent<MovieDetailsData> {

    movie: XoMovie;

    constructor(injector: Injector, api: ApiService) {
        super(injector);

        if (this.injectedData.selectedMovie) {
            api.startOrderAssert<XoMovie>(environment.zeta.xo.runtimeContext, 'demo.movies.GetMovieDetails', this.injectedData.selectedMovie, XoMovie).subscribe({
                next: movie => this.movie = movie
            });
        }
    }
}
