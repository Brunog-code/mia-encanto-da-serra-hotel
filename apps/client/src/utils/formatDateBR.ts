import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const formatDateBR = (data: string | undefined) => {
  if (!data) return "";

  // interpreta como UTC, evitando subtração de 3h
  return dayjs.utc(data).format("DD/MM/YYYY");
};
