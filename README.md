# opinion-ate

An app for tracking reviews of dishes at different restaurants.

_Note_: this project is from the book [Outside-In React Development](https://outsidein.dev/) with some changes made by me:

- it uses Typescript instead of JavaScript
- I tried to replace some of the deprecated API for Redux with more modern variants from Redux Toolkit, e.g. [`createAsyncThunk`](https://redux-toolkit.js.org/usage/usage-with-typescript#createasyncthunk)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- [bun](https://bun.sh)
- [Node.js](https://nodejs.org)

### Installing

Install dependencies:

```sh
bun install
```

## Running the tests

### Unit Tests

This project uses [vitest](vitest.dev) and [React Testing Library](https://testing-library.com/).

```sh
bun test:run
```

Or use watch mode:

```sh
bun test:watch
```

### Break down into end to end tests

This project uses [Cypress](https://www.cypress.io/) for end-to-end-testing.

```sh
bun cy:run
```

## Deployment

tbd

## Built With

- [React](https://reactjs.org)
- [Vite](https://vitejs.dev)

## License

As the code is mostly from the aforementioned book, I cannot release this code with an open license. ¯\\\_(ツ)\_/¯

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Acknowledgments

- Hat tip to [CodingItWrong](https://github.com/CodingItWrongDemo/opinion-ate)
