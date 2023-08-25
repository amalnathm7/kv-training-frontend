import React from 'react';
import './SubHeader.css';

export type FilterType = {
  options: string[];
  action: (event) => void;
  placeholder: string;
};

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
  filters: FilterType[];
};

const SubHeader: React.FC<SubHeaderPropsType> = (props) => {
  let filters = [];

  for (const filter of props.filters) {
    const filterOptions = filter.options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ));

    filters.push(
      <select className='filter-dropdown' style={{ marginRight: '20px' }} onChange={filter.action}>
        <option style={{ color: 'var(--hint-color)' }} hidden>
          {filter.placeholder}
        </option>
        {filterOptions}
      </select>
    );
  }

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
            {filters}
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
