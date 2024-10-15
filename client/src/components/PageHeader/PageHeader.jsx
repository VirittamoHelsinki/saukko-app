const PageHeader = ({ title, subTitle }) => {
  return (
    <div className="page-header">
      <p className="page-header__title">{title}</p>
      <p className="page-header__subtitle">{subTitle}</p>
    </div>
  );
};

export default PageHeader;