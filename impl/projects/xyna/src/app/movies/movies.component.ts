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
import { ApiService, RuntimeContext, Xo } from '@zeta/api';
import { XoMovieTitle } from './movie-title.model';
import { XoDefinition, XoDefinitionObserver } from '@zeta/xc/xc-form/definitions/xo/base-definition.model';
import { XcOptionItem } from '@zeta/xc';


@Component({
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements XoDefinitionObserver {
    searchText: '';
    definition: XoDefinition;
    data: Xo;

    vehicleModel = 'Mazda';
    modelEditable = true;
    applying = false;

    apply() {}

    automaticGearboxAvailable = true;
    automaticGearbox = true;

    color: string;
    colors: XcOptionItem[] = [{
        name: 'white',
        value: '#eee'
    }, {
        name: 'black',
        value: '#111'
    }, {
        name: 'red',
        value: '#c32'
    }];


    constructor(private readonly apiService: ApiService) {
        setTimeout(() => {
            this.applying = true;
        }, 5000);
    }


    findMovie() {
        this.apiService.startOrder(RuntimeContext.fromApplication('MovieDB'), 'xmcp.forms.FindMoviePanel', XoMovieTitle.withTitle(this.searchText)).subscribe(response => {
            this.definition = response.output[0] as XoDefinition;
            this.data = response.output[1];
        });
    }


    translate?(value: string): string {
        return value;
    }
}
