export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const calculateNextPMDate = (lastDate, interval) => {
  if (!lastDate) {
    return "";
  }

  const date = new Date(lastDate + "T00:00:00");

  if (isNaN(date.getTime())) {
    return "";
  }

  const originalDay = date.getDate();

  if (interval === "weekly") {
    date.setDate(date.getDate() + 7);
  } else {
    if (interval === "monthly") {
      date.setDate(1);
      date.setMonth(date.getMonth() + 1);
    } else if (
      interval === "3" ||
      interval === "6" ||
      interval === "12"
    ) {
      date.setDate(1);
      date.setMonth(date.getMonth() + Number(interval));
    } else {
      return "";
    }

    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();

    if (originalDay > lastDay) {
      date.setDate(lastDay);
    } else {
      date.setDate(originalDay);
    }
  }

  return formatDate(date);
};