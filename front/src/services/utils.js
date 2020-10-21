export const parseDate = (date) => {
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth();
  const newDate = `${day} / ${month + 1}`;

  return newDate;
}

export const parseAdress = (adress, model) => {

}
