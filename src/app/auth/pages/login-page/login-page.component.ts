import { Component } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
    constructor(private _authService: AuthService, private _router: Router) {}

    onLogin(): void {
        this._authService
            .login('canarpo@gmail.com', 'a2#58*6*^F3fd**^&^*s@')
            .subscribe(() => {
                this._router.navigateByUrl('/')
            })
    }
}
