import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Customer } from "../../interface/customer";
import { CustomerHttpService } from "../customer-http.service";
import { EMPTY, Observable, catchError } from "rxjs";

@Injectable()
export class CustomerResolver implements Resolve<Customer[]> {

    constructor(
        private customerHttpService: CustomerHttpService,
        private router: Router) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<Customer[]> | Promise<Customer[]> | Customer[] {

        return this.customerHttpService.getAll().pipe(catchError(err => {
            this.router.navigate(["/customers"]);
            return EMPTY;
        }));
    }
}