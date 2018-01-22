import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class ActionsService {
    public actionsList: Observable<CustomerAction[]>;
    private _actionsList: BehaviorSubject<CustomerAction[]>;
    private baseUrl: string;
    private dataStore: {
        actionsList: CustomerAction[];
    };

    constructor(private http: Http) {
        this.baseUrl = "/api/";
        this.dataStore = { actionsList: [] };
        this._actionsList = <BehaviorSubject<CustomerAction[]>>new BehaviorSubject([]);
        this.actionsList = this._actionsList.asObservable();
    }

    getAllActions() {
        this.http.get(`${this.baseUrl}GetAllCustomerActions`)
            .map(response => response.json())
            .subscribe(data => {
                this.dataStore.actionsList = data;
                this._actionsList.next(Object.assign({}, this.dataStore).actionsList);
            }, error => console.log('Could not load customer.'));
    }
}

export class CustomerAction {
    public actId: number;
    public cstId: number;
    public customerId: string;
    public customerAction: string;
    public timestamp: Date;
    public completed: boolean;
}