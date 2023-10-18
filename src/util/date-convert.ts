import moment from 'moment';

export function DateConvert(date: string | Date, format?: string) {
    const _format = format ?? 'D MMM YY, HH:mm';
    return moment(date).format(_format);
}

export function MillisecondsConvert(milliseconds: number) {
    // const time = moment.duration(milliseconds).asMinutes();
    // return `${time.minutes()}:${time.seconds()}`;
    return moment.utc(milliseconds).format('mm:ss');
}
