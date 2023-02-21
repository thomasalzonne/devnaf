<template>
  <div class="contact-page">
    <span class="contact-page__main-title-mobile">Contact</span>
    <div class="contact-page__container-infos">
      <div class="contact-page__container-blocs-infos">
        <div class="contact-page__block-info">
          <div class="contact-page__block-info-container-icon">
            <SvgIcon class="contact-page__block-info-icon" name="need-help" />
          </div>
          <div class="contact-page__block-info-text">
            <span class="contact-page__block-info-title">Besoin d’aide ?</span>
            <span class="contact-page__block-info-description"
              >Consulter les questions réponses dans notre foire aux
              questions.</span
            >
            <span class="contact-page__block-info-link"
              >Me rendre sur la FAQ</span
            >
          </div>
        </div>

        <div class="contact-page__block-info">
          <div class="contact-page__block-info-container-icon">
            <SvgIcon class="contact-page__block-info-icon" name="phone" />
          </div>
          <div class="contact-page__block-info-text">
            <span class="contact-page__block-info-title">Besoin d’aide ?</span>
            <span class="contact-page__block-info-description"
              >Consulter les questions réponses dans notre foire aux
              questions.</span
            >
            <span class="contact-page__block-info-link"
              >Me rendre sur la FAQ</span
            >
          </div>
        </div>

        <div class="contact-page__block-info">
          <div class="contact-page__block-info-container-icon">
            <SvgIcon class="contact-page__block-info-icon" name="map-point" />
          </div>
          <div class="contact-page__block-info-text">
            <span class="contact-page__block-info-title">Besoin d’aide ?</span>
            <span class="contact-page__block-info-description"
              >Consulter les questions réponses dans notre foire aux
              questions.</span
            >
            <span class="contact-page__block-info-link"
              >Me rendre sur la FAQ</span
            >
          </div>
        </div>
      </div>
    </div>

    <form class="contact-page__form" action="submit">
      <span class="contact-page__main-title-large-screen">Contact</span>
      <div class="contact-page__container-inputs">
        <div class="contact-page__select-large-screen">
          <span class="contact-page__select-title"
            >Vous avez une question sur :</span
          >
          <div class="contact-page__select-large-screen-container">
            <div class="contact-page__box-checkbox">
              <input
                id="account-option"
                class="contact-page__checkbox-question-subject"
                name="question-subject"
                type="radio"
                value="account-option"
              />
              <label
                class="contact-page__label-description"
                for="account-option"
                >Compte</label
              >
            </div>
            <div class="contact-page__box-checkbox">
              <input
                id="return-option"
                class="contact-page__checkbox-question-subject"
                name="question-subject"
                type="radio"
                value="return-option"
              />
              <label class="contact-page__label-description" for="return-option"
                >Retour d’un produit</label
              >
            </div>
            <div class="contact-page__box-checkbox">
              <input
                id="refund-option"
                class="contact-page__checkbox-question-subject"
                name="question-subject"
                type="radio"
                value="refund-option"
              />
              <label class="contact-page__label-description" for="refund-option"
                >Remboursement</label
              >
            </div>
            <div class="contact-page__box-checkbox">
              <input
                id="orders-option"
                class="contact-page__checkbox-question-subject"
                name="question-subject"
                type="radio"
                value="orders-option"
              />
              <label class="contact-page__label-description" for="orders-option"
                >Commandes et articles</label
              >
            </div>
            <div class="contact-page__box-checkbox">
              <input
                id="delivery-option"
                class="contact-page__checkbox-question-subject"
                name="question-subject"
                type="radio"
                value="delivery-option"
              />
              <label
                class="contact-page__label-description"
                for="delivery-option"
                >Livraison</label
              >
            </div>
            <div class="contact-page__box-checkbox">
              <input
                id="other-option"
                class="contact-page__checkbox-question-subject"
                name="question-subject"
                type="radio"
                value="other-option"
              />
              <label class="contact-page__label-description" for="other-option"
                >Autre</label
              >
            </div>
          </div>
        </div>
        <select
          id=""
          class="contact-page__select-mobile contact-page__input"
          name=""
        >
          <option class="contact-page__option" value="" disabled selected>
            Vous avez une question sur :
          </option>
          <option class="contact-page__option" value="">Compte</option>
          <option class="contact-page__option" value="">
            Retour d’un produit
          </option>
          <option class="contact-page__option" value="">Remboursement</option>
          <option class="contact-page__option" value="">
            Commandes et articles
          </option>
          <option class="contact-page__option" value="">Livraison</option>
          <option class="contact-page__option" value="">Autre</option>
        </select>

        <input
          class="contact-page__last-name contact-page__input"
          type="text"
          placeholder="Nom"
        />

        <input
          class="contact-page__first-name contact-page__input"
          type="text"
          placeholder="Prénom"
        />
        <input
          class="contact-page__email contact-page__input"
          type="email"
          placeholder="E-mail"
        />
      </div>
      <span class="contact-page__paragraph"
        >Saisissez les détails de votre demande. Nous vous répondrons dans les
        plus brefs délais.
      </span>

      <textarea
        id=""
        class="contact-page__message-area"
        name=""
        cols="30"
        rows="10"
        placeholder="Votre message"
      ></textarea>
      <div class="contact-page__attached-file">
        <input id="file-input" type="file" />
        <label class="contact-page__attached-file-label" for="file-input">
          <SvgIcon class="contact-page__attached-file-icon" name="link" />
          <span class="contact-page__attached-file-text"
            >Ajouter une pièce jointe</span
          ></label
        >
      </div>

      <input
        class="contact-page__submit-input"
        type="submit"
        placeholder="Submit"
      />
    </form>
  </div>
</template>

<style lang="scss" scoped>
.contact-page {
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1500px;
  margin-left: auto;
  margin-right: auto;

  &__main-title-large-screen {
    display: none;
  }
  &__select-large-screen {
    display: none;
  }
  &__main-title-mobile {
    font-size: 20px;
    font-weight: 480;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 15px;
  }
  &__container-infos {
    background: url('../assets/images/contact-image-hero.png') top;
    background-size: cover;
  }

  &__container-blocs-infos {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    height: 100%;
    width: 100%;
  }

  &__block-info-text {
    display: flex;
    flex-direction: column;
  }

  &__block-info-title {
    font-weight: 500;
    font-size: 14px;
  }

  &__block-info-description {
    font-size: 13px;
    font-weight: 400;
    margin-top: 4px;
    margin-bottom: 8px;
  }

  &__block-info-link {
    color: $color-pink;
    text-decoration: underline;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
  }
  &__block-info {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    background-color: $color-white;
    border-radius: 10px;
    padding: 10px;
  }
  &__block-info-container-icon {
    background-color: $color-pink;
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    border-radius: 10px;
  }
  &__block-info-icon {
    width: 40px;
    height: 40px;
    padding: 10px;
    color: $color-white;
  }

  &__form {
    padding: 50px 20px 25px 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__container-inputs {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__attached-file {
    width: 100%;
    padding: 15px 18px;
    border: 1px solid #cdcdcd;
    border-radius: 10px;
    display: flex;
    justify-content: center;
  }

  &__attached-file-label {
    display: flex;
    align-items: center;
  }

  &__paragraph {
    font-weight: 500;
    font-size: 13px;
    line-height: 15px;
    color: rgba(0, 0, 0, 0.7);
  }

  &__input {
    width: 100%;
    padding: 15px 18px;
    border: 1px solid #cdcdcd;
    border-radius: 10px;
    font-weight: 500;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.7);
    box-shadow: 0px 0px 0px 0px $color-pink;
    transition: $easeOutQuad;

    &:focus {
      border: 1px solid $color-pink;
      box-shadow: 0px 0px 0px 1px $color-pink;
    }
  }

  &__attached-file-icon {
    fill: none;
    stroke: $color-pink;
    width: 12px;
    height: 12px;
  }

  &__message-area {
    padding: 20px;
    font-weight: 500;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.7);
    border: 1px solid #cdcdcd;
    border-radius: 10px;
    min-width: 100%;
    max-width: 100%;

    &:focus {
      border: 2px solid $color-pink;
    }
  }
  &__submit-input {
    background-color: $color-pink;
    font-family: $font-secondary;
    font-weight: 460;
    font-size: 14px;
    text-transform: uppercase;
    line-height: 44px;
    color: $color-white;
    border: none;
    margin-top: 5px;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
      box-shadow: 6px 6px 0 $color-black;
    }

    &:active {
      color: $color-black;
    }
  }

  &__attached-file-text {
    font-family: $font-secondary;
    font-size: 13px;
    font-weight: 460;
    text-align: center;
    text-transform: uppercase;
    margin-left: 5px;
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
      color: $color-pink;
    }
  }

  #file-input {
    display: none;
  }

  .custom-select::after {
    position: absolute;
    top: 183px;
    right: 10px;
    content: '';
    border: 6px solid transparent;
    border-color: #999 transparent transparent transparent;
  }
}

@include media-lg {
  .contact-page {
    flex-direction: row-reverse;
    justify-content: center;

    &__block-info-title {
      font-size: 16px;
    }

    &__block-info-description {
      font-size: 14px;
    }

    &__label-description {
      font-size: 14px;
      cursor: pointer;
    }

    &__paragraph {
      font-size: 14px;
    }

    &__block-info-link {
      font-size: 14px;
    }

    &__submit-input {
      font-size: 16px;
    }

    &__main-title-large-screen {
      display: block;
      font-family: $font-secondary;
      font-size: 36px;
      font-weight: 480;
      margin-bottom: 20px;
      margin-top: 50px;
    }

    &__main-title-mobile {
      display: none;
    }

    &__select-title {
      font-size: 16px;
      font-weight: 500;
    }
    &__submit-input {
      max-width: 340px;
      margin-top: 10px;
    }

    &__input {
      font-size: 14px;
    }
    &__form {
      padding: 0 20px 65px 20px;
      gap: 20px;
      width: 60%;
    }
    &__attached-file-text {
      font-size: 13px;
    }

    &__block-info {
      max-width: 340px;
      padding: 15px;
    }
    &__container-blocs-infos {
      gap: 35px;
    }

    &__container-infos {
      width: 40%;
      max-width: 1000px;
    }

    &__container-inputs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 23px;
      row-gap: 20px;
    }

    &__email {
      grid-column: span 2;
    }

    &__select-large-screen {
      grid-column: span 2;
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 30px;
    }

    &__select-large-screen-container {
      grid-column: span 2;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      row-gap: 20px;
    }

    &__select-large-screen-title {
      font-size: 16px;
      font-weight: 500;
    }

    &__attached-file {
      max-width: 210px;
    }

    &__select-mobile {
      display: none;
    }

    &__checkbox-question-subject {
      appearance: auto;
    }

    &__box-checkbox {
      display: flex;
      gap: 10px;
      align-items: center;
      cursor: pointer;
    }

    &__checkbox-question-subject {
      -webkit-appearance: none;
      width: 20px;
      height: 20px;
      border: 1.4px solid $color-black;
      outline: none;
      box-shadow: none;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
    }
    &__checkbox-question-subject:checked::before {
      content: '';
      display: inline-block;
      width: 13px;
      height: 13px;
      background-color: $color-pink;
      border-radius: 0;
      position: relative;
      margin: auto;
      border-radius: 3px;
    }
  }
}
@include media-xl {
  .contact-page {
    &__form {
      padding: 0 100px 65px 100px;
      gap: 20px;
      width: 60%;
    }
  }
}
</style>
