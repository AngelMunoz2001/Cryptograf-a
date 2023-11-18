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
    const outputTextArea = document.getElementById('output');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (event) {
            const originalText = event.target.result;
            const encryptedText = CryptoJS.AES.encrypt(originalText, secretKey).toString();

            const blob = new Blob([encryptedText], { type: 'application/octet-stream' }); // Tipo MIME adecuado
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = 'archivo_encriptado.txt'; // Extensión adecuada

            document.body.appendChild(downloadLink);
            downloadLink.click();

            document.body.removeChild(downloadLink);

            outputTextArea.value = encryptedText;
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
            const secretKey = 'contraseña123';

            try {
                const decryptedText = CryptoJS.AES.decrypt(encryptedText, secretKey).toString(CryptoJS.enc.Utf8);
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
