const InfoList = ({ title, data }) => (
  <div className='infoList__container'>
    <ul>
      <h1>{title}</h1>
      {data.map((row, index) => (
        <li
          key={index}
          style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}
        >
          <h4>{row.title}</h4>
          <div>{row.content}</div>
        </li>
      ))}
    </ul>
  </div>
);

export default InfoList;
