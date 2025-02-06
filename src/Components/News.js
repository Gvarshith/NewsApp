import React, { useState, useEffect, useRef, useCallback } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const capitalizeFirstLetter = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';

  // Function to fetch data and update state
  const updateState = async () => {
    setLoading(true);
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles((prevArticles) => [...prevArticles, ...parsedData.articles]);
    setLoading(false);

    if (parsedData.articles.length === 0 || articles.length >= parsedData.totalResults) {
      setHasMore(false); // No more articles to load
    }
  };

  
  useEffect(() => {
    updateState();
    document.title = `${capitalizeFirstLetter(props.category)} - PulseToday`;
    // eslint-disable-next-line 
  }, [page, props.category]);

  

  // Infinite scrolling with Intersection Observer
  const observer = useRef();
  const lastArticleElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1); // Load next page when bottom reached
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="container my-3">
      <h2 className="text-center" style={{marginTop: '4rem'}}>
        Pulse Today -- Top {capitalizeFirstLetter(props.category)} Headlines
      </h2>

   

      {/* Articles Row */}
      <div className="row mx-5">
        {articles.map((element, index) => {
          if (articles.length === index + 1) {
            return (
              <div className="col-md-4" ref={lastArticleElementRef} key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imgUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          } else {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imgUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          }
        })}
      </div>

      {/* Spinner at the bottom for infinite scrolling */}
      {loading && <Spinner />}
    </div>
  );
};

News.defaultProps = {
  pageSize: 9,
};

News.propTypes = {
  pageSize: PropTypes.number,
  category: PropTypes.string.isRequired,
  apikey: PropTypes.string.isRequired,
};

export default News;
