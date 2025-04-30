# Используйте официальный образ Node.js
FROM node:20

# Установите рабочую директорию
WORKDIR /app

# Копируйте package.json и package-lock.json
COPY package*.json ./

# Установите зависимости
RUN npm install

# Копируйте все файлы проекта
COPY . .

# Соберите приложение
RUN npm run build

# Установите HTTP-сервер для обслуживания статических файлов
RUN npm install -g serve

# Определите переменную окружения
ENV NODE_ENV=production

# Откройте порт
EXPOSE 3002

# Запустите сервер
CMD ["serve", "-s", "dist", "-l", "3002"]
