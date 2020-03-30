/**
 * All available endpoints.
 */
export enum EApi {
    baseUrl = 'http://newsapi.org/v2',
    getTopHeadlines = '/top-headlines?country=mx',
    getTopHeadlinesByCategory = '/top-headlines?country=mx&category=:category:'
}
