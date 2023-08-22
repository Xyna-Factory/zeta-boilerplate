import { XoObjectClass, XoArrayClass, XoProperty, XoUnique, XoObject, XoArray } from '@zeta/api';
import { XoFilmmaker, XoFilmmakerArray } from './filmmaker.model';


@XoObjectClass(null, 'xmcp.movie', 'Movie')
export class XoMovie extends XoObject {


    @XoProperty()
    title: string;


    @XoProperty()
    year: number;


    @XoProperty(XoFilmmaker)
    director: XoFilmmaker = new XoFilmmaker();


    @XoProperty()
    genres: string[];


    @XoProperty()
    rating: string;


    @XoProperty(XoFilmmakerArray)
    leadingActors: XoFilmmakerArray = new XoFilmmakerArray();


    @XoProperty()
    plot: string;


    @XoProperty()
    @XoUnique()
    uniqueIdentifier: number;


}

@XoArrayClass(XoMovie)
export class XoMovieArray extends XoArray<XoMovie> {
}
