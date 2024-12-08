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
        const downloadLinkContainer = document.getElementById("downloadLinkContainer");

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
                videoDuration.querySelector('span').textContent = videoData.durationFormatted;
                videoViews.querySelector('span').textContent = videoData.views;
                videoLikes.querySelector('span').textContent = videoData.likes;
                videoDislikes.querySelector('span').textContent = videoData.dislikes;

                // Populate download links based on available resolutions
                downloadLinkContainer.innerHTML = ''; // Clear previous download links

                // Checking available video qualities and creating download links
                const qualities = videoData.media.video.quality;
                let downloadLinksHTML = '';

                if (qualities.includes("360p")) {
                    downloadLinksHTML += `<a href="${videoData.media.video['360p'].url}" download class="inline-block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 mt-2">
                                            Download 360p (${videoData.media.video['360p'].size})
                                          </a>`;
                }
                if (qualities.includes("720p")) {
                    downloadLinksHTML += `<a href="${videoData.media.video['720p'].url}" download class="inline-block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 mt-2">
                                            Download 720p (${videoData.media.video['720p'].size})
                                          </a>`;
                }
                if (qualities.includes("1080p")) {
                    downloadLinksHTML += `<a href="${videoData.media.video['1080p'].url}" download class="inline-block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 mt-2">
                                            Download 1080p (${videoData.media.video['1080p'].size})
                                          </a>`;
                }
                if (qualities.includes("4k")) {
                    downloadLinksHTML += `<a href="${videoData.media.video['4k'].url}" download class="inline-block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 mt-2">
                                            Download 4K (${videoData.media.video['4k'].size})
                                          </a>`;
                }

                // Append download links to the container
                downloadLinkContainer.innerHTML = downloadLinksHTML;

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
