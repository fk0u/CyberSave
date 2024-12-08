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
    const videoPreview = document.getElementById("videoPreview");
    const downloadVideo = document.getElementById("downloadVideo");
    const musicTitle = document.getElementById("musicTitle");
    const musicAuthor = document.getElementById("musicAuthor");
    const musicDuration = document.getElementById("musicDuration");
    const downloadMusic = document.getElementById("downloadMusic");
    const loadingBar = document.getElementById("loadingBar");

    // Clear previous result
    resultSection.style.display = 'none';
    loadingBar.classList.remove("hidden");

    // Reset previous content
    videoPreview.src = '';
    downloadVideo.href = '';
    downloadMusic.href = '';

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
            videoCaption.textContent = "No caption available"; // Update if caption is available
            if (data.data.message) {
                videoCaption.textContent = data.data.message;
            }

            // Display engagement stats (likes, comments, shares)
            likes.textContent = data.data.likes || "0";
            comments.textContent = "0"; // Default to 0 if comments data is missing
            shares.textContent = "0"; // Default to 0 if shares data is missing

            // Display images (since the media is of type "image")
            const imageGallery = document.getElementById("imageGallery");
            imageGallery.innerHTML = ""; // Clear any previous images
            data.data.media.forEach((image) => {
                if (image.type === "image") {
                    const imgElement = document.createElement("img");
                    imgElement.src = image.url;
                    imgElement.alt = "Instagram Image";
                    imgElement.classList.add("w-full", "h-auto", "rounded-lg", "mb-4");
                    imageGallery.appendChild(imgElement);
                }
            });

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
