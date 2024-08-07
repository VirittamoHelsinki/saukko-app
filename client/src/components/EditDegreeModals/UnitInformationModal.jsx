import {
  Typography,
  IconButton,
  Box,
  DialogContent,
  TextField,
} from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import NotificationModal from '../NotificationModal/NotificationModal';
import Button from '../Button/Button';
import { Icon } from '@iconify/react';
import ATVAndCriteriaModal from './ATVAndCriteriaModal';

const UnitInformationModal = ({
  handleCloseUnitModal,
  unit,
  unitId,
  assessmentId,
  isAssessmentModalOpen,
  handleDeleteClick,
  handlePenClick,
  handleATVClick,
  saveUnitName,
  saveATVAndCriteria,
  isUnitModalOpen,
  setDegreeDetails,
  handleCloseAssessmentModal,
  degreeDetails,
}) => {
  return (
    <NotificationModal
      type='info'
      open={isUnitModalOpen}
      onClose={handleCloseUnitModal}
      hideIcon={true}
      dialogStyles={{
        dialogTitle: {
          marginLeft: '5px',
        },
      }}
      title={
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginRight: '25px',
            marginLeft: '15px',
          }}
        >
          Tutkinnonosan muokkaus
        </Typography>
      }
      // sx={{ width: '100%' }}
      body={
        <>
          <IconButton
            aria-label='close'
            onClick={handleCloseUnitModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'black',
              marginLeft: '2rem',
            }}
          >
            <CancelOutlinedIcon />
          </IconButton>
          <DialogContent>
            <Box>
              {/* Degree unit's name */}
              <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>
                Tutkinnonosan nimi
              </Typography>
              <TextField
                key={unit._id}
                value={unit._id === unitId ? unit.name.fi : ''}
                id='outlined-multiline-static'
                multiline={true}
                onChange={(event) => {
                  // Modify unit name TextField value changes
                  setDegreeDetails((prevState) => ({
                    ...prevState,
                    units: prevState.units?.map((u) => {
                      if (u._id === unitId) {
                        return {
                          ...u,
                          name: {
                            ...u.name,
                            fi: event.target.value,
                          },
                        };
                      }
                      return u;
                    }),
                  }));
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderRadius: '0',
                      borderColor: 'black',
                      borderWidth: '2px',
                    },
                  },
                  width: '100%',
                  backgroundColor: 'white',
                  marginTop: '8px',
                  overflow: 'auto',
                }}
              />
              <Button
                text='Tallenna'
                variant='contained'
                style={{
                  marginLeft: '25%',
                  marginTop: '30px',
                  marginBottom: '30px',
                  width: '50%',
                  backgroundColor: '#0000BF',
                  color: 'white',
                  border: 'none',
                }}
                onClick={saveUnitName}
              />

              {/* Degree unit's ATV */}
              <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>
                Ammattitatitovaatimukset ja kriteerit
              </Typography>
            </Box>
            <Box>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '100px',
                }}
              >
                {unit.assessments &&
                  unit.assessments.map((assessment, index) => (
                    <div
                      key={index}
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <Box
                        sx={{
                          backgroundColor: 'white',
                          padding: '16px',
                          marginTop: '8px',
                          flexGrow: 1,
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span>
                          {index + 1}. {assessment.name.fi}
                        </span>
                        <span style={{ display: 'flex', gap: '10px' }}>
                          <Icon
                            onClick={handleDeleteClick}
                            icon='material-symbols:delete-outline'
                            color='A0A0A0'
                            height='20'
                            gap='16px'
                            preserveAspectRatio='xMinYMid meet'
                          />
                          <Icon
                            onClick={() => {
                              handlePenClick('atv');
                              handleATVClick(assessment._id);
                            }}
                            icon='uil:pen'
                            color='#0000bf'
                            height='18'
                            preserveAspectRatio='xMinYMid meet'
                          />

                          {assessment._id === assessmentId &&
                            isAssessmentModalOpen && (
                              // Modal for ATV and criteria
                              <ATVAndCriteriaModal
                                assessment={assessment}
                                assessmentId={assessmentId}
                                unit={unit}
                                unitId={unitId}
                                handleCloseAssessmentModal={
                                  handleCloseAssessmentModal
                                }
                                setDegreeDetails={setDegreeDetails}
                                degreeDetails={degreeDetails}
                                saveATVAndCriteria={saveATVAndCriteria}
                                isAssessmentModalOpen={isAssessmentModalOpen}
                                handleCloseUnitModal={handleCloseUnitModal}
                                handleDeleteClick={handleDeleteClick}
                              />
                            )}
                        </span>
                      </Box>
                    </div>
                  ))}

                <Box
                  style={{
                    //marginTop: '-18px',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Icon
                    icon='bxs:plus-circle'
                    width='2.2rem'
                    height='2.2rem'
                    color='#0000BF'
                  />
                </Box>
              </Box>
            </Box>
          </DialogContent>
        </>
      }
    />
  );
};

export default UnitInformationModal;
