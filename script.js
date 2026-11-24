const preguntas = [
  {
    pregunta: "¿Cuál de estas razas bovinas es conocida por su joroba y adaptación al clima cálido?",
    opciones: ["Holstein", "Brahman", "Normando", "Angus"],
    correcta: 1,
    explicacion: "El Brahman es una raza cebuina reconocida por su adaptación a condiciones tropicales."
  },
  {
    pregunta: "¿Cuál es el principal alimento que consume el ganado bovino en pastoreo?",
    opciones: ["Carne", "Pasto y forrajes", "Arroz cocido", "Frutas exclusivamente"],
    correcta: 1,
    explicacion: "Los bovinos son herbívoros y aprovechan pastos y otros forrajes."
  },
  {
    pregunta: "¿Cómo se llama el proceso en el que la vaca vuelve a masticar el alimento regurgitado?",
    opciones: ["Fermentación", "Rumiar", "Destetar", "Ordeñar"],
    correcta: 1,
    explicacion: "La rumia permite volver a masticar el alimento para facilitar su digestión."
  },
  {
    pregunta: "¿Cuál es una raza bovina comúnmente asociada con alta producción de leche?",
    opciones: ["Holstein", "Brahman", "Nelore", "Limousin"],
    correcta: 0,
    explicacion: "La Holstein es ampliamente reconocida por su aptitud lechera."
  },
  {
    pregunta: "¿Qué órgano del bovino es fundamental para la fermentación de los alimentos?",
    opciones: ["Pulmón", "Rumen", "Riñón", " corazón"],
    correcta: 1,
    explicacion: "El rumen es el compartimento principal donde ocurre la fermentación microbiana."
  },
  {
    pregunta: "¿Qué práctica ayuda a prevenir enfermedades en el ganado?",
    opciones: ["No revisar nunca los animales", "Plan sanitario y vacunación", "Cambiar agua por días", "Evitar limpieza"],
    correcta: 1,
    explicacion: "Un plan sanitario con vacunación, controles y manejo preventivo reduce riesgos."
  },
  {
    pregunta: "¿Cómo se llama la separación de un ternero de su madre para que deje de mamar?",
    opciones: ["Rumia", "Celo", "Destete", "Parto"],
    correcta: 2,
    explicacion: "El destete es el proceso de separar al ternero de la lactancia materna."
  },
  {
    pregunta: "¿Qué raza es conocida por su doble propósito (carne y leche) y por su presencia en zonas de clima frío?",
    opciones: ["Normando", "Brahman", "Gyr", "Nelore"],
    correcta: 0,
    explicacion: "La raza Normando es reconocida por su doble propósito y se adapta a zonas templadas y frías."
  },
  {
    pregunta: "¿Qué se debe proporcionar siempre al ganado para su bienestar?",
    opciones: ["Agua limpia", "Solo sal", "Nada durante el día", "Alimento en mal estado"],
    correcta: 0,
    explicacion: "El acceso a agua limpia y suficiente es esencial para la salud y el bienestar animal."
  },
  {
    pregunta: "¿Qué significa identificar individualmente un bovino?",
    opciones: ["Poner todos los animales en un mismo corral", "Reconocer y registrar cada animal con un código o identificación", "Cambiar el color del pelaje", "No llevar registros"],
    correcta: 1,
    explicacion: "La identificación individual ayuda a llevar registros de manejo, salud, reproducción y producción."
  }
];

const pantallaInicio = document.getElementById("pantalla-inicio");
const pantallaQuiz = document.getElementById("pantalla-quiz");
const pantallaFinal = document.getElementById("pantalla-final");
const botonIniciar = document.getElementById("boton-iniciar");
const botonSiguiente = document.getElementById("boton-siguiente");
const botonReiniciar = document.getElementById("boton-reiniciar");
const preguntaElemento = document.getElementById("pregunta");
const opcionesElemento = document.getElementById("opciones");
const retroalimentacion = document.getElementById("retroalimentacion");
const puntajeElemento = document.getElementById("puntaje");
const progresoElemento = document.getElementById("progreso");
const progresoVisual = document.getElementById("progreso-visual");
const tiempoElemento = document.getElementById("tiempo");

let indicePregunta = 0;
let puntaje = 0;
let tiempo = 60;
let temporizador = null;
let respuestasUsuario = [];

function iniciarJuego() {
  indicePregunta = 0;
  puntaje = 0;
  respuestasUsuario = [];
  pantallaInicio.classList.add("oculto");
  pantallaFinal.classList.add("oculto");
  pantallaQuiz.classList.remove("oculto");
  puntajeElemento.textContent = puntaje;
  mostrarPregunta();
}

function mostrarPregunta() {
  detenerTemporizador();
  tiempo = 60;
  tiempoElemento.textContent = tiempo;
  const actual = preguntas[indicePregunta];
  preguntaElemento.textContent = actual.pregunta;
  progresoElemento.textContent = `Pregunta ${indicePregunta + 1} de ${preguntas.length}`;
  progresoVisual.style.width = `${(indicePregunta / preguntas.length) * 100}%`;
  opcionesElemento.innerHTML = "";
  retroalimentacion.textContent = "";
  retroalimentacion.className = "retroalimentacion";
  botonSiguiente.classList.add("oculto");

  actual.opciones.forEach((opcion, indice) => {
    const boton = document.createElement("button");
    boton.className = "opcion";
    boton.textContent = opcion;
    boton.addEventListener("click", () => seleccionarRespuesta(indice));
    opcionesElemento.appendChild(boton);
  });
  iniciarTemporizador();
}

function seleccionarRespuesta(indiceSeleccionado) {
  detenerTemporizador();
  const actual = preguntas[indicePregunta];
  const botones = [...opcionesElemento.querySelectorAll(".opcion")];
  botones.forEach((boton, indice) => {
    boton.disabled = true;
    if (indice === actual.correcta) boton.classList.add("correcta");
    if (indice === indiceSeleccionado && indice !== actual.correcta) boton.classList.add("incorrecta");
  });

  const acertado = indiceSeleccionado === actual.correcta;
  if (acertado) {
    puntaje += 1;
    retroalimentacion.textContent = "¡Correcto! " + actual.explicacion;
    retroalimentacion.classList.add("correcto");
  } else {
    retroalimentacion.textContent = "Incorrecto. " + actual.explicacion;
    retroalimentacion.classList.add("error");
  }
  puntajeElemento.textContent = puntaje;
  respuestasUsuario.push({seleccion: indiceSeleccionado, acertado, tiempoAgotado: false});
  botonSiguiente.textContent = indicePregunta === preguntas.length - 1 ? "Ver resultados" : "Siguiente pregunta";
  botonSiguiente.classList.remove("oculto");
}

function tiempoAgotado() {
  detenerTemporizador();
  const actual = preguntas[indicePregunta];
  const botones = [...opcionesElemento.querySelectorAll(".opcion")];
  botones.forEach((boton, indice) => {
    boton.disabled = true;
    if (indice === actual.correcta) boton.classList.add("correcta");
  });
  puntaje -= 1;
  puntajeElemento.textContent = puntaje;
  retroalimentacion.textContent = `¡Se acabó el tiempo! Se resta 1 punto. ${actual.explicacion}`;
  retroalimentacion.classList.add("tiempo");
  respuestasUsuario.push({seleccion: null, acertado: false, tiempoAgotado: true});
  botonSiguiente.textContent = indicePregunta === preguntas.length - 1 ? "Ver resultados" : "Siguiente pregunta";
  botonSiguiente.classList.remove("oculto");
}

function iniciarTemporizador() {
  temporizador = setInterval(() => {
    tiempo -= 1;
    tiempoElemento.textContent = tiempo;
    if (tiempo <= 0) tiempoAgotado();
  }, 1000);
}

function detenerTemporizador() {
  if (temporizador) clearInterval(temporizador);
  temporizador = null;
}

function siguientePregunta() {
  indicePregunta += 1;
  if (indicePregunta < preguntas.length) {
    mostrarPregunta();
  } else {
    mostrarResultados();
  }
}

function mostrarResultados() {
  detenerTemporizador();
  pantallaQuiz.classList.add("oculto");
  pantallaFinal.classList.remove("oculto");
  progresoVisual.style.width = "100%";
  const correctas = respuestasUsuario.filter(respuesta => respuesta.acertado).length;
  document.getElementById("resumen-puntaje").textContent =
    `Tu puntaje final: ${puntaje} puntos · ${correctas} respuestas correctas de ${preguntas.length}`;

  const lista = document.getElementById("lista-resultados");
  lista.innerHTML = "";
  preguntas.forEach((pregunta, indice) => {
    const respuesta = respuestasUsuario[indice];
    const tarjeta = document.createElement("article");
    tarjeta.className = `resultado ${respuesta.acertado ? "acierto" : "fallo"}`;
    const titulo = document.createElement("h3");
    titulo.textContent = `${indice + 1}. ${pregunta.pregunta}`;
    const detalle = document.createElement("p");
    if (respuesta.tiempoAgotado) {
      detalle.textContent = "Tu respuesta: Sin responder (tiempo agotado)";
    } else {
      detalle.textContent = `Tu respuesta: ${pregunta.opciones[respuesta.seleccion]}`;
    }
    const correcta = document.createElement("p");
    correcta.textContent = `Respuesta correcta: ${pregunta.opciones[pregunta.correcta]}`;
    const explicacion = document.createElement("p");
    explicacion.textContent = pregunta.explicacion;
    tarjeta.append(titulo, detalle, correcta, explicacion);
    lista.appendChild(tarjeta);
  });
}

botonIniciar.addEventListener("click", iniciarJuego);
botonSiguiente.addEventListener("click", siguientePregunta);
botonReiniciar.addEventListener("click", () => {
  pantallaFinal.classList.add("oculto");
  pantallaInicio.classList.remove("oculto");
});
