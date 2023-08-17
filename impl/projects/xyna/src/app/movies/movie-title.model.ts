import { XoObject, XoObjectClass, XoProperty } from '@zeta/api';

@XoObjectClass(null, 'xmcp.datatypes', 'MovieTitle')
export class XoMovieTitle extends XoObject {

    @XoProperty()
    title: string;


    static withTitle(title: string): XoMovieTitle {
        const result = new XoMovieTitle();
        result.title = title;
        return result;
    }
}
