import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EApi } from 'src/app/enums/api.enum';
import { environment } from 'src/environments/environment';
import { TopHeadlinesResponse } from 'src/interfaces/news.interface';

const APIKEY = environment.apiKey;
const CATEGORY = ':category:';
const httpHeaders = new HttpHeaders({
    'X-Api-key': APIKEY
});

@Injectable({
    providedIn: 'root'
})
export class NewsService {
    headlinesPage = 0;
    actualCategory: string;
    categoryPage = 0;
    constructor(private http: HttpClient) {}

    /**
     * Get Top headlines
     */
    public getTopHeadlines(): Observable<TopHeadlinesResponse> {
        this.headlinesPage++;
        return this.http
            .get(`${EApi.baseUrl}${EApi.getTopHeadlines}&page=${this.headlinesPage}`, { headers: httpHeaders })
            .pipe(tap((res: TopHeadlinesResponse) => res));
    }

    /**
     * Get Top Headlines by Category
     * @param category Category
     */
    public getTopHeadlinesByCategory(category: string): Observable<TopHeadlinesResponse> {
        if (this.actualCategory === category) {
            this.categoryPage++;
        } else {
            this.categoryPage = 1;
            this.actualCategory = category;
        }
        const url = `${EApi.baseUrl}${EApi.getTopHeadlinesByCategory}&page=${this.categoryPage}`.replace(
            CATEGORY,
            this.actualCategory
        );
        return this.http.get(url, { headers: httpHeaders }).pipe(tap((res: TopHeadlinesResponse) => res));
    }
}
