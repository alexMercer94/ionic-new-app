import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Tab3Page } from './tab3.page';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ComponentsModule,
        ExploreContainerComponentModule,
        RouterModule.forChild([{ path: '', component: Tab3Page }]),
    ],
    declarations: [Tab3Page],
})
export class Tab3PageModule {}
