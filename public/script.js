const result = document.getElementById("result");
const gallery = document.getElementById("gallery");
const loading = document.getElementById("loading");

async function generateImage() {
  const prompt = document.getElementById("prompt").value;

  if (!prompt) return alert("Enter prompt");

  loading.style.display = "block";
  result.innerHTML = "";

  const res = await fetch("/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();

  loading.style.display = "none";

  // show main image
  const img = document.createElement("img");
  img.src = data.imageUrl;

  const downloadBtn = document.createElement("a");
  downloadBtn.href = data.imageUrl;
  downloadBtn.download = "image.png";
  downloadBtn.innerText = "Download";
  downloadBtn.className = "btn btn-success mt-2";

  result.appendChild(img);
  result.appendChild(downloadBtn);

  // add to gallery
  const col = document.createElement("div");
  col.className = "col-md-3";

  const gImg = document.createElement("img");
  gImg.src = data.imageUrl;

  col.appendChild(gImg);
  gallery.appendChild(col);
}