FROM cypress/included:13.13.2

RUN mkdir /app
WORKDIR /app

COPY . /app

RUN npm install

# docker run -it --rm -v "C:\\Users\\Gabriel\\Desktop\\CY-ORANGE\\ORANGE-HRM-PT2-CY\\cypress\\reports:/app/cypress/reports" cypress
# docker run -it --rm -v "C:\\Users\\Gabriel\\Desktop\\CY-ORANGE\\ORANGE-HRM-PT2-CY:/cypress" cypress 

# docker run -it --rm -v "C:\\Users\\Gabriel\\Desktop\\CY-ORANGE\\ORANGE-HRM-PT2-CY\\package.json:/app/package.json" -v "C:\\Users\\Gabriel\\Desktop\\CY-ORANGE\\ORANGE-HRM-PT2-CY\\cypress.config.js:/app/cypress.config.js" -v "C:\\Users\\Gabriel\\Desktop\\CY-ORANGE\\ORANGE-HRM-PT2-CY\\cypress\\reports:/app/cypress/reports" --entrypoint /bin/sh cypress -c "npm run test"
# docker run -it --rm -v "C:\\Users\\Gabriel\\Desktop\\CY-ORANGE\\ORANGE-HRM-PT2-CY\\cypress\\documentation:/app/cypress/documentation" -v "C:\\Users\\Gabriel\\Desktop\\CY-ORANGE\\ORANGE-HRM-PT2-CY\\cypress\\reports:/app/cypress/reports" cypress -c "touch /app/cypress/reports/test.txt"