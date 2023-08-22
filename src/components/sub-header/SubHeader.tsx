import React from 'react';
import './SubHeader.css';

export type SubHeaderPropsType = {
  label: string;
  primaryActionLabel: string;
  primaryActionValue?: string;
  primaryActionPlaceholder?: string;
  primaryActionFilterOptions?: string[];
  primaryActionIcon: string;
  primaryAction: (e) => void;
  secondaryActionLabel?: string;
  secondaryActionIcon?: string;
  secondaryActionPlaceholder?: string;
  secondaryAction?: (() => void) | ((string) => void);
};

const SubHeader: React.FC<SubHeaderPropsType> = (props) => {
  const options = props.primaryActionFilterOptions?.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));

  console.log(props);

  return (
    <div className='sub-header'>
      <label className='sub-header-label'>{props.label}</label>
      <div className='sub-header-actions'>
        {props.primaryActionLabel === 'Search' && (
          <>
            <div className='filter'>
              <select className='filter-dropdown' onChange={props.secondaryAction}>
                <option style={{ color: 'var(--hint-color)' }} hidden>
                  {props.secondaryActionPlaceholder}
                </option>
                {options}
              </select>
            </div>
            <div className='action-button'>
              <div className='sub-header-action-icon-container'>
                <img className='sub-header-action-icon' src={'/assets/icons/' + 'search.png'}></img>
              </div>
              <input
                className='sub-header-action-label'
                style={{ fontSize: '14px', cursor: 'text' }}
                value={props.primaryActionValue}
                placeholder={props.primaryActionPlaceholder}
                onChange={props.primaryAction}
              />
            </div>
          </>
        )}
        {props.primaryActionLabel.length > 0 && props.primaryActionLabel != 'Search' && (
          <div className='action-button' onClick={props.primaryAction}>
            <div className='sub-header-action-icon-container'>
              <img
                className='sub-header-action-icon'
                src={'/assets/icons/' + props.primaryActionIcon}
              ></img>
            </div>
            <label className='sub-header-action-label'>{props.primaryActionLabel}</label>
          </div>
        )}
        {props.secondaryActionLabel?.length > 0 && (
          <div className='action-button' onClick={props.secondaryAction}>
            <div className='sub-header-action-icon-container'>
              <img
                className='sub-header-action-icon'
                src={'/assets/icons/' + props.secondaryActionIcon}
              ></img>
            </div>
            <label className='sub-header-action-label'>{props.secondaryActionLabel}</label>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubHeader;
