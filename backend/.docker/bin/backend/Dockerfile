FROM node:18.17.0-alpine3.17

RUN apk --update add --no-cache bash curl

# Essentials
RUN apk add -U tzdata
ENV TZ=America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN npm install -g @nestjs/cli@9.1.1

WORKDIR /var/www
EXPOSE 3071
ENV HOST 0.0.0.0
