import React from 'react';

export const About = () => {
  return (
    <div class="info">
      <h2>Crea tus propias imágenes</h2>
      <p>Usas tus movimientos para crear imágenes abstractas.</p>
      <p>
        La idea es simple, tu posición representa una capa de la imagen. Las
        capas cambiarán a medida que te acerques lentamente a tu pantalla.
      </p>
      <p></p>
      <h2>¿Cómo funciona?</h2>
      <p>
        Aléjate de tu pantalla por 2 metros o hasta que veas el mensaje: "Elige
        el color de fondo". Podrás cambiar el color, subiendo o bajando tu
        brazos y caminando de un lado a otro horizontalmente. Para fijar el
        color, acércate lentamente hasta que el mensaje cambie a "Gira tus
        brazos".
      </p>
      <p>
        {' '}
        Desde este punto en adelante, la cámara captará tus movimientos de
        cabeza, hombros, manos, codos y cadera para generar nuevas figuras y
        asociarles colores.
      </p>
      <p>
        Al llegar a la última capa, con el mensaje: "Dibuja con tu nariz",
        podrás descargar la imagen creada. En la sección de Galería, podrás ver
        imágenes de otros usuarios y subir tus propias creaciones.
      </p>
      <p>
        No olvides contarnos tu experiencia, por medio de una encuesta final.
        ¡Agradecemos tu aporte!
      </p>
      <h4>¡Disfrútalo!</h4>
    </div>
  );
};
