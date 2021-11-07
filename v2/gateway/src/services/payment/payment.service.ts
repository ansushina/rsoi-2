import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Payment } from 'src/models/payment';
import { map } from 'rxjs';

@Injectable()
export class PaymentService {
    constructor(
        private readonly http: HttpService,
    ) {}

    private path = 'http://localhost:3001';

    public getPayment(username:string, paymentId: string) {
        const url = this.path + `/payment/${paymentId}`;

        return this.http.get<Payment>(url, {headers: {
            'X-User-Name': username,
        }}).pipe(
            map(res => res.data)
        );
    }

    public createPayment(username:string, payment: Payment) {
        const url = this.path + `/payment`;


        return this.http.post<Payment>(url, payment, {headers: {
            'X-User-Name': username,
        }}).pipe(
            map(res => res.data)
        );
    }

    public changePaymentState(username, uid, status) {
        const url = this.path + `/payment/${uid}`;

        return this.http.patch<Payment>(url,{status}, {headers: {
            'X-User-Name': username,
        }}).pipe(
            map(res => res.data)
        );
    }
}
