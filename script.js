const colPic = document.querySelector(".colPic");
const bigImg = document.querySelector(".bigPic .pic");
const arrows = document.querySelectorAll(".arrow");

if (!colPic || !bigImg) {
  console.warn("Required gallery elements are missing from the DOM.");
} else {
  const maxImages = 9;
  const thumbs = [];
  let currentIndex = 0;

  const showImage = (index) => {
    const boundedIndex = ((index % maxImages) + maxImages) % maxImages; // wrap both directions
    const src = `Images/1.${boundedIndex + 1}.avif`;
    const alt = `Gallery image ${boundedIndex + 1}`;
    bigImg.src = src;
    bigImg.alt = alt;
    currentIndex = boundedIndex;
  };

  for (let i = 0; i < maxImages; i += 1) {
    const src = `Images/1.${i + 1}.avif`;
    const alt = `Gallery image ${i + 1}`;
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.className = "thumb";
    img.addEventListener("mouseenter", () => {
      showImage(i);
    });
    colPic.appendChild(img);
    thumbs.push(img);
  }

  arrows.forEach((arrow) => {
    const isNext = arrow.dataset.direction === "next";
    arrow.addEventListener("click", () => {
      showImage(currentIndex + (isNext ? 1 : -1));
    });
  });

  showImage(0);
}
