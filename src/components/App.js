import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteCardClick, setIsDeleteCardClick] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [isCardLikeClick, setIsCardLikeClick] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch(console.error)
    api.getUserProfile()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(console.error)
  }, [])


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleDeleteCardClick() {
    setIsDeleteCardClick(true);
  }
  function handleAddPlaceSubmit({ name, link }) {
    api.addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopup();
      })
      .catch(console.error)
  }
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(console.error);
  }
  function handleUpdateUser({ name, about }) {
    api.setUserProfile(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopup();
      })
      .catch(console.error)
  }
  function handleUpdateAvatar({ avatar }) {
    api.setUserAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopup();
      })
      .catch(console.error);
  }
  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then((res) => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch(console.error)
  }
  function closeAllPopup() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          cards={cards}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopup}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopup}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopup}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
