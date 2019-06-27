FROM node:9

# application placed into /opt/app
RUN mkdir -p /opt/app

WORKDIR /opt/app

# Install app dependencies
COPY package.json .
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json ./

RUN npm install --production && npm cache clean --force

# App
ENV PORT 3000
ENV BASE_URL http://localhost

COPY . .

EXPOSE 3000

CMD ["npm","start"]
