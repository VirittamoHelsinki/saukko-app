import React from "react";
import { ApplicationInsights, SeverityLevel } from "@microsoft/applicationinsights-web";
import { ReactPlugin, withAITracking } from "@microsoft/applicationinsights-react-js"
import { createBrowserHistory } from 'history';
import { v4 as uuidv4 } from 'uuid';
import environment from "../utils/environment";

const browserHistory = createBrowserHistory({ basename: '' });

const reactPlugin = new ReactPlugin();
const ai = new ApplicationInsights({
  config: {
    instrumentationKey: environment.appInsightsInstrumentationKey,
    extensions: [reactPlugin],
    extensionConfig: {
      [reactPlugin.identifier]: { history: browserHistory }
    },
    disableFetchTracking: false,
  },
});
if (environment.appInsightsInstrumentationKey) {
  ai.loadAppInsights();
}

export default Component => withAITracking(reactPlugin, Component);
export const { appInsights } = ai;

export class ErrorBoundary extends React.Component {
  state = { hasError: false, errorId: null }

  componentDidCatch(error, errorInfo) {
    const errorId = uuidv4();
    this.setState({ hasError: true, errorId });
    ai.appInsights.trackException({
      error,
      exception: error,
      severityLevel: SeverityLevel.Error,
      properties: { ...errorInfo, errorId }
    });
  }

  render() {
    const { hasError, errorId } = this.state
    const { children } = this.props
    if (hasError) {
      return (
        <div
          test-id="errorboundary"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            height: '100%',
            widows: '100%',
            background: '#00005e',
            color: '#fff'
          }}>
          {environment.appInsightsInstrumentationKey ? (
            <>
              <b>Virhe ladattaessa sovellusta. Ota yhteys tekniseen tukeen.</b>
              <i> Virhekoodi: {errorId}</i>
            </>
          ) : (
            // This error message is only available in localhost / 127.0.0.1
            <div style={{ textAlign: 'center', margin: '0 1em' }}>
              <h2 style={{ margin: '1em', color: '#fff' }}>Upsis!</h2>
              <b>Jokin meni nyt vähän pipariksi. 🧨</b>
              <p style={{ color: '#fff', marginTop: '2em' }}>👨‍💻 Koodivelho, sukella konsoliin ja nappaa tuo bugi kiinni! Lisätietoja odottaa siellä kuin piilotettu easter egg.</p>
              <p style={{ color: '#bbf3bb', marginTop: '1em' }}>Happy bug hunting!</p>
            </div>
          )}
        </div>
      )
    }

    return children
  }
}
