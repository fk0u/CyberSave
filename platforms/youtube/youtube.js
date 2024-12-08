document.addEventListener('DOMContentLoaded', function () {
    // Handle form submission
    document.getElementById("actionForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const url = document.getElementById("userQuery").value.trim();
        const contentType = document.getElementById("contentType").value;
        const resultsSection = document.getElementById("results");
        const loadingBar = document.getElementById("loadingBar");

        // Show loading bar
        loadingBar.classList.remove("hidden");

        try {
            // Send request to YouTube downloader API
            const response = await fetch(`https://api.zpi.my.id/v1/download/youtube?url=${url}`);
            const data = await response.json();

            if (data.status === 200) {
                const videoData = data.data;

                // Hide loading bar and show results section
                loadingBar.classList.add("hidden");
                resultsSection.classList.remove("hidden");

                // Populate the results section dynamically
                const resultContainer = document.querySelector("#results .grid");
                resultContainer.innerHTML = `
                    <div class="bg-gray-800 p-4 rounded-lg shadow-lg hover:scale-105 transition-transform">
                        <img src="${videoData.thumbnail.url}" alt="${videoData.title}" class="w-full h-48 object-cover rounded-lg mb-4">
                        <h2 class="text-xl font-semibold text-gray-100">${videoData.title}</h2>
                        <p class="mt-2 text-gray-300">${videoData.description.slice(0, 150)}...</p>
                        <div class="mt-4">
                            <a href="${videoData.url}" target="_blank" class="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Watch on YouTube</a>
                            <a href="${videoData.url}" download class="inline-block ml-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Download</a>
                        </div>
                    </div>
                `;
            } else {
                alert('Error fetching video data. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to fetch video data. Please check the URL or try again later.');
        }
    });
});
