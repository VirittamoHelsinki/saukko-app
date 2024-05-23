import React, { useEffect } from 'react';

const WarningOnLeave = () => {

  useEffect(() => {
    const unblock = history.block((tx) => {
      // Navigation was blocked! Let's show a confirmation dialog
      // so the user can decide if they actually want to navigate
      // away and discard changes they've made in the current page.
      const url = tx.location.pathname;
      if (window.confirm(`Are you sure you want to leave the page without saving?`)) {
        // Unblock the navigation.
        unblock();

        // Retry the transition.
        tx.retry();
      }
    });

    return () => {
      // Clean up the block when the component unmounts.
      unblock();
    };
  }, [history]);

  return (
    <div>
      <p>This component blocks navigation and shows a confirmation dialog when the user tries to leave the page without saving.</p>
    </div>
  );
};

export default WarningOnLeave;
