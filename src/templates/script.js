function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}
document.getElementById("shortenBtn").addEventListener("click", async function() {
    const longUrl = document.getElementById("longUrl").value.trim();

    if (!isValidUrl(longUrl)) {
        alert("Please enter a valid URL!");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ longUrl: longUrl })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById("result").style.display = "block";
            const shortUrl = data.shortUrl;
            document.getElementById("shortUrl").textContent = shortUrl;
            document.getElementById("shortUrl").href = shortUrl;

            document.getElementById("longUrl").value = "";
        } else {
            alert("Error: " + data.error);
        }
    } catch (error) {
        alert("Something went wrong. Please try again later.");
        console.error(error);
    }
});

document.getElementById("copyBtn").addEventListener("click", function() {
    const shortUrl = document.getElementById("shortUrl").textContent;
    navigator.clipboard.writeText(shortUrl)
        .then(() => {
            alert("URL copied to clipboard!");
        })
        .catch(err => {
            alert("Failed to copy URL: " + err);
        });
});
