import React from 'react';
import './FileUpload.css';

export type FileUploadPropsType = {
  onChange: (event) => void;
  label: string;
  showError: boolean;
};

const FileUpload: React.FC<FileUploadPropsType> = (props) => {
  return (
    <div className='file-upload'>
      <label className='file-upload-label'>{props.label}</label>
      <input
        className='file-upload-field'
        type='file'
        name='filename'
        onChange={props.onChange}
      ></input>
      {props.showError && (
        <label className='file-upload-error'>Enter {props.label.toLowerCase()}</label>
      )}
    </div>
  );
};

export default FileUpload;
