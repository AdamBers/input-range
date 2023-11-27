import { React, useState, useRef, useEffect } from "react";
import styles from "./range.module.css";

function Range({ min, max }) {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const [temporaryMin, setTemporaryMin] = useState(min);
  const [temporaryMax, setTemporaryMax] = useState(max);
  const progressRef = useRef(null);

  useEffect(() => {
    if (progressRef.current !== null) {
      progressRef.current.style.left = `calc(${
        ((minValue - min) / (max - min)) * 100 + "%"
      } - 12px)`;
      progressRef.current.style.right = `calc(${
        100 - ((maxValue - min) / (max - min)) * 100 + "%"
      } - 12px)`;
    }
  }, [minValue, maxValue, min, max]);

  const handleChangeMin = (e) => {
    if (e.target.value >= min && e.target.value <= maxValue) {
      setMinValue(Number(e.target.value));
      setTemporaryMin(Number(e.target.value));
    }
    if (e.target.value < min || e.target.value > max) {
      setMinValue(Number(min));
      setTemporaryMin(Number(min));
    }
  };

  const handleChangeMax = (e) => {
    if (e.target.value <= minValue) {
      setMaxValue(Number(minValue));
      setTemporaryMax(Number(minValue));
    }
    if (e.target.value >= max) {
      setMaxValue(Number(max));
      setTemporaryMax(Number(max));
    }
    if (e.target.value >= minValue && e.target.value < max) {
      setMaxValue(Number(e.target.value));
      setTemporaryMax(Number(e.target.value));
    }
  };

  const handleChangeInputMin = (e) => {
    setTemporaryMin(e.target.value);
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (e.target.value < min || e.target.value > max) {
        setTemporaryMin(min);
        console.log("работает");
        setMinValue(min);
      }
      if (e.target.value > min && e.target.value <= max) {
        setMinValue(e.target.value);
      }
    }, 1000);
  };

  const handleChangeInputMax = (e) => {
    setTemporaryMax(e.target.value);
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (e.target.value < minValue || e.target.value > max) {
        setMaxValue(max);
        setTemporaryMax(max);
      }
      if (e.target.value >= minValue && e.target.value <= max) {
        setMaxValue(e.target.value);
        setTemporaryMax(e.target.value);
      }
    }, 1000);
  };

  return (
    <div className={styles.range}>
      <div className={styles.inputTextBlock}>
        <div className={styles.inputText}>
          <input
            type="text"
            value={temporaryMin}
            onChange={(e) => handleChangeInputMin(e)}
            onClick={(e) => e.target.select()}
          ></input>
          <span>₽</span>
        </div>
        <div className={styles.inputText}>
          <input
            type="text"
            value={temporaryMax}
            onChange={(e) => handleChangeInputMax(e)}
            onClick={(e) => e.target.select()}
          ></input>
          <span>₽</span>
        </div>
      </div>
      <div className={styles.sliderContainer}>
        <div className={styles.inputRange}>
          <div className={styles.slider}>
            <div className={styles.progress} ref={progressRef}></div>
          </div>
          <input
            type="range"
            min={min}
            max={max}
            step={1}
            value={minValue}
            onChange={(e) => handleChangeMin(e)}
          ></input>
          <input
            type="range"
            min={min}
            max={max}
            step={1}
            value={maxValue}
            onChange={(e) => handleChangeMax(e)}
          ></input>
        </div>
      </div>
    </div>
  );
}

export default Range;
