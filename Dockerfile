FROM golang AS api-build
WORKDIR /go/src/WarWithJosh
COPY . .
RUN go get -d -v ./...
RUN go install -v ./...
RUN go build -v ./api/app.go

FROM node:alpine as www-build
WORKDIR /src/
COPY . .
WORKDIR /src/www
RUN npm install
RUN npm run build

FROM alpine
WORKDIR /root/
COPY --from=api-build /go/bin/api .
#COPY --from=www-build /src/www/public ./www
RUN chmod +x /root/api
#ENTRYPOINT /bin/sh
CMD /root/api

