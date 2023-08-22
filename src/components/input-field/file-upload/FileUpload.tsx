import React from 'react';
import './FileUpload.css';

export type FileUploadPropsType = {
  onChange: (event) => void;
  label: string;
  showError: boolean;
  value: string | File;
};

const FileUpload: React.FC<FileUploadPropsType> = (props) => {
  return (
    <div className='file-upload'>
      <label className='file-upload-label'>{props.label}</label>
      <div className='file-upload-field'>
        <input id='file-upload-input' type='file' onChange={props.onChange}></input>
        <label htmlFor='file-upload-input' className='file-upload-value'>
          {typeof props.value === 'string'
            ? props.value.length === 0
              ? 'Select resume\t'
              : props.value
            : props.value.name}
        </label>
        {typeof props.value === 'string' && props.value.length === 0 && (
          <label htmlFor='file-upload-input' className='file-upload-value-rules'>
            File type: PDF, Max size: 5 MB
          </label>
        )}
      </div>
      {props.showError && (
        <label className='file-upload-error'>Enter valid {props.label.toLowerCase()}</label>
      )}
    </div>
  );
};

export default FileUpload;
