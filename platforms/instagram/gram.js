document.getElementById("downloadForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const videoUrl = document.getElementById("instagramUrl").value;
    const resultSection = document.getElementById("result");
    const authorAvatar = document.getElementById("authorAvatar");
    const authorName = document.getElementById("authorName");
    const authorUsername = document.getElementById("authorUsername");
    const videoCaption = document.getElementById("videoCaption");
    const likes = document.getElementById("likes");
    const comments = document.getElementById("comments");
    const shares = document.getElementById("shares");
    const mediaPreview = document.getElementById("mediaPreview");
    const downloadMedia = document.getElementById("downloadMedia");
    const loadingBar = document.getElementById("loadingBar");

    // Clear previous result
    resultSection.style.display = 'none';
    loadingBar.classList.remove("hidden");

    // Reset previous content
    mediaPreview.innerHTML = ''; // Clear previous media
    downloadMedia.href = '';

    // API call URL
    const apiUrl = `https://api.zpi.my.id/v1/download/instagram?url=${encodeURIComponent(videoUrl)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === 200) {
            // Display author info
            authorAvatar.src = data.data.author.is_verified ? data.data.author.avatar : "https://via.placeholder.com/50";
            authorName.textContent = data.data.author.fullname || "Unknown Author";
            authorUsername.textContent = `@${data.data.author.username || "unknown"}`;

            // Display caption
            videoCaption.textContent = data.data.message || "No caption available";

            // Display engagement stats (likes, comments, shares)
            likes.textContent = data.data.likes || "0";
            comments.textContent = "0"; // Default to 0 if comments data is missing
            shares.textContent = "0"; // Default to 0 if shares data is missing

            // Media Preview (Image or Video)
            if (data.data.media && data.data.media.length > 0) {
                data.data.media.forEach((media) => {
                    if (media.type === "image") {
                        // Preview for image
                        const imgElement = document.createElement("img");
                        imgElement.src = media.url;
                        imgElement.alt = "Instagram Image";
                        imgElement.classList.add("w-full", "h-auto", "rounded-lg");
                        mediaPreview.appendChild(imgElement);

                        // Set download link for image
                        downloadMedia.href = media.url;
                        downloadMedia.download = "instagram-image.jpg"; // Default name for the download
                        downloadMedia.textContent = "Download Image";
                    } else if (media.type === "video") {
                        // Preview for video
                        const videoElement = document.createElement("video");
                        videoElement.src = media.url;
                        videoElement.classList.add("w-full", "rounded-lg");
                        videoElement.controls = true;
                        mediaPreview.appendChild(videoElement);

                        // Set download link for video
                        downloadMedia.href = media.url;
                        downloadMedia.download = "instagram-video.mp4"; // Default name for the download
                        downloadMedia.textContent = "Download Video";
                    }
                });
            }

            // Display result section
            resultSection.style.display = 'block';
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
