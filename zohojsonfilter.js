// inputは1件で、items[0].json.data に配列が入っている想定
const records = items[0].json.data;

const output = records.map(record => {
  return {
    json: {
      Name: record.Name,
      field: record.field,
      field1: record.field1
    }
  };
});

return output;
