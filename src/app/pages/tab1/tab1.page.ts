import { Component, OnInit } from '@angular/core';
import { Article, TopHeadlinesResponse } from 'src/interfaces/news.interface';
import { NewsService } from 'src/providers/news/news.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
    news: Article[] = [];
    constructor(private newService: NewsService) {}

    ngOnInit() {
        this.loadNews();
    }

    public loadData(event: any): void {
        this.loadNews(event);
    }

    public loadNews(event?: any): void {
        this.newService.getTopHeadlines().subscribe((res: TopHeadlinesResponse) => {
            if (res.articles.length === 0) {
                event.target.disabled = true;
                event.target.complete();
                return;
            }
            this.news.push(...res.articles);
            if (event) {
                event.target.complete();
            }
        });
    }
}
