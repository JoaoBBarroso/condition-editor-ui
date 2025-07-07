# Condition Editor UI – Guided Tour & Development Notes

# Guided Tour

This project is a React + TypeScript application bootstrapped with Vite. It implements a condition editor UI, allowing users to filter and view data using a flexible, composable interface. The codebase is organized for clarity and scalability, with a focus on modularity and testability.

## Key Features

- **Filter Bar**: Located in `src/components/FilterBar/`, this is the main UI for building filter conditions. It includes:
  - `OperatorSelect.tsx`: Dropdown for selecting filter operators.
  - `PropertySelect.tsx`: Dropdown for selecting which property to filter on.
  - `ValueInput.tsx`: Input for entering filter values.
- **Product Table**: In `src/components/ProductTable.tsx`, displays filtered data in a tabular format.
- **State Management**: Uses simple store modules in `src/store/` for managing filter and data state.
- **Utilities**: Filtering logic and type definitions are in `src/lib/`.
- **Testing**: Tests are in `src/__tests__/`, using Vitest and React Testing Library.

## How to Run & Test

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. Run tests: `npx vitest run` or use the VS Code task "Run Vitest"

## Development Process Notes

- **Initial Setup**: Started with Vite's React + TypeScript template for fast iteration and HMR.
- **Component Design**: Broke down the UI into small, reusable components for maintainability.
- **State Management**: Chose a simple custom store pattern for state, avoiding external dependencies for this scale.
- **Testing**: Wrote unit and integration tests for key components and logic.
- **Linting & Formatting**: Used ESLint and Prettier for code quality and consistency.
- **Iteration**: Built the filter logic first, then UI, then tests, iterating as needed.

## Time Spent

Estimated total time: **6 hours**

- Project setup & planning: ~0.5h
- Component & store implementation: ~3h
- Testing: ~1.5h
- Debugging, polish, and documentation: ~1h

## Assumptions Made

- The data to be filtered is static and provided in `src/store/data/mockData.ts`.
- Only basic filter operations (equality, contains, etc.) are required.
- No backend/API integration is needed for this exercise.
- UI/UX should be clean but minimal, focusing on functionality over design polish.
- The code should be easy to extend for more complex filter logic or data sources.
