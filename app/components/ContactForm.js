export function ContactForm() {
    const d = document,
        $form = d.createElement("form"),
        $styles = d.getElementById("dynamic-styles");
  
    $form.classList.add("contact-form");
  
    $styles.innerHTML = `
    .contact-form {
        --form-ok-color: #4caf50;
        --form-error-color: #f44336;
        margin-left: auto;
        margin-right: auto;
        width: 80%;
    }
  
    .contact-form > * {
        padding: 0.5rem;
        margin: 1rem auto;
        display: block;
        width: 100%;
    }
  
    .contact-form textarea {
        resize: none;
    }
  
    .contact-form legend,
    .contact-form-response {
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
    }
  
    .contact-form input,
    .contact-form textarea {
        font-size: 1rem;
        font-family: "Nunito", sans-serif;
    }
  
    .contact-form input[type="submit"] {
        width: 50%;
        font-weight: bold;
        cursor: pointer;
    }
  
    .contact-form *::placeholder {
        color: #000;
    }
  
    .contact-form [required]:valid {
        border: thin solid var(--form-ok-color);
    }
  
    .contact-form [required]:invalid {
        border: thin solid var(--form-error-color);
    }
  
    .contact-form-error {
        margin-top: -1rem;
        font-size: 80%;
        background-color: var(--form-error-color);
        color: #fff;
        transition: all 800ms ease;
    }
  
    .contact-form-error.is-active {
        display: block;
        animation: show-message 1s 1 normal 0s ease-out both;
    }
  
    .contact-form-loader {
        text-align: center;
    }
  
    .none {
        display: none;
    }
  
    @keyframes show-message {
        0% {
            visibility: hidden;
            opacity: 0;
        }
  
        100% {
            visibility: visible;
            opacity: 1;
        }
    }
    `;
  
    $form.innerHTML = `
        <legend>Envíanos tus comentarios</legend>
        <input type="text" name="name" placeholder="Escribe tu nombre"
        title="Nombre sólo acepta letras y espacios en blanco" pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\\s]+$" required>
        <input type="email" name="email" placeholder="Escribe tu email" title="Email incorrecto"
        pattern="^[a-z0-9]+(\\.[_a-z0-9]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,15})$" required>
        <input type="text" name="subject" placeholder="Asunto a tratar" title="El Asunto es requerido" required>
        <textarea name="comments" cols="50" rows="5" placeholder="Escribe tus comentarios"
        title="Tu comentario no debe exceder los 255 caracteres" data-pattern="^.{1,255}$" required></textarea>
        <input type="submit" value="Enviar">
        <div class="contact-form-loader none">
            <img src="../assets/loader.svg" alt="Cargando...">
        </div>
        <div class="contact-form-response none">
            <p>Los datos han sido enviados👍😀</p>
        </div>
    `;
  
    function validatoinsForm() {
        const $form = d.querySelector(".contact.form"),
            $inputs = d.querySelectorAll(".contact-form [required]");
  
        // Itera sobre cada campo requerido para crear un mensaje de error
        $inputs.forEach((input) => {
            const $span = d.createElement("span");
            $span.id = input.name; // Establece el ID del <span> al nombre del input
            $span.textContent = input.title; // Establece el texto del <span> al título del input
            $span.classList.add("contact-form-error", "none"); // Agrega clases para manejar el estilo
            input.insertAdjacentElement("afterend", $span); // Inserta el <span> después del input
        });
        d.addEventListener("keyup", (e) => {
            // Verifica si el elemento que desencadenó el evento es un campo requerido del formulario de contacto
            if (e.target.matches(".contact-form [required]")) {
                let $input = e.target,
                pattern = $input.pattern || $input.dataset.pattern; // Obtiene el patrón de validación
  
                // Si hay un patrón y el campo no está vacío
                if (pattern && $input.value !== "") {
                    let regex = new RegExp(pattern); // Crea una expresión regular
                    // Agrega o quita la clase 'is-active' al mensaje de error según el resultado de la validación
                    return !regex.exec($input.value) ? d.getElementById($input.name).classList.add("is-active") : d.getElementById($input.name).classList.remove("is-active");
                }
  
                // Si no hay un patrón
                if (!pattern) {
                    // Verifica si el campo está vacío y agrega o quita la clase 'is-active'
                    return $input.value === "" ? d.getElementById($input.name).classList.add("is-active") : d.getElementById($input.name).classList.remove("is-active");
                }
            }
        });
  
        d.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Enviando Formulario");
  
            const $loader = d.querySelector(".contact-form-loader"),
                $response = d.querySelector(".contact-form-response");
  
            $loader.classList.remove("none");
  
            fetch("https://formsubmit.co/ajax/andresalex983@gmail.com", {
                method: "POST",
                body: new FormData(e.target), // Crea un objeto FormData con los datos del formulario
            })
            .then((res) => (res.ok ? res.json() : Promise.reject(res)))
            .then((json) => {
                $loader.classList.add("none");
                $response.classList.remove("none");
                $response.innerHTML = `<p>${json.message}</p>`; // Muestra el mensaje de éxito
            })
            .catch((err) => {
                console.log(err);
                let message = err.statusText || "Ocurrió un error al enviar, intenta nuevamente";
                $response.innerHTML = `<p> Error ${err.status}: ${message}</p>`;
            })
            .finally(() =>
                setTimeout(() => {
                    $response.classList.add("none");
                    $response.innerHTML = "";
                }, 3000)
            );
        });
    }
  
    // Llama a la función validatoinsForm después de un retraso de 100 ms
    setTimeout(() => validatoinsForm(), 100);
  
    return $form;
  }