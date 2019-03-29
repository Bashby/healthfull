FROM node:8

# Install deps; allow docker to cache this
COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

# Bring in application code
WORKDIR /opt/app
COPY . /opt/app

EXPOSE 8080

CMD ["npm", "run", "dev"]
