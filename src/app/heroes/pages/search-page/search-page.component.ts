import { Component } from '@angular/core'
import { HeroesService } from '../../services/heroes.service'
import { FormControl } from '@angular/forms'
import { Hero } from '../../interfaces/hero.interface'

@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.component.html',
    styleUrl: './search-page.component.css',
})
export class SearchPageComponent {
    public searchInput = new FormControl()
    public heroes: Hero[] = []

    constructor(private _heroesService: HeroesService) {}

    searchHero(): void {
        const value: string = this.searchInput.value || ''
        this._heroesService
            .getSuggestions(value)
            .subscribe((heroes) => (this.heroes = heroes))
    }
}
