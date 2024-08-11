# Hacker News App

This repository is an Expo project that uses development builds with `expo-dev-client`. It is designed to provide a streamlined development experience for both Android and iOS platforms.

## Set Up Your Environment

To get started, you'll need to set up your development environment for Expo projects.

- **[Set up for Android](https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=simulated&mode=development-build&buildEnv=local)**
- **[Set up for iOS](https://docs.expo.dev/get-started/set-up-your-environment/?platform=ios&device=simulated&mode=development-build&buildEnv=local)**

Once your environment is set up, you can run the project using the following commands:

```bash
npx expo run:android
npx expo run:ios
```

## Running Tests

To run the tests, use the following command:

```bash
yarn test
```

## Recommended VS Code Extensions

For a better development experience, it's recommended to install the following VS Code extensions:

- **ESLint**: Helps maintain consistent code quality by identifying and fixing common coding issues.
- **Prettier**: Automatically formats your code to ensure a consistent style throughout your project.

## Background Fetch for Notifications

This project includes a background fetch task for handling notifications. By default, the interval for this task is set to 10 minutes. If you wish to modify this interval, you can do so in the file `app/src/services/notifications.ts` by adjusting the `minimumInterval` parameter (in seconds) within the `registerNotificationTask()` method.

## Global State Management with Zustand

This project uses [Zustand](https://github.com/pmndrs/zustand?tab=readme-ov-file#why-zustand-over-redux) for global state management. Here are some reasons why Zustand was chosen:

### Why Zustand Over Redux?

- Simple and un-opinionated
- Hooks are the primary means of consuming state
- No need to wrap your app in context providers
- Can inform components transiently (without causing render)

### Why Zustand Over Context?

- Less boilerplate
- Only renders components on state changes
- Centralized, action-based state management
