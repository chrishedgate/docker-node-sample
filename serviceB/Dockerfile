# Set the base image to Debian Jessie with Nodesource Node.js binaries
FROM nodesource/jessie:0.10

# File Author / Maintainer
MAINTAINER Chris Hedgate

# Provides cached layer for node_modules
ADD /src/package.json /tmp/package.json
RUN cd /tmp && \
  npm install
RUN mkdir -p /src && cp -a /tmp/node_modules /src/

# Copy code
ADD ./src /src

# Expose port
EXPOSE 8082

# Define working directory
WORKDIR /src

# Run app
CMD ["node", "index.js"]