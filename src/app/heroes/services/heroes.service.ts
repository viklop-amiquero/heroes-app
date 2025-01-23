import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, Observable, of, map } from 'rxjs'
import { Hero } from '../interfaces/hero.interface'
import { environments } from '../../../environments/environments'

@Injectable({
    providedIn: 'root',
})
export class HeroesService {
    private baseUrl: string = environments.baseUrl

    constructor(private _http: HttpClient) {}

    getHeroes(): Observable<Hero[]> {
        return this._http.get<Hero[]>(`${this.baseUrl}/heroes`)
    }

    getHeroById(id: string): Observable<Hero | undefined> {
        return this._http
            .get<Hero>(`${this.baseUrl}/heroes/${id}`)
            .pipe(catchError(() => of(undefined)))
    }

    getSuggestions(query: string): Observable<Hero[]> {
        return this._http.get<Hero[]>(
            `${this.baseUrl}/heroes?q=${query}&_limit=6`
        )
    }

    addHero(hero: Hero): Observable<Hero> {
        const heroWithoutId = { ...hero, id: undefined }
        return this._http.post<Hero>(`${this.baseUrl}/heroes`, heroWithoutId)
    }

    updateHero(hero: Hero): Observable<Hero> {
        if (!hero) throw Error('Hero id is required')
        return this._http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero)
    }

    deleteHeroById(id: string): Observable<boolean> {
        return this._http.delete(`${this.baseUrl}/heroes/${id}`).pipe(
            map((resp) => true),
            catchError(() => of(false))
        )
    }
}
