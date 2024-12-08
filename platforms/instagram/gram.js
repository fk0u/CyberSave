document.getElementById("downloadForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const videoUrl = document.getElementById("instagramUrl").value;
    const resultSection = document.getElementById("result");
    const authorAvatar = document.getElementById("authorAvatar");
    const authorName = document.getElementById("authorName");
    const authorUsername = document.getElementById("authorUsername");
    const videoCaption = document.getElementById("videoCaption");
    const mediaContainer = document.getElementById("mediaContainer");
    const loadingBar = document.getElementById("loadingBar");

    // Clear previous result
    mediaContainer.innerHTML = '';
    resultSection.style.display = 'none';

    // Show loading
    loadingBar.classList.remove("hidden");

    const apiUrl = `https://api.zpi.my.id/v1/download/instagram?url=${encodeURIComponent(videoUrl)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === 200) {
            // Display author info
            authorAvatar.src = data.data.author.is_verified ? data.data.author.avatar : "https://via.placeholder.com/50";
            authorName.textContent = data.data.author.fullname || "Unknown Author";
            authorUsername.textContent = `@${data.data.author.username || "unknown"}`;
            
            // Display video caption
            videoCaption.textContent = data.data.message || "No caption available";

            // Display media (images)
            data.data.media.forEach(item => {
                if (item.type === 'image') {
                    const imgElement = document.createElement('img');
                    imgElement.src = item.url;
                    mediaContainer.appendChild(imgElement);

                    // Add download link for each image
                    const downloadLink = document.createElement('a');
                    downloadLink.href = item.url;
                    downloadLink.download = item.url.split('/').pop();
                    downloadLink.textContent = 'Unduh Gambar';
                    mediaContainer.appendChild(downloadLink);
                }
            });

            resultSection.style.display = 'block'; // Show the result section
        } else {
            alert("Gagal mengambil data media, periksa URL.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Terjadi kesalahan. Coba lagi.");
    } finally {
        loadingBar.classList.add("hidden"); // Hide loading after API call
    }
});
