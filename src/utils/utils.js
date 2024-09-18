export const dateBetweenFilterFn = (rows, id, filterValues) => {
  const sd = filterValues[0] ? new Date(filterValues[0]) : undefined;
  const ed = filterValues[1] ? new Date(filterValues[1]) : undefined;

  if (ed || sd) {
    sd?.setHours(sd?.getHours() - 6);

    return rows.filter((r) => {
      const cellDate = new Date(r.values[id]);

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

export const multiSelectFilterFn = (rows, id, filterValues) => {
  if (!filterValues || filterValues.length === 0) {
    return rows;
  }

  const isBooleanArray = filterValues.every((value) => {
    return value === 'true' || value === 'false';
  });

  const filteredRows = rows.filter((row) => {
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

export const nestedArrayMultiSelectFilterFn = (rows, id, filterValues) => {
  if (!filterValues || filterValues.length === 0) return rows;

  return rows.filter((row) => {
    const nestedArray = row.values[id];

    if (!nestedArray || nestedArray.length === 0) {
      return false;
    }

    return nestedArray.some((item) => filterValues.includes(item));
  });
};

export const invertedNestedArrayMultiSelectFilterFn = (rows, id, filterValues) => {
  if (!filterValues || filterValues.length === 0) return rows;

  return rows.filter((row) => {
    const nestedArray = row.values[id];

    if (nestedArray.some((item) => !filterValues.includes(item))) {
      return true;
    }

    return !nestedArray.some((item) => filterValues.includes(item));
  });
};

export const defaultTextFilterNestedArrayFn = (rows, id, filterValue) => {
  return rows.filter((row) => {
    const nestedArray = row.values[id];

    if (!nestedArray || nestedArray.length === 0) {
      return false;
    }

    return nestedArray.some((item) =>
      String(item).toLowerCase().includes(String(filterValue).toLowerCase())
    );
  });
};
