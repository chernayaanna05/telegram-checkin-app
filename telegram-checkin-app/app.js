const tg = window.Telegram.WebApp;
tg.expand();

const btn = document.getElementById("checkinBtn");
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");

btn.onclick = async () => {
  // ВКЛЮЧАЕМ ТОЛЬКО ФРОНТАЛКУ
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "user" },
    audio: false
  });

  video.style.display = "block";
  video.srcObject = stream;

  setTimeout(() => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);

    const photo = canvas.toDataURL("image/jpeg");

    stream.getTracks().forEach(track => track.stop());

    sendData(photo);
  }, 2000);
};

function sendData(photo) {
  fetch("https://script.google.com/macros/s/AKfycbz14QsTfssmAcxk6ai113FtIvC_DuUhrgqzEO6xA0dqiuKa24v2vV8YGAcFt6W_MXCdlQ/exec", {
    method: "POST",
    body: JSON.stringify({
      user: tg.initDataUnsafe.user,
      photo: photo
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  alert("Вы отметились!");
}