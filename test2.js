addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const clientIP = request.headers.get('CF-Connecting-IP')

  const url = new URL(request.url)
  const token = url.searchParams.get('token')

  if (token === "123") {
    await test.put('ip', clientIP)
    return new Response(`Client IP: ${clientIP} Token: ${token}`)
  } else {
    let ip = await test.get('ip')
    let port = 5000
    const html = `<html><body><a href="http://${ip}:${port}">${ip}:${port}</a></body></html>`
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html'
      }
    })
  }
}
