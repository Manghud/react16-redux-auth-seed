import axios from 'axios';

const timezoneDBKey= 'Q8OD9FKZH79E';

export const getTimeFromTimezone =(targetTimezone) => axios({
  method: 'GET',
  url: `http://api.timezonedb.com/v2.1/convert-time-zone?key=${timezoneDBKey}&from=America/Guayaquil&to=${targetTimezone}&format=json`
});
