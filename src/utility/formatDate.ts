export const formatdate = (date: Date) => {
  const fecha = new Date(date);
  fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());

  const d = new Date(fecha);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};
