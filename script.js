document.getElementById('qrInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function() {
    const img = new Image();
    img.src = reader.result;

    img.onload = function() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height);

      if (code) {
        document.getElementById('result').innerHTML =
          `✅ QR Code Detected: <a href="${code.data}" target="_blank">${code.data}</a>`;
        // Auto navigate
        window.location.href = code.data;
      } else {
        document.getElementById('result').textContent = "❌ Could not read QR code.";
      }
    };
  };
  reader.readAsDataURL(file);
});
