import { CORRELATION_ID } from '../../utils/constants';

const logHttp = (correlationId: string, route: string, method: string) => {
  return `Route: ${route} | Method: ${method} | ${CORRELATION_ID}: ${correlationId}`;
};

const logError = (correlationId: string, message: string, stack?: string) => {
  let print = `Payload: "${message}" \n${CORRELATION_ID}: ${correlationId}`;
  if (stack) {
    print += `\nStack: ${stack}`;
  }
  return print;
};

export { logHttp, logError };
