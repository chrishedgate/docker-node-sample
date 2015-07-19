# Set the base image to Debian Jessie with Nodesource Node.js binaries
FROM nodesource/jessie:0.10

MAINTAINER Chris Hedgate

# Provides cached layer for node_modules
ADD /src/package.json /tmp/package.json
RUN cd /tmp && \
  npm install
RUN mkdir -p /src && cp -a /tmp/node_modules /src/

ADD ./src /src

EXPOSE 8082

WORKDIR /src

CMD ["node", "index.js"]