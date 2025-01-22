import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { SharedModule } from './shared/shared.module'

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideHttpClient } from '@angular/common/http'

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, SharedModule],
    providers: [provideAnimationsAsync(), provideHttpClient()],
    bootstrap: [AppComponent],
})
export class AppModule {}
