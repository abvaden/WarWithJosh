FROM golang AS api-build
WORKDIR /go/src/github.com/abvaden/WarWithJosh
COPY . .
RUN go get -d -v ./...
RUN go install -v ./...
RUN go build -v ./api/app.go
ENTRYPOINT /go/bin/api

FROM node:alpine as www-build
WORKDIR /src/
COPY . .
WORKDIR /src/www
RUN npm install
RUN npm run build
ENTRYPOINT /bin/sh

FROM debian:stretch-slim
WORKDIR /root
COPY --from=api-build /go/bin/api /root/
COPY --from=www-build /src/www/dist/ /root/www/
RUN chmod +x /root/api
ENTRYPOINT /root/api
EXPOSE 3000