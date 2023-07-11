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
    //return new Response(`get ip ${ip}`)
    return Response.redirect(`http://${ip}:5000`, 302)
  }
}
