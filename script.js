/* =========================================================
   CURRENT YEAR
========================================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* =========================================================
   NERD IMAGE LIGHTBOX
========================================================= */

const nerdImages = document.querySelectorAll(
  ".nerd-gallery-item img"
);

if (nerdImages.length > 0) {

  let currentImageIndex = 0;

  /* -------------------------------------------------------
     Create Lightbox
  ------------------------------------------------------- */

  const lightbox = document.createElement("div");

  lightbox.className = "lightbox";


  /* Close Button */

  const closeButton = document.createElement("button");

  closeButton.className = "lightbox-close";
  closeButton.setAttribute("aria-label", "Close");
  closeButton.innerHTML = "&times;";


  /* Previous Button */

  const previousButton = document.createElement("button");

  previousButton.className = "lightbox-prev";
  previousButton.setAttribute("aria-label", "Previous image");
  previousButton.innerHTML = "&#10094;";


  /* Next Button */

  const nextButton = document.createElement("button");

  nextButton.className = "lightbox-next";
  nextButton.setAttribute("aria-label", "Next image");
  nextButton.innerHTML = "&#10095;";


  /* Content */

  const lightboxContent = document.createElement("div");

  lightboxContent.className = "lightbox-content";


  /* Image */

  const lightboxImage = document.createElement("img");

  lightboxImage.className = "lightbox-image";
  lightboxImage.alt = "NERD application screenshot";


  /* Counter */

  const lightboxCounter = document.createElement("div");

  lightboxCounter.className = "lightbox-counter";


  /* Build Lightbox */

  lightboxContent.appendChild(lightboxImage);
  lightboxContent.appendChild(lightboxCounter);

  lightbox.appendChild(closeButton);
  lightbox.appendChild(previousButton);
  lightbox.appendChild(lightboxContent);
  lightbox.appendChild(nextButton);

  document.body.appendChild(lightbox);


  /* -------------------------------------------------------
     Update Lightbox
  ------------------------------------------------------- */

  function updateLightboxImage() {

    const image = nerdImages[currentImageIndex];

    lightboxImage.src = image.src;

    lightboxImage.alt =
      image.alt || "NERD application screenshot";

    lightboxCounter.textContent =
      `${currentImageIndex + 1} / ${nerdImages.length}`;
  }


  /* -------------------------------------------------------
     Open Lightbox
  ------------------------------------------------------- */

  function openLightbox(index) {

    currentImageIndex = index;

    updateLightboxImage();

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";
  }


  /* -------------------------------------------------------
     Close Lightbox
  ------------------------------------------------------- */

  function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";
  }


  /* -------------------------------------------------------
     Previous Image
  ------------------------------------------------------- */

  function showPreviousImage() {

    currentImageIndex--;

    if (currentImageIndex < 0) {
      currentImageIndex = nerdImages.length - 1;
    }

    updateLightboxImage();
  }


  /* -------------------------------------------------------
     Next Image
  ------------------------------------------------------- */

  function showNextImage() {

    currentImageIndex++;

    if (currentImageIndex >= nerdImages.length) {
      currentImageIndex = 0;
    }

    updateLightboxImage();
  }


  /* -------------------------------------------------------
     Image Click
  ------------------------------------------------------- */

  nerdImages.forEach(function (image, index) {

    image.addEventListener("click", function () {

      openLightbox(index);

    });

  });


  /* -------------------------------------------------------
     Buttons
  ------------------------------------------------------- */

  closeButton.addEventListener(
    "click",
    closeLightbox
  );

  previousButton.addEventListener(
    "click",
    showPreviousImage
  );

  nextButton.addEventListener(
    "click",
    showNextImage
  );


  /* -------------------------------------------------------
     Click Outside Image
  ------------------------------------------------------- */

  lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {
      closeLightbox();
    }

  });


  /* -------------------------------------------------------
     Keyboard Controls
  ------------------------------------------------------- */

  document.addEventListener("keydown", function (event) {

    if (!lightbox.classList.contains("active")) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowLeft") {
      showPreviousImage();
    }

    if (event.key === "ArrowRight") {
      showNextImage();
    }

  });

}