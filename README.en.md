**Language: [Ukrainian](README.md), [English](README.en.md).**

## Project Description

hw-native is a mobile application developed using React Native, integrated with Firebase for data management and
authentication. The app allows users to publish posts and view them in real-time. Firestore is used for data storage,
Firebase Storage for image storage, and Redux for managing the application's state.

## Implemented Features

1. Registration and Login: User authentication via Firebase.
2. Creating and Publishing Posts: Users can create new posts with text and images.
3. Post Association with Users: Posts are automatically linked to the user who created them.
4. Image Uploading: Users can upload images, which will be compressed for optimized loading speed and storage.
5. Pagination: Posts are loaded gradually to ensure optimal app performance.
6. Comments: Users can exchange comments in real-time.

## Technology Stack:

![React native](https://img.shields.io/badge/react-%2361DAFB?style=for-the-badge&logo=React&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-%23DD2C00?style=for-the-badge&logo=firebase&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23764ABC?style=for-the-badge&logo=Redux&logoColor=white)
![Expo](https://img.shields.io/badge/expo-%23000020?style=for-the-badge&logo=Expo&logoColor=white)

## Installation and Launch

1. Clone the repository: git clone https://github.com/VIlliaV/hw-native.git

cd hw-native

2. Use npm or yarn to install dependencies:

npm install or yarn install

3. Add dependencies to the .env file.

4. Run the app in a simulator or on a real device:

npm start or yarn start
