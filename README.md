# Our Memorial Page

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run start` to start the dev for a dev server first.

Run `npm run e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io/).

## Running Story book

Run `npm run story-book` to start the dev server of storybook. The default port will be 6006.

Run `npm run build-storybook` to build the story book. It will automatically generate storybook-static folder.\

Run `netlify deploy` for preview the storybook which will be hosted on Netlify server.

If everything looks good on your draft URL, deploy it to your main site URL with the --prod flag by running  `netlify deploy --prod`

You can find more document via [Storybook](https://storybook.js.org/).

## Running Code Analysis with Sonarqube
##### Running Sonarqube docker server

```bash
$ cd docker
$ docker-compose -f docker-compose.sonar.yml up -d 

- Sonarqube will be up and running at: http://localhost:9001
```
##### Command

```bash
$ npm run sonar
```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
