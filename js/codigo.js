const secretKey = 'contraseña123';

function handleFileChange() {
    const fileInput = document.getElementById('fileInput');
    const encryptBtn = document.getElementById('encryptBtn');
    const decryptBtn = document.getElementById('decryptBtn');

    if (fileInput.files.length > 0) {
        encryptBtn.disabled = false;
        decryptBtn.disabled = false;
    } else {
        encryptBtn.disabled = true;
        decryptBtn.disabled = true;
    }
}

function encryptFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (event) {
            const originalText = event.target.result;

            // Proceso de encriptación
            const encryptedText = encryptText(originalText);

            // Almacenar el texto encriptado en sessionStorage
            storeEncryptedText(encryptedText);

            // Redirigir a descargar.html después de encriptar
            window.location.href = 'descargar.html';
        };

        reader.readAsText(file);
    } else {
        alert('Selecciona un archivo antes de encriptar');
    }
}

function storeEncryptedText(encryptedText) {
    sessionStorage.setItem('encryptedText', encryptedText);
}

function encryptText(text) {
    return CryptoJS.AES.encrypt(text, secretKey).toString();
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

function decryptText(encryptedText) {
    return CryptoJS.AES.decrypt(encryptedText, secretKey).toString(CryptoJS.enc.Utf8);
}
