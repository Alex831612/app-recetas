// Exporta una función asíncrona llamada ajax que acepta un objeto props como argumento
export async function ajax(props) {
    // Desestructura las propiedades url y cbSuccess del objeto props
    let { url, cbSuccess } = props;
  
    // Realiza una solicitud fetch a la URL proporcionada
    await fetch(url)
        // Si la respuesta es exitosa (res.ok es true), convierte la respuesta a JSON; de lo contrario, rechaza la promesa
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((json) => cbSuccess(json))
        .catch((err) => {
             // Crea un mensaje de error utilizando el texto del estado de la respuesta, o un mensaje predeterminado si no hay
            let message = err.statusText || "Ocurrió un error al acceder a la API";
  
            // Muestra el mensaje de error en el elemento con ID 'main'
            document.getElementById("main").innerHTML = `
                <div class="error">
                    <p> Error ${err.status}: ${message}</p>
                </div>
            `;
            // Oculta el elemento con clase 'loader'
            document.querySelector(".loader").style.display = "none";
            // Imprime el error en la consola para depuración
            console.log(err);
        });
}