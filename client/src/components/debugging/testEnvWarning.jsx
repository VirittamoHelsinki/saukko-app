import environment from "../../utils/environment";

const TestEnvWarning = () => {
  if (!environment.showTestEnvironmentWarning) return null;
  
  return (
    <div style={{ position: 'sticky', height: '1em', width: '100%', background: 'blue', zIndex: '999999', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {environment.environentName} MODE
    </div>
  )
}

export default TestEnvWarning;
