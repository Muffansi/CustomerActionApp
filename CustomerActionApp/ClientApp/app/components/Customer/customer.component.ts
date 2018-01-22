import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CustomerService } from "./customer.service";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Observable } from "rxjs/Observable";
import { Customer, CustomerAction } from "./customer.service"
import 'rxjs/add/operator/catch';

@Component({
    selector: 'customer',
    providers: [CustomerService],
    templateUrl: './customer.component.html'
    })

export class CustomerComponent implements OnInit {
    public customerList: Observable<Customer[]>;
    public actionList: Observable<CustomerAction[]>;
    customer: Customer;
    customerAction: CustomerAction;

    constructor(private customerService: CustomerService, private toastrService: ToastsManager, vRef: ViewContainerRef) {
        this.customer = new Customer();
        this.customerAction = new CustomerAction();
        this.toastrService.setRootViewContainerRef(vRef);
    }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.customerList = this.customerService.customerList;
        this.customerService.getAllCustomers();
        this.actionList = this.customerService.actionList;
        this.customerService.getAllActions();
    }

    public addCustomer(item: Customer) {
        let customerId = this.customerService.addCustomer(this.customer);
        this.toastrService.success('Customer added successfully.');
    }

    public updateCustomer(item: Customer) {
        this.customerService.updateCustomer(item);
        this.toastrService.success('Customer info updated successfully.');
    }

    public deleteCustomer(cstId: number) {
        this.customerService.deleteCustomer(cstId);
        this.toastrService.success('Customer deleted successfully.');
    }

    public addCustomerAction(item: CustomerAction) {
        this.customerAction.timestamp = new Date();
        let actionId = this.customerService.addCustomerAction(this.customerAction);
        this.toastrService.success('Customer action added successfully.');
    }

    public updateCustomerAction(item: CustomerAction) {
        this.customerService.updateCustomerAction(item);
        this.toastrService.success('Customer action info updated successfully.');
    }

    public deleteCustomerAction(actId: number) {
        this.customerService.deleteCustomerAction(actId);
        this.toastrService.success('Customer action deleted successfully.');
    }
}