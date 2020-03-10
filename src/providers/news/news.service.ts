import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TopHeadlinesResponse } from 'src/interfaces/news.interface';

@Injectable({
    providedIn: 'root'
})
export class NewsService {
    constructor(private http: HttpClient) {}

    /**
     * Get Top headlines
     */
    public getTopHeadlines(): Observable<TopHeadlinesResponse> {
        return this.http
            .get(`http://newsapi.org/v2/top-headlines?country=mx&apiKey=a6453a0f7ee84a03926f24e093f673b0`)
            .pipe(tap((res: TopHeadlinesResponse) => res));
    }
}
