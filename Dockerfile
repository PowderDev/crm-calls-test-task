FROM node:alpine as builder

WORKDIR /app
COPY package.json .

COPY client /app/client
WORKDIR /app/client
RUN yarn
RUN yarn build
RUN npm prune

COPY server /app/server
WORKDIR /app/server
RUN yarn
RUN yarn build
RUN npm prune


FROM node:alpine
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/client/dist /app/client/dist
COPY --from=builder /app/client/node_modules /app/server/node_modules
COPY --from=builder /app/server/build /app/server/build
COPY --from=builder /app/server/node_modules /app/server/node_modules

EXPOSE 80

CMD ["yarn", "start:prod"]
