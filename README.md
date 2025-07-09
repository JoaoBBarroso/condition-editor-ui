# Condition Editor UI – Guided Tour & Development Notes

## Table of Contents

- [Guided Tour](#guided-tour)
- [Folder Structure](#folder-structure)
- [Key Features](#key-features)
- [How to Run & Test](#how-to-run--test)
- [Development Notes](#development-notes)
- [Time Spent](#time-spent)
- [Assumptions Made](#assumptions-made)
- [Possible Future Improvements](#possible-future-improvements)

# Guided Tour

For this project I've decided to create a React + TypeScript application bootstrapped with Vite, using Zustand for global state management and Vitest + react-testing-library for unit testing. It implements a condition editor UI, allowing users to filter and view data using a flexible, composable interface. The codebase is organized for clarity and scalability, with a focus on modularity and testability.

## Folder Structure

```
/condition-editor-ui
├── public/
├── src/
│   ├── __tests__/
│   ├── components/
│   │   ├── FilterBar/
│   │   ├── ProductTable/
│   │   └── ui/
│   ├── lib/
│   ├── store/
│   │   ├── data/
│   ├── App.tsx
│   └── main.tsx
├── .eslintrc
├── .prettierrc
├── index.html
├── package.json
├── tsconfig.json
├── setupTests.ts
└── vite.config.ts
```

## Key Features

- **Filter Bar**: Located in `src/components/FilterBar/`, this is the main UI for building filter conditions. It includes:
  - `OperatorSelect.tsx`: Dropdown for selecting filter operators.
  - `PropertySelect.tsx`: Dropdown for selecting which property to filter on.
  - `ValueInput.tsx`: Input for entering filter values.
- **Product Table**: In `src/components/ProductTable`, displays filtered data in a tabular format.
- **State Management**: Uses simple zustand store modules in `src/store/` for managing filter and data state.
- **Utilities**: Filtering logic and type definitions are in `src/lib/`.
- **Testing**: Tests are in `src/__tests__/`, using Vitest and React Testing Library.

## How to Run & Test

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. Run tests: `npx vitest run` or use `npm run test`

## Development Notes

- **Initial Setup**: Started with Vite's React + TypeScript + shadcn + tailwind template for fast iteration and HMR.
- **Component Design**: Broke down the UI into small, reusable components for maintainability, i.e. the FilterBar component was all in a single file but broke it down for readability and maintanability. App.tsx and ProductTable.tsx as simple as they are, do not need to be broken down.
- **State Management**: Chose a simple custom Zustand store pattern for state, avoiding external dependencies for this scale. I've decided to import the data on the dataStore.ts file and rename the initial datastore file to mockData.ts. This way it would better reproduce a real development scenario where we would make the request on the store instead of directly in the component/page.
- **Testing**: Wrote unit and integration tests for key components and logic. This is what I consider meaningful tests, that make sense. What I mean is, I've used shadcn componentns that are present under `src/components/ui/` but since these are components from a well tested and widely used component library, it didn't make sense to test those as well.
- **Linting & Formatting**: Used ESLint and Prettier for code quality and consistency.
- **Development Iteration**: Built the filter logic first, then UI, then tests, iterating as needed.

## Time Spent

Estimated total time: **7 hours**

- Project setup & planning: ~0.5h
- Component & store implementation: ~3h
- Testing: ~2h
- Debugging, polish, and documentation: ~1.5h

## Assumptions Made

- The data to be filtered is static and provided in `src/store/data/mockData.ts`.
- Only basic filter operations (equality, contains, etc.) and data types are required/static meaning those could be stored under types.ts file.
- No backend/API integration is needed for this exercise.
- UI/UX should be clean but minimal, puting an emphasis on focusing on functionality over major design features.
- The code should be easy to extend for more complex filter logic or data sources.

## Possible Future Improvements

- Regarding testing I would love to introduce playwright for E2E tests to possibly test more complex scenarios.
- Still on testing regarding the test on the `FilterBar.test.tsx` from line 65 I would want it to be all together instead of separated but possibly because of state update problems I couldn't make the code run all together in the same `it()`. I believe this could be some small thing I can be overlooking I decided to not spend more time on this. A possible fix might be another/better way to setup/mock the zustand store.
- I dont know how often the list of products would update but we could consider adding TanStack Query for the API requests, benefiting from its out-of-the-box caching, automatic out-of-date updates and, if so, pagination optimizations and lazy loading data.
- Would consider adding pagination of lists of products become too large.
- As the application grows in size, would add utils/ and consts/ folders to better organize the code by feature/page/scenario.
- Would consider revamping the structure of the project for a atomic or feature based folder design approach. Right now it might not make too much sense but would be very helpful even by just adding a second page and 2 or 3 other components. This would improve even more the projects' overall scalability and modularity.
- Would move the `App.tsx` contents to, i.e., a `Home.tsx` component, making the `App.tsx` cleaner and that way if we need to add any providers or global components, the file would be better prepared for that.
