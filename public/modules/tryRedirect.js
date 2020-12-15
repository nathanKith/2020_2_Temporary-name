import {ajax} from './ajax';
import {backend} from './url';

export async function tryRedirect() {
    const {status} = await ajax.get(backend.me);
    return status === 200;
}
