// @see https://developer.mozilla.org/en-US/docs/Web/Security/CSP
const cspHeaders = [
  'content-security-policy',
  'x-webkit-csp'
]

// @see https://developer.mozilla.org/en-US/docs/Web/Security/CSP/CSP_policy_directives
const cspSources = [
  'connect-src',
  'default-src',
  'font-src',
  'frame-src',
  'img-src',
  'media-src',
  'object-src',
  'script-src',
  'style-src'
]

function isCspHeader(headerName) {
  return cspHeaders.includes(headerName.toLowerCase())
}

function modifyCspHeaders(details) {
  console.log(details)
  details.responseHeaders.forEach((responseHeader) => {
    if (!isCspHeader(responseHeader.name)) {
      return
    }

    let csp = responseHeader.value

    // Add example.com to the sources list.
    // @see https://work.planbox.com/blog/development/coding/bypassing-githubs-content-security-policy-chrome-extension.html
    cspSources.forEach((cspSource) => {
      csp = csp.replace(cspSource, cspSource + ' https://*.tlk.io')
    })

    responseHeader.value = csp
  })

  return { 
    responseHeaders: details.responseHeaders 
  }
}

chrome.webRequest.onHeadersReceived.addListener(
  modifyCspHeaders,
  {
    urls : [ 'https://github.com/*' ],
    types: [ 'main_frame' ]
  },
  [ 'blocking', 'responseHeaders' ]
)

console.log('yeah')

chrome.webRequest.onHeadersReceived.addListener((details) => {
  console.log(details)
})