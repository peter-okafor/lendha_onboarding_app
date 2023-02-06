## lendha-onboard

The frontend for on-field officers dashboard

### Table of Contents

1. [Setup](#setup)
1. [Project Organization](#project-organization)

## 📦 Setup
This project was bootstraped with [Vite](https://vitejs.dev/).
Make sure you have Node v14+ or latest LTS installed.


### Install
```sh
yarn install
# or
npm install
```

### Development
```sh
yarn run dev
# or
npm run dev
```

### Testing
```sh
yarn run test
# or
npm run test
```

### Format code
The following command will format the code using `prettier`  and lint it with `eslint`.
```sh
yarn run format
# or
npm run format
```

### Deployment
```sh
yarn run build
# or
npm run build
```

**Note:** You can preview the production build locally by running `yarn run preview` or `npm run preview`.

### 🖥️ Project organization

```
src/
  ├── assets/
  ├── components/
  ├── features/
  ├── routes/
  ├── theme/
```

## Main Packages
- CSS(`CSS-in-JS`): [Chakra UI](https://chakra-ui.com/) is used as the UI system.
- JS Framework: [React](https://reactjs.org/)
- Type Checking: [TypeScript](https://www.typescriptlang.org/)
- State Management: [Redux Toolkit](https://redux-toolkit.js.org/)
- Testing: [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- Icons: [react-icons](https://react-icons.github.io/react-icons/)