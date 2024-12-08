// Toggle mobile menu
document.getElementById('hamburger').addEventListener('click', function() {
    document.getElementById('mobileMenu').classList.toggle('hidden');
});

// Handle form submission
document.getElementById('downloadForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const url = document.getElementById('facebookUrl').value;

    // Show loading bar
    document.getElementById('loadingBar').classList.remove('hidden');

    try {
        const response = await fetch(`https://api.zpi.my.id/v1/download/facebook?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        if (data.status === 200) {
            document.getElementById('loadingBar').classList.add('hidden');
            document.getElementById('result').classList.remove('hidden');

            const { title, media, thumbnail } = data.data;
            document.getElementById('videoCaption').innerText = title;

            // Set thumbnail
            document.getElementById('authorAvatar').src = thumbnail;
            document.getElementById('authorName').innerText = title;
            document.getElementById('authorUsername').innerText = `@${data.data.url.split('/')[3]}`;

            // Handle media preview
            const previewElement = document.getElementById('mediaPreview');
            const downloadLink = document.getElementById('downloadMedia');
            
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
            }
        } else {
            document.getElementById('loadingMessage').innerText = "Failed to fetch data!";
        }
    } catch (error) {
        document.getElementById('loadingMessage').innerText = "An error occurred!";
    }
});