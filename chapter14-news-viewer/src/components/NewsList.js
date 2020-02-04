import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import styled from 'styled-components';
import axios from 'axios';
import usePromise from '../lib/usePromise';

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({ category }) => {
  const [loading, response, error] = usePromise(() => {
    const query = category == 'all' ? '' : `&category=${category}`;
    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=bb5e2ed699db4785a61f0b00d08ef206`,
    );
  }, [category]);

  // 대기 중
  if (loading) return <NewsListBlock>대기중...</NewsListBlock>;
  // response 값이 설정되지 않았을 경우
  if (!response) return null;
  // 에러 발생
  if (error) return <NewsListBlock>에러</NewsListBlock>;

  console.log(response);

  const { articles } = response.data;

  console.log('articles >>', articles);
  return (
    <NewsListBlock>
      {articles.map(article => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
