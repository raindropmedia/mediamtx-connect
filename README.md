<div align="center">
  <h1 align="center">
  MediaMTX Connect
</h1>
  
  <strong>Interface for viewing and managing media streams of various formats </strong>
  
  <strong>Leveraging the power of [MediaMTX](https://github.com/bluenviron/mediamtx) </strong>

  ![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/raindropmedia/mediamtx-connect/ci.yml?label=CI)
  [![Docker Hub](https://img.shields.io/badge/raindropmedia/mediamtx-connect?label=docker&color=blue)](https://hub.docker.com/raindropmedia/mediamtx-connect)
  [![Github Release](https://img.shields.io/github/v/release/raindropmedia/mediamtx-connect)](https://github.com/raindropmedia/mediamtx-connect/releases)
</div>
<br>


https://github.com/raindropmedia/mediamtx-connect/assets/12603953/ae1e3e0f-401e-4560-a373-b46ea5679870

## Usage

docker-compose

```
version: "3.4"
services:
  mediamtx:
    image: bluenviron/mediamtx
    container_name: mediamtx
    restart: unless-stopped
    environment:
      - MTX_API=yes
      - MTX_APIADDRESS=:9997
      - MTX_RECORD=yes
    volumes:
      - ${MEDIAMTX_RECORDINGS_DIR}:/recordings
    networks:
      - mtx
    ports:
      - 8554:8554
      - 8890:8890/udp
      - 1935:1935
      - 8888:8888
      - 8889:8889
      - 9997:9997
  mediamtx-connect:
    image: bcanfield/mediamtx-connect
    container_name: mediamtx-connect
    restart: unless-stopped
    volumes:
      - ${MEDIAMTX_RECORDINGS_DIR}:/recordings
    networks:
      - mtx
    ports:
      - 3000:3000
networks:
  mtx:
    name: mtx

```
