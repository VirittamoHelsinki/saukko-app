import NotificationModal from '../NotificationModal/NotificationModal';
import Button from '../Button/Button';

import { Typography, IconButton, Box, DialogContent, TextField } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const DegreeDescriptionModal = ({
    isDegreeDescriptionModalOpen,
    handleCloseDegreeDescriptionModal,
    degreeDetails,
    setDegreeDetails,
    saveDegreeDescription
}) => {
    return (
        <NotificationModal
            type='info'
            open={isDegreeDescriptionModalOpen}
            onClose={handleCloseDegreeDescriptionModal}
            hideIcon={true}
            dialogStyles={{
                dialogTitle: {
                    marginRight: '5px',
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
                    Tutkinnon suorittaneen osaamisen muokkaus
                </Typography>
            }
            body={
                <>
                    <IconButton
                        aria-label='close'
                        onClick={handleCloseDegreeDescriptionModal}
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
                            {/*edit modal description */}
                            <TextField
                                value={
                                    degreeDetails.description.fi
                                        ? degreeDetails.description.fi
                                        : ''
                                }
                                id='outlined-multiline-static'
                                multiline={degreeDetails.description.fi && degreeDetails.description.fi > 5}
                                onChange={(event) => {
                                    setDegreeDetails((prevState) => ({
                                        ...prevState,
                                        description: {
                                            ...prevState.description,
                                            fi: event.target.value,
                                        },
                                    }))
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderRadius: '0',
                                            borderColor: 'black',
                                            borderWidth: '1px',
                                        },
                                    },
                                    width: '100%',
                                    backgroundColor: 'white',
                                    marginTop: '8px',
                                    overflow: 'auto',
                                    height: '200px',
                                }}
                            >
                            </TextField>
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
                             onClick={saveDegreeDescription}
                             handleClose={handleCloseDegreeDescriptionModal}
                            ></Button>
                        </Box>
                    </DialogContent>
                </>
            }
        />

    )
}

export default DegreeDescriptionModal;