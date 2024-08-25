import { format } from "date-fns";
import { uk } from "date-fns/locale";

export const formatDate = (date) => {
  return format(date, "dd MMMM, yyyy | HH:mm", { locale: uk });
};
