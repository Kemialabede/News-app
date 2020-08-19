import React, { useState, useEffect } from "react";
import Searchbar from "../../Component/Searchbar/Searchbar";
import Tags from "../../Component/Tags/Tags";
import "../../scss/style.scss";
import NewsContent from "../../Component/NewsContent/NewsContent";
import Freckles from "../../Assets/Images/Freckles.jpg";
import Person from "../../Assets/Images/person.jpg";
import travel from "../../Assets/Images/travel-people.jpg";
import ClipLoader from "react-spinners/ClipLoader";

const CreateTags = ({ tags = [] }) => {
  return (
    <div>
      {tags.map((tag) => (
        <Tags
          tagname={tag.text}
          className="news"
          onClick={tag.handleTag}
          name={tag.name}
        />
      ))}
    </div>
  );
};
const Content = ({ contents = [] }) => {
  return (
    <div>
      {contents.map((content) => (
        <NewsContent
          image={content.image}
          title={content.title}
          description={content.description}
          url={content.link}
        />
      ))}
    </div>
  );
};

function News() {
  const [state, setState] = useState({
    searchValue: "",
    articles: [],
    fetch: false,
    loading: false,
    error: false,
  });

  const handleTag = (input) => {
    setState({ ...state, loading: false, searchValue: input });
  };
  const handleChange = (e) => {
    setState(
      {
        searchValue: e.target.value,
        loading: false,
      },
      console.log(state.searchValue)
    );
  };

  const makeApiCalls = () => {
    setState({
      loading: true,
      error: false,
    });
    let searchUrl = `https://newsapi.org/v2/everything?q=${state.searchValue}&apiKey=1f7f49a07ed744518bab214e1e0cb861`;
    fetch(searchUrl)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json.articles);
        setState({
          articles: json.articles,
          fetch: true,
          loading: false,
        });
      })
      .catch(() => {
        setState({
          error: true,
        });
      });
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (state.searchValue) {
      makeApiCalls(state.searchValue);
    }
  };

  return (
    <div className="news-page">
      <form onSubmit={handleSearch}>
        <div className="top-content">
          <h1>Your Daily Read</h1>
          <Searchbar
            placeholder="Search news..."
            onChange={handleChange}
            value={state.searchValue}
            onClick={handleSearch}
          />
          <div className="tags">
            <div onClick={() => handleTag("News")} name="News">
              <CreateTags tags={[{ text: "News" }]} />
            </div>
            <div onClick={() => handleTag("Sports")}>
              <CreateTags tags={[{ text: "Sports" }]} />
            </div>
            <div onClick={() => handleTag("History")}>
              <CreateTags tags={[{ text: "History" }]} />
            </div>
            <div onClick={() => handleTag("Entertainment")}>
              <CreateTags tags={[{ text: "Entertainment" }]} />
            </div>
          </div>
        </div>
        <div className="news-feed">
          {!state.error ? (
            state.fetch ? (
              !state.articles.length == 0 ? (
                state.articles.map((article, index) => (
                  <div key={index}>
                    <Content
                      contents={[
                        {
                          image: <img src={article.urlToImage} />,
                          title: <p>{article.title}</p>,
                          description: <p>{article.description}</p>,
                          link: <a href={article.url}>Read more...</a>,
                        },
                      ]}
                    />
                  </div>
                ))
              ) : (
                <div className="search-news">Page Not Found!</div>
              )
            ) : (
              <div className="search-news">
                <p>Search for News...</p>{" "}
                <ClipLoader
                  size={150}
                  color={"#fffff"}
                  loading={state.loading}
                />
              </div>
            )
          ) : (
            <div className="search-news">Something went wrong...</div>
          )}
        </div>
      </form>
    </div>
  );
}

export default News;
