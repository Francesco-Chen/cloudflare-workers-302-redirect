addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {

  const url = new URL(request.url)
  const token = url.searchParams.get('token')
  const port = (url.searchParams.get('port') || await dnsKV.get('port')) || '8080'
  const clientIP = url.searchParams.get('ip') || request.headers.get('CF-Connecting-IP') // Get IP from query param or header

  if (token === await dnsKV.get('token')) {
    await dnsKV.put('ip', clientIP)
    await dnsKV.put('port', port);
    return new Response(`Client IP: ${clientIP} Token: ${token} Port: ${port}`)
  } else {
    let ip = await dnsKV.get('ip')
    let port = await dnsKV.get('port')
    //return new Response(`${ip}`)
    return Response.redirect(`http://${ip}:${port}`, 302)
  }
}
