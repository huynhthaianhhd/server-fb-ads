const { HttpsProxyAgent } = require('https-proxy-agent')

const userAgents = [
  'Mozilla/5.0 (iPhone; CPU iPhone OS 9_8_9; like Mac OS X) AppleWebKit/537.3 (KHTML, like Gecko)  Chrome/52.0.2249.365 Mobile Safari/537.4',
  'Mozilla/5.0 (Windows NT 6.0; Win64; x64; en-US) AppleWebKit/602.29 (KHTML, like Gecko) Chrome/51.0.1303.316 Safari/533.4 Edge/12.94439',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 8_7_3; like Mac OS X) AppleWebKit/535.24 (KHTML, like Gecko)  Chrome/51.0.3968.303 Mobile Safari/600.7',
  'Mozilla/5.0 (Windows; U; Windows NT 6.3; x64; en-US) AppleWebKit/601.29 (KHTML, like Gecko) Chrome/52.0.1536.110 Safari/534',
  'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_3_4) AppleWebKit/600.19 (KHTML, like Gecko) Chrome/53.0.3585.319 Safari/601',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/602.1 (KHTML, like Gecko) Chrome/51.0.2463.274 Safari/600.5 Edge/9.59054',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 7_6_2; like Mac OS X) AppleWebKit/534.2 (KHTML, like Gecko)  Chrome/53.0.2151.308 Mobile Safari/603.8',
  'Mozilla/5.0 (Linux; Android 4.4; E:number:20-23:01 Build/24.0.A.1.34) AppleWebKit/535.16 (KHTML, like Gecko)  Chrome/49.0.2392.252 Mobile Safari/600.1',
  'Mozilla/5.0 (Linux; U; Linux x86_64; en-US) AppleWebKit/600.11 (KHTML, like Gecko) Chrome/51.0.2358.129 Safari/533',
  'Mozilla/5.0 (Windows; U; Windows NT 10.4; Win64; x64) AppleWebKit/537.43 (KHTML, like Gecko) Chrome/52.0.3902.109 Safari/536.0 Edge/17.34438',
  'Mozilla/5.0 (Android; Android 7.1; LG-H910 Build/NRD90C) AppleWebKit/535.27 (KHTML, like Gecko)  Chrome/51.0.1566.369 Mobile Safari/535.6'
]

const getHttpsAgent = proxyString => {
  const [username, password, host, port] = proxyString.split(':')

  const proxyUrl = `http://${username}:${password}@${host}:${port}`;

  const agent = new HttpsProxyAgent(proxyUrl)

  return agent
}

const getUserAgent = () => userAgents[Math.floor(Math.random() * 10) + 1]

const getHeaders = cookie => {
  const userAgent = userAgents[Math.floor(Math.random() * 10) + 1]
  const headers = {
    host: 'business.facebook.com',
    'cache-control': 'max-age=0',
    'user-agent': userAgent,
    accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'content-type': 'text/html; charset=utf-8',
    'accept-encoding': 'gzip, deflate',
    'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
    cookie: cookie
  }
  return headers
}

const getHeadersForJson = cookie => {
  const userAgent = userAgents[Math.floor(Math.random() * 10) + 1]
  const headers = {
    accept: '*/*',
    'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
    'cache-control': 'no-cache',
    'content-type': 'application/x-www-form-urlencoded',
    cookie: cookie,
    origin: 'https://business.facebook.com',
    pragma: 'no-cache',
    referer: 'https://business.facebook.com/',
    'user-agent': userAgent
  }
  return headers
}

module.exports = { getHttpsAgent, getHeaders, getUserAgent, getHeadersForJson }
