# Задача
Написать простое приложение для списка задач. (Стилизовать не обязательно).
Необходимо использовать типизацию (TypeScript).
Приложение должно быть написано с использованием классовых компонентов (без хуков, они будут использоваться в следующем задании). Это нужно для понимания того, как работает состояние и методы жизненного цикла классовых компонентов.

## Функционал:
- создание задач
- удаление
- изменение
- отметить все как выполненные
- удалить выполненные

Приложение необходимо интегрировать с fake API. Стоит понимать, что это имитация сервера и все запросы на изменение данных будут возвращать корректный ответ, но не будут обновлять данные. По этой причине необходимо придерживаться следующих рекомендаций:
При загрузке страницы необходимо запросить список задач и сохранить их в хранилище. А при инициировании действий над задачами, необходимо отправить запрос, но после получения ответа, самостоятельно обновить данные, которые находятся в вашем хранилище, т.к. повторный запрос на обновление данных всегда возвращает одно и тоже значение.
API:
### GET

fetch('https://jsonplaceholder.typicode.com/todos/1')
### POST

fetch('https://jsonplaceholder.typicode.com/todos', {
  method: 'POST',
  body: JSON.stringify({
    title: 'foo',
    completed: false,
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
### UPDATE

fetch('https://jsonplaceholder.typicode.com/todos/1', {
  method: 'PUT',
  body: JSON.stringify({
    id: 1,
    title: 'foo',
    completed: true,
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
### DELETE

fetch('https://jsonplaceholder.typicode.com/todos/1', {
  method: 'DELETE',
});
Результатом выполнения задачи будет являться код в репозитории или ссылка на проект в https://codesandbox.io/



## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

