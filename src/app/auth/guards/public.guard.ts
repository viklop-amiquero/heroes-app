import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    CanMatchFn,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment,
} from '@angular/router'

import { Observable, tap, map } from 'rxjs'
import { inject } from '@angular/core'
import { AuthService } from '../services/auth.service'

const checkAuthStatus = (): Observable<boolean> => {
    const authService: AuthService = inject(AuthService)
    const router: Router = inject(Router)

    return authService.checkAutentication().pipe(
        tap((isAuthenticated) => {
            if (isAuthenticated) {
                router.navigateByUrl('/heroes')
            }
        }),
        map((isAuthenticated) => !isAuthenticated)
    )
}

export const guardPublicActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    console.log('CanActivate')
    console.log({ route, state })

    return checkAuthStatus()
}

export const guardPublicMatch: CanMatchFn = (
    route: Route,
    segments: UrlSegment[]
) => {
    console.log('CanMatch')
    console.log({ route, segments })

    return checkAuthStatus()
}
