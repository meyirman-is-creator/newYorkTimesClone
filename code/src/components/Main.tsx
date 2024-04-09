import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Sidebar from "./Sidebar";
import News from "./News";
import Footer from "./Footer";
interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}
export default function Main() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [menu,setMenu] = useState('');
  const [search,setSearch] = useState("");
  const searchRef = useRef(null);
  const getNews = async () => {
    try {
      await fetch(
        `https://newsapi.org/v2/everything?q=${menu?menu:'politics'}&from=2024-03-06&sortBy=publishedAt&apiKey=20e4c41c4d904ff49f10485c8aafa3b2`
      )
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          setNews(json?.articles)
        });
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getNews();
  }, [menu]);
  return (
    <div>
      <Navbar searchRef={searchRef} setMenu={setMenu} setSearch={setSearch}/>
      <div className="flex">
        <Home news={news} num="0" />
        <Sidebar news={news} num="5" />
      </div>
      <hr />
      <div className="flex mt-3">
        <Home news={news} num="1" />
        <Sidebar news={news} num="6" />
      </div>
      <hr />
      <div className="flex mt-3">
        <Home news={news} num="2" />
        <Sidebar news={news} num="7" />
      </div>
      <hr />
      <div className="flex mt-3">
        <Home news={news} num="3" />
        <Sidebar news={news} num="8" />
      </div>
      <hr className="mt-1" />
      <hr className="mt-1" />
      <News searchRef={searchRef} news={news} search={search} />
      <Footer setMenu={setMenu}/>
    </div>
  );
}
