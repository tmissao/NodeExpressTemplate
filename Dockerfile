FROM node:9

# application placed into /opt/app
RUN mkdir -p /opt/app

WORKDIR /opt/app

# Install app dependencies
COPY package.json .
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json ./

RUN npm install --production && npm cache clean --force

# Database
ENV MYSQL_HOST sistema-pontuacao.chd0b083xnfm.sa-east-1.rds.amazonaws.com
ENV MYSQL_HOST_READ_ONLY sistema-pontuacao.chd0b083xnfm.sa-east-1.rds.amazonaws.com
ENV MYSQL_PORT 3306
ENV MYSQL_USER root
ENV MYSQL_PASS akjd4hd73shdEdjd
ENV MYSQL_DB db_prod_sistemapontuacao

# App
ENV PORT 3000
ENV BASE_URL http://localhost

COPY . .

EXPOSE 3000

CMD ["npm","start"]
