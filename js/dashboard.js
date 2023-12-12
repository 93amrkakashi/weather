const cloudName = 'dplzhsjcg';
  const apiKey = '647475915879921';

  function uploadImage() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_upload_preset');
  
    fetch(`https://api.cloudinary.com/v1_1/dplzhsjcg/image/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Basic ${btoa('647475915879921')}`,
      },
      mode: 'cors', // أضف هذا السطر
    })
      .then(response => response.json())
      .then(data => {
        console.log('Upload successful:', data);
        // يمكنك إجراء أي إجراءات إضافية هنا بناءً على احتياجاتك
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
  }
  