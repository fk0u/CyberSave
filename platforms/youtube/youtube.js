document.addEventListener('DOMContentLoaded', function () {
    // Handle form submission
    document.getElementById("actionForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const url = document.getElementById("userQuery").value.trim();
        const loadingStatus = document.getElementById("loadingStatus");
        const resultsSection = document.getElementById("results");

        // Get elements for video data
        const videoPreview = document.getElementById("videoPreview");
        const videoTitle = document.getElementById("videoTitle");
        const videoDescription = document.getElementById("videoDescription");
        const videoDuration = document.getElementById("videoDuration");
        const videoViews = document.getElementById("videoViews");
        const videoLikes = document.getElementById("videoLikes");
        const videoDislikes = document.getElementById("videoDislikes");
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
                videoPreview.innerHTML = `
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoData.id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                `;
                videoTitle.textContent = videoData.title;
                videoDescription.textContent = videoData.description.slice(0, 150) + '...';  // Limit to 150 chars
                videoDuration.querySelector('span').textContent = videoData.duration_formatted;
                videoViews.querySelector('span').textContent = videoData.views;
                videoLikes.querySelector('span').textContent = videoData.ratings.likes;
                videoDislikes.querySelector('span').textContent = videoData.ratings.dislikes;

                // Set download link
                downloadLink.href = videoData.url;

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
