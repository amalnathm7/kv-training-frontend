import { API_BASE_URL } from '../constants/apiConstants';
import { RouteConstants } from '../constants/routeConstants';

const viewFile = (file) => {
  const resumeUrl = `${API_BASE_URL}${RouteConstants.fileApi}/${file}`;

  // RTK caches the response, hence it's suggested to use fetch for file downloads
  fetch(resumeUrl).then((response) => {
    response.blob().then((blob) => {
      window.open(window.URL.createObjectURL(blob));
    });
  });
};

export default viewFile;
