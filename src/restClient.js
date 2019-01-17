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
import { fetchUtils } from 'admin-on-rest';
import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE
} from 'admin-on-rest';

export default (apiUrl) => {
    const convertRESTRequestToHTTP = (type, resource, params) => {
        let url = '';
        const options = {};

        console.log(type);

        switch(type) {
            case GET_LIST: {
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                const query = {
                    sort: JSON.stringify((order === 'DESC' ? '-' : '') + field),
                    offset: (page - 1) * perPage,
                    limit: perPage,
                    filter: JSON.stringify(params.filter)
                };
                url = `${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`;
                break;
            }
            case GET_ONE:
                url = `${apiUrl}/${resource}/${params.id}`;
                break;
            case GET_MANY: {
                const query = {
                    filter: JSON.stringify({ id: params.ids })
                };
                url = `${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`;
                break;
            }
            case GET_MANY_REFERENCE: {
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                const query = {
                    sort: JSON.stringify((order === 'DESC' ? '-' : '') + field),
                    offset: (page - 1) * perPage,
                    limit: perPage,
                    filter: JSON.stringify({ ...params.filter, [params.target]: params.id }),
                };
                url = `${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`;
                break;
            }
            case CREATE:
                url = `${apiUrl}/${resource}`;
                options.method = 'POST';
                options.body = JSON.stringify(params.data);
            break;
            case UPDATE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = 'PATCH';
                options.body = JSON.stringify(params.data);
            break;
            case DELETE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = 'DELETE';
            break;
            default:
                throw new Error(`Unsupported fetch action type ${type}`);
        }

        return { url, options };
    }

    const convertHTTPResponseToREST = (response, type, resource, params) => {
        const { status, headers, json } = response;

        if (status === 204) {
            return { data: { ...params.data } };
        }

        switch(type) {
            case GET_LIST:
            case GET_MANY_REFERENCE:
                if (!headers.has('content-range')) {
                    throw new Error('The Content-Range header is missing in the HTTP Response. The simple REST client expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?');
                }
                return {
                    data: json,
                    total: parseInt(headers.get('content-range').split('/').pop(), 10)
                };
            case CREATE:
                return { data: { ...params.data, id: json.id }};
            default:
                return { data: json };
        }
    }

    return (type, resource, params) => {
        const { url, options } = convertRESTRequestToHTTP(type, resource, params);
        const token = localStorage.getItem('token');

        if (!options.headers) {
            options.headers = new Headers({ Accept: 'application/json' });
        }

        if (token) {
            options.headers.set('Authorization', token);
        }

        return fetchUtils.fetchJson(url, options)
            .then(response => convertHTTPResponseToREST(response, type, resource, params));
    }
}