const secretKey = 'contraseña123';

function handleFileChange() {
    // variables para guardar las etiquetas de html
    const fileInput = document.getElementById('fileInput');
    const encryptBtn = document.getElementById('encryptBtn');
    const decryptBtn = document.getElementById('decryptBtn');
    const uploadedImage = document.getElementById('uploadedImage');

    // Hablitar los botones
    if (fileInput.files.length > 0) {
        encryptBtn.disabled = false;
        decryptBtn.disabled = false;

        // Cambiar la imagen cuando se carga un archivo
        const file = fileInput.files[0];
        if (file.type.includes('image')) {
            const reader = new FileReader();
            reader.onload = function(event) {
                uploadedImage.src = event.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            uploadedImage.src = '../img/enviar.png';
        }
    } else {
        encryptBtn.disabled = true;
        decryptBtn.disabled = true;
        uploadedImage.src = '../img/agregar.png'; // Resetear la imagen predeterminada
    }
}

function encryptFile() {
    const fileInput = document.getElementById('fileInput');
    const output2 = document.getElementById('output2');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const originalText = event.target.result;
            const encryptedText = encryptText(originalText);
            

            // Almacenar el texto encriptado en sessionStorage
              sessionStorage.setItem('encryptedText', encryptedText);
            // Redirigir a descargar.html después de encriptar
            window.location.href = 'descargar.html';
        };

        reader.readAsText(file);
    } else {
        alert('Selecciona un archivo antes de encriptar');
    }
}
function decryptFile() {
    const fileInput = document.getElementById('fileInput');
    const outputTextArea = document.getElementById('output');
    const file = fileInput.files[0];
    

    if (file) {
        const reader = new FileReader();

        reader.onload = function (event) {
            const encryptedText = event.target.result;

            try {
                const decryptedText = decryptText(encryptedText);
                outputTextArea.value = decryptedText;
            } catch (error) {
                alert('Error al desencriptar el archivo. Asegúrate de usar la clave correcta.');
                console.error(error);
            }
        };

        reader.readAsText(file);
    } else {
        alert('Selecciona un archivo antes de desencriptar');
    }
}

window.onload = function() {
            const contenidoEncriptado = sessionStorage.getItem('encryptedText');
            const decryptedTextArea = document.getElementById('decryptedText');
            
            if (contenidoEncriptado && decryptedTextArea) {
                try {
                    const decryptedText = decryptText(contenidoEncriptado);
                    decryptedTextArea.value = decryptedText;
                } catch (error) {
                    alert('Error al desencriptar el archivo. Asegúrate de usar la clave correcta.');
                    console.error(error);
                }
            } else {
               
            }
        };

function decryptText(encryptedText) {
            return CryptoJS.AES.decrypt(encryptedText, secretKey).toString(CryptoJS.enc.Utf8);
        }

function encryptText(originalText) {
            return CryptoJS.AES.encrypt(originalText, secretKey).toString();
}

function descargarArchivo() {
    const contenidoEncriptado = sessionStorage.getItem('encryptedText');

    if (contenidoEncriptado) {
        const blob = new Blob([contenidoEncriptado], { type: 'application/octet-stream' });
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'archivo_encriptado.txt';

        document.body.appendChild(downloadLink);
        downloadLink.click();

        document.body.removeChild(downloadLink);
    } else {
        alert('No se encontró el archivo encriptado para descargar.');
    }
}

function storeEncryptedText(encryptedText) {
    sessionStorage.setItem('encryptedText', encryptedText);
}

function volverIndex() {
            window.location.href = 'index.html';
        }