import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/catch';
import { ActionsService } from "./actions.service";
import { Observable } from "rxjs/Observable";
import { CustomerAction } from "./actions.service"

@Component({
    selector: 'actions',
    providers: [ActionsService],
    templateUrl: './actions.component.html'
})

export class ActionsComponent implements OnInit {
    public actionsList: Observable<CustomerAction[]>;
    showEditor = true;
    myName: string;
    customerAction: CustomerAction;
    constructor(private dataService: ActionsService) {
        this.customerAction = new CustomerAction();
    }

    ngOnInit() {
        this.actionsList = this.dataService.actionsList;
        this.dataService.getAllActions();
    }
}