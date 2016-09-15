import {
    ApplicationRef, BrowserModule, FormsModule, HttpModule, NgModule, RouterModule, createNewHosts, removeNgStyles,
} from './shared/importer';
/*
 * Platform and Environment providers/directives/pipes
 */
import {
    APP_RESOLVER_PROVIDERS, App, AppState, Connect, ENV_PROVIDERS, ErrorView, LogIn, MDL, NoContent, ROUTES,
    SocketConnected, VersionFooter, CenteredPanel, UserView, CharacterCreate,
} from './shared/importer';

// Application wide providers
const APP_PROVIDERS = [
    ...APP_RESOLVER_PROVIDERS,
    AppState,
    SocketConnected,
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap: [App],
    declarations: [
        App,
        // routes
        Connect,
        LogIn,
        UserView,
        CharacterCreate,
        // CharacterView,
        // Game,

        ErrorView,
        NoContent,

        // directives
        MDL,

        // sub-components
        VersionFooter,
        CenteredPanel,
    ],
    imports: [ // import Angular's modules
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(ROUTES, { useHash: false })
    ],
    providers: [ // expose our Services and Providers into Angular's dependency injection
        ENV_PROVIDERS,
        APP_PROVIDERS,
    ]
})
export class AppModule {
    constructor(public appRef: ApplicationRef, public appState: AppState) { }

    hmrOnInit(store) {
        if (!store || !store.state) return;
        console.log('HMR store', store);
        this.appState._state = store.state;
        this.appRef.tick();
        delete store.state;
    }

    hmrOnDestroy(store) {
        const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        const state = this.appState._state;
        store.state = state;
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // remove styles
        removeNgStyles();
    }

    hmrAfterDestroy(store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
