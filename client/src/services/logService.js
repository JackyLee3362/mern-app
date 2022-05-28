import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing"; // 8.15
function init() {
  // Sentry.init({
  //   dsn: "https://7d4e5984dcc44c41bdddd75faab65b97@o1261219.ingest.sentry.io/6438716",
  //   integrations: [new BrowserTracing()],
  //   // Set tracesSampleRate to 1.0 to capture 100%
  //   // of transactions for performance monitoring.
  //   // We recommend adjusting this value in production
  //   tracesSampleRate: 1.0,
  // });
}

function log(error) {
  // Sentry.captureEvent(error);
  console.log("loggerService: ", error);
}

export default {
  init,
  log,
};
