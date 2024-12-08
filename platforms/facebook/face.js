document.getElementById('downloadForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const url = document.getElementById('facebookUrl').value;

    console.log('Form submitted with URL:', url);  // Debugging log

    // Show loading bar
    document.getElementById('loadingBar').classList.remove('hidden');
    document.getElementById('loadingMessage').innerText = 'Fetching data...';

    try {
        const response = await fetch(`https://api.zpi.my.id/v1/download/facebook?url=${encodeURIComponent(url)}`);
        
        // Log response for debugging
        console.log('API Response:', response);

        const data = await response.json();
        console.log('API Data:', data);  // Log the API response data

        if (data.status === 200) {
            document.getElementById('loadingBar').classList.add('hidden');
            document.getElementById('result').classList.remove('hidden');

            const { title, media, thumbnail } = data.data;
            document.getElementById('videoCaption').innerText = title;

            // Set thumbnail and author data
            document.getElementById('authorAvatar').src = thumbnail;
            document.getElementById('authorName').innerText = title;
            document.getElementById('authorUsername').innerText = `@${data.data.url.split('/')[3]}`;

            // Handle media preview (video or image)
            const previewElement = document.getElementById('mediaPreview');
            const downloadLink = document.getElementById('downloadMedia');
            
            previewElement.innerHTML = ''; // Clear any previous content

            if (media) {
                if (media.quality_hd) {
                    const videoElement = document.createElement('video');
                    videoElement.src = media.quality_hd;
                    videoElement.controls = true;
                    videoElement.classList.add('w-full', 'rounded-lg');
                    previewElement.appendChild(videoElement);
                    downloadLink.href = media.quality_hd;
                } else {
                    const imgElement = document.createElement('img');
                    imgElement.src = thumbnail;
                    imgElement.alt = "Thumbnail Image";
                    imgElement.classList.add('w-full', 'rounded-lg');
                    previewElement.appendChild(imgElement);
                    downloadLink.href = thumbnail;
                }
            } else {
                console.error('No media found in API response.');
            }
        } else {
            document.getElementById('loadingMessage').innerText = "Failed to fetch data!";
            console.error('API Error:', data.message);
        }
    } catch (error) {
        document.getElementById('loadingMessage').innerText = "An error occurred!";
        console.error('Fetch Error:', error);
    }
});