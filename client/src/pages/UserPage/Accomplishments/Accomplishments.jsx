const Accomplishments = (props) => {
  return (
    <section className="userPage__container--accomplishments">
      <div className="userPage__container--accomplishments-title">
        <h2>Omat suoritukset</h2>
        <a href="/">Jatka</a>
      </div>
      <div className="userPage__container--accomplishments-degrees">
        {props.data.map((item, index) => (
          <div
            key={index}
            className="userPage__container--accomplishments-degrees-item"
          >
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="userPage__container--accomplishments-degree-progressBar">
              <p>{item.progress + "%"}</p>
              <div className="temp-progress-bar"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Accomplishments;
