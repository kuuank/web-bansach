
let slider = document.querySelector(".slider .list");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let image = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
let active = 0;
let lengthItems = image.length - 1;
function renderImages() {
  for (let src of image) {
    let item = document.createElement("div");
    item.classList.add("item");
    let img = document.createElement("img");
    img.src = `img/${src}`;
    img.alt = "Lỗi Ảnh";
    item.appendChild(img);
    slider.appendChild(item);
  }
}
renderImages();
let items = document.querySelectorAll(".slider .list .item");
next.onclick = function () {
  active = active + 1 <= lengthItems ? active + 1 : 0;
  reloadSlider();
};
prev.onclick = function () {
  active = active - 1 >= 0 ? active - 1 : lengthItems;
  reloadSlider();
};

function reloadSlider() {
  slider.style.left = -items[active].offsetLeft + "px";
  let imageCountElement = document.querySelector(".image-count");
  imageCountElement.textContent = `${active + 1}/${lengthItems + 1}`;
}

let dotsContainer = document.querySelector(".dots-container");

// Thêm các điểm chuyển đổi
for (let i = 0; i <= lengthItems; i++) {
  let dot = document.createElement("div");
  dot.classList.add("dot");
  dot.addEventListener("click", function () {
    active = i;
    reloadSlider();
  });
  dotsContainer.appendChild(dot);
}

// Áp dụng lớp active cho điểm chuyển đổi hiện tại
function updateActiveDot() {
  let dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === active);
  });
}

// Gọi hàm cập nhật lớp active cho điểm chuyển đổi
reloadSlider();
updateActiveDot();

// Cập nhật kích thước khi thay đổi cửa sổ
window.onresize = function (event) {
  reloadSlider();
};
