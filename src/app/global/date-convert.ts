import moment from 'moment';

export function DateConvert(date: string | Date, format?: string) {
    const _format = format ?? 'D MMM YY, HH:mm';
    return moment(date).format(_format);
}
