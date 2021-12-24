import XHRUpload from '@uppy/xhr-upload';
import Uppy from '@uppy/core';
import TokenService from 'services/token.service';
import AuthService from 'services/auth.service';
import { useEffect, useState } from 'react';
import httpStatus from 'http-status';
import { refreshAccessToken } from 'apis/auth';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const XHRUploadHeaders = (file) => {
  const token = TokenService.getAccessToken();
  return {
    authorization: `Bearer ${token}`,
    expires: file.meta.expires
  };
};

const useUppy = () => {
  const [uppy, setUppy] = useState(null);
  useEffect(() => {
    const uppyInstance = new Uppy({
      meta: { type: 'image' },
      autoProceed: false,
      restrictions: {
        maxFileSize: 15728640,
        minNumberOfFiles: 1,
        allowedFileTypes: ['image/*']
      }
    });

    uppyInstance.use(XHRUpload, {
      endpoint: `${BASE_URL}/images`,
      formData: true,
      headers: XHRUploadHeaders
    });

    uppyInstance.on('upload-error', async (file, err, response) => {
      if (response?.status === httpStatus.UNAUTHORIZED) {
        const refreshToken = TokenService.getRefreshToken();
        try {
          const data = await refreshAccessToken({ refreshToken });
          const accessToken = data?.access?.token;
          TokenService.updateTokens({ accessToken });
          uppy.retryUpload(file.id);
        } catch (err) {
          if (err.response?.status === httpStatus.UNAUTHORIZED) {
            AuthService.logout({ tokenExpired: true });
          }
        }
      }
    });

    setUppy(uppyInstance);
  }, []);

  return uppy;
};

export default useUppy;
