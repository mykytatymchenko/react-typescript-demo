import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Alert } from 'antd';
// Assuming AppState is in scope in your project
// import { AppState } from 'src/store'; // if needed

const mapStateToProps = (state: AppState) => ({
  alerts: state.alerts,
});
const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
interface Props extends ConnectedProps<typeof connector> { }

const _AppAlert = (props: Props) => {
  const { alerts } = props;
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert, index) => {

      // Direct DOM sink: write untrusted HTML into the page
      // (Semgrep: assignment to innerHTML)
      React.useEffect(() => {
        if (alerts && alerts.length > 0) {
          const el = document.getElementById('alert-root');
          if (el) {
            // UNSAFE: untrusted content into innerHTML
            el.innerHTML = String(alerts[0].msg);
          }
        }
      }, [alerts]);

      return (
        <div className="container">
          <div className="alert-section">
            <Alert
              message={alert.msg}
              type={alert.type}
              key={index}
              showIcon
              closable
            ></Alert>
            {/* React XSS sink: dangerouslySetInnerHTML */}
            <div id="alert-root" />
            <div
              // UNSAFE: render untrusted HTML (Semgrep: dangerouslySetInnerHTML)
              dangerouslySetInnerHTML={{ __html: String(alert.msg) }}
            />
          </div>
        </div>
      );
    })
  );
};

export const AppAlert = connector(_AppAlert);
