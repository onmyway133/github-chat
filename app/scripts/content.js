'use strict';

const containerId = 'github-chat-container'
const boxId = 'github-chat-box'

document.addEventListener('DOMContentLoaded', () => {
  createOverlay()
})

function createOverlay() {
  const container = createContainer()
  const top = createTop()
  const box = createBox()

  container.appendChild(top)
  container.appendChild(box)
  document.body.appendChild(container)

  const iframe = createiFrame()
  box.appendChild(iframe)
}

function createiFrame() {
  let baseUrl = chrome.runtime.getURL('iframe.html')
  // baseUrl = encodeURIComponent(baseUrl)
  let iframe = document.createElement('iframe')
  iframe.id = 'github-chat-box-iframe-wrapper'
  
  iframe.style.width = '100%'
  iframe.style.height = '100%'

  const link = 'https://embed.tlk.io/' + makeChannelName() + '/' + '?nickname=' + getCurrentUser()
  let url = encodeURIComponent(link)
  iframe.src = `${baseUrl}?url=${url}`

  return iframe
}

function createContainer() {
  const div = document.createElement('div')
  div.id = containerId

  div.style.position = 'fixed'
  div.style.right = '50px'
  div.style.bottom = '10px'
  div.style.width = '300px'
  div.style.borderStyle = 'solid'
  div.style.borderColor = 'orange'
  div.style.borderWidth = '2px'

  return div
}

function createTop() {
  const div = document.createElement('div')
  div.id = 'github-chat-top'

  div.style.background = '#4080FF'
  div.style.height = '30px'

  const button = createButton()
  div.appendChild(button)
  
  return div
}

function createBox() {
  const div = document.createElement('div')
  div.id = boxId

  div.style.height = '400px'
  div.style.background = '#E9EBEE'
  div.style.display = 'none'

  div.setAttribute('data-channel', makeChannelName())
  div.setAttribute('data-nickname', getCurrentUser())
  
  return div
}

function createButton() {
  const button = document.createElement('button')
  button.innerText = '—'
  
  button.style.padding = '0px'
  button.style.width = '20px'
  button.style.height = '20px'
  button.style.top = '5px'
  button.style.left = '5px'
  button.style.position = 'relative'
  button.style.background = '#FEC242'
  button.style.zIndex = 99

  button.onclick = () => {
    const box = document.getElementById(boxId)

    if (box.style.display == 'none') {
      box.style.display = 'block'
    } else {
      box.style.display = 'none'
    }
  }

  return button
}

function makeId() {
  var text = ""
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  for (var i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
    
  return text
}

function getCurrentUser() {
  const metas = document.getElementsByTagName('meta')
   for (var i=0; i<metas.length; i++) { 
      if (metas[i].getAttribute('name') == 'user-login') { 
         return metas[i].getAttribute('content')
      } 
   } 

   return 'anonymous-' + makeId()
}

function getPath() {
  const parts = location.pathname.split('/')
  if (parts.length > 1 && parts[1].length > 0) {
    return parts[1]
  } else {
    return null
  }
}

function makeChannelName() {
  const path = getPath()

  return 'github' + (path != null ? ('-' + path) : '')
}