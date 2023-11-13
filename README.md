# Temper

This is the solution I propose for the [assignment](https://temper.notion.site/Temper-Frontend-Engineer-Assignment-ca2598a1ca804444b323d939742897d5)

## Setup

First `npm install`, and make sure [playwrite](https://playwright.dev/) is installed correctly because it is needed to run the e2e tests, you can run
```sh
npx playwright install
```

## Useful commands

The following npm commands are useful to know, they are in package.json, but I am putting them here for the ease of reading:
1- To run the app: `npm run dev`
2- To run the unit tests: `npm run test:unit`
3- To run the e2e tests: `npm run test:e2e`

## Project structure

The project uses vue3, and follows the default folder structure.
The components are in src/components folder, they are:
1- **PostItem**: The basic card component for the elements of the left side, the card contains the text 'Post id', and arrows to move the card up or down
2- **HistoryContainer**: is the wrapper element for the right side, which shows only after interacting with the arrows of postItem
3- **HistoryItem**: is a card containing actions taken on the left side, with a button to reset history to the state of the post order before the clicked action.

The component tests are in ``src/components/__tests__`` folder.

The app uses two pinia stores to maintain states, the first one is `postsStore`, which is responsible for doing the fetch api call to retreive the posts, it is in `src/stores/postsStore`. The second is `historyStore` which is responsible to storing the state when an action is taken. The store unit tests are in ``/src/stores/__tests__``

The last part is /e2e/ folder which contains `postListTests.spec.ts` which is the playwrite e2e test file, and it contains 12 test cases.
