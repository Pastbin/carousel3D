(function () {
  let imageWidth = 0;
  let currentDownPixel = 0;
  let newPosition = 0;
  let positionIndex, galleryPosition = 0, currentPositionMouse;
  const carousel = document.querySelector('#carousel')
  const carouselWrap = document.querySelector('#carousel .wrap')
  const images = document.querySelectorAll("#carousel .image-wrap");


  carouselWrap.addEventListener('mouseup', rotateImageToMe)


  carousel.addEventListener('mousedown', wrapMouseDownHandler)
  window.addEventListener('load', () => {
      imageWidth = images[0].clientWidth;
      for (let i = 0; i < images.length; i++) {
        images[i].style.transform += `rotateY(${-(360 / images.length * i).toFixed(2)}deg) translateZ(${images.length * imageWidth / 6.35}px)`
      }
    }
  )

  function rotateCarousel(e) {
    newPosition = (e.clientX - currentDownPixel) * (360 / carousel.clientWidth)
    carouselWrap.style.transform = `rotateX(-25deg) rotateY(${galleryPosition + newPosition}deg)`
  }

  function wrapMouseDownHandler(e) {
    currentPositionMouse = e.clientX;
    e.preventDefault()
    // e.target.closest('.wrap').style.transition = "";
    newPosition = 0;
    currentDownPixel = e.clientX
    carousel.onmousemove = rotateCarousel
    carousel.onmouseup = () => {
      galleryPosition += newPosition;
      carousel.onmousemove = "";

    }

    const images = document.querySelectorAll('#carousel .image')
    images.forEach(imgEl => {
      if (imgEl !== e) {
        imgEl.classList.remove('active')
      }
    })
  }

  function rotateImageToMe(e) {
    if (e.type === "mouseup" && currentPositionMouse === e.clientX) {
      let rotateY = e.target.closest('.image-wrap').style.transform
      rotateY = +rotateY.match(/rotateY\(-?\d{0,5}\.?\d{0,2}/g)?.join("").match(/-?\d{0,5}\.?\d{0,2}/g).join("")
      const diff = Math.abs(galleryPosition % 360 + rotateY);
      let newPosition = diff > 180 ? galleryPosition + -(360 + galleryPosition + rotateY) : galleryPosition - (galleryPosition + rotateY)
      if (galleryPosition - newPosition > 360) {
        newPosition = newPosition + 360
      }
      galleryPosition = newPosition;
      e.target.closest('.wrap').style.transition = `transform 0.3s linear`;
      e.target.closest('.wrap').style.transform = `rotateX(-25deg) rotateY(${newPosition}deg)`;
      const images = document.querySelectorAll('#carousel .image')
      images.forEach(imgEl => {
        if (imgEl !== e) {
          imgEl.classList.remove('active')
        }
      })
      setTimeout(() => {
        e.target.classList.add('active')
      }, 300)
    }
  }
})()
