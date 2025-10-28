import 'dayjs';

declare module 'dayjs' {
  interface Dayjs {
    utc(): Dayjs;
  }
}

declare module 'dayjs/plugin/utc' {
  const utc: any;
  export default utc;
}
