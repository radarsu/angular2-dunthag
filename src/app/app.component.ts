/*
 * Angular 2 decorators and services
 */
import {
    AppState, Component, ViewEncapsulation, Router,
} from './shared/importer';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
        // '../assets/css/materialize-src/sass/materialize.scss',
        '../assets/css/mdl-src/material-design-lite.scss',
        './app.style.scss'
    ],
    templateUrl: './app.template.html',
    providers: [],
})
export class App {
    constructor(public appState: AppState, private router: Router) {

    }

    ngOnInit() {
        console.log('Initial App State');
        // this.router.navigate(['']);
    }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
