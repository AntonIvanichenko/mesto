const profileButton = document.querySelector('.profile__button');
const closeIcone = document.querySelector('.popup__close-icon');
const popupBlock = document.querySelector('.popup');
const inputName = document.querySelector('#users-name');
const profileTitle = document.querySelector('.profile__title');
const inputJob = document.querySelector('#users-job');
const profileParagraph = document.querySelector('.profile__paragraph');
const popupForm = document.querySelector('.popup__form');


profileButton.addEventListener('click', function () {
   openPopup(popupBlock);
});

closeIcone.addEventListener('click', function () {
   closePopup(popupBlock);
});


inputName.value = profileTitle.textContent;
inputJob.value = profileParagraph.textContent;



function handleFormSubmit(evt) {
   evt.preventDefault();

   profileTitle.textContent = inputName.value;
   profileParagraph.textContent = inputJob.value;

   closePopup(popupBlock);
}

popupForm.addEventListener('submit', handleFormSubmit);



function openPopup(popup) {
   popup.classList.add('popup_opened');
}

function closePopup(popup) {
   popup.classList.remove('popup_opened');
}