// generate sql in operator for get products query based on url query params
// output example IN (?, ?, ?)
import { logError } from "../../utils/errorsLib";

// its used to return sql operator for sql query
const operatorGenerator = (sqlQueryArr, urlQuery, param, options) => {
  try {
    if (!sqlQueryArr || !urlQuery || !param || !options || !options.op)
      throw new Error("Missing argument.");

    const { op, minMax, colName, regx } = options;
    let inOperator = "IN (";
    let betweenOperator = "";
    let likeOperator = ''
    // depending on operation required an operator will be generated
    switch (op) {
      case "in": {
        // if param is an aray of values like when we enter color=xxx&color=yyy
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
      case "like": {
        let value
        if (Array.isArray(urlQuery[param])) {
          for (let [i, item] of urlQuery[param].entries()) {
            // param is an array of min-max
              value = regx.replace('?', item)
              sqlQueryArr.push(value);
              likeOperator +=
                i === urlQuery[param].length - 1
                  ? `LIKE ?) `
                  : `LIKE ? OR ${colName} `;
          }
        } else {
          value = regx.replace('?', urlQuery[param])
          sqlQueryArr.push(value);
          likeOperator += `LIKE ?) `;
        }
        return likeOperator;
      }
      case "between": {
        if (Array.isArray(urlQuery[param])) {
          for (let [i, item] of urlQuery[param].entries()) {
            // param is an array of min-max, here we are filtering based on the price with discount
            if (minMax) {
              let minMax = item.split('-')
              if (minMax.length < 2)
                throw new Error('wrong formated data')
              let min = minMax[0];
              let max = minMax[1];
              sqlQueryArr.push(min);
              sqlQueryArr.push(max);
              betweenOperator +=
                i === urlQuery[param].length - 1
                  ? `BETWEEN ? AND ?) `
                  : `BETWEEN ? AND ?) OR (${colName} `;
            }
          }
        } else {
          let minMax = urlQuery[param].split("-")

          if (minMax.length < 2)
            throw new Error('wrong formated data')
          let min = minMax[0];
          let max = minMax[1];
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
  // the initial value of sqlqueryarr is `${categoryPath}%`
  if (options && options.initialArray) sqlQueryArr = options.initialArray;
  else sqlQueryArr = "";
  let filterString = "";
  let orderString = "";

  if (!urlQuery) return { sqlQueryArr, filterString, orderString };

  for (let param in urlQuery) {
    let operator;

    switch (param) {
      case 'categories': continue
      case "color": {
        operator = operatorGenerator(sqlQueryArr, urlQuery, param, { op: 'in',
        });
        filterString += `AND co.name ${operator}`;
        break;
      }
      case "fit": {
        operator = operatorGenerator(sqlQueryArr, urlQuery, param, { op: 'in',
        });
        filterString += `AND f.name ${operator} `;
        break;
      }
      case "size": {
        operator = operatorGenerator(sqlQueryArr, urlQuery, param, { op: 'in',
        });
        filterString += `AND s.size ${operator}`;
        break;
      }
      case "width": {
        operator = operatorGenerator(sqlQueryArr, urlQuery, param, { op: 'like',
        colName: 's.width_length',
        regx: "w?%"});
        filterString += `AND (s.width_length ${operator}`;
        break;
      }
      case "length": {
        operator = operatorGenerator(sqlQueryArr, urlQuery, param, { op: 'like',
        colName: 's.width_length',
        regx: "%l?"});
        filterString += `AND (s.width_length ${operator}`;
        break;
      }
      case "price": {
        operator = operatorGenerator(sqlQueryArr, urlQuery, param, { op: 'between',
        minMax: true,
        colName: '(pr.price - pr.price * (d.amount/100))',
        });
        filterString += `AND ((pr.price - pr.price * (d.amount/100)) ${operator}`;
        break;
      }
      case "sort": {
        if (urlQuery[param] === "ds-rate" && !orderString) {
          orderString = "ORDER BY d.amount DESC";
        }
        if (urlQuery[param] === "price-asc" && !orderString) {
          orderString = "ORDER BY (pr.price - pr.price * (d.amount/100)) ASC";
        }
        if (urlQuery[param] === "price-desc" && !orderString) {
          orderString = "ORDER BY (pr.price - pr.price * (d.amount/100)) DESC";
        }
        if (urlQuery[param] === "latest" && !orderString) {
          orderString = "ORDER BY pr.created_at DESC";
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
