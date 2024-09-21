FROM node:21-alpine

WORKDIR /app/frontend/

COPY package*.json /app/frontend/
# Docker layer caching, move package.json and package-lock.json to app/frontend first then do npm install
# So when re-building the images, if something changes in /app/frontend, docker will not run npm install again, hence reducing build time.
# If a COPY file has changed, all layers after that in the image will be rebuilt

RUN npm install

COPY . /app/frontend/

# RUN npm install -g npm@10.5.0

#CMD ["tail", "-F", "robots.txt"]
CMD ["npm", "start"]
