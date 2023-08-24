## Nearby restaurant

### How to run

1. `clone` .env.example -> .env

run dev mode

```bash
  ./dev.sh
```

run production mode

```bash
  ./production.sh
```

### Overview

tech stack (Nuxtjs, Redis, Google maps service)

#### system design

project structure

| Type     | Name                       | Description                                                   |
| :------- | :------------------------- | :------------------------------------------------------------ |
| `folder` | `components`               | components สำหรับใช้ในส่วนต่างๆ                               |
| `folder` | `layouts`                  | layouts ทั้งหมด                                               |
| `folder` | `page`                     | page และ route ฝั่ง frontend                                  |
| `folder` | `store`                    | state managetment ไฟล์ store ต่างๆ (pinia)                    |
| `folder` | `server/*/**`              | folder ในนี้ทั้งหมดจะอยู่ในส่วนของ backend                    |
| `folder` | `server/api`               | route และ biz logic บ้างส่วน                                  |
| `folder` | `server/middleware`        | middleware                                                    |
| `folder` | `server/plugins`           | plugins มีใช้งานในส่วนของ storage (redis) สำหรับ cache ข้อมูล |
| `folder` | `server/service`           | service สำหรับเชื่อมต่อ google maps api                       |
| `folder` | `server/utils`             | validation, custom exception                                  |
| `file`   | `.env`                     | ไฟล์ env สำหรับ docker-compose.yaml                           |
| `file`   | `docker-compose.yaml`      | ไฟล์ สำหรับ run container api, mysql                          |
| `file`   | `docker-compose-dev.yaml`  | ไฟล์ docker-compose สำหรับ dev mode                           |
| `file`   | `docker-compose-prod.yaml` | ไฟล์ docker-compose สำหรับ prod mode                          |
| `file`   | `dev.sh`                   | ไฟล์ script สำหรับ run docker-compose ไฟล์ dev mode           |
| `file`   | `prod.sh`                  | ไฟล์ script สำหรับ run docker-compose ไฟล์ production mode    |

api endpoint

Postman Collection แนบตัวอย่าง Request, Response
[โหลดไฟล์](nearby-restaurant.postman_collection.json) Postman Env
[โหลดไฟล์](nearby-restaurant.postman_environment.json)

| Endpoint                   | Description                                              |
| :------------------------- | :------------------------------------------------------- |
| `/api/address/suggestion/` | สำหรับค้นหาที่อยู่ (cache 5 นาที)                        |
| `/api/address/nearby/`     | สำหรับค้นหา สถานที่ (ร้านอาหาร) ใกล้เคียง (cache 5 นาที) |
