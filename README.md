# CCSAppWebVP

CCSAppWebVP realizes the presentation layer of the CCSApp. The architecture and design of the app can be found [here](https://github.com/ccsapp/docs).

> **Important**: CCSAppWebVP depends on the FleetManagement microservice to run. Therefore, you need to specify `API_URL` in your environment.

## Code Style

For code formatting, prettier is used. To format, run in the root directory:

```bash
npm run prettier:format
```

To check whether all files are formatted run:

```bash
npm run prettier:check
```

Any files that should not be formatted must be added to the [prettier ignore](./.prettierignore).

The code style is checked by the CI pipeline. If the code style is not correct, the pipeline will fail.

## Local Setup

Run `ng serve` to start a development server. A local webserver will be deployed to `http://localhost:4200/` . The application will automatically reload if you change any of the source files.

The [local environment](/src/environments/environment.ts) sets the resource URL for the FleetManagement application microservice and the `fleetId` . If you want to use your local server, replace the `API_URL` .

---

## Remarks from the devs of Angular:

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.5.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module` .

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
