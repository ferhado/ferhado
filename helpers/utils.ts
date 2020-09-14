export function clean_url(url) {
  return url.replace(/([^:]\/)\/+/g, "$1");
}

//isDate
export function isDefined(arg) {
  return (typeof arg !== 'undefined');
}

export function isDate(arg) {
  return new Date(arg).toString() !== 'Invalid Date';
}

export function isObject(arg: any) {
  return (typeof arg === 'object' && arg !== null && !(arg instanceof Array)) ? arg : false;
}

export function isArray(arg: any) {
  return (typeof arg === 'object' && arg !== null && (arg instanceof Array)) ? arg : false;
}

export function isFunction(arg: any) {
  return typeof arg === 'function';
}

export function uniqid() {
  return (new Date().valueOf().toString(16) + Math.random().toString(32).substr(2)).padEnd(22, 'x')
}

export function isEmpty(arg: any) {
  return length(arg) === 0;
}

//Object keys
export function keys(arg) {
  try {
    return Object.keys(arg);
  } catch (e) { }
}

//Object Values
export function values(arg) {
  try {
    return Object.values(arg);
  } catch (e) { }
}

//Object Length
export function length(arg) {
  try {
    return (typeof arg === "object" && arg !== null) ? Object.keys(arg).length : arg.length
  } catch (e) { }
}

// Date
export function DateDiff(endDate, startDate?) {
  let distance, days, hours, minutes, seconds, in_hours, in_minutes, in_seconds;

  startDate = new Date(startDate || Date.now());
  endDate = new Date(endDate);
  distance = endDate.getTime() - startDate.getTime();
  in_seconds = Math.floor(distance / 1000);
  in_minutes = Math.floor(in_seconds / 60);
  seconds = in_seconds % 60;
  in_hours = Math.floor(in_minutes / 60);
  minutes = in_minutes % 60;
  days = Math.floor(in_hours / 24);
  hours = in_hours % 24;

  return {
    days,
    hours,
    in_hours,
    minutes,
    in_minutes,
    seconds,
    in_seconds,
    distance
  }

}

export function DateAddDay(date, days = 1) {
  let d = new Date(date);
  return new Date(d.setDate(d.getDate() + days));
}

export function DateRemoveDay(date, days = 1) {
  let d = new Date(date);
  return new Date(d.setDate(d.getDate() - days));
}

export function DateAddMonth(date, months = 1) {
  let d = new Date(date);
  return new Date(d.setMonth(d.getMonth() + months));
}

export function DateRemoveMonth(date, months = 1) {
  let d = new Date(date);
  return new Date(d.setMonth(d.getMonth() - months));
}

export function DateAddYear(date, years = 1) {
  let d = new Date(date),
    year = d.getFullYear(),
    month = d.getMonth(),
    day = d.getDate();
  return new Date(year + years, month, day);
}

export function DateRemoveYear(date, years = 1) {
  let d = new Date(date),
    year = d.getFullYear(),
    month = d.getMonth(),
    day = d.getDate();
  return new Date(year - years, month, day);
}

//get an array of Dates between start date and end date
export function DatesBetween2Dates(startDate, endDate) {
  let result = [];
  let start = new Date(startDate);
  let end = new Date(endDate);
  while (start <= end) {
    result.push(new Date(start));
    start.setDate(start.getDate() + 1);
  }
  return result;
}

//First Day Of Month
export function firstDayOfMonth(date?) {
  date = date ? new Date(date) : new Date();
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

//Last Day Of Month
export function lastDayOfMonth(date?) {
  date = date ? new Date(date) : new Date();
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function weekOfYear(date?) {
  let d = (date ? new Date(date) : new Date()), week;
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
  week = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d.getTime() - week.getTime()) / 86400000 - 3 + (week.getDay() + 6) % 7) / 7);
}


export function toJson(arg) {
  return JSON.stringify(arg);
}

export function fromJson(arg) {
  try {
    return JSON.parse(arg.replace(/\n|\r/g, ""));
  } catch (e) { }
}

//Sum Array
export function array_sum(arg) {
  if (!isArray(arg)) return;
  return arg.reduce((pv, cv) => Number(pv) + Number(cv));
}

export function copy(data: any) {
  if (data) return JSON.parse(JSON.stringify(data))
}

//Print Element
export function printElement(element, callback = null) {

  let ElementToPrint = document.getElementById('ElementToPrint');
  element = document.getElementById(element).cloneNode(true);

  if (!ElementToPrint) {
    ElementToPrint = document.createElement('div');
    ElementToPrint.id = "ElementToPrint";
    document.body.appendChild(ElementToPrint);
  }

  ElementToPrint.appendChild(element);
  window.print();
  ElementToPrint.innerHTML = "";

  if (isFunction(callback)) {
    setTimeout(() => { callback(); }, 500);
  }

}


export function isValidImage(type) {
  return /image\/(png|jpg|jpeg)/.test(type);
}

export function image2base64(file) {
  if (!isValidImage(file.type)) return;
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result);
    };
  })
}