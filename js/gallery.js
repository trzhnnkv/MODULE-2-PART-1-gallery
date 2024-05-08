///////////////////////////////////////
// Gallery
const btnShowGallery = document.querySelector('.btnShowGallery');
const btnPrev = document.querySelector('.previous');
const btnNext = document.querySelector('.next');
const btnPages = document.querySelectorAll('.pages');

// Will be recorded in the getGallery
let currentPage = 1;
let maxPage;

async function getGallery(i) {
  try {
    const responseGallery = await fetch(
      `https://hjdjs55gol.execute-api.us-east-1.amazonaws.com/api/gallery?page=${i}`,
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    );

    const resultGallery = await responseGallery.json();
    currentPage = resultGallery.page;
    maxPage = resultGallery.total;
    localStorage.setItem('page', resultGallery.page);

    console.log(resultGallery);

    // Rendering images
    const images = resultGallery.objects;

    images.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.width = '300';
      img.id = 'img';

      document.querySelector('#imgs').append(img);
    });
  } catch (error) {
    alert(error);
  }
}

const btnShowGalleryEL = btnShowGallery.addEventListener('click', e => {
  e.preventDefault();

  if (localStorage.getItem('token')) {
    getGallery(localStorage.getItem('page') || currentPage);
  }
});

function cleanGallery() {
  document.querySelectorAll('#img').forEach(el => el.remove());
}

const btnNextEL = btnNext.addEventListener('click', e => {
  e.preventDefault();

  cleanGallery();
  nextPage();
});

const btnPrevEL = btnPrev.addEventListener('click', e => {
  e.preventDefault();

  cleanGallery();
  prevPage();
});

function nextPage() {
  if (currentPage === maxPage) {
    currentPage = 1;
  } else {
    currentPage++;
  }

  getGallery(currentPage);
}

function prevPage() {
  if (currentPage === 1) {
    currentPage = maxPage;
  } else {
    currentPage--;
  }

  getGallery(currentPage);
}

// Open last page after reload
function reloadPage() {
  if (localStorage.getItem('token')) {
    getGallery(localStorage.getItem('page'));
  }
}

btnPages.forEach(el => {
  el.addEventListener('click', e => {
    (e.onclick = cleanGallery()), getGallery(el.innerHTML);
  });
});

export {
  btnShowGallery,
  btnPrev,
  btnNext,
  getGallery,
  btnShowGalleryEL,
  cleanGallery,
  btnNextEL,
  btnPrevEL,
  nextPage,
  prevPage,
  reloadPage,
  currentPage,
  maxPage,
  btnPages,
};
