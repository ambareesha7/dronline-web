# ----------------------
# ----- Base  Node -----
# ----------------------
FROM node:10-alpine as base
# install node
RUN apk add --no-cache nodejs tini npm yarn python build-base
# force upgrade yarn
RUN npm install --force --global yarn@1.9.4
# set working directory
WORKDIR /code
# Set tini as entrypoint
ENTRYPOINT ["/sbin/tini", "--"]

# ----------------------
# ---- Dependencies ----
# ----------------------
FROM base AS dependencies
# copy project file
COPY package.json yarn.lock ./
# install node packages
RUN yarn install --production
# copy production node_modules aside
RUN cp -R node_modules prod_node_modules
# install ALL node_modules, including 'devDependencies'
RUN yarn install

FROM dependencies AS build
ARG NODE_ENV
# copy app sources
COPY . .
# build app
RUN yarn run build

FROM base AS release
# copy production node_modules
COPY --from=dependencies /code/prod_node_modules ./node_modules
# copy static files
COPY --from=build /code/dist ./public
# copy server
COPY server.js .

# expose port and define CMD
EXPOSE 5000
CMD node server.js
