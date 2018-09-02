import Base from './Base';
import config from '../config/urls-config';

export default class Auth extends Base {
    signIn ({email, password}) {
        console.log(this);
        return this.apiClient.post(config.auth.sign_in, { email, password });
    }
    signOut () {
        return this.apiClient.delete(config.auth.sign_out);
    }
    validateToken (headers) {
        return this.apiClient.validateToken(config.auth.validateToken, headers);
    }
}
