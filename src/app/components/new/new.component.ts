import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/interfaces/news.interface';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
    @Input() noticia: Article;
    @Input() i;

    constructor() {}

    ngOnInit() {}
}
