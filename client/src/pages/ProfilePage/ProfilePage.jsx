import React from 'react'

import WavesHeader from "../../components/Header/WavesHeader";
import Button from "../../components/Button/Button";

function ProfilePage() {
  return (
    <main className="profile__wrapper">
        <WavesHeader 
            title="Saukko"
            secondTitle="Profiili"
            disabled={true} 
        />

        <section className="profile__container">
            <div className="profile__container--name">
                <p>Nimi</p>
            </div>
            <div className="profile__container--email">
                <p>Sähköposti</p>
            </div>
            <div className="profile__container--password">
                <p>Vaihda salasana</p>
            </div>
        </section>
        <section className="profile__logout">
            <Button />
        </section>
    </main>

  )
}

export default ProfilePage