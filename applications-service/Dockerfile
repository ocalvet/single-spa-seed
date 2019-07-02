FROM node:12-slim as base
ENV NODE_ENV=production
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node package.json package-lock*.json ./
RUN npm ci && npm cache clean --force

FROM base as source
COPY --chown=node:node . .

FROM source as prod
ENTRYPOINT ["/tini", "--"]
CMD ["npm", "run", "start"]