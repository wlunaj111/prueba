import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/shared/shared.module';
import { Component, ViewEncapsulation } from '@angular/core';
import { FaqCategory } from '../home/home-center.type';
import { Subject } from 'rxjs';

@Component({
    selector     : 'landing-home',
    templateUrl  : './home.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LandingHomeComponent 
{
    yearlyBilling: boolean = true;
    faqCategory: FaqCategory;
    private _unsubscribeAll: Subject<any> = new Subject();
    /**
     * Constructor
     */
    constructor()
    {
    }

        // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
