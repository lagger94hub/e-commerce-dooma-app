// generate sql in operator for get products query based on url query params
// output example IN (?, ?, ?)
import { logError } from "../../utils/errorsLib";
const operatorGenerator = (sqlQueryArr, urlQuery, param, options) => {
  try {
    if (!sqlQueryArr || !urlQuery || !param || !options || !options.op)
      throw new Error("Missing argument.");

    const { op, minMax, colName } = options;
    let inOperator = "IN (";
    let betweenOperator = "";
    // depending on operation required an operator will be generated
    switch (op) {
      case "in": {
        // if param is an aray of values
        if (Array.isArray(urlQuery[param])) {
          for (let [i, item] of urlQuery[param].entries()) {
            inOperator += (i === (urlQuery[param].length - 1)) ? "?) " : "?, ";
            sqlQueryArr.push(item);
          }
        } else {
          sqlQueryArr.push(urlQuery[param]);
          inOperator += "?) ";
        }
        return inOperator;
      }
      case "between": {
        if (Array.isArray(urlQuery[param])) {
          for (let [i, item] of urlQuery[param].entries()) {
            // param is an array of min-max
            if (minMax) {
              let min = item.split("-")[0];
              let max = item.split("-")[1];
              sqlQueryArr.push(min);
              sqlQueryArr.push(max);
              betweenOperator +=
                i === urlQuery[param].length - 1
                  ? `BETWEEN ? AND ?) `
                  : `BETWEEN ? AND ? OR (${colName} `;
            }
          }
        } else {
          let min = urlQuery[param].split("-")[0];
          let max = urlQuery[param].split("-")[1];
          sqlQueryArr.push(min);
          sqlQueryArr.push(max);
          betweenOperator += `BETWEEN ? AND ?) `;
        }
        return betweenOperator;
      }
      default: {
        throw new Error("Invalid operation type");
      }
    }
  } catch (e) {
    logError("operatorGenerator", e.message, { isSource: true });
    throw e;
  }
};

// generate dynamic sqlQueries' dependencies
const sqlQueryDependencies = (urlQuery, options) => {
  let sqlQueryArr;
  if (options && options.initialArray) sqlQueryArr = options.initialArray;
  else sqlQueryArr = "";
  let filterString = "";
  let orderString = "";

  if (!urlQuery) return { sqlQueryArr, filterString, orderString };

  for (let param in urlQuery) {
    if (param === "categories") continue;

    let operator;
    if (param !== "sort") {
      // price param will need between op and minMax, other params require in op and no need for min max
      operator = operatorGenerator(sqlQueryArr, urlQuery, param, {
        op: param !== 'price' ? 'in' : 'between',
        minMax: param !== 'price' ? false : true,
        colName: param !== 'price' ? '' : 'pr.price'
      });
    }
    switch (param) {
      case "color": {
        filterString += `AND co.name ${operator}`;
        break;
      }
      case "fit": {
        filterString += `AND f.name ${operator} `;
        break;
      }
      case "size": {
        filterString += `AND s.size ${operator}`;
        break;
      }
      case "width": {
        filterString += `AND s.width ${operator}`;
        break;
      }
      case "length": {
        filterString += `AND s.length ${operator}`;
        break;
      }
      case "price": {
        filterString += `AND (pr.price ${operator}`;
        break;
      }
      case "sort": {
        if (urlQuery[param] === "ds-rate") {
          orderString = "ORDER BY d.amount DESC";
        }
        if (urlQuery[param] === "price-asc") {
          orderString = "ORDER BY pr.price ASC";
        }
        if (urlQuery[param] === "price-desc") {
          orderString = "ORDER BY pr.price DESC";
        }
        break;
      }
      default:
        break;
    }
  }
  if (!orderString) {
    orderString = "ORDER BY pr.created_at DESC";
  }
  return { sqlQueryArr, filterString, orderString };
};

export { sqlQueryDependencies };
