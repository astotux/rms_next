import { useState, useEffect } from 'react';

const DoubleRangeSlider = ({min, max, step, label, suffix, onChange}) => {
  const MIN_PRICE = Number(min);
  const MAX_PRICE = Number(max);
  const STEP = Number(step);

  const [minValue, setMinValue] = useState(MIN_PRICE);
  const [maxValue, setMaxValue] = useState(MAX_PRICE);
  const [leftValue, setLeftValue] = useState(MIN_PRICE);
  const [rightValue, setRightValue] = useState(MAX_PRICE);
  const [minInput, setMinInput] = useState(formatNumber(MIN_PRICE));
  const [maxInput, setMaxInput] = useState(formatNumber(MAX_PRICE));

  // Форматирование числа с пробелами
  function formatNumber(num) {
    return new Intl.NumberFormat('ru-RU').format(num);
  }

  // Парсинг форматированного числа
  function parseNumber(str) {
    return parseInt(str.replace(/\s/g, ''), 10) || MIN_PRICE;
  }

  // Вызываем onChange при изменении значений
  useEffect(() => {
    if (onChange) {
      onChange({ min: minValue, max: maxValue });
    }
  }, [minValue, maxValue]);

  // Обновляем значения ползунков при изменении инпутов
  useEffect(() => {
    const newMin = Math.min(Math.max(parseNumber(minInput), MIN_PRICE), rightValue - STEP);
    setLeftValue(newMin);
    setMinValue(newMin);
  }, [minInput]);

  useEffect(() => {
    const newMax = Math.max(Math.min(parseNumber(maxInput), MAX_PRICE), leftValue + STEP);
    setRightValue(newMax);
    setMaxValue(newMax);
  }, [maxInput]);

  // Обработчик изменения левого ползунка
  const handleLeftChange = (e) => {
    const value = Math.min(parseInt(e.target.value), rightValue - STEP);
    setLeftValue(value);
    setMinValue(value);
    setMinInput(formatNumber(value));
  };

  // Обработчик изменения правого ползунка
  const handleRightChange = (e) => {
    const value = Math.max(parseInt(e.target.value), leftValue + STEP);
    setRightValue(value);
    setMaxValue(value);
    setMaxInput(formatNumber(value));
  };

  // Обработчик изменения левого инпута
  const handleMinInputChange = (e) => {
    setMinInput(e.target.value);
  };

  // Обработчик изменения правого инпута
  const handleMaxInputChange = (e) => {
    setMaxInput(e.target.value);
  };

  // Рассчитываем позиции для визуального отображения ползунков
  const leftPosition = ((leftValue - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
  const rightPosition = ((rightValue - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;

  return (
    <div className="filter-group">
      <label className="filter-label">{label}</label>
      
      <div className="slider-container">
        <div className="slider-track">
          <div 
            className="slider-range" 
            style={{ left: `${leftPosition}%`, right: `${100 - rightPosition}%` }}
          ></div>
        </div>
        <input
          type="range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={STEP}
          value={leftValue}
          onChange={handleLeftChange}
          className="slider-thumb left-thumb"
        />
        <input
          type="range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={STEP}
          value={rightValue}
          onChange={handleRightChange}
          className="slider-thumb right-thumb"
        />
      </div>

      <div className="filter-inputs">
        <div className="input-wrapper">
          <input
            type="text"
            className="filter-input"
            value={minInput}
            onChange={handleMinInputChange}
          />
          <span className="input-suffix">{suffix}</span>
        </div>
        <div className="input-divider">—</div>
        <div className="input-wrapper">
          <input
            type="text"
            className="filter-input"
            value={maxInput}
            onChange={handleMaxInputChange}
          />
          <span className="input-suffix">{suffix}</span>
        </div>
      </div>
    </div>
  );
};

export default DoubleRangeSlider;