const {createLogger, transports, format } = require('winston');
const { combine, timestamp, printf, label, simple, colorize } = format;

const printFormat = printf(({ timestamp, label, level, message }) => {
    return `${timestamp} [${label}] ${level} : ${message}`;
});

const printLogFormat = {
    file: combine(
        label({
            label: "백엔드 맛보기",
        }),
        // colorize(),
        timestamp({
            format: "YYYY-MM-DD HH:mm:dd",
        }),
        printFormat,
    ),
    console: combine(
        colorize(),
        simple(),
    )
};

const opts = {
    file: new transports.File({ // 로그를 파일로 관리
        filename: "access.log",
        dirname: "./logs/",
        level: "info",
        format: printLogFormat.file,
    }),
    console: new transports.Console({ // 로그를 콘솔로 출력
        level: "info",
        format: printLogFormat.console,
    }),
}

const logger = createLogger({
    transports: [opts.file],
});

if (process.env.NODE_ENV !== "production"){
    logger.add(opts.console);
};

logger.stream = {
    write: (message) => logger.info(message),
};
module.exports = logger;