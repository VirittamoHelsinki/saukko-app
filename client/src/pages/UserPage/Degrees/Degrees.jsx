const Degrees = (props) => {
  return (
    <section className="userPage__container--degrees">
      <div className="userPage__container--degrees-title">
        <h2>Muut tutkinnot/e-Perusteet</h2>
        <a href="/">Tutustu</a>
      </div>
      <div className="userPage__container--degrees-list">
        {props.data.map((item, index) => (
          <div key={index} className="userPage__container--degrees-list-item">
            <div className="userPage__container--degrees-list-item-top">
              <h3>{item.name}</h3>
            </div>
            <div className="userPage__container--degrees-list-item-bottom">
              <p>{item.points + " osp"}</p>
              <li>&#8250;</li>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Degrees;
