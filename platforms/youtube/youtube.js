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

        // Encode the URL to make sure it's properly formatted
        const encodedUrl = encodeURIComponent(url);

        try {
            // Send request to CORS proxy server to bypass CORS restrictions
            const apiUrl = `https://cors-anywhere.herokuapp.com/https://api.caliph.biz.id/api/ytv?url=${encodedUrl}&apikey=7626a536ef7c434c`;
            const response = await fetch(apiUrl, {
                headers: {
                    // Add any additional headers if required, such as an API key or authentication token.
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            // Check if the response is ok (status 200)
            if (!response.ok) {
                throw new Error('Failed to fetch data from the API');
            }

            // Parse the response data
            const data = await response.json();

            if (data.status === 200) {
                const videoData = data.result;

                // Hide loading status and show results section
                loadingStatus.classList.add("hidden");
                resultsSection.classList.remove("hidden");

                // Populate the results section dynamically with data from the Caliph API
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
                // Handle if the status is not 200
                throw new Error('Error fetching video data. Please try again.');
            }
        } catch (error) {
            // Handle errors from fetch or API response
            console.error('Error:', error);
            alert('Failed to fetch video data. Please check the URL or try again later.');
            loadingStatus.classList.add("hidden");
        }
    });
});
