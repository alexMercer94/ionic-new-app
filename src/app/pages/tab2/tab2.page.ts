import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Article, TopHeadlinesResponse } from 'src/interfaces/news.interface';
import { NewsService } from 'src/providers/news/news.service';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
    categories = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];
    news: Article[] = [];
    @ViewChild(IonSegment, { static: true }) segment: IonSegment;

    constructor(private newsService: NewsService) {}

    ngOnInit() {
        this.segment.value = this.categories[0];
        this.getNewsByCategory(this.categories[0]);
    }

    /**
     * Change category and get news
     * @param event Event
     */
    public changeCategory(event: any): void {
        const category = event.detail.value;
        this.news = [];
        this.getNewsByCategory(category);
    }

    /**
     * Get news by category
     * @param category
     * @param event
     */
    public getNewsByCategory(category: string, event?: any): void {
        this.newsService.getTopHeadlinesByCategory(category).subscribe((res: TopHeadlinesResponse) => {
            this.news.push(...res.articles);
            if (event) {
                event.target.complete();
            }
        });
    }

    /**
     * Load data with Infinite scroll
     * @param event Event
     */
    public loadData(event: any): void {
        this.getNewsByCategory(this.segment.value, event);
    }
}
