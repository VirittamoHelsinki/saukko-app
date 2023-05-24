import React from 'react'

import WavesHeader from "../../components/Header/WavesHeader";

function ProfilePage() {
  return (
    <main className="profilePage__wrapper">
        <WavesHeader title="Profiili" fill="#9fc9eb" />
        <section className="profilePage__info">
          <div className="profilePage__info__name">
            <h1>Nimi</h1>
          </div>
          <div className="profilePage__info__email">
            <h1>Sähköposti</h1>
          </div>
          <div className="profilePage__info__changePassword">
            <h1>Vaihda Salasana</h1>
          </div>
        </section>
        <div className="profilePage__logOut"></div>
    </main>
  )
}

export default ProfilePage