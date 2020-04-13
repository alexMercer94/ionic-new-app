import { Component } from '@angular/core';
import { DataLocalService } from 'src/providers/dataLocal/data-local.service';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
    slideOpts = {
        allowSlidePrev: false,
        allowSlideNext: false,
    };

    constructor(public dataLocalService: DataLocalService) {
        this.dataLocalService.loadFavorites();
    }
}
