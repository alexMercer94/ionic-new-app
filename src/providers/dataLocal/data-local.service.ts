import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from 'src/interfaces/news.interface';

@Injectable({
    providedIn: 'root',
})
export class DataLocalService {
    news: Article[] = [];

    constructor(private storage: Storage) {}

    /**
     * Save news in storage
     * @param noticia New to save
     */
    public saveNew(noticia: Article): void {
        const exist = this.news.find((searchNew) => searchNew.title === noticia.title);
        if (!exist) {
            this.news.unshift(noticia);
            this.storage.set('FAVORITES', this.news);
        }
    }

    /**
     * Get all favorites news
     */
    public async loadFavorites(): Promise<any> {
        const favorites = await this.storage.get('FAVORITES');
        if (favorites) {
            this.news = favorites;
        }
    }

    public deleteNew(noticia: Article) {
        this.news = this.news.filter((ntc: Article) => ntc.title !== noticia.title);
        this.storage.set('FAVORITES', this.news);
    }
}
