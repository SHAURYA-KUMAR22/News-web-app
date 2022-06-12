import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
// whole page components
export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  /*articles=[
          {
            "source": { "id": "google-news-au", "name": "Google News (Australia)" },
            "author": "Michael Fowler, Daniel Brettig, Cassandra Morgan, Nell Geraets",
            "title": "Star-studded state funeral to culminate in unveiling of MCG’s ‘Shane Warne Stand’",
            "description": "Elton John and Ed Sheeran have recorded songs, while cricketing legends Brian Lara and Wasim Akram will be joined by celebrities including Hugh Jackman and Russell Crowe at Warne’s service on Wednesday night.",
            "url": "https://www.smh.com.au/sport/cricket/eddie-mcguire-to-announce-details-of-shane-warne-s-mcg-state-memorial-service-20220329-p5a8u8.html",
            "urlToImage": "https://static.ffx.io/images/$zoom_0.5395%2C$multiply_0.7554%2C$ratio_1.776846%2C$width_1059%2C$x_393%2C$y_767/t_crop_custom/q_86%2Cf_auto/t_smh_no_label_no_age_social_wm/cc70a8919c28186bc9b3b3232a122791ba11f4b2",
            "publishedAt": "2022-03-28T22:56:29+00:00",
            "content": "Therell be tears tomorrow night, therell be a lot of laughs as well and a lot of reminiscing, and thats whats going to make this a special night, said McGuire, announcing 10,000 to 15,000 extra ticke… [+3397 chars]"
          },
          {
            "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
            "author": null,
            "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
            "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
            "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
            "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
            "publishedAt": "2020-04-27T11:41:47Z",
            "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
          },
          {
            "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
            "author": null,
            "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
            "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
            "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
            "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
            "publishedAt": "2020-03-30T15:26:05Z",
            "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
          }
        ] */

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    console.log("constructor from news component");
    this.state = {
      //articles:this.articles,
      articles: [],
      loading: true, // for showing spinner or not
      page: 1,
      totalResults: 0,
    };
    document.title = `News Hunt-${this.capitalizeFirstLetter(
      this.props.category
    )}`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    console.log(parsedData);  
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    })
    this.props.setProgress(100);
  }
  async componentDidMount() {
    //collecting data from api
    /* console.log("cdm");
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dd65aa3293884fd18b933a7572d272fd&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data=await fetch(url);
        let parsedData= await data.json()
        console.log(parsedData);
        this.setState({articles:parsedData.articles,
            totalResults:parsedData.totalResults,
        loading: false}) */
    this.updateNews();
  }
  handlePrevClick = async () => {
    /*console.log("prev");
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dd65aa3293884fd18b933a7572d272fd&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data=await fetch(url);
        let parsedData= await data.json()
        console.log(parsedData);
        this.setState({
            page: this.state.page-1,
            articles:parsedData.articles,
            loading: false
        }) */
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNextClick = async () => {
    /*console.log("next");
        if (!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
       
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dd65aa3293884fd18b933a7572d272fd&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data=await fetch(url);  //automatic fetch news  //as long as data is fecthed loading is true after fetching loading false
        let parsedData= await data.json()
        //this.setState({loading: false});
        console.log(parsedData);
        this.setState({
            page: this.state.page+1,
            articles:parsedData.articles,
            loading: false
        })
        } */
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  fetchMoreData = async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;

      this.setState({
        page: this.state.page+1
      })
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({ 
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });  
    };

  render() {
    console.log("render");
    return (
      /*<div className="container my-3"> */
      <>
        <h1
          className="text-center"
          style={{ color: "red", margin: "35px 0px", marginTop:"90px" }}
        >
          TOP HEADLINES--{this.capitalizeFirstLetter(this.props.category)}
        </h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
        <div className="row">
          {
            /*!this.state.loading && */ this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })
          }
          </div>
          {/*<div className="col-md-4">
                <NewsItem title="mytitle" description="hello"/>
            </div>
            <div className="col-md-4">
                <NewsItem title="mytitle" description="hello"/>
            </div>*/}
        </div>
        </InfiniteScroll>
        {/*<div className="container d-flex justify-content-between btn-warning">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-primary mx-2"
            onClick={this.handlePrevClick}
          >
            &larr; previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-primary"
            onClick={this.handleNextClick}
          >
            next &rarr;
          </button>
          </div> */}
          
      {/*</div> */}
     </>
    )
  }
}

export default News;
