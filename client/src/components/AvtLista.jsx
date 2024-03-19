import { useState, useContext } from "react";

import PerformancesFeedback from "./PerformaceFeedback/PerformancesFeedback/PerformancesFeedback";
import TeacherPerformanceFeedBack from "./PerformaceFeedback/TeacherPerformance/TeacherPerformanceFeedBack";

import { Icon } from '@iconify/react';

import AuthContext from "../store/context/AuthContext";

export const AvtLista = (assess) => {
  const auth = useContext(AuthContext);
  const user = auth.user;

  // Modal for showing criteria
  const [criteriaModalContent, setCriteriaModalContent] = useState([]);

  const handleOpenCriteriaModal = (criteria) => {
    setCriteriaModalContent(criteria);
    setIsCriteriaModalOpen(criteria.length >= 0 || isCriteriaModalOpen);
  };

    return (
        <div>
            <li key={assess._id}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        margin: '0 15px 0 0',
                    }}
                >
                    <div>
                        <p className='para-title-style'>
                            {assess.name.fi}
                            answer : {assess.answer}
                        </p>
                    </div>
                    <div>
                        <Icon
                            icon='material-symbols:info'
                            color='#1769aa'
                            style={{ verticalAlign: 'middle', fontSize: '21px' }}
                            cursor={'pointer'}
                            onClick={() => handleOpenCriteriaModal(assess.criteria)}
                        />
                    </div>
                </div>
                {user?.role === 'teacher' ? (
                    <TeacherPerformanceFeedBack
                        selectedValues={selectedValues}
                        setSelectedValues={setSelectedValues}
                        //unit={unit}
                        //unitId={unit._id}
                        setSelectedUnitId={setSelectedUnitId}
                        selectedUnitId={selectedUnitId}
                        selectedAssessmentId={selectedAssessmentId}
                        setsetSelectedAssessmentId={setSelectedAssessmentId}
                        hasUnsavedChanges={hasUnsavedChanges}
                        setHasUnsavedChanges={setHasUnsavedChanges}
                    />
                ) : (
                    <PerformancesFeedback
                        selectedValues={selectedValues}
                        setSelectedValues={setSelectedValues}
                        //unit={unit}
                        //unitId={unit._id}
                        setSelectedUnitId={setSelectedUnitId}
                        selectedUnitId={selectedUnitId}
                        setSelectedAssessmentId={setSelectedAssessmentId}
                        selectedAssessmentId={selectedAssessmentId}
                        hasUnsavedChanges={hasUnsavedChanges}
                        setHasUnsavedChanges={setHasUnsavedChanges}
                    />
                )}
            </li>
        </div>
    )
}
