import redisDriver from 'unstorage/drivers/redis'

export default defineNitroPlugin(() => {
  const storage = useStorage()

  const driver = redisDriver({
    base: 'nearby-restaurant',
    host: useRuntimeConfig().redis.host,
    port: useRuntimeConfig().redis.port,
    password: useRuntimeConfig().redis.password,
  })

  storage.mount('redis', driver)
})