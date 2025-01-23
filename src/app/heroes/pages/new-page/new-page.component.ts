import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { switchMap, tap, filter } from 'rxjs'

import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'

import { Publisher, Hero } from '../../interfaces/hero.interface'
import { HeroesService } from '../../services/heroes.service'
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component'

@Component({
    selector: 'app-new-page',
    templateUrl: './new-page.component.html',
    styleUrl: './new-page.component.css',
})
export class NewPageComponent implements OnInit {
    public constructor(
        private _heroesService: HeroesService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _snackbar: MatSnackBar,
        private _dialog: MatDialog
    ) {}

    ngOnInit(): void {
        if (!this._router.url.includes('edit')) return

        this._activatedRoute.params
            .pipe(switchMap(({ id }) => this._heroesService.getHeroById(id)))
            .subscribe((hero) => {
                if (!hero) return this._router.navigateByUrl('/heroes/list')
                this.heroForm.reset(hero)
                return
            })
    }

    public heroForm = new FormGroup({
        id: new FormControl<string>('', { nonNullable: true }),
        superhero: new FormControl<string>(''),
        publisher: new FormControl<Publisher>(Publisher.DCComics),
        alter_ego: new FormControl(''),
        first_appearance: new FormControl(''),
        characters: new FormControl(''),
        alt_img: new FormControl(''),
    })

    public publishers = [
        {
            id: 'DC Comics',
            desc: 'DC - Comics',
        },
        {
            id: 'Marvel Comics',
            desc: 'Marvel - Comics',
        },
    ]

    get currentHero(): Hero {
        const hero = this.heroForm.value as Hero

        return hero
    }

    onSubmit(): void {
        if (this.heroForm.invalid) return

        if (this.currentHero.id) {
            this._heroesService
                .updateHero(this.currentHero)
                .subscribe((hero) => {
                    // Todo mostrar snackbars
                    this.showSnackBar(`${hero.superhero} updated`)
                })

            return
        }

        this._heroesService.addHero(this.currentHero).subscribe((hero) => {
            // Todo mostar snackbars y navegar
            this._router.navigate(['/heroes/edit/', hero.id])
            this.showSnackBar(`${hero.superhero} created`)
        })
    }

    onDeleteHero(): void {
        if (!this.currentHero.id) throw Error('Hero id is required')

        const dialogRef = this._dialog.open(ConfirmDialogComponent, {
            data: this.heroForm.value,
        })

        dialogRef
            .afterClosed()
            .pipe(
                filter((result: boolean) => result),
                switchMap(() =>
                    this._heroesService.deleteHeroById(this.currentHero.id)
                ),
                filter((resp: boolean) => resp)
            )
            .subscribe(() => {
                this._router.navigateByUrl('/heroes')
            })
        // dialogRef.afterClosed().subscribe((result) => {
        //     if (!result) return
        //     this._heroesService
        //         .deleteHeroById(this.currentHero.id)
        //         .subscribe((resp) => {
        //             if (!result) return
        //             this._router.navigateByUrl('/heroes')
        //         })
        // })
    }

    showSnackBar(message: string): void {
        this._snackbar.open(message, 'done', {
            duration: 2500,
        })
    }
}
