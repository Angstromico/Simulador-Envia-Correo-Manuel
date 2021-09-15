//Variables
const enviar = document.getElementById('enviar')
//Variables para Campos
const email = document.getElementById('email')
const asunto = document.getElementById('asunto')
const mensaje = document.getElementById('mensaje')
const form = document.getElementById('enviar-mail')
const reset = document.getElementById('resetBtn')
const inputs = [email, asunto, mensaje]
const centro = document.querySelector('.centro')
const typing = document.getElementById('demo')

//EventListeners
eventListeners()
function eventListeners() {
  //Cuando Inicia la App
  document.addEventListener('DOMContentLoaded', inicioApp)
  //Campos del Formulario
  email.addEventListener('blur', validarForm)
  asunto.addEventListener('blur', validarForm)
  mensaje.addEventListener('blur', validarForm)
  //Reiniciar Formulario
  reset.addEventListener('click', (e) => {
    e.preventDefault()
    resetInputsBorders()
    form.reset()
  })
}
//Funciones
function inicioApp() {
  console.log('comienzo')
  enviar.disabled = true
  enviar.classList.add('cursor-not-allowed', 'opacity-50')
}
//Validar Formulario
function validarForm(e) {
  const fallo = document.querySelector('p.error')
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (e.target.value.length > 0) {
    e.target.style.borderColor = 'green'
    if (fallo) {
      fallo.remove()
    }
  } else {
    e.target.style.borderColor = 'red'
    mostrarError('Todos Los Campos son obligatorios')
  }
  if (e.target.type === 'email') {
    if (!re.test(e.target.value)) {
      mostrarError('Lo que escribio no es un Email valido')
      e.target.style.borderColor = 'red'
    } else {
      e.target.style.borderColor = 'green'
      if (fallo) {
        fallo.remove()
      }
    }
  }
  if (
    email.value !== '' &&
    asunto.value !== '' &&
    mensaje.value !== '' &&
    re.test(email.value)
  ) {
    enviar.disabled = false
    enviar.classList.remove('cursor-not-allowed', 'opacity-50')
  }
  //Enviar Email
  form.addEventListener('submit', enviarMail)
}
//Mostrar Error
function mostrarError(texto) {
  const avisoError = document.createElement('P')
  avisoError.textContent = texto
  avisoError.classList.add(
    'border',
    'border-red-500',
    'background-red-100',
    'text-red-500',
    'p-3',
    'mt-5',
    'text-center',
    'error'
  )
  const fallos = document.querySelectorAll('.error')
  if (fallos.length === 0) {
    form.append(avisoError)
  }
  //Desvanecer mensaje de error
  inOut(avisoError)
}
function enviarMail(e) {
  e.preventDefault()
  //Mostrar Spinner
  const spinner = document.getElementById('spinner')
  spinner.style.display = 'block'
  const mensaje = document.createElement('P')
  mensaje.style.opacity = 0
  mensaje.textContent = 'Mensaje Enviado Correctamente'
  mensaje.classList.add(
    'text-center',
    'my-10',
    'p-4',
    'bg-blue-500',
    'text-white',
    'font-bold',
    'uppercase'
  )
  setTimeout(() => {
    spinner.style.display = 'none'
    //mensaje de envio
    form.insertBefore(mensaje, spinner)
    inOut(mensaje)
    setTimeout(() => {
      resetForm()
    }, 5000)
  }, 4000)
}
//Reset al Form
function resetForm() {
  form.reset()
  resetInputsBorders()
  inicioApp()
}
//reset inputs borders
function resetInputsBorders() {
  inputs.forEach((e) => (e.style.borderColor = 'black'))
}
//Fade In and Out
function fade(element) {
  setTimeout(() => {
    let op = 1 // initial opacity
    let timer = setInterval(function () {
      if (op <= 0.1) {
        clearInterval(timer)
        element.style.display = 'none'
        element.remove()
      }
      element.style.opacity = op
      element.style.filter = `alpha(opacity=' + op * 100 + ')`
      op -= op * 0.1
    }, 425)
  }, 3000)
}
function unfade(element) {
  let op = 0.1 // initial opacity
  element.style.display = 'block'
  let timer = setInterval(function () {
    if (op >= 1) {
      clearInterval(timer)
    }
    element.style.opacity = op
    element.style.filter = `alpha(opacity=' + op * 100 + ')`
    op += op * 0.1
  }, 100)
}
//Aparecer y desaparecer elementos
function inOut(element) {
  unfade(element)
  fade(element)
}
//Mensaje de Bienvenida
const parrafoBienvenida = document.createElement('P')
parrafoBienvenida.textContent = 'Binvenid@'
parrafoBienvenida.classList.add('bienvenida')
console.log(centro)
setTimeout(() => {
  centro.append(parrafoBienvenida)
  setTimeout(() => {
    parrafoBienvenida.remove()
  }, 5000)
}, 20500)
//Sección autotyping
const hTyping = document.createElement('H1')
hTyping.classList.add('text')
//La Función para el Autotyping
let i = 0
let txt = 'Esta es mi Simulacion de Envio de Correo en JavaScript'
let speed = 60

function typeWriter() {
  if (i < txt.length) {
    typing.innerHTML += txt.charAt(i)
    i++
    setTimeout(typeWriter, speed)
  }
}
setTimeout(() => {
  typeWriter()
  setTimeout(() => {
    fade(typing)
  }, 4000)
}, 26000)
setTimeout(() => {
  centro.remove()
}, 36000)
