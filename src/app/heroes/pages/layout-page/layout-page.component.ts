import { Component } from '@angular/core'
import { AuthService } from '../../../auth/services/auth.service'
import { User } from '../../../auth/interfaces/user.interface'

@Component({
    selector: 'app-layout-page',
    templateUrl: './layout-page.component.html',
    styleUrl: './layout-page.component.css',
})
export class LayoutPageComponent {
    public constructor(private _authService: AuthService) {}
    public sidebarItems = [
        {
            label: 'listado',
            icon: 'label',
            url: './list',
        },
        {
            label: 'Añadir',
            icon: 'add',
            url: './new-hero',
        },
        {
            label: 'Buscar',
            icon: 'search',
            url: './search',
        },
    ]

    get user(): User | undefined {
        return this._authService.currentUser
    }

    onLogOut(): void {
        this._authService.logOut()
    }
}
