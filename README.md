# cidadaofiscal

This open source project aims to provide easy access to public data so that the ordinary citizen can evaluate how politicians are managing public resources.


## Environment
- Docker (Compose: MariaDB and PHP7)
- Server (PHP Rest API)
- Client (Angular)
- yarn (or npm)

## Setup


1) Clone the project
```
git clone https://github.com/scadete/cidadaofiscal.git
cd cidadaofiscal
```

2) Build the client application

```
cd client
yarn install
```

3) Start docker environment
```
cd ..
cd cidadaofiscal
cd docker
docker-compose up
```
It may take some time to setup the PHP docker container. Be pacient, it won't take as much next time it starts.

Docker may request access to your drive and network because we are creating a network interface and sharing volumes with the host system.
