import { inspect } from 'util';
import Exception from './Exception';
import consoleLogger from './consoleLogger';

async function runService(serviceClass, { context = {}, params = {}, logger = consoleLogger }) {
    function logRequest(type, result, startTime) {
        logger(type, {
            service: serviceClass.name,
            runtime: Date.now() - startTime,
            params: inspect(params, { showHidden: false, depth: null }),
            result
        });
    }

    const startTime = Date.now();

    try {

        const result = await new serviceClass({ context }).run(params);
        logRequest('info', JSON.stringify(result), startTime);

        return result;
    } catch (error) {
        const type = error instanceof Exception ? 'info' : 'error';
        logRequest(type, error, startTime);

        throw error;
    }
}


function makeServiceRunner(serviceClass, paramsBuilder, contextBuilder, logger = consoleLogger) {
    return async function serviceRunner(req, res, next) {
        const resultPromise = runService(serviceClass, {
            logger,
            params: paramsBuilder && paramsBuilder(req, res),
            context: contextBuilder && contextBuilder(req, res)
        });
        return renderPromiseAsJson(req, res, resultPromise, logger);
    };
}


async function renderPromiseAsJson(req, res, promise, logger = consoleLogger) {
    try {
        const data = await promise;

        data.status = true;

        return res.send(data);
    } catch (error) {
        if (error instanceof Exception) {
            res.send({
                status: false,
                error: error.toHash()
            });
        } else {
            logger(
                'error',
                {
                    'REQUEST_URL': req.url,
                    'REQUEST_PARAMS': req.params,
                    'REQUEST_BODY': req.body,
                    'ERROR_STACK': error.stack
                }
            );

            res.send({
                status: false,
                error: {
                    code: 'SERVER_ERROR',
                    message: 'Please, contact your system administartor!'
                }
            });
        }
    }
}


export default {
    makeServiceRunner,
    runService,
    renderPromiseAsJson
};