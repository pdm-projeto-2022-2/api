FROM node:lts-alpine AS build
ADD package.json /app/package.json
ADD package-lock.json /app/package-lock.json
ADD nest-cli.json /app/nest-cli.json
ADD tsconfig.json /app/tsconfig.json
ADD tsconfig.build.json /app/tsconfig.build.json
WORKDIR /app
RUN ["npm", "install"]


FROM build
ADD src /app/src
#DEVMODE
CMD ["npm", "run", "start"]
EXPOSE 3000