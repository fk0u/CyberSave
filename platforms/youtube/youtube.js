document.addEventListener('DOMContentLoaded', function () {
    // Handle form submission
    document.getElementById("actionForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const url = document.getElementById("userQuery").value.trim();
        const loadingStatus = document.getElementById("loadingStatus");
        const resultsSection = document.getElementById("results");
        const thumbnail = document.getElementById("thumbnail");
        const videoTitle = document.getElementById("videoTitle");
        const videoDescription = document.getElementById("videoDescription");
        const downloadLink = document.getElementById("downloadLink");

        // Show loading status
        loadingStatus.classList.remove("hidden");

        try {
            // Send request to YouTube downloader API
            const response = await fetch(`https://api.zpi.my.id/v1/download/youtube?url=${url}`);
            const data = await response.json();

            if (data.status === 200) {
                const videoData = data.data;

                // Hide loading status and show results section
                loadingStatus.classList.add("hidden");
                resultsSection.classList.remove("hidden");

                // Populate the results section dynamically
                thumbnail.src = videoData.thumbnail.url;
                videoTitle.textContent = videoData.title;
                videoDescription.textContent = videoData.description.slice(0, 150) + '...';
                downloadLink.href = videoData.url; // Set download link

            } else {
                alert('Error fetching video data. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to fetch video data. Please check the URL or try again later.');
            loadingStatus.classList.add("hidden");
        }
    });
});
