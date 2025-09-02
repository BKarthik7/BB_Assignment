# PerfectPromise Wedding Planner App

A beautiful cross-platform React Native app to help users plan their dream wedding, manage guests, budget, venues, and more. 

## Demo

[Watch the demo video](https://res.cloudinary.com/dfmdv52jr/video/upload/v1756814273/PerfectPromise_ar3kbu.mp4)

## Features

- **User Authentication**: Secure login and registration with persistent sessions.
- **Profile Management**: Complete your profile with name, image, and details.
- **Checklist**: Add, edit, and complete wedding tasks. Stay organized with a dynamic checklist.
- **Guest List**: Add guests, manage RSVP status, and remove guests easily.
- **Budget Planner**: Allocate and visualize your wedding budget across categories.
- **Venue Explorer**: Browse 15 curated venues, filter by budget/capacity, and view featured venues.
- **Navigation**: Intuitive navigation with bottom tabs and quick-access buttons on Home.
- **Modern UI**: Clean, responsive design with beautiful cards, icons, and color palette.

## Screens

- **StartScreen**: Welcome and onboarding.
- **LoginScreen / RegisterScreen**: User authentication.
- **PasswordScreen / NameScreen / SelectImage / PreFinalScreen**: Profile setup.
- **HomeScreen**: Dashboard with featured venues and navigation shortcuts.
- **ChecklistScreen**: Manage wedding tasks.
- **GuestListScreen**: Manage guests and RSVP.
- **BudgetScreen**: Plan and visualize budget.
- **VenueListScreen**: Explore and filter venues.
- **ProfileScreen**: View and logout from your profile.
- **LoadingScreen**: App loading indicator.

## Tech Stack

- **React Native**
- **React Navigation**
- **SQLite** (local database)
- **AsyncStorage** (persistent storage)
- **Vector Icons** (Ionicons, FontAwesome, MaterialCommunityIcons)

## Folder Structure

```
BB_Assignment/
├── src/
│   ├── App.tsx
│   ├── context/
│   │   └── AuthContext.js
│   ├── navigation/
│   │   └── StackNavigator.js
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── ChecklistScreen.js
│   │   ├── GuestListScreen.js
│   │   ├── BudgetScreen.js
│   │   ├── VenueListScreen.js
│   │   ├── ProfileScreen.js
│   │   └── ...
│   ├── data/
│   │   └── venues.js
│   └── registrationUtils.js
├── package.json
└── ...
```

## How to Run

1. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```
2. **Start Metro bundler** (in **Terminal 1**):
    ```bash
    npx react-native start
    ```
3. **Run the app on a device/emulator** (in **Terminal 2**):

    - For Android:
      ```bash
      npx react-native run-android
      ```
    - For iOS:
      ```bash
      npx react-native run-ios
      ```

## Future Customization
- Update venue data in `data/venues.js`.
- Change theme colors in stylesheets.
- Add more screens or features as needed.

## Credits
- Images from [Pexels](https://pexels.com) and [Flaticon](https://flaticon.com).
- Built by BKarthik7 for Internshala Assignment.

## License
MIT
