# opinion-ate

An app for tracking reviews of dishes at different restaurants.

_Note_: this project is from the book [Outside-In React Development](https://outsidein.dev/) with some changes made by me:

- it uses Typescript instead of JavaScript
- I tried to replace some of the deprecated API for Redux with more modern variants from Redux Toolkit, e.g. [`createAsyncThunk`](https://redux-toolkit.js.org/usage/usage-with-typescript#createasyncthunk)
- form handling via custom hook and uncontrolled form input

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

You will need an API key for the backend server. Check [https://api.outsidein.dev/](https://api.outsidein.dev/) for further information.

Create a new file called `.env.local` and add the key:

```
VITE_API_KEY=
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

### E2E Tests

This project uses [Cypress](https://www.cypress.io/) for end-to-end-testing.

```sh
bun cy:run
```

or

```sh
bun cy:open
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
