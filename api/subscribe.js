import { Redis } from '@upstash/redis'

function getRedis() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  return new Redis({ url, token })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' })
  const redis = getRedis()
  if (!redis) return res.status(500).json({ error: 'Database not connected. Add the Upstash integration in Vercel.' })
  const sub = req.body
  if (!sub || !sub.endpoint) return res.status(400).json({ error: 'No subscription provided' })
  await redis.set('subscription', JSON.stringify(sub))
  return res.status(200).json({ ok: true })
}
