import React from 'react'
import NewsItem from './NewsItem'
import data from "../../News.json"
function News(){
    return (
      <div > 
        {data.news.map((articles) => (
          <NewsItem key={articles.title} articles={articles}></NewsItem>
        ))}
      </div>
    );
}
export default News