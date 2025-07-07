function calcularNewton() {
  const masa = parseFloat(document.getElementById("masa").value);
  const fuerza = parseFloat(document.getElementById("fuerza").value);
  const angulo = parseFloat(document.getElementById("angulo").value);
  const mu = parseFloat(document.getElementById("friccion").value);
  const direccion = document.getElementById("direccion").value;

  if ([masa, fuerza, angulo, mu].some(isNaN)) {
    alert("Por favor, completá todos los campos con valores válidos.");
    return;
  }

  const rad = (angulo * Math.PI) / 180;
  const g = 9.81;
  const peso = masa * g;

  let normal, fParalela = 0, friccion, fNeta, aceleracion;

  if (direccion === "horizontal" || angulo === 0) {
    normal = peso;
  } else {
    normal = peso * Math.cos(rad);
    fParalela = peso * Math.sin(rad);
  }

  friccion = mu * normal;
  fNeta = fuerza - fParalela - friccion;
  aceleracion = fNeta / masa;

  const correcta = aceleracion.toFixed(2);
  const op2 = (aceleracion * 1.25).toFixed(2);
  const op3 = (aceleracion * 0.75).toFixed(2);
  const opciones = [correcta, op2, op3].sort(() => Math.random() - 0.5);

  const opcionesHTML = opciones.map(op => 
    '<label><input type="radio" name="respuesta" value="' + op + 
    '" onchange="verificarRespuesta(\'' + correcta + '\', this.value, ' + masa + ', ' + peso + ', ' + fParalela + ', ' + normal + ', ' + friccion + ', ' + fNeta + ', ' + aceleracion + ')">' + 
    op + ' m/s²</label><br>'
  ).join("");

  document.getElementById("resultado").innerHTML = "<h3>¿Cuál es la aceleración del cuerpo?</h3>" + opcionesHTML;
  document.getElementById("explicacion").innerHTML = "";
}

function verificarRespuesta(correcta, seleccionada, masa, peso, fParalela, normal, friccion, fNeta, aceleracion) {
  const esCorrecta = seleccionada === correcta;
  let mensaje = esCorrecta ? "✅ ¡Correcto!" : "❌ Incorrecto. La respuesta correcta era: " + correcta + " m/s²";

  let explicacionHTML = "<h3>Explicación paso a paso</h3>";
  explicacionHTML += "<p><strong>1. Peso:</strong> P = m × g = " + masa + " × 9.81 = " + peso.toFixed(2) + " N</p>";
  if (fParalela > 0) {
    explicacionHTML += "<p><strong>2. Componente paralela:</strong> P × sen(θ) = " + fParalela.toFixed(2) + " N</p>";
  }
  explicacionHTML += "<p><strong>3. Fuerza normal:</strong> N = P × cos(θ) = " + normal.toFixed(2) + " N</p>";
  explicacionHTML += "<p><strong>4. Fricción:</strong> f = μ × N = " + friccion.toFixed(2) + " N</p>";
  explicacionHTML += "<p><strong>5. Fuerza neta:</strong> F_aplicada - f_paralela - fricción = " + fNeta.toFixed(2) + " N</p>";
  explicacionHTML += "<p><strong>6. Aceleración:</strong> a = F_neta / m = " + fNeta.toFixed(2) + " / " + masa + " = " + aceleracion.toFixed(2) + " m/s²</p>";
  explicacionHTML += "<hr><p>" + mensaje + "</p>";

  document.getElementById("explicacion").innerHTML = explicacionHTML;
}

function reiniciarFormulario() {
  document.getElementById("formulario").reset();
  document.getElementById("resultado").innerHTML = "";
  document.getElementById("explicacion").innerHTML = "";
}
