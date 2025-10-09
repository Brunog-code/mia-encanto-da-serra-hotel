import dayjs from "dayjs";

export const formatDateBR = (data: string | undefined) => {
  if (!data) return "";

  return dayjs(data).format("DD/MM/YYYY");
};
