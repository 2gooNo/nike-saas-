// Simple image gallery script
// - Creates thumbnails on the left
// - Changes the big image when you hover a thumbnail
// - Lets you click arrows to go next/prev
// - Lets you click a colorway (small images) to switch sets

// Get the main elements from the page
const colPic = document.querySelector(".colPic");
const bigImg = document.querySelector(".bigPic .pic");
const arrows = document.querySelectorAll(".arrow");
const colorPick = document.querySelector(".color_pick");

// If the page does not have the gallery, stop safely
if (!colPic || !bigImg) {
  console.warn("Required gallery elements are missing from the DOM.");
} else {
  // We have 9 images per colorway: 1.1.avif ... 1.9.avif
  const maxImages = 9;

  // These are the available colorways (folders are not used here)
  const colorways = ["1", "2", "3", "4", "5", "6", "7", "8"];

  // Store thumbnail <img> elements so we can update them later
  const thumbs = [];

  // Track which image is showing right now
  let currentIndex = 0;
  let currentColorway = colorways[0];

  // Build the image file path using the naming pattern: Images/1.1.avif
  const imageSrc = (colorway, index) => `Images/${colorway}.${index}.avif`;

  // Show one image in the big preview
  const showImage = (index) => {
    // Wrap around (so next after 9 goes back to 1, and prev before 1 goes to 9)
    const boundedIndex = ((index % maxImages) + maxImages) % maxImages; // wrap both directions
    const src = imageSrc(currentColorway, boundedIndex + 1);
    const alt = `Gallery image ${boundedIndex + 1} colorway ${currentColorway}`;
    bigImg.src = src;
    bigImg.alt = alt;
    currentIndex = boundedIndex;
  };

  // When the colorway changes, refresh all thumbnails and keep the current index
  const updateThumbs = () => {
    thumbs.forEach((img, idx) => {
      img.src = imageSrc(currentColorway, idx + 1);
      img.alt = `Gallery image ${idx + 1} colorway ${currentColorway}`;
    });
    showImage(currentIndex);
  };

  // Create 9 thumbnails and add them into .colPic
  for (let i = 0; i < maxImages; i += 1) {
    const img = document.createElement("img");
    img.src = imageSrc(currentColorway, i + 1);
    img.alt = `Gallery image ${i + 1} colorway ${currentColorway}`;
    img.className = "thumb";

    // Hover a thumbnail to update the big image
    img.addEventListener("mouseenter", () => {
      showImage(i);
    });
    colPic.appendChild(img);
    thumbs.push(img);
  }

  // Create clickable colorway images
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

      // Click a colorway to switch the whole set
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

  // Arrow buttons: next/prev
  arrows.forEach((arrow) => {
    const isNext = arrow.dataset.direction === "next";
    arrow.addEventListener("click", () => {
      showImage(currentIndex + (isNext ? 1 : -1));
    });
  });

  // Start with the first image
  showImage(0);
}
