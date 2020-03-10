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
        this.newService.getTopHeadlines().subscribe((res: TopHeadlinesResponse) => {
            this.news.push(...res.articles);
        });
    }
}
