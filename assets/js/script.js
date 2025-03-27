'use strict';

// Element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// Testimonials modal (wrapped in a conditional) - unchanged
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

if (testimonialsItem.length > 0 && modalContainer && modalCloseBtn && overlay && modalImg && modalTitle && modalText) {
  const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  };

  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
      testimonialsModalFunc();
    });
  }

  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}

// Custom select and filter functionality - unchanged
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

select.addEventListener("click", function () { elementToggleFunc(this); });

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// Filter function for active class toggle
const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// Add event to all filter button items for large screens
let lastClickedBtn = filterBtn[0];
for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// Contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Add event to all form input fields
if (form && formInputs && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}

// Page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add event to all navigation links
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const pageName = this.innerHTML.toLowerCase();
    for (let j = 0; j < pages.length; j++) {
      if (pageName === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
        // Trigger skill animation when Resume page is active
        if (pageName === "resume") {
          animateSkills();
        }
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}

// Project modal functionality
const projectItems = document.querySelectorAll("[data-project-details]");
const projectModalContainer = document.createElement("div");
projectModalContainer.classList.add("modal-container");
projectModalContainer.innerHTML = `
  <div class="overlay" data-project-overlay></div>
  <section class="testimonials-modal">
    <button class="modal-close-btn" data-project-close-btn>
      <ion-icon name="close-outline"></ion-icon>
    </button>
    <div class="modal-img-wrapper">
      <figure class="modal-avatar-box">
        <img src="" alt="" data-project-modal-img>
      </figure>
    </div>
    <div class="modal-content">
      <h4 class="h3 modal-title" data-project-modal-title></h4>
      <p data-project-modal-text></p>
    </div>
  </section>
`;
document.body.appendChild(projectModalContainer);

const projectModal = projectModalContainer.querySelector(".testimonials-modal");
const projectOverlay = projectModalContainer.querySelector("[data-project-overlay]");
const projectCloseBtn = projectModalContainer.querySelector("[data-project-close-btn]");
const projectModalImg = projectModalContainer.querySelector("[data-project-modal-img]");
const projectModalTitle = projectModalContainer.querySelector("[data-project-modal-title]");
const projectModalText = projectModalContainer.querySelector("[data-project-modal-text]");

const projectModalFunc = function () {
  projectModalContainer.classList.toggle("active");
  projectOverlay.classList.toggle("active");
};

projectItems.forEach(item => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    const projectId = this.dataset.projectDetails;
    const projectImg = this.querySelector("img").src;
    const projectTitle = this.querySelector(".project-title").innerText;
    const projectText = this.querySelector(".project-desc").innerText;

    projectModalImg.src = projectImg;
    projectModalImg.alt = projectTitle;
    projectModalTitle.innerText = projectTitle;
    projectModalText.innerText = projectText;

    projectModalFunc();
  });
});

projectCloseBtn.addEventListener("click", projectModalFunc);
projectOverlay.addEventListener("click", projectModalFunc);

// Skill progress bar animation
function animateSkills() {
  const skillFills = document.querySelectorAll(".skill-progress-fill");
  skillFills.forEach(fill => {
    const width = fill.style.width;
    fill.style.width = "0%";
    setTimeout(() => {
      fill.style.transition = "width 1s ease-in-out";
      fill.style.width = width;
    }, 100);
  });
}

// Initial call to animate skills if Resume is the default page
if (pages[1].classList.contains("active")) {
  animateSkills();
}