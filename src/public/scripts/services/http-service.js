class HttpService {
    async ajax(method, url, data, headers) {
        const fetchHeaders = new Headers({'content-type': 'application/json', ...(headers || {})});
        return fetch(url, {
            method,
            headers: fetchHeaders,
            body: JSON.stringify(data),
        }).then((response) => response.json());
    }
}

const httpService = new HttpService();
export default httpService;
