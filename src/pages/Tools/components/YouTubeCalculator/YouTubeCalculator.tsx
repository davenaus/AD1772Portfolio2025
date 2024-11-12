// src/pages/Tools/components/YouTubeCalculator/YouTubeCalculator.tsx
import React, { useState, useCallback } from 'react';
import * as S from './styles';

interface CategoryRates {
  [key: string]: number;
}

const cpmRates: CategoryRates = {
  autos: 3,
  comedy: 4,
  education: 10,
  entertainment: 3,
  film: 5,
  gaming: 5,
  howto: 6,
  music: 4,
  news: 8,
  nonprofits: 2,
  people: 2,
  pets: 3,
  science: 8,
  sports: 4,
  travel: 5
};

export const YouTubeCalculator: React.FC = () => {
  const [videoLength, setVideoLength] = useState<number>(10);
  const [views, setViews] = useState<number>(10000);
  const [category, setCategory] = useState<string>('');
  const [earnings, setEarnings] = useState<string>('$0.00');
  const [sliderFills, setSliderFills] = useState({
    videoLength: 16.67, // (10 - 1) / (60 - 1) * 100
    views: 0.18 // (10000 - 1000) / (5000000 - 1000) * 100
  });

  const updateSliderFill = useCallback((value: number, min: number, max: number) => {
    return ((value - min) / (max - min)) * 100;
  }, []);

  const handleVideoLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setVideoLength(value);
    setSliderFills(prev => ({
      ...prev,
      videoLength: updateSliderFill(value, 1, 60)
    }));
  };

  const handleViewsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setViews(value);
    setSliderFills(prev => ({
      ...prev,
      views: updateSliderFill(value, 1000, 5000000)
    }));
  };

  const calculateEarnings = useCallback(() => {
    if (!category) {
      setEarnings('Please choose a category');
      return;
    }

    const cpm = cpmRates[category];
    let adFactor = 1;

    if (videoLength >= 8) {
      adFactor += (videoLength - 8) * 0.05;
    } else {
      adFactor -= (8 - videoLength) * 0.2;
    }

    const baseEarnings = ((views / 1000) * cpm) * adFactor;
    const minEarnings = (baseEarnings * 0.30).toFixed(2);
    const maxEarnings = (baseEarnings * 0.50).toFixed(2);

    setEarnings(`$${minEarnings} - $${maxEarnings}`);
  }, [videoLength, views, category]);

  return (
    <S.Container>
      <S.Header>
        <S.Title>YouTube Calculator</S.Title>
      </S.Header>

      <S.CalculatorForm>
        <S.FormGroup>
          <S.Label htmlFor="video-length">Video Length (minutes):</S.Label>
          <S.SliderContainer>
            <S.SliderFill width={sliderFills.videoLength} />
            <S.Slider
              type="range"
              id="video-length"
              min={1}
              max={60}
              value={videoLength}
              onChange={handleVideoLengthChange}
            />
          </S.SliderContainer>
          <S.Value>{videoLength}</S.Value>
        </S.FormGroup>

        <S.FormGroup>
          <S.Label htmlFor="views">Number of Views:</S.Label>
          <S.SliderContainer>
            <S.SliderFill width={sliderFills.views} />
            <S.Slider
              type="range"
              id="views"
              min={1000}
              max={5000000}
              value={views}
              onChange={handleViewsChange}
              step={views >= 100000 ? 50000 : 1000}
            />
          </S.SliderContainer>
          <S.Value>{views.toLocaleString()}</S.Value>
        </S.FormGroup>

        <S.FormGroup>
          <S.Label htmlFor="category">YouTube Category:</S.Label>
          <S.Select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            <option value="autos">Autos & Vehicles</option>
            <option value="comedy">Comedy</option>
            <option value="education">Education</option>
            <option value="entertainment">Entertainment</option>
            <option value="film">Film & Animation</option>
            <option value="gaming">Gaming</option>
            <option value="howto">Howto & Style</option>
            <option value="music">Music</option>
            <option value="news">News & Politics</option>
            <option value="nonprofits">Nonprofits & Activism</option>
            <option value="people">People & Blogs</option>
            <option value="pets">Pets & Animals</option>
            <option value="science">Science & Technology</option>
            <option value="sports">Sports</option>
            <option value="travel">Travel & Events</option>
          </S.Select>
        </S.FormGroup>

        <S.CalculateButton onClick={calculateEarnings}>
          Calculate Earnings
        </S.CalculateButton>

        <S.Result>
          <S.ResultTitle>Estimated Earnings</S.ResultTitle>
          <S.Earnings>{earnings}</S.Earnings>
        </S.Result>
      </S.CalculatorForm>
    </S.Container>
  );
};

export default YouTubeCalculator;