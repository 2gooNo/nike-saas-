const colPic = document.querySelector(".colPic");
const bigImg = document.querySelector(".bigPic .pic");
const arrows = document.querySelectorAll(".arrow");
const colorPick = document.querySelector(".color_pick");

if (!colPic || !bigImg) {
  console.warn("Required gallery elements are missing from the DOM.");
} else {
  const maxImages = 9;
  const colorways = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const thumbs = [];
  let currentIndex = 0;
  let currentColorway = colorways[0];

  const imageSrc = (colorway, index) => `Images/${colorway}.${index}.avif`;

  const showImage = (index) => {
    const boundedIndex = ((index % maxImages) + maxImages) % maxImages; // wrap both directions
    const src = imageSrc(currentColorway, boundedIndex + 1);
    const alt = `Gallery image ${boundedIndex + 1} colorway ${currentColorway}`;
    bigImg.src = src;
    bigImg.alt = alt;
    currentIndex = boundedIndex;
  };

  const updateThumbs = () => {
    thumbs.forEach((img, idx) => {
      img.src = imageSrc(currentColorway, idx + 1);
      img.alt = `Gallery image ${idx + 1} colorway ${currentColorway}`;
    });
    showImage(currentIndex);
  };

  for (let i = 0; i < maxImages; i += 1) {
    const img = document.createElement("img");
    img.src = imageSrc(currentColorway, i + 1);
    img.alt = `Gallery image ${i + 1} colorway ${currentColorway}`;
    img.className = "thumb";
    img.addEventListener("mouseenter", () => {
      showImage(i);
    });
    colPic.appendChild(img);
    thumbs.push(img);
  }

  if (colorPick) {
    colorways.forEach((colorway) => {
      const link = document.createElement("a");
      link.href = "#";
      link.className = "color_pick_link";
      link.setAttribute("aria-label", `Select colorway ${colorway}`);

      const swatch = document.createElement("img");
      swatch.src = imageSrc(colorway, 1);
      swatch.alt = `Colorway ${colorway}`;
      link.appendChild(swatch);

      link.addEventListener("click", (event) => {
        event.preventDefault();
        currentColorway = colorway;
        updateThumbs();
      });

      colorPick.appendChild(link);
    });
  } else {
    console.warn("Color pick container is missing from the DOM.");
  }

  arrows.forEach((arrow) => {
    const isNext = arrow.dataset.direction === "next";
    arrow.addEventListener("click", () => {
      showImage(currentIndex + (isNext ? 1 : -1));
    });
  });

  showImage(0);
}
