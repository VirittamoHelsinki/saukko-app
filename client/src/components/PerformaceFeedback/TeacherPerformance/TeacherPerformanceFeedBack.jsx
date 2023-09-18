// import React, { useContext, useState } from 'react';
// import img1 from '../../../assets/Vector.png'
// import img2 from '../../../assets/label.png'
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import AuthContext from '../../../utils/context/AuthContext';



// const TeacherPerformanceFeedBack = ({ paragraphText }) => {

//   const [selectedRadio, setSelectedRadio] = useState()
//   const auth = useContext(AuthContext)
//   const user = auth.user;

//   const infodata = [
//     {
//       info: 'Osaamistaso'
//     },
//     {
//       info: 'TPO:n havainto'
//     }
//   ]

//   const handleRadioChange = (e) => {
//     setSelectedRadio(e.target.value);
//   }

//   const getBackgroundColor = () => {
//     if (selectedRadio === 'top' || selectedRadio === 'start') {
//       if (user?.role === 'teacher') {
//         return '#FFF4B4'
//       }
//     }
//     return '#F2F2F2';
//   }

//   return (
//     <main className='feedback__wrapper' style={{ backgroundColor: getBackgroundColor() }}>

//       <div className='first-div-style'>

//         <p style={{ width: '38%', marginTop: '16px', paddingLeft: '10px' }}>{paragraphText}</p>
//         <div className='title-style'>
//           <p style={{ padding: '2px', paddingBottom: '4px' }}>Osaa itsenäisesti</p>
//           <img style={{ width: '20px', height: '20px' }} src={img1} alt="vector" />
//         </div>
//         <div className='title-style'>
//           <p style={{ padding: '2px', paddingBottom: '4px' }}>Osaa ohjatusti</p>
//           <img style={{ width: '20px', height: '20px' }} src={img2} alt="label" />
//         </div>
//       </div>
//       <div className='first-div-style'>
//         <p style={{ width: '42%' }}>Opettajan merkinta</p>
//         <div>
//           <FormControl>
//             <RadioGroup
//               row
//               aria-labelledby="demo-form-control-label-placement"
//               name="position"

//             >
//               <FormControlLabel
//                 value="top"
//                 control={<Radio />}
//                 sx={{
//                   '& .MuiSvgIcon-root': {
//                     marginRight: '70px'
//                   },
//                 }}
//                 onChange={handleRadioChange}
//               />
//               <FormControlLabel
//                 value="start"
//                 control={<Radio />}
//                 sx={{
//                   '& .MuiSvgIcon-root': {
//                     marginRight: '7px'
//                   },
//                 }}
//                 onChange={handleRadioChange}
//               />
//             </RadioGroup>
//           </FormControl>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default TeacherPerformanceFeedBack;


import React, { useContext, useState } from 'react';
import img1 from '../../../assets/Vector.png'
import img2 from '../../../assets/label.png'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import AuthContext from '../../../store/context/AuthContext';


const TeacherPerformanceFeedBack = () => {
  const [selectedRadio, setSelectedRadio] = useState();
  const auth = useContext(AuthContext);
  const user = auth.user;

  const infodata = [
    {
      info: 'Osaamistaso'
    },
    {
      info: 'TPO:n havainto'
    }
  ];

  const handleRadioChange = (e) => {
    setSelectedRadio(e.target.value);
  };

  const getBackgroundColor = () => {
    if (selectedRadio === 'top' || selectedRadio === 'start') {
      if (user?.role === 'teacher') {
        return '#FFF4B4';
      }
    }
    return '#F2F2F2';
  };

  return (
    <main className='feedback__wrapper' style={{ backgroundColor: getBackgroundColor() }}>
      <div className='first-div-style' style={{ width: '60%', marginLeft: '140px' }}>
        <p style={{ padding: '4px' }}>Osaa itsenäisesti</p>
        <p style={{ padding: '2px' }}>Osaa ohjatusti</p>
      </div>
      {infodata.map((item, index) => (
        <div key={index} className='first-div-style'>
          <p style={{ width: '38%', marginTop: '16px' }}>{item.info}</p>
          <div className='title-style'>

            <img style={{ width: '20px', height: '20px', marginRight: '60px', marginTop: '16px' }} src={img1} alt="vector" />
          </div>
          <div className='title-style'>

            <img style={{ width: '20px', height: '20px', marginRight: '40px', marginTop: '16px' }} src={img2} alt="label" />
          </div>

        </div>
      ))}
      <div className='first-div-style'>
        <p style={{ width: '42%', paddingLeft: '4px' }}>Opettajan merkinta</p>
        <div>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-form-control-label-placement"
              name="position"
            >
              <FormControlLabel
                value="top"
                control={<Radio />}
                sx={{
                  '& .MuiSvgIcon-root': {
                    marginRight: '70px'
                  },
                }}
                onChange={handleRadioChange}
              />
              <FormControlLabel
                value="start"
                control={<Radio />}
                sx={{
                  '& .MuiSvgIcon-root': {
                    marginRight: '24px'
                  },
                }}
                onChange={handleRadioChange}
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    </main>
  );
};

export default TeacherPerformanceFeedBack;


