document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        document.getElementById("preloader").style.display = "none";
        document.getElementById("content").style.display = "block";
    }, 2000);
});