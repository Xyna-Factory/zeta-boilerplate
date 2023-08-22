import { XoObjectClass, XoArrayClass, XoProperty, XoUnique, XoObject, XoArray } from '@zeta/api';


@XoObjectClass(null, 'xmcp.movie', 'Filmmaker')
export class XoFilmmaker extends XoObject {


    @XoProperty()
    firstName: string;


    @XoProperty()
    lastName: string;


    @XoProperty()
    dateOfBirth: string;


    @XoProperty()
    nationality: string;


    @XoProperty()
    @XoUnique()
    uniqueIdentifier: number;


}

@XoArrayClass(XoFilmmaker)
export class XoFilmmakerArray extends XoArray<XoFilmmaker> {
}
