import React,{ useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import { updateDegree } from '../../api/degree';
import InternalApiContext from '../../store/context/InternalApiContext';

import { Icon } from '@iconify/react';
import DialogContent from '@mui/material/DialogContent';

const AddDescriptionWithPopUp =({ allInternalDegrees})=>{
    const { degreeId } = useParams();
    const [degreeDetails, setDegreeDetails] = useState(null);
    const [description, setDescription] = useState(null);
    const [isDegreeNameModalOpen, setIsDegreeNameModalOpen] = useState(false);

    
    /* useEffect(() => {
        // Fetch degreeDetails based on degreeId and set the state
        const fetchedDegreeDetails = allInternalDegrees.find(
          (degree) => degree._id === degreeId
        );
        setDegreeDetails(fetchedDegreeDetails);
      }, [allInternalDegrees, degreeId]);

    console.log('degreeDetails in AddDiscription.jsx',degreeDetails);
 */

    
    const handlePenClick = (area) => {
        switch (area) {
            case 'degreeDetails':
                setIsDegreeNameModalOpen(true);
                break;
        // Add more cases for different areas as needed
                default:
        // Handle default case if necessary
            }
        };


    const handleCloseDegreeNameModal = () => {
        setIsDegreeNameModalOpen(false);
      };

    return(
        <div className='summary__container--box unit-description'>
          <div className='description-content'>
            {degreeDetails.description.fi ? (
              degreeDetails.description.fi
            ) : (
              <p>No description data.</p>
            )}
          </div>
          <div>
            <div className='circle-wrap-icon'>
              <Icon
                onClick={handlePenClick}
                icon='uil:pen'
                color='#0000bf'
                height='18'
                preserveAspectRatio='xMinYMid meet'
              />
            </div>
          </div>
        </div>
    )
}

export default AddDescriptionWithPopUp;
