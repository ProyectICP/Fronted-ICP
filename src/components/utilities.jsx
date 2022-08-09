import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

export const genId = function (id) {
  id = id || "-1";
  if (id === "-1" || id === "new") {
    return uuidv4();
  } else {
    return id;
  }
}

export const getValue = function (data, fieldName, _default) {
  if (data === undefined || data === null) {
    return _default;
  } else if (data[fieldName] === undefined || data[fieldName] === null) {
    return _default;
  } else {
    return data[fieldName];
  }
}

export const now = function (_format) {
  const date = new Date();
  _format = _format === undefined ? "dd/MM/yyyy HH:mm:SS" : _format;
  return formatDate(date, _format);
}

export const formatDateTime = function (value, formato) {
  formato = formato || "dd/MM/yyyy HH:mm a";
  try {
    const date = new Date(value);
    return format(date, formato, { locale: enUS });
  } catch {
    return value;
  }
}

export const formatDate = function (value, formato) {
  formato = formato || "dd/MM/yyyy";
  try {
    const date = new Date(value);
    return formatDateTime(date, formato, { locale: enUS });
  } catch {
    return value;
  }
}

export const getDateTime = function (data, fieldName, _default) {
  _default = _default || new Date();
  const date = getValue(data, fieldName, _default);
  try {
    return formatDate(new Date(date), "yyyy-MM-dd'T'HH:mm:ss");
  } catch (err) {
    return date;
  }
}

export const getDateFormat = function (data, fieldName, _format, _default) {
  _format = _format || "yyyy-MM-dd";
  _default = _default || "";
  const date = getValue(data, fieldName, _default);
  if (date === _default) {
    return date;
  } else {
    try {
      return formatDate(new Date(date), _format);
    } catch (err) {
      return date;
    }
  }
}

export const getTime = function (data, fieldName, _default) {
  _default = _default || new Date();
  const date = getValue(data, fieldName, _default);
  try {
    return formatDate(new Date(date), "HH:mm:ss");
  } catch (err) {
    return date;
  }
}
