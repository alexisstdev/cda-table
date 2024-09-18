export var dateBetweenFilterFn = function dateBetweenFilterFn(rows, id, filterValues) {
  var sd = filterValues[0] ? new Date(filterValues[0]) : undefined;
  var ed = filterValues[1] ? new Date(filterValues[1]) : undefined;
  if (ed || sd) {
    sd === null || sd === void 0 || sd.setHours((sd === null || sd === void 0 ? void 0 : sd.getHours()) - 6);
    return rows.filter(function (r) {
      var cellDate = new Date(r.values[id]);
      if (ed && sd) {
        return cellDate >= sd && cellDate <= ed;
      } else if (sd) {
        return cellDate >= sd;
      } else if (ed) {
        return cellDate <= ed;
      }
    });
  } else {
    return rows;
  }
};
export var multiSelectFilterFn = function multiSelectFilterFn(rows, id, filterValues) {
  if (!filterValues || filterValues.length === 0) {
    return rows;
  }
  var isBooleanArray = filterValues.every(function (value) {
    return value === 'true' || value === 'false';
  });
  var filteredRows = rows.filter(function (row) {
    if (row.values[id] == null) return false;
    if (isBooleanArray) {
      return filterValues.includes(String(row.values[id]));
    } else {
      // Handle other types of filtering
      return filterValues.includes(row.values[id]);
    }
  });
  return filteredRows;
};
export var nestedArrayMultiSelectFilterFn = function nestedArrayMultiSelectFilterFn(rows, id, filterValues) {
  if (!filterValues || filterValues.length === 0) return rows;
  return rows.filter(function (row) {
    var nestedArray = row.values[id];
    if (!nestedArray || nestedArray.length === 0) {
      return false;
    }
    return nestedArray.some(function (item) {
      return filterValues.includes(item);
    });
  });
};
export var invertedNestedArrayMultiSelectFilterFn = function invertedNestedArrayMultiSelectFilterFn(rows, id, filterValues) {
  if (!filterValues || filterValues.length === 0) return rows;
  return rows.filter(function (row) {
    var nestedArray = row.values[id];
    if (nestedArray.some(function (item) {
      return !filterValues.includes(item);
    })) {
      return true;
    }
    return !nestedArray.some(function (item) {
      return filterValues.includes(item);
    });
  });
};
export var defaultTextFilterNestedArrayFn = function defaultTextFilterNestedArrayFn(rows, id, filterValue) {
  return rows.filter(function (row) {
    var nestedArray = row.values[id];
    if (!nestedArray || nestedArray.length === 0) {
      return false;
    }
    return nestedArray.some(function (item) {
      return String(item).toLowerCase().includes(String(filterValue).toLowerCase());
    });
  });
};