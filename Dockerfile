
FROM node:18 AS build


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


RUN npm run build


FROM node:18 AS production

WORKDIR /app


COPY --from=build /app /app

COPY --from=build /app/dist /app/dist
COPY --from=build /app/package*.json /app/



EXPOSE 8080


CMD ["npm", "start"]

