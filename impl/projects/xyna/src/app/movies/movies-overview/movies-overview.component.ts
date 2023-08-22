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
import { Component, Injector, OnDestroy } from '@angular/core';
import { environment } from '@environments/environment';
import { ApiService } from '@zeta/api';
import { I18nService } from '@zeta/i18n';
import { XcComponentTemplate, XcRemoteTableDataSource, XcStackItemComponent } from '@zeta/xc';
import { Subject, takeUntil } from 'rxjs';
import { XoMovie } from '../xo/movie.model';
import { XcStackItem } from '@zeta/xc/xc-stack/xc-stack-item/xc-stack-item';
import { MovieDetailsComponent, MovieDetailsData } from '../movie-details/movie-details.component';


@Component({
    templateUrl: './movies-overview.component.html',
    styleUrls: ['./movies-overview.component.scss']
})
export class MoviesOverviewComponent extends XcStackItemComponent implements OnDestroy {

    dataSource: XcRemoteTableDataSource<XoMovie>;
    destroyed = new Subject<boolean>();
    detailsItem: XcStackItem;


    constructor(injector: Injector, readonly api: ApiService, readonly i18n: I18nService) {
        super(injector);

        // avoid pruning of Movie model
        const m = new XoMovie();

        this.dataSource = new XcRemoteTableDataSource<XoMovie>(api, i18n, environment.zeta.xo.runtimeContext, 'demo.movies.GetMoviesTable');
        this.refresh();

        this.dataSource.selectionModel.selectionChange.pipe(
            takeUntil(this.destroyed)
        ).subscribe({
            next: model => {
                // first close stack item on the right
                if (this.detailsItem) {
                    this.stackItem.stack.close(this.detailsItem).subscribe();
                    this.detailsItem = null;
                }

                // open stack item with details
                if (model.selection.length > 0) {
                    this.detailsItem = new XcStackItem();
                    this.detailsItem.setTemplate(new XcComponentTemplate(MovieDetailsComponent, <MovieDetailsData>{ stackItem: this.detailsItem, selectedMovie: model.selection[0] }));
                    this.stackItem.stack.open(this.detailsItem);
                }
            }
        });
    }


    ngOnDestroy(): void {
        this.destroyed.next(true);
    }


    refresh() {
        this.dataSource.refresh();
    }
}
