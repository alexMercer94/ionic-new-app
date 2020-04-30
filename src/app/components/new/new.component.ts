import { Component, Input, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController, Platform, ToastController } from '@ionic/angular';
import { Article } from 'src/interfaces/news.interface';
import { DataLocalService } from 'src/providers/dataLocal/data-local.service';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
    @Input() noticia: Article;
    @Input() i: number;
    @Input() inFavorites;

    constructor(
        private iab: InAppBrowser,
        private actionSheetCtrl: ActionSheetController,
        private socialSharing: SocialSharing,
        private dataLocalService: DataLocalService,
        public toastController: ToastController,
        private platform: Platform
    ) {}

    ngOnInit() {}

    /**
     * Open New's URL in Browser with the info
     */
    public openNew(): void {
        const browser = this.iab.create(this.noticia.url, '_system');
    }

    /**
     * Open New's menu
     */
    public async openMenu(): Promise<any> {
        let saveDeleteBtn;

        if (this.inFavorites) {
            saveDeleteBtn = {
                text: 'Borrar Favorito',
                icon: 'trash',
                handler: () => {
                    this.dataLocalService.deleteNew(this.noticia);
                    this.presentToast('La noticia se eliminó de favoritos.');
                },
            };
        } else {
            saveDeleteBtn = {
                text: 'Favorito',
                icon: 'heart',
                handler: () => {
                    this.dataLocalService.saveNew(this.noticia);
                    this.presentToast('La noticia se agregó a favoritos.');
                },
            };
        }

        const actionSheet = await this.actionSheetCtrl.create({
            buttons: [
                {
                    text: 'Compartir',
                    icon: 'share',
                    handler: () => {
                        this.shareNew();
                    },
                },
                saveDeleteBtn,
                {
                    text: 'Cancelar',
                    icon: 'close',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    },
                },
            ],
        });

        await actionSheet.present();
    }

    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message,
            duration: 2000,
        });
        toast.present();
    }

    public shareNew() {
        if (this.platform.is('cordova')) {
            this.socialSharing.share(this.noticia.title, this.noticia.source.name, '', this.noticia.url);
        } else {
            if (navigator['share']) {
                navigator['share']({
                    title: this.noticia.title,
                    text: this.noticia.description,
                    url: this.noticia.url,
                })
                    .then(() => console.log('Successful share'))
                    .catch((error) => console.log('Error sharing', error));
            }
        }
    }
}
