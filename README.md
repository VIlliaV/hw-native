**Мова: [Українська](README.md), [English](README.en.md).**

## Опис проекту

hw-native це мобільний додаток, розроблений на основі React Native, з інтеграцією Firebase для управління даними та
автентифікацією. Додаток надає можливість користувачам публікувати пости та переглядати їх у реальному часі.
Використовується Firestore для зберігання даних, Firebase Storage для зберігання зображень, а також Redux для керування
станом додатку.

## Реалізовано

1. Реєстрація та вхід: Автентифікація користувачів за допомогою Firebase.
2. Створення та публікація постів: Користувачі можуть створювати нові пости з текстом та зображеннями.
3. Прив'язка постів до користувача: Пост автоматично прив'язується до користувача, який його створив.
4. Завантаження зображень: Користувачі можуть завантажувати зображення, які будуть стиснені для оптимізації швидкості
   завантаження та зберігання.
5. Пагінація: Завантаження постів поступово для забезпечення оптимальної продуктивності додатку.
6. Коментарі: Користувачі можуть обмінюватись коментарями в реальному часі.

## Стек технологій:

![React native](https://img.shields.io/badge/react-%2361DAFB?style=for-the-badge&logo=React&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-%23DD2C00?style=for-the-badge&logo=firebase&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23764ABC?style=for-the-badge&logo=Redux&logoColor=white)
![Expo](https://img.shields.io/badge/expo-%23000020?style=for-the-badge&logo=Expo&logoColor=white)

## Встановлення та запуск

1. Клонування репозиторію:

git clone https://github.com/VIlliaV/hw-native.git

cd hw-native

2. Використовуйте npm або yarn для встановлення залежностей:

npm install або yarn install

3. Добавте залежності в .env файлLanguage: Ukrainian, English.

4. Запустіть додаток у симуляторі або на реальному пристрої:

npm start або yarn start
