import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatusIcon, { StatusIconPropsType } from './StatusIcon';

describe('StatusIcon Props Test', () => {
  test('If StatusIcon rendered correctly', () => {
    const props: StatusIconPropsType = {
      status: {
        label: 'Status-label',
        color: '#000000'
      }
    };

    const element = render(<StatusIcon {...props} />);

    expect(element).toMatchSnapshot();
  });
});
