///////////////////////////////////////
// Gallery
const btnShowGallery: Element | null = document.querySelector('.btnShowGallery');
const btnPrev: Element | null = document.querySelector('.previous');
const btnNext: Element | null = document.querySelector('.next');
const btnPages: NodeListOf<Element> = document.querySelectorAll('.pages');

// Will be recorded in the getGallery
let currentPage: number = 1;
let maxPage: number;

function getGallery(i: number): Promise<void> {
  return new Promise((resolve, reject) => {
    fetch(
        `https://hjdjs55gol.execute-api.us-east-1.amazonaws.com/api/gallery?page=${i}`,
        {
          headers: {
            Authorization: localStorage.getItem('token') || "",
          },
        }
    )
        .then(responseGallery => {
          if (!responseGallery.ok) {
            throw new Error('Network response was not ok');
          }
          return responseGallery.json();
        })
        .then(resultGallery => {
          currentPage = resultGallery.page;
          maxPage = resultGallery.total;
          localStorage.setItem('page', resultGallery.page.toString());

          const images: string[] = resultGallery.objects;
          images.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.width = 300;
            img.id = 'img';

            const imgsElement = document.querySelector('#imgs');
            if (imgsElement) imgsElement.append(img);
          });
          resolve();
        })
        .catch(error => {
          reject(error);
        });
  });
}


const btnShowGalleryEL: void = btnShowGallery?.addEventListener('click', e => {
  e?.preventDefault();

  if (localStorage.getItem('token')) {
    getGallery(Number(localStorage.getItem('page')) || currentPage);
  }
});

function cleanGallery(): void {
  document.querySelectorAll('#img').forEach(el => el.remove());
}

const btnNextEL = btnNext?.addEventListener('click', e => {
  e?.preventDefault();

  cleanGallery();
  nextPage();
});

const btnPrevEL = btnPrev?.addEventListener('click', e => {
  e?.preventDefault();

  cleanGallery();
  prevPage();
});

function nextPage(): void {
  if (currentPage === maxPage) {
    currentPage = 1;
  } else {
    currentPage++;
  }

  getGallery(currentPage);
}

function prevPage(): void {
  if (currentPage === 1) {
    currentPage = maxPage;
  } else {
    currentPage--;
  }

  getGallery(currentPage);
}

// Open last page after reload
function reloadPage(): void {
  if (localStorage.getItem('token')) {
    getGallery(Number(localStorage.getItem('page')));
  }
}

btnPages.forEach(el => {
  el.addEventListener('click', e => {
    e?.preventDefault();
    cleanGallery();
    getGallery(Number(el.innerHTML));
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
