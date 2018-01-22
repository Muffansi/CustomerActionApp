import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class CustomerService {
    public customerList: Observable<Customer[]>;
    private _customerList: BehaviorSubject<Customer[]>;
    public actionList: Observable<CustomerAction[]>;
    private _actionList: BehaviorSubject<CustomerAction[]>;
    private baseUrl: string;
    private customerStore: {
        customerList: Customer[];
    };
    private actionStore: {
        actionList: CustomerAction[];
    };

    constructor(private http: Http) {
        this.baseUrl = '/api/';
        this.customerStore = { customerList: [] };
        this.actionStore = { actionList: [] };
        this._customerList = <BehaviorSubject<Customer[]>>new BehaviorSubject([]);
        this.customerList = this._customerList.asObservable();
        this._actionList = <BehaviorSubject<CustomerAction[]>>new BehaviorSubject([]);
        this.actionList = this._actionList.asObservable();
    }

    getAllCustomers() {
        this.http.get(`${this.baseUrl}GetAllCustomers`)
            .map(response => response.json())
            .subscribe(data => {
                this.customerStore.customerList = data;
                this._customerList.next(Object.assign({}, this.customerStore).customerList);
            }, error => console.log('Could not load customers.'));
    }

    getAllActions() {
        this.http.get(`${this.baseUrl}GetAllCustomerActions`)
            .map(response => response.json())
            .subscribe(data => {
                this.actionStore.actionList = data;
                this._actionList.next(Object.assign({}, this.actionStore).actionList);
            }, error => console.log('Could not load actions.'));
    }

    public addCustomer(customer: Customer) {
        console.log("add Customer");
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        console.log('add Customer : ' + JSON.stringify(customer));

        this.http.post(`${this.baseUrl}AddCustomer`, JSON.stringify(customer), { headers: headers })
            .map(response => response.json()).subscribe(data => {
                this.customerStore.customerList.push(data);
                this._customerList.next(Object.assign({}, this.customerStore).customerList);
            }, error => console.log('Could not create customer.'));
    };

    public updateCustomer(newCustomer: Customer) {
        console.log("update Customer");
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        console.log('Update Customer : ' + JSON.stringify(newCustomer));

        this.http.put(`${this.baseUrl}UpdateCustomer`, JSON.stringify(newCustomer), { headers: headers })
            .map(response => response.json()).subscribe(data => {
                alert("Customer update alert");
                this.customerStore.customerList.forEach((t, i) => {
                    if (t.cstId === data.id) { this.customerStore.customerList[i] = data; }
                });
            }, error => console.log('Could not update customer.'));
    };

    deleteCustomer(customerId: number) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        console.log("Delete Customer:" + customerId);
        this.http.delete(`${this.baseUrl}DeleteCustomer/${customerId}`, { headers: headers }).subscribe(response => {
            this.customerStore.customerList.forEach((t, i) => {
                if (t.cstId === customerId) { this.customerStore.customerList.splice(i, 1); }
            });

            this._customerList.next(Object.assign({}, this.customerStore).customerList);
        }, error => console.log('Could not delete customer.'));
    }

    public addCustomerAction(customerAction: CustomerAction) {
        console.log("add Customer Action");
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        console.log('add Customer Action: ' + JSON.stringify(customerAction));

        this.http.post(`${this.baseUrl}AddCustomerAction`, JSON.stringify(customerAction), { headers: headers })
            .map(response => response.json()).subscribe(data => {
                this.actionStore.actionList.push(data);
                this._actionList.next(Object.assign({}, this.actionStore).actionList);
            }, error => console.log('Could not create customer action.'));
    };

    public updateCustomerAction(newCustomerAction: CustomerAction) {
        console.log("update Customer Action");
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        console.log('Update Customer Action : ' + JSON.stringify(newCustomerAction));

        this.http.put(`${this.baseUrl}UpdateCustomerAction`, JSON.stringify(newCustomerAction), { headers: headers })
            .map(response => response.json()).subscribe(data => {
                this.actionStore.actionList.forEach((t, i) => {
                    if (t.cstId === data.id) { this.actionStore.actionList[i] = data; }
                });
            }, error => console.log('Could not update customer action.'));
    };

    deleteCustomerAction(actionId: number) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        console.log("Delete Customer Action:" + actionId);
        this.http.delete(`${this.baseUrl}DeleteCustomerAction/${actionId}`, { headers: headers }).subscribe(response => {
            this.actionStore.actionList.forEach((t, i) => {
                if (t.actId === actionId) { this.actionStore.actionList.splice(i, 1); }
            });

            this._actionList.next(Object.assign({}, this.actionStore).actionList);
        }, error => console.log('Could not delete customer action.'));
    }

    private _serverError(err: any) {
        console.log('sever errorOK:', err); //debug
        if (err instanceof Response) {
            return Observable.throw(err.json().error || 'backend server error');
        }
        return Observable.throw(err || 'backend server error');
    } 
}

export class Customer {
    public cstId: number;
    public customerId: string;
    public customerName: string;
}

export class CustomerAction {
    public actId: number;
    public cstId: number;
    public customerAction: string;
    public timestamp: Date;
    public completed: boolean;
}