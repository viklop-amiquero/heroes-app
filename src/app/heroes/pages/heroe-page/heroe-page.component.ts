import { Component, OnInit } from '@angular/core'
import { HeroesService } from '../../services/heroes.service'
import { ActivatedRoute } from '@angular/router'
import { Hero } from '../../interfaces/hero.interface'
import { switchMap } from 'rxjs'
import { Router } from '@angular/router'

@Component({
    selector: 'app-heroe-page',
    templateUrl: './heroe-page.component.html',
    styleUrl: './heroe-page.component.css',
})
export class HeroePageComponent implements OnInit {
    public hero?: Hero
    constructor(
        private _heroesService: HeroesService,
        private _activateRoute: ActivatedRoute,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this._activateRoute.params
            .pipe(switchMap(({ id }) => this._heroesService.getHeroById(id)))
            .subscribe((hero) => {
                if (!hero) return this._router.navigateByUrl('/heroes/list')

                this.hero = hero
                console.log(this.hero)
                return
            })
    }
}
