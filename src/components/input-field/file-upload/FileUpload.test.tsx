import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import FileUpload, { FileUploadPropsType } from './FileUpload';

describe('File upload Props Test', () => {
  test('If file upload field rendered correctly', () => {
    const props: FileUploadPropsType = {
      onChange: () => {},
      label: 'file-upload-label',
      showError: false
    };

    const element = render(<FileUpload {...props} />);

    expect(element).toMatchSnapshot();
  });

  test('If file upload field rendered correctly with error', () => {
    const props: FileUploadPropsType = {
      onChange: () => {},
      label: 'file-upload-label',
      showError: true
    };

    const element = render(<FileUpload {...props} />);

    expect(element).toMatchSnapshot();
  });
});
