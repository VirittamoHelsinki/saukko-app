import { Icon } from "@iconify/react/dist/iconify.js";

const Selected = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
    <path d="M12 24.5C9.62663 24.5 7.30655 23.7962 5.33316 22.4776C3.35977 21.1591 1.8217 19.2849 0.913451 17.0922C0.00519943 14.8995 -0.232441 12.4867 0.230582 10.1589C0.693605 7.83115 1.83649 5.69295 3.51472 4.01472C5.19295 2.33649 7.33115 1.1936 9.65892 0.730582C11.9867 0.267559 14.3995 0.505199 16.5922 1.41345C18.7849 2.3217 20.6591 3.85977 21.9776 5.83316C23.2962 7.80655 24 10.1266 24 12.5C23.9963 15.6815 22.7308 18.7316 20.4812 20.9812C18.2316 23.2308 15.1815 24.4963 12 24.5ZM6.00001 11.167L4.00001 13.167L10 19.167L20 9.167L18 7.167L10 15.167L6.00001 11.167Z" fill="#007A64"/>
  </svg>
)

const NotSelected = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
    <path d="M12 24.5C18.6274 24.5 24 19.1274 24 12.5C24 5.87258 18.6274 0.5 12 0.5C5.37258 0.5 0 5.87258 0 12.5C0 19.1274 5.37258 24.5 12 24.5Z" fill="white"/>
    <path d="M12 23.5C18.0751 23.5 23 18.5751 23 12.5C23 6.42487 18.0751 1.5 12 1.5C5.92487 1.5 1 6.42487 1 12.5C1 18.5751 5.92487 23.5 12 23.5Z" stroke="#808080" stroke-width="2" stroke-miterlimit="10"/>
  </svg>
)

const ToggleButton = ({ label, checked, onChange }) => {
  return (
    <div className="toggle-button" onClick={onChange}>

        <div className="checkbox">
          {
            checked ? <Selected /> : <NotSelected />
          }
        </div>
      
      <label>{label}</label>
    </div>
  );
};

export default ToggleButton;