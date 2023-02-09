const Accomplishments = (props) => {
  return (
    <section className="userPage__container--accomplishments">
      <div className="userPage__container--accomplishments-title">
        <h2>Omat suoritukset</h2>
        <a href="/">Jatka</a>
      </div>
      <div className="userPage__container--accomplishments-degrees">
        <div className="userPage__container--accomplishments-degrees-item">
          <h3>{props.data[0].tasksDone}</h3>
          <p>Tehtävää tehty</p>
        </div>
        <div className="userPage__container--accomplishments-degrees-item">
          <h3>{props.data[0].combinedTasks}</h3>
          <p>Yhteensä</p>
        </div>
      </div>
    </section>
  );
};

export default Accomplishments;
