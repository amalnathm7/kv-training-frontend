import React from 'react';
import './SubHeader.css';

export type SubHeaderPropsType = {
  label: string;
  primaryActionLabel: string;
  primaryActionValue?: string;
  primaryActionPlaceholder?: string;
  primaryActionIcon: string;
  primaryAction: (event) => void;
  secondaryActionLabel?: string;
  secondaryActionIcon?: string;
  secondaryAction?: (event) => void;
  routeOptions?: string[];
  onRouteChanged?: (event) => void;
  primaryFilterOptions?: string[];
  secondaryFilterOptions?: string[];
  primaryFilterPlaceholder?: string;
  secondaryFilterPlaceholder?: string;
  primaryFilterAction?: (event) => void;
  secondaryFilterAction?: (event) => void;
};

const SubHeader: React.FC<SubHeaderPropsType> = (props) => {
  const primaryFilterOptions = props.primaryFilterOptions?.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));

  const secondaryFilterOptions = props.secondaryFilterOptions?.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));

  const routeOptions = props.routeOptions?.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));

  return (
    <div className='sub-header'>
      {routeOptions && (
        <select className='sub-header-label' onChange={props.onRouteChanged}>
          {routeOptions}
        </select>
      )}
      {!routeOptions && <label className='sub-header-label'>{props.label}</label>}
      <div className='sub-header-actions'>
        {props.primaryActionLabel === 'Search' && (
          <>
            <select
              className='filter-dropdown'
              style={{ marginRight: '20px' }}
              onChange={props.secondaryFilterAction}
            >
              <option style={{ color: 'var(--hint-color)' }} hidden>
                {props.secondaryFilterPlaceholder}
              </option>
              {secondaryFilterOptions}
            </select>
            <select className='filter-dropdown' onChange={props.primaryFilterAction}>
              <option style={{ color: 'var(--hint-color)' }} hidden>
                {props.primaryFilterPlaceholder}
              </option>
              {primaryFilterOptions}
            </select>
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
