FROM cypress/included:13.13.2

RUN mkdir /app
WORKDIR /app

COPY . /app

RUN npm install