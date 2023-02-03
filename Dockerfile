FROM node:lts-alpine AS build
ADD package.json /app/package.json
ADD package-lock.json /app/package-lock.json
ADD nest-cli.json /app/nest-cli.json
ADD tsconfig.json /app/tsconfig.json
ADD tsconfig.build.json /app/tsconfig.build.json
WORKDIR /app
RUN ["npm", "install"]
ADD prisma /app/prisma
ADD src /app/src
ARG DB_URL
ENV DATABASE_URL ${DB_URL}
CMD ["npm", "run", "start:migrate"]
EXPOSE 3000