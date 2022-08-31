import { FunctionComponent, ChangeEvent, useMemo, useState } from "react";
import cn from 'clsx';

import { SelectOptionType } from "../types/SelectOptionType";

import { useToggle } from '../hooks/useToggle';
import { convertValuesIntoSelectOptions } from "../utils/convertArrayIntoSelectOptions";


import { autosuggestionSelectDataMock } from "../mocks/AutosuggestionSelectDataMock";
import arrow from '../assets/svg/arrow.svg';

const AUTOSUGGESTION_SELECT_TITLE = "Find Rick & Morty Characters";

export const AutosuggestionSelect: FunctionComponent = () => {
  const [isActive, toggle] = useToggle();
  const [selectedOption, setSelectedOption] = useState<SelectOptionType | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  const allOptions: SelectOptionType[]  = useMemo(() => convertValuesIntoSelectOptions(autosuggestionSelectDataMock), []);

  const onSelect = (option: SelectOptionType) => {
    setSelectedOption(option.id === selectedOption?.id ? null : option);
  }

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }

  const getOptionsToSelect = (): SelectOptionType[] => {
    if (!searchValue) return allOptions;

    return allOptions.filter(option => option.value.toLowerCase().includes(searchValue.trim().toLowerCase()));
  }
  
  const buttonClassname = cn('trigger', {
    ['trigger--active']: isActive,
  });

  const arrowIconClassname = cn("arrow", {["arrow-up"]: isActive});
  
  return (
    <div className="wrapper">
      <div className="select">
        <button
          className={buttonClassname}
          onClick={() => toggle()}
        >
          {AUTOSUGGESTION_SELECT_TITLE}
          <img src={arrow} alt="chevron down icon" className={arrowIconClassname} />
        </button>
        {isActive && (
          <div className="options">
            <input className="input" placeholder="Type to search..." value={searchValue} onChange={onSearch} />
            <ul className="list">
              {getOptionsToSelect().map(option => ( 
                  <li
                    key={option.id}
                    className={cn("list__item", {["list__item--selected"]: selectedOption?.id === option.id})} 
                    onClick={() => onSelect(option)}
                  >
                    {option.value}
                  </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
