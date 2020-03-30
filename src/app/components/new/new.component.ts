import { Component, Input, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Article } from 'src/interfaces/news.interface';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
    @Input() noticia: Article;
    @Input() i;

    constructor(private iab: InAppBrowser) {}

    ngOnInit() {}

    /**
     * Open New's URL in Browser with the info
     */
    public openNew(): void {
        const browser = this.iab.create(this.noticia.url, '_system');
    }
}
