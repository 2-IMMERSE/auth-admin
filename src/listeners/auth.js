/*Copyright 2018 Cisco and/or its affiliates

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'admin-on-rest';
import config from '../config';

export default (type, params) => {
    switch (type) {
        case AUTH_LOGIN:
            const { username, password } = params;
            const request = new Request(config.baseURL + '/auth/tokens', {
                method: 'POSt',
                body: JSON.stringify({
                    'username': username,
                    'password': password
                }),
                headers: new Headers({ 'Content-Type': 'application/json' })
            });

            return fetch(request)
                .then(response => {
                    if (response.status < 200 || response.status >= 300) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                })
                .then(({ access_token }) => {
                    localStorage.setItem('token', access_token);
                });
        case AUTH_LOGOUT:
            localStorage.removeItem('token');
            return Promise.resolve();
        case AUTH_ERROR:
            const { status } = params;
            if (status === 401 || status === 403) {
                localStorage.removeItem('token');
                return Promise.reject();
            }
            return Promise.resolve();
        case AUTH_CHECK:
            if (localStorage.getItem('token')) {
                return Promise.resolve();
            } else {
                return Promise.reject();
            }
        default:
            return Promise.reject('Unknown Method');
    }
}