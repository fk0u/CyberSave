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
            // Send request to the Caliph API
            const apiUrl = `https://api.caliph.biz.id/api/ytv?url=${url}&apikey=7626a536ef7c434c`;
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.status === 200) {
                const videoData = data.result;

                // Hide loading status and show results section
                loadingStatus.classList.add("hidden");
                resultsSection.classList.remove("hidden");

                // Populate the results section dynamically with data from Caliph API
                videoPreview.innerHTML = `
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoData.result.split('/').pop()}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                `;
                videoTitle.textContent = videoData.title;
                videoDescription.textContent = videoData.desc.slice(0, 150) + '...';  // Limit to 150 chars
                videoDuration.querySelector('span').textContent = videoData.duration;
                videoViews.querySelector('span').textContent = videoData.views;
                videoLikes.querySelector('span').textContent = videoData.likes ? videoData.likes : 'N/A';
                videoDislikes.querySelector('span').textContent = videoData.dislike ? videoData.dislike : 'N/A';

                // Set download link from Caliph API
                downloadLink.href = videoData.result;

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
