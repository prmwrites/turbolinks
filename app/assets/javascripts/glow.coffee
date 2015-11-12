$(document).on 'ready page:load', ->
canvas = document.getElementById('canvas')
context = canvas.getContext('2d')
magenta = '#FF5157'
yellow = '#FFC159'
blue = '#00BADD'
height = self.innerHeight
width = self.innerWidth
canvas.width = width
canvas.height = height
totalOffset = 0

Number::mod = (n) ->
  (this % n + n) % n

firstColorOffset = 0
secondColorOffset = 0.5
thirdColorOffset = 1
fourthColorOffset = 1.5
firstColor = magenta
secondColor = yellow
thirdColor = blue
fourthColor = firstColor

drawGradient = (offset) ->
  totalOffset += offset
  context.clearRect 0, 0, width, height
  gradient = context.createLinearGradient(0 - totalOffset, 0, width * 2 - totalOffset, 0)
  if firstColorOffset <= 1
    gradient.addColorStop firstColorOffset, firstColor
  if secondColorOffset <= 1
    gradient.addColorStop secondColorOffset, secondColor
  if thirdColorOffset <= 1
    gradient.addColorStop thirdColorOffset, thirdColor
  if fourthColorOffset <= 1
    gradient.addColorStop fourthColorOffset, fourthColor
  if totalOffset > width
    firstColorOffset = (firstColorOffset - 0.5).mod(1.5)
    secondColorOffset = (secondColorOffset - 0.5).mod(1.5)
    thirdColorOffset = (thirdColorOffset - 0.5).mod(1.5)
    fourthColorOffset = (fourthColorOffset - 0.5).mod(1.5)
    totalOffset = 0
  context.fillStyle = gradient
  context.fillRect 0, 0, width, height
  return

window.requestAnimationFrame = window.requestAnimationFrame or window.mozRequestAnimationFrame or window.webkitRequestAnimationFrame or window.msRequestAnimationFrame
start = null

animate = (timestamp) ->
  delta = undefined
  if start == null
    start = timestamp
  delta = timestamp - start
  drawGradient delta / 5
  if delta < 2000
    requestAnimationFrame animate
  start = timestamp
  return

requestAnimationFrame animate

window.onresize = ->
  width = self.innerWidth
  height = self.innerHeight
  canvas.width = width
  canvas.height = height
  return

window.onfocus = ->
  requestAnimationFrame animate
  return
