//projects section
function openPopup(title, firstImage) {
    console.log('openPopup function called.');
    document.getElementById('popup').style.display = 'flex';
    document.getElementById('popup-title').innerText = title;
    document.getElementById('popup-description').innerText = getDescription(title);
    
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

  
    for (let i = 1; i <= 5; i++) {
        const imgSrc = `${title.toLowerCase().replace(/\s/g, '')}_${i}.jpg`;
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `${title} Image ${i}`;
        gallery.appendChild(img);
        console.log('Image path:', imgSrc);
      }
  
    // Set first image as the displayed one
    gallery.setAttribute('data-index', '0');
    changePopupImage(0);

    //disable scrolling
    document.body.style.overflow = 'hidden';

  }
  
  function closePopup() {
    console.log('closePopup function called.');
    document.getElementById('popup').style.display = 'none';
    // Enable scrolling on close
    document.body.style.overflow = 'auto';
  }
  
  function getDescription(projectTitle) {
    switch (projectTitle) {
      case 'Project 1':
        return 'Description of Project 1.';
      case 'Project 2':
        return 'Description of Project 2.';
      default:
        return '';
    }
  }
  
  function changePopupImage(n) {
    console.log('changePopupImage function called.');
    const gallery = document.getElementById('gallery');
    const currentIndex = parseInt(gallery.getAttribute('data-index'));
    const images = gallery.getElementsByTagName('img');
    const newIndex = (currentIndex + n + images.length) % images.length;
  
    // Hide all images
    for (let i = 0; i < images.length; i++) {
      images[i].style.display = 'none';
    }
  
    // Show the image with new index
    images[newIndex].style.display = 'block';
  
    gallery.setAttribute('data-index', newIndex);
  }
  
  // Disable scrolling when popup is open
  document.addEventListener('wheel', function (e) {
    if (document.getElementById('popup').style.display === 'flex') {
      e.preventDefault();
    }
  });
  
// Update openWorkPopup function
function openWorkPopup(title, mediaList) {
    console.log('openWorkPopup function called.');
    document.getElementById('work-popup').style.display = 'flex';
    document.getElementById('work-popup-title').innerText = title;
  
    // Clear existing media
    const gallery = document.getElementById('work-gallery');
    gallery.innerHTML = '';
  
    // Add media
    mediaList.forEach((media) => {   
      const element = media.type === 'image' ? createImageElement(media.src, media.alt) : createVideoElement(media.src, media.alt);
      gallery.appendChild(element);
    });
  
    // Set first media as the displayed one
    gallery.setAttribute('data-index', '0');
    changeWorkPopupMedia(0);
  }
  
  // Add new helper functions for creating image and video
  function createImageElement(src, alt) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    return img;
  }
  
  function createVideoElement(src, alt) {
    const video = document.createElement('video');
    video.src = src;
    video.alt = alt;
    video.controls = true; 
    return video;
  }
  
  
 // Function to change displayed media in Work Popup
function changeWorkPopupMedia(n) {
    const gallery = document.getElementById('work-gallery');
    let currentIndex = parseInt(gallery.getAttribute('data-index'), 10);
    const mediaItems = gallery.children;
  
    // Calculate new index
    let newIndex = currentIndex + n;
  
    // Ensure new index is within bounds
    if (newIndex < 0) {
      newIndex = mediaItems.length - 1;
    } else if (newIndex >= mediaItems.length) {
      newIndex = 0;
    }

    mediaItems[currentIndex].style.display = 'none';
  
    mediaItems[newIndex].style.display = 'flex';
  
    gallery.setAttribute('data-index', newIndex.toString());
  }
  
  // Function to close the Work Popup
  function closeWorkPopup() {
    const gallery = document.getElementById('work-gallery');

    Array.from(gallery.children).forEach((mediaItem) => {
      mediaItem.style.display = 'none';
    });
  
    gallery.setAttribute('data-index', '0');
  
    document.getElementById('work-popup').style.display = 'none';
  }
