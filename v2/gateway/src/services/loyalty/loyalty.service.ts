import { Injectable } from '@nestjs/common';
import { Observable, map, catchError, of } from 'rxjs';
import { Hotel } from 'src/models/hotel';
import { HttpService } from '@nestjs/axios';
import { Loyalty } from 'src/models/loyalty';

@Injectable()
export class LoyaltyService {
    constructor(
        private readonly http: HttpService,
    ) {}

    private path = 'http://localhost:3002';

    public getLoyalty(username): Observable<Loyalty> {
        const url = this.path + '/loyalty';

        return this.http.get<Loyalty>(url, {headers: {
            'X-User-Name': username,
        }}).pipe(
            map(res => res.data),
            catchError(e => of(null))
        );
    } 

    public createLoyalty(username) {
        const url = this.path + '/loyalty';

        return this.http.post<Loyalty>(url, {}, {headers: {
            'X-User-Name': username,
        }}).pipe(
            map(res => res.data)
        );
    }

    public updateLoyaltyCount(username: string, type: 'inc' | 'dec') {
        const url = this.path + '/loyalty';

        return this.http.patch<Loyalty>(url, {
            type
        }, {headers: {
            'X-User-Name': username,
        }}).pipe(
            map(res => res.data)
        );
    }
}
