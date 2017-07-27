// Load the passed URL into an iframe.
// This gets around restrictive CSP headers.
let url    = decodeURIComponent(window.location.search.replace('?url=', ''))
let iframe = document.createElement('iframe')
iframe.src = url

const box = document.getElementById('github-chat-box')
box.appendChild(iframe)