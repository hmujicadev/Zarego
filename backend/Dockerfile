FROM node:16-alpine
ENV NODE_ENV development
WORKDIR /app
# Only copy package* before installing to make better use of cache
COPY . /app
RUN npm install
# Copy everything
EXPOSE 2000

# CMD ["npm", "run", "start"]