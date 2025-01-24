import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environments } from '../../../environments/environments'
import { Observable, tap, of, map, catchError } from 'rxjs'

import { User } from '../interfaces/user.interface'
import { Router } from '@angular/router'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private baseUrl = environments.baseUrl
    private user?: User

    constructor(private _http: HttpClient, private _router: Router) {}

    get currentUser(): User | undefined {
        if (!this.user) return undefined

        return structuredClone(this.user)
    }

    login(email: string, password: string): Observable<User> {
        return this._http.get<User>(`${this.baseUrl}/users/1`).pipe(
            tap((user) => (this.user = user)),
            tap((user) =>
                localStorage.setItem('token', 'jiejieyrj.iyoeroil.adfiyew')
            )
        )
    }

    checkAutentication(): Observable<boolean> {
        if (!localStorage.getItem('token')) return of(false)
        const token = localStorage.getItem('token')
        return this._http.get<User>(`${this.baseUrl}/users/1`).pipe(
            tap((user) => (this.user = user)),
            map((user) => !!user),
            catchError((err) => of(false))
        )
    }

    logOut(): void {
        this.user = undefined
        localStorage.clear()
        this._router.navigateByUrl('/auth')
    }
}
