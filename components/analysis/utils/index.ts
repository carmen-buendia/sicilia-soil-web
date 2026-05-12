export const getMetricColor = (metricId: string): string => {
  switch (metricId) {
    case "moisture":
      return "text-oliveGreen";
    case "temperature":
      return "text-sicilian-red";
    case "light":
      return "text-wheatGold";
    default:
      return "text-charcoalGray";
  }
};

export const getMetricBgColor = (metricId: string): string => {
  switch (metricId) {
    case "moisture":
      return "bg-oliveGreen/10 border-oliveGreen/20";
    case "temperature":
      return "bg-sicilian-red/10 border-sicilian-red/20";
    case "light":
      return "bg-wheatGold/10 border-wheatGold/20";
    default:
      return "bg-offWhite border-oliveGreen/15";
  }
};

export const getMetricUnit = (metricId: string): string => {
  switch (metricId) {
    case "moisture":
      return "%";
    case "temperature":
      return "°C";
    case "light":
      return "%";
    default:
      return "";
  }
};

export const getMetricName = (metricId: string): string => {
  switch (metricId) {
    case "moisture":
      return "Humedad";
    case "temperature":
      return "Temperatura";
    case "light":
      return "Luz Solar";
    default:
      return "";
  }
};
