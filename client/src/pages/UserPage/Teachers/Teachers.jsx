const Teachers = (props) => {
  return (
    <section className="userPage__container--teachers">
      <div className="userPage__container--teachers-title">
        <h2>Opettajat ja ohjaajat</h2>
      </div>
      <div className="userPage__container--teachers-list">
        {props.data.map((item, index) => (
          <div key={index} className="userPage__container--teachers-list-item">
            <h3>{item.name}</h3>
            <p>{item.position}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Teachers;
