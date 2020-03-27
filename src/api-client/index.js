export default class BrewApi {
    static get baseUrl() {
        return "https://api.openbrewerydb.org/breweries";
    }

    static createQuery(queryParamsInput) {
        let queryParams = queryParamsInput ?? {};
        let queryString = this.baseUrl;
        let queryStringParams = [];

        for (let paramName in queryParams) {
            if (queryParams.hasOwnProperty(paramName)) {
                if (
                    typeof queryParams[paramName] !== "undefined" &&
                    queryParams[paramName] !== null &&
                    queryParams[paramName] !== "null"
                ) {
                    queryStringParams.push(paramName + "=" + queryParams[paramName]);
                }
            }
        }
        queryString += queryStringParams.length ? ("?" + queryStringParams.join("&")) : "";

        return queryString;
    }
}